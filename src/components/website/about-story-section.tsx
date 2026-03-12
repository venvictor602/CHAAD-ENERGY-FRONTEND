"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cloudinaryImages } from "@/lib/cloudinary-images";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const transition = { duration: 0.4 };

export function AboutStorySection() {
  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24 lg:py-32 font-inter">
      <div className="max-w-7xl mx-auto">
        <div className=" space-y-[50px] md:space-y-[100px]">
          <div className="px-6  flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 lg:gap-[40px]">
            <motion.div
              className=" max-w-[500px] w-full space-y-[24px]"
              initial="initial"
              whileInView="visible"
              viewport={viewport}
              variants={{
                initial: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.05 },
                },
              }}
            >
              <motion.h2
                className="text-2xl md:text-4xl font-extrabold text-[#333333]"
                variants={fadeUp}
                transition={transition}
              >
                Our Story
              </motion.h2>
              <motion.blockquote
                className="border-l-4 border-[#DE5943] pl-5 py-1 my-6"
                variants={fadeUp}
                transition={transition}
              >
                <p className="text-[#606060] italic text-base md:text-lg leading-relaxed font-medium">
                  &ldquo;Safe, sustainable energy solutions aren&apos;t just a
                  goal; they are our legacy.&rdquo;
                </p>
              </motion.blockquote>
              <motion.p
                className="text-[#606060] text-base md:text-lg font-medium text-justify leading-relaxed"
                variants={fadeUp}
                transition={transition}
              >
                CHAAD Engineering and Technical Services Limited (CHAAD E&T) is
                an indigenous Nigerian EPC (Engineering, Procurement, and
                Construction) company, incorporated in 2018 (RC 148924). We are
                ISO 9001-certified and built on a foundation of expertise in Oil
                &amp; Gas, Energy, and Construction.
              </motion.p>
            </motion.div>
            <motion.div
              className="w-full lg:w-auto flex flex-col justify-center sm:flex-row  gap-4 md:gap-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="relative w-full md:w-[343px] h-[360px] max-w-full rounded-[12px] overflow-hidden shrink-0">
                <Image
                  src={cloudinaryImages.aboutStory[0]}
                  alt="CHAAD Energy - Our Story"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 343px"
                />
              </div>
              <div className="relative w-full md:w-[343px] h-[360px] max-w-full rounded-[12px] overflow-hidden shrink-0">
                <Image
                  src={cloudinaryImages.aboutStory[1]}
                  alt="CHAAD Energy - Our Story"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 343px"
                />
              </div>
            </motion.div>
          </div>

          <div className="px-6 flex flex-col-reverse lg:flex-row items-start gap-4 md:gap-[40px] lg:h-[458px]">
            <motion.div
              className="relative w-full lg:w-[511px] h-[458px] lg:h-full max-w-full rounded-[12px] overflow-hidden shrink-0"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={cloudinaryImages.aboutStory[2]}
                alt="CHAAD Energy - Our Mission"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 511px"
              />
            </motion.div>
            <motion.div
              className="flex flex-col h-full justify-between gap-4 md:gap-[50px] max-w-[732px] w-full"
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
              <div className=" space-y-[27px]">
                <motion.h2
                  className="text-2xl md:text-4xl font-extrabold text-[#333333]"
                  variants={fadeUp}
                  transition={transition}
                >
                  Our Mission
                </motion.h2>
                <motion.p
                  className=" text-justify text-[#606060] font-normal text-base md:text-2xl leading-relaxed md:leading-[34px]"
                  variants={fadeUp}
                  transition={transition}
                >
                  To create superior value for all our stakeholders and
                  commercial value to our clients by providing quality and
                  cost-effective solutions, with emphasis on strict adherence to
                  safety and environmental impact of all our operations and
                  services
                </motion.p>
              </div>
              <div className=" space-y-[27px]">
                <motion.h2
                  className="text-2xl md:text-3xl font-extrabold text-[#333333]"
                  variants={fadeUp}
                  transition={transition}
                >
                  Our Vision
                </motion.h2>
                <motion.p
                  className="text-justify text-[#606060] font-normal text-base md:text-2xl leading-relaxed md:leading-[34px]  "
                  variants={fadeUp}
                  transition={transition}
                >
                  To become a world-class leader in service delivery to the Oil
                  &amp; Gas, Manufacturing and FMCG industries, while improving
                  the quality of life and sustaining economic growth.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
