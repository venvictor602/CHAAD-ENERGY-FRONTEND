"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import logosData from "@/lib/cloudinary-logos.json";
import { getCloudinaryLogoUrl } from "@/lib/cloudinary-images";

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

const CLIENT_LOGO_WIDTH_OVERRIDES: Record<string, number> = {
  "ND WESTERN.png": 360,
  "ARADEL.png": 600,
  "CHEVRON.png": 600,
  "HEIRS.png": 640,
  "HERITAGE.png": 680,
  "NEWCROSS.png": 680,
  "PLATFORM.png": 720,
  "PNG GAS.png": 680,
  "RENAISSANCE.png": 680,
  "SEPLAT.png": 680,
  "SAHARA.png": 640,
};

const DEFAULT_LOGOS: LogoItem[] = cloudinaryLogos
  .filter((l) => l.group === "clients" && typeof l.url === "string")
  .map((l) => ({
    src: getCloudinaryLogoUrl(
      String(l.url),
      CLIENT_LOGO_WIDTH_OVERRIDES[String(l.filename || "")] ?? 320,
    ),
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

  const reduceMotion = useReducedMotion();

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
            <p className="inline-flex items-center rounded-full border border-[#A82C3A]/25 bg-[#A82C3A]/8 px-4 py-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-[#A82C3A]">
              Clients That Trust Us
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
            className="relative h-[230px] sm:h-[320px] md:h-[360px] lg:h-[380px]"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {reduceMotion ? (
              <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-4 sm:gap-5 p-4 transform-[translateZ(0)]">
                {effectiveLogos.map((logo, i) => (
                  <div
                    key={`${logo.alt}-${i}`}
                    className="flex h-12 w-24 sm:h-16 sm:w-32 md:h-20 md:w-40 items-center justify-center rounded-md bg-white/90 shadow-sm ring-1 ring-black/5"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={160}
                      height={80}
                      className="max-h-full w-auto object-contain opacity-90"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="absolute inset-0 rotate-[-10deg] will-change-transform transform-[translateZ(0)] [-webkit-backface-visibility:hidden] backface-hidden -translate-x-[6%] sm:translate-x-0"
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
                        className="h-12 w-24 sm:h-16 sm:w-32 md:h-20 md:w-40 rounded-md flex items-center justify-center [-webkit-backface-visibility:hidden] backface-hidden"
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
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
