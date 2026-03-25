"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  HeartHandshake,
  Zap,
  Target,
  Award,
} from "lucide-react";

type ValueItem = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const VALUES: ValueItem[] = [
  {
    title: "Resilience",
    description:
      "We choose a positive and progressive attitude which allows us to persist and perform in challenging work environments.",
    icon: Zap,
  },
  {
    title: "Accessibility",
    description:
      "We maintain an open-door policy that gives employees the opportunity to discuss any work challenge(s) with their respective superiors and the human resource department. We are also available to all our stakeholders, for enquiries and advisory.",
    icon: Users,
  },
  {
    title: "Teamwork",
    description:
      "We strive for an inclusive culture where every individual is socially connected and appreciated. We value and encourage synergy of purpose and excellent teamwork in our daily operations as it contributes to the growth and success of the organization.",
    icon: HeartHandshake,
  },
  {
    title: "Integrity",
    description:
      "Our staff are expected to give full dedication to their work, as we consistently deliver on our obligations to clients and keep our promises. We also provide equal opportunity for engagement and promotion based on merit, diligent service and conduct.",
    icon: ShieldCheck,
  },
  {
    title: "Operational Excellence",
    description:
      "We are committed to excellence in how we conduct business. This culture is upheld by management and forms an essential fabric of who we are and represent.",
    icon: Target,
  },
  {
    title: "Competence",
    description:
      "We believe in continuous professional improvements through training, mentorship and encouragement; helping employees to improve and sustain their skills. We reward staff creativity, high performance and loyalty to service.",
    icon: Award,
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
    <section className="bg-[#FFF1EF] py-16 md:py-24 [font-family:var(--font-inter)]">
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
            className="text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-relaxed"
            variants={fadeUp}
            transition={t}
          >
            Our Core Values
          </motion.h2>
          <motion.p
            className="mt-3 text-sm md:text-base text-[#64748B]"
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
              <div className="w-[56px] h-[56px] rounded-[8px] bg-[#DE5943]/15 flex items-center justify-center">
                <v.icon className="h-6 w-6 text-[#DE5943]" />
              </div>
              <div className="space-y-[16px]">
                <h3 className="text-lg md:text-xl font-bold text-[#DE5943]">
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
