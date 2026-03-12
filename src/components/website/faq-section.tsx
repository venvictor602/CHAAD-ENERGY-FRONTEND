"use client";

import { useId, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Loader2, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFaqs } from "@/services/blog";
import type { FaqItem as ApiFaqItem } from "@/types/app/response";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

type FaqItem = {
  question: string;
  answer: string;
};

function apiFaqToItem(faq: ApiFaqItem): FaqItem {
  return { question: faq.question, answer: faq.answer };
}

export function FaqSection() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFaqs(1)
      .then((res) => {
        const list = res.data?.results ?? [];
        const active = list.filter((f) => f.is_active !== false);
        setFaqs(active.map(apiFaqToItem));
      })
      .catch(() => setFaqs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 rounded-[28px] py-14 md:py-16">
        <motion.h2
          className="text-center text-3xl md:text-4xl font-extrabold text-[#1A1A1A]"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={t}
        >
          Frequently Ask Questions
        </motion.h2>

        {loading ? (
          <div className="mt-10 md:mt-12 flex flex-col items-center justify-center gap-4 min-h-[200px]">
            <Loader2
              className="h-10 w-10 animate-spin text-[#485AAC]"
              aria-hidden
            />
            <p className="text-sm text-[#64748B]">Loading FAQs…</p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="mt-10 md:mt-12 flex flex-col items-center justify-center gap-4 min-h-[200px] text-center">
            <HelpCircle className="h-14 w-14 text-[#94A3B8]" aria-hidden />
            <p className="text-[#64748B] font-medium">No FAQs yet.</p>
            <p className="text-sm text-[#94A3B8]">Check back later.</p>
          </div>
        ) : (
          <motion.div
            className="mt-10 md:mt-12 max-w-3xl mx-auto space-y-6"
            initial="initial"
            whileInView="visible"
            viewport={viewport}
            variants={{
              initial: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const buttonId = `${baseId}-btn-${idx}`;
              const panelId = `${baseId}-panel-${idx}`;

              return (
                <motion.div
                  key={`${baseId}-faq-${idx}`}
                  className="bg-white rounded-xl shadow-[0_14px_40px_rgba(15,23,42,0.10)] border border-black/5 overflow-hidden"
                  variants={fadeUp}
                  transition={t}
                >
                  <button
                    id={buttonId}
                    type="button"
                    className="w-full flex items-center gap-5 px-6 md:px-8 py-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenIndex((prev) => (prev === idx ? -1 : idx))
                    }
                  >
                    <span className="shrink-0 w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#1A1A1A]">
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                    <span className="font-bold text-base md:text-lg text-[#2B2B2B]">
                      {faq.question}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      "px-6 md:px-8 pb-6 md:pb-7",
                      isOpen ? "block" : "hidden",
                    )}
                  >
                    <p className="text-[#606060] text-sm md:text-base leading-relaxed max-w-2xl pl-[60px]">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
