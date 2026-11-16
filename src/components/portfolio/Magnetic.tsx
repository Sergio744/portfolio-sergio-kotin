"use client";

import { useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number; // px of attraction
  as?: "button" | "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * Magnetic wrapper: children are gently pulled toward the pointer.
 * Disabled for touch / reduced motion.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.35,
  as = "div",
  href,
  target,
  rel,
  onClick,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: relX * strength, y: relY * strength, duration: 0.5, ease: "power3.out" });
    if (innerRef.current) {
      gsap.to(innerRef.current, {
        x: relX * strength * 0.45,
        y: relY * strength * 0.45,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "power4.out" });
    if (innerRef.current) {
      gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.6, ease: "power4.out" });
    }
  };

  const inner = (
    <span ref={innerRef} className="inline-block">
      {children}
    </span>
  );

  const shared = {
    onClick,
    "aria-label": ariaLabel,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: cn("inline-block", className),
  };

  if (as === "a") {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...shared}
      >
        {inner}
      </a>
    );
  }

  if (as === "button") {
    return (
      <button
        type="button"
        ref={ref as React.Ref<HTMLButtonElement>}
        {...shared}
      >
        {inner}
      </button>
    );
  }

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} {...shared}>
      {inner}
    </div>
  );
}
