"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Clock, ArrowDownLeft } from "lucide-react";
import { Breadcrumb } from "@/components/website/breadcrumb";
import { Button } from "@/components/ui/button";

const ZOOM_PADDING = 0.02;

function getMapEmbedUrl(lat: number, lng: number): string {
  const minLng = lng - ZOOM_PADDING;
  const minLat = lat - ZOOM_PADDING;
  const maxLng = lng + ZOOM_PADDING;
  const maxLat = lat + ZOOM_PADDING;
  const bbox = `${minLng},${minLat},${maxLng},${maxLat}`;
  const marker = `${lat},${lng}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`;
}

export type ProjectDetailData = {
  slug: string;
  title: string;
  overview: string;
  challenge: string;
  solution: string;
  client: string;
  location: string;
  services: string;
  duration: string;
  facilityAddress?: string;
  mapLat?: number;
  mapLng?: number;
  metrics: {
    value: string;
    label: string;
    subtext: string;
    icon: "efficiency" | "uptime" | "costs";
  }[];
  galleryImages: { src: string; alt: string }[];
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

const METRIC_ICONS = {
  efficiency: TrendingUp,
  uptime: Clock,
  costs: ArrowDownLeft,
};

export function ProjectDetailContent({
  project,
  breadcrumbItems,
}: {
  project: ProjectDetailData;
  breadcrumbItems: { label: string; href?: string }[];
}) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const mapUrl =
    project.mapLat != null && project.mapLng != null
      ? getMapEmbedUrl(project.mapLat, project.mapLng)
      : null;

  const canPrev = galleryIndex > 0;
  const canNext = galleryIndex < project.galleryImages.length - 1;

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

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-12 mt-[100px]">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-2 space-y-[50px]"
            initial="initial"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={t}
          >
            <section className=" max-w-[620px] w-full space-y-[16px]">
              <h2 className="font-bold text-[24px] border-l-4 border-[#485AAC] pl-[8px] text-[#333333] flex items-center gap-2">
                Project Overview
              </h2>
              <p className="text-[#777777] font-normal text-[18px] leading-relaxed">
                {project.overview}
              </p>
            </section>
            <section>
              <h2 className="font-bold text-[24px] border-l-4 border-[#485AAC] pl-[8px] text-[#333333] flex items-center gap-2">
                The Challenge
              </h2>
              <p className="text-[#777777] font-normal text-[18px] leading-relaxed">
                {project.challenge}
              </p>
            </section>
            <section>
              <h2 className="font-bold text-[24px] border-l-4 border-[#485AAC] pl-[8px] text-[#333333] flex items-center gap-2">
                The Solution
              </h2>
              <p className="text-[#777777] font-normal text-[18px] leading-relaxed">
                {project.solution}
              </p>
            </section>
          </motion.div>

          <motion.aside
            className="space-y-6"
            initial="initial"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={t}
          >
            <div className="bg-[#F9FAFB0D] rounded-[12px] shadow-md border border-[#CBD5E1] p-6 space-y-[16px]">
              <h3 className="font-bold text-[18px] text-[#333333]">
                Project Details
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-[#4A4A4A] text-[12px] font-bold">
                    CLIENT
                  </dt>
                  <dd className="text-[#777777] text-[16px] font-medium">
                    {project.client}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#4A4A4A] text-[12px] font-bold">
                    LOCATION
                  </dt>
                  <dd className="text-[#777777] text-[16px] font-medium">
                    {project.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#4A4A4A] text-[12px] font-bold">
                    SERVICES
                  </dt>
                  <dd className="text-[#777777] text-[16px] font-medium">
                    {project.services}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#4A4A4A] text-[12px] font-bold">
                    DURATION
                  </dt>
                  <dd className="text-[#777777] text-[16px] font-medium">
                    {project.duration}
                  </dd>
                </div>
              </dl>
            </div>
            {mapUrl && (
              <div className="bg-white rounded-xl shadow-md border border-[#E5E7EB] overflow-hidden">
                <div className="relative w-full aspect-4/3">
                  <iframe
                    title="Facility location"
                    src={mapUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="bg-[#28325F] text-white px-4 py-3">
                  <p className="text-xs font-medium opacity-90">
                    Facility Location
                  </p>
                  <p className="font-semibold">
                    {project.facilityAddress ?? project.location}
                  </p>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      </div>

      <section className="bg-[#485AAC] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
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
            {project.metrics.map((m, i) => {
              const Icon = METRIC_ICONS[m.icon];
              return (
                <motion.div
                  key={i}
                  className="bg-[#F9FAFB] space-y-[8px] rounded-[12px] p-6 md:p-8 text-center"
                  variants={fadeUp}
                  transition={t}
                >
                  {Icon && (
                    <Icon className="size-[32px] text-[#485AAC] mx-auto" />
                  )}
                  <p className="text-[24px] lg:text-[32px] font-black text-[#333333]">
                    {m.value}
                  </p>
                  <p className="text-sm font-medium text-[#777777] uppercase tracking-wide">
                    {m.label}
                  </p>
                  <p className="text-sm font-bold text-[#10B981]">
                    {m.subtext}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8"
            initial="initial"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={t}
          >
            Project Gallery
          </motion.h2>
          <motion.div
            className="relative"
            initial="initial"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={t}
          >
            <div className="relative w-full aspect-21/9 rounded-xl overflow-hidden bg-[#E5E7EB]">
              {project.galleryImages[galleryIndex] && (
                <Image
                  src={project.galleryImages[galleryIndex].src}
                  alt={project.galleryImages[galleryIndex].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1280px"
                  loading="lazy"
                />
              )}
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => setGalleryIndex((i) => Math.max(0, i - 1))}
                disabled={!canPrev}
                className="w-10 h-10 rounded-full border-2 border-[#28325F] flex items-center justify-center text-[#28325F] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#28325F] hover:text-white transition-colors"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() =>
                  setGalleryIndex((i) =>
                    Math.min(project.galleryImages.length - 1, i + 1),
                  )
                }
                disabled={!canNext}
                className="w-10 h-10 rounded-full border-2 border-[#28325F] flex items-center justify-center text-[#28325F] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#28325F] hover:text-white transition-colors"
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="w-full rounded-[12px] bg-[#F1F5F9] min-h-0 px-5 py-6 sm:px-8 sm:py-10 md:px-12 md:py-12 flex flex-col items-center text-center gap-4 shadow-sm"
            initial="initial"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={t}
          >
            <h2 className="text-[20px] sm:text-[24px] md:text-[30px] font-extrabold text-[#485AAC]">
              Have a similar project in mind?
            </h2>
            <p className="text-sm font-normal sm:text-base text-[#7A90AE] max-w-xl">
              Let&apos;s discuss how we can bring modern automation and peak
              efficiency to your facility.
            </p>
            <Button
              size="default"
              className="bg-[#485AAC] font-bold text-[16px] hover:bg-[#3d4d94] text-white rounded-[8px]"
              asChild
            >
              <Link href="/contact">Start a Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
