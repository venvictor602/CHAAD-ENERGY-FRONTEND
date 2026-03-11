import { PageHero } from "@/components/website/page-hero";
import { Footer } from "@/components/layouts/footer";

export default function NewsPage() {
  return (
    <>
      <PageHero
        subtitle="News"
        title="Get updated on what's happening"
        description="From precision structural analysis to sustainable energy systems, our expert engineering team is ready to bring your next vision to life."
      />
      <main className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <p className="text-[#4A4A4A] leading-relaxed">
            News and updates can go here.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
