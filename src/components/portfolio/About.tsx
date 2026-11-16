"use client";

import { useLang } from "./LanguageProvider";
import { FadeUp, SectionHead, Words } from "./Reveal";

export default function About() {
  const { t } = useLang();

  return (
    <section id="profil" className="relative bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead index={t.about.index} eyebrow={t.about.title} />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* lead text */}
          <div className="lg:col-span-7">
            <Words
              as="p"
              className="font-display text-[clamp(1.45rem,2.9vw,2.5rem)] leading-[1.28] tracking-[-0.01em] text-ink"
            >
              {t.about.leadStart}
            </Words>
            <Words
              as="p"
              className="font-display mt-5 text-[clamp(1.45rem,2.9vw,2.5rem)] leading-[1.28] tracking-[-0.01em] text-ink"
              delay={0.12}
            >
              {t.about.leadEnd}
            </Words>
            <Words
              as="p"
              className="font-display mt-5 text-[clamp(1.45rem,2.9vw,2.5rem)] font-light italic leading-[1.28] text-emerald"
              delay={0.2}
            >
              {t.about.leadHl + "."}
            </Words>

            <FadeUp delay={0.15} className="mt-12 max-w-md">
              <p className="border-l-2 border-gold pl-5 font-display text-lg italic leading-snug text-ink-soft md:text-xl">
                {t.about.quote}
              </p>
            </FadeUp>
          </div>

          {/* side cards */}
          <div className="flex flex-col gap-5 lg:col-span-5 lg:pl-10">
            {/* monogram figure */}
            <FadeUp>
              <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-night p-6 text-bone md:p-8">
                <div className="relative flex items-center justify-between">
                  <span className="font-display text-[clamp(4rem,8vw,6.5rem)] font-light italic leading-none">
                    {t.hero.initials}
                  </span>
                  <div className="text-right">
                    <p className="eyebrow text-bone-soft">{t.about.fig}</p>
                    <p className="mt-2 text-sm text-bone">{t.about.baseT}</p>
                    <p className="mt-1 text-xs leading-relaxed text-bone-soft">{t.about.baseP}</p>
                  </div>
                </div>
              </figure>
            </FadeUp>

            {/* languages */}
            <FadeUp delay={0.08}>
              <div className="rounded-2xl border border-ink/10 bg-card-cream p-6 md:p-7">
                <p className="eyebrow mb-5 text-ink-soft">{t.about.langsT}</p>
                <ul className="space-y-4">
                  {[
                    { name: t.about.langFr, level: t.about.langFrL, w: "100%" },
                    { name: t.about.langFon, level: t.about.langFonL, w: "78%" },
                    { name: t.about.langEn, level: t.about.langEnL, w: "38%" },
                  ].map((l) => (
                    <li key={l.name}>
                      <div className="mb-1.5 flex items-baseline justify-between">
                        <span className="text-sm font-semibold text-ink">{l.name}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                          {l.level}
                        </span>
                      </div>
                      <div className="h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
                        <div
                          className="h-full w-full origin-left rounded-full bg-violet"
                          style={{ transform: `scaleX(${parseFloat(l.w) / 100})` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
