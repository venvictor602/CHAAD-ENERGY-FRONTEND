"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

export function CtaSection({
  title = "Ready to start your next project?",
  description = "Partner with CHAAD Energy for industry-leading engineering services tailored to your specific requirements.",
  buttonText = "Request a Proposal",
  buttonHref = "/contact",
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
} = {}) {
  return (
    <section className="py-10 sm:py-16 md:py-24 [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          className="w-full rounded-2xl bg-[#F8F8FC] min-h-0 lg:min-h-[387px] px-5 py-6 sm:px-8 sm:py-10 md:px-12 md:py-12 flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left gap-5 sm:gap-6 lg:gap-10 shadow-sm"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={{
            initial: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          <div className="min-w-0 flex-1 space-y-3 sm:space-y-4 flex flex-col items-center lg:items-start">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-[56px] font-extrabold text-[#333333] leading-tight max-w-xl"
              variants={fadeUp}
              transition={t}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-[#5A5A5A] leading-[1.6] max-w-xl"
              variants={fadeUp}
              transition={t}
            >
              {description}
            </motion.p>
          </div>
          <motion.div
            className="w-full sm:w-auto shrink-0 lg:pl-4"
            variants={fadeUp}
            transition={t}
          >
            <Button
              size="default"
              className="w-full min-h-12 sm:min-h-0 bg-[#485AAC] hover:bg-[#3d4d94] text-white font-bold text-base sm:text-lg px-6 py-3.5 sm:py-2.5 rounded-xl"
              asChild
            >
              <Link href={buttonHref}>{buttonText}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
