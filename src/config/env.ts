const DEFAULTS = {
  NEXT_PUBLIC_API_BASE_URL: "https://chaad-energy-backend.vercel.app/api",
  NEXT_PUBLIC_SITE_URL: "https://chaadenergy.com",
  NEXT_PUBLIC_TWITTER_HANDLE: "",
} as const;

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const APP_ENV = {
  API_BASE_URL: normalizeBaseUrl(
    process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULTS.NEXT_PUBLIC_API_BASE_URL,
  ),
  SITE_URL: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULTS.NEXT_PUBLIC_SITE_URL)
    .trim(),
  TWITTER_HANDLE: (
    process.env.NEXT_PUBLIC_TWITTER_HANDLE ??
    DEFAULTS.NEXT_PUBLIC_TWITTER_HANDLE
  ).trim(),
} as const;

