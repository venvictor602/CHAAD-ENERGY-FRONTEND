"use client";

import { useState, useEffect } from "react";

type Phase = "typing" | "pause" | "deleting";

export function TypewriterTitle({
  text,
  phrases,
  speed = 60,
  deleteSpeed = 40,
  pauseDuration = 2500,
  cursorChar = "|",
  className = "",
  as: Tag = "span",
}: {
  text?: string;
  phrases?: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  cursorChar?: string;
  className?: string;
  as?: "span" | "h1" | "h2";
}) {
  const items = phrases && phrases.length > 0 ? phrases : [text ?? ""];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayLength, setDisplayLength] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const currentText = items[phraseIndex] ?? "";

  useEffect(() => {
    setPhraseIndex(0);
    setDisplayLength(0);
    setPhase("typing");
  }, [items.length]);

  useEffect(() => {
    if (phase === "typing") {
      if (displayLength >= currentText.length) {
        setPhase("pause");
        return;
      }
      const t = setTimeout(() => setDisplayLength((n) => n + 1), speed);
      return () => clearTimeout(t);
    }
    if (phase === "pause") {
      if (items.length <= 1) return;
      const t = setTimeout(() => setPhase("deleting"), pauseDuration);
      return () => clearTimeout(t);
    }
    if (phase === "deleting") {
      if (displayLength <= 0) {
        setPhraseIndex((i) => (i + 1) % items.length);
        setPhase("typing");
        return;
      }
      const t = setTimeout(() => setDisplayLength((n) => n - 1), deleteSpeed);
      return () => clearTimeout(t);
    }
  }, [
    phase,
    displayLength,
    currentText.length,
    speed,
    deleteSpeed,
    pauseDuration,
    items.length,
  ]);

  const displayed = currentText.slice(0, displayLength);

  return (
    <Tag className={className}>
      {displayed}
      <span className="animate-pulse opacity-90" aria-hidden>
        {cursorChar}
      </span>
    </Tag>
  );
}
