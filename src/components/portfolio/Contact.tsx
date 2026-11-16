"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Github, Phone } from "lucide-react";
import Magnetic from "./Magnetic";
import { useLang } from "./LanguageProvider";
import { FadeUp } from "./Reveal";
import { scrollToId } from "./SmoothScroll";

export default function Contact() {
  const { t } = useLang();
  const [clock, setClock] = useState<string>("--:--");

  // live local time — client only to keep SSR markup stable
  useEffect(() => {
    const update = () =>
      setClock(
        new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Porto-Novo",
        })
      );
    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  const whatsapp = "https://wa.me/2290199023047";
  const call = "tel:+2290199023047";
  const github = "https://github.com/Sergio744";
  const mailto = `mailto:${t.contact.email}`;

  return (
    <footer id="contact" className="relative overflow-hidden bg-night text-bone">
      {/* top hairline edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-24 md:px-10 md:pt-36">
        <FadeUp>
          <p className="eyebrow text-bone-soft">{t.contact.index} — {t.nav.contact}</p>
        </FadeUp>

        {/* giant title */}
        <FadeUp delay={0.06}>
          <h2 className="font-display mt-8 leading-[0.95] tracking-tight">
            <span className="block text-[clamp(2.8rem,9vw,8.5rem)] text-bone">
              {t.contact.titleA}
            </span>
            <span className="block text-[clamp(2.8rem,9vw,8.5rem)] font-light italic text-violet-soft">
              {t.contact.titleB}
              <span className="text-bone">.</span>
            </span>
          </h2>
        </FadeUp>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          {/* left: lead + email */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.1}>
              <p className="max-w-md text-[15px] leading-relaxed text-bone-soft md:text-base">
                {t.contact.lead}
              </p>
              <a
                href={mailto}
                data-cursor="✉"
                className="press group mt-8 inline-flex flex-wrap items-center gap-3"
              >
                <span className="u-sweep font-display text-[clamp(1.25rem,3vw,2.1rem)] tracking-tight text-bone">
                  {t.contact.email}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-[transform,background-color,border-color] duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-violet">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </FadeUp>

            <FadeUp delay={0.16}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Magnetic strength={0.3}>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="press rounded-full bg-bone px-6 py-3.5 text-sm font-semibold text-night hover:bg-violet hover:text-white"
                  >
                    {t.contact.whatsapp}
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <a
                    href={call}
                    className="press inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-bone hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" /> {t.contact.call}
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="press inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-bone hover:bg-white/10"
                  >
                    <Github className="h-4 w-4" /> {t.contact.github}
                  </a>
                </Magnetic>
              </div>
            </FadeUp>
          </div>

          {/* right: availability card */}
          <div className="lg:col-span-5 lg:pl-10">
            <FadeUp delay={0.14}>
              <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-7 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <span className="dot-live h-2 w-2 rounded-full bg-[#2ecc71]" />
                  <p className="text-sm font-medium text-bone">{t.hero.kicker}</p>
                </div>
                <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-bone-soft">
                  {t.contact.meta}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="font-mono text-[11px] text-bone-soft">GMT+1 — Cotonou</span>
                  <span className="font-mono text-[11px] text-bone-soft">
                    {clock}
                    <span className="text-violet-soft"> local</span>
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* ghost wordmark */}
        <div className="pointer-events-none mt-20 select-none overflow-hidden md:mt-28" aria-hidden>
          <p className="text-stroke whitespace-nowrap text-center font-body text-[clamp(3rem,11.5vw,11rem)] font-bold uppercase leading-none tracking-tight text-bone/[0.16]">
            Sergio Kotin
          </p>
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 md:flex-row">
          <p className="font-mono text-[11px] tracking-wide text-bone-soft">{t.footer.rights}</p>
          <p className="font-mono text-[11px] tracking-wide text-bone-soft">
            {t.footer.made} <span className="text-gold">◆</span>
          </p>
          <Magnetic strength={0.3}>
            <button
              onClick={() => scrollToId("hero")}
              className="press group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-soft hover:border-bone hover:text-bone"
            >
              {t.footer.top}
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
