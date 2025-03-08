import mongoose from "mongoose";

interface IHouse {
  title: string;
  price: string;
  rating: number;
  images: string[];
  country: string;
}

const HouseSchema = new mongoose.Schema<IHouse>({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  country: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model<IHouse>('House', HouseSchema);