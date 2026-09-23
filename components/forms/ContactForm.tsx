"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "./FormField";
import { Button } from "@/components/ui/Button";
import { ContactSchema, type ContactFormData } from "@/lib/schemas";
import { submitContact, type ContactActionState } from "@/app/actions/contact";

const initialState: ContactActionState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-accent-green/10 border border-accent-green/30 p-8 text-center">
        <p className="text-accent-green font-semibold text-lg mb-2">Message sent</p>
        <p className="text-warm-gray-600 text-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit(() => {})}
      noValidate
      className="space-y-5"
    >
      {state.status === "error" && !Object.keys(errors).length && (
        <div role="alert" className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField
          id="name"
          label="Full name"
          required
          type="text"
          autoComplete="name"
          error={errors.name?.message ?? state.fieldErrors?.name?.[0]}
          {...register("name")}
        />
        <FormField
          id="email"
          label="Email address"
          required
          type="email"
          autoComplete="email"
          error={errors.email?.message ?? state.fieldErrors?.email?.[0]}
          {...register("email")}
        />
      </div>

      <FormField
        id="phone"
        label="Phone number"
        type="tel"
        autoComplete="tel"
        error={errors.phone?.message ?? state.fieldErrors?.phone?.[0]}
        {...register("phone")}
      />

      <FormField
        as="select"
        id="subject"
        label="Subject"
        required
        error={errors.subject?.message ?? state.fieldErrors?.subject?.[0]}
        {...register("subject")}
      >
        <option value="" disabled>
          Select a subject
        </option>
        <option value="general">General enquiry</option>
        <option value="prayer">Prayer request</option>
        <option value="visit">Planning a visit</option>
        <option value="ministry">Ministry information</option>
        <option value="other">Other</option>
      </FormField>

      <FormField
        as="textarea"
        id="message"
        label="Message"
        required
        rows={5}
        error={errors.message?.message ?? state.fieldErrors?.message?.[0]}
        {...register("message")}
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full justify-center"
        disabled={isPending}
      >
        {isPending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
