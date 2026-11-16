"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dict, type Dict, type Lang } from "@/lib/i18n";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
  ready: boolean;
};

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // defer to a callback so we don't setState synchronously in the effect body
    const id = window.requestAnimationFrame(() => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem("sk-lang");
      } catch {
        /* private mode */
      }
      if (stored === "fr" || stored === "en") setLangState(stored);
      setReady(true);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("sk-lang", l);
    } catch {
      /* ignore */
    }
    // let split-text / ScrollTrigger components re-measure after text swap
    window.dispatchEvent(new CustomEvent("sk:langchange"));
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "fr" ? "en" : "fr";
      try {
        window.localStorage.setItem("sk-lang", next);
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new CustomEvent("sk:langchange"));
      return next;
    });
  }, []);

  const value = useMemo<LangCtx>(
    () => ({ lang, setLang, toggle, t: dict[lang], ready }),
    [lang, setLang, toggle, ready]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
