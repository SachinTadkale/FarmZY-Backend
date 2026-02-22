import { z } from "zod";

export const kycSchema = z.object({
  docType: z.string(),
  docNo: z.string(),
});