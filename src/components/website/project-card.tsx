import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

type ProjectCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  href: string;
};

export function ProjectCard({
  imageSrc,
  imageAlt,
  title,
  description,
  href,
}: ProjectCardProps) {
  return (
    <article className="group flex flex-col border border-[#E8E8E8] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow w-full md:max-w-[406px] md:mx-auto">
      <div className="h-[228px] overflow-hidden rounded-t-[16px] shrink-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          width={406}
          height={228}
        />
      </div>
      <div className="p-6 flex flex-col flex-1 min-h-[186px] font-roboto text-[#000000]">
        <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{title}</h3>
        <p className="font-normal text-sm leading-relaxed flex-1 mb-4">
          {description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-[#DE5943] font-semibold text-sm hover:text-[#c94d39] transition-colors"
        >
          View project
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
