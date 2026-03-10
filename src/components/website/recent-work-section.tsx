"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "./project-card";

const PROJECTS = [
  {
    imageSrc: "https://picsum.photos/seed/chaad-metro/600/450",
    imageAlt: "Metro transit hub construction",
    title: "Metro transit hub",
    description: "A modern transportation center serving thousands daily.",
    href: "#metro-transit",
  },
  {
    imageSrc: "https://picsum.photos/seed/chaad-riverside/600/450",
    imageAlt: "Riverside towers construction",
    title: "Riverside towers",
    description: "Twin residential buildings with premium amenities.",
    href: "#riverside-towers",
  },
  {
    imageSrc: "https://picsum.photos/seed/chaad-commerce/600/450",
    imageAlt: "Commerce plaza development",
    title: "Commerce plaza",
    description: "Retail and office space in the heart of downtown.",
    href: "#commerce-plaza",
  },
  {
    imageSrc: "https://picsum.photos/seed/chaad-industrial/600/450",
    imageAlt: "Industrial facility project",
    title: "Industrial facility",
    description: "State-of-the-art manufacturing and logistics hub.",
    href: "#industrial-facility",
  },
  {
    imageSrc: "https://picsum.photos/seed/chaad-energy/600/450",
    imageAlt: "Energy infrastructure project",
    title: "Energy terminal",
    description: "Critical infrastructure for energy distribution.",
    href: "#energy-terminal",
  },
  {
    imageSrc: "https://picsum.photos/seed/chaad-pipeline/600/450",
    imageAlt: "Pipeline project",
    title: "Pipeline network",
    description: "Cross-region pipeline installation and commissioning.",
    href: "#pipeline-network",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function RecentWorkSection() {
  return (
    <section id="projects" className="bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-12 lg:mb-16 space-y-[16px] lg:space-y-[24px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-2 [font-family:var(--font-roboto)]">
            Recent work
          </h2>
          <p className="text-[#4A4A4A] font-normal font-roboto text-lg">
            See what we&apos;ve built
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
            >
              <ProjectCard
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                title={project.title}
                description={project.description}
                href={project.href}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          transition={{ duration: 0.4 }}
        >
          <Button variant="default" size="default" asChild>
            <a href="#all-projects">View all</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
