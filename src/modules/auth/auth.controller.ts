import { Request, Response } from "express";
import * as authService from "./auth.service";
import { uploadToCloudinary } from "../../lib/cloudinary";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const uploadKyc = async (req: any, res: Response) => {
  try {
    const { userId, aadharNumber } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Aadhar image required" });
    }

    const upload = await uploadToCloudinary(req.file.path);

    const result = await authService.submitKyc(
      userId,
      aadharNumber,
      upload.url
    );

    res.status(201).json({
      success: true,
      message: "KYC submitted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
