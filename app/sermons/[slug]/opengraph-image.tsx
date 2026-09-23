import { ImageResponse } from "next/og";
import { getSermons } from "@/lib/content";
import site from "@/config/site.json";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getSermons().map((s) => ({ slug: s.slug }));
}

export default async function SermonOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sermon = getSermons().find((s) => s.slug === slug);
  const title = sermon?.title ?? site.name;
  const speaker = sermon?.speaker ?? "";
  const series = sermon?.tags?.[0] ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: "#1a1714",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(216,50,52,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: 72,
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
              color: "rgba(255,255,255,0.4)",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "sans-serif",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {`${site.shortName} · Watch`}
          </span>
        </div>

        {/* Series / category */}
        <div
          style={{
            color: "#f3b700",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          {series || "Sermon"}
        </div>

        {/* Title */}
        <div
          style={{
            color: "#ffffff",
            fontSize: title.length > 60 ? 48 : 58,
            fontWeight: 700,
            fontFamily: "serif",
            lineHeight: 1.15,
            marginBottom: 24,
            maxWidth: 880,
          }}
        >
          {title}
        </div>

        {/* Speaker */}
        {speaker ? (
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 18,
              fontFamily: "sans-serif",
            }}
          >
            {speaker}
          </div>
        ) : null}
      </div>
    ),
    { ...size },
  );
}
