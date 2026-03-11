import { PageHero } from "@/components/website/page-hero";
import { Footer } from "@/components/layouts/footer";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        subtitle="Our Services"
        title="Specialized Engineering Solutions"
        description="From concept to completion, we provide end-to-end technical expertise for complex industrial infrastructure. Our commitment to safety and innovation drives every project forward."
      />
      <main className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <p className="text-[#4A4A4A] leading-relaxed">
            Services page content can go here.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
