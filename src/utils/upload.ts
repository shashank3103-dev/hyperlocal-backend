import { cloudinary } from "../infra/cloudnary";
import fs from "fs";

export async function uploadToCloudinary(
  filePath: string,
  folder = "hyperlocal"
) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "image",
    });

    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (err) {
    throw new Error("Image upload failed: " + (err as any).message);
  }
}
