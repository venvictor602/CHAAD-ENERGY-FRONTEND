"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Breadcrumb } from "@/components/website/breadcrumb";
import { getProject } from "@/services/projects";
import type { ProjectItem } from "@/types/app/response";

const DEFAULT_IMG = "https://picsum.photos/seed/chaad-project/1200/600";

export function ProjectDetailByApi({ id }: { id: number }) {
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProject(id)
      .then((res) => setProject(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar solidBackground />
        <main className="pt-[80px] md:pt-[140px] min-h-screen flex items-center justify-center">
          <Loader2
            className="h-10 w-10 animate-spin text-[#485AAC]"
            aria-hidden
          />
        </main>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar solidBackground />
        <main className="pt-[80px] md:pt-[140px] min-h-screen flex flex-col items-center justify-center gap-4 px-6">
          <p className="text-[#64748B]">Project not found.</p>
          <Link
            href="/projects"
            className="text-[#485AAC] font-semibold hover:underline"
          >
            Back to Projects
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const images = [
    project.banner_image,
    project.supporting_image1,
    project.supporting_image2,
  ].filter(Boolean);

  return (
    <>
      <Navbar solidBackground />
      <main className="pt-[80px] md:pt-[140px] min-h-screen bg-[#F9FAFB] [font-family:var(--font-inter)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: "Projects", href: "/projects" },
                { label: project.name, href: undefined },
              ]}
            />
          </div>
          <article>
            <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-6">
              {project.name}
            </h1>
            {project.banner_image && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 bg-[#E5E7EB]">
                <Image
                  src={project.banner_image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  unoptimized
                />
              </div>
            )}
            {project.description && (
              <div className="prose prose-lg text-[#64748B] max-w-none mb-8 whitespace-pre-wrap">
                {project.description}
              </div>
            )}
            {project.subtitle1 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#333333] mb-2">
                  {project.subtitle1}
                </h2>
                <p className="text-[#64748B] whitespace-pre-wrap">
                  {project.subtitle1_description}
                </p>
              </section>
            )}
            {images.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {images.slice(1, 3).map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-lg overflow-hidden bg-[#E5E7EB]"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="50vw"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
