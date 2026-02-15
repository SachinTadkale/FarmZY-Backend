import z from "zod";

export const validateUser = z.object({
    phone: z.string().min(10),
    password: z.string().min(6)
});