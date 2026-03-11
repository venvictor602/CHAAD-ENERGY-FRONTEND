"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type DiagonalImageSliderProps = {
  images: string[];
};

const COLUMN_CONFIG = [
  { direction: 1, duration: 18, offset: 0 },
  { direction: -1, duration: 22, offset: -80 },
  { direction: 1, duration: 16, offset: -40 },
  { direction: -1, duration: 20, offset: -120 },
  { direction: 1, duration: 24, offset: -60 },
];

const IMAGE_ROTATIONS = [-2, 1.5, -1, 2, -0.5, 1, -1.5, 0.5, -2, 1];

export function DiagonalImageSlider({ images }: DiagonalImageSliderProps) {
  const filled =
    images.length > 0
      ? images
      : Array(6).fill("https://picsum.photos/seed/chaad/300/400");
  const pool = [...filled, ...filled, ...filled, ...filled];

  return (
    <div className="relative w-full h-full overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 flex gap-3"
        style={{
          transform: "rotate(-12deg) scale(1.3)",
          transformOrigin: "center center",
        }}
      >
        {COLUMN_CONFIG.map((col, colIdx) => {
          const colImages = pool.slice(
            (colIdx * 3) % pool.length,
            ((colIdx * 3) % pool.length) + pool.length,
          );
          const imgHeight = 220;
          const imgGap = 12;
          const total = colImages.length * (imgHeight + imgGap);

          return (
            <div
              key={colIdx}
              className="flex flex-col gap-3 shrink-0 w-[140px] sm:w-[160px]"
              style={{ marginTop: col.offset }}
            >
              <motion.div
                className="flex flex-col gap-3"
                animate={{
                  y: col.direction > 0 ? [0, -total / 2] : [-total / 2, 0],
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: col.duration,
                    ease: "linear",
                  },
                }}
              >
                {[...colImages, ...colImages].map((src, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="rounded-2xl overflow-hidden shrink-0"
                    style={{
                      height: imgHeight,
                      transform: `rotate(${IMAGE_ROTATIONS[imgIdx % IMAGE_ROTATIONS.length]}deg)`,
                    }}
                  >
                    <Image
                      src={src}
                      alt=""
                      width={160}
                      height={imgHeight}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
