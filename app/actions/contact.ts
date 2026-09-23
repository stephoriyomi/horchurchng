"use server";

import { ContactSchema, type ContactFormData } from "@/lib/schemas";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<keyof ContactFormData, string[]>>;
};

export async function submitContact(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const result = ContactSchema.safeParse(raw);

  if (!result.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: result.error.flatten().fieldErrors as Partial<
        Record<keyof ContactFormData, string[]>
      >,
    };
  }

  // TODO: send email via Resend / SendGrid / Nodemailer
  // For now, log server-side and return success
  console.log("[Contact form submission]", result.data);

  return {
    status: "success",
    message:
      "Thank you — we received your message and will be in touch within 2 business days.",
  };
}
