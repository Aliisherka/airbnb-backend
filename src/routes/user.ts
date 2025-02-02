import { Router } from 'express';
import { register } from '../controllers/userController';

const router = Router();

router.post('/register', register);
// router.post('/login', login);

export default router;