"use client";
import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Inter, Montserrat, Roboto } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import { SEO } from "@/components/seo";
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

  useEffect(() => {
    history.scrollRestoration = "manual";

    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved !== null) {
      const y = parseInt(saved, 10);
      const t = setTimeout(
        () => window.scrollTo({ top: y, behavior: "instant" }),
        80,
      );
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
        rafId = null;
      });
    };

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

  useEffect(() => {
    const clear = () => sessionStorage.removeItem(SCROLL_KEY);
    router.events.on("routeChangeStart", clear);
    return () => router.events.off("routeChangeStart", clear);
  }, [router.events]);

  return (
    <Toaster>
      <SEO />
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
