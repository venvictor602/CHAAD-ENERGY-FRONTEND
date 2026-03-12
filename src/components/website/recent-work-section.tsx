"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, FolderOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "./project-card";
import { getProjects } from "@/services/projects";
import type { ProjectItem } from "@/types/app/response";
import { cloudinaryImages } from "@/lib/cloudinary-images";
import { slugFromTitle } from "@/lib/utils";

type ProjectCardItem = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  href: string;
};

function projectToCard(p: ProjectItem): ProjectCardItem {
  return {
    imageSrc: p.banner_image?.trim() || cloudinaryImages.recentWorkDefault,
    imageAlt: p.name,
    title: p.name,
    description: p.description?.slice(0, 120) || "",
    href: `/projects/${p.id}-${slugFromTitle(p.name)}`,
  };
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function RecentWorkSection() {
  const [projects, setProjects] = useState<ProjectCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects(1)
      .then((res) => {
        const list = res.data?.results ?? [];
        setProjects(list.map(projectToCard));
      })
      .catch(() => setError("Unable to load projects."))
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 min-h-[280px]">
            <Loader2
              className="h-10 w-10 animate-spin text-[#485AAC]"
              aria-hidden
            />
            <p className="text-sm text-[#64748B]">Loading projects…</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-4 min-h-[280px] text-center">
            <p className="text-[#64748B]">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 min-h-[280px] text-center py-12">
            <FolderOpen className="h-14 w-14 text-[#94A3B8]" aria-hidden />
            <p className="text-[#64748B] font-medium">No projects yet.</p>
            <p className="text-sm text-[#94A3B8]">
              Check back later for our work.
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${index}`}
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
                <Link href="/projects">View all</Link>
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
