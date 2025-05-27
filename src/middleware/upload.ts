import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const houseImageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'airbnb-houses',
    public_id: `${Date.now()}-${uuidv4()}`,
  }),
});

export const uploadHouseImages = multer({ storage: houseImageStorage });

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'airbnb-avatars',
    public_id: `avatar-${Date.now()}-${uuidv4()}`,
    transformation: [{ width: 300, height: 300, crop: 'fill', gravity: 'face' }],
  })
});

export const uploadAvatar = multer({ storage: avatarStorage });