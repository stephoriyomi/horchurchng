import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/cards/BlogCard";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import type { BlogPost } from "@/lib/content";

export function FromTheBlog({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="py-24 bg-off-white" aria-labelledby="blog-heading">
      <Container>
        <AnimatedSection className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            id="blog-heading"
            label="From the Blog"
            heading="Worth Reading"
            align="left"
          />
          <Button href="/blog" variant="outline" size="sm" className="shrink-0">
            All Posts →
          </Button>
        </AnimatedSection>

        <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <AnimatedItem key={post.slug}>
              <BlogCard {...post} />
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
