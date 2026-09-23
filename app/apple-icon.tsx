import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
          backgroundColor: "#d83234",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 96,
            fontWeight: 700,
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          H
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 22,
            fontWeight: 600,
            fontFamily: "sans-serif",
            letterSpacing: "0.2em",
            marginTop: 4,
          }}
        >
          HORI
        </span>
      </div>
    ),
    { ...size },
  );
}
