"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { stats, testimonials, trustedBy } from "@/content/landing";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

export function SocialProofSection() {
  return (
    <section className="section-dots border-t border-border-subtle py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div {...fadeUp} className="mb-12">
          <SectionHeader
            eyebrow="Social proof"
            title="Trusted by designers & developers"
            description="Join thousands who inspect typography faster with Which Font?"
            align="center"
          />
        </motion.div>

        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="glass-card flex min-w-[120px] flex-col items-center px-8 py-5"
            >
              <span className="text-2xl font-bold text-brand-400">{stat.value}</span>
              <span className="text-sm text-muted">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mb-12 grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.author}
              variants={staggerItem}
              className="glass-card flex h-full flex-col p-6"
            >
              <div className="mb-3 flex gap-0.5 text-brand-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer>
                <cite className="not-italic">
                  <span className="block text-sm font-semibold">{t.author}</span>
                  <span className="text-xs text-muted">{t.role}</span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            Trusted by teams at
          </span>
          {trustedBy.map((name) => (
            <span
              key={name}
              className="trusted-logo text-sm font-semibold transition-colors"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
