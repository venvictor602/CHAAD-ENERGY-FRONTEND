"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export type NewsItem = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  title: string;
  description: string;
  href: string;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    imageSrc: "https://picsum.photos/seed/chaad-news-1/800/500",
    imageAlt: "Technology and innovation",
    date: "Oct 12, 2024",
    title: "Future of AI in 2024: Beyond the Hype",
    description:
      "Exploring the upcoming trends in artificial intelligence, from generative models to autonomous agent systems and their ethical implications.",
    href: "/news/future-of-ai-2024",
  },
  {
    id: "2",
    imageSrc: "https://picsum.photos/seed/chaad-news-2/800/500",
    imageAlt: "Energy sector",
    date: "Oct 8, 2024",
    title: "Renewable Energy Integration in Industrial Grids",
    description:
      "How leading operators are balancing grid stability with higher shares of wind and solar while maintaining reliability.",
    href: "/news/renewable-energy-integration",
  },
  {
    id: "3",
    imageSrc: "https://picsum.photos/seed/chaad-news-3/800/500",
    imageAlt: "Safety and compliance",
    date: "Oct 5, 2024",
    title: "Safety Standards Update: What’s Changing in 2025",
    description:
      "An overview of revised safety and environmental regulations affecting oil, gas, and construction projects.",
    href: "/news/safety-standards-2025",
  },
  {
    id: "4",
    imageSrc: "https://picsum.photos/seed/chaad-news-4/800/500",
    imageAlt: "Infrastructure",
    date: "Sep 28, 2024",
    title: "Cathodic Protection Best Practices for Aging Assets",
    description:
      "Extending the life of buried and submerged infrastructure through modern CP design and monitoring.",
    href: "/news/cathodic-protection-best-practices",
  },
  {
    id: "5",
    imageSrc: "https://picsum.photos/seed/chaad-news-5/800/500",
    imageAlt: "Project delivery",
    date: "Sep 22, 2024",
    title: "EPC Project Delivery in a Volatile Supply Chain",
    description:
      "Strategies for managing cost and schedule when materials and equipment lead times remain unpredictable.",
    href: "/news/epc-supply-chain",
  },
  {
    id: "6",
    imageSrc: "https://picsum.photos/seed/chaad-news-6/800/500",
    imageAlt: "Industry insights",
    date: "Sep 15, 2024",
    title: "Industry Insights: Decarbonization and the Role of Gas",
    description:
      "How natural gas and hydrogen are shaping the transition in power and industrial sectors.",
    href: "/news/decarbonization-gas",
  },
  {
    id: "7",
    imageSrc: "https://picsum.photos/seed/chaad-news-7/800/500",
    imageAlt: "Commissioning",
    date: "Sep 10, 2024",
    title: "Commissioning Excellence on Mega Projects",
    description:
      "Lessons from large-scale commissioning programs and the importance of early planning.",
    href: "/news/commissioning-mega-projects",
  },
  {
    id: "8",
    imageSrc: "https://picsum.photos/seed/chaad-news-8/800/500",
    imageAlt: "Tank services",
    date: "Sep 3, 2024",
    title: "API 653 Inspections: When and How Often",
    description:
      "A practical guide to tank inspection intervals and what to expect during an API 653 assessment.",
    href: "/news/api-653-inspections",
  },
  {
    id: "9",
    imageSrc: "https://picsum.photos/seed/chaad-news-9/800/500",
    imageAlt: "Company update",
    date: "Aug 28, 2024",
    title: "CHAAD Energy Expands Services in West Africa",
    description:
      "Our latest office and project footprint updates to better serve clients across the region.",
    href: "/news/chaad-expands-west-africa",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <motion.article
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full"
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
      <div className="p-5 flex flex-col flex-1 text-left space-y-[12px]">
        <p className="text-xs text-[#777777] font-medium ">{item.date}</p>
        <h3 className="text-lg font-bold text-[#333333] leading-tight">
          {item.title}
        </h3>
        <p className="text-sm text-[#777777] font-normal leading-relaxed flex-1">
          {item.description}
        </p>
        <Link
          href={item.href}
          className="inline-flex items-center gap-1.5 text-[#485AAC] font-bold text-sm hover:text-[#3d4d94] transition-colors w-fit"
        >
          Read more
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </div>
    </motion.article>
  );
}

export function LatestNewsSection({
  items = NEWS_ITEMS,
}: { items?: NewsItem[] } = {}) {
  return (
    <section className="py-16 md:py-24 [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-10 md:mb-12 space-y-[20px]"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={{
            initial: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333]"
            variants={fadeUp}
            transition={t}
          >
            Latest News
          </motion.h2>
          <motion.p
            className="text-sm md:text-lg text-[#777777] font-normal leading-relaxed max-w-2xl"
            variants={fadeUp}
            transition={t}
          >
            Stay updated with our latest company news, breakthrough technology
            trends, and deep industry insights.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={{
            initial: {},
            visible: {
              transition: { staggerChildren: 0.06, delayChildren: 0.05 },
            },
          }}
        >
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
