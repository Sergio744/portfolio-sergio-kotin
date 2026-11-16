"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power4.out";

/** Scroll-triggered staggered word reveal (masked lines of words). */
export function Words({
  children,
  className,
  delay = 0,
  stagger = 0.028,
  as: Tag = "p",
}: {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "p" | "h2" | "h3" | "span" | "div";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-w]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      return;
    }
    gsap.set(words, { yPercent: 120, opacity: 0 });
    const tween = gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      ease: EASE,
      stagger,
      delay,
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [children, delay, stagger]);

  const raw = typeof children === "string" ? children : String(children ?? "");
  const words = raw.split(" ");
  return (
    <Tag ref={ref as React.Ref<HTMLParagraphElement>} className={className} aria-label={raw}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <span data-w className="inline-block">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Scroll-triggered fade+rise for a block. */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.set(el, { y, opacity: 0 });
    const tween = gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: EASE,
      scrollTrigger: { trigger: el, start: "top 86%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Numbered section heading: mono eyebrow + display title. */
export function SectionHead({
  index,
  eyebrow,
  title,
  dark = false,
  className,
  right,
}: {
  index: string;
  eyebrow: string;
  title?: React.ReactNode;
  dark?: boolean;
  className?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className={cn("mb-14 md:mb-20", className)}>
      <FadeUp>
        <div className="flex items-center gap-4">
          <span className={cn("eyebrow", dark ? "text-bone-soft" : "text-ink-soft")}>
            {index} — {eyebrow}
          </span>
          <span
            className={cn("h-px flex-1", dark ? "bg-white/15" : "bg-ink/15")}
            aria-hidden
          />
          {right}
        </div>
      </FadeUp>
      {title && (
        <FadeUp delay={0.08}>
          <h2
            className={cn(
              "font-display mt-6 text-[clamp(2.4rem,6.5vw,5.5rem)] leading-[0.95] tracking-tight",
              dark ? "text-bone" : "text-ink"
            )}
          >
            {title}
          </h2>
        </FadeUp>
      )}
    </div>
  );
}

/** Fades the whole element in on mount (for content that must not flash). */
export function Appear({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 14 });
    gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay, ease: EASE });
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
