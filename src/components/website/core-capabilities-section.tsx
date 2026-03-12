"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Loader2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServices } from "@/services/services";
import type { ServiceItem } from "@/types/app/response";
import { slugFromTitle } from "@/lib/utils";

const DEFAULT_DESCRIPTION = "Comprehensive engineering and technical services.";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

export function CoreCapabilitiesSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices(1)
      .then((res) => {
        const d = res?.data;
        const list = Array.isArray(d)
          ? d
          : d &&
              typeof d === "object" &&
              "results" in d &&
              Array.isArray((d as { results: unknown }).results)
            ? (d as { results: ServiceItem[] }).results
            : d &&
                typeof d === "object" &&
                "data" in d &&
                Array.isArray((d as { data: unknown }).data)
              ? (d as { data: ServiceItem[] }).data
              : [];
        setServices(list.filter((s) => s?.is_active !== false));
      })
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-white py-16 md:py-24 [font-family:var(--font-inter)]">
      <div className="max-w-[1072px] mx-auto px-6 lg:px-12">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] leading-tight mb-10 md:mb-16 text-center"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={t}
        >
          Core Capabilities
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 items-center place-items-center"
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
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2
                className="h-10 w-10 animate-spin text-[#485AAC]"
                aria-hidden
              />
            </div>
          ) : services.length === 0 ? (
            <div className="col-span-full flex flex-col items-center gap-4 py-12 text-center">
              <Briefcase className="h-14 w-14 text-[#94A3B8]" aria-hidden />
              <p className="text-[#64748B] font-medium">
                No services available yet.
              </p>
            </div>
          ) : (
            services.map((item) => (
              <Link
                key={item.id}
                href={`/services/${item.id}-${slugFromTitle(item.name)}`}
              >
                <article className="w-full sm:max-w-[336px] min-h-0 sm:min-h-[346.5px] rounded-[8px] sm:rounded-[12px] bg-[#485AAC] space-y-4 sm:space-y-[24px] px-5 py-6 sm:p-6 md:p-8 text-white flex flex-col cursor-pointer hover:bg-[#3d4d94] transition-colors">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-[56px] md:h-[56px] rounded-[8px] bg-[#FCEEEC33] flex items-center justify-center shrink-0">
                    <Briefcase className="h-5 w-5 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="space-y-3 sm:space-y-[16px] min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#F1F5F9] leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#EDEFF7] leading-[1.6] line-clamp-4">
                      {item.description?.slice(0, 160) || DEFAULT_DESCRIPTION}
                      {(item.description?.length ?? 0) > 160 ? "…" : ""}
                    </p>
                  </div>
                </article>
              </Link>
            ))
          )}

          <motion.article
            className="w-full sm:max-w-[336px] min-h-0 sm:min-h-[346.5px] rounded-[8px] sm:rounded-[12px] bg-[#EDEFF7] border-2 border-dashed border-[#8490C7] px-5 py-6 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4 sm:gap-5"
            variants={fadeUp}
            transition={t}
          >
            <div className="w-12 h-12 rounded-full border border-[#ABB3D9] flex items-center justify-center shrink-0">
              <Plus className="h-6 w-6 text-[#485AAC]" strokeWidth={2.5} />
            </div>
            <div className="space-y-2 sm:space-y-[8px] min-w-0">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#333333] leading-tight">
                Need a custom solution?
              </h3>
              <p className="text-sm text-[#94A3B8] leading-[1.6]">
                We offer specialized consulting for unique engineering
                challenges across global industries.
              </p>
            </div>
            <Button
              variant="outline"
              size="default"
              asChild
              className="bg-transparent border max-w-[190px] w-full border-[#485AAC] text-[#485AAC]"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
