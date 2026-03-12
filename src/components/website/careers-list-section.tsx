"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Loader2 } from "lucide-react";
import { getCareers } from "@/services/careers";
import type { CareerItem } from "@/types/app/response";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-40px" };
const t = { duration: 0.4 };

function formatDeadline(deadline: string) {
  if (!deadline) return null;
  try {
    const d = new Date(deadline);
    return d.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return deadline;
  }
}

function CareerCard({ job }: { job: CareerItem }) {
  const deadlineStr = formatDeadline(job.deadline);
  return (
    <motion.article
      className="group flex flex-col bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      variants={fadeUp}
      transition={t}
    >
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="space-y-3">
          <span className="inline-block w-fit px-2 py-1 rounded bg-[#485AAC1A] text-[#485AAC] text-xs font-semibold tracking-wide">
            {job.department || "General"}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-[#333333] leading-tight">
            {job.title}
          </h3>
          {job.location && (
            <p className="text-sm text-[#64748B]">{job.location}</p>
          )}
          <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3">
            {job.description}
          </p>
          {deadlineStr && (
            <p className="text-xs text-[#94A3B8]">Apply by {deadlineStr}</p>
          )}
        </div>
        <Link
          href={`/careers/${job.id}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[#485AAC] font-semibold text-sm hover:text-[#3d4d94] transition-colors w-fit"
        >
          View & Apply
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </div>
    </motion.article>
  );
}

export function CareersListSection() {
  const [jobs, setJobs] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCareers(1)
      .then((res) => {
        setJobs(res.data.results ?? []);
      })
      .catch(() => {
        setError("Unable to load openings. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center gap-4 min-h-[280px]">
          <Loader2
            className="h-10 w-10 animate-spin text-[#485AAC]"
            aria-hidden
          />
          <p className="text-sm text-[#64748B]">Loading openings…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[#64748B]">{error}</p>
        </div>
      </section>
    );
  }

  if (jobs.length === 0) {
    return (
      <section className="py-16 md:py-24 [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center gap-4 min-h-[280px] text-center">
          <Briefcase className="h-12 w-12 text-[#94A3B8]" aria-hidden />
          <p className="text-[#64748B]">
            No open positions at the moment. Check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
          {jobs.map((job) => (
            <CareerCard key={job.id} job={job} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
