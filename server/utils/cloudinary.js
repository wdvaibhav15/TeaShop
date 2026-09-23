import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    console.log("Cloudinary Config:");
    console.log("Cloud Name:", process.env.CLOUDINARY_NAME);
    console.log("API Key:", process.env.CLOUDINARY_API_KEY);
    console.log("File Path:", localFilePath);

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "coffee_items",
      resource_type: "auto",
    });

    console.log("Cloudinary Upload Success:");
    console.log(result.secure_url);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:");

    if (error.error) {
      console.error(error.error);
    }

    console.error(error);

    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;