import prisma from "../../config/prisma";
import cloudinary from "../../lib/cloudinary";

export const submitKYC = async (userId: string, file: any, aadhar: string) => {

  const upload = await cloudinary.uploader.upload(file.path);

  return prisma.kyc.create({
    data: {
      userId,
      aadharNumber: aadhar,
      aadharImage: upload.secure_url,
    },
  });
};
