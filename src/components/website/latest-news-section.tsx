"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Newspaper } from "lucide-react";
import { getPosts } from "@/services/blog";
import type { BlogPostItem } from "@/types/app/response";
import { cloudinaryImages } from "@/lib/cloudinary-images";
import { slugFromTitle } from "@/lib/utils";

export type NewsItem = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
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

function formatNewsDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function blogPostToNewsItem(post: BlogPostItem): NewsItem {
  const dateStr = formatNewsDate(post.created_at);
  const desc = post.content_paragraph1?.slice(0, 160) || post.title || "";
  return {
    id: String(post.id),
    imageSrc: post.image?.trim() || cloudinaryImages.default,
    imageAlt: post.title,
    date: dateStr,
    title: post.title,
    description: desc + (desc.length >= 160 ? "…" : ""),
    href: `/news/${post.id}-${slugFromTitle(post.slug || post.title)}`,
  };
}

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
  items: itemsProp,
}: { items?: NewsItem[] } = {}) {
  const [items, setItems] = useState<NewsItem[]>(itemsProp ?? []);
  const [loading, setLoading] = useState(!itemsProp);

  useEffect(() => {
    if (itemsProp) return;
    getPosts(1)
      .then((res) => {
        const list = res.data?.results ?? [];
        setItems(list.map(blogPostToNewsItem));
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [itemsProp]);

  if (loading) {
    return (
      <section className="py-16 md:py-24 [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center gap-4 min-h-[280px]">
          <Loader2
            className="h-10 w-10 animate-spin text-[#485AAC]"
            aria-hidden
          />
          <p className="text-sm text-[#777777]">Loading news…</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-16 md:py-24 [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-4"
            initial="initial"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={t}
          >
            Latest News
          </motion.h2>
          <motion.p
            className="text-sm md:text-lg text-[#777777] font-normal leading-relaxed max-w-2xl mb-12"
            variants={fadeUp}
            transition={t}
          >
            Stay updated with our latest company news, breakthrough technology
            trends, and deep industry insights.
          </motion.p>
          <div className="flex flex-col items-center justify-center gap-4 min-h-[240px] text-center py-12">
            <Newspaper className="h-14 w-14 text-[#94A3B8]" aria-hidden />
            <p className="text-[#64748B] font-medium">No news yet.</p>
            <p className="text-sm text-[#94A3B8]">
              Check back later for updates.
            </p>
          </div>
        </div>
      </section>
    );
  }

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
