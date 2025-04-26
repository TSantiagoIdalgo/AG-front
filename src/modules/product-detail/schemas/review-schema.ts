/* eslint-disable no-magic-numbers */
import { z } from 'zod';

export const reviewSchema = z.object({
  description: z.string().optional(),
  title: z.string().min(3).max(60),
});

export type ReviewSchemaType = z.infer<typeof reviewSchema>