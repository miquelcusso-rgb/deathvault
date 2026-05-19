/**
 * JsonLd — injects structured data (schema.org) into the page <head>.
 * Use in Server Components (layouts, pages) for SEO.
 * https://developers.google.com/search/docs/appearance/structured-data
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
