"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type LogoItem = {
  src: string;
  alt: string;
};

type Slot = {
  left: string;
  top: string;
  scale: number;
  opacity: number;
};

const DEFAULT_LOGOS: LogoItem[] = [
  { src: "/Logo.svg", alt: "Client logo 1" },
  { src: "/Logo.svg", alt: "Client logo 2" },
  { src: "/Logo.svg", alt: "Client logo 3" },
  { src: "/Logo.svg", alt: "Client logo 4" },
  { src: "/Logo.svg", alt: "Client logo 5" },
  { src: "/Logo.svg", alt: "Client logo 6" },
  { src: "/Logo.svg", alt: "Client logo 7" },
];

const SLOTS: Slot[] = [
  // Outer-ish ring
  { left: "10%", top: "18%", scale: 0.9, opacity: 0.9 },
  { left: "28%", top: "6%", scale: 0.95, opacity: 1 },
  { left: "52%", top: "4%", scale: 0.92, opacity: 0.95 },
  { left: "74%", top: "12%", scale: 0.95, opacity: 1 },
  { left: "88%", top: "30%", scale: 0.9, opacity: 0.9 },
  { left: "82%", top: "56%", scale: 0.96, opacity: 1 },
  { left: "64%", top: "76%", scale: 0.92, opacity: 0.95 },
  { left: "40%", top: "82%", scale: 0.98, opacity: 1 },
  { left: "18%", top: "66%", scale: 0.92, opacity: 0.95 },
  { left: "10%", top: "44%", scale: 0.9, opacity: 0.9 },

  // Inner + center fill
  { left: "34%", top: "28%", scale: 0.88, opacity: 0.95 },
  { left: "58%", top: "26%", scale: 0.9, opacity: 1 },
  { left: "50%", top: "48%", scale: 0.92, opacity: 1 }, // center
  { left: "36%", top: "58%", scale: 0.88, opacity: 0.95 },
  { left: "60%", top: "62%", scale: 0.9, opacity: 1 },
];

export function TrustedBySection({
  logos = DEFAULT_LOGOS,
}: {
  logos?: LogoItem[];
}) {
  const effectiveLogos = useMemo(() => {
    if (logos.length === SLOTS.length) return logos;
    if (logos.length > SLOTS.length) return logos.slice(0, SLOTS.length);

    const filled: LogoItem[] = [];
    for (let i = 0; i < SLOTS.length; i++) {
      filled.push(logos[i % Math.max(1, logos.length)] ?? DEFAULT_LOGOS[i]);
    }
    return filled;
  }, [logos]);

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-[42px]">
            <p className="text-xs md:text-[24px] font-bold  tracking-[0.24em] text-[#1A1A1A]">
              TRUSTED BY
            </p>
            <h2 className="text-4xl italic md:text-5xl lg:text-[56px] font-semibold text-[#333333] leading-tight">
              We <span className=" ">are trusted by</span> over{" "}
              <span className="  text-[#485AAC]">50 clients</span>{" "}
              <span className="  ">across the nation</span>
            </h2>
          </div>

          <div className="relative h-[260px] sm:h-[320px] md:h-[360px] lg:h-[380px]">
            <motion.div
              className="absolute inset-0 rotate-[-10deg] will-change-transform"
              animate={{ rotate: [-10, 350] }}
              transition={{
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              }}
            >
              {effectiveLogos.map((logo, i) => {
                const slot = SLOTS[i % SLOTS.length];
                return (
                  <motion.div
                    key={logo.alt}
                    className="absolute"
                    style={{
                      left: slot.left,
                      top: slot.top,
                      transform: `translate(-50%, -50%) scale(${slot.scale})`,
                      opacity: slot.opacity,
                    }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.6 + (i % 5) * 0.35,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      className="h-12 w-24 sm:h-14 sm:w-28 md:h-16 md:w-32 bg-white rounded-md flex items-center justify-center"
                      // Counter-rotate so logos stay upright while the cloud rotates
                      animate={{ rotate: [10, -350] }}
                      transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                      }}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={128}
                        height={64}
                        className="w-full h-full object-contain opacity-90"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
