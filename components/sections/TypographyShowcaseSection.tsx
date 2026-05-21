"use client";

import { CopyButton } from "@/components/ui/CopyButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cssSnippet, typographyProperties } from "@/content/landing";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, scaleIn, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiType } from "react-icons/fi";

const CSS_LINES = cssSnippet.trim().split("\n");
const STAT_VALUES = ["Inter", "14px", "400"] as const;

export function TypographyShowcaseSection() {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, margin: "-120px" });
  const [activeProp, setActiveProp] = useState(0);
  const [cssLineTick, setCssLineTick] = useState(0);
  const revealedLines = reduced ? CSS_LINES.length : cssLineTick;

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => {
      setActiveProp((i) => (i + 1) % typographyProperties.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  useEffect(() => {
    if (!inView || reduced) return;
    let line = 0;
    const id = window.setInterval(() => {
      line += 1;
      setCssLineTick(line);
      if (line >= CSS_LINES.length) window.clearInterval(id);
    }, 380);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  return (
    <section className="border-t border-border-subtle bg-background/40 py-16 backdrop-blur-sm md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div {...fadeUp}>
          <SectionHeader
            eyebrow="Typography details"
            title="Every property, beautifully displayed"
            description="Font family, size, weight, spacing, colors, and more — all in one elegant inspector."
            align="center"
            className="mb-12 md:mb-16"
          />
        </motion.div>

        <div ref={panelRef} className="grid gap-8 lg:grid-cols-2">
          <motion.div
            className="inspector-card relative overflow-hidden p-4 md:p-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              className="pointer-events-none absolute left-0 w-1 rounded-full bg-brand-500"
              style={{ top: 0, height: "100%" }}
              animate={{
                top: `${(activeProp / typographyProperties.length) * 100}%`,
                height: `${100 / typographyProperties.length}%`,
              }}
              transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />

            <div className="mb-4 flex items-center gap-2">
              <motion.span
                animate={reduced ? undefined : { rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <FiType className="text-brand-600" />
              </motion.span>
              <span className="text-sm font-semibold text-zinc-900">
                Computed Properties
              </span>
            </div>
            <div className="divide-y divide-zinc-100">
              {typographyProperties.map((prop, index) => {
                const isActive = index === activeProp && inView;
                return (
                  <motion.div
                    key={prop.label}
                    variants={staggerItem}
                    className={cn(
                      "relative flex items-center justify-between gap-3 rounded-md py-3 px-2 -mx-2 transition-colors duration-300",
                      isActive && "bg-brand-500/8",
                    )}
                    animate={
                      reduced || !isActive
                        ? undefined
                        : { x: [0, 3, 0] }
                    }
                    transition={{ duration: 0.4 }}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-zinc-500">{prop.label}</p>
                      <motion.p
                        className="truncate font-mono text-sm text-zinc-900"
                        animate={
                          reduced || !isActive
                            ? undefined
                            : { color: ["#18181b", "#4f46e5", "#18181b"] }
                        }
                        transition={{ duration: 0.6 }}
                      >
                        {prop.value}
                      </motion.p>
                    </div>
                    <CopyButton
                      value={
                        prop.cssKey === "selector"
                          ? prop.value
                          : `${prop.cssKey}: ${prop.value};`
                      }
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            {...scaleIn}
            transition={{ ...scaleIn.transition, delay: 0.12 }}
            className="flex flex-col gap-4"
          >
            <motion.div
              className="glass-card relative overflow-hidden p-4 md:p-6"
              whileHover={reduced ? undefined : { y: -2 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-brand-500/5 to-transparent"
                animate={
                  reduced
                    ? undefined
                    : { x: ["-100%", "100%"] }
                }
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                aria-hidden
              />
              <div className="relative mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">CSS Output</span>
                <CopyButton
                  value={cssSnippet}
                  className="text-muted hover:bg-hover hover:text-foreground"
                />
              </div>
              <pre className="code-block relative overflow-x-auto rounded-lg p-4 font-mono text-xs leading-relaxed">
                <code>
                  {CSS_LINES.map((line, i) => (
                    <motion.span
                      key={line}
                      className="block"
                      initial={reduced ? false : { opacity: 0, x: -8 }}
                      animate={{
                        opacity: i < revealedLines ? 1 : 0.25,
                        x: i < revealedLines ? 0 : -8,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </code>
              </pre>
            </motion.div>

            <div className="grid grid-cols-3 gap-3">
              {(["Family", "Size", "Weight"] as const).map((label, i) => (
                <motion.div
                  key={label}
                  className="glass-card p-4 text-center"
                  initial={{ opacity: 0, y: 16, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
                  whileHover={
                    reduced
                      ? undefined
                      : { y: -4, scale: 1.03, transition: { duration: 0.2 } }
                  }
                  animate={
                    reduced
                      ? undefined
                      : {
                          boxShadow: [
                            "0 0 0 rgba(99, 102, 241, 0)",
                            "0 8px 24px rgba(99, 102, 241, 0.12)",
                            "0 0 0 rgba(99, 102, 241, 0)",
                          ],
                        }
                  }
                  style={{ animationDelay: `${i * 0.8}s` }}
                >
                  <p className="text-xs text-muted">{label}</p>
                  <motion.p
                    className="mt-1 font-mono text-sm font-semibold text-brand-400"
                    animate={
                      reduced
                        ? undefined
                        : { scale: [1, 1.06, 1] }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.35,
                      ease: "easeInOut",
                    }}
                  >
                    {STAT_VALUES[i]}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
