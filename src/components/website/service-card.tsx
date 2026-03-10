import Image from "next/image";
import { LearnMoreLink } from "./learn-more-link";

type ServiceCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  href: string;
};

export function ServiceCard({
  imageSrc,
  imageAlt,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <article className="group flex flex-col bg-white rounded-[16px] p-[16px] overflow-hidden">
      <div className="aspect-4/3 overflow-hidden rounded-xl mb-4">
        <Image
          src={imageSrc}
          width={400}
          height={300}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 rounded-[8px]"
        />
      </div>
      <div className="flex flex-col flex-1 space-y-[8px]">
        <h3 className="text-xl font-bold text-[#333333]">{title}</h3>
        <p className="text-[#606060] text-base font-normal leading-relaxed flex-1">
          {description}
        </p>
        <LearnMoreLink href={href} />
      </div>
    </article>
  );
}
