import { NextFunction, Response, Request} from 'express';
import { getExchangeRate } from '../utils/exchangeRates';


export const getExchangeRateHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { from, to } = req.query;
  const rate = await getExchangeRate(from as string, to as string);
  res.json({ rate });
};