"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export function PageBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="page-bg-base" />

      <div className={cn("page-bg-mesh", !reduced && "page-bg-mesh-animated")} />

      <div className="page-bg-grid" />
      <div className="page-bg-baseline" />

      <div className={cn("page-bg-orbs", !reduced && "page-bg-orbs-animated")}>
        <div className="page-bg-orb page-bg-orb-1" />
        <div className="page-bg-orb page-bg-orb-2" />
        <div className="page-bg-orb page-bg-orb-3" />
      </div>

      <div className="page-bg-glyphs">
        <span>Aa</span>
        <span>Bb</span>
        <span>Ty</span>
        <span>Ff</span>
      </div>

      <div className="page-bg-vignette" />
      <div className="page-bg-noise" />
    </div>
  );
}
