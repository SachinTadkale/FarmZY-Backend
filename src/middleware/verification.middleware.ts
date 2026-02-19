import prisma from "../config/prisma";

export const verifiedOnly = async (req: any, res: any, next: any) => {
  const user = await prisma.user.findUnique({
    where: { user_id: req.user.user_id },
  });

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (user.verificationStatus !== "VERIFIED") {
    return res.status(403).json({
      message: "Account verification required. Please wait for approval.",
    });
  }

  next();
};
