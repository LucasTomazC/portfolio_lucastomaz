"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimation } from "@/context/AnimationContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stacks } from "@/components/Stacks";
import { Projects } from "@/components/Projects";
import { Certificates } from "@/components/Certificates";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { animationsEnabled } = useAnimation();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // If animations/motion are disabled, bypass smooth scroll
    if (!animationsEnabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Cubic-bezier approximation
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sync Lenis with requestAnimationFrame
    let rafId: number;
    const updateRaf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(updateRaf);
    };
    rafId = requestAnimationFrame(updateRaf);

    // Sync Lenis scroll triggers with GSAP
    lenis.on("scroll", () => {
      // Keep ScrollTrigger synchronized with smooth scroll position
      ScrollTrigger.update();
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [animationsEnabled]);

  return (
    <main className="min-h-screen bg-[#050505] text-white relative dot-grid overflow-x-hidden selection:bg-[#5DADE2] selection:text-black">
      {/* Fixed Navigation Header */}
      <Header />

      {/* Main Structural Page Flow */}
      <Hero />
      <Stacks />
      <Projects />
      <Certificates />
      <Footer />
    </main>
  );
}
