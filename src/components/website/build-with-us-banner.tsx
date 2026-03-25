"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-60px" };
const t = { duration: 0.45 };

export function BuildWithUsBanner() {
  return (
    <section className="relative bg-white py-16 sm:py-20 md:py-24 overflow-hidden [font-family:var(--font-inter)]">
      <motion.div
        className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#991B1B]/10 pointer-events-none"
        aria-hidden
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#991B1B]/10 pointer-events-none"
        aria-hidden
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      />
      <motion.div
        className="absolute -bottom-16 -right-16 w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-[#991B1B]/10 pointer-events-none"
        aria-hidden
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold italic text-[#1A1A1A] leading-tight"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={t}
        >
          Let&apos;s build your next energy project together.
        </motion.h2>
        <motion.p
          className="mt-4 sm:mt-6 text-[#64748B] text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-2xl mx-auto"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ ...t, delay: 0.05 }}
        >
          Our multidisciplinary team of engineers is equipped to handle the most
          demanding technical challenges in the global market.
        </motion.p>
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ ...t, delay: 0.1 }}
        >
          <Button
            className="w-full sm:w-auto bg-[#991B1B] border-2 border-[#991B1B] text-white hover:bg-[#7F1D1D] hover:border-[#7F1D1D] font-bold text-base rounded-[8px] px-6 py-6 sm:py-2.5 h-auto"
            size="default"
            asChild
          >
            <Link href="/contact">Speak with an Expert</Link>
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto border-2 border-[#991B1B] bg-transparent text-[#991B1B] text-base hover:bg-[#991B1B]/10 hover:border-[#991B1B] font-semibold rounded-[8px] px-6 py-6 sm:py-2.5 h-auto"
            size="default"
            asChild
          >
            <Link href="/contact">Request Full Portfolio</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
