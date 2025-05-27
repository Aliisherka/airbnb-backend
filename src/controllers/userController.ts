import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import HttpError from '../utils/HttpError';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

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
          name: user.name || null,
          avatarUrl: user.avatarUrl || null,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const completeProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    if (!name) return next(new HttpError('Name is required', 400));

    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { name },
      { new: true }
    );

    if (!user) {
      return next(new HttpError('User not found', 404));
    };

    res.json({
      id: user._id,
      phoneNumber: user.phoneNumber,
      name: user.name || null,
      avatarUrl: user.avatarUrl || null,
    });
  } catch (err) {
    next(err);
  }
}

export const uploadUserAvatar = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.file) return next(new HttpError('No file uploaded', 400));

    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { avatarUrl: (req.file as any).path },
      { new: true }
    );

    res.status(200).json({
      message: 'Avatar uploaded successfully',
      avatarUrl: user?.avatarUrl,
    });
  } catch(err) {
    next(err);
  }
}