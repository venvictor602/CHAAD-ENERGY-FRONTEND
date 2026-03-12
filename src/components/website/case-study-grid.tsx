"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cloudinaryImages } from "@/lib/cloudinary-images";

export type CaseStudyItem = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  href: string;
};

const [img1, img2, img3, img4, img5, img6] = cloudinaryImages.caseStudy;

const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "1",
    imageSrc: img1,
    imageAlt: "Offshore oil platform",
    category: "OIL & GAS",
    title: "North Sea Offshore Platform Integrity & Life Extension",
    description:
      "Comprehensive structural assessment and cathodic protection upgrades for a major operator, extending asset life by 15 years.",
    href: "/projects/north-sea-platform",
  },
  {
    id: "2",
    imageSrc: img2,
    imageAlt: "Wind turbines at sunset",
    category: "RENEWABLES",
    title: "Grid Integration & Substation Works for 200MW Wind Farm",
    description:
      "Full EPC scope for grid connection and balance-of-plant works, enabling stable renewable power delivery to the national grid.",
    href: "/projects/wind-farm-grid",
  },
  {
    id: "3",
    imageSrc: img3,
    imageAlt: "LNG terminal piping and tanks",
    category: "INFRASTRUCTURE",
    title: "LNG Terminal Tank Inspections & Coating Remediation",
    description:
      "API 653 inspections and specialized lining systems for cryogenic storage tanks at a regional LNG import facility.",
    href: "/projects/lng-terminal",
  },
  {
    id: "4",
    imageSrc: img4,
    imageAlt: "Solar panels at industrial site",
    category: "RENEWABLES",
    title: "Utility-Scale Solar EPC & Commissioning",
    description:
      "Turnkey design, procurement, and construction of a 50MW solar PV plant with full commissioning and handover.",
    href: "/projects/solar-epc",
  },
  {
    id: "5",
    imageSrc: img5,
    imageAlt: "Underwater ROV",
    category: "OIL & GAS",
    title: "Subsea Pipeline CP Surveys & ROV Support",
    description:
      "Cathodic protection surveys and ROV-based inspection support for subsea pipelines in West African waters.",
    href: "/projects/subsea-cp",
  },
  {
    id: "6",
    imageSrc: img6,
    imageAlt: "Industrial refinery",
    category: "INFRASTRUCTURE",
    title: "Major Refinery Modernization & Turnaround Support",
    description:
      "Large-scale modernization of a regional fuel storage facility with integrated CP and commissioning services.",
    href: "/projects/refinery-modernization",
  },
];

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
  items = CASE_STUDIES,
}: {
  items?: CaseStudyItem[];
} = {}) {
  return (
    <section className="py-16 md:py-24 [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
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
          {items.map((item) => (
            <CaseStudyCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
