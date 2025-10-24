import { v2 as cloudinary } from "cloudinary";
import { getEnvVar } from "./getEnvVar.js";
import { unlink } from "node:fs/promises";

const cloud_name = getEnvVar("CLOUDINARY_CLOUD_NAME");
const api_key = getEnvVar("CLOUDINARY_API_KEY");
const api_secret = getEnvVar("CLOUDINARY_API_SECRET");

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});
export const saveFileToCloudinary = async (file) => {
  const { secure_url } = await cloudinary.uploader.upload(file.path, {
    folder: "e-pharmacy",
  });

  await unlink(file.path);
  return secure_url;
};
