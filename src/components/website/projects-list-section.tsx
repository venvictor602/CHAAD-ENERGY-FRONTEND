"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getProjects } from "@/services/projects";
import type { ProjectItem } from "@/types/app/response";
import {
  CaseStudyGrid,
  type CaseStudyItem,
} from "@/components/website/case-study-grid";
import { cloudinaryImages } from "@/lib/cloudinary-images";
import { slugFromTitle } from "@/lib/utils";

function projectToCaseStudy(p: ProjectItem): CaseStudyItem {
  return {
    id: String(p.id),
    imageSrc: p.banner_image?.trim() || cloudinaryImages.default,
    imageAlt: p.name,
    category: "Project",
    title: p.name,
    description: p.description?.slice(0, 180) || "",
    href: `/projects/${p.id}-${slugFromTitle(p.name)}`,
  };
}

export function ProjectsListSection() {
  const [items, setItems] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects(1)
      .then((res) => {
        const list = res.data?.results ?? [];
        setItems(list.map(projectToCaseStudy));
      })
      .catch(() => setError("Unable to load projects."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-[#F9FAFB] [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center gap-4 min-h-[280px]">
          <Loader2
            className="h-10 w-10 animate-spin text-[#485AAC]"
            aria-hidden
          />
          <p className="text-sm text-[#64748B]">Loading projects…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-[#F9FAFB] [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[#64748B]">{error}</p>
        </div>
      </section>
    );
  }

  return <CaseStudyGrid items={items} />;
}
