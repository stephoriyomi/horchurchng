import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { BlogPost } from "@/lib/content";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogCard({ slug, title, author, date, excerpt, tags }: BlogPost) {
  return (
    <article className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300">
      {/* Cover image placeholder */}
      <div className="aspect-video bg-warm-gray-200 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, var(--color-warm-gray-200) 0%, var(--color-warm-gray-300) 100%)",
            animation: "ken-burns 14s ease-in-out infinite alternate",
          }}
          aria-hidden
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <h3 className="font-display font-bold text-lg text-off-black mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
          <Link href={`/blog/${slug}`} className="focus-visible:outline-none focus-visible:underline">
            {title}
          </Link>
        </h3>

        {excerpt && (
          <p className="text-warm-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-warm-gray-100">
          <p className="text-xs text-warm-gray-400">
            {author} · {formatDate(date)}
          </p>
          <Link
            href={`/blog/${slug}`}
            className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
