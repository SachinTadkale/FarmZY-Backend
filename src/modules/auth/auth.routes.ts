import { Router } from "express";
import {
  registerUser,
  loginUser,
} from "./auth.controller";
import { upload } from "../upload/upload.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;