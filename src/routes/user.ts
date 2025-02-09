import { Router } from 'express';
import { auth } from '../controllers/userController';

const router = Router();

router.post('/auth', auth);

export default router;