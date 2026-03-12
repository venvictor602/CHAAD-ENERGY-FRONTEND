"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COOKIE_NAME = "chaad_cookie_consent";
const COOKIE_FUNCTIONAL = "chaad_cookie_functional";
const COOKIE_OPTIONS = { sameSite: "lax" as const, expires: 365 };

export function CookieConsentDrawer() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [functionalEnabled, setFunctionalEnabled] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const stored = Cookies.get(COOKIE_NAME);
    const func = Cookies.get(COOKIE_FUNCTIONAL);
    const t = setTimeout(() => {
      if (stored !== "accepted" && stored !== "declined") setVisible(true);
      setFunctionalEnabled(func !== "false");
    }, 0);
    return () => clearTimeout(t);
  }, [mounted]);

  useEffect(() => {
    if (!settingsOpen) return;
    const func = Cookies.get(COOKIE_FUNCTIONAL);
    const t = setTimeout(() => setFunctionalEnabled(func !== "false"), 0);
    return () => clearTimeout(t);
  }, [settingsOpen]);

  const accept = () => {
    Cookies.set(COOKIE_NAME, "accepted", COOKIE_OPTIONS);
    Cookies.set(COOKIE_FUNCTIONAL, "true", COOKIE_OPTIONS);
    setVisible(false);
  };

  const decline = () => {
    Cookies.set(COOKIE_NAME, "declined", COOKIE_OPTIONS);
    setVisible(false);
  };

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  const savePreferences = () => {
    Cookies.set(COOKIE_NAME, "accepted", COOKIE_OPTIONS);
    Cookies.set(
      COOKIE_FUNCTIONAL,
      functionalEnabled ? "true" : "false",
      COOKIE_OPTIONS,
    );
    setSettingsOpen(false);
    setVisible(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="cookie-drawer"
          className="fixed inset-0 z-200 flex items-end justify-center pointer-events-none"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            visible: { pointerEvents: "auto" },
            hidden: { pointerEvents: "none" },
          }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            aria-hidden
          />

          <motion.div
            className="relative w-full px-4 pb-6 pt-2"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: 0, opacity: 1 },
              exit: { y: "100%", opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            <div className="w-full bg-white rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.12)] border border-[#E8E8E8] border-b-0 overflow-hidden [font-family:var(--font-inter)]">
              <div className="max-w-7xl mx-auto p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#485AAC]/10 flex items-center justify-center">
                  <Cookie className="h-5 w-5 text-[#485AAC]" aria-hidden />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[#1A1A1A] mb-1">
                    We use cookies
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    We use cookies and similar technologies to help the site
                    work, understand how you use it, and improve your
                    experience. By continuing, you accept our use of cookies.{" "}
                    <Link
                      href="/cookies"
                      className="text-[#485AAC] font-medium hover:underline underline-offset-2"
                    >
                      Cookie policy
                    </Link>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={decline}
                    className="order-2 sm:order-1 text-[#64748B] hover:text-[#1A1A1A]"
                  >
                    Decline
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={openSettings}
                    className="order-3"
                  >
                    Cookie settings
                  </Button>
                  <Button
                    variant="default"
                    size="default"
                    onClick={accept}
                    className="order-1 sm:order-2"
                  >
                    Accept all
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            key="cookie-settings"
            className="fixed inset-0 z-210 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeSettings}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-labelledby="cookie-preferences-title"
              aria-modal="true"
              className="relative w-full max-w-lg rounded-2xl bg-[#28325F] shadow-xl border border-[#485AAC]/30 overflow-hidden [font-family:var(--font-inter)]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h2
                    id="cookie-preferences-title"
                    className="text-xl font-bold text-white"
                  >
                    Cookie Preferences
                  </h2>
                  <button
                    type="button"
                    onClick={closeSettings}
                    className="shrink-0 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-[#485AAC]/30 transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-8">
                  We use cookies to improve your experience on our website. You
                  can customize your cookie preferences below. Please note that
                  blocking some types of cookies may impact your experience.{" "}
                  <Link
                    href="/cookies"
                    className="text-[#DE5943] hover:underline underline-offset-2"
                  >
                    Cookie policy
                  </Link>
                </p>

                <div className="mb-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-white">
                      Necessary Cookies
                    </h3>
                    <span className="shrink-0 px-2.5 py-0.5 rounded-md bg-[#485AAC] text-white text-xs font-medium">
                      Always Active
                    </span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-2">
                    Essential for the website to function properly. These
                    cookies enable core functionality such as security, network
                    management, and accessibility. You cannot opt-out of these
                    cookies.
                  </p>
                  <div className="flex justify-end">
                    <div
                      className="w-11 h-6 rounded-full bg-[#485AAC] flex items-center justify-end pr-1 cursor-not-allowed opacity-90"
                      aria-hidden
                    >
                      <span className="w-4 h-4 rounded-full bg-white shadow" />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-white">
                      Functional Cookies
                    </h3>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={functionalEnabled}
                      onClick={() => setFunctionalEnabled((v) => !v)}
                      className={cn(
                        "shrink-0 w-11 h-6 rounded-full transition-colors flex items-center",
                        functionalEnabled
                          ? "bg-[#485AAC] justify-end pr-1"
                          : "bg-white/20 justify-start pl-1",
                      )}
                    >
                      <span className="w-4 h-4 rounded-full bg-white shadow" />
                    </button>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    These cookies enable the website to provide enhanced
                    functionality and personalization, such as remembering your
                    preferences (e.g. theme selection, language).
                  </p>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    onClick={closeSettings}
                    className="bg-white/10 border-white/50 text-white hover:bg-white/20 hover:text-white hover:border-white/60"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    size="default"
                    onClick={savePreferences}
                    className="bg-[#DE5943] text-white hover:bg-[#c94d39]"
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
