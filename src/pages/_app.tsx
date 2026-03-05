import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Figtree } from "next/font/google";
import { AnimatePresence } from "framer-motion";

import { Toaster } from "@/components/ui/toast";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Toaster>
      <main className={`${figtree.variable} font-sans`}>
        <AnimatePresence mode="wait">
          <Component {...pageProps} />
        </AnimatePresence>
      </main>
    </Toaster>
  );
}
