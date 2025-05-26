import { Router } from 'express';
import { auth, completeProfile } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/auth', auth);
router.patch('/auth/complete-profile', authenticate, completeProfile);

export default router;