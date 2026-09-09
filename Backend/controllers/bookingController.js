import db from '../data/database.js';

export const requestCab = (req, res) => {
  const {
    pickup,
    dropoff,
    destination: destInput,
    distance = '12.4 km',
    baseFare = 40,
    rideFare = 280,
    total = 320,
    eta = '5 min',
    safeRideEnabled = 1,
    rideType = 'Standard',
  } = req.body;

  const destination = destInput || dropoff;
  if (!pickup || !destination) {
    return res.status(400).json({ message: 'Pickup and destination are required' });
  }

  const id = Date.now().toString();
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  // Get customer info
  const customer = db.prepare('SELECT name, phone FROM users WHERE id = ?').get(req.user.id);
  
  db.prepare(`
    INSERT INTO bookings (
      id, customerId, customerName, status, pickup, destination,
      distance, baseFare, rideFare, total, eta, safeRideEnabled, rideType, otp, createdAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    req.user.id,
    customer?.name || 'Unknown',
    'pending',
    pickup,
    destination,
    distance,
    Number(baseFare),
    Number(rideFare),
    Number(total),
    eta,
    safeRideEnabled ? 1 : 0,
    rideType,
    otp,
    new Date().toISOString()
  );

  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);

  res.status(201).json({ message: 'Cab requested successfully', booking });
};

export const getBookings = (req, res) => {
  let bookings;
  if (req.user.role === 'admin') {
    bookings = db.prepare('SELECT * FROM bookings ORDER BY createdAt DESC').all();
  } else if (req.user.role === 'driver') {
    const driver = db.prepare('SELECT verified FROM users WHERE id = ?').get(req.user.id);
    const isVerified = driver && (driver.verified === 1 || driver.verified === true);

    if (isVerified) {
      bookings = db.prepare('SELECT * FROM bookings WHERE status = ? OR driverId = ? ORDER BY createdAt DESC').all('pending', req.user.id);
    } else {
      bookings = db.prepare(`
        SELECT * FROM bookings 
        WHERE (status = 'pending' AND (safeRideEnabled = 0 OR safeRideEnabled IS NULL)) 
           OR driverId = ? 
        ORDER BY createdAt DESC
      `).all(req.user.id);
    }
    // Mask OTP so driver cannot see it before rider provides it
    bookings = bookings.map(b => ({ ...b, otp: undefined }));
  } else if (req.user.role === 'customer') {
    bookings = db.prepare('SELECT * FROM bookings WHERE customerId = ? ORDER BY createdAt DESC').all(req.user.id);
  }
  return res.json(bookings || []);
};

export const acceptBooking = (req, res) => {
  const { bookingId } = req.params;
  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
  
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (booking.status !== 'pending') return res.status(400).json({ message: 'Booking is not available' });

  const driver = db.prepare('SELECT name, phone, vehicleModel, vehicleNumber, rating, verified FROM users WHERE id = ?').get(req.user.id);

  if (booking.safeRideEnabled && (!driver || !driver.verified)) {
    return res.status(403).json({ message: 'Only verified drivers can accept SafeRide requests' });
  }

  const otp = booking.otp || Math.floor(1000 + Math.random() * 9000).toString();

  db.prepare(`
    UPDATE bookings 
    SET status = 'accepted', driverId = ?, driverName = ?, driverPhone = ?, vehicleModel = ?, vehicleNumber = ?, driverRating = ?, otp = ? 
    WHERE id = ?
  `).run(
    req.user.id,
    driver?.name || 'Driver',
    driver?.phone || '+91 98001 11234',
    driver?.vehicleModel || 'Standard Sedan',
    driver?.vehicleNumber || 'KL 07 AX 4521',
    driver?.rating || 4.8,
    otp,
    bookingId
  );

  const updatedBooking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
  res.json({ message: 'Booking accepted', booking: updatedBooking });
};

export const startBooking = (req, res) => {
  const { bookingId } = req.params;
  const { otp } = req.body;
  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
  if (!otp || String(booking.otp || '1234').trim() !== String(otp).trim()) {
    return res.status(400).json({ message: 'Invalid OTP. Please ask the passenger for the correct 4-digit PIN.' });
  }

  db.prepare("UPDATE bookings SET status = 'in_progress' WHERE id = ?").run(bookingId);
  const updatedBooking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
  res.json({ message: 'Ride started successfully', booking: updatedBooking });
};

export const completeBooking = (req, res) => {
  const { bookingId } = req.params;
  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
  db.prepare("UPDATE bookings SET status = 'completed' WHERE id = ?").run(bookingId);
  if (booking.driverId) {
    db.prepare("UPDATE users SET totalRides = COALESCE(totalRides, 0) + 1 WHERE id = ?").run(booking.driverId);
  }
  res.json({ message: 'Booking completed' });
};

export const cancelBooking = (req, res) => {
  const { bookingId } = req.params;
  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
  db.prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?").run(bookingId);
  res.json({ message: 'Booking cancelled' });
};
