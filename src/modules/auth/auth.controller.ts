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
