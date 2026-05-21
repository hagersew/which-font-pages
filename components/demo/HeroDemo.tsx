"use client";

import { AnimatedCursor } from "@/components/demo/AnimatedCursor";
import { BrowserMockup } from "@/components/demo/BrowserMockup";
import { HighlightRing } from "@/components/demo/HighlightRing";
import { InspectCardDemo } from "@/components/demo/InspectCardDemo";
import { heroDemoInspectData } from "@/content/landing";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type DemoPhase = "idle" | "hover" | "inspect" | "copy";

const PHASES: { phase: DemoPhase; duration: number }[] = [
  { phase: "idle", duration: 800 },
  { phase: "hover", duration: 1200 },
  { phase: "inspect", duration: 2000 },
  { phase: "copy", duration: 1500 },
];

const CURSOR_POSITIONS: Record<DemoPhase, { x: number; y: number }> = {
  idle: { x: 60, y: 120 },
  hover: { x: 48, y: 72 },
  inspect: { x: 200, y: 180 },
  copy: { x: 220, y: 280 },
};

export function HeroDemo() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1023px)").matches;
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseIndexRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const advancePhase = useCallback(() => {
    phaseIndexRef.current = (phaseIndexRef.current + 1) % PHASES.length;
    setPhase(PHASES[phaseIndexRef.current].phase);
  }, []);

  useEffect(() => {
    if (reduced || paused || isMobile) return;

    const scheduleNext = () => {
      const current = PHASES[phaseIndexRef.current];
      timerRef.current = setTimeout(() => {
        advancePhase();
        scheduleNext();
      }, current.duration);
    };

    scheduleNext();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reduced, paused, isMobile, advancePhase, phase]);

  const cursor = CURSOR_POSITIONS[phase];
  const showHighlight = phase === "hover" || phase === "inspect" || phase === "copy";
  const showCard = phase === "inspect" || phase === "copy";
  const showCopied = phase === "copy";

  if (isMobile || reduced) {
    return (
      <BrowserMockup url="imdb.com/top10">
        <Image
          src="/preview-1.png"
          alt="Which Font? extension inspecting typography on a webpage"
          width={800}
          height={500}
          className="w-full h-auto"
          priority
        />
      </BrowserMockup>
    );
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <BrowserMockup url="imdb.com/top10">
        <div className="relative min-h-[340px] p-6">
          {/* Fake webpage content */}
          <div className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Top 10 on IMDb this week
          </div>
          <div className="relative mb-6 inline-block">
            <h3 className="text-2xl font-bold text-white">The Boys</h3>
            <AnimatePresence>
              {showHighlight && (
                <HighlightRing className="inset-[-4px]" />
              )}
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["Off Campus", "Dutton Ranch", "Paradise"].map((title) => (
              <div
                key={title}
                className="rounded-lg bg-zinc-800/80 p-3"
              >
                <div className="mb-2 aspect-[2/3] rounded bg-zinc-700" />
                <p className="truncate text-xs text-zinc-300">{title}</p>
              </div>
            ))}
          </div>

          <AnimatedCursor
            x={cursor.x}
            y={cursor.y}
            clicking={phase === "inspect"}
          />

          <AnimatePresence>
            {showCard && (
              <div className="absolute right-4 top-16 z-40">
                <InspectCardDemo
                  data={heroDemoInspectData}
                  showCopiedFlash={showCopied}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </BrowserMockup>
    </div>
  );
}
