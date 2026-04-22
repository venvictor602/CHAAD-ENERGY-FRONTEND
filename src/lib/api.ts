import { APP_ENV } from "@/config/env";

const API_BASE_URL = APP_ENV.API_BASE_URL;

export { API_BASE_URL };

export function getApiUrl(path: string): string {
  const base = API_BASE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
