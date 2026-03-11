export const SITE = {
  name: "CHAAD Energy",
  tagline:
    "Delivering Engineering Excellence Across Energy & Industrial Landscapes",
  description:
    "CHAAD Energy delivers engineering excellence across energy and industrial landscapes. Expert EPC, commissioning, cathodic protection, and tank services for oil, gas, and renewables.",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chaadenergy.com",
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? "",
  defaultOgImagePath: "/og-default.png",
} as const;

export function getAbsoluteUrl(path: string): string {
  const base = SITE.baseUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
