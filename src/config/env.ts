function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function requirePublicEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required public env: ${name}`);
  }
  return value;
}

export const APP_ENV = {
  API_BASE_URL: normalizeBaseUrl(requirePublicEnv("NEXT_PUBLIC_API_BASE_URL")),
  SITE_URL: requirePublicEnv("NEXT_PUBLIC_SITE_URL"),
  TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE?.trim(),
} as const;
