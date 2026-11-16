"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";
import { scrollToId } from "./SmoothScroll";
import { useLang } from "./LanguageProvider";
import { Appear } from "./Reveal";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const EASE = "power4.out";

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  /* ── intro timeline after the preloader ─────────────── */
  useEffect(() => {
    if (!ready || playedRef.current) return;
    playedRef.current = true;
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chars = root.querySelectorAll<HTMLElement>("[data-char]");
    const orb = root.querySelector<HTMLElement>("[data-orb]");
    const fades = root.querySelectorAll<HTMLElement>("[data-hero-fade]");

    if (reduce) {
      gsap.set([chars, orb, fades], { clearProps: "all", yPercent: 0, y: 0, opacity: 1, scale: 1 });
      return;
    }

    gsap.set(chars, { yPercent: 115 });
    gsap.set(orb, { scale: 0.6, rotate: -90, opacity: 0 });
    gsap.set(fades, { opacity: 0, y: 26 });

    const tl = gsap.timeline({ defaults: { ease: EASE } });
    tl.to(chars, { yPercent: 0, duration: 1.15, stagger: 0.05 }, 0.05)
      .to(orb, { scale: 1, rotate: 0, duration: 1.0, ease: "elastic.out(1, 0.7)" }, 0.55)
      .to(orb, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0.55)
      .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 }, 0.5);
  }, [ready]);

  /* ── scroll parallax ────────────────────────────────── */
  useEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || !content) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom top",
      scrub: true,
      animation: gsap
        .timeline()
        .to(content, { y: -90, opacity: 0.15, ease: "none" }, 0)
        .to(root.querySelector("[data-canvas]"), { scale: 1.08, opacity: 0.35, ease: "none" }, 0),
    });
    return () => st.kill();
  }, []);

  const sergio = "Sergio";
  const kotin = "KOTIN".split("");

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-night"
    >
      <div data-canvas className="absolute inset-0">
        <HeroCanvas />
      </div>

      {/* content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pb-28 pt-32 md:px-10 md:pb-24"
      >
        {/* status row */}
        <div data-hero-fade className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 md:mb-10">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="dot-live h-1.5 w-1.5 rounded-full bg-[#2ecc71]" />
            <span className="text-[12px] font-medium tracking-wide text-bone">{t.hero.kicker}</span>
          </span>
          <span className="eyebrow text-bone-soft">{t.hero.loc}</span>
        </div>

        {/* monumental name */}
        <h1 className="font-display select-none leading-[0.88] tracking-tight text-bone" aria-label="Sergio Kotin">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="sr-only">Sergio Kotin</span>
            <span aria-hidden className="flex">
              {sergio.split("").map((c, i) => (
                <span
                  key={i}
                  data-char
                  className="inline-block text-[clamp(3rem,12.5vw,10.5rem)] font-light italic"
                >
                  {c}
                </span>
              ))}
            </span>
          </span>
          <span className="mt-1 block overflow-hidden pb-[0.08em] md:mt-2">
            <span
              aria-hidden
              className="flex items-center font-body text-[clamp(3rem,12.5vw,10.5rem)] font-bold uppercase tracking-[-0.02em]"
            >
              {kotin.map((c, i) =>
                c === "O" ? (
                  <span key={i} className="inline-block overflow-hidden">
                    <span
                      data-orb
                      data-char
                      className="grad-violet mx-[0.06em] inline-block h-[0.72em] w-[0.72em] shrink-0 rounded-full align-baseline shadow-[0_0_60px_rgba(127,29,255,0.5)]"
                    >
                      <span className="block h-full w-full rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.55),transparent_42%)]" />
                    </span>
                  </span>
                ) : (
                  <span key={i} className="inline-block overflow-hidden">
                    <span data-char className="inline-block">
                      {c}
                    </span>
                  </span>
                )
              )}
            </span>
          </span>
        </h1>

        {/* role + tagline + ctas */}
        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between md:gap-14">
          <div data-hero-fade className="max-w-xl">
            <p className="font-display text-lg italic text-bone/90 md:text-xl">{t.hero.role}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-bone-soft md:text-base">
              {t.hero.taglineA}{" "}
              <span className="font-semibold text-violet-soft">{t.hero.taglineHl}</span>{" "}
              {t.hero.taglineB} <span className="font-semibold text-bone">Grada</span>
              {t.hero.taglineC}
              <span className="font-semibold text-bone">EcoCompta</span>
              {t.hero.taglineD}
              <span className="font-semibold text-bone">KlassIn</span>
              {t.hero.taglineE}
              <span className="font-semibold text-bone">Neon Rift</span>.
            </p>
          </div>

          <div data-hero-fade className="flex flex-wrap items-center gap-4">
            <Magnetic strength={0.3}>
              <button
                onClick={() => scrollToId("contact")}
                className="press group relative overflow-hidden rounded-full bg-bone px-7 py-4 text-sm font-semibold text-night"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {t.hero.cta1}
                </span>
                <span className="absolute inset-0 translate-y-full bg-violet transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                onClick={() => scrollToId("projets")}
                className="press group rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-bone hover:border-transparent hover:bg-white/10"
              >
                {t.hero.cta2}
              </button>
            </Magnetic>
          </div>
        </div>

        {/* quick links */}
        <div
          data-hero-fade
          className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-5 font-mono text-[11px] tracking-wide text-bone-soft sm:flex-row sm:gap-8 md:mt-16"
        >
          <a
            href="https://klassin-wine.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="u-sweep w-fit hover:text-bone"
          >
            ↳ {t.hero.linkKlassin}
          </a>
          <a
            href="https://github.com/Sergio744"
            target="_blank"
            rel="noreferrer"
            className="u-sweep w-fit hover:text-bone"
          >
            ↳ {t.hero.linkGithub}
          </a>
          <a href="tel:+2290199023047" className="u-sweep w-fit hover:text-bone">
            ↳ {t.hero.linkPhone}
          </a>
        </div>
      </div>

      {/* side captions */}
      <div data-hero-fade className="v-text absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 md:right-9 lg:block">
        <span className="eyebrow text-bone-soft/70">{t.hero.fig}</span>
      </div>

      {/* scroll cue */}
      <button
        data-hero-fade
        onClick={() => scrollToId("profil")}
        className="group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-label={t.hero.scroll}
      >
        <span className="eyebrow text-bone-soft transition-colors group-hover:text-bone">
          {t.hero.scroll}
        </span>
        <span className="relative h-9 w-px overflow-hidden bg-white/20">
          <span className="absolute inset-x-0 top-0 h-3 animate-[scrollcue_1.6s_ease-in-out_infinite] bg-gradient-to-b from-violet to-transparent" />
        </span>
        <style>{`@keyframes scrollcue { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }`}</style>
      </button>

      {/* bottom gradient bridge to marquee */}
      <Appear className="relative z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </Appear>
    </section>
  );
}
