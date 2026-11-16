"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "./LanguageProvider";

/**
 * Intro preloader: counts to 100, name letters stagger in,
 * then the curtain wipes up. Skipped for reduced-motion users.
 */
export default function Preloader({ onDone }: { onDone?: () => void }) {
  const { t } = useLang();
  const [gone, setGone] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = window.setTimeout(() => {
        setGone(true);
        onDone?.();
      }, 0);
      return () => window.clearTimeout(id);
    }

    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const DURATION = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out expo for satisfying deceleration
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      // write straight to the DOM — no re-render per frame
      if (countRef.current) countRef.current.textContent = String(Math.round(eased * 100));
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setGone(true);
          document.documentElement.style.overflow = "";
          if (!doneRef.current) {
            doneRef.current = true;
            onDone?.();
          }
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [onDone]);

  const name = "Sergio Kotin";

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-night"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden px-6">
            <div className="flex">
              {name.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.08 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`whitespace-pre text-[clamp(2rem,7vw,4.5rem)] leading-none tracking-tight text-bone ${
                    i > 6 ? "font-display italic font-light" : "font-body font-bold uppercase"
                  }`}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="eyebrow mt-4 text-bone-soft"
          >
            {t.preloader.label}
          </motion.p>

          <div className="pointer-events-none absolute bottom-8 left-0 right-0 px-6 md:px-10">
            <div className="flex items-end justify-between">
              <div className="h-px w-full max-w-[38vw] self-center overflow-hidden bg-white/10">
                <div
                  ref={barRef}
                  className="h-full w-full origin-left scale-x-0 bg-violet"
                />
              </div>
              <span className="font-mono text-5xl font-medium tabular-nums text-bone/90 md:text-7xl">
                <span ref={countRef}>0</span>
                <span className="text-xl text-bone/40 md:text-2xl">%</span>
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
