"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/services/contact";
import { getServices } from "@/services/services";

const contactSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  address: z.string().min(1, "Address is required"),
  company_name: z.string().min(1, "Company name is required"),
  subject: z.string().min(1, "Subject is required"),
  services: z
    .array(z.number())
    .min(1, "Select at least one service")
    .optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};
const viewport = { once: true, margin: "-60px" };
const t = { duration: 0.45 };

const inputClass =
  "w-full h-11 rounded-lg border border-black/10 bg-white px-4 text-sm text-[#1A1A1A] placeholder:text-[#94A3B8] outline-none focus:border-[#485AAC] focus:ring-2 focus:ring-[#485AAC]/20 disabled:opacity-60 disabled:cursor-not-allowed";
const inputErrorClass =
  "border-red-500 focus:border-red-500 focus:ring-red-500/20";
const labelClass =
  "text-[10px] md:text-sm font-semibold tracking-widest text-[#1A1A1A]/70";

export function ContactQuoteSection({
  imageSrc = "/assets/Contact.png",
}: {
  imageSrc?: string;
}) {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [serviceOptions, setServiceOptions] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    setServicesLoading(true);
    getServices(1)
      .then((res) => {
        const raw =
          res.data?.results ?? (Array.isArray(res.data) ? res.data : []);
        const list = Array.isArray(raw) ? raw : [];
        const active = list.filter(
          (s: { is_active?: boolean }) => s.is_active !== false,
        );
        setServiceOptions(
          active.map((s: { id: number; name?: string }) => ({
            value: s.id,
            label: s.name?.trim() || `Service ${s.id}`,
          })),
        );
      })
      .catch(() => setServiceOptions([]))
      .finally(() => setServicesLoading(false));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      full_name: "",
      email: "",
      address: "",
      company_name: "",
      subject: "",
      services: [],
      message: "",
    },
  });

  const servicesValue = watch("services");
  const selectedServiceId =
    servicesValue && servicesValue.length > 0 ? String(servicesValue[0]) : "";

  useEffect(() => {
    const serviceIdParam = router.query?.service;
    if (!serviceIdParam || serviceOptions.length === 0) return;
    const id =
      typeof serviceIdParam === "string" ? parseInt(serviceIdParam, 10) : NaN;
    if (isNaN(id)) return;
    const exists = serviceOptions.some((o) => o.value === id);
    if (exists) setValue("services", [id]);
  }, [router.query?.service, serviceOptions, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setApiError(null);
    setSuccessMessage(null);
    try {
      await submitContact({
        ...data,
        services: data.services ?? [],
      });
      setSuccessMessage("Thank you. Your request has been sent successfully.");
      reset();
    } catch (err: unknown) {
      const ax = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      const message =
        ax.response?.data?.error ||
        (ax.message && typeof ax.message === "string" ? ax.message : null) ||
        "Something went wrong. Please try again.";
      setApiError(message);
    }
  };

  const isSubmitDisabled = !isValid || isSubmitting;

  return (
    <section
      className="relative z-10 bg-[#F9FAFB] py-16 md:py-24 [font-family:var(--font-inter)]"
      id="consultation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="space-y-10 md:space-y-32"
          initial="initial"
          whileInView="visible"
          viewport={viewport}
          variants={{
            initial: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div
            className="space-y-6 lg:space-y-10 "
            variants={fadeUp}
            transition={t}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
              Office Locations
            </h2>

            <div className="grid gap-6 md:grid-cols-4 items-start">
              <div className="flex gap-4 col-span-2">
                <div
                  className="w-1 bg-[#485AAC] rounded-full shrink-0"
                  aria-hidden
                />
                <div className="space-y-1">
                  <p className="text-sm md:text-base font-bold text-[#333333]">
                    Port Harcourt
                  </p>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-normal leading-relaxed max-w-md">
                    No 3 Sweet Apple Close, Km 17, PHC/Aba Expressway, Off
                    Boskel Road, Port Harcourt, Rivers 500102, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="w-1 bg-[#485AAC] rounded-full shrink-0"
                  aria-hidden
                />
                <div className="space-y-1">
                  <p className="text-sm md:text-base font-bold text-[#333333]">
                    Call Us
                  </p>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-normal leading-relaxed">
                    +1 (555) 234-5678
                    <br />
                    Mon–Fri, 8am–6pm
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="w-1 bg-[#485AAC] rounded-full shrink-0"
                  aria-hidden
                />
                <div className="space-y-1">
                  <p className="text-sm md:text-base font-bold text-[#333333]">
                    Email Us
                  </p>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-normal leading-relaxed">
                    hello@chaadng.com
                    <br />
                    Response within 24h
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-stretch"
            variants={fadeUp}
            transition={t}
          >
            <div className="relative z-10 bg-white rounded-2xl border border-black/5 shadow-sm p-6 sm:p-8 isolate">
              <div className="space-y-5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#333333]">
                  Request a Quote
                </h3>

                <form
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  {apiError && (
                    <div
                      className="sm:col-span-2 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"
                      role="alert"
                    >
                      {apiError}
                    </div>
                  )}
                  {successMessage && (
                    <div
                      className="sm:col-span-2 p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-800"
                      role="status"
                    >
                      {successMessage}
                    </div>
                  )}

                  <label className="space-y-2">
                    <span className={labelClass}>FULL NAME</span>
                    <input
                      {...register("full_name")}
                      className={`${inputClass} ${errors.full_name ? inputErrorClass : ""}`}
                      placeholder="Jane Doe"
                      autoComplete="name"
                      aria-invalid={!!errors.full_name}
                      aria-describedby={
                        errors.full_name ? "full_name-error" : undefined
                      }
                    />
                    {errors.full_name && (
                      <p id="full_name-error" className="text-xs text-red-600">
                        {errors.full_name.message}
                      </p>
                    )}
                  </label>

                  <label className="space-y-2">
                    <span className={labelClass}>COMPANY NAME</span>
                    <input
                      {...register("company_name")}
                      className={`${inputClass} ${errors.company_name ? inputErrorClass : ""}`}
                      placeholder="Acme Corp"
                      autoComplete="organization"
                      aria-invalid={!!errors.company_name}
                      aria-describedby={
                        errors.company_name ? "company_name-error" : undefined
                      }
                    />
                    {errors.company_name && (
                      <p
                        id="company_name-error"
                        className="text-xs text-red-600"
                      >
                        {errors.company_name.message}
                      </p>
                    )}
                  </label>

                  <label className="space-y-2">
                    <span className={labelClass}>EMAIL ADDRESS</span>
                    <input
                      {...register("email")}
                      type="email"
                      className={`${inputClass} ${errors.email ? inputErrorClass : ""}`}
                      placeholder="jane@acme.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </label>

                  <label className="space-y-2">
                    <span className={labelClass}>ADDRESS</span>
                    <input
                      {...register("address")}
                      className={`${inputClass} ${errors.address ? inputErrorClass : ""}`}
                      placeholder="City, State, Country"
                      autoComplete="street-address"
                      aria-invalid={!!errors.address}
                      aria-describedby={
                        errors.address ? "address-error" : undefined
                      }
                    />
                    {errors.address && (
                      <p id="address-error" className="text-xs text-red-600">
                        {errors.address.message}
                      </p>
                    )}
                  </label>

                  <label className="space-y-2 sm:col-span-2">
                    <span className={labelClass}>SUBJECT</span>
                    <input
                      {...register("subject")}
                      className={`${inputClass} ${errors.subject ? inputErrorClass : ""}`}
                      placeholder="e.g. Quote for structural assessment"
                      aria-invalid={!!errors.subject}
                      aria-describedby={
                        errors.subject ? "subject-error" : undefined
                      }
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-xs text-red-600">
                        {errors.subject.message}
                      </p>
                    )}
                  </label>

                  <label className="space-y-2">
                    <span className={labelClass}>SERVICE NEEDED</span>
                    <div className="relative">
                      <select
                        className={`${inputClass} appearance-none pr-10 ${errors.services ? inputErrorClass : ""}`}
                        value={
                          selectedServiceId === "" ? "" : selectedServiceId
                        }
                        onChange={(e) => {
                          const v = e.target.value;
                          setValue("services", v === "" ? [] : [Number(v)], {
                            shouldValidate: true,
                          });
                        }}
                        aria-invalid={!!errors.services}
                        aria-describedby={
                          errors.services ? "services-error" : undefined
                        }
                        disabled={isSubmitting || servicesLoading}
                        aria-busy={servicesLoading}
                      >
                        <option value="">
                          {servicesLoading
                            ? "Loading services…"
                            : serviceOptions.length === 0
                              ? "No services available"
                              : "Select a service"}
                        </option>
                        {serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <span
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                        aria-hidden
                      >
                        ▾
                      </span>
                    </div>
                    {errors.services && (
                      <p id="services-error" className="text-xs text-red-600">
                        {errors.services.message}
                      </p>
                    )}
                  </label>

                  <label className="space-y-2 sm:col-span-2">
                    <span className={labelClass}>
                      MESSAGE / PROJECT DETAILS
                    </span>
                    <textarea
                      {...register("message")}
                      className={`w-full min-h-[128px] resize-none rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#94A3B8] outline-none focus:border-[#485AAC] focus:ring-2 focus:ring-[#485AAC]/20 disabled:opacity-60 disabled:cursor-not-allowed ${errors.message ? inputErrorClass : ""}`}
                      placeholder="Tell us about your project goals, location, and timeline..."
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </label>

                  <div className="sm:col-span-2 pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-[#485AAC] hover:bg-[#3d4d94] text-white font-semibold rounded-lg"
                      disabled={isSubmitDisabled}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2
                            className="size-5 animate-spin"
                            aria-hidden
                          />
                          Sending…
                        </>
                      ) : (
                        "Send Request"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-[#EDEFF7] min-h-[340px] sm:min-h-[420px] lg:min-h-full">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url(${imageSrc})` }}
                aria-hidden
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
