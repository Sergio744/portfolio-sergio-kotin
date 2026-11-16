import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { LanguageProvider } from "@/components/portfolio/LanguageProvider";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://sergio744.github.io/portfolio-sergio-kotin";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sergio Kotin — Ingénieur logiciel & Consultant IA",
  description:
    "Portfolio de Sergio Kotin, ingénieur logiciel et consultant IA basé au Bénin. SaaS, apps web & desktop, sites web, portfolios et jeux web — développement natif IA. Créateur de Grada, EcoCompta, KlassIn et du jeu open-source Neon Rift.",
  keywords: [
    "Sergio Kotin",
    "ingénieur logiciel",
    "consultant IA",
    "Bénin",
    "développeur",
    "React",
    "TypeScript",
    "Grada",
    "EcoCompta",
    "KlassIn",
    "Neon Rift",
    "jeu open-source",
    "portfolio",
  ],
  authors: [{ name: "Sergio Kotin" }],
  openGraph: {
    url: siteUrl,
    title: "Sergio Kotin — Ingénieur logiciel & Consultant IA",
    description:
      "SaaS, apps web & desktop, sites web, portfolios et jeux web — développement natif IA. Créateur de Grada, EcoCompta, KlassIn et du jeu open-source Neon Rift. Basé à Abomey-Calavi, Bénin.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#09080d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
