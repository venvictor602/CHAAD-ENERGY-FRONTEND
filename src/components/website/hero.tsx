"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layouts/navbar";
import { cloudinaryImages } from "@/lib/cloudinary-images";

const HERO_IMAGES: string[] = [
  cloudinaryImages.hero[0],
  cloudinaryImages.hero[1],
  cloudinaryImages.hero[2],
  cloudinaryImages.hero[3],
  cloudinaryImages.hero[4],
];

const INTERVAL = 3000; // ms between crossfades

const contentVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6 + i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-svh flex flex-col w-full bg-[#0c1526]">
      {/* Absolute Background Wrapper */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <AnimatePresence>
          <motion.img
            key={current}
            src={HERO_IMAGES[current]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-black/25 via-black/5 to-black/60" />

        {/* Ambient Blobs without bottom cutoff */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <defs>
            <filter id="heroBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
            <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          {/* Big centered “spotlight” circle */}
          <motion.g
            animate={{ opacity: [0.55, 0.7, 0.55], scale: [1, 1.03, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "720px 430px" }}
          >
            <circle
              cx="720"
              cy="430"
              r="340"
              fill="rgba(72,90,172,0.16)"
              filter="url(#softBlur)"
            />
            <circle cx="720" cy="430" r="250" fill="rgba(72,90,172,0.10)" />
          </motion.g>

          {/* Warm accent blob */}
          <motion.circle
            cx="290"
            cy="360"
            r="220"
            fill="rgba(222,89,67,0.12)"
            filter="url(#heroBlur)"
            animate={{ cx: [290, 310, 290], cy: [360, 346, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      <Navbar />

      {/* The Cup SVG Layer at the bottom */}
      {/* Uses var(--secondary) which maps to #edeff7 to match the next section */}
      <div
        className="absolute bottom-0 left-0 w-full h-[120px] sm:h-[160px] md:h-[220px] pointer-events-none z-10"
        aria-hidden
      >
        <svg
          viewBox="0 0 1440 220"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,220 L0,80 L400,80 C540,80 580,200 720,200 C860,200 900,80 1040,80 L1440,80 L1440,220 Z"
            fill="#edeff7"
          />
        </svg>
      </div>

      {/* Interactive Content Container - Floating Circle */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-end px-4 sm:px-6 pb-[20px] sm:pb-[30px] md:pb-[40px] pointer-events-none">
        {/* Outer Entrance Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 150 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto"
        >
          {/* Inner Floating Animation */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            className="
              relative flex flex-col items-center justify-center text-center
              w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[580px] lg:h-[580px]
              rounded-full p-6 sm:p-12 lg:p-16
              bg-linear-to-br from-[#485aac] to-[#28325f]
              shadow-[0_20px_60px_rgba(0,0,0,0.5)]
              border-8 sm:border-12 border-white/5
              backdrop-blur-md
            "
          >
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.22em] text-white/80 uppercase mb-3 sm:mb-4"
            >
              CHAAD Energy Limited
            </motion.div>

            <motion.h1
              custom={1}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.15] sm:leading-[1.1]"
            >
              Powering Nigeria&apos;s <br /> Energy Future
            </motion.h1>

            <motion.p
              custom={2}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-white/90 max-w-[90%] sm:max-w-[85%] mx-auto leading-relaxed"
            >
              End-to-end oil & gas, energy and construction solutions —
              delivered with safety, precision and measurable results.
            </motion.p>

            <motion.div
              custom={3}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 sm:mt-8 flex flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <Button
                asChild
                variant="default"
                className="rounded-full px-5 sm:px-8 h-10 sm:h-12 text-xs sm:text-sm font-semibold bg-white text-[#28325f] hover:bg-white/90"
              >
                <Link href="/about">Discover more about CHAAD</Link>
              </Button>
              <Button
                asChild
                variant="default"
                size="icon"
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-white/20 text-white hover:bg-white/30 backdrop-blur-md"
              >
                <Link href="/about">
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
