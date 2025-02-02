import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import HttpError from '../utils/HttpError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      const error = new HttpError('All fields are required', 400);
      return next(error);
    }

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      const error = new HttpError('Phone number already in use', 400);
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ phoneNumber, password: hashedPassword });
    await newUser.save();

    res.status(201).send({
      data: {
        phoneNumber
      }
    })
  } catch (err) {
    next(err);
  }
}