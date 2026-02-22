import { Request, Response } from "express";
import * as farmService from "./farm.service";
import { farmSchema } from "./farm.validation";

export const addFarm = async (req: Request, res: Response) => {
  const parsed = farmSchema.parse(req.body);

  const farm = await farmService.createFarm(req.user.userId, parsed);

  res.status(201).json({
    success: true,
    data: farm,
  });
};