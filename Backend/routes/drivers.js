import express from 'express';
import { getMe } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import db from '../data/database.js';

const router = express.Router();

router.use(authenticate);

// Driver gets their own profile
router.get('/me', authorize(['driver']), getMe);

// Admin verifies / unverifies driver
router.post('/:driverId/verify', authorize(['admin']), (req, res) => {
  const { driverId } = req.params;
  const { verified } = req.body;
  const driver = db.prepare("SELECT * FROM users WHERE id = ? AND role = 'driver'").get(driverId);
  if (!driver) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  const newVerified = verified !== undefined ? (verified ? 1 : 0) : (driver.verified ? 0 : 1);
  db.prepare('UPDATE users SET verified = ? WHERE id = ?').run(newVerified, driverId);

  const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(driverId);
  const { password, ...driverProfile } = updated;
  res.json({ message: `Driver ${newVerified ? 'verified' : 'unverified'} successfully`, driver: driverProfile });
});

router.put('/:driverId/verify', authorize(['admin']), (req, res) => {
  const { driverId } = req.params;
  const { verified } = req.body;
  const driver = db.prepare("SELECT * FROM users WHERE id = ? AND role = 'driver'").get(driverId);
  if (!driver) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  const newVerified = verified !== undefined ? (verified ? 1 : 0) : (driver.verified ? 0 : 1);
  db.prepare('UPDATE users SET verified = ? WHERE id = ?').run(newVerified, driverId);

  const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(driverId);
  const { password, ...driverProfile } = updated;
  res.json({ message: `Driver ${newVerified ? 'verified' : 'unverified'} successfully`, driver: driverProfile });
});

export default router;
