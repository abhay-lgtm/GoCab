import express from 'express';
import db from '../data/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  const users = db.prepare("SELECT * FROM users WHERE role = 'customer'").all();
  const drivers = db.prepare("SELECT * FROM users WHERE role = 'driver'").all();
  const admin = db.prepare("SELECT * FROM users WHERE role = 'admin'").get();
  const bookings = db.prepare('SELECT * FROM bookings').all();
  const sosAlerts = db.prepare('SELECT * FROM sos_alerts').all();

  // Mocking systemActivity, adminStats, rideRequests as they weren't in instructions to put in DB
  const systemActivity = [];
  const adminStats = { totalUsers: users.length, totalDrivers: drivers.length, totalRides: bookings.length };
  const rideRequests = [];

  const formattedAlerts = sosAlerts.map(a => {
    try {
      return { ...a, location: JSON.parse(a.location) };
    } catch(e) {
      return a;
    }
  });

  res.json({
    users,
    drivers,
    admin,
    bookings,
    sosAlerts: formattedAlerts,
    systemActivity,
    adminStats,
    rideRequests
  });
});

export default router;
