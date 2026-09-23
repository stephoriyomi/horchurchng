import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MinistryCard } from "@/components/cards/MinistryCard";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

interface Ministry {
  id: string;
  name: string;
  slug: string;
  summary: string;
  schedule: string;
  accentColor: string;
}

export function MinistriesGrid({ ministries }: { ministries: Ministry[] }) {
  return (
    <section className="py-24 bg-off-white" aria-labelledby="ministries-heading">
      <Container>
        <AnimatedSection className="mb-12">
          <SectionHeading
            id="ministries-heading"
            label="Get Involved"
            heading="Find your people."
            subheading="There's a community here for every stage of life. Find the one that fits."
            align="center"
          />
        </AnimatedSection>

        <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ministries.map((ministry) => (
            <AnimatedItem key={ministry.id}>
              <MinistryCard {...ministry} />
            </AnimatedItem>
          ))}
        </AnimatedSection>

        <AnimatedSection className="mt-10 text-center">
          <Button href="/ministries" variant="outline" size="md">
            All Ministries →
          </Button>
        </AnimatedSection>
      </Container>
    </section>
  );
}
