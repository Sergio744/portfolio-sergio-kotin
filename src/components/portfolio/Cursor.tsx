"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Award-style custom cursor: a small ink dot + a lagging ring that
 * morphs over interactive elements ([data-cursor] with optional label).
 * Disabled on touch devices.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !dotRef.current || !ringRef.current) return;

    document.documentElement.classList.add("cursor-enabled");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current!;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      if (target) {
        const text = target.dataset.cursor || "";
        label.textContent = text;
        gsap.to(ring, {
          scale: text ? 2.6 : 1.9,
          backgroundColor: text ? "rgba(127,29,255,0.92)" : "rgba(127,29,255,0.14)",
          borderColor: "rgba(127,29,255,0)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 0.4, duration: 0.3 });
        gsap.to(label, { autoAlpha: text ? 1 : 0, duration: 0.25 });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(127,29,255,0)",
          borderColor: "rgba(127,29,255,0.75)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 1, duration: 0.3 });
        gsap.to(label, { autoAlpha: 0, duration: 0.2 });
      }
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("cursor-enabled");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // render nothing for touch / reduced motion
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-sun opacity-0 mix-blend-difference"
        style={{ backgroundColor: "#ffeb34" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border opacity-0"
        style={{ borderColor: "rgba(127,29,255,0.75)" }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[4.5px] font-medium uppercase tracking-[0.14em] text-white opacity-0"
        />
      </div>
    </div>
  );
}
