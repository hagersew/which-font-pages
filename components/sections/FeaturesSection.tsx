"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { features } from "@/content/landing";
import { cn } from "@/lib/cn";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="section-dots border-t border-border-subtle py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to inspect typography"
          description="A premium developer tool built for precision, speed, and clarity."
          align="center"
          className="mb-12 md:mb-16"
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={staggerItem}>
                <div
                  className={cn(
                    "glass-card group h-full p-6 transition-all duration-300",
                    "hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-600/10",
                  )}
                >
                  <div className="feature-icon-wrap mb-4 transition-transform group-hover:scale-110">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
