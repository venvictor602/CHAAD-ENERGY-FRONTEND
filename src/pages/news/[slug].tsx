import { GetStaticPaths, GetStaticProps } from "next";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { NewsArticleDetail } from "@/components/website/news-article-detail";
import { NewsDetailByApi } from "@/components/website/news-detail-by-api";
import type { NewsArticle } from "@/components/website/news-article-detail";
import type { NewsItem } from "@/components/website/latest-news-section";
import { cloudinaryImages } from "@/lib/cloudinary-images";

const ARTICLE_BODY = [
  "CHAAD Energy has extensive experience successfully completing construction projects under incredible circumstances, in remote locations and in difficult environments safely, within budget and schedule.",
  "Our team brings deep expertise in construction execution and management for the oil and gas sector, delivering Engineering, Procurement, and Construction (EPC) services with excellent equipment and knowledgeable oversight.",
  "From precision structural analysis to sustainable energy systems, our expert engineering team is ready to bring your next vision to life.",
];

const MOCK_ARTICLE: NewsArticle = {
  slug: "future-of-ai-2024",
  date: "Oct 12, 2024",
  title: "Future of AI in 2024: Beyond the Hype",
  subtitle: "Future of AI in 2024: Beyond the Hype",
  featuredImage: cloudinaryImages.news[0],
  featuredImageAlt: "Construction workers at site",
  body: ARTICLE_BODY,
};

const RECENT_RELEASES: NewsItem[] = [
  {
    id: "1",
    imageSrc: cloudinaryImages.news[0],
    imageAlt: "Technology and innovation",
    date: "Oct 12, 2024",
    title: "Future of AI in 2024: Beyond the Hype",
    description:
      "Exploring the upcoming trends in artificial intelligence, from generative models to autonomous agent systems and their ethical implications.",
    href: "/news/future-of-ai-2024",
  },
  {
    id: "2",
    imageSrc: cloudinaryImages.news[1],
    imageAlt: "Energy sector",
    date: "Oct 8, 2024",
    title: "Renewable Energy Integration in Industrial Grids",
    description:
      "How leading operators are balancing grid stability with higher shares of wind and solar while maintaining reliability.",
    href: "/news/renewable-energy-integration",
  },
  {
    id: "3",
    imageSrc: cloudinaryImages.news[2],
    imageAlt: "Safety and compliance",
    date: "Oct 5, 2024",
    title: "Safety Standards Update: What's Changing in 2025",
    description:
      "An overview of revised safety and environmental regulations affecting oil, gas, and construction projects.",
    href: "/news/safety-standards-2025",
  },
];

const NEWS_SLUGS = [
  "future-of-ai-2024",
  "renewable-energy-integration",
  "safety-standards-2025",
  "cathodic-protection-best-practices",
  "epc-supply-chain",
  "decarbonization-gas",
  "commissioning-mega-projects",
  "api-653-inspections",
  "chaad-expands-west-africa",
];

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: NEWS_SLUGS.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{
  article: NewsArticle | null;
  recentReleases: NewsItem[];
  slug: string;
  postId: number | null;
}> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const postId = /^\d+$/.test(slug) ? parseInt(slug, 10) : null;
  if (postId != null) {
    return {
      props: {
        article: null,
        recentReleases: RECENT_RELEASES,
        slug,
        postId,
      },
    };
  }
  const article: NewsArticle = {
    ...MOCK_ARTICLE,
    slug,
    title:
      slug === "future-of-ai-2024"
        ? MOCK_ARTICLE.title
        : slug.replace(/-/g, " "),
    subtitle: slug === "future-of-ai-2024" ? MOCK_ARTICLE.subtitle : undefined,
  };
  const serializedArticle = { ...article, subtitle: article.subtitle ?? null };
  return {
    props: {
      article: serializedArticle,
      recentReleases: RECENT_RELEASES,
      slug,
      postId: null,
    },
  };
};

export default function NewsDetailPage({
  article,
  recentReleases,
  postId,
}: {
  article: NewsArticle | null;
  recentReleases: NewsItem[];
  postId: number | null;
}) {
  if (postId != null) {
    return <NewsDetailByApi postId={postId} />;
  }
  if (!article) return null;
  const breadcrumbItems = [
    { label: "News", href: "/news" },
    { label: "Latest news", href: "/news" },
    { label: "In the media" },
  ];
  return (
    <>
      <Navbar solidBackground />
      <main className="pt-[80px] md:pt-[140px]">
        <NewsArticleDetail
          article={article}
          recentReleases={recentReleases}
          breadcrumbItems={breadcrumbItems}
        />
      </main>
      <Footer />
    </>
  );
}
