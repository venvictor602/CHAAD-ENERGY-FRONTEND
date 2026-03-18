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
      delay: 0.3 + i * 0.15,
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
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0c1526]">
      <div className="absolute inset-0" aria-hidden>
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,21,38,0.25) 0%, rgba(12,21,38,0.10) 35%, rgba(0,0,0,0.35) 100%), radial-gradient(900px 520px at 20% 30%, rgba(222,89,67,0.18), transparent 60%), radial-gradient(820px 560px at 85% 70%, rgba(72,90,172,0.20), transparent 62%)",
          }}
          aria-hidden
        />
      </div>

      <Navbar />

      <div className="relative flex-1 flex items-center justify-center px-6 pt-28 pb-16">
        <div
          className="
            relative w-full max-w-[620px] text-center
            bg-[#DE5943]/35 backdrop-blur-[10px]
            shadow-[0_8px_60px_0_rgba(0,0,0,0.5)]
            px-10 py-12 md:py-14
          "
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)",
            borderLeft: "4px solid rgba(255,255,255,0.5)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-white/50"
            aria-hidden
          />

          <motion.p
            custom={0}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="text-xs font-bold tracking-[0.22em] text-[#ffffff] uppercase mb-4"
          >
            CHAAD Energy Limited
          </motion.p>

          <motion.h1
            custom={1}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
          >
            Powering Nigeria&apos;s Energy Future
          </motion.h1>

          <motion.div
            custom={2}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-5 mb-5 h-[3px] w-16 rounded-full bg-white/60"
            aria-hidden
          />

          <motion.p
            custom={3}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="text-sm sm:text-base text-white/85 max-w-md mx-auto leading-relaxed"
          >
            End-to-end oil &amp; gas, energy and construction solutions —
            delivered with safety, precision and measurable results.
          </motion.p>

          <motion.div
            custom={4}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            {/* <Button
              asChild
              variant="default"
              className="rounded-sm px-8 h-11 font-semibold bg-[#DE5943] hover:bg-[#c44d39] text-white shadow-lg"
            >
              <Link href="/contact#consultation">Request Consultation</Link>
            </Button> */}
            <Button
              asChild
              variant="outline"
              className="rounded-sm px-8 h-11 font-semibold border-white/40 text-white bg-white/10 hover:bg-white/20"
            >
              <Link href="/about">Discover More</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
