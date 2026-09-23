import { ImageResponse } from "next/og";
import site from "@/config/site.json";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

export default function OgImage() {
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
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(216,50,52,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              backgroundColor: "#d83234",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: 26,
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
              color: "rgba(255,255,255,0.5)",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "sans-serif",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {site.shortName}
          </span>
        </div>

        {/* Tagline chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              color: "#f3b700",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "sans-serif",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Lagos · Nigeria
          </span>
        </div>

        {/* Main heading */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 700,
            fontFamily: "serif",
            lineHeight: 1.1,
            marginBottom: 20,
            maxWidth: 800,
          }}
        >
          {site.name}
        </div>

        {/* Sub-tagline */}
        <div
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 22,
            fontFamily: "sans-serif",
            lineHeight: 1.4,
            maxWidth: 640,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
