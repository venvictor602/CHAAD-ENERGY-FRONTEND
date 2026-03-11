"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/news", label: "News" },
];

export function Navbar({
  className,
  theme = "light",
  solidBackground = false,
}: {
  className?: string;
  theme?: "light" | "dark";
  solidBackground?: boolean;
}) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (theme === "dark" || solidBackground) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [theme, solidBackground]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isDark = theme === "dark" && !solidBackground;
  const showLightText = solidBackground ? false : isDark || !scrolled;
  const useLightBar = solidBackground || (theme === "light" && scrolled);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 transition-colors duration-300",
        isDark && "bg-[#1A1A1A]/50 backdrop-blur-sm",
        useLightBar && "bg-white/95 backdrop-blur-sm shadow-sm",
        className,
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Logo.svg"
          alt="CHAAD Energy"
          className="h-10 w-10 md:h-24 md:w-24 object-contain"
        />
      </Link>

      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => {
          const isActive = router.pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors pb-1 border-b-2 border-transparent",
                  isActive && "border-[#DE5943]",
                  isActive && showLightText && "text-white",
                  isActive && !showLightText && "text-[#28325F]",
                  !isActive &&
                    showLightText &&
                    "text-white/95 hover:text-white",
                  !isActive &&
                    !showLightText &&
                    "text-[#28325F] hover:text-[#1A1A1A]",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden md:block">
        <Button variant="default" size="default" asChild>
          <Link href="#consultation">Request Consultation</Link>
        </Button>
      </div>

      <button
        type="button"
        className={cn(
          "md:hidden p-2 transition-colors rounded-lg",
          showLightText
            ? "text-white hover:text-white/80"
            : "text-[#28325F] hover:text-[#1A1A1A]",
        )}
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-[#1A1A1A]/90 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
              aria-hidden
            />
            <motion.div
              className="fixed top-0 right-0 z-60 w-full max-w-sm h-full bg-[#1A1A1A] shadow-xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex flex-col h-full pt-20 px-6 pb-8">
                <button
                  type="button"
                  className="absolute top-5 right-5 p-2 text-white hover:text-white/80 transition-colors rounded-lg"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>

                <ul className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => {
                    const isActive = router.pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeMobileMenu}
                          className={cn(
                            "text-base font-medium transition-colors",
                            isActive
                              ? "text-[#DE5943]"
                              : "text-white hover:text-[#DE5943]",
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-auto pt-6">
                  <Button
                    variant="default"
                    size="default"
                    className="w-full"
                    asChild
                  >
                    <Link href="#consultation" onClick={closeMobileMenu}>
                      Request Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
