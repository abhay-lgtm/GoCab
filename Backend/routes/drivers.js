import express from 'express';
import { getMe } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

// We can just reuse getMe since it gets the profile from the users table.
// We can optionally add an authorize check for 'driver' role.
router.get('/me', authorize(['driver']), getMe);

export default router;
