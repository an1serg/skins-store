import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export const changePasswordSchema = z.object({
  sessionId: z.string(),
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});