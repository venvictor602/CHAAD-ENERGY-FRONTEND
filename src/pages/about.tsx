import { PageHero } from "@/components/website/page-hero";
import { AboutStorySection } from "@/components/website/about-story-section";
import { CoreValuesSection } from "@/components/website/core-values-section";
import { PartnersSection } from "@/components/website/partners-section";
import { CertificationsSection } from "@/components/website/certifications-section";
import { LeadershipTeamSection } from "@/components/website/leadership-team-section";
import { TrustedBySection } from "@/components/website/trusted-by-section";
import { SafetyCommitmentSection } from "@/components/website/safety-commitment-section";
import { Footer } from "@/components/layouts/footer";

export default function AboutPage() {
  return (
    <>
      <PageHero
        subtitle="About Us"
        title="Our mission, vision & history"
        description="Delivering Engineering Excellence Across Energy & Industrial Landscapes. Partner with a solutions-driven team that values safety, precision, and measurable results."
      />
      <AboutStorySection />
      <CoreValuesSection />
      <PartnersSection />
      <CertificationsSection />
      <LeadershipTeamSection />
      <TrustedBySection />
      <SafetyCommitmentSection />
      <Footer />
    </>
  );
}
