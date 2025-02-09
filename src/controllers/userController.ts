import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import HttpError from '../utils/HttpError';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return next(new HttpError('All fields are required', 400));
    }

    let user = await User.findOne({ phoneNumber });
    let isNewUser = false;

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(new HttpError('Incorrect phone number or password', 401));
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ phoneNumber, password: hashedPassword });
      await user.save();
      isNewUser = true;
    }

    const token = jwt.sign(
      { userId: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      data: {
        message: isNewUser ? 'Registration successful' : 'Login successful',
        token,
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
