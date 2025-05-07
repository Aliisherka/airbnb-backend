import mongoose from "mongoose";

interface IUser {
  phoneNumber: string;
  password: string;
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
  }
}, { timestamps: true, versionKey: false })

export default mongoose.model<IUser>('User', UserSchema, 'users');