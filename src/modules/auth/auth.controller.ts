import { Request, Response } from "express";
import * as authService from "./auth.service";
export const registerUser = async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const user = await authService.login(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
};
