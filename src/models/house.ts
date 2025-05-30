import mongoose, { Types } from "mongoose";

interface IHouse {
  title: string;
  price: number;
  currency: string;
  avgRating: number;
  reviewCount: number;
  images: string[];
  country: string;
  city: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  allowPets?: boolean;
  maxPets?: number;
  allowInfants?: boolean;
  maxInfants?: number;
  bookedDates: { arrival: Date; departure: Date }[];
  userId: Types.ObjectId
}

const BookedDateSchema = new mongoose.Schema(
  {
    arrival: { type: Date, required: true },
    departure: { type: Date, required: true },
  },
  { _id: false }
);

const HouseSchema = new mongoose.Schema<IHouse>({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  avgRating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
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
  },
  allowPets: {
    type: Boolean,
    default: false
  },
  maxPets: { 
    type: Number, 
    default: 0 
  },
  allowInfants: {
    type: Boolean,
    default: false
  },
  maxInfants: { 
    type: Number, 
    default: 0 
  },
  bookedDates: {
    type: [BookedDateSchema],
    default: []
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true, versionKey: false })

export default mongoose.model<IHouse>('House', HouseSchema);