"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Leader = {
  name: string;
  role: string;
  imageSrc: string;
};

const LEADERS: Leader[] = [
  {
    name: "Dr. Marcus Vance",
    role: "Chief Executive Officer",
    imageSrc: "https://picsum.photos/seed/chaad-leader-1/600/600",
  },
  {
    name: "Elena Rodriguez",
    role: "Chief Technology Officer",
    imageSrc: "https://picsum.photos/seed/chaad-leader-2/600/600",
  },
  {
    name: "Jameson Wright",
    role: "VP of Sustainability",
    imageSrc: "https://picsum.photos/seed/chaad-leader-3/600/600",
  },
  {
    name: "Sarah Jenkins",
    role: "Operations Director",
    imageSrc: "https://picsum.photos/seed/chaad-leader-4/600/600",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

export function LeadershipTeamSection() {
  return (
    <section className="bg-[#EDEFF7] font-inter py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="max-w-2xl space-y-[16px]"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={{
            initial: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#333333] leading-relaxed"
            variants={fadeUp}
            transition={t}
          >
            Leadership Team
          </motion.h2>
          <motion.p
            className="text-sm md:text-base font-normal text-[#94A3B8] leading-relaxed"
            variants={fadeUp}
            transition={t}
          >
            The minds driving CHAAD Energy forward.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={{
            initial: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
        >
          {LEADERS.map((leader) => (
            <motion.div
              key={leader.name}
              className="space-y-[16px]"
              variants={fadeUp}
              transition={t}
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white shadow-sm">
                <Image
                  src={leader.imageSrc}
                  alt={leader.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div>
                <p className="text-sm md:text-lg font-bold text-[#333333]">
                  {leader.name}
                </p>
                <p className="text-xs md:text-sm text-[#8E8E8E] font-normal">
                  {leader.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
