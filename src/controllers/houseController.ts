import { Request, Response, NextFunction } from 'express';
import House from "../models/house";
import HttpError from '../utils/HttpError';
import { resolveLocation } from '../utils/locationHelper';

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
    const { 
      title, 
      country, 
      price, 
      rating, 
      city, 
      guests, 
      bedrooms, 
      beds, 
      bathrooms,
      allowPets = false,
      allowInfants = false,
      maxPets = 0,
      maxInfants = 0
    } = req.body;
    const imageUrls = (req.files as Express.Multer.File[])?.map(file => file.path);

    if (!title || !price || !rating || !imageUrls || !city || !guests || !bedrooms || !beds || !bathrooms) {
      return next(new HttpError('All fields are required', 400));
    }

    if (allowInfants && (!maxInfants || maxInfants < 1)) {
      return next(new HttpError('You must specify maxInfants if infants are allowed', 400));
    }
    
    if (allowPets && (!maxPets || maxPets < 1)) {
      return next(new HttpError('You must specify maxPets if pets are allowed', 400));
    }

    const newHouse = new House({
      title,
      country,
      price,
      rating,
      images: imageUrls,
      city,
      guests,
      bedrooms,
      beds,
      bathrooms,
      allowPets: Boolean(allowPets),
      allowInfants: Boolean(allowInfants),
      maxInfants: allowInfants ? maxInfants : 0,
      maxPets: allowPets ? maxPets : 0
    });

    await newHouse.save();
    res.status(201).json(newHouse);
  } catch (err) {
    next(err);
  }
};

export const searchHouses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      location, 
      totalAdults = '0',
      pets = '0',
      infants = '0',
      arrival,
      departure
    } = req.query;

    const totalGuests = parseInt(totalAdults as string);

    const query: any = {};

    if (!isNaN(totalGuests) && totalGuests > 0) {
      query.guests = { $gte: totalGuests };
    }

    if (parseInt(infants as string) > 0) {
      query.allowInfants = true;
      query.maxInfants = { $gte: infants };
    }

    if (parseInt(pets as string) > 0) {
      query.allowPets = true;
      query.maxPets = { $gte: pets };
    }

    if (location && typeof location === 'string') {
      const resolved = await resolveLocation(location);
      if (resolved.country) {
        query.country = resolved.country;
      } else if (resolved.city) {
        query.city = resolved.city;
      } else {
        return next(new HttpError('Location not found', 400));
      }
    }

    const arrivalDate = arrival ? new Date(arrival as string) : null;
    const departureDate = departure ? new Date(departure as string) : null;

    if (arrivalDate && departureDate) {
      query.bookedDates = {
        $not: {
          $elemMatch: {
            arrival: { $lt: departureDate },
            departure: { $gt: arrivalDate }
          }
        }
      };
    }

    const houses = await House.find(query).sort({ createdAt: -1 });

    res.status(200).json(houses);
  } catch (err) {
    next(err);
  }
};