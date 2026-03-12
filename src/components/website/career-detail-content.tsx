"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, MapPin, Calendar, FileText } from "lucide-react";
import { SkeletonDetailPage } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/website/breadcrumb";
import { getCareer, applyForCareer } from "@/services/careers";
import type { CareerItem } from "@/types/app/response";

const applySchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone_number: z.string().min(1, "Phone is required"),
  cover_letter_text: z.string(),
  resume: z
    .any()
    .refine(
      (val) =>
        typeof globalThis.FileList !== "undefined" &&
        val instanceof globalThis.FileList &&
        val.length > 0,
      "Resume is required",
    ),
});
type ApplyFormData = z.infer<typeof applySchema>;

const inputClass =
  "w-full h-11 rounded-lg border border-black/10 bg-white px-4 text-sm text-[#1A1A1A] placeholder:text-[#94A3B8] outline-none focus:border-[#485AAC] focus:ring-2 focus:ring-[#485AAC]/20 disabled:opacity-60";
const inputErrorClass =
  "border-red-500 focus:border-red-500 focus:ring-red-500/20";
const labelClass =
  "text-[10px] md:text-sm font-semibold tracking-widest text-[#1A1A1A]/70";

function formatDeadline(deadline: string) {
  if (!deadline) return null;
  try {
    const d = new Date(deadline);
    return d.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return deadline;
  }
}

export function CareerDetailContent({ jobId }: { jobId: number }) {
  const [job, setJob] = useState<CareerItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
    mode: "onChange",
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      cover_letter_text: "",
    },
  });

  useEffect(() => {
    getCareer(jobId)
      .then((res) => setJob(res.data))
      .catch(() => setError("Could not load this job."))
      .finally(() => setLoading(false));
  }, [jobId]);

  const onSubmit = async (data: ApplyFormData) => {
    try {
      const file = data.resume?.[0];
      let resumeBase64 = "";
      if (file) {
        resumeBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string) ?? "");
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
      await applyForCareer(jobId, {
        full_name: data.full_name,
        email: data.email,
        phone_number: data.phone_number,
        resume: resumeBase64,
        cover_letter_text: data.cover_letter_text || "",
      });
      toast.success("Application submitted successfully.");
      reset();
    } catch (err: unknown) {
      const ax = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      const msg =
        ax.response?.data?.error ??
        (typeof ax.message === "string" ? ax.message : null) ??
        "Application failed. Please try again.";
      toast.error(msg);
    }
  };

  if (loading) {
    return (
      <main className="pt-[80px] md:pt-[140px] min-h-screen bg-[#F9FAFB] [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16">
          <div className="h-5 w-48 mb-8 bg-[#E5E7EB] animate-pulse rounded" />
          <SkeletonDetailPage />
        </div>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="pt-[80px] md:pt-[140px] min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-[#64748B]">{error ?? "Job not found."}</p>
        <Link
          href="/careers"
          className="text-[#485AAC] font-semibold hover:underline"
        >
          Back to Careers
        </Link>
      </main>
    );
  }

  const deadlineStr = formatDeadline(job.deadline);

  return (
    <main className="pt-[80px] md:pt-[140px] min-h-screen bg-[#F9FAFB] [font-family:var(--font-inter)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Careers", href: "/careers" },
              { label: job.title, href: undefined },
            ]}
          />
        </div>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-3 gap-10 lg:gap-12"
        >
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="inline-block px-2 py-1 rounded bg-[#485AAC1A] text-[#485AAC] text-xs font-semibold tracking-wide mb-3">
                {job.department || "General"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#333333]">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-[#64748B]">
                {job.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {job.location}
                  </span>
                )}
                {deadlineStr && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 shrink-0" />
                    Apply by {deadlineStr}
                  </span>
                )}
              </div>
            </div>

            {job.description && (
              <section>
                <h2 className="text-lg font-bold text-[#333333] mb-2">
                  Description
                </h2>
                <div className="prose prose-sm text-[#64748B] max-w-none whitespace-pre-wrap">
                  {job.description}
                </div>
              </section>
            )}
            {!job.description &&
              !job.requirements &&
              !job.responsibilities &&
              !job.benefits &&
              !job.salary_range && (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center min-h-[200px] bg-[#F8F9FA] rounded-xl">
                  <FileText className="h-14 w-14 text-[#94A3B8]" aria-hidden />
                  <p className="text-[#64748B] font-medium">
                    No additional details available yet.
                  </p>
                  <p className="text-sm text-[#94A3B8]">
                    Check back later or apply to learn more.
                  </p>
                </div>
              )}
            {job.requirements && (
              <section>
                <h2 className="text-lg font-bold text-[#333333] mb-2">
                  Requirements
                </h2>
                <div className="prose prose-sm text-[#64748B] max-w-none whitespace-pre-wrap">
                  {job.requirements}
                </div>
              </section>
            )}
            {job.responsibilities && (
              <section>
                <h2 className="text-lg font-bold text-[#333333] mb-2">
                  Responsibilities
                </h2>
                <div className="prose prose-sm text-[#64748B] max-w-none whitespace-pre-wrap">
                  {job.responsibilities}
                </div>
              </section>
            )}
            {job.benefits && (
              <section>
                <h2 className="text-lg font-bold text-[#333333] mb-2">
                  Benefits
                </h2>
                <div className="prose prose-sm text-[#64748B] max-w-none whitespace-pre-wrap">
                  {job.benefits}
                </div>
              </section>
            )}
            {job.salary_range && (
              <section>
                <h2 className="text-lg font-bold text-[#333333] mb-2">
                  Salary range
                </h2>
                <p className="text-[#64748B]">{job.salary_range}</p>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 sticky top-24"
            >
              <h3 className="text-xl font-bold text-[#333333] mb-6">
                Apply for this role
              </h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <label className="block space-y-2">
                  <span className={labelClass}>FULL NAME</span>
                  <input
                    {...register("full_name")}
                    className={`${inputClass} ${errors.full_name ? inputErrorClass : ""}`}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    disabled={isSubmitting}
                  />
                  {errors.full_name && (
                    <p className="text-xs text-red-600">
                      {errors.full_name.message}
                    </p>
                  )}
                </label>
                <label className="block space-y-2">
                  <span className={labelClass}>EMAIL</span>
                  <input
                    {...register("email")}
                    type="email"
                    className={`${inputClass} ${errors.email ? inputErrorClass : ""}`}
                    placeholder="jane@example.com"
                    autoComplete="email"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </label>
                <label className="block space-y-2">
                  <span className={labelClass}>PHONE</span>
                  <input
                    {...register("phone_number")}
                    type="tel"
                    className={`${inputClass} ${errors.phone_number ? inputErrorClass : ""}`}
                    placeholder="+234 800 000 0000"
                    autoComplete="tel"
                    disabled={isSubmitting}
                  />
                  {errors.phone_number && (
                    <p className="text-xs text-red-600">
                      {errors.phone_number.message}
                    </p>
                  )}
                </label>
                <label className="block space-y-2">
                  <span className={labelClass}>RESUME (PDF or DOC)</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className={`${inputClass} py-2 file:mr-2 file:rounded file:border-0 file:bg-[#485AAC] file:px-3 file:py-1 file:text-white file:text-sm ${errors.resume ? inputErrorClass : ""}`}
                    {...register("resume")}
                    disabled={isSubmitting}
                  />
                  {errors.resume && (
                    <p className="text-xs text-red-600">
                      {String(errors.resume.message ?? "Resume is required")}
                    </p>
                  )}
                </label>
                <label className="block space-y-2">
                  <span className={labelClass}>COVER LETTER (optional)</span>
                  <textarea
                    {...register("cover_letter_text")}
                    className={`${inputClass} min-h-[120px] resize-y py-3 ${errors.cover_letter_text ? inputErrorClass : ""}`}
                    placeholder="Tell us why you're a good fit..."
                    disabled={isSubmitting}
                  />
                </label>
                <Button
                  type="submit"
                  className="w-full bg-[#485AAC] hover:bg-[#3d4d94] text-white"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      Submitting…
                    </>
                  ) : (
                    "Submit application"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.article>
      </div>
    </main>
  );
}
