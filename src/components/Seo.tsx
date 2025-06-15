
import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title: string;
  description: string;
  jsonLd?: object;
};

export function Seo({ title, description, jsonLd }: SeoProps) {
  const siteTitle = `${title} | Level One Radiology`;
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
