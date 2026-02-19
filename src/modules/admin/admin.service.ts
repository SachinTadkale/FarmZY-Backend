import prisma from "../../config/prisma";

export const getPendingKyc = async () => {
  return prisma.user.findMany({
    where: { verificationStatus: "PENDING" },
    include: { kyc: true },
  });
};

export const verifyUser = async (userId: string) => {
  return prisma.user.update({
    where: { user_id: userId },
    data: { verificationStatus: "VERIFIED" },
  });
};

export const rejectUser = async (userId: string) => {
  return prisma.user.update({
    where: { user_id: userId },
    data: { verificationStatus: "REJECTED" },
  });
};
