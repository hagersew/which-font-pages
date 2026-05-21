"use client";

import { CopyButton } from "@/components/ui/CopyButton";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { FiCopy, FiDownload, FiMapPin, FiX } from "react-icons/fi";

export type InspectData = {
  tagName: string;
  className: string;
  typography: {
    family: string;
    size: string;
    weight: string;
    style: string;
    lineHeight?: string;
    letterSpacing?: string;
  };
};

interface PropertyRowProps {
  label: string;
  value: string;
}

function PropertyRow({ label, value }: PropertyRowProps) {
  return (
    <div className="flex items-center justify-between gap-2 py-1.5">
      <div className="min-w-0 flex-1">
        <span className="text-xs font-medium text-zinc-500">{label}</span>
        <p className="truncate font-mono text-sm text-zinc-900">{value}</p>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

interface InspectCardDemoProps {
  data: InspectData;
  className?: string;
  floating?: boolean;
  showCopiedFlash?: boolean;
}

export function InspectCardDemo({
  data,
  className,
  floating = false,
  showCopiedFlash = false,
}: InspectCardDemoProps) {
  return (
    <motion.div
      className={cn(
        "inspector-card w-[280px] overflow-hidden",
        floating && "animate-float",
        className,
      )}
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-sm font-semibold text-zinc-900">
            &lt;{data.tagName}&gt;
          </p>
          <p className="truncate font-mono text-xs text-zinc-500">{data.className}</p>
        </div>
        <div className="flex shrink-0 gap-0.5">
          {[FiMapPin, FiCopy, FiDownload, FiX].map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="rounded p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600"
              tabIndex={-1}
              aria-hidden
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      <div className="px-3 py-2">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          Typography
        </p>
        <PropertyRow label="Family" value={data.typography.family} />
        <PropertyRow label="Size" value={data.typography.size} />
        <PropertyRow label="Weight" value={data.typography.weight} />
        <PropertyRow label="Style" value={data.typography.style} />
      </div>

      <div className="flex gap-2 border-t border-zinc-200 px-3 py-2.5">
        <button
          type="button"
          className={cn(
            "relative flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-500",
            showCopiedFlash && "ring-2 ring-green-400 ring-offset-1",
          )}
        >
          <FiCopy size={12} />
          {showCopiedFlash ? "Copied!" : "Copy styles"}
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
        >
          <FiDownload size={12} />
          Export
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {showCopiedFlash ? "Styles copied" : ""}
      </span>
    </motion.div>
  );
}
