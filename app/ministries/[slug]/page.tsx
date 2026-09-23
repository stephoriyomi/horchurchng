import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getMdxBody } from "@/lib/content";
import ministries from "@/config/ministries.json";

export function generateStaticParams() {
  return ministries.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ministry = ministries.find((m) => m.slug === slug);
  if (!ministry) return { title: "Ministry Not Found" };
  return {
    title: ministry.name,
    description: ministry.summary,
  };
}

const colorBgMap: Record<string, string> = {
  primary: "bg-primary",
  "primary-light": "bg-primary-light",
  "accent-gold": "bg-accent-gold",
  "accent-amber": "bg-accent-amber",
  "accent-teal": "bg-accent-teal",
  "accent-green": "bg-accent-green",
};

export default async function MinistryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ministry = ministries.find((m) => m.slug === slug);
  if (!ministry) notFound();

  const body = getMdxBody("ministries", slug);
  const { content } = body
    ? await compileMDX({ source: body })
    : { content: null };

  const accentBg = colorBgMap[ministry.accentColor] ?? "bg-primary";

  return (
    <>
      {/* ── Hero ── */}
      <section className={`${accentBg} pt-32 pb-20`} aria-label={ministry.name}>
        <Container>
          <AnimatedSection>
            <Link
              href="/ministries"
              className="text-white/70 hover:text-white text-sm font-medium mb-6 inline-flex items-center gap-1 transition-colors"
            >
              ← All Ministries
            </Link>
            <h1 className="font-display text-display-lg md:text-display-xl text-white mb-4">
              {ministry.name}
            </h1>
            <p className="text-white/80 text-xl max-w-xl leading-relaxed">{ministry.summary}</p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Details ── */}
      <section className="py-20 bg-off-white">
        <Container>
          <div className="grid lg:grid-cols-[1fr,300px] gap-12">
            {/* Content */}
            <div>
              {content ? (
                <div className="prose max-w-none text-warm-gray-700">{content}</div>
              ) : (
                <p className="text-warm-gray-500">More details coming soon.</p>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-warm-gray-100 rounded-xl p-6 sticky top-24">
                <h2 className="font-semibold text-off-black mb-4">Details</h2>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-label text-warm-gray-400 mb-0.5">
                      Schedule
                    </dt>
                    <dd className="font-medium text-off-black">{ministry.schedule}</dd>
                  </div>
                </dl>

                <div className="mt-6 space-y-3">
                  <Button href="/contact" variant="primary" size="sm" className="w-full justify-center">
                    Get Involved
                  </Button>
                  <Button href="/visit" variant="outline" size="sm" className="w-full justify-center">
                    Visit This Sunday
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
