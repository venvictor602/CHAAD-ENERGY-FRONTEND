const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://chaadenergy.vercel.app/api";

export { API_BASE_URL };

export function getApiUrl(path: string): string {
  const base = API_BASE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
