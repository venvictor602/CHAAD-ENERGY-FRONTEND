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
        "inline-flex items-center gap-1.5 text-[#DE5943] font-bold text-sm hover:text-[#c94d39] transition-colors",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
