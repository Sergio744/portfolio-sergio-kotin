"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { scrollToId, stopScroll } from "./SmoothScroll";
import { useLang } from "./LanguageProvider";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "profil", key: "about" },
  { id: "approche", key: "approach" },
  { id: "experience", key: "experience" },
  { id: "projets", key: "projects" },
  { id: "competences", key: "skills" },
] as const;

export default function Nav() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section highlighting
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    stopScroll(open);
    return () => stopScroll(false);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // wait for menu exit before scrolling
    window.setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[110] transition-colors duration-300",
          scrolled
            ? "border-b border-white/10 bg-night/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          {/* brand */}
          <button
            onClick={() => go("hero")}
            className="group flex items-center gap-3"
            aria-label="Sergio Kotin — top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet font-mono text-[11px] font-semibold text-white">
              SK
            </span>
            <span className="hidden text-sm font-medium tracking-wide text-bone sm:block">
              Sergio Kotin
              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.22em] text-bone-soft">
                Engineer · AI
              </span>
            </span>
          </button>

          {/* desktop links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  data-active={active === l.id}
                  className="u-sweep text-[13px] font-medium text-bone/80 transition-colors hover:text-bone"
                >
                  {t.nav[l.key]}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 md:gap-4">
            {/* FR / EN */}
            <div
              className="relative flex h-9 items-center rounded-full border border-white/15 p-1 font-mono text-[10px] font-semibold tracking-widest"
              role="group"
              aria-label="Language"
            >
              {(["fr", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => l !== lang && toggle()}
                  aria-pressed={lang === l}
                  className={cn(
                    "press relative z-10 h-7 rounded-full px-2.5 uppercase",
                    lang === l ? "text-white" : "text-bone-soft hover:text-bone"
                  )}
                >
                  {l}
                  {lang === l && (
                    <motion.span
                      layoutId="lang-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-violet"
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <Magnetic strength={0.3} className="hidden sm:inline-block">
              <button
                onClick={() => go("contact")}
                className="press group relative overflow-hidden rounded-full bg-bone px-5 py-2.5 text-[13px] font-semibold text-night"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {t.nav.cta}
                </span>
                <span className="absolute inset-0 translate-y-full bg-violet transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </button>
            </Magnetic>

            {/* burger */}
            <button
              className="press flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
            >
              <span
                className={cn(
                  "h-px w-4 bg-bone transition-transform duration-300",
                  open && "translate-y-[3px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-4 bg-bone transition-transform duration-300",
                  open && "-translate-y-[3px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[105] flex flex-col justify-center bg-night px-8 lg:hidden"
          >
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => go(l.id)}
                    className="font-display flex items-baseline gap-4 py-1 text-[clamp(2.2rem,9vw,3.6rem)] leading-none text-bone"
                  >
                    <span className="font-mono text-xs text-violet-soft">0{i + 1}</span>
                    {t.nav[l.key]}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <button
                  onClick={() => go("contact")}
                  className="font-display flex items-baseline gap-4 py-1 text-[clamp(2.2rem,9vw,3.6rem)] leading-none italic text-violet-soft"
                >
                  <span className="font-mono text-xs not-italic text-violet-soft">06</span>
                  {t.nav.contact}
                </button>
              </motion.li>
            </ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="eyebrow mt-10 text-bone-soft"
            >
              {t.contact.meta}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
