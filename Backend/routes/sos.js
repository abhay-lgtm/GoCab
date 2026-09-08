import express from 'express';
import { triggerSOS, getSOSAlerts, resolveSOS } from '../controllers/sosController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/trigger', authorize(['customer', 'driver']), triggerSOS);
router.get('/', authorize(['admin']), getSOSAlerts);
router.post('/:alertId/resolve', authorize(['admin']), resolveSOS);

export default router;
