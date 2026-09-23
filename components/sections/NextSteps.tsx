import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const steps = [
  {
    label: "New Here",
    heading: "Plan Your Visit",
    body: "Everything you need to know before Sunday — what to wear, where to park, and what to do with your kids.",
    href: "/visit",
    cta: "I'm New Here",
  },
  {
    label: "Generosity",
    heading: "Give",
    body: "Your generosity makes this community possible. Give securely online — it takes less than two minutes.",
    href: "/give",
    cta: "Give Now",
  },
  {
    label: "Prayer",
    heading: "Prayer Request",
    body: "Share what's on your heart. Our team reads and prays over every request — privately and without judgment.",
    href: "/prayer-request",
    cta: "Send a Request",
  },
];

export function NextSteps() {
  return (
    <section className="py-24 bg-off-black" aria-labelledby="next-steps-heading">
      <Container>
        <AnimatedSection className="mb-12">
          <SectionHeading
            id="next-steps-heading"
            label="What's next for you"
            heading="Take a next step."
            light
            align="center"
          />
        </AnimatedSection>

        <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <AnimatedItem key={step.heading}>
              <div className="flex flex-col h-full border border-warm-gray-800 rounded-xl p-8 hover:border-warm-gray-600 transition-colors duration-300">
                <p className="text-primary font-semibold text-xs uppercase tracking-label mb-3">
                  {step.label}
                </p>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  {step.heading}
                </h3>
                <p className="text-warm-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {step.body}
                </p>
                <Button href={step.href} variant="outline-light" size="sm" className="self-start">
                  {step.cta}
                </Button>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
