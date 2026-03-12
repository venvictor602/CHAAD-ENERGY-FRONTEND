import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Create URL-safe slug from title/name */
export function slugFromTitle(str: string): string {
  return (
    (str ?? "")
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "post"
  );
}

/** Extract numeric ID from "3-the-role-of..." or "3" */
export function idFromSlugParam(param: string): number | null {
  const match = param?.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}
