import { Router } from "express";
import { uploadKyc } from "./kyc.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { upload } from "../upload/upload.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
  ]),
  uploadKyc
);

export default router;