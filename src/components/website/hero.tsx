"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

        {/* Unique animated pattern overlay (isometric grid + particles) */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <defs>
            <pattern
              id="isoGrid"
              width="72"
              height="42"
              patternUnits="userSpaceOnUse"
            >
              {/* isometric “wireframe” tile */}
              <path
                d="M18 21 L36 10 L54 21 L36 32 Z"
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <path
                d="M18 21 L18 42 M54 21 L54 42"
                fill="none"
                stroke="rgba(72,90,172,0.10)"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(72,90,172,0.16)" />
              <stop offset="60%" stopColor="rgba(72,90,172,0.06)" />
              <stop offset="100%" stopColor="rgba(222,89,67,0.10)" />
            </linearGradient>
            <filter id="softGlow" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Drifting isometric grid field */}
          <motion.g
            opacity={0.55}
            animate={{ x: [0, -36, 0], y: [0, 22, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect
              x="-120"
              y="-120"
              width="1680"
              height="1140"
              fill="url(#isoGrid)"
            />
          </motion.g>

          {/* Angular ribbon accent (not a wave) */}
          <motion.path
            d="M-120,760 L420,610 C560,572 640,540 720,490 C820,427 930,390 1100,410 L1560,465 L1560,980 L-120,980 Z"
            fill="url(#accentGrad)"
            filter="url(#softGlow)"
            opacity={0.78}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Minimal particles */}
          <motion.g
            animate={{ opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="220" cy="210" r="2" fill="rgba(255,255,255,0.30)" />
            <circle cx="520" cy="170" r="1.6" fill="rgba(255,255,255,0.22)" />
            <circle cx="980" cy="220" r="2.2" fill="rgba(255,255,255,0.22)" />
            <circle cx="1240" cy="160" r="1.8" fill="rgba(255,255,255,0.18)" />
            <circle cx="1160" cy="320" r="1.5" fill="rgba(222,89,67,0.24)" />
          </motion.g>
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
              bg-[#DE5943]/10
              shadow-[0_20px_60px_rgba(0,0,0,0.4)]
              border-6 sm:border-10 border-white/10
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
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full"
            >
              <Button
                asChild
                variant="outline"
                className="rounded-full px-5 sm:px-8 h-10 sm:h-12 text-xs sm:text-sm font-semibold border-white/40 text-white bg-white/10 hover:bg-white/20 w-full sm:w-auto"
              >
                <Link href="/about">Discover More about CHAAD</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
