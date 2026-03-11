"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const METRICS = [
  { value: "200+", label: "PROJECT MILESTONES" },
  { value: "0", label: "SAFETY INCIDENTS" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

export function CaseStudySection() {
  return (
    <section className="bg-white py-16 md:py-24 [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          <motion.div
            className="space-y-6 md:space-y-[33px] min-w-0 max-w-[614px] w-full"
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
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#333333] leading-tight"
              variants={fadeUp}
              transition={t}
            >
              Major Refinery Modernization
            </motion.h2>
            <motion.p
              className="text-[#606060] text-sm sm:text-base font-normal leading-[1.6]"
              variants={fadeUp}
              transition={t}
            >
              Our EPC division recently completed a large-scale modernization of
              a regional fuel storage facility. By integrating our Cathodic
              Protection and Commissioning services, we delivered a 30%
              reduction in projected maintenance costs for the client.
            </motion.p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] max-w-[430px] w-full"
              variants={fadeUp}
              transition={t}
            >
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="w-full rounded-[8px] max-w-[230px] bg-[#485AAC0D] p-4 space-y-[4px]"
                >
                  <p className="text-2xl sm:text-2xl font-extrabold text-[#EE9D2B]">
                    {m.value}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-[#64748B]">
                    {m.label}
                  </p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} transition={t}>
              <Button
                className="w-full sm:w-auto font-bold text-lg p-8 rounded-[8px] bg-[#485AAC] hover:bg-[#1e2747] text-white"
                size="default"
                asChild
              >
                <Link href="/projects">View Full Case Study</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex flex-col gap-[10px] overflow-visible w-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-full max-w-[349px] rounded-xl bg-[#485AAC] shrink-0"
              style={{ aspectRatio: "349/252" }}
            />
            <div
              className="w-full max-w-[349px] ml-auto rounded-xl bg-[#42529D] shrink-0"
              style={{ aspectRatio: "349/268" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
