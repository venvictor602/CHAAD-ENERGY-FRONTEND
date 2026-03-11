import { GetStaticPaths, GetStaticProps } from "next";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import {
  ServiceDetailContent,
  type ServiceDetailData,
} from "@/components/website/service-detail-content";

const SERVICES: Record<string, Omit<ServiceDetailData, "slug">> = {
  "construction-services": {
    title: "Construction Services",
    description: [
      "CHAAD Energy has extensive experience successfully completing construction projects under incredible circumstances, in remote locations and in difficult environments safely, within budget and schedule.",
      "Our team brings deep expertise in construction execution and management for the oil and gas sector, delivering projects with excellent equipment and knowledgeable oversight.",
      "We offer comprehensive Engineering, Procurement, and Construction (EPC) services, ensuring a single point of responsibility from design through to handover.",
      "From precision structural work to sustainable energy systems, our expert engineering team is ready to bring your next vision to life.",
    ],
    projectTypes: [
      "Piling and civil work",
      "Mechanical work",
      "Electrical and lighting",
      "Measurement and instrumentation",
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-construction-1/800/600",
        alt: "Construction workers and excavator at site",
      },
      {
        src: "https://picsum.photos/seed/chaad-construction-2/800/600",
        alt: "Workers on scaffolding and concrete structure",
      },
      {
        src: "https://picsum.photos/seed/chaad-construction-3/800/600",
        alt: "Excavation and construction equipment",
      },
    ],
  },
  "epc-services": {
    title: "EPC Services",
    description: [
      "Our EPC (Engineering, Procurement, and Construction) approach provides a single point of responsibility for your project, from front-end design through to commissioning and handover.",
      "We manage interfaces, schedules, and quality so you can focus on your core operations.",
      "CHAAD Energy has delivered EPC projects across oil and gas, renewables, and industrial sectors, always with rigorous safety and cost control.",
    ],
    projectTypes: [
      "Feasibility and FEED",
      "Detailed design and procurement",
      "Construction and installation",
      "Commissioning and handover",
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-epc-1/800/600",
        alt: "EPC project site",
      },
      {
        src: "https://picsum.photos/seed/chaad-epc-2/800/600",
        alt: "Installation",
      },
      {
        src: "https://picsum.photos/seed/chaad-epc-3/800/600",
        alt: "Commissioning",
      },
    ],
  },
  commissioning: {
    title: "Commissioning",
    description: [
      "Systematic verification to ensure all systems and components are designed, installed, tested, and maintained according to the operational requirements of the owner.",
      "Our commissioning team plans and executes pre-commissioning, commissioning, and start-up activities to deliver a fully operational asset.",
      "We work closely with clients and contractors to minimize schedule risk and ensure a smooth transition to operations.",
    ],
    projectTypes: [
      "Pre-commissioning and punch closure",
      "System and subsystem testing",
      "Start-up and performance testing",
      "Handover documentation and training",
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-comm-1/800/600",
        alt: "Commissioning activities",
      },
      {
        src: "https://picsum.photos/seed/chaad-comm-2/800/600",
        alt: "Testing",
      },
      {
        src: "https://picsum.photos/seed/chaad-comm-3/800/600",
        alt: "Handover",
      },
    ],
  },
  "cathodic-protection": {
    title: "Cathodic Protection",
    description: [
      "Advanced corrosion control engineering for buried or submerged metal structures. Our solutions extend asset life and prevent costly environmental incidents.",
      "We design, install, and maintain impressed current and galvanic CP systems for pipelines, tanks, and offshore structures.",
      "Our team supports clients with surveys, monitoring, and remediation to meet regulatory and integrity requirements.",
    ],
    projectTypes: [
      "CP design and feasibility",
      "Installation and commissioning",
      "Surveys and monitoring",
      "Remediation and life extension",
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-cp-1/800/600",
        alt: "CP installation",
      },
      { src: "https://picsum.photos/seed/chaad-cp-2/800/600", alt: "Survey" },
      {
        src: "https://picsum.photos/seed/chaad-cp-3/800/600",
        alt: "Monitoring",
      },
    ],
  },
  "tank-services": {
    title: "Tank Services",
    description: [
      "Specialized industrial storage solutions including API 653 inspections, structural repairs, floor replacements, and specialized lining systems.",
      "We support above-ground storage tanks for oil, gas, and chemicals with a full range of integrity and maintenance services.",
      "Our work is carried out to international standards and client specifications, with minimal disruption to operations where possible.",
    ],
    projectTypes: [
      "API 653 and API 620 inspections",
      "Structural repairs and alterations",
      "Floor and shell lining",
      "Anode and CP for tanks",
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-tank-1/800/600",
        alt: "Tank inspection",
      },
      {
        src: "https://picsum.photos/seed/chaad-tank-2/800/600",
        alt: "Tank repair",
      },
      { src: "https://picsum.photos/seed/chaad-tank-3/800/600", alt: "Lining" },
    ],
  },
  "turnkey-solutions": {
    title: "Turnkey Solutions",
    description: [
      "Seamlessly integrated services from front-end engineering design to final hand-off. We handle the complexity so you can focus on your core business operations.",
      "Our turnkey approach combines design, procurement, construction, and commissioning under one contract, reducing interface risk and improving schedule certainty.",
      "Ideal for clients who want a single responsible party and clear accountability for delivery.",
    ],
    projectTypes: [
      "Full scope EPC",
      "Design-build",
      "Operations and maintenance support",
      "Lifecycle and asset management",
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-turnkey-1/800/600",
        alt: "Turnkey project",
      },
      {
        src: "https://picsum.photos/seed/chaad-turnkey-2/800/600",
        alt: "Delivery",
      },
      {
        src: "https://picsum.photos/seed/chaad-turnkey-3/800/600",
        alt: "Handover",
      },
    ],
  },
};

const SLUGS = Object.keys(SERVICES);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: SLUGS.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  service: ServiceDetailData;
}> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const data = SERVICES[slug];
  if (!data) return { notFound: true };
  const service: ServiceDetailData = { ...data, slug };
  return { props: { service } };
};

export default function ServiceDetailPage({
  service,
}: {
  service: ServiceDetailData;
}) {
  const titleLabel = service.title;
  const breadcrumbItems = [
    { label: "Services", href: "/services" },
    { label: titleLabel },
  ];
  return (
    <>
      <Navbar solidBackground />
      <main className="pt-[72px]">
        <ServiceDetailContent
          service={service}
          breadcrumbItems={breadcrumbItems}
        />
      </main>
      <Footer />
    </>
  );
}
