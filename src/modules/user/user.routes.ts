import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { verifiedOnly } from "../../middleware/verification.middleware";

const router = Router();

/**
 * User Dashboard
 * GET /api/user/dashboard
 */
router.get(
  "/dashboard",
  authMiddleware,
  verifiedOnly,
  (req: any, res) => {
    res.status(200).json({
      success: true,
      message: "Dashboard access granted",
      user: req.user,
    });
  }
);

export default router;
