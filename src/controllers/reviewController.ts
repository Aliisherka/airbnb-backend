import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import House from '../models/house';
import Review from '../models/review';
import calculateAverageRating from '../utils/calculateAverageRating';
import HttpError from '../utils/HttpError';


export const createReview = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { rating, comment, houseId } = req.body;
  const userId = req.user?.userId;

  if (rating < 1 || rating > 5) {
    return next(new HttpError('Rating must be between 1 and 5', 400));
  }

  const house = await House.findById(houseId)
  if (!house) return next(new HttpError('House not found', 404));

  const alreadyBooked = house.bookedDates.some(date =>
    new Date(date.departure) < new Date() &&
    String(house.userId) !== userId
  )
  if (!alreadyBooked) return next(new HttpError('You can only review after staying', 403));

  const existing = await Review.findOne({ houseId, userId })
  if (existing) return next(new HttpError('You already left a review for this house', 409));

  const review = await Review.create({ houseId, userId, rating, comment })

  const { avgRating, reviewCount } = await calculateAverageRating(houseId);
  await House.findByIdAndUpdate(houseId, { avgRating, reviewCount });
  
  res.status(201).json(review)
}

export const getReviews = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
  
    const reviews = await Review.find({ houseId: id })
      .populate('userId', 'name createdAt avatarUrl')

    res.status(200).json(reviews)
  } catch (err) {
    next(err);
  }
}