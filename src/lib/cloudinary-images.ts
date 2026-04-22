/**
 * Cloudinary image URLs from upload (public/assets/CHAAD_ENERGY).
 * Run: node scripts/upload-to-cloudinary.js to refresh src/lib/cloudinary-assets.json
 */

import assetsData from "./cloudinary-assets.json";

const assets = assetsData as {
  url: string;
  publicId: string;
  filename: string;
  index: number;
}[];

const URLS = assets.map((a) => a.url);

function getUrl(index: number): string {
  if (URLS.length === 0) return "";
  return URLS[index % URLS.length] ?? URLS[0] ?? "";
}

/**
 * Returns a Cloudinary URL with size/quality transforms for faster loading.
 * f_auto=WebP/AVIF; q_auto:good by default, override for heroes / large detail images.
 */
export function getCloudinaryOptimizedUrl(
  url: string,
  options: { width?: number; quality?: string } = {},
): string {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/"))
    return url;
  const { width, quality = "auto:good" } = options;
  const transforms = [
    width ? `c_limit,w_${width}` : "",
    `q_${quality}`,
    "f_auto",
  ]
    .filter(Boolean)
    .join(",");

  return url.replace("/upload/", `/upload/${transforms}/`);
}

/** Hero / full-viewport backgrounds: higher cap + stronger auto quality. */
function optHero(url: string, width = 2400): string {
  return getCloudinaryOptimizedUrl(url, { width, quality: "auto:best" });
}

/** Optimized URL helper (used for all exported image URLs). */
function opt(url: string, width?: number): string {
  return getCloudinaryOptimizedUrl(url, { width });
}

/** Client/partner logos: cap pixel dimensions for bandwidth. */
export function getCloudinaryLogoUrl(url: string, maxWidth = 320): string {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/"))
    return url;

  const height = Math.round(maxWidth / 2);
  const transforms = `e_trim,c_fit,w_${maxWidth},h_${height},q_auto:good,f_auto`;
  return url.replace("/upload/", `/upload/${transforms}/`);
}

/** Image indices by section – all URLs compressed (w_*, q_auto, f_auto) for fast load. */
export const cloudinaryImages = {
  /** About section: 2 images */
  about: [opt(getUrl(5), 700), opt(getUrl(6), 700)],
  /** About story section (Our Story / Our Mission): 3 image boxes */
  aboutStory: [opt(getUrl(7), 500), opt(getUrl(8), 500), opt(getUrl(9), 500)],
  /** Full-bleed hero backgrounds (capped width + q_auto:best for clarity vs. file size) */
  hero: [
    optHero(getUrl(0)),
    optHero(getUrl(1)),
    optHero(getUrl(2)),
    optHero(getUrl(3)),
    optHero(getUrl(4)),
  ],
  /** Case study section (Major Refinery): 2 image boxes */
  caseStudySection: [opt(getUrl(10), 800), opt(getUrl(11), 800)],
  /** Trust stats carousel: 8 images */
  trustStats: [37, 38, 39, 40, 41, 42, 43, 44].map((i) => opt(getUrl(i), 320)),
  /** Trust stats image collage (Seven years...): up to 20 images */
  trustStatsCollage: Array.from({ length: 20 }, (_, i) =>
    opt(getUrl(i + 39), 320),
  ),
  /** Leadership team: 4 images */
  leadership: [27, 28, 29, 30].map((i) => opt(getUrl(i), 600)),
  /** Case study grid (projects): 6 images */
  caseStudy: [12, 13, 14, 15, 16, 17].map((i) => opt(getUrl(i), 800)),
  /** Recent work fallback: 6 + 1 default */
  recentWork: [18, 19, 20, 21, 22, 23].map((i) => opt(getUrl(i), 600)),
  recentWorkDefault: opt(getUrl(18), 600),
  /** Expertise (EPC, Commissioning, Cathodic): 3 */
  expertise: [24, 25, 26].map((i) => opt(getUrl(i), 600)),
  /** Diagonal slider: 6 */
  diagonalSlider: [31, 32, 33, 34, 35, 36].map((i) => opt(getUrl(i), 320)),
  /** Service detail static galleries */
  serviceGallery: (base: number) => [
    opt(getUrl(base + 24), 800),
    opt(getUrl(base + 25), 800),
    opt(getUrl(base + 26), 800),
  ],
  /** Project detail static galleries */
  projectGallery: (base: number) => [
    getCloudinaryOptimizedUrl(getUrl(base + 12), {
      width: 1200,
      quality: "auto:best",
    }),
    getCloudinaryOptimizedUrl(getUrl(base + 13), {
      width: 1200,
      quality: "auto:best",
    }),
    getCloudinaryOptimizedUrl(getUrl(base + 14), {
      width: 1200,
      quality: "auto:best",
    }),
    getCloudinaryOptimizedUrl(getUrl(base + 15), {
      width: 1200,
      quality: "auto:best",
    }),
  ],
  /** Default/fallback for API-driven content */
  default: opt(getUrl(58), 800),
  /** News/latest news fallbacks */
  news: [45, 46, 47, 48, 49, 50, 51, 52, 53].map((i) => opt(getUrl(i), 800)),
};

export { getUrl };
