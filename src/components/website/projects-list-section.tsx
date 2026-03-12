"use client";

import { useState, useEffect } from "react";
import { getProjects } from "@/services/projects";
import type { ProjectItem } from "@/types/app/response";
import {
  CaseStudyGrid,
  type CaseStudyItem,
} from "@/components/website/case-study-grid";
import { cloudinaryImages } from "@/lib/cloudinary-images";

function projectToCaseStudy(p: ProjectItem): CaseStudyItem {
  return {
    id: String(p.id),
    imageSrc: p.banner_image?.trim() || cloudinaryImages.default,
    imageAlt: p.name,
    category: "Project",
    title: p.name,
    description: p.description?.slice(0, 180) || "",
    href: `/projects/${p.id}`,
  };
}

export function ProjectsListSection() {
  const [items, setItems] = useState<CaseStudyItem[] | null>(null);

  useEffect(() => {
    getProjects(1)
      .then((res) => {
        const list = res.data?.results ?? [];
        if (list.length > 0) setItems(list.map(projectToCaseStudy));
      })
      .catch(() => {});
  }, []);

  return <CaseStudyGrid items={items ?? undefined} />;
}
