"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  X,
  Youtube,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { subscribeContact } from "@/services/contact";

const subscribeSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

function messageOnly(str: string): string {
  const trimmed = str.trim();
  const withoutField = trimmed.replace(
    /^(email|subject|message|address)\s*:\s*/i,
    "",
  );
  return withoutField.trim() || trimmed;
}

function getSubscribeErrorMessage(err: unknown): string {
  const ax = err as {
    response?: {
      data?: {
        error?: string;
        originalError?: { email?: string[]; [key: string]: unknown };
      };
    };
    message?: string;
  };
  const data = ax.response?.data;
  if (!data) {
    return typeof ax.message === "string"
      ? messageOnly(ax.message)
      : "Subscription failed. Please try again.";
  }
  const orig = data.originalError as Record<string, unknown> | undefined;
  if (orig?.email && Array.isArray(orig.email) && orig.email[0]) {
    return messageOnly(String(orig.email[0]));
  }
  if (orig && typeof orig === "object") {
    const first = Object.values(orig).find(
      (v) => Array.isArray(v) && v[0] != null,
    );
    if (first && Array.isArray(first) && typeof first[0] === "string") {
      return messageOnly(String(first[0]));
    }
  }
  const errStr = data.error;
  if (typeof errStr === "string") {
    try {
      const parsed = JSON.parse(errStr) as { email?: string[] };
      if (parsed?.email?.[0]) return messageOnly(parsed.email[0]);
    } catch {
      if (errStr.length < 200) return messageOnly(errStr);
    }
  }
  return typeof ax.message === "string"
    ? messageOnly(ax.message)
    : "Subscription failed. Please try again.";
}

const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "News", href: "/news" },
    ],
  },
  // {
  //   title: "Blog",
  //   links: [
  //     { label: "Case Studies", href: "#case-studies" },
  //     { label: "Guides", href: "#guides" },
  //     { label: "Testimonials", href: "#testimonials" },
  //     { label: "Support", href: "#support" },
  //   ],
  // },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Compliance", href: "/compliance" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Connect", href: "/contact" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "Twitter", href: "#twitter" },
      { label: "Facebook", href: "#facebook" },
      { label: "Instagram", href: "#instagram" },
      { label: "YouTube", href: "#youtube" },
      { label: "Get in touch", href: "#get-in-touch" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "1-800-BUILD-01", href: "tel:18002845301" },
      { label: "Schedule a call", href: "/contact" },
      { label: "Request a quote", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: SubscribeFormData) => {
    try {
      await subscribeContact(data.email);
      toast.success("Thanks for subscribing.");
      reset();
    } catch (err: unknown) {
      toast.error(getSubscribeErrorMessage(err));
    }
  };

  const isSubmitDisabled = !isValid || isSubmitting;

  return (
    <footer className="bg-[#28325F] text-white">
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 md:pt-16 pb-8"
        initial="initial"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          initial: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10"
          variants={fadeUp}
          transition={{ duration: 0.4 }}
        >
          <div className="flex-1">
            <p className="text-sm font-semibold">Stay in the loop</p>
            <p className="text-xs text-white mt-1">
              Get updates on new projects and industry insights
            </p>
          </div>

          <form
            className="w-full lg:w-auto"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="relative w-full sm:w-[320px] space-y-1">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Your email address"
                  className="w-full h-11 rounded-md bg-transparent border border-white/40 px-4 text-sm placeholder:text-white/55 outline-none focus:border-white/70 disabled:opacity-60 disabled:cursor-not-allowed aria-invalid:border-red-400"
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "footer-email-error" : undefined
                  }
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p id="footer-email-error" className="text-xs text-red-300">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="default"
                size="default"
                className="h-11 min-w-[120px] cursor-pointer"
                disabled={isSubmitDisabled}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
            <p className="text-[10px] sm:text-[12px] font-normal text-white mt-2 sm:text-right">
              By subscribing you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
            </p>
          </form>
        </motion.div>

        <motion.div
          className="h-px bg-white/15 my-10 md:my-12"
          variants={fadeUp}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          className="grid gap-10 lg:gap-12 lg:grid-cols-[auto_1fr]"
          variants={fadeUp}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Logo.svg"
                alt="CHAAD Energy"
                className="w-11 h-11 object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title} className="space-y-4">
                <p className="text-xs font-semibold text-white/90">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-xs text-white/70 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="h-px bg-white/15 my-10 md:my-12"
          variants={fadeUp}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          variants={fadeUp}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/70">
            <span className="text-white/60">
              © 2025 CHAAD. All rights reserved.
            </span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>

          <div className="flex items-center gap-4 text-white/85">
            <Link
              href="#facebook"
              aria-label="Facebook"
              className="hover:text-white transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </Link>
            <Link
              href="#instagram"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="#x"
              aria-label="X"
              className="hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </Link>
            <Link
              href="#linkedin"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href="#youtube"
              aria-label="YouTube"
              className="hover:text-white transition-colors"
            >
              <Youtube className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
