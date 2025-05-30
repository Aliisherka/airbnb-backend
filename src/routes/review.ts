import { Router } from 'express';
import { createReview, getReviews } from '../controllers/reviewController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/reviews', authenticate, createReview);
router.get('/reviews/:id', getReviews);

export default router;