"use client";

import {
  Bot,
  Code2,
  MonitorSmartphone,
  Database,
  Laptop,
  ShieldCheck,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { useLang } from "./LanguageProvider";
import { FadeUp, SectionHead } from "./Reveal";
import { scrollToId } from "./SmoothScroll";

const ICONS: Record<string, React.ElementType> = {
  ai: Bot,
  langs: Code2,
  ui: MonitorSmartphone,
  server: Database,
  desktop: Laptop,
  test: ShieldCheck,
  tools: Wrench,
};

const SPANS: Record<string, string> = {
  ai: "md:col-span-2 md:row-span-2",
  langs: "md:col-span-2",
  ui: "md:col-span-2",
  server: "md:col-span-1",
  desktop: "md:col-span-1",
  test: "md:col-span-2",
  tools: "md:col-span-2",
};

export default function SkillsBento() {
  const { t } = useLang();

  return (
    <section id="competences" className="relative bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead
          index={t.skills.index}
          eyebrow={t.skills.title}
          title={
            <>
              {t.skills.title}
              <span className="text-violet">.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
          {t.skills.groups.map((g, i) => {
            const Icon = ICONS[g.id] ?? Wrench;
            const isFeature = g.id === "ai";
            return (
              <FadeUp key={g.id} delay={i * 0.05} className={SPANS[g.id]}>
                <article
                  className={`group flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 md:p-7 ${
                    isFeature
                      ? "border border-white/12 bg-night text-bone hover:border-white/25"
                      : "border border-ink/10 bg-card-cream hover:border-ink/25"
                  }`}
                >
                  <div className="relative mb-5 flex items-center justify-between">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isFeature ? "bg-white/10 text-violet-soft" : "bg-ink/[0.06] text-violet"
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                        isFeature ? "text-bone-soft" : "text-ink-soft/70"
                      }`}
                    >
                      0{i}
                    </span>
                  </div>

                  <h3 className={`relative text-lg font-semibold tracking-tight md:text-xl ${isFeature ? "text-bone" : "text-ink"}`}>
                    {g.t}
                  </h3>

                  {"p" in g && g.p && (
                    <p className={`relative mt-2.5 text-sm leading-relaxed ${isFeature ? "text-bone-soft" : "text-ink-soft"}`}>
                      {g.p}
                    </p>
                  )}

                  <ul className="relative mt-auto flex flex-wrap gap-2 pt-5">
                    {g.chips.map((c) => (
                      <li
                        key={c}
                        className={`rounded-md px-3 py-1 font-mono text-[10px] tracking-wide ${
                          isFeature
                            ? "border border-white/15 bg-white/[0.06] text-bone/85"
                            : "border border-ink/12 bg-paper text-ink-soft"
                        }`}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeUp>
            );
          })}

          {/* cta cell */}
          <FadeUp delay={0.35} className="md:col-span-2">
            <button
              onClick={() => scrollToId("contact")}
              className="press group flex h-full w-full items-center justify-between gap-4 rounded-2xl border border-ink/12 bg-card-cream p-6 text-left hover:border-violet md:p-7"
            >
              <div>
                <p className="font-display text-lg italic tracking-tight text-ink md:text-xl">
                  {t.contact.lead}
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-violet">
                  {t.nav.cta} →
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
