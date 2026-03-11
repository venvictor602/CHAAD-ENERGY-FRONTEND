"use client";

import { motion } from "framer-motion";

import { Navbar } from "@/components/layouts/navbar";

const DEFAULT_BG =
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export type PageHeroProps = {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage?: string;
};

export function PageHero({
  subtitle,
  title,
  description,
  backgroundImage = DEFAULT_BG,
}: PageHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden font-roboto">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/70" aria-hidden />
      </div>

      <Navbar />

      <div className="relative flex-1 flex flex-col justify-end mb-10">
        <div className="bg-[#000000B2]  px-6 lg:px-12 pt-28 pb-20">
          <div className="max-w-7xl mx-auto w-full ">
            <motion.div
              className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div className="space-y-4" variants={itemVariants}>
                <p className="text-sm md:text-[24px] font-bold text-white/90 border-b-2 border-[#485AAC] pb-1 w-fit">
                  {subtitle}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white leading-tight">
                  {title}
                </h1>
              </motion.div>
              <motion.p
                className="text-base md:text-base font-medium text-white leading-relaxed max-w-xl"
                variants={itemVariants}
              >
                {description}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
