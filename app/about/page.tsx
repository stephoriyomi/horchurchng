import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { StaffCard } from "@/components/cards/StaffCard";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { JsonLd } from "@/components/seo/JsonLd";
import staff from "@/config/staff.json";
import site from "@/config/site.json";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about House of Rest International — who we are, what we believe, and the people who lead this community in Lagos, Nigeria.",
};

const beliefs = [
  {
    n: "01",
    heading: "God loves you as you are",
    body: "Not as you should be, not after you've cleaned yourself up — as you are, right now. Grace doesn't begin with your performance.",
  },
  {
    n: "02",
    heading: "Honesty is more important than appearance",
    body: "We'd rather have a room full of honest doubters than polished pretenders. Doubt brought to the table is the beginning of real faith.",
  },
  {
    n: "03",
    heading: "The Bible is for real life",
    body: "Not a rulebook. Not a list of things you're failing at. A library of human experience in honest conversation with a God who doesn't flinch at complexity.",
  },
  {
    n: "04",
    heading: "Rest is not laziness — it's wholeness",
    body: "Shalom — the Hebrew concept at the heart of our name — means peace, completeness, everything as it should be. That's what we're building toward.",
  },
  {
    n: "05",
    heading: "Community is the point",
    body: "Being human in the way Jesus described is not a solo project. We were made for each other — the belonging isn't incidental, it's the whole thing.",
  },
  {
    n: "06",
    heading: "The church exists for the city",
    body: "We're not here to fill seats. We're here to serve Lagos — in generosity, in justice, and in genuine love for our neighbours.",
  },
];

export default function AboutPage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: site.name,
    url: site.url,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    sameAs: Object.values(site.social),
  };

  return (
    <>
      <JsonLd data={orgJsonLd} />

      {/* ── Page hero ── */}
      <section className="pt-32 pb-20 bg-off-black" aria-label="About us">
        <Container>
          <AnimatedSection>
            <p className="text-accent-gold text-xs font-semibold uppercase tracking-label mb-5">
              Our Story
            </p>
            <h1 className="font-display text-display-lg md:text-display-xl text-white mb-6 max-w-3xl">
              A church built for people who don&apos;t do church.
            </h1>
            <p className="text-warm-gray-300 text-xl max-w-2xl leading-relaxed">
              We exist for the person who&apos;s never tried church — and for the one who
              tried it and walked away. Both are welcome here. Both belong.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── The Story ── */}
      <section className="py-24 bg-off-white" aria-labelledby="story-heading">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <SectionHeading
                id="story-heading"
                label="How We Started"
                heading="The founding question."
                align="left"
                className="mb-8"
              />
            </AnimatedSection>

            <AnimatedSection className="prose max-w-none text-warm-gray-700">
              <p>
                House of Rest International began with a single conviction: the church should be a
                place of genuine rest for everyone — especially those who&apos;ve never felt at home
                in one.
              </p>
              <p>
                Our founding pastor saw two groups of people who had something in common. The first
                had never experienced church — not because they weren&apos;t spiritual, but because
                what they&apos;d seen from the outside didn&apos;t feel worth the effort. The second
                had tried church, been shaped by it, and eventually been hurt by it. They left
                quietly. No announcement, no confrontation. They just stopped.
              </p>
              <p>
                Both groups needed the same thing: a place where they could show up honestly, ask
                real questions, and belong without performing.
              </p>
              <p>
                That&apos;s what we&apos;re building — in Lagos, and wherever God takes this community
                next.
              </p>
              <div className="mt-8">
                <Button href="/visit" variant="primary">
                  Plan Your Visit
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* ── Beliefs ── */}
      <section className="py-24 bg-off-black" aria-labelledby="beliefs-heading">
        <Container>
          <AnimatedSection className="mb-12">
            <SectionHeading
              id="beliefs-heading"
              label="What We Believe"
              heading="Six things we hold."
              subheading="We believe in a lot of things. Here are the six that shape everything we do."
              light
              align="center"
            />
          </AnimatedSection>

          <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {beliefs.map((b) => (
              <AnimatedItem key={b.n}>
                <div className="border border-warm-gray-800 rounded-xl p-7 h-full hover:border-warm-gray-600 transition-colors">
                  <span className="text-primary font-mono text-sm font-bold mb-4 block">
                    {b.n}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mb-3">{b.heading}</h3>
                  <p className="text-warm-gray-400 text-sm leading-relaxed">{b.body}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Leadership ── */}
      <section className="py-24 bg-off-white" aria-labelledby="leadership-heading">
        <Container>
          <AnimatedSection className="mb-12">
            <SectionHeading
              id="leadership-heading"
              label="The Team"
              heading="People you&apos;ll meet."
              subheading="Our team leads from the front and serves from behind — making sure this community has what it needs to thrive."
              align="center"
            />
          </AnimatedSection>

          <AnimatedSection stagger className="flex justify-center">
            {staff
              .sort((a, b) => a.order - b.order)
              .map((member) => (
                <AnimatedItem key={member.id}>
                  <StaffCard {...member} />
                </AnimatedItem>
              ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-warm-gray-100" aria-label="Next steps">
        <Container>
          <AnimatedSection className="text-center">
            <SectionHeading
              heading="Ready to see it for yourself?"
              subheading="Show up on a Sunday. No appointment needed. Come as you are."
              align="center"
              className="mb-8"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/visit" variant="primary" size="lg">
                Plan Your Visit
              </Button>
              <Button href="/watch" variant="outline" size="lg">
                Watch First
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
