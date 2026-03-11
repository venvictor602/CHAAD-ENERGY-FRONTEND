"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-60px" };
const t = { duration: 0.45 };

export function ContactQuoteSection({
  imageSrc = "/assets/Contact.png",
}: {
  imageSrc?: string;
}) {
  return (
    <section className="bg-[#F9FAFB] py-16 md:py-24 [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="space-y-10 md:space-y-32"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={{
            initial: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div
            className="space-y-6 lg:space-y-10 "
            variants={fadeUp}
            transition={t}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
              Office Locations
            </h2>

            <div className="grid gap-6 md:grid-cols-4 items-start">
              <div className="flex gap-4 col-span-2">
                <div
                  className="w-1 bg-[#485AAC] rounded-full shrink-0"
                  aria-hidden
                />
                <div className="space-y-1">
                  <p className="text-sm md:text-base font-bold text-[#333333]">
                    Port Harcourt
                  </p>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-normal leading-relaxed max-w-md">
                    No 3 Sweet Apple Close, Km 17, PHC/Aba Expressway, Off
                    Boskel Road, Port Harcourt, Rivers 500102, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="w-1 bg-[#485AAC] rounded-full shrink-0"
                  aria-hidden
                />
                <div className="space-y-1">
                  <p className="text-sm md:text-base font-bold text-[#333333]">
                    Call Us
                  </p>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-normal leading-relaxed">
                    +1 (555) 234-5678
                    <br />
                    Mon–Fri, 8am–6pm
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="w-1 bg-[#485AAC] rounded-full shrink-0"
                  aria-hidden
                />
                <div className="space-y-1">
                  <p className="text-sm md:text-base font-bold text-[#333333]">
                    Email Us
                  </p>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-normal leading-relaxed">
                    hello@chaadng.com
                    <br />
                    Response within 24h
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-stretch"
            variants={fadeUp}
            transition={t}
          >
            <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 sm:p-8">
              <div className="space-y-5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#333333]">
                  Request a Quote
                </h3>

                <form
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label className="space-y-2">
                    <span className="text-[10px] md:text-sm font-semibold tracking-widest text-[#1A1A1A]/70">
                      FULL NAME
                    </span>
                    <input
                      className="w-full h-11 rounded-lg border border-black/10 bg-white px-4 text-sm text-[#1A1A1A] placeholder:text-[#94A3B8] outline-none focus:border-[#485AAC] focus:ring-2 focus:ring-[#485AAC]/20"
                      placeholder="Jane Doe"
                      name="fullName"
                      autoComplete="name"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-[10px] md:text-sm font-semibold tracking-widest text-[#1A1A1A]/70">
                      COMPANY NAME
                    </span>
                    <input
                      className="w-full h-11 rounded-lg border border-black/10 bg-white px-4 text-sm text-[#1A1A1A] placeholder:text-[#94A3B8] outline-none focus:border-[#485AAC] focus:ring-2 focus:ring-[#485AAC]/20"
                      placeholder="Acme Corp"
                      name="company"
                      autoComplete="organization"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-[10px] md:text-sm font-semibold tracking-widest text-[#1A1A1A]/70">
                      EMAIL ADDRESS
                    </span>
                    <input
                      className="w-full h-11 rounded-lg border border-black/10 bg-white px-4 text-sm text-[#1A1A1A] placeholder:text-[#94A3B8] outline-none focus:border-[#485AAC] focus:ring-2 focus:ring-[#485AAC]/20"
                      placeholder="jane@acme.com"
                      name="email"
                      type="email"
                      autoComplete="email"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-[10px] md:text-sm font-semibold tracking-widest text-[#1A1A1A]/70">
                      SERVICE NEEDED
                    </span>
                    <div className="relative">
                      <select
                        className="w-full h-11 appearance-none rounded-lg border border-black/10 bg-white px-4 pr-10 text-sm text-[#1A1A1A] outline-none focus:border-[#485AAC] focus:ring-2 focus:ring-[#485AAC]/20"
                        name="service"
                        defaultValue="Structural Engineering"
                      >
                        <option>Structural Engineering</option>
                        <option>EPC Services</option>
                        <option>Commissioning</option>
                        <option>Cathodic Protection</option>
                        <option>Tank Services</option>
                        <option>Turnkey Solutions</option>
                      </select>
                      <span
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                        aria-hidden
                      >
                        ▾
                      </span>
                    </div>
                  </label>

                  <label className="space-y-2 sm:col-span-2">
                    <span className="text-[10px] md:text-sm font-semibold tracking-widest text-[#1A1A1A]/70">
                      PROJECT DETAILS
                    </span>
                    <textarea
                      className="w-full min-h-[128px] resize-none rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#94A3B8] outline-none focus:border-[#485AAC] focus:ring-2 focus:ring-[#485AAC]/20"
                      placeholder="Tell us about your project goals, location, and timeline..."
                      name="details"
                    />
                  </label>

                  <div className="sm:col-span-2 pt-2">
                    <Button
                      className="w-full bg-[#485AAC] hover:bg-[#3d4d94] text-white font-semibold rounded-lg"
                      type="submit"
                    >
                      Send Request
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-[#EDEFF7] min-h-[340px] sm:min-h-[420px] lg:min-h-full">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url(${imageSrc})` }}
                aria-hidden
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
