import { Request, Response, NextFunction } from 'express';
import { transliterate } from 'transliteration';
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

export const getHouseById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const house = await House.findById(id); // Ищем дом по _id
    if (!house) {
      return next(new HttpError('Дом не найден', 404));
    }
    res.json(house);
  } catch (err) {
    next(err);
  }
};

export const createHouse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, country, price, rating, city, guests, bedrooms, beds, bathrooms } = req.body;
    const imageUrls = (req.files as Express.Multer.File[])?.map(file => file.path);

    if (!title || !price || !rating || !imageUrls || !city || !guests || !bedrooms || !beds || !bathrooms) {
      return next(new HttpError('All fields are required', 400));
    }

    const newHouse = new House({ title, country, price, rating, images: imageUrls, city, guests, bedrooms, beds, bathrooms });

    await newHouse.save();
    res.status(201).json(newHouse);
  } catch (err) {
    next(err);
  }
};

export const searchHouses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { location } = req.query;
    if (!location || typeof location !== 'string') {
      return next(new HttpError('Location parameter is required and must be a string', 400));
    }

    const searchLocation = transliterate(location.trim().toLowerCase());

    const houses = await House.find({
      $or: [
        { city: { $regex: new RegExp(searchLocation, "i") } },
        { country: { $regex: new RegExp(searchLocation, "i") } },
      ],
    });

    res.status(200).json(houses);
  } catch (err) {
    next(err);
  }
};