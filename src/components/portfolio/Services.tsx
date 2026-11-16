"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { FadeUp, SectionHead } from "./Reveal";
import { scrollToId } from "./SmoothScroll";

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="relative overflow-hidden bg-night py-24 text-bone md:py-36">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead
          index={t.services.index}
          eyebrow={t.services.title}
          dark
          title={
            <>
              {t.services.title}{" "}
              <span className="font-display font-light italic text-violet-soft">{t.services.suffix}</span>
            </>
          }
        />

        <FadeUp>
          <div className="border-t border-white/10">
            {t.services.items.map((s, i) => (
              <ServiceRow
                key={s.n}
                n={s.n}
                title={s.t}
                desc={s.p}
                onClick={() => scrollToId("contact")}
              />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function ServiceRow({
  n,
  title,
  desc,
  onClick,
}: {
  n: string;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative cursor-pointer border-b border-white/10"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={title}
    >
      {/* sweep — neutral surface step */}
      <span
        className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-white/[0.04] transition-transform duration-300 ease-out group-hover:scale-y-100"
        aria-hidden
      />

      <div className="relative flex flex-col gap-4 py-9 md:grid md:grid-cols-12 md:items-center md:gap-8 md:py-12">
        <span className="font-mono text-xs tracking-[0.2em] text-bone-soft md:col-span-1">
          {n}
        </span>
        <h3 className="font-display text-[clamp(1.7rem,4vw,3.2rem)] leading-none tracking-tight text-bone transition-colors duration-300 group-hover:text-white md:col-span-5">
          {title}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-bone-soft md:col-span-5 md:text-[15px]">
          {desc}
        </p>
        <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-[transform,background-color,border-color,color] duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-bone group-hover:text-night md:col-span-1 md:flex">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
