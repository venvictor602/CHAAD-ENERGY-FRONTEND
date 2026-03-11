"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeDown = {
  hidden: { opacity: 0, y: -28 },
  visible: { opacity: 1, y: 0 },
};
const fadeLeft = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0 },
};
const t = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

function ImageWithLogoOverlay({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 628px"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
        }}
        aria-hidden
      />
      <div className="absolute bottom-3 right-3 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Logo.svg"
          alt=""
          aria-hidden
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[#1A1A1A] py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          background:
            "radial-gradient(800px 400px at 15% 25%, rgba(72,90,172,0.22), transparent 60%), radial-gradient(700px 500px at 85% 65%, rgba(222,89,67,0.18), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            className="relative z-10 lg:-mr-14"
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={t}
          >
            <div className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md p-7 md:p-9 lg:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-white/70 font-semibold">
                About CHAAD Energy
              </p>
              <h2 className="mt-4 text-2xl md:text-[34px] lg:text-[40px] font-bold text-white leading-tight">
                Powering Energy & Infrastructure with Precision, Safety &
                Reliability
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/85 leading-relaxed">
                CHAAD Energy is an engineering and energy services firm
                specializing in EPC, commissioning, cathodic protection, tank
                services, and turnkey solutions for the energy, oil & gas, and
                industrial sectors.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[460px] sm:h-[520px] md:h-[600px] lg:h-[640px]"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...t, delay: 0.08 }}
          >
            <div className="absolute top-0 right-0 w-[min(100%,628px)] aspect-628/565 rounded-2xl overflow-hidden shadow-2xl z-0 ring-1 ring-white/10">
              <ImageWithLogoOverlay
                src="https://picsum.photos/seed/chaad-workers/628/565"
                alt="Industrial construction workers on site"
                width={628}
                height={565}
              />
            </div>
            <div className="absolute bottom-0 right-0 translate-x-10 md:translate-x-14 w-[min(100%,446px)] aspect-446/333 rounded-2xl overflow-hidden shadow-2xl z-10 ring-1 ring-white/10">
              <ImageWithLogoOverlay
                src="https://picsum.photos/seed/chaad-truck/446/333"
                alt="Industrial transport and logistics"
                width={446}
                height={333}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
