"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Deep red on white when overlapping the (red) footer so the FAB stays visible. */
const ON_DARK_SURFACE =
  "!bg-white !text-[#991B1B] border border-black/10 shadow-lg hover:!bg-[#FEF2F2] hover:!text-[#7F1D1D] focus-visible:!ring-[#991B1B]/40";

export function ScrollToTopButton({
  showAfterPx = 400,
  className,
  footerSelector = "footer",
}: {
  showAfterPx?: number;
  className?: string;
  /** Element to watch; when it intersects the viewport, the button uses a light surface. */
  footerSelector?: string;
}) {
  const [visible, setVisible] = useState(false);
  const [overBrandFooter, setOverBrandFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= showAfterPx);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx]);

  useEffect(() => {
    const footer = document.querySelector(footerSelector);
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverBrandFooter(entry.isIntersecting);
      },
      {
        threshold: 0,
        // Switch a bit before the footer fully covers the corner
        rootMargin: "0px 0px 96px 0px",
      },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [footerSelector]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cn("fixed bottom-6 right-6 z-80", className)}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={cn(
              "h-11 w-11 rounded-full p-0 shadow-lg transition-colors",
              overBrandFooter && ON_DARK_SURFACE,
            )}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
