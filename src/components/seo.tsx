"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import { SITE, getAbsoluteUrl } from "@/lib/site";

export type SEOProps = {
  title?: string;
  description?: string;
  image?: string | null;
  imageWidth?: number;
  imageHeight?: number;
  noIndex?: boolean;
  canonicalPath?: string | null;
};

const DEFAULT_IMAGE_WIDTH = 1200;
const DEFAULT_IMAGE_HEIGHT = 630;

export function SEO({
  title,
  description = SITE.description,
  image = SITE.defaultOgImagePath,
  imageWidth = DEFAULT_IMAGE_WIDTH,
  imageHeight = DEFAULT_IMAGE_HEIGHT,
  noIndex = false,
  canonicalPath,
}: SEOProps) {
  const router = useRouter();
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;
  const canonicalUrl = canonicalPath
    ? getAbsoluteUrl(canonicalPath)
    : getAbsoluteUrl(router.asPath.split("?")[0] || "/");
  const imageUrl = image ? getAbsoluteUrl(image) : null;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    description: SITE.description,
    url: getAbsoluteUrl("/"),
    logo: getAbsoluteUrl("/Logo.svg"),
  };

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_US" />
      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta property="og:image:width" content={String(imageWidth)} />
          <meta property="og:image:height" content={String(imageHeight)} />
          <meta property="og:image:alt" content={fullTitle} />
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {SITE.twitterHandle && (
        <meta name="twitter:site" content={SITE.twitterHandle} />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
    </Head>
  );
}
