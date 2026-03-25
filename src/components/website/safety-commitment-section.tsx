"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";

const BULLETS = [
  "ISN® Certified Platinum Member",
  "2.5 Million Man-Hours Without LTI",
  "Annual Safety Leadership Training",
];

const DEFAULT_BACKGROUND = "/assets/Commitment.png";

export function SafetyCommitmentSection({
  backgroundImage = DEFAULT_BACKGROUND,
}: {
  backgroundImage?: string;
}) {
  return (
    <section className="relative font-inter min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden border-y-4 border-[#991B1B] bg-white">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.82) 48%, rgba(255,255,255,0.35) 72%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 max-w-7xl  px-6 lg:px-12 py-16 md:py-20">
        <motion.div
          className="max-w-2xl space-y-[16px] lg:space-y-[40px]"
          initial="initial"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            initial: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight"
            variants={{
              initial: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
          >
            Our Commitment to
            <br />
            <span className="text-[#991B1B]">Safety</span>
          </motion.h2>
          <motion.p
            className="mt-6 text-[#334155] font-normal text-base md:text-lg leading-relaxed"
            variants={{
              initial: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
          >
            At CHAAD energy, safety isn&apos;t a protocol it&apos;s a culture.
            We believe that every accident is preventable. Our &quot;Zero
            Harm&quot; initiative ensures that our team, our partners, and the
            communities we serve return home safely every single day.
          </motion.p>
          <motion.ul
            className="mt-8 space-y-4"
            variants={{
              initial: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
          >
            {BULLETS.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[#1A1A1A]">
                <CheckCircleIcon
                  className="h-[20px] w-[20px] shrink-0 text-[#991B1B]"
                  strokeWidth={3}
                />
                <span className="text-sm md:text-base font-medium">{item}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
