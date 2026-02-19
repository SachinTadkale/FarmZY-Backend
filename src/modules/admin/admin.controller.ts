import { Request, Response } from "express";
import * as adminService from "./admin.service";

export const getPendingUsers = async (req: Request, res: Response) => {
  const users = await adminService.getPendingKyc();
  res.json({ success: true, data: users });
};

export const approveUser = async (req: Request, res: Response) => {
  const user = await adminService.verifyUser(req.params.id as string);
  res.json({ success: true, data: user });
};

export const rejectUser = async (req: Request, res: Response) => {
  const user = await adminService.rejectUser(req.params.id as string);
  res.json({ success: true, data: user });
};
