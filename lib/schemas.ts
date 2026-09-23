import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.enum(["general", "prayer", "visit", "ministry", "other"], {
    errorMap: () => ({ message: "Please select a subject" }),
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

export const PrayerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  request: z.string().min(10, "Please share a bit more about your request"),
  isAnonymous: z.boolean(),
  isUrgent: z.boolean(),
});

export type PrayerFormData = z.infer<typeof PrayerSchema>;
