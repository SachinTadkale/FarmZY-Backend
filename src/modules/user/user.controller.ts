import { submitKYC } from "./user.service";

export const uploadKYC = async (req: any, res: any) => {
  const userId = req.user.id;

  const result = await submitKYC(
    userId,
    req.file,
    req.body.aadharNumber
  );

  res.json({
    success: true,
    message: "KYC submitted successfully",
    data: result,
  });
};
