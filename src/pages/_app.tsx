"use client";
import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Inter, Montserrat, Roboto } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import { Toaster } from "@/components/ui/toast";
import { ScrollToTopButton } from "@/components/layouts/scroll-to-top-button";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SCROLL_KEY = "chaad_scroll_y";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // ── Step 1: Disable browser's own scroll restoration, restore from sessionStorage ──
  useEffect(() => {
    history.scrollRestoration = "manual";

    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved !== null) {
      const y = parseInt(saved, 10);
      // Brief delay so the page fully renders before jumping
      const t = setTimeout(
        () => window.scrollTo({ top: y, behavior: "instant" }),
        80,
      );
      return () => clearTimeout(t);
    }
  }, []);

  // ── Step 2: Track scroll position continuously (rAF-throttled) ──
  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
        rafId = null;
      });
    };

    // Guaranteed save right before refresh/tab close
    const onBeforeUnload = () => {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", onBeforeUnload);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Step 3: Clear saved position when navigating to a new route ──
  useEffect(() => {
    const clear = () => sessionStorage.removeItem(SCROLL_KEY);
    router.events.on("routeChangeStart", clear);
    return () => router.events.off("routeChangeStart", clear);
  }, [router.events]);

  return (
    <Toaster>
      <main
        className={`${montserrat.variable} ${roboto.variable} ${inter.variable} font-sans`}
      >
        <AnimatePresence mode="wait">
          <Component {...pageProps} />
        </AnimatePresence>
        <ScrollToTopButton showAfterPx={500} />
      </main>
    </Toaster>
  );
}
