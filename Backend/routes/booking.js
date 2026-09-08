import express from 'express';
import { requestCab, getBookings, acceptBooking, completeBooking, cancelBooking } from '../controllers/bookingController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/request', authorize(['customer']), requestCab);
router.get('/', authorize(['customer', 'driver', 'admin']), getBookings);
router.post('/:bookingId/accept', authorize(['driver']), acceptBooking);
router.post('/:bookingId/complete', authorize(['driver']), completeBooking);
router.post('/:bookingId/cancel', authorize(['customer', 'driver']), cancelBooking);

export default router;
