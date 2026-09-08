import db from '../data/database.js';

export const requestCab = (req, res) => {
  const { pickup, dropoff } = req.body;
  if (!pickup || !dropoff) {
    return res.status(400).json({ message: 'Pickup and dropoff are required' });
  }

  const id = Date.now().toString();
  // Get customer info
  const customer = db.prepare('SELECT name FROM users WHERE id = ?').get(req.user.id);
  
  db.prepare(`
    INSERT INTO bookings (id, customerId, customerName, status, pickup, destination, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, req.user.id, customer?.name || 'Unknown', 'pending', pickup, dropoff, new Date().toISOString());

  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);

  res.status(201).json({ message: 'Cab requested successfully', booking });
};

export const getBookings = (req, res) => {
  let bookings;
  if (req.user.role === 'admin') {
    bookings = db.prepare('SELECT * FROM bookings').all();
  } else if (req.user.role === 'driver') {
    bookings = db.prepare('SELECT * FROM bookings WHERE status = ?').all('pending');
  } else if (req.user.role === 'customer') {
    bookings = db.prepare('SELECT * FROM bookings WHERE customerId = ?').all(req.user.id);
  }
  return res.json(bookings || []);
};

export const acceptBooking = (req, res) => {
  const { bookingId } = req.params;
  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
  
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (booking.status !== 'pending') return res.status(400).json({ message: 'Booking is not available' });

  const driver = db.prepare('SELECT name, phone, vehicleModel, vehicleNumber, rating FROM users WHERE id = ?').get(req.user.id);

  db.prepare(`
    UPDATE bookings 
    SET status = 'accepted', driverId = ?, driverName = ?, driverPhone = ?, vehicleModel = ?, vehicleNumber = ?, driverRating = ? 
    WHERE id = ?
  `).run(req.user.id, driver?.name, driver?.phone, driver?.vehicleModel, driver?.vehicleNumber, driver?.rating, bookingId);

  const updatedBooking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
  res.json({ message: 'Booking accepted', booking: updatedBooking });
};

export const completeBooking = (req, res) => {
  const { bookingId } = req.params;
  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
  db.prepare("UPDATE bookings SET status = 'completed' WHERE id = ?").run(bookingId);
  res.json({ message: 'Booking completed' });
};

export const cancelBooking = (req, res) => {
  const { bookingId } = req.params;
  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
  db.prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?").run(bookingId);
  res.json({ message: 'Booking cancelled' });
};
