import { SEO } from "@/components/seo";
import { PageHero } from "@/components/website/page-hero";
import { CoreCapabilitiesSection } from "@/components/website/core-capabilities-section";
import { CaseStudySection } from "@/components/website/case-study-section";
import { CtaSection } from "@/components/website/cta-section";
import { Footer } from "@/components/layouts/footer";

export default function ServicesPage() {
  return (
    <>
      <SEO title="Services" />
      <PageHero
        subtitle="Our Services"
        title="Specialized Engineering Solutions"
        titlePhrases={[
          "Specialized Engineering Solutions",
          "From concept to completion",
          "EPC, Commissioning & more",
        ]}
        description="From concept to completion, we provide end-to-end technical expertise for complex industrial infrastructure. Our commitment to safety and innovation drives every project forward."
      />
      <CoreCapabilitiesSection />
      <CaseStudySection />
      <CtaSection />
      <Footer />
    </>
  );
}
