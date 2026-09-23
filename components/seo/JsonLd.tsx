interface Props {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Injects a JSON-LD <script> tag for structured data.
 * Place inside the page's <head> via layout or page metadata — or directly in
 * the page component body (Next.js hoists it automatically).
 */
export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
