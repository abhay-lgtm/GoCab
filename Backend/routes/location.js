import express from 'express';
import {
  updateLocation,
  getLocation,
  createShareToken,
  getSharedLocation,
  getDistance,
} from '../controllers/locationController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── Public routes (no auth) ──────────────────────────────────────────────────
// Anyone with the token link can view the shared location
router.get('/shared/:token', getSharedLocation);

// ── Authenticated routes ─────────────────────────────────────────────────────
router.use(authenticate);

// Driver or customer updates their own location
router.post('/update', authorize(['customer', 'driver']), updateLocation);

// Customer creates a shareable location link for their active ride
router.post('/share', authorize(['customer']), createShareToken);

// Get distance between two place names (used by RideConfirmation)
router.get('/distance', authorize(['customer']), getDistance);

// Get location of any user by userId (customer viewing driver's location)
router.get('/:userId', authorize(['customer', 'driver', 'admin']), getLocation);

export default router;
