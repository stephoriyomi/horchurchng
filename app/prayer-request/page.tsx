import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PrayerRequestForm } from "@/components/forms/PrayerRequestForm";

export const metadata: Metadata = {
  title: "Prayer Request",
  description:
    "Submit a prayer request to House of Rest International. Our prayer team prays over every request — you don't have to face anything alone.",
};

export default function PrayerRequestPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-20 bg-primary" aria-label="Prayer Request">
        <Container>
          <AnimatedSection>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-label mb-5">
              You&apos;re not alone
            </p>
            <h1 className="font-display text-display-lg md:text-display-xl text-white mb-6 max-w-2xl">
              Let us pray with you.
            </h1>
            <p className="text-white/80 text-xl max-w-xl leading-relaxed">
              Whatever you&apos;re carrying, you don&apos;t have to carry it alone. Our prayer team reads every request and prays over it.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Form ── */}
      <section className="py-20 bg-off-white" aria-labelledby="prayer-form-heading">
        <Container className="max-w-2xl">
          <AnimatedSection>
            <h2
              id="prayer-form-heading"
              className="font-display font-bold text-display-xs text-off-black mb-2"
            >
              Share your request
            </h2>
            <p className="text-warm-gray-500 text-sm mb-8 leading-relaxed">
              You can be as specific or as brief as you need to be. If you&apos;d prefer to keep your name private, check the box at the bottom.
            </p>

            <PrayerRequestForm />

            {/* Privacy note */}
            <div className="mt-8 pt-6 border-t border-warm-gray-200">
              <p className="text-xs text-warm-gray-400 leading-relaxed">
                <span className="font-medium text-warm-gray-500">Privacy note:</span>{" "}
                Your request is shared only with our pastoral and prayer team. We will never publish, broadcast, or share your request beyond that team without your permission.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
