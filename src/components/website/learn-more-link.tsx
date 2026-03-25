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
        "inline-flex items-center gap-1.5 text-[#C44D4D] font-bold text-sm hover:text-[#A33A3A] transition-colors",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
