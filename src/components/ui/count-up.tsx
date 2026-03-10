"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function useInViewOnce<T extends Element>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.35, ...options },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, options]);

  return { ref, inView } as const;
}

export function CountUp({
  value,
  start,
  durationMs = 900,
}: {
  value: string;
  start: boolean;
  durationMs?: number;
}) {
  const { target, suffix } = useMemo(() => {
    const match = value.trim().match(/^(\d+(?:\.\d+)?)(.*)$/);
    return {
      target: match ? Number(match[1]) : 0,
      suffix: match ? match[2] : "",
    };
  }, [value]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setCurrent(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, start, target]);

  const display =
    target % 1 === 0 ? Math.round(current).toString() : current.toFixed(1);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}
