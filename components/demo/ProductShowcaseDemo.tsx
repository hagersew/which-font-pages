"use client";

import { AnimatedCursor } from "@/components/demo/AnimatedCursor";
import { BrowserMockup } from "@/components/demo/BrowserMockup";
import { HighlightRing } from "@/components/demo/HighlightRing";
import { InspectCardDemo } from "@/components/demo/InspectCardDemo";
import { demoInspectData } from "@/content/landing";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ShowcasePhase = "enter" | "hover" | "inspect" | "copy" | "shift";

type Hotspot = {
  left: string;
  top: string;
  width: string;
  height: string;
};

const PHASES: { phase: ShowcasePhase; duration: number }[] = [
  { phase: "enter", duration: 900 },
  { phase: "hover", duration: 1300 },
  { phase: "inspect", duration: 2200 },
  { phase: "copy", duration: 1500 },
  { phase: "shift", duration: 1400 },
];

const CURSOR: Record<ShowcasePhase, { x: number; y: number }> = {
  enter: { x: 68, y: 72 },
  hover: { x: 12, y: 22 },
  inspect: { x: 48, y: 30 },
  copy: { x: 72, y: 26 },
  shift: { x: 30, y: 54 },
};

const HIGHLIGHTS: Record<ShowcasePhase, Hotspot | null> = {
  enter: null,
  hover: { left: "5%", top: "14%", width: "44%", height: "11%" },
  inspect: { left: "5%", top: "14%", width: "44%", height: "11%" },
  copy: { left: "5%", top: "14%", width: "44%", height: "11%" },
  shift: { left: "20%", top: "46%", width: "30%", height: "9%" },
};

export function ProductShowcaseDemo() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<ShowcasePhase>("enter");
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseIndexRef = useRef(0);

  const advancePhase = useCallback(() => {
    phaseIndexRef.current = (phaseIndexRef.current + 1) % PHASES.length;
    setPhase(PHASES[phaseIndexRef.current].phase);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;

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
  }, [reduced, paused, advancePhase, phase]);

  const cursor = CURSOR[phase];
  const highlight = HIGHLIGHTS[phase];
  const showHighlight = highlight !== null;
  const showCard = phase === "inspect" || phase === "copy";
  const showCopied = phase === "copy";
  const clicking = phase === "inspect";

  if (reduced) {
    return (
      <BrowserMockup url="redline.dev">
        <Image
          src="/preview-2.png"
          alt="Which Font? inspecting typography on a landing page"
          width={900}
          height={560}
          className="h-auto w-full"
        />
      </BrowserMockup>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="showcase-ambient-glow"
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.98, 1.04, 0.98] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <BrowserMockup url="redline.dev">
        <div className="relative">
          <Image
            src="/preview-2.png"
            alt="Which Font? inspecting typography on a landing page"
            width={900}
            height={560}
            className="h-auto w-full"
          />

          <AnimatePresence mode="wait">
            {showHighlight && highlight && (
              <motion.div
                key={`${highlight.left}-${highlight.top}`}
                className="pointer-events-none absolute"
                style={{
                  left: highlight.left,
                  top: highlight.top,
                  width: highlight.width,
                  height: highlight.height,
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <HighlightRing pulse className="inset-0" />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatedCursor
            x={cursor.x}
            y={cursor.y}
            unit="%"
            clicking={clicking}
          />

          <AnimatePresence>
            {showCard && (
              <motion.div
                className="absolute -right-1 top-[18%] z-10 md:-right-4 lg:-right-6"
                initial={{ opacity: 0, x: 24, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <InspectCardDemo
                  data={demoInspectData}
                  floating
                  showCopiedFlash={showCopied}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BrowserMockup>
    </div>
  );
}
