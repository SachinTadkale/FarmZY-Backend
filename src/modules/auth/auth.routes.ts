import { Router } from "express";
import {
  registerUser,
  uploadKyc,
  loginUser,
} from "./auth.controller";
import { upload } from "../upload/upload.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/register/kyc", upload.single("aadharImage"), uploadKyc);
router.post("/login", loginUser);

export default router;