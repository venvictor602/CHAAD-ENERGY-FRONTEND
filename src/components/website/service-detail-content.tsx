"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumb } from "@/components/website/breadcrumb";

export type ServiceDetailData = {
  slug: string;
  title: string;
  description: string[];
  projectTypes: string[];
  galleryImages: { src: string; alt: string }[];
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

export function ServiceDetailContent({
  service,
  breadcrumbItems,
}: {
  service: ServiceDetailData;
  breadcrumbItems: { label: string; href?: string }[];
}) {
  return (
    <article className="min-h-screen [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-4">
        <motion.div
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={t}
        >
          <Breadcrumb items={breadcrumbItems} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-12">
        <motion.header
          className="mb-8"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={t}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight">
            {service.title}
          </h1>
        </motion.header>

        <motion.div
          className="prose prose-lg max-w-none text-[#333333] leading-relaxed space-y-6 mb-10"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={t}
        >
          {service.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </motion.div>

        {service.projectTypes.length > 0 && (
          <motion.section
            className="mb-12"
            initial="initial"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={t}
          >
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
              Our range of projects includes but is not limited to:
            </h2>
            <ul className="space-y-2">
              {service.projectTypes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-8 border-l-[#28325F] shrink-0"
                    aria-hidden
                  />
                  <span className="text-[#606060]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}
      </div>

      <section className="bg-[#F8F9FA] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8"
            initial="initial"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={t}
          >
            Gallery
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            initial="initial"
            whileInView="visible"
            viewport={viewport}
            variants={{
              initial: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
          >
            {service.galleryImages.length >= 3 ? (
              <>
                <motion.div
                  className="relative w-full aspect-4/3 rounded-xl overflow-hidden"
                  variants={fadeUp}
                  transition={t}
                >
                  <Image
                    src={service.galleryImages[0].src}
                    alt={service.galleryImages[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div
                  className="relative w-full aspect-4/3 rounded-xl overflow-hidden"
                  variants={fadeUp}
                  transition={t}
                >
                  <Image
                    src={service.galleryImages[1].src}
                    alt={service.galleryImages[1].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div
                  className="relative w-full max-w-md mx-auto aspect-4/3 rounded-xl overflow-hidden sm:col-span-2"
                  variants={fadeUp}
                  transition={t}
                >
                  <Image
                    src={service.galleryImages[2].src}
                    alt={service.galleryImages[2].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 896px"
                    loading="lazy"
                  />
                </motion.div>
              </>
            ) : (
              service.galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  className="relative w-full aspect-4/3 rounded-xl overflow-hidden"
                  variants={fadeUp}
                  transition={t}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>
    </article>
  );
}
