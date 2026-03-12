"use client";

import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";

export function PolicyPageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar solidBackground />
      <main className="pt-[80px] md:pt-[140px] min-h-screen [font-family:var(--font-inter)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-10">
            {title}
          </h1>
          <div className="prose prose-lg max-w-none text-[#333333] space-y-8">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
