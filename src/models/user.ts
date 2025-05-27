import mongoose from "mongoose";

interface IUser {
  phoneNumber: string;
  password: string;
  name?: string;
  avatarUrl?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatarUrl: {
    type: String,
  }
}, { timestamps: true, versionKey: false })

export default mongoose.model<IUser>('User', UserSchema, 'users');