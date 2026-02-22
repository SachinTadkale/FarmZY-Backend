import { Router } from "express";
import { createBank } from "./bank.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createBank);

export default router;