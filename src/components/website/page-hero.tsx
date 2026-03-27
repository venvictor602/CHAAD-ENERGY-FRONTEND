"use client";

import { motion } from "framer-motion";

import { Navbar } from "@/components/layouts/navbar";
import { TypewriterTitle } from "@/components/website/typewriter-title";
import { cloudinaryImages } from "@/lib/cloudinary-images";

const DEFAULT_BG = cloudinaryImages.hero[0] || "";

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
  titlePhrases?: string[];
  description: string;
  backgroundImage?: string;
};

export function PageHero({
  subtitle,
  title,
  titlePhrases,
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
        <div
          className="absolute inset-0 bg-[#A82C3A]/25 md:bg-[#A82C3A]/35"
          aria-hidden
        />
      </div>

      <Navbar />

      <div className="relative flex-1 flex flex-col justify-center lg:justify-end mb-10">
        <div className="px-6 lg:px-12 pt-10 pb-16 lg:pt-28 lg:pb-20 lg:bg-[#A82C3A]/65">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-items-center text-center lg:items-end lg:justify-items-start lg:text-left"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 w-full max-w-xl lg:max-w-none lg:items-start lg:justify-start"
                variants={itemVariants}
              >
                <p className="text-sm md:text-[24px] font-bold text-white/90 border-b-2 border-[#A82C3A] pb-1 inline-block lg:w-fit">
                  {subtitle}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[64px] font-bold text-white leading-tight min-h-[1.2em]">
                  <TypewriterTitle
                    phrases={
                      titlePhrases && titlePhrases.length > 0
                        ? titlePhrases
                        : [title]
                    }
                    speed={50}
                    deleteSpeed={35}
                    pauseDuration={2600}
                    className="inline"
                    as="span"
                  />
                </h1>
              </motion.div>
              <motion.p
                className="text-sm sm:text-base font-medium text-white/95 leading-relaxed max-w-xl mx-auto lg:mx-0 lg:max-w-none text-center lg:text-left"
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
