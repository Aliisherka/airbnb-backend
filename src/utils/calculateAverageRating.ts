import mongoose from 'mongoose';
import Review from '../models/review';

const calculateAverageRating = async (houseId: string) => {
  const result = await Review.aggregate([
    { $match: { houseId: new mongoose.Types.ObjectId(houseId) } },
    { $group: {
      _id: '$houseId',
      avgRating: { $avg: '$rating' },
      reviewCount: { $sum: 1 }
    }}
  ]);

  return result[0] || { avgRating: 0, reviewCount: 0 };
}

export default calculateAverageRating;