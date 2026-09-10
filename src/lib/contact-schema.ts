import { z } from "zod";
import type { Site } from "@/content";

export type ContactValidationMessages = Site["contactPage"]["form"]["validation"];

export function createContactSchema(messages: ContactValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.nameRequired).max(120),
    company: z.string().trim().max(160).optional().or(z.literal("")),
    email: z.email(messages.emailInvalid),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    service: z.string().trim().min(1, messages.serviceRequired),
    message: z.string().trim().min(10, messages.messageMinLength).max(2000),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
