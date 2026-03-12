import { SEO } from "@/components/seo";
import { PageHero } from "@/components/website/page-hero";
import { ProjectsListSection } from "@/components/website/projects-list-section";
import { BuildWithUsBanner } from "@/components/website/build-with-us-banner";
import { Footer } from "@/components/layouts/footer";

export default function ProjectsPage() {
  return (
    <>
      <SEO title="Projects" />
      <PageHero
        subtitle="Projects"
        title="Engineering Milestones"
        titlePhrases={[
          "Engineering Milestones",
          "Global energy infrastructure",
          "Offshore to onshore delivery",
        ]}
        description="Exploring our specialized contributions to global energy infrastructure, from offshore North Sea assets to renewable grid integration."
      />
      <ProjectsListSection />
      <BuildWithUsBanner />
      <Footer />
    </>
  );
}
