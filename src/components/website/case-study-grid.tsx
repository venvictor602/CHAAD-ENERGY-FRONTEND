"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FolderOpen } from "lucide-react";

export type CaseStudyItem = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  href: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

function CaseStudyCard({ item }: { item: CaseStudyItem }) {
  return (
    <motion.article
      className="group flex flex-col bg-[#485AAC0D] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full"
      variants={fadeUp}
      transition={t}
    >
      <div className="relative w-full aspect-16/10 overflow-hidden shrink-0">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1 text-left space-y-[20px]">
        <div className=" space-y-[12px]">
          <span className="inline-block w-fit px-[8px] py-[2px] rounded bg-[#485AAC1A] text-[#485AAC] text-[10px] font-bold tracking-wide">
            {item.category}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-[#333333] leading-tight ">
            {item.title}
          </h3>
          <p className="text-sm text-[#94A3B8] font-normal leading-relaxed flex-1">
            {item.description}
          </p>
        </div>
        <Link
          href={item.href}
          className="inline-flex items-center gap-1.5 text-[#485AAC] font-bold text-sm hover:text-[#3d4d94] transition-colors w-fit"
        >
          View Case Study
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </div>
    </motion.article>
  );
}

export function CaseStudyGrid({
  items = [],
}: {
  items?: CaseStudyItem[];
} = {}) {
  const list = items ?? [];
  return (
    <section className="py-16 md:py-24 [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 min-h-[280px] text-center py-12">
            <FolderOpen className="h-14 w-14 text-[#94A3B8]" aria-hidden />
            <p className="text-[#64748B] font-medium">No projects yet.</p>
            <p className="text-sm text-[#94A3B8]">
              Check back later for our work.
            </p>
          </div>
        ) : (
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
            {list.map((item) => (
              <CaseStudyCard key={item.id} item={item} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
