"use client";

import { motion } from "framer-motion";
import { Shield, Cog, ArrowRightLeft, Leaf } from "lucide-react";
import Image from "next/image";
import { CountUp, useInViewOnce } from "@/components/ui/count-up";
import { cloudinaryImages } from "@/lib/cloudinary-images";

const FEATURES = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Zero-incident culture integrated into every engineering workflow.",
  },
  {
    icon: Cog,
    title: "Deep Expertise",
    description:
      "Decades of specialized knowledge in energy and infrastructure.",
  },
  {
    icon: ArrowRightLeft,
    title: "Turnkey Partners",
    description: "End-to-end solutions from design through commissioning.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Innovation focused on environmental responsibility.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function WhyTrustUsSection() {
  const { ref: badgeRef, inView: badgeInView } = useInViewOnce<HTMLDivElement>({
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <section id="why-trust-us" className="bg-[#A82C3A] py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="space-y-[16px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={itemVariants}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl leading-[58px] lg:text-5xl font-bold text-white">
              Why Global Leaders Trust Us
            </h2>
            <p className="text-white/90 text-base font-normal leading-relaxed">
              We combine decades of technical expertise with a relentless
              commitment to safety and innovation, ensuring every project meets
              the highest international standards.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={itemVariants}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="shrink-0 w-12 h-12 rounded-full border-2 border-white/55 flex items-center justify-center bg-white/15">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">
                      {feature.title}
                    </h3>
                    <p className="text-white/85 font-normal text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-xl overflow-hidden aspect-4/3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={cloudinaryImages.hero[3] || cloudinaryImages.default}
              width={800}
              height={600}
              alt="Industrial team at work"
              className="w-full h-full object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
            />
            <div
              ref={badgeRef}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 flex items-center gap-4 rounded-[12px] bg-white/12 backdrop-blur-md p-[16px] lg:p-[24px] max-w-[457px] w-full shadow-lg ring-1 ring-white/20"
            >
              <p className="text-3xl md:text-4xl font-extrabold text-white shrink-0">
                <CountUp value="7+" start={badgeInView} />
              </p>
              <p className="text-white/90 font-medium text-sm leading-snug">
                Years of delivering mission-critical infrastructure worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
