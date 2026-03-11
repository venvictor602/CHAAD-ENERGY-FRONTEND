"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Home, ArrowLeft, FileQuestion } from "lucide-react";

import { SEO } from "@/components/seo";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Button } from "@/components/ui/button";

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved. Return to CHAAD Energy homepage or explore our services and projects."
        noIndex
      />
      <Navbar />
      <main className="min-h-screen pt-[72px] flex flex-col [font-family:var(--font-inter)]">
        <section className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
          <div className="max-w-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#28325F]/10 text-[#28325F] mb-8"
            >
              <FileQuestion className="w-10 h-10" strokeWidth={1.5} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-sm font-semibold text-[#28325F] uppercase tracking-wider mb-3"
            >
              Error 404
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4"
            >
              Page not found
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-[#64748B] leading-relaxed mb-10"
            >
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Return home or use the links below to find what you need.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-[#28325F] hover:bg-[#1e2550] text-white font-semibold rounded-xl"
                asChild
              >
                <Link href="/" className="inline-flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Back to home
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#28325F] text-[#28325F] hover:bg-[#28325F]/5 font-semibold rounded-xl"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go back
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-12 pt-8 border-t border-[#E5E7EB]"
            >
              <p className="text-sm text-[#94A3B8] mb-4">Quick links</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/services"
                  className="text-[#485AAC] font-medium hover:underline"
                >
                  Services
                </Link>
                <Link
                  href="/projects"
                  className="text-[#485AAC] font-medium hover:underline"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="text-[#485AAC] font-medium hover:underline"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-[#485AAC] font-medium hover:underline"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
