"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

interface AnimatedCursorProps {
  x: number;
  y: number;
  clicking?: boolean;
  className?: string;
  /** Position unit — use `%` for responsive overlays on images */
  unit?: "px" | "%";
}

export function AnimatedCursor({
  x,
  y,
  clicking = false,
  className,
  unit = "px",
}: AnimatedCursorProps) {
  const position = unit === "%" ? { left: `${x}%`, top: `${y}%` } : { left: x, top: y };

  return (
    <motion.div
      className={cn("pointer-events-none absolute z-50", className)}
      animate={{ ...position, scale: clicking ? 0.9 : 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={position}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
          fill="#fff"
          stroke="#18181b"
          strokeWidth="1.5"
        />
      </svg>
    </motion.div>
  );
}
