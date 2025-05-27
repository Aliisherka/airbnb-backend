import { Router } from 'express';
import { auth, completeProfile, uploadUserAvatar } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';
import { uploadAvatar } from '../middleware/upload';

const router = Router();

router.post('/auth', auth);
router.patch('/auth/complete-profile', authenticate, completeProfile);

router.post('/profile/avatar', authenticate, uploadAvatar.single('avatar'), uploadUserAvatar)

export default router;