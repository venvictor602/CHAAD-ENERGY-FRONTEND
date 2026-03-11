import { GetStaticPaths, GetStaticProps } from "next";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import {
  ProjectDetailContent,
  type ProjectDetailData,
} from "@/components/website/project-detail-content";

const PROJECTS: Record<string, Omit<ProjectDetailData, "slug">> = {
  "north-sea-platform": {
    title: "North Sea Offshore Platform Integrity & Life Extension",
    overview:
      "Global Logistics Corp required an overhaul of assembly lines in Frankfurt to transition to an autonomous 'Dark Factory' model with 24/7 operations, and the implementation of a bespoke IoT architecture integrated with ERP systems.",
    challenge:
      "Key hurdles included interoperability of legacy hardware with modern robotic arm systems, potential downtime costs of $45,000 per hour, and tight precision requirements within 0.05mm tolerances.",
    solution:
      "We deployed a phased implementation strategy using Digital Twin technology to simulate the production floor and identify bottlenecks before hardware installation.",
    client: "Global Logistics Corp",
    location: "Frankfurt, Germany",
    services: "Robotics, IoT, ERP Integration",
    duration: "14 Months",
    facilityAddress: "Falawar Zone B, Plot 10-A",
    mapLat: 50.1109,
    mapLng: 8.6821,
    metrics: [
      {
        value: "+35%",
        label: "Efficiency Increase",
        subtext: "+ Surpassed target by 5%",
        icon: "efficiency",
      },
      {
        value: "99.98%",
        label: "System Uptime",
        subtext: "Enterprise Grade",
        icon: "uptime",
      },
      {
        value: "-22%",
        label: "Operational Costs",
        subtext: "- Annual reduction",
        icon: "costs",
      },
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-oil-platform/1200/600",
        alt: "Offshore platform",
      },
      {
        src: "https://picsum.photos/seed/chaad-oil-2/1200/600",
        alt: "Platform detail",
      },
      {
        src: "https://picsum.photos/seed/chaad-oil-3/1200/600",
        alt: "Construction",
      },
      {
        src: "https://picsum.photos/seed/chaad-oil-4/1200/600",
        alt: "Site work",
      },
    ],
  },
  "metro-transit-hub": {
    title: "Metro Transit Hub",
    overview:
      "Comprehensive structural assessment and cathodic protection upgrades for a major operator, extending asset life by 15 years.",
    challenge:
      "Coordinating with live transit operations and meeting strict safety and schedule windows.",
    solution:
      "Phased execution with night and weekend works, integrated CP design and commissioning.",
    client: "Metro Transit Authority",
    location: "Port Harcourt, Nigeria",
    services: "Structural, CP, Commissioning",
    duration: "18 Months",
    facilityAddress: "KM 17 PHC/Aba Expressway",
    mapLat: 4.8162,
    mapLng: 7.0514,
    metrics: [
      {
        value: "+35%",
        label: "Efficiency Increase",
        subtext: "+ Surpassed target by 5%",
        icon: "efficiency",
      },
      {
        value: "99.98%",
        label: "System Uptime",
        subtext: "Enterprise Grade",
        icon: "uptime",
      },
      {
        value: "-22%",
        label: "Operational Costs",
        subtext: "- Annual reduction",
        icon: "costs",
      },
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-metro-1/1200/600",
        alt: "Transit hub",
      },
      {
        src: "https://picsum.photos/seed/chaad-metro-2/1200/600",
        alt: "Construction",
      },
      { src: "https://picsum.photos/seed/chaad-metro-3/1200/600", alt: "Site" },
    ],
  },
  "wind-farm-grid": {
    title: "Grid Integration & Substation Works for 200MW Wind Farm",
    overview:
      "Full EPC scope for grid connection and balance-of-plant works, enabling stable renewable power delivery to the national grid.",
    challenge:
      "Grid stability and connection timeline under variable wind output.",
    solution:
      "Advanced grid studies and staged commissioning with dedicated substation design.",
    client: "Renewable Energy Co",
    location: "Lagos, Nigeria",
    services: "EPC, Grid, Commissioning",
    duration: "24 Months",
    metrics: [
      {
        value: "+40%",
        label: "Efficiency Increase",
        subtext: "Grid availability",
        icon: "efficiency",
      },
      {
        value: "99.9%",
        label: "System Uptime",
        subtext: "Target achieved",
        icon: "uptime",
      },
      {
        value: "-18%",
        label: "Operational Costs",
        subtext: "vs. baseline",
        icon: "costs",
      },
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-wind/1200/600",
        alt: "Wind farm",
      },
      {
        src: "https://picsum.photos/seed/chaad-wind-2/1200/600",
        alt: "Substation",
      },
    ],
  },
  "lng-terminal": {
    title: "LNG Terminal Tank Inspections & Coating Remediation",
    overview:
      "API 653 inspections and specialized lining systems for cryogenic storage tanks at a regional LNG import facility.",
    challenge: "Safe access and inspection during limited shutdown windows.",
    solution:
      "Rope access and NDT teams with full coating remediation and handover documentation.",
    client: "LNG Terminal Operator",
    location: "Bonny Island, Nigeria",
    services: "API 653, Coating, NDT",
    duration: "8 Months",
    metrics: [
      {
        value: "100%",
        label: "Inspection Coverage",
        subtext: "All tanks",
        icon: "efficiency",
      },
      {
        value: "0",
        label: "Safety Incidents",
        subtext: "Zero recordable",
        icon: "uptime",
      },
      {
        value: "-15%",
        label: "Lifecycle Cost",
        subtext: "Extended asset life",
        icon: "costs",
      },
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-lng/1200/600",
        alt: "LNG terminal",
      },
      {
        src: "https://picsum.photos/seed/chaad-lng-2/1200/600",
        alt: "Tank work",
      },
    ],
  },
  "solar-epc": {
    title: "Utility-Scale Solar EPC & Commissioning",
    overview:
      "Turnkey design, procurement, and construction of a 50MW solar PV plant with full commissioning and handover.",
    challenge: "Land preparation and grid connection in a remote site.",
    solution:
      "Integrated EPC with dedicated commissioning and grid compliance team.",
    client: "Solar Developer",
    location: "Kaduna, Nigeria",
    services: "EPC, Solar, Commissioning",
    duration: "14 Months",
    metrics: [
      {
        value: "50MW",
        label: "Capacity",
        subtext: "On schedule",
        icon: "efficiency",
      },
      {
        value: "99.2%",
        label: "Availability",
        subtext: "First year",
        icon: "uptime",
      },
      {
        value: "-25%",
        label: "O&M Cost",
        subtext: "vs. estimate",
        icon: "costs",
      },
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-solar/1200/600",
        alt: "Solar plant",
      },
      {
        src: "https://picsum.photos/seed/chaad-solar-2/1200/600",
        alt: "Installation",
      },
    ],
  },
  "subsea-cp": {
    title: "Subsea Pipeline CP Surveys & ROV Support",
    overview:
      "Cathodic protection surveys and ROV-based inspection support for subsea pipelines in West African waters.",
    challenge: "Deep water and vessel availability in a congested corridor.",
    solution:
      "Dedicated survey vessel and ROV package with real-time CP data analysis.",
    client: "Offshore Operator",
    location: "West African Waters",
    services: "CP, ROV, Survey",
    duration: "6 Months",
    metrics: [
      {
        value: "100%",
        label: "Survey Coverage",
        subtext: "Pipeline length",
        icon: "efficiency",
      },
      {
        value: "99.5%",
        label: "Vessel Uptime",
        subtext: "Weather windows",
        icon: "uptime",
      },
      {
        value: "-10%",
        label: "Cost vs. Budget",
        subtext: "Under budget",
        icon: "costs",
      },
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-rov/1200/600",
        alt: "ROV operations",
      },
      { src: "https://picsum.photos/seed/chaad-rov-2/1200/600", alt: "Survey" },
    ],
  },
  "refinery-modernization": {
    title: "Major Refinery Modernization & Turnaround Support",
    overview:
      "Large-scale modernization of a regional fuel storage facility with integrated CP and commissioning services.",
    challenge: "Minimizing downtime and coordinating multiple contractors.",
    solution:
      "Phased turnaround with integrated CP and commissioning, 30% reduction in projected maintenance costs.",
    client: "Refinery Operator",
    location: "Port Harcourt, Nigeria",
    services: "EPC, CP, Commissioning",
    duration: "20 Months",
    mapLat: 4.8162,
    mapLng: 7.0514,
    facilityAddress: "KM 17 PHC/Aba Expressway",
    metrics: [
      {
        value: "200+",
        label: "Project Milestones",
        subtext: "Delivered on time",
        icon: "efficiency",
      },
      {
        value: "0",
        label: "Safety Incidents",
        subtext: "Zero recordable",
        icon: "uptime",
      },
      {
        value: "-30%",
        label: "Maintenance Cost",
        subtext: "Projected reduction",
        icon: "costs",
      },
    ],
    galleryImages: [
      {
        src: "https://picsum.photos/seed/chaad-refinery/1200/600",
        alt: "Refinery",
      },
      {
        src: "https://picsum.photos/seed/chaad-refinery-2/1200/600",
        alt: "Modernization",
      },
      {
        src: "https://picsum.photos/seed/chaad-refinery-3/1200/600",
        alt: "Site",
      },
    ],
  },
};

const SLUGS = Object.keys(PROJECTS);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: SLUGS.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  project: ProjectDetailData;
}> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const data = PROJECTS[slug];
  if (!data) return { notFound: true };
  const project: ProjectDetailData = { ...data, slug };
  return { props: { project } };
};

export default function ProjectDetailPage({
  project,
}: {
  project: ProjectDetailData;
}) {
  const breadcrumbItems = [
    { label: "Projects", href: "/projects" },
    { label: project.title },
  ];
  return (
    <>
      <Navbar solidBackground />
      <main className="pt-[80px] md:pt-[140px]">
        <ProjectDetailContent
          project={project}
          breadcrumbItems={breadcrumbItems}
        />
      </main>
      <Footer />
    </>
  );
}
