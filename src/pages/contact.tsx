import { SEO } from "@/components/seo";
import { PageHero } from "@/components/website/page-hero";
import { ContactQuoteSection } from "@/components/website/contact-quote-section";
import { ContactMapSection } from "@/components/website/contact-map-section";
import { Footer } from "@/components/layouts/footer";

export default function ContactPage() {
  return (
    <>
      <SEO title="Contact" />
      <PageHero
        subtitle="Contact"
        title="Connect with Us"
        description="From precision structural analysis to sustainable energy systems, our expert engineering team is ready to bring your next vision to life."
      />
      <ContactQuoteSection />
      <ContactMapSection />
      <Footer />
    </>
  );
}
