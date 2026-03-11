"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, X, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";

const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/contact" },
      { label: "News", href: "/news" },
    ],
  },
  {
    title: "Blog",
    links: [
      { label: "Case Studies", href: "#case-studies" },
      { label: "Guides", href: "#guides" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Support", href: "#support" },
      { label: "Legal", href: "#legal" },
    ],
  },
  {
    title: "Privacy",
    links: [
      { label: "Terms", href: "#terms" },
      { label: "Cookies", href: "#cookies" },
      { label: "Compliance", href: "#compliance" },
      { label: "Accessibility", href: "#accessibility" },
      { label: "Connect", href: "#connect" },
    ],
  },
  {
    title: "LinkedIn",
    links: [
      { label: "Twitter", href: "#twitter" },
      { label: "Facebook", href: "#facebook" },
      { label: "Instagram", href: "#instagram" },
      { label: "YouTube", href: "#youtube" },
      { label: "Get in touch", href: "#get-in-touch" },
    ],
  },
  {
    title: "hello@chaad.com",
    links: [
      { label: "1-800-BUILD-01", href: "tel:18002845301" },
      { label: "Schedule a call", href: "#schedule" },
      { label: "Request a quote", href: "#consultation" },
      { label: "© 2025 CHAAD. All rights reserved.", href: "#copyright" },
      { label: "Privacy Policy", href: "#privacy-policy" },
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
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
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="relative w-full sm:w-[320px]">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full h-11 rounded-md bg-transparent border border-white/40 px-4 text-sm placeholder:text-white/55 outline-none focus:border-white/70"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="default"
                className="h-11"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-[10px] sm:text-[12px] font-normal text-white mt-2 sm:text-right">
              By subscribing you agree to our{" "}
              <Link href="#privacy" className="underline underline-offset-2">
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
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
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/70">
            <Link href="#tos" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="#cookie-settings"
              className="hover:text-white transition-colors"
            >
              Cookies Settings
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
