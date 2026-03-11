import { SEO } from "@/components/seo";
import { PageHero } from "@/components/website/page-hero";
import { LatestNewsSection } from "@/components/website/latest-news-section";
import { Footer } from "@/components/layouts/footer";

export default function NewsPage() {
  return (
    <>
      <SEO title="News" />
      <PageHero
        subtitle="News"
        title="Get updated on what's happening"
        description="From precision structural analysis to sustainable energy systems, our expert engineering team is ready to bring your next vision to life."
      />
      <LatestNewsSection />
      <Footer />
    </>
  );
}
