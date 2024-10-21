import cloudinaryPackage from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const cloudinary = cloudinaryPackage.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");

    return {
      folder: "Course Selling Website",
      resource_type: isVideo ? "video" : "image",
      allowedFormats: isVideo ? ["mp4", "mov", "avi"] : ["jpeg", "png", "jpg"],
    };
  },
});

const upload = multer({
  storage,
});

export default upload;
