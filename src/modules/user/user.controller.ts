import { uploadKycService } from "./user.service";

export const uploadKYC = async (req: any, res: any) => {
  try {
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Document image is required",
      });
    }

    const result = await uploadKycService(
      userId,
      req.file,
      req.body.docNo
    );

    res.status(200).json({
      success: true,
      message: "KYC submitted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};