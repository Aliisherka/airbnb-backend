import mongoose from 'mongoose';

interface ILocation {
  name: string;
  countryCode: string;
  alternateNames: string[];
  type: string;
}

const LocationSchema = new mongoose.Schema<ILocation>({
  name: { type: String, required: true},
  countryCode: { type: String, required: true},
  alternateNames: { type: [String], required: true },
  type: { type: String, required: true}
}, { versionKey: false });

export default mongoose.model<ILocation>('Location', LocationSchema);