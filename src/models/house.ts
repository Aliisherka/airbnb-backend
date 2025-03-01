import mongoose from "mongoose";

interface IHouse {
  title: string;
  price: string;
  rating: number;
  image: string;
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
  image: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model<IHouse>('House', HouseSchema);