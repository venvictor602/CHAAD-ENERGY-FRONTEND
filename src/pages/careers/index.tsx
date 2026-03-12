import { SEO } from "@/components/seo";
import { PageHero } from "@/components/website/page-hero";
import { CareersListSection } from "@/components/website/careers-list-section";
import { Footer } from "@/components/layouts/footer";

export default function CareersPage() {
  return (
    <>
      <SEO title="Careers" />
      <PageHero
        subtitle="Careers"
        title="Join Our Team"
        titlePhrases={["Join Our Team", "Build with us", "Grow your career"]}
        description="Explore open roles in engineering, project delivery, and energy solutions. We're looking for people who want to make an impact."
      />
      <CareersListSection />
      <Footer />
    </>
  );
}
