import express from 'express';
import { getExchangeRateHandler } from '../controllers/exchangeRateController.ts';

const router = express.Router();

router.get('/exchange-rate', getExchangeRateHandler);

export default router;