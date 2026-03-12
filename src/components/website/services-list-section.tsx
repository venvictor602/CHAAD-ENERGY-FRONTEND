"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { getServices } from "@/services/services";
import type { ServiceItem } from "@/types/app/response";
import { cloudinaryImages } from "@/lib/cloudinary-images";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

const DEFAULT_SERVICE_IMAGE = cloudinaryImages.default;

function ServiceCard({ service }: { service: ServiceItem }) {
  const imgSrc = service.image?.trim() || DEFAULT_SERVICE_IMAGE;
  const detailHref = `/services/${service.id}`;

  return (
    <motion.article
      className="group flex flex-col bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      variants={fadeUp}
      transition={t}
    >
      <Link href={detailHref} className="block">
        <div className="relative w-full aspect-video overflow-hidden shrink-0 bg-[#F1F5F9]">
          <Image
            src={imgSrc}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            unoptimized
          />
        </div>
      </Link>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <Link
          href={detailHref}
          className="text-lg font-bold text-[#333333] leading-tight mb-2 block hover:text-[#485AAC] transition-colors"
        >
          {service.name}
        </Link>
        <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3 flex-1">
          {service.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={detailHref}
            className="text-[#485AAC] font-semibold text-sm hover:text-[#3d4d94] transition-colors w-fit"
          >
            View details
          </Link>
          <span className="text-[#94A3B8]">·</span>
          <Link
            href="/contact"
            className="text-[#485AAC] font-semibold text-sm hover:text-[#3d4d94] transition-colors w-fit"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ServicesListSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getServices(1)
      .then((res) => {
        const list = res.data?.results ?? [];
        setServices(list.filter((s) => s.is_active !== false));
      })
      .catch(() => {
        setError("Unable to load services.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-[#F9FAFB] [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center gap-4 min-h-[280px]">
          <Loader2
            className="h-10 w-10 animate-spin text-[#485AAC]"
            aria-hidden
          />
          <p className="text-sm text-[#64748B]">Loading services…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-[#F9FAFB] [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[#64748B]">{error}</p>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-[#F9FAFB] [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#333333] leading-tight mb-10 md:mb-12 text-center"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={t}
        >
          Our Services
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
