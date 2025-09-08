import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config(); // Load .env file

// ✅ Setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hotel-rooms", // Folder name in cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// ✅ Multer middleware
export const upload = multer({ storage });
