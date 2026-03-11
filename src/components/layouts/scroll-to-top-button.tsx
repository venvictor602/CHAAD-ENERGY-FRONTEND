"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
            className="h-11 w-11 rounded-full p-0 shadow-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
