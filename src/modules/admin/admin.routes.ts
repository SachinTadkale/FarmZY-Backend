import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";
import {
  approveUser,
  getPendingUsers,
  rejectUser,
} from "./admin.controller";

const router = Router();

// Get all pending KYC users
router.get(
  "/users/pending-kyc",
  authMiddleware,
  adminOnly,
  getPendingUsers
);

// Approve user
router.patch(
  "/users/:id/approve",
  authMiddleware,
  adminOnly,
  approveUser
);

// Reject user
router.patch(
  "/users/:id/reject",
  authMiddleware,
  adminOnly,
  rejectUser
);

export default router;