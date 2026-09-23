import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MinistryCard } from "@/components/cards/MinistryCard";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import ministries from "@/config/ministries.json";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Find your people at House of Rest International. Explore all ministries — Kids, Youth, Young Adults, Men, Women, and Marriage.",
};

export default function MinistriesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-20 bg-off-black" aria-label="Ministries">
        <Container>
          <AnimatedSection>
            <p className="text-accent-gold text-xs font-semibold uppercase tracking-label mb-5">
              Get Involved
            </p>
            <h1 className="font-display text-display-lg md:text-display-xl text-white mb-6 max-w-2xl">
              There&apos;s a community here for you.
            </h1>
            <p className="text-warm-gray-300 text-xl max-w-xl leading-relaxed">
              Every stage of life. Every season. Find the group that fits where you are right now.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Grid ── */}
      <section className="py-24 bg-off-white" aria-labelledby="ministries-grid-heading">
        <Container>
          <AnimatedSection className="mb-12">
            <SectionHeading
              id="ministries-grid-heading"
              label="All Ministries"
              heading="Find your people."
              align="center"
            />
          </AnimatedSection>

          <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((ministry) => (
              <AnimatedItem key={ministry.id}>
                <MinistryCard {...ministry} />
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
