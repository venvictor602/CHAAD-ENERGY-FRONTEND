"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import Image from "next/image";
import { SkeletonDetailPage } from "@/components/ui/skeleton";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Breadcrumb } from "@/components/website/breadcrumb";
import { getService } from "@/services/services";
import type { ServiceItem } from "@/types/app/response";

import { cloudinaryImages } from "@/lib/cloudinary-images";

const DEFAULT_IMG = cloudinaryImages.default;

export function ServiceDetailByApi({ id }: { id: number }) {
  const [service, setService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getService(id)
      .then((res) => setService(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar solidBackground />
        <main className="pt-[80px] md:pt-[140px] min-h-screen bg-white [font-family:var(--font-inter)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16">
            <div className="h-5 w-48 mb-8 bg-[#E5E7EB] animate-pulse rounded" />
            <SkeletonDetailPage />
          </div>
        </main>
      </>
    );
  }

  if (error || !service) {
    return (
      <>
        <Navbar solidBackground />
        <main className="pt-[80px] md:pt-[140px] min-h-screen flex flex-col items-center justify-center gap-4 px-6">
          <p className="text-[#64748B]">Service not found.</p>
          <Link
            href="/services"
            className="text-[#485AAC] font-semibold hover:underline"
          >
            Back to Services
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const imgSrc = service.image?.trim() || DEFAULT_IMG;
  const keyItems = service.key_features ?? [];
  const benefitItems = service.benefits ?? [];

  return (
    <>
      <Navbar solidBackground />
      <main className="pt-[80px] md:pt-[140px] min-h-screen bg-white [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: "Services", href: "/services" },
                { label: service.name, href: undefined },
              ]}
            />
          </div>

          <article>
            <h1 className="text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-8">
              {service.name}
            </h1>

            {imgSrc && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-[#F1F5F9]">
                <Image
                  src={imgSrc}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  unoptimized
                />
              </div>
            )}

            {service.description?.trim() ? (
              <div className="prose prose-lg max-w-none text-[#333333] leading-relaxed mb-10 whitespace-pre-wrap">
                {service.description}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center min-h-[200px] bg-[#F8F9FA] rounded-xl mb-10">
                <FileText className="h-14 w-14 text-[#94A3B8]" aria-hidden />
                <p className="text-[#64748B] font-medium">
                  No description available yet.
                </p>
                <p className="text-sm text-[#94A3B8]">
                  Check back later for more details.
                </p>
              </div>
            )}

            {keyItems.length > 0 && (
              <section className="mb-10">
                <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
                  Key features
                </h2>
                <ul className="space-y-4">
                  {keyItems.map((item) => (
                    <li key={item.id} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-8 border-l-[#28325F] shrink-0"
                        aria-hidden
                      />
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-sm text-[#606060] mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {benefitItems.length > 0 && (
              <section className="mb-10">
                <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
                  Benefits
                </h2>
                <ul className="space-y-4">
                  {benefitItems.map((item) => (
                    <li key={item.id} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-8 border-l-[#28325F] shrink-0"
                        aria-hidden
                      />
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-sm text-[#606060] mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-12 py-8 px-6 rounded-xl bg-[#F0F4FF] border border-[#E0E7FF]">
              <p className="text-lg font-semibold text-[#1A1A1A] mb-2">
                Interested in {service.name}?
              </p>
              <p className="text-[#64748B] text-sm mb-4 max-w-xl">
                Reach out and we&apos;ll get back to you.
              </p>
              <Link
                href={`/contact?service=${id}#consultation`}
                className="inline-flex items-center gap-2 text-[#485AAC] font-semibold hover:underline"
              >
                Get a quote
                <ExternalLink className="h-4 w-4" aria-hidden />
              </Link>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
