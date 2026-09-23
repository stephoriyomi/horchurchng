import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/cards/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBlogPosts, getMdxBody } from "@/lib/content";
import site from "@/config/site.json";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPosts().find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const body = getMdxBody("blog", slug);
  const { content } = body
    ? await compileMDX({ source: body })
    : { content: null };

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${slug}`,
    },
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />

      {/* ── Article header ── */}
      <header className="pt-32 pb-12 bg-off-white border-b border-warm-gray-200">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="text-warm-gray-400 hover:text-primary text-sm font-medium mb-8 inline-flex items-center gap-1 transition-colors"
          >
            ← All Posts
          </Link>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="neutral">{tag}</Badge>
              ))}
            </div>
          )}

          <h1 className="font-display text-display-sm md:text-display-md font-bold text-off-black mb-5 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-warm-gray-400">
            <span className="font-medium text-off-black">{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </Container>
      </header>

      {/* ── Body ── */}
      <article className="py-16 bg-off-white" aria-label={post.title}>
        <Container className="max-w-3xl">
          {post.excerpt && (
            <p className="text-xl text-warm-gray-600 leading-relaxed mb-10 pb-10 border-b border-warm-gray-200 font-medium italic">
              {post.excerpt}
            </p>
          )}

          {content ? (
            <div className="prose max-w-none text-warm-gray-700">{content}</div>
          ) : (
            <p className="text-warm-gray-400">Full post coming soon.</p>
          )}

          {/* CTA after article */}
          <div className="mt-16 pt-10 border-t border-warm-gray-200">
            <p className="font-display font-bold text-2xl text-off-black mb-2">
              Found this helpful?
            </p>
            <p className="text-warm-gray-600 mb-6">
              Join us on a Sunday — or send us a message. We&apos;d love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/visit" variant="primary">Plan a Visit</Button>
              <Button href="/contact" variant="outline">Get in Touch</Button>
            </div>
          </div>
        </Container>
      </article>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className="py-16 bg-warm-gray-100" aria-labelledby="related-posts-heading">
          <Container>
            <h2 id="related-posts-heading" className="font-display font-bold text-2xl text-off-black mb-8">
              More Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <BlogCard key={p.slug} {...p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
