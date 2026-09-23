"use server";

import { PrayerSchema, type PrayerFormData } from "@/lib/schemas";

export type PrayerActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<keyof PrayerFormData, string[]>>;
};

export async function submitPrayerRequest(
  _prev: PrayerActionState,
  formData: FormData,
): Promise<PrayerActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    request: formData.get("request"),
    isAnonymous: formData.get("isAnonymous") === "on",
    isUrgent: formData.get("isUrgent") === "on",
  };

  const result = PrayerSchema.safeParse(raw);

  if (!result.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: result.error.flatten().fieldErrors as Partial<
        Record<keyof PrayerFormData, string[]>
      >,
    };
  }

  // TODO: route to prayer team via email / internal CRM
  console.log("[Prayer request]", result.data);

  return {
    status: "success",
    message:
      "Your request has been received. Our prayer team will be praying for you.",
  };
}
