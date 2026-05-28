import { z } from "zod";

export const chatMessageSchema = z.object({
  message: z.string().min(1, "El mensaje no puede estar vacío").max(500),
});

export const initiativeFilterSchema = z.object({
  region: z.string().optional(),
  category: z.string().optional(),
  year: z.number().optional(),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
export type InitiativeFilterInput = z.infer<typeof initiativeFilterSchema>;
