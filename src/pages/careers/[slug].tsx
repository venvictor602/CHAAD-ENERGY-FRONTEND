import { useRouter } from "next/router";
import { SEO } from "@/components/seo";
import { Navbar } from "@/components/layouts/navbar";
import { CareerDetailContent } from "@/components/website/career-detail-content";
import { Footer } from "@/components/layouts/footer";
import { idFromSlugParam } from "@/lib/utils";

export default function CareerDetailPage() {
  const router = useRouter();
  const slug = router.query.slug as string | undefined;
  const numericId = slug != null ? idFromSlugParam(slug) : null;

  if (router.isFallback || slug == null) {
    return (
      <>
        <SEO title="Careers" />
        <Navbar solidBackground />
        <div className="pt-[80px] min-h-screen flex items-center justify-center">
          <p className="text-[#64748B]">Loading…</p>
        </div>
      </>
    );
  }

  if (numericId == null || numericId < 1) {
    return (
      <>
        <SEO title="Career Not Found" />
        <Navbar solidBackground />
        <div className="pt-[80px] min-h-screen flex flex-col items-center justify-center gap-4 px-6">
          <p className="text-[#64748B]">Invalid job listing.</p>
          <a
            href="/careers"
            className="text-[#485AAC] font-semibold hover:underline"
          >
            Back to Careers
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Careers" />
      <Navbar solidBackground />
      <CareerDetailContent jobId={numericId} />
      <Footer />
    </>
  );
}
