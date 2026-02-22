import { z } from "zod";

export const bankSchema = z.object({
  accountHolder: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
  ifsc: z.string(),
});