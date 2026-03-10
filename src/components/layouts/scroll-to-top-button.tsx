"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTopButton({
  showAfterPx = 400,
  className,
}: {
  showAfterPx?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= showAfterPx);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-80",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200",
        className,
      )}
    >
      <Button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="h-11 w-11 rounded-full p-0 shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}
