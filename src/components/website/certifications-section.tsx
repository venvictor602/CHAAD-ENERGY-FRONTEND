"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Add more certifications here later: { src: "/assets/...", alt: "..." }
const CERTIFICATIONS = [{ src: "/assets/iso.png", alt: "ISO 9001" }];

const GAP = 48; // gap between items (px)
const ITEM_WIDTH = 168;

export function CertificationsSection() {
  // Include the boundary GAP between repeated sets for a seamless loop.
  // With `gap`, spacing exists between *all* adjacent items, including set boundaries.
  const stepWidth = CERTIFICATIONS.length * (ITEM_WIDTH + GAP);
  const duplicateCount = 12; // enough copies to fill viewport and loop seamlessly

  return (
    <section
      id="certifications"
      className="relative bg-[#F9FAFB] py-16 md:py-24 overflow-hidden"
    >
      {/* <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='60' cy='60' r='50' fill='none' stroke='%2342529D' stroke-width='2'/%3E%3Ctext x='60' y='35' font-size='10' fill='%2342529D' text-anchor='middle'%3EISO 9001%3C/text%3E%3Ctext x='60' y='90' font-size='8' fill='%2342529D' text-anchor='middle'%3E certified%3C/text%3E%3Ctext x='60' y='60' font-size='28' font-weight='bold' fill='%2342529D' text-anchor='middle'%3EQ%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "120px 120px",
        }}
        aria-hidden
      /> */}

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          className="text-3xl md:text-[40px] leading-[58px] font-bold text-[#1A1A1A] mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          We Are Certified By
        </motion.h2>
      </div>

      {/* Full-width marquee track */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex items-center w-max will-change-transform"
          style={{ gap: GAP }}
          animate={{ x: [0, -stepWidth] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 12,
              ease: "linear",
            },
          }}
        >
          {Array.from({ length: duplicateCount }).map((_, setIndex) =>
            CERTIFICATIONS.map((cert, i) => (
              <div key={`${setIndex}-${i}`} className="flex shrink-0">
                <Image
                  src={cert.src}
                  alt={setIndex === 0 && i === 0 ? cert.alt : ""}
                  width={ITEM_WIDTH}
                  height={ITEM_WIDTH}
                  aria-hidden={setIndex !== 0 || i !== 0}
                />
              </div>
            )),
          )}
        </motion.div>
      </div>
    </section>
  );
}
