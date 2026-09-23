"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          backgroundColor: "#1a1714",
          color: "#faf8f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "400px", padding: "2rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#d83234",
              marginBottom: "1.25rem",
            }}
          >
            Something went wrong
          </p>
          <h1
            style={{
              fontFamily: "ui-serif, Georgia, serif",
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            We hit an unexpected error.
          </h1>
          <p
            style={{
              color: "#a09890",
              marginBottom: "2rem",
              lineHeight: 1.6,
              fontSize: "0.9375rem",
            }}
          >
            Our team has been notified. In the meantime, try refreshing the page.
          </p>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: "#d83234",
              color: "#ffffff",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              marginRight: "0.75rem",
            }}
          >
            Try again
          </button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-error replaces the full document so next/link is unavailable */}
          <a
            href="/"
            style={{
              color: "#a09890",
              fontSize: "0.875rem",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Go home
          </a>
        </div>
      </body>
    </html>
  );
}
