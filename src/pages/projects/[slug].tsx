import { GetStaticPaths, GetStaticProps } from "next";
import { ProjectDetailByApi } from "@/components/website/project-detail-by-api";
import { idFromSlugParam } from "@/lib/utils";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<{
  projectId: number | null;
}> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const projectId = idFromSlugParam(slug);
  if (projectId == null) {
    return { notFound: true };
  }
  return {
    props: { projectId },
  };
};

export default function ProjectDetailPage({
  projectId,
}: {
  projectId: number | null;
}) {
  if (projectId == null) return null;
  return <ProjectDetailByApi id={projectId} />;
}
