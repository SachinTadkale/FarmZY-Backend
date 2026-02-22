import bcrypt from "bcrypt";
import prisma from "../../config/prisma";
import { generateToken } from "../../lib/jwt";

export const register = async (data: any) => {
  const existingEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingEmail) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      phone_no: data.phone_no,
      password: hashedPassword,
      address: data.address,
      email: data.email,
      gender: data.gender,
      verificationStatus: "PENDING",
      role: "USER",
    },
  });

  const token = generateToken({
    userId: user.user_id,
    role: user.role,
  });

  return { token, user };
};

export const login = async (data: any) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    include: { kyc: true },
  });

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (user.role === "ADMIN") {
    const token = generateToken({
      userId: user.user_id,
      role: user.role,
    });
    return { token, user };
  }

  if (!user.kyc) {
    throw new Error("Please submit your documents to continue");
  }

  if (user.verificationStatus === "PENDING") {
    throw new Error("Your documents are under review.");
  }

  if (user.verificationStatus === "REJECTED") {
    throw new Error("Your documents were rejected.");
  }

  if (user.verificationStatus === "APPROVED") {
    const token = generateToken({
      userId: user.user_id,
      role: user.role,
    });
    return { token, user };
  }

  throw new Error("Unable to login");
};