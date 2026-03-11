"use client";

import type React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, HeartHandshake } from "lucide-react";

type ValueItem = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const VALUES: ValueItem[] = [
  {
    title: "Accessibility",
    description:
      "We operate with unwavering honesty and Always open, always available to clients and staff.",
    icon: ShieldCheck,
  },
  {
    title: "Teamwork",
    description:
      "Utilizing cutting-edge technology to solve the energy problems of tomorrow with collaboration and synergy for shared success",
    icon: Users,
  },
  {
    title: "Resilience",
    description:
      "Our commitment to superior quality ensures that every infrastructure project exceeds industry standards. Perform with positivity in all conditions.",
    icon: HeartHandshake,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

export function CoreValuesSection() {
  return (
    <section className="bg-[#42529D] py-16 md:py-24 [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center max-w-[544px] mx-auto"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={{
            initial: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#F1F5F9] leading-relaxed"
            variants={fadeUp}
            transition={t}
          >
            Our Core Values
          </motion.h2>
          <motion.p
            className="mt-3 text-sm md:text-base text-white/85"
            variants={fadeUp}
            transition={t}
          >
            These principles guide every decision we make, from board meetings
            to construction sites.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 md:mt-14 grid gap-6 md:gap-8 md:grid-cols-3"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={{
            initial: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
        >
          {VALUES.map((v) => (
            <motion.div
              key={v.title}
              className="bg-white rounded-[12px] shadow-lg border border-[#EE9D2B33] p-7 md:p-8 space-y-[20px]"
              variants={fadeUp}
              transition={t}
            >
              <div className="w-[56px] h-[56px] rounded-[8px] bg-[#EDEFF7B2] flex items-center justify-center">
                <v.icon className="h-6 w-6 text-[#485AAC]" />
              </div>
              <div className="space-y-[16px]">
                <h3 className="text-lg md:text-xl font-bold text-[#485AAC]">
                  {v.title}
                </h3>
                <p className=" text-sm leading-relaxed text-[#94A3B8] font-normal">
                  {v.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
