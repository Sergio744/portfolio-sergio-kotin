"use client";

import { useState } from "react";
import SmoothScroll from "@/components/portfolio/SmoothScroll";
import Cursor from "@/components/portfolio/Cursor";
import Preloader from "@/components/portfolio/Preloader";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import TechMarquee from "@/components/portfolio/TechMarquee";
import About from "@/components/portfolio/About";
import Approach from "@/components/portfolio/Approach";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import SkillsBento from "@/components/portfolio/SkillsBento";
import Services from "@/components/portfolio/Services";
import Contact from "@/components/portfolio/Contact";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-night">
      <SmoothScroll />
      <Cursor />
      <Preloader onDone={() => setReady(true)} />
      <Nav />

      <main className="flex-1">
        <Hero ready={ready} />
        <TechMarquee />
        <About />
        <Approach />
        <Experience />
        <Projects />
        <SkillsBento />
        <Services />
      </main>

      <Contact />
    </div>
  );
}
