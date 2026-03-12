import { GetStaticPaths, GetStaticProps } from "next";
import { NewsDetailByApi } from "@/components/website/news-detail-by-api";
import type { NewsItem } from "@/components/website/latest-news-section";
import { idFromSlugParam } from "@/lib/utils";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<{
  recentReleases: NewsItem[];
  slug: string;
  postId: number | null;
}> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const postId = idFromSlugParam(slug);
  if (postId == null) {
    return { notFound: true };
  }
  return {
    props: {
      recentReleases: [],
      slug,
      postId,
    },
  };
};

export default function NewsDetailPage({
  postId,
}: {
  recentReleases: NewsItem[];
  slug: string;
  postId: number | null;
}) {
  if (postId == null) return null;
  return <NewsDetailByApi postId={postId} />;
}
