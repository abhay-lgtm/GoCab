import express from 'express';
import { getMe, updateMe } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/me', getMe);
router.put('/me', updateMe);
router.post('/me', updateMe);

export default router;
