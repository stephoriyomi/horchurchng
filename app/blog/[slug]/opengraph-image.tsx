import { ImageResponse } from "next/og";
import { getBlogPosts } from "@/lib/content";
import site from "@/config/site.json";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPosts().find((p) => p.slug === slug);
  const title = post?.title ?? site.name;
  const author = post?.author ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: "#faf8f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#d83234",
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 6,
              backgroundColor: "#d83234",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "serif",
                lineHeight: 1,
              }}
            >
              H
            </span>
          </div>
          <span
            style={{
              color: "#a09890",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "sans-serif",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {`${site.shortName} · Blog`}
          </span>
        </div>

        {/* Category label */}
        <div
          style={{
            color: "#d83234",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          Article
        </div>

        {/* Title */}
        <div
          style={{
            color: "#1a1714",
            fontSize: title.length > 60 ? 48 : 58,
            fontWeight: 700,
            fontFamily: "serif",
            lineHeight: 1.15,
            marginBottom: 24,
            maxWidth: 860,
          }}
        >
          {title}
        </div>

        {/* Author */}
        {author ? (
          <div
            style={{
              color: "#8a7c74",
              fontSize: 18,
              fontFamily: "sans-serif",
            }}
          >
            {`By ${author}`}
          </div>
        ) : null}
      </div>
    ),
    { ...size },
  );
}
