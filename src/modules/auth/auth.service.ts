import bcrypt from "bcrypt";
import prisma from "../../config/prisma";
import { generateToken } from "../../lib/jwt";

type RegisterInput = {
  name: string;
  phone_no: string;
  password: string;
  address: string;
  email: string;
};

type LoginInput = {
  email: string;
  password: string;
};

//////////////////////////////////////
// REGISTER
//////////////////////////////////////

export const register = async (data: RegisterInput) => {
  const existingEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingEmail) {
    const err: any = new Error("Email already registered");
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      phone_no: data.phone_no,
      password: hashedPassword,
      address: data.address,
      email: data.email,
      verificationStatus: "PENDING",
      role: "USER",
    },
    select: {
      user_id: true,
      name: true,
      email: true,
      verificationStatus: true,
    },
  });

  return user;
};

//////////////////////////////////////
// SUBMIT KYC
//////////////////////////////////////

export const submitKyc = async (
  userId: string,
  aadharNumber: string,
  imageUrl: string
) => {
  const existingKyc = await prisma.kyc.findUnique({
    where: { userId },
  });

  if (existingKyc) {
    const err: any = new Error("Documents already submitted");
    err.statusCode = 409;
    throw err;
  }

  return prisma.kyc.create({
    data: {
      userId,
      aadharNumber,
      aadharImage: imageUrl,
    },
  });
};

//////////////////////////////////////
// LOGIN
//////////////////////////////////////

export const login = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    include: { kyc: true },
  });

  if (!user) {
    const err: any = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    const err: any = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  //////////////////////////////////////
  // 🔥 ADMIN LOGIN (Bypass KYC & Verification)
  //////////////////////////////////////
  if (user.role === "ADMIN") {
    const token = generateToken({
      user_id: user.user_id,
      role: user.role,
    });

    return {
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  //////////////////////////////////////
  // 🚨 USER FLOW BELOW
  //////////////////////////////////////

  // KYC NOT SUBMITTED
  if (!user.kyc) {
    const err: any = new Error("Please submit your documents to continue");
    err.statusCode = 403;
    throw err;
  }

  // UNDER REVIEW
  if (user.verificationStatus === "PENDING") {
    const err: any = new Error(
      "Your documents are under review. Please wait for admin approval."
    );
    err.statusCode = 403;
    throw err;
  }

  // REJECTED
  if (user.verificationStatus === "REJECTED") {
    const err: any = new Error(
      "Your documents were rejected. Please resubmit."
    );
    err.statusCode = 403;
    throw err;
  }

  // VERIFIED USER
  if (user.verificationStatus === "VERIFIED") {
    const token = generateToken({
      user_id: user.user_id,
      role: user.role,
    });

    return {
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
};
