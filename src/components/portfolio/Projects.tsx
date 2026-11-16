"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { FadeUp, SectionHead } from "./Reveal";

/* ───────────────────────── mock UI art ───────────────────────── */

function Chrome({ url, chip }: { url: string; chip?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
      <span className="flex gap-1.5" aria-hidden>
        <i className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <i className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <i className="h-2 w-2 rounded-full bg-[#28c840]" />
      </span>
      <span className="flex-1 truncate rounded-md bg-white/[0.06] px-3 py-1 text-center font-mono text-[9px] tracking-wide text-bone-soft">
        {url}
      </span>
      {chip && (
        <span className="rounded-full border border-emerald/50 bg-emerald/15 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-emerald-soft">
          {chip}
        </span>
      )}
    </div>
  );
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-night-soft shadow-2xl">
      <Image
        src={`${BASE_PATH}${src}`}
        alt={alt}
        width={1440}
        height={900}
        className="h-auto w-full object-cover"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    </div>
  );
}

function CreditLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="press u-sweep inline-flex items-center gap-0.5 font-semibold text-bone"
    >
      {children}
      <ArrowUpRight className="h-3 w-3" aria-hidden />
    </a>
  );
}

function MockCefal() {
  const bars = [34, 52, 44, 68, 58, 82, 74, 92];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-night-soft text-left shadow-2xl">
      <Chrome url="cefal.bj — eval engine" chip="RLS" />
      <div className="flex">
        {/* sidebar */}
        <div className="hidden w-20 flex-col gap-2 border-r border-white/10 p-3 sm:flex">
          <div className="mb-1 h-6 w-6 rounded-md bg-magenta/40" />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1.5 rounded-full ${i === 1 ? "w-full bg-magenta/60" : "w-4/5 bg-white/10"}`} />
          ))}
        </div>
        <div className="flex-1 space-y-3 p-4">
          {/* stat tiles */}
          <div className="grid grid-cols-3 gap-2">
            {["50+", "150+", "auto"].map((v) => (
              <div key={v} className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                <p className="font-mono text-[10px] text-magenta">{v}</p>
                <div className="mt-1.5 h-1 w-3/4 rounded-full bg-white/12" />
              </div>
            ))}
          </div>
          {/* chart */}
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="h-1.5 w-16 rounded-full bg-white/15" />
              <div className="h-1.5 w-8 rounded-full bg-white/10" />
            </div>
            <div className="flex h-20 items-end gap-1.5" aria-hidden>
              {bars.map((h, i) => (
                <div key={i} className="flex-1">
                  <div
                    className="w-full rounded-t-sm bg-gradient-to-t from-magenta/40 to-violet-soft"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockEco() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-night-soft text-left shadow-2xl">
      <Chrome url="ecocompta — local.sqlite" chip="100% offline" />
      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
        {/* ledger rows */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-2 w-16 rounded-full bg-white/20" />
            <div className="rounded-full bg-emerald/20 px-2 py-0.5 font-mono text-[8px] text-emerald-soft">
              FCFA
            </div>
          </div>
          {[
            { w: "3/5", v: "+125 000" },
            { w: "4/5", v: "−38 500" },
            { w: "2/5", v: "+64 000" },
            { w: "5/5", v: "−12 300" },
          ].map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
            >
              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-sm bg-gold/70" />
                <span className={`h-1.5 rounded-full bg-white/15`} style={{ width: `${parseInt(r.w) * 18}px` }} />
              </span>
              <span className={`font-mono text-[9px] ${r.v.startsWith("+") ? "text-emerald-soft" : "text-bone-soft"}`}>
                {r.v}
              </span>
            </div>
          ))}
        </div>
        {/* receipt */}
        <div className="flex items-center justify-center">
          <div
            className="w-40 rounded-t-lg border border-b-0 border-white/15 bg-white/[0.04] p-3 font-mono text-[8px] leading-relaxed text-bone-soft"
            style={{
              maskImage: "linear-gradient(to bottom, black 78%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent)",
            }}
          >
            <p className="mb-2 text-center text-[9px] text-bone">REÇU Nº 0042</p>
            <p className="flex justify-between"><span>Frais scolarité</span><span>25 000</span></p>
            <p className="flex justify-between"><span>Cantine</span><span>4 500</span></p>
            <p className="flex justify-between border-t border-dashed border-white/20 pt-2">
              <span className="text-sun">TOTAL</span>
              <span className="text-sun">29 500</span>
            </p>
            <p className="mt-2 text-center tracking-[0.3em]">▌▖▗▘▝▚▞</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const VISUALS: Record<string, () => React.ReactElement> = {
  grada: () => (
    <Shot
      src="/projects/grada.webp"
      alt="Grada — plateforme d'évaluations en ligne, page d'accueil"
    />
  ),
  klassin: () => (
    <Shot
      src="/projects/klassin.webp"
      alt="KlassIn — inscriptions scolaires en ligne, page d'accueil"
    />
  ),
  neonrift: () => (
    <Shot
      src="/projects/neonrift.webp"
      alt="Neon Rift — shooter stickman open-source sur cartes destructibles, menu principal du jeu"
    />
  ),
  cefal: MockCefal,
  ecocompta: MockEco,
};

/* ───────────────────────── tilt wrapper ───────────────────────── */

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: px * 7,
      rotateX: -py * 6,
      transformPerspective: 900,
      duration: 0.6,
      ease: "power3.out",
    });
  };
  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
  };

  return (
    <div style={{ perspective: 1000 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={ref}>
        {children}
      </div>
    </div>
  );
}

/* ───────────────────────── section ───────────────────────── */

export default function Projects() {
  const { t } = useLang();

  return (
    <section id="projets" className="relative overflow-hidden bg-night py-24 text-bone md:py-36">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead
          index={t.projects.index}
          eyebrow={t.projects.title}
          dark
          title={
            <span className="flex flex-wrap items-baseline gap-4">
              {t.projects.title}
              <span className="font-mono text-lg font-normal text-bone-soft md:text-2xl">
                {t.projects.count}
              </span>
            </span>
          }
        />

        <div className="space-y-24 md:space-y-32">
          {t.projects.items.map((p, idx) => {
            const Visual = VISUALS[p.id];
            const flip = idx % 2 === 1;
            return (
              <article
                key={p.id}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
              >
                {/* visual */}
                <FadeUp
                  className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}
                >
                  <div className="relative">
                    <Tilt>
                      <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-2 md:p-3">
                        <Visual />
                      </div>
                    </Tilt>
                  </div>
                </FadeUp>

                {/* text */}
                <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
                  <FadeUp>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs tracking-[0.2em] text-bone-soft">
                        {p.num}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/80">
                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden />
                        {p.badge}
                      </span>
                    </div>
                    <h3 className="font-display mt-5 text-[clamp(2.2rem,4.5vw,4rem)] leading-none tracking-tight">
                      {p.name}
                    </h3>
                    <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-bone-soft md:text-base">
                      {p.desc}
                    </p>
                  </FadeUp>

                  <FadeUp delay={0.08}>
                    <ul className="mt-7 space-y-3">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-bone/85 md:text-[15px]">
                          <span
                            className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${
                              idx === 0 ? "bg-violet-soft" : idx === 1 ? "bg-magenta" : idx === 2 ? "bg-sun" : idx === 4 ? "bg-gold" : "bg-emerald"
                            }`}
                            aria-hidden
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </FadeUp>

                  <FadeUp delay={0.12}>
                    <div className="mt-8 flex flex-wrap gap-2">
                      <ul className="flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <li
                            key={s}
                            className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[10px] tracking-wide text-bone/70"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* credits — Neon Rift */}
                    {p.id === "neonrift" && (
                      <div className="mt-6 flex flex-col gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-soft">
                        <p>
                          {t.projects.neonriftCredits.community}
                          {" · "}
                          <CreditLink href={t.projects.neonriftCredits.githubUrl}>
                            {t.projects.neonriftCredits.github}
                          </CreditLink>
                        </p>
                        <p>
                          {t.projects.neonriftCredits.inspiredBy}{" "}
                          <CreditLink href={t.projects.neonriftCredits.stickDuelUrl}>
                            {t.projects.neonriftCredits.stickDuel}
                          </CreditLink>{" "}
                          {t.projects.neonriftCredits.by}{" "}
                          <CreditLink href={t.projects.neonriftCredits.melvynxUrl}>
                            {t.projects.neonriftCredits.melvynx}
                          </CreditLink>{" "}
                          <span className="text-bone/50">({t.projects.neonriftCredits.unofficial})</span>
                        </p>
                      </div>
                    )}

                    {/* cta row */}
                    <div className="mt-9 flex flex-wrap items-center gap-5">
                      {p.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="press group inline-flex items-center gap-2 text-sm font-semibold text-bone"
                        >
                          <span className="u-sweep">{p.id === "grada" ? t.projects.cta : t.projects.visit}</span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-[background-color,border-color] duration-300 group-hover:border-transparent group-hover:bg-violet">
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                          </span>
                        </a>
                      ) : p.id === "cefal" ? (
                        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-soft">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                          {t.projects.internal}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-soft">
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-soft" aria-hidden />
                          {t.projects.soon}
                        </span>
                      )}
                    </div>
                  </FadeUp>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
