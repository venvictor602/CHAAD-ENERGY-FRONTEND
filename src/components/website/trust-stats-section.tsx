"use client";

import { motion } from "framer-motion";
import { DiagonalImageSlider } from "./diagonal-image-slider";
import { CountUp, useInViewOnce } from "@/components/ui/count-up";

const STATS = [
  { value: "50+", label: "Projects completed" },
  { value: "7+", label: "Years in business" },
  { value: "98%", label: "Client satisfaction" },
];

const SLIDER_IMAGES = [
  "https://picsum.photos/seed/chaad-c1/300/400",
  "https://picsum.photos/seed/chaad-c2/300/400",
  "https://picsum.photos/seed/chaad-c3/300/400",
  "https://picsum.photos/seed/chaad-c4/300/400",
  "https://picsum.photos/seed/chaad-c5/300/400",
  "https://picsum.photos/seed/chaad-c6/300/400",
  "https://picsum.photos/seed/chaad-c7/300/400",
  "https://picsum.photos/seed/chaad-c8/300/400",
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function TrustStatsSection() {
  const { ref: statsRef, inView } = useInViewOnce<HTMLDivElement>({
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className=" max-w-[705px] w-full space-y-[36px]">
          <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
            <div className="flex gap-4">
              <div
                className="w-[6px] shrink-0 rounded-sm self-stretch"
                style={{
                  background:
                    "linear-gradient(to bottom, #DE5943 0%, transparent 100%)",
                }}
              />
              <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold italic text-[#1A1A1A] leading-tight">
                Seven years of building trust and delivering results
              </h2>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="text-[#4A4A4A] text-sm md:text-base leading-relaxed max-w-md"
          >
            CHAAD energy has completed over 150 projects across multiple
            sectors. Our team of experienced professionals brings dedication to
            every job, no matter the size or complexity.
          </motion.p>
        </div>
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16 items-start">
          <motion.div
            ref={statsRef}
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="flex flex-col divide-y divide-[#E8E8E8]"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="h-[176px] flex flex-col justify-center py-5"
              >
                <p className="text-4xl md:text-5xl lg:text-[80px] font-bold text-[#1A1A1A] leading-none mb-1">
                  <CountUp value={stat.value} start={inView} />
                </p>
                <p className="text-[#333333] font-normal text-sm mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="relative h-[480px] col-span-3 lg:h-[560px] rounded-[12px] overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <DiagonalImageSlider images={SLIDER_IMAGES} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
