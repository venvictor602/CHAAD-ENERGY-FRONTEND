"use client";

import { motion } from "framer-motion";

export function CertificationsSection() {
  return (
    <section id="certifications" className="bg-red-500 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] leading-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35 }}
          >
            We Are
            <br />
            Certified By
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-[#606060] leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            We are a certified construction and engineering company committed to
            delivering safe, reliable, and high-quality projects. Our
            certifications reflect our dedication to industry standards,
            professional excellence, and responsible operations, giving clients
            confidence that every project we handle is executed with proven
            expertise, strict safety practices, and trusted technical
            capability.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
