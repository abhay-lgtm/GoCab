import express from 'express';
import { updateLocation, getLocation, getShareableLink } from '../controllers/locationController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/update', authorize(['customer', 'driver']), updateLocation);
router.get('/share', authorize(['customer']), getShareableLink);

// Public route to view a shared location (no auth required for anyone with the link)
router.get('/share/:userId', getLocation);

export default router;
