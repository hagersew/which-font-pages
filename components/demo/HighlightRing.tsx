"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

interface HighlightRingProps {
  className?: string;
  visible?: boolean;
  pulse?: boolean;
}

export function HighlightRing({
  className,
  visible = true,
  pulse = false,
}: HighlightRingProps) {
  if (!visible) return null;

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute highlight-ring",
        pulse && "highlight-ring-pulse",
        className,
      )}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
