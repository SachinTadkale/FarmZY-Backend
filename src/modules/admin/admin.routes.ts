import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";
import { approveUser, getPendingUsers, rejectUser } from "./admin.controller";

const router = Router();

router.get(
  "/pending-kyc",
  authMiddleware,
  adminOnly,
  getPendingUsers
);

router.patch(
  "/verify/:id",
  authMiddleware,
  adminOnly,
  approveUser
);

router.patch(
  "/reject/:id",
  authMiddleware,
  adminOnly,
  rejectUser
);


export default router;
