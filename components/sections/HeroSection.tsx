'use client';

import { HeroDemo } from '@/components/demo/HeroDemo';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { StoreBadgeLinks } from '@/components/ui/StoreBadgeLinks';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { easeOut } from '@/lib/motion';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const demoY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 40]);

  const items = [
    { delay: 0, key: 'badge' },
    { delay: 0.1, key: 'heading' },
    { delay: 0.2, key: 'text' },
    { delay: 0.3, key: 'cta' },
  ];

  return (
    <section
      ref={ref}
      className="grain hero-mesh relative overflow-hidden border-b border-border-subtle pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="hero-glow hero-glow-1" aria-hidden />
      <div className="hero-glow hero-glow-2" aria-hidden />
      <div className="relative z-[2] mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <motion.div
              key={item.key}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                ease: easeOut,
                delay: reduced ? 0 : item.delay,
              }}
            >
              {item.key === 'badge' && (
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/30 bg-brand-600/10 px-3 py-1 text-xs font-medium text-brand-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
                  Available for Chrome & Firefox
                </div>
              )}
              {item.key === 'heading' && (
                <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                  Identify Any{' '}
                  <span className="gradient-underline gradient-text">Font</span>{' '}
                  Instantly
                </h1>
              )}
              {item.key === 'text' && (
                <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">
                  &ldquo;Which Font?&rdquo; helps developers and designers
                  instantly inspect fonts, typography, and styling information
                  directly from any webpage.
                </p>
              )}
              {item.key === 'cta' && (
                <div className="flex flex-wrap items-center gap-4">
                  <StoreBadgeLinks variant="light" />
                  <PrimaryButton
                    variant="secondary"
                    className="px-6 py-3 text-base"
                    onClick={() =>
                      document
                        .getElementById('how-it-works')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                  >
                    See How It Works
                  </PrimaryButton>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div style={{ y: demoY }}>
          <HeroDemo />
        </motion.div>
      </div>
    </section>
  );
}
