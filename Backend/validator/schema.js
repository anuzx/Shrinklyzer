import z from "zod";

export const SingupSchema = z.object({
  name: z.string(),
  password: z.string().min(6),
  email: z.email(),
  role: z.enum(["NORMAL", "ADMIN"]).default("NORMAL")
})

export const SigninSchema = z.object({
  email: z.email(),
  password: z.string()
})
