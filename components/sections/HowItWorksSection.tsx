"use client";

import { AnimatedCursor } from "@/components/demo/AnimatedCursor";
import { HighlightRing } from "@/components/demo/HighlightRing";
import { InspectCardDemo } from "@/components/demo/InspectCardDemo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { demoInspectData, howItWorksSteps } from "@/content/landing";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FiChrome, FiMousePointer } from "react-icons/fi";

const AUTO_ADVANCE_MS = 5000;

function StepDemoPanel({ stepId }: { stepId: number }) {
  if (stepId === 1) {
    return (
      <div className="demo-panel flex min-h-[280px] flex-col items-center justify-center gap-4 p-8">
        <div className="demo-surface flex items-center gap-3 rounded-xl border border-[var(--demo-border)] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-brand-600/20 px-3 py-1.5 ring-2 ring-brand-500">
            <Image src="/logo.png" alt="" width={20} height={20} className="rounded" />
            <span className="text-xs font-medium text-brand-400">Which Font?</span>
          </div>
        </div>
        <p className="text-center text-sm text-zinc-400">
          Click the extension icon to activate inspection mode
        </p>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FiChrome size={32} className="text-brand-400" />
        </motion.div>
      </div>
    );
  }

  if (stepId === 2) {
    return (
      <div className="demo-panel relative min-h-[280px] p-8">
        <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
          Example page
        </p>
        <div className="relative inline-block">
          <h3 className="text-xl font-bold text-white">
            Beautiful Typography Inspection
          </h3>
          <HighlightRing className="inset-[-4px]" />
        </div>
        <p className="mt-3 max-w-sm text-sm text-zinc-400">
          Hover over any element to see a glowing highlight outline.
        </p>
        <AnimatedCursor x={180} y={40} />
        <FiMousePointer
          size={16}
          className="absolute bottom-6 right-6 text-brand-400 opacity-50"
        />
      </div>
    );
  }

  return (
    <div className="demo-panel relative flex min-h-[280px] items-center justify-center p-6">
      <div className="relative">
        <p className="mb-4 text-center text-sm text-zinc-400">
          Click to open the floating inspector
        </p>
        <InspectCardDemo data={demoInspectData} />
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const goToStep = useCallback((index: number) => {
    setActiveIndex(index % howItWorksSteps.length);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % howItWorksSteps.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  const activeStep = howItWorksSteps[activeIndex];

  return (
    <section
      id="how-it-works"
      className="section-dots border-t border-border-subtle py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div {...fadeUp} className="mb-12 md:mb-14">
          <SectionHeader
            eyebrow="How it works"
            title="Three steps to typography clarity"
            description="Activate, hover, and inspect — typography details in seconds."
            align="center"
          />
        </motion.div>

        {/* Desktop */}
        <div
          className="hidden lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative flex flex-col">
            <div className="absolute bottom-6 left-[19px] top-6 w-0.5 rounded-full bg-border-subtle" />
            <motion.div
              className="absolute left-[19px] top-6 w-0.5 rounded-full bg-brand-600"
              animate={{
                height: `${((activeIndex + 1) / howItWorksSteps.length) * 100}%`,
                maxHeight: "calc(100% - 48px)",
              }}
              transition={{ duration: reduced ? 0 : 0.4 }}
            />

            {howItWorksSteps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => goToStep(index)}
                  className={cn(
                    "relative flex gap-4 py-5 text-left transition-opacity",
                    isActive ? "opacity-100" : "opacity-55 hover:opacity-100",
                  )}
                >
                  <span
                    className={cn(
                      "z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all",
                      isActive
                        ? "scale-108 border-brand-600 bg-brand-600 text-white"
                        : "border-border-subtle bg-surface-muted text-muted",
                    )}
                  >
                    {step.id}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "text-lg font-semibold",
                        isActive ? "text-foreground" : "text-muted",
                      )}
                    >
                      {step.label}
                    </span>
                    {isActive && (
                      <span className="text-sm text-muted">{step.description}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-2xl border border-border-subtle shadow-lg shadow-brand-600/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -16 }}
                transition={{ duration: reduced ? 0 : 0.35 }}
              >
                <StepDemoPanel stepId={activeStep.id} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="flex flex-col gap-4 lg:hidden">
          {howItWorksSteps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={step.id}
                className={cn(
                  "overflow-hidden rounded-xl border bg-background transition-all",
                  isActive ? "border-brand-500/30 shadow-lg shadow-brand-600/5" : "border-border-subtle",
                )}
              >
                <button
                  type="button"
                  onClick={() => goToStep(index)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      isActive ? "bg-brand-600 text-white" : "bg-surface-muted text-muted",
                    )}
                  >
                    {step.id}
                  </span>
                  <span className="font-semibold">{step.label}</span>
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    >
                      <div className="px-4 pb-4">
                        <p className="mb-3 text-sm text-muted">{step.description}</p>
                        <div className="overflow-hidden rounded-lg border border-border-subtle">
                          <StepDemoPanel stepId={step.id} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
