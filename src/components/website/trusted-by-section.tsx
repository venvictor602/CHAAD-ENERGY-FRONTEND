"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logosData from "@/lib/cloudinary-logos.json";

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

function toAlt(filename: string): string {
  return filename
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const cloudinaryLogos = (Array.isArray(logosData) ? logosData : []) as {
  group?: string;
  url?: string;
  filename?: string;
}[];

const DEFAULT_LOGOS: LogoItem[] = cloudinaryLogos
  .filter((l) => l.group === "clients" && typeof l.url === "string")
  .map((l) => ({
    src: String(l.url),
    alt: toAlt(String(l.filename || "Client logo")),
  }));

const SLOTS: Slot[] = [
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
  { left: "34%", top: "28%", scale: 0.88, opacity: 0.95 },
  { left: "58%", top: "26%", scale: 0.9, opacity: 1 },
  { left: "50%", top: "48%", scale: 0.92, opacity: 1 },
  { left: "36%", top: "58%", scale: 0.88, opacity: 0.95 },
  { left: "60%", top: "62%", scale: 0.9, opacity: 1 },
];

export function TrustedBySection({
  logos = DEFAULT_LOGOS,
}: {
  logos?: LogoItem[];
}) {
  const effectiveLogos = useMemo(() => {
    const base = logos.length > 0 ? logos : DEFAULT_LOGOS;
    return base.slice(0, Math.min(base.length, SLOTS.length));
  }, [logos]);

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="space-y-6 lg:space-y-[42px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#A82C3A]">
              Trusted Partners
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-[1.15]">
              Clients That Trust Us
            </h2>
            <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed max-w-lg">
              We take pride in our long-standing relationships with leading
              organizations in the energy and industrial sectors. Their
              continued trust is a testament to our commitment to excellence,
              safety, and reliable project delivery.
            </p>
          </motion.div>

          <motion.div
            className="relative h-[260px] sm:h-[320px] md:h-[360px] lg:h-[380px]"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
                    key={`${logo.alt}-${i}`}
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
                      className="h-14 w-28 sm:h-16 sm:w-32 md:h-20 md:w-40 rounded-md flex items-center justify-center"
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
                        width={160}
                        height={80}
                        className="w-full h-full object-contain opacity-90"
                        loading="lazy"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
