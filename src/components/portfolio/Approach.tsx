"use client";

import { useLang } from "./LanguageProvider";
import { FadeUp, SectionHead } from "./Reveal";

/**
 * Three stacked sticky cards that pile up while scrolling —
 * the classic award-pattern, here on warm paper.
 */
export default function Approach() {
  const { t } = useLang();

  return (
    <section id="approche" className="relative bg-paper-deep py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead
                index={t.approach.index}
                eyebrow={t.approach.title}
                className="mb-6"
                title={
                  <>
                    {t.approach.title}
                    <span className="text-violet">.</span>
                  </>
                }
              />
              <FadeUp delay={0.1}>
                <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft md:text-base">
                  {t.approach.subtitle}
                </p>
                <div className="mt-8 hidden items-center gap-3 lg:flex">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20">
                    <span className="block h-2 w-2 rounded-full bg-violet" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    Scroll ↓
                  </span>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* stacking cards */}
          <div className="lg:col-span-7">
            <div className="space-y-6 lg:space-y-8">
              {t.approach.steps.map((step, i) => (
                <div
                  key={step.n}
                  className="lg:sticky"
                  style={{ top: `${96 + i * 28}px`, zIndex: i + 1 }}
                >
                  <article className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-card-cream p-7 shadow-[0_18px_50px_-30px_rgba(23,20,15,0.35)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-30px_rgba(23,20,15,0.45)] md:p-10">
                    {/* hover wash — neutral surface step */}
                    <span className="pointer-events-none absolute inset-0 bg-ink/[0.025] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex items-start justify-between gap-6">
                      <span className="text-stroke font-display text-[clamp(3rem,6vw,5rem)] leading-none text-ink/70">
                        {step.n}
                      </span>
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-violet" aria-hidden />
                    </div>

                    <h3 className="font-display relative mt-6 text-2xl tracking-tight text-ink md:text-4xl">
                      {step.t}
                    </h3>
                    <p className="relative mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft md:text-base">
                      {step.p}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
