import mongoose, { Types } from 'mongoose';

interface IReview {
  userId: Types.ObjectId;
  houseId: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt?: Date;
}

const ReviewSchema = new mongoose.Schema<IReview>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', reqired: true },
  houseId: { type: mongoose.Schema.Types.ObjectId, ref: 'House', reqired: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String }
}, { timestamps: true });

export default mongoose.model<IReview>('Review', ReviewSchema);