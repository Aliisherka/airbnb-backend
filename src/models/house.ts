import mongoose from "mongoose";

interface IHouse {
  title: string;
  price: number;
  rating: number;
  images: string[];
  country: string;
  city: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

const HouseSchema = new mongoose.Schema<IHouse>({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
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
  },
  city: {
    type: String,
    required: true
  },
  guests: { 
    type: Number, 
    required: true 
  },
  bedrooms: { 
    type: Number, 
    required: true 
  },
  beds: { 
    type: Number, 
    required: true 
  },
  bathrooms: { 
    type: Number, 
    required: true 
  }
}, { timestamps: true, versionKey: false })

export default mongoose.model<IHouse>('House', HouseSchema);