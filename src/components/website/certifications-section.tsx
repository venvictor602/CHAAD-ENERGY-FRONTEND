"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function CertificationsSection() {
  return (
    <section id="certifications" className="bg-white py-16 md:py-24">
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

        <motion.div
          className="mt-10 md:mt-14 rounded-2xl bg-[#F3F4F6] overflow-hidden relative h-[170px] md:h-[200px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(280px 140px at 12% 45%, rgba(72,90,172,0.18), transparent 60%), radial-gradient(320px 180px at 88% 55%, rgba(72,90,172,0.16), transparent 60%)",
            }}
            aria-hidden
          />
          <div
            className="absolute -left-10 top-4 h-44 w-44 md:h-56 md:w-56 rounded-[36px] bg-[#E7ECF9] rotate-12 opacity-70"
            aria-hidden
          />
          <div
            className="absolute -right-14 bottom-0 h-48 w-48 md:h-60 md:w-60 rounded-[44px] bg-[#E7ECF9] -rotate-6 opacity-70"
            aria-hidden
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/assets/iso.png"
              alt="ISO 9001 certified"
              width={170}
              height={170}
              className="object-contain"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
