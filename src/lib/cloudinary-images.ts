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
 * f_auto=WebP/AVIF, q_auto=compression. Non-Cloudinary URLs returned unchanged.
 */
export function getCloudinaryOptimizedUrl(
  url: string,
  options: { width?: number; quality?: string } = {},
): string {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/"))
    return url;
  const { width = 400, quality = "auto" } = options;
  const transforms = `w_${width},q_${quality},f_auto`;
  return url.replace("/upload/", `/upload/${transforms}/`);
}

/** Optimized URL helper (used for all exported image URLs). */
function opt(url: string, width: number): string {
  return getCloudinaryOptimizedUrl(url, { width });
}

/** Image indices by section – all URLs compressed (w_*, q_auto, f_auto) for fast load. */
export const cloudinaryImages = {
  /** About section: 2 images */
  about: [opt(getUrl(0), 700), opt(getUrl(1), 700)],
  /** About story section (Our Story / Our Mission): 3 image boxes */
  aboutStory: [opt(getUrl(0), 500), opt(getUrl(1), 500), opt(getUrl(2), 500)],
  /** Case study section (Major Refinery): 2 image boxes */
  caseStudySection: [opt(getUrl(12), 800), opt(getUrl(13), 800)],
  /** Trust stats carousel: 8 images */
  trustStats: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => opt(getUrl(i), 320)),
  /** Trust stats image collage (Seven years...): up to 20 images */
  trustStatsCollage: Array.from({ length: 20 }, (_, i) => opt(getUrl(i), 320)),
  /** Leadership team: 4 images */
  leadership: [8, 9, 10, 11].map((i) => opt(getUrl(i), 600)),
  /** Case study grid (projects): 6 images */
  caseStudy: [12, 13, 14, 15, 16, 17].map((i) => opt(getUrl(i), 800)),
  /** Recent work fallback: 6 + 1 default */
  recentWork: [18, 19, 20, 21, 22, 23].map((i) => opt(getUrl(i), 600)),
  recentWorkDefault: opt(getUrl(0), 600),
  /** Expertise (EPC, Commissioning, Cathodic): 3 */
  expertise: [24, 25, 26].map((i) => opt(getUrl(i), 600)),
  /** Diagonal slider: 6 */
  diagonalSlider: [0, 1, 2, 3, 4, 5].map((i) => opt(getUrl(i), 320)),
  /** Service detail static galleries */
  serviceGallery: (base: number) => [
    opt(getUrl(base), 800),
    opt(getUrl(base + 1), 800),
    opt(getUrl(base + 2), 800),
  ],
  /** Project detail static galleries */
  projectGallery: (base: number) => [
    opt(getUrl(base), 1200),
    opt(getUrl(base + 1), 1200),
    opt(getUrl(base + 2), 1200),
    opt(getUrl(base + 3), 1200),
  ],
  /** Default/fallback for API-driven content */
  default: opt(getUrl(0), 800),
  /** News/latest news fallbacks */
  news: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => opt(getUrl(i), 800)),
};

export { getUrl };
