import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type LearnMoreLinkProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
};

export function LearnMoreLink({
  href,
  children = "Learn More",
  className,
}: LearnMoreLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-[#991B1B] font-bold text-sm hover:text-[#7F1D1D] transition-colors",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
