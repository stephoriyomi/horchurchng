"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "./FormField";
import { Button } from "@/components/ui/Button";
import { PrayerSchema, type PrayerFormData } from "@/lib/schemas";
import { submitPrayerRequest, type PrayerActionState } from "@/app/actions/prayer";

const initialState: PrayerActionState = { status: "idle", message: "" };

export function PrayerRequestForm() {
  const [state, formAction, isPending] = useActionState(submitPrayerRequest, initialState);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PrayerFormData>({
    resolver: zodResolver(PrayerSchema),
  });

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-accent-green/10 border border-accent-green/30 p-8 text-center">
        <p className="text-accent-green font-semibold text-lg mb-2">Request received</p>
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
          label="Your name"
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
        />
      </div>

      <FormField
        as="textarea"
        id="request"
        label="Your prayer request"
        required
        rows={6}
        placeholder="Share as much or as little as you'd like…"
        error={errors.request?.message ?? state.fieldErrors?.request?.[0]}
        {...register("request")}
      />

      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            id="isUrgent"
            {...register("isUrgent")}
            className="mt-0.5 w-4 h-4 rounded border-warm-gray-300 accent-primary"
          />
          <span className="text-sm text-warm-gray-700 leading-snug">
            <span className="font-medium text-off-black">This is urgent</span>
            <br />
            <span className="text-warm-gray-500 text-xs">
              We&apos;ll prioritise this for our next prayer session.
            </span>
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            id="isAnonymous"
            {...register("isAnonymous")}
            className="mt-0.5 w-4 h-4 rounded border-warm-gray-300 accent-primary"
          />
          <span className="text-sm text-warm-gray-700 leading-snug">
            <span className="font-medium text-off-black">Keep my name private</span>
            <br />
            <span className="text-warm-gray-500 text-xs">
              Your request will be shared anonymously with our prayer team.
            </span>
          </span>
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full justify-center"
        disabled={isPending}
      >
        {isPending ? "Submitting…" : "Submit request"}
      </Button>
    </form>
  );
}
