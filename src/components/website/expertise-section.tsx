"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Briefcase } from "lucide-react";

import { ServiceCard } from "./service-card";
import { getServices } from "@/services/services";
import type { ServiceItem } from "@/types/app/response";
import { cloudinaryImages } from "@/lib/cloudinary-images";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type CardItem = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  href: string;
};

const DESCRIPTION_MAX_LENGTH = 160;

function truncateDescription(text: string, maxLen: number): string {
  const s = (text ?? "").trim();
  if (s.length <= maxLen) return s;
  return s.slice(0, maxLen).trim() + "…";
}

function serviceToCard(item: ServiceItem): CardItem {
  return {
    imageSrc: item.image?.trim() || cloudinaryImages.default,
    imageAlt: item.name,
    title: item.name,
    description: truncateDescription(
      item.description ?? "",
      DESCRIPTION_MAX_LENGTH,
    ),
    href: `/services/${item.id}`,
  };
}

export function ExpertiseSection() {
  const [services, setServices] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices(1)
      .then((res) => {
        const list = res.data?.results ?? [];
        const active = list.filter((s) => s.is_active !== false);
        setServices(active.map(serviceToCard));
      })
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-[16px] lg:space-y-[48px]">
        <motion.div
          className=" space-y-[16px]  max-w-[768px] w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[#DE5943] font-bold text-sm uppercase tracking-wider">
            Our Expertise
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] leading-[58px]">
            Comprehensive Engineering Solutions
          </h2>
          <p className="text-[#4A4A4A] text-lg font-normal leading-relaxed">
            From conceptual design to final commissioning, we provide
            full-lifecycle support for high-stakes energy infrastructure
            projects.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 min-h-[280px] place-items-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#485AAC]" />
          </div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 min-h-[280px] text-center py-12">
            <Briefcase className="h-14 w-14 text-[#94A3B8]" aria-hidden />
            <p className="text-[#64748B] font-medium">
              No services available yet.
            </p>
            <p className="text-sm text-[#94A3B8]">
              Check back later for our offerings.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.href + index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={itemVariants}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ServiceCard
                  imageSrc={service.imageSrc}
                  imageAlt={service.imageAlt}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
