"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "./LanguageProvider";
import { FadeUp, SectionHead } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

/* animated key-figures band — real numbers from the shipped tools */
function StatsBand() {
  const { t } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tweens: gsap.core.Tween[] = [];
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el, i) => {
      const target = Number(el.dataset.count || 0);
      const obj = { v: 0 };
      tweens.push(
        gsap.fromTo(obj, { v: 0 }, {
          v: target,
          duration: 1.4,
          delay: i * 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: root, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        })
      );
    });

    return () => {
      tweens.forEach((tw) => {
        tw.scrollTrigger?.kill();
        tw.kill();
      });
    };
  }, []);

  return (
    <FadeUp className="mt-16 md:mt-24">
      <div
        ref={rootRef}
        className="grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/10 bg-card-cream lg:grid-cols-4"
      >
        {t.experience.stats.map((s, i) => (
          <div
            key={s.label}
            className={`group px-6 py-8 transition-colors duration-300 hover:bg-white md:px-8 md:py-10 ${
              i % 2 === 1 ? "border-l border-ink/10" : ""
            } ${i >= 2 ? "max-lg:border-t max-lg:border-ink/10" : ""} ${
              i > 0 ? "lg:border-l lg:border-ink/10" : ""
            }`}
          >
            <p className="font-display text-[clamp(2.6rem,5vw,4.2rem)] leading-none tracking-tight text-ink tabular-nums">
              <span data-count={s.v}>{s.v}</span>
              <span className="text-violet">{s.suffix}</span>
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-ink-soft md:text-[11px]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </FadeUp>
  );
}

export default function Experience() {
  const { t } = useLang();

  return (
    <section id="experience" className="relative bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead index={t.experience.index} eyebrow={t.experience.title} />

        <div className="grid gap-12 lg:grid-cols-12">
          {/* meta card */}
          <div className="lg:col-span-4">
            <FadeUp>
              <div className="lg:sticky lg:top-28">
                <div className="rounded-2xl border border-ink/10 bg-card-cream p-7 md:p-8">
                  <p className="font-display text-2xl leading-tight tracking-tight text-ink md:text-[1.7rem]">
                    {t.experience.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.experience.org}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                    <span>{t.experience.place}</span>
                    <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                    <span className="text-emerald">{t.experience.dates}</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* bullets timeline */}
          <div className="lg:col-span-8">
            <ol className="relative space-y-8 border-l border-ink/15 pl-8 md:pl-12">
              {t.experience.bullets.map((segs, i) => (
                <FadeUp key={i} delay={i * 0.06}>
                  <li className="relative">
                    <span
                      className="absolute -left-[37px] top-2 flex h-[13px] w-[13px] items-center justify-center rounded-full border border-ink/25 bg-paper md:-left-[53px]"
                      aria-hidden
                    >
                      <span
                        className="h-[5px] w-[5px] rounded-full bg-violet"
                      />
                    </span>
                    <p className="max-w-2xl text-[15px] leading-relaxed text-ink md:text-base">
                      {segs.map((s, j) =>
                        s.b ? (
                          <strong key={j} className="font-semibold">
                            {s.t}
                          </strong>
                        ) : (
                          <span key={j}>{s.t}</span>
                        )
                      )}
                    </p>
                  </li>
                </FadeUp>
              ))}
            </ol>

            {/* stack */}
            <FadeUp delay={0.1} className="mt-10">
              <p className="eyebrow mb-4 text-ink-soft">{t.experience.stackT}</p>
              <ul className="flex flex-wrap gap-2">
                {t.experience.stack.map((s) => (
                  <li
                    key={s}
                    className="press rounded-full border border-ink/15 bg-card-cream px-4 py-1.5 font-mono text-[11px] tracking-wide text-ink hover:border-violet hover:text-violet"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>

        <StatsBand />
      </div>
    </section>
  );
}
