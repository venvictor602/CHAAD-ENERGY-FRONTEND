"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layouts/navbar";
import { TypewriterTitle } from "@/components/website/typewriter-title";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://assets.mixkit.co/videos/26966/26966-thumb-720-0.jpg"
        >
          <source
            src="https://assets.mixkit.co/videos/26966/26966-720.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[#1A1A1A]/60" aria-hidden />
      </div>

      <Navbar />

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight min-h-[1.2em]"
            variants={itemVariants}
          >
            <TypewriterTitle
              phrases={[
                "Build what matters with CHAAD Energy",
                "Delivering Engineering Excellence",
                "Precision. Safety. Results.",
              ]}
              speed={55}
              deleteSpeed={35}
              pauseDuration={2800}
              className="inline"
              as="span"
            />
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Delivering Engineering Excellence Across Energy & Industrial
            Landscapes. Partner with a solutions-driven team that values safety,
            precision, and measurable results.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button variant="default" size="default" asChild>
              <a href="/contact#consultation">Request Consultation</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
