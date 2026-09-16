import db from '../data/database.js';
import crypto from 'crypto';

const ORS_BASE = 'https://api.openrouteservice.org';

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Geocode a place name to [lng, lat] using ORS Geocode API.
 * ORS_KEY is read lazily (inside the function) so dotenv has had time to run.
 */
async function geocode(place) {
  const key = process.env.ORS_API_KEY;
  const url = `${ORS_BASE}/geocode/search?api_key=${key}&text=${encodeURIComponent(place)}&boundary.country=IN&size=1`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(`ORS geocode HTTP ${res.status}:`, body.slice(0, 200));
    throw new Error(`Geocoding failed (HTTP ${res.status})`);
  }
  const json = await res.json();
  const coords = json.features?.[0]?.geometry?.coordinates;
  if (!coords) throw new Error(`Could not geocode: ${place}`);
  return coords; // [lng, lat]
}

// ─── Update location (driver or customer) ───────────────────────────────────

export const updateLocation = (req, res) => {
  const { lat, lng } = req.body;
  if (lat == null || lng == null) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  db.prepare(`
    INSERT OR REPLACE INTO locations (userId, lat, lng, timestamp)
    VALUES (?, ?, ?, ?)
  `).run(req.user.id, lat, lng, new Date().toISOString());

  res.json({ message: 'Location updated successfully' });
};

// ─── Get location by userId (authenticated) ─────────────────────────────────

export const getLocation = (req, res) => {
  const { userId } = req.params;
  const loc = db.prepare('SELECT * FROM locations WHERE userId = ?').get(userId);
  if (!loc) return res.status(404).json({ message: 'Location not found for this user' });
  res.json(loc);
};

// ─── Create a shareable location token ──────────────────────────────────────

export const createShareToken = (req, res) => {
  const { bookingId } = req.body;
  if (!bookingId) return res.status(400).json({ message: 'bookingId is required' });

  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (booking.customerId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

  // Reuse existing token if already created for this booking
  let row = db.prepare('SELECT token FROM share_tokens WHERE bookingId = ? AND userId = ?').get(bookingId, req.user.id);
  if (!row) {
    const token = crypto.randomBytes(16).toString('hex');
    db.prepare('INSERT INTO share_tokens (token, userId, bookingId, createdAt) VALUES (?, ?, ?, ?)').run(
      token, req.user.id, bookingId, new Date().toISOString()
    );
    row = { token };
  }

  const frontendBase = process.env.FRONTEND_URL || 'http://localhost:5173';
  const link = `${frontendBase}/track/${row.token}`;
  res.json({ link, token: row.token });
};

// ─── Public: view shared location via token (no auth) ───────────────────────

export const getSharedLocation = (req, res) => {
  const { token } = req.params;
  const shareRow = db.prepare('SELECT * FROM share_tokens WHERE token = ?').get(token);
  if (!shareRow) return res.status(404).json({ message: 'Share link not found or expired' });

  // Check if ride is still active
  const booking = db.prepare('SELECT status, pickup, destination, driverName, vehicleModel, vehicleNumber FROM bookings WHERE id = ?').get(shareRow.bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  if (booking.status === 'completed' || booking.status === 'cancelled') {
    return res.status(410).json({ message: 'This ride has ended. Location sharing is no longer active.' });
  }

  const loc = db.prepare('SELECT lat, lng, timestamp FROM locations WHERE userId = ?').get(shareRow.userId);
  res.json({
    location: loc || null,
    booking: {
      status: booking.status,
      pickup: booking.pickup,
      destination: booking.destination,
      driverName: booking.driverName,
      vehicleModel: booking.vehicleModel,
      vehicleNumber: booking.vehicleNumber,
    },
  });
};

// ─── Distance via ORS (geocode both ends, then route) ───────────────────────

export const getDistance = async (req, res) => {
  const { pickup, dropoff } = req.query;
  if (!pickup || !dropoff) {
    return res.status(400).json({ message: 'pickup and dropoff query params required' });
  }

  try {
    const [startCoords, endCoords] = await Promise.all([
      geocode(pickup),
      geocode(dropoff),
    ]);

    const routeRes = await fetch(`${ORS_BASE}/v2/directions/driving-car`, {
      method: 'POST',
      headers: {
        'Authorization': process.env.ORS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coordinates: [startCoords, endCoords],
      }),
    });

    if (!routeRes.ok) {
      const err = await routeRes.text();
      console.error('ORS route error:', err);
      throw new Error('Route calculation failed');
    }

    const routeJson = await routeRes.json();
    const summary = routeJson.routes?.[0]?.summary;
    if (!summary) throw new Error('No route found');

    const distanceKm = parseFloat((summary.distance / 1000).toFixed(2));
    const durationMin = Math.round(summary.duration / 60);

    res.json({
      distanceKm,
      durationMin,
      pickupCoords: { lat: startCoords[1], lng: startCoords[0] },
      dropoffCoords: { lat: endCoords[1], lng: endCoords[0] },
    });
  } catch (err) {
    console.error('Distance error:', err.message);
    res.status(500).json({ message: err.message || 'Failed to calculate distance' });
  }
};
