"use client";

import { ProductShowcaseDemo } from "@/components/demo/ProductShowcaseDemo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { showcaseBullets } from "@/content/landing";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiCheck } from "react-icons/fi";

export function ProductShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -36]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.98]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5], [reduced ? 0 : -0.6, 0]);

  return (
    <section
      id="showcase"
      ref={ref}
      className="border-t border-border-subtle bg-background/40 py-16 backdrop-blur-sm md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <motion.div {...fadeUp}>
            <SectionHeader
              eyebrow="Product showcase"
              title="See it in action"
              description="A floating inspector that reveals every typography detail — family, weight, size, and more — without leaving the page."
            />
            <motion.ul
              className="mt-8 flex flex-col gap-3"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-80px" }}
            >
              {showcaseBullets.map((bullet, index) => (
                <motion.li
                  key={bullet}
                  variants={staggerItem}
                  className="flex items-start gap-3"
                  whileInView={
                    reduced
                      ? undefined
                      : {
                          x: [0, 4, 0],
                          transition: {
                            delay: 0.6 + index * 0.15,
                            duration: 0.5,
                          },
                        }
                  }
                  viewport={{ once: true }}
                >
                  <motion.span
                    className="feature-icon-wrap mt-0.5 shrink-0 p-1.5"
                    whileInView={
                      reduced
                        ? undefined
                        : {
                            scale: [1, 1.12, 1],
                            transition: {
                              delay: 0.7 + index * 0.15,
                              duration: 0.45,
                            },
                          }
                    }
                    viewport={{ once: true }}
                  >
                    <FiCheck size={14} />
                  </motion.span>
                  <span className="font-medium">{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            style={{ y: imageY, scale: imageScale, rotate: imageRotate }}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            <ProductShowcaseDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
