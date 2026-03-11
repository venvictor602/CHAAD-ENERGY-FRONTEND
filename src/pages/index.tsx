import { Hero } from "@/components/website/hero";
import { AboutSection } from "@/components/website/about-section";
import { ExpertiseSection } from "@/components/website/expertise-section";
import { WhyTrustUsSection } from "@/components/website/why-trust-us-section";
import { TrustedBySection } from "@/components/website/trusted-by-section";
import { TrustStatsSection } from "@/components/website/trust-stats-section";
import { CertificationsSection } from "@/components/website/certifications-section";
import { RecentWorkSection } from "@/components/website/recent-work-section";
import { FaqSection } from "@/components/website/faq-section";
import { Footer } from "@/components/layouts/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ExpertiseSection />
      <WhyTrustUsSection />
      <CertificationsSection />
      <RecentWorkSection />
      <TrustStatsSection />
      <TrustedBySection />
      <FaqSection />
      <Footer />
    </main>
  );
}
