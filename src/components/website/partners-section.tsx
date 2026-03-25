"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Partner = {
  name: string;
  description: string;
  logoSrc?: string;
};

const PARTNERS: Partner[] = [
  {
    name: "Chevron",
    description: "Description coming soon.",
    logoSrc: "/CLIENT%20LOGO/CHEVRON.svg",
  },
  {
    name: "Seplat",
    description: "Description coming soon.",
    logoSrc: "/CLIENT%20LOGO/SEPLAT.svg",
  },
  {
    name: "Renaissance",
    description: "Description coming soon.",
    logoSrc: "/CLIENT%20LOGO/RENAISSANCE.svg",
  },
  {
    name: "Heirs",
    description: "Description coming soon.",
    logoSrc: "/CLIENT%20LOGO/HEIRS.svg",
  },
  {
    name: "Heritage",
    description: "Description coming soon.",
    logoSrc: "/CLIENT%20LOGO/HERITAGE.svg",
  },
  {
    name: "Newcross",
    description: "Description coming soon.",
    logoSrc: "/CLIENT%20LOGO/NEWCROSS.svg",
  },
  {
    name: "PNG Gas",
    description: "Description coming soon.",
    logoSrc: "/CLIENT%20LOGO/PNG%20GAS.svg",
  },
  {
    name: "Aradel",
    description: "Description coming soon.",
    logoSrc: "/CLIENT%20LOGO/ARADEL.svg",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

export function PartnersSection() {
  return (
    <section className="bg-[#EDEFF7] py-16 md:py-24 [font-family:var(--font-inter)]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center space-y-[16px]  "
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={{
            initial: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#C44D4D] leading-relaxed"
            variants={fadeUp}
            transition={t}
          >
            Our Clients
          </motion.h2>
          <motion.p
            className=" text-sm md:text-base text-[#6D7BBD] max-w-lg mx-auto leading-relaxed"
            variants={fadeUp}
            transition={t}
          >
            We’re trusted by leading companies across the energy and industrial
            landscape.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 justify-items-center"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={{
            initial: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.05 },
            },
          }}
        >
          {PARTNERS.map((p, idx) => {
            const isLastOdd =
              idx === PARTNERS.length - 1 && PARTNERS.length % 2 === 1;
            return (
              <motion.div
                key={p.name}
                variants={fadeUp}
                transition={t}
                className={[
                  "bg-white rounded-[12px] shadow-sm border border-black/5 overflow-hidden",
                  "w-full max-w-[410px] h-[314px]",
                  "px-6 pt-7 pb-10",
                  "relative",
                  isLastOdd ? "sm:col-span-2" : "",
                ].join(" ")}
              >
                <div className="h-16 md:h-20 flex items-center justify-center mb-5">
                  {p.logoSrc ? (
                    <Image
                      src={p.logoSrc}
                      alt={p.name}
                      width={160}
                      height={80}
                      className="max-h-full w-auto object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-40 h-10 rounded bg-[#EDEFF7]"
                      aria-hidden
                    />
                  )}
                </div>

                <h3 className="text-center text-sm md:text-base lg:text-2xl font-bold tracking-wide text-[#C44D4D]">
                  {p.name}
                </h3>
                <p className="mt-3 text-center text-xs md:text-sm leading-relaxed text-[#6D7BBD] font-normal decoration-[#6D7BBD]/60">
                  {p.description}
                </p>

                <div
                  className="absolute left-0 right-0 bottom-0 h-[9px] bg-[#C44D4D]"
                  aria-hidden
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
