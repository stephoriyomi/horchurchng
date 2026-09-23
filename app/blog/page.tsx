import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/cards/BlogCard";
import { Badge } from "@/components/ui/Badge";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles, devotionals, and honest writing from House of Rest International. Real faith for real life.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-20 bg-off-black" aria-label="Blog">
        <Container>
          <AnimatedSection>
            <p className="text-accent-gold text-xs font-semibold uppercase tracking-label mb-5">
              Worth Reading
            </p>
            <h1 className="font-display text-display-lg md:text-display-xl text-white mb-6 max-w-2xl">
              Real faith for real life.
            </h1>
            <p className="text-warm-gray-300 text-xl max-w-xl leading-relaxed">
              Honest writing about faith, doubt, community, and what it means to rest.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Featured post ── */}
      {featured && (
        <section className="py-16 bg-off-white" aria-labelledby="featured-post-heading">
          <Container>
            <AnimatedSection>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid md:grid-cols-2 gap-8 bg-warm-gray-100 rounded-2xl overflow-hidden hover:shadow-card-hover transition-shadow"
              >
                <div className="aspect-video md:aspect-auto bg-warm-gray-200 relative overflow-hidden min-h-[240px]">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-warm-gray-200 to-warm-gray-300"
                    style={{ animation: "ken-burns 14s ease-in-out infinite alternate" }}
                    aria-hidden
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <Badge variant="primary" className="mb-4 self-start">
                    Featured
                  </Badge>
                  <h2
                    id="featured-post-heading"
                    className="font-display font-bold text-display-xs text-off-black mb-3 group-hover:text-primary transition-colors"
                  >
                    {featured.title}
                  </h2>
                  <p className="text-warm-gray-600 leading-relaxed mb-5 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <p className="text-sm text-warm-gray-400">
                    {featured.author} · {formatDate(featured.date)}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ── Rest of posts ── */}
      {rest.length > 0 && (
        <section className="py-16 bg-warm-gray-100" aria-labelledby="more-posts-heading">
          <Container>
            <AnimatedSection className="mb-8">
              <SectionHeading
                id="more-posts-heading"
                heading="More Posts"
                align="left"
              />
            </AnimatedSection>
            <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post) => (
                <AnimatedItem key={post.slug}>
                  <BlogCard {...post} />
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </Container>
        </section>
      )}
    </>
  );
}
