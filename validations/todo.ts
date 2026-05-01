import { MESSAGES } from "@/utils/messages";
import z from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(3, MESSAGES.TITLE.MIN)
    .max(100, MESSAGES.TITLE.MIN)
    .trim(),

  description: z.string().max(500, MESSAGES.DESC.MAX_LENGTH).optional(),
  priority: z
    .enum([
      MESSAGES.PRIORITY.LOW,
      MESSAGES.PRIORITY.MEDIUM,
      MESSAGES.PRIORITY.HIGH,
    ])
    .default(MESSAGES.PRIORITY.MEDIUM),
});

export type FormValues = z.infer<typeof createTodoSchema>;
