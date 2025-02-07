import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return next(new HttpError('All fields are required', 400));
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return next(new HttpError('Incorrect email or password', 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new HttpError('Incorrect email or password', 401));
    }

    const token = jwt.sign(
      { userId: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      data: {
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
        },
      },
    });
  } catch (err) {
    next(err)
  }
}