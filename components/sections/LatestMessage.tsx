import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SermonCard } from "@/components/cards/SermonCard";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Sermon } from "@/lib/content";

export function LatestMessage({ sermon }: { sermon: Sermon }) {
  return (
    <section className="py-24 bg-off-white" aria-labelledby="latest-message-heading">
      <Container>
        <AnimatedSection>
          <SectionHeading
            id="latest-message-heading"
            label="This Week"
            heading="Latest Message"
            subheading="Catch up on the most recent Sunday message whenever works for you."
            align="center"
            className="mb-12"
          />
        </AnimatedSection>

        <AnimatedSection>
          <SermonCard {...sermon} featured />
        </AnimatedSection>

        <AnimatedSection className="mt-8 text-center">
          <Button href="/watch" variant="outline" size="md">
            Browse All Messages
          </Button>
        </AnimatedSection>
      </Container>
    </section>
  );
}
