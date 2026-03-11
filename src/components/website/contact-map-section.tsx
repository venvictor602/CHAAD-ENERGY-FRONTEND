"use client";

const DEFAULT_LAT = 4.8162;
const DEFAULT_LNG = 7.0514;
const ZOOM_PADDING = 0.015;

function getEmbedUrl(lat: number, lng: number): string {
  const minLng = lng - ZOOM_PADDING;
  const minLat = lat - ZOOM_PADDING;
  const maxLng = lng + ZOOM_PADDING;
  const maxLat = lat + ZOOM_PADDING;
  const bbox = `${minLng},${minLat},${maxLng},${maxLat}`;
  const marker = `${lat},${lng}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`;
}

export type ContactMapSectionProps = {
  latitude?: number;
  longitude?: number;
};

export function ContactMapSection({
  latitude = DEFAULT_LAT,
  longitude = DEFAULT_LNG,
}: ContactMapSectionProps) {
  const embedUrl = getEmbedUrl(latitude, longitude);

  return (
    <section className="relative bg-[#0B1220] overflow-hidden [font-family:var(--font-inter)]">
      <div className="relative w-full h-[360px] sm:h-[400px] md:h-[440px]">
        <iframe
          title="Office location map"
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="h-1 bg-[#28325F]" aria-hidden />
    </section>
  );
}
