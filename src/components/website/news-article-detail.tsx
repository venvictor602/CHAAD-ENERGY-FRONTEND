"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/website/breadcrumb";
import type { NewsItem } from "@/components/website/latest-news-section";

export type NewsArticle = {
  slug: string;
  date: string;
  title: string;
  subtitle?: string | null;
  featuredImage: string;
  featuredImageAlt: string;
  body: string[];
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

export function NewsArticleDetail({
  article,
  recentReleases,
  breadcrumbItems,
}: {
  article: NewsArticle;
  recentReleases: NewsItem[];
  breadcrumbItems: { label: string; href?: string }[];
}) {
  return (
    <article className="min-h-screen [font-family:var(--font-inter)] space-y-[60px]">
      <div className="border-b border-[#E8E8E8] py-[20px] px-4 lg:px-0">
        <div className="max-w-7xl mx-auto ">
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
      </div>

      <div className="max-w-7xl mx-auto pb-10 px-4 lg:px-0">
        <motion.header
          className="space-y-[60px] mb-[30px]"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={t}
        >
          <p className="text-sm text-[#64748B]">{article.date}</p>
          <h1 className="text-3xl md:text-7xl lg:text-5xl font-bold text-[#333333] leading-tight">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-lg md:text-xl font-bold text-[#333333]">
              {article.subtitle}
            </p>
          )}
        </motion.header>

        <motion.div
          className="relative w-full aspect-16/10 rounded-xl overflow-hidden "
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={t}
        >
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
        </motion.div>

        <motion.div
          className="prose prose-lg max-w-none text-[#333333] leading-relaxed space-y-6"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={t}
        >
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </motion.div>
      </div>

      {recentReleases.length > 0 && (
        <section className="bg-[#F8F9FA] py-16 md:py-24">
          <div className="max-w-7xl mx-auto space-y-[30px] px-4 lg:px-0">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-[#1A1A1A]"
              initial="initial"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
              transition={t}
            >
              Recent Release
            </motion.h2>
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
              {recentReleases.map((item) => (
                <motion.article
                  key={item.id}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
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
                  <div className="p-5 flex flex-col flex-1 text-left">
                    <p className="text-xs text-[#777777] font-medium">
                      {item.date}
                    </p>
                    <h3 className="text-lg font-bold text-[#333333] leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#777777] font-normal leading-relaxed flex-1">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-[#485AAC] font-semibold text-sm hover:text-[#3d4d94] transition-colors w-fit"
                    >
                      Read more
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </article>
  );
}
