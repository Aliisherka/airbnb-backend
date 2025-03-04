import { Request, Response, NextFunction } from 'express';
import House from "../models/house";
import HttpError from '../utils/HttpError';

export const getHouses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const house = await House.find().sort({ createdAt: -1 });;
    res.json(house);
  } catch (err) {
    next(err);
  }
}

export const createHouse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, country, price, rating } = req.body;
    const imageUrl = req.file?.path;

    if (!title || !price || !rating || !imageUrl) {
      return next(new HttpError('All fields are required', 400));
    }

    const newHouse = new House({ title, country, price, rating, image: imageUrl });

    await newHouse.save();
    res.status(201).json(newHouse);
  } catch (err) {
    next(err);
  }
};