import { Request, Response } from "express";
import * as bankService from "./bank.service";
import { bankSchema } from "./bank.validation";

export const createBank = async (req: Request, res: Response) => {
  const parsed = bankSchema.parse(req.body);

  const bank = await bankService.addBank(req.user.userId, parsed);

  res.status(201).json({
    success: true,
    data: bank,
  });
};