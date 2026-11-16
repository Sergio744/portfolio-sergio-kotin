"use client";

import { useLang } from "./LanguageProvider";

function MarqueeRow({
  items,
  reverse = false,
  duration = 46,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="marquee-paused relative flex overflow-hidden">
      <div
        className={`marquee-track ${reverse ? "reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-mono text-sm uppercase tracking-[0.18em] text-bone/70 md:text-base">
                  {item}
                </span>
                <span className="text-lg leading-none text-bone/30">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Infinite tech marquee — two opposite rows with a ✦ separator,
 * styled after scrolltide's ticker. Dark band bridging hero → profile.
 */
export default function TechMarquee() {
  const { t } = useLang();

  return (
    <section
      aria-label="Tech stack"
      className="relative overflow-hidden border-y border-white/10 bg-night py-7 md:py-9"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night to-transparent md:w-40" />
      <div className="space-y-4 opacity-95">
        <MarqueeRow items={t.marquee.items} duration={48} />
        <MarqueeRow items={t.marquee.items} reverse duration={64} />
      </div>
    </section>
  );
}
