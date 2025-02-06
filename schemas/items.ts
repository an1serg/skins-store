import { z } from 'zod';

export const getItemsSchema = z.object({
  app_id: z.string().optional(),
  currency: z.string().optional(),
});