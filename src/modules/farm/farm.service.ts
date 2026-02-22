import prisma from "../../config/prisma";

export const createFarm = async (userId: string, data: any) => {
  const existing = await prisma.farmDetails.findUnique({
    where: { userId },
  });

  if (existing) {
    throw new Error("Farm details already added");
  }

  const farm = await prisma.farmDetails.create({
    data: {
      userId,
      ...data,
    },
  });

  await prisma.user.update({
    where: { user_id: userId },
    data: { registrationStep: 2 },
  });

  return farm;
};