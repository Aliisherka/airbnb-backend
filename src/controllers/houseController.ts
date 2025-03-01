import { Request, Response, NextFunction } from 'express';
import House from "../models/house";

export const getHouses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const house = await House.find();
    res.json(house);
  } catch (err) {
    next(err);
  }
}