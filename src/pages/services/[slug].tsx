import { GetStaticPaths, GetStaticProps } from "next";
import { ServiceDetailByApi } from "@/components/website/service-detail-by-api";
import { idFromSlugParam } from "@/lib/utils";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<{
  serviceId: number | null;
}> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const serviceId = idFromSlugParam(slug);
  if (serviceId == null) {
    return { notFound: true };
  }
  return {
    props: { serviceId },
  };
};

export default function ServiceDetailPage({
  serviceId,
}: {
  serviceId: number | null;
}) {
  if (serviceId == null) return null;
  return <ServiceDetailByApi id={serviceId} />;
}
