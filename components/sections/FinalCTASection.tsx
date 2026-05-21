"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { goToInstall } from "@/content/landing";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOut } from "@/lib/motion";
import { motion } from "framer-motion";
import { FiChrome } from "react-icons/fi";

export function FinalCTASection() {
  const reduced = useReducedMotion();

  return (
    <section className="border-t border-border-subtle py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          className="cta-gradient-bg relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16 md:py-20"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <div className="grain pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative z-[1]">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Start Inspecting Fonts Today
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-base text-white/80 md:text-lg">
              Install &ldquo;Which Font?&rdquo; and instantly discover typography
              details across the web.
            </p>
            <PrimaryButton
              onClick={goToInstall}
              className="bg-white px-8 py-3.5 text-base text-brand-700 shadow-xl hover:bg-white/90 hover:text-brand-600"
            >
              <FiChrome size={20} />
              Add to Chrome
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
