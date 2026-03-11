import { PageHero } from "@/components/website/page-hero";
import { Footer } from "@/components/layouts/footer";

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        subtitle="Projects"
        title="Engineering Milestones"
        description="Exploring our specialized contributions to global energy infrastructure, from offshore North Sea assets to renewable grid integration."
      />
      <main className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <p className="text-[#4A4A4A] leading-relaxed">
            Projects page content can go here.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
