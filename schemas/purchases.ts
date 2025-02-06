import { z } from 'zod';

export const buyProductSchema = z.object({
  sessionId: z.string(),
  productId: z.number(),
});