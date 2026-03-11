"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      className="flex items-center gap-1.5 text-sm text-[#64748B] [font-family:var(--font-inter)] "
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <ChevronRight className="h-4 w-4 shrink-0 text-[#94A3B8]" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[#28325F] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1A1A1A] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
