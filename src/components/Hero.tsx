"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { MapPin, ArrowDown } from "lucide-react";

export const Hero: React.FC = () => {
  const { animationsEnabled } = useAnimation();

  // Floating animation configuration
  const floatTransition = animationsEnabled
    ? {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
      }
    : undefined;

  const floatAnimation = animationsEnabled
    ? {
        y: [0, -10, 0],
      }
    : {};

  // Reveal transitions for staggered entrance
  const fadeInUp = (delay: number) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationsEnabled ? 0.8 : 0,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom rockstar-like ease out cubic
      },
    },
  });

  const handleScrollDown = () => {
    const nextSection = document.getElementById("stacks");
    if (nextSection) {
      const headerOffset = 80;
      const elementPosition = nextSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: animationsEnabled ? "smooth" : "auto",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex flex-col justify-between items-center pt-28 pb-6 px-6 overflow-hidden z-10"
    >
      {/* Top spacer to balance vertical layout */}
      <div className="h-10 w-full" />

      {/* Main Content (centered vertically with my-auto) */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 relative z-10 my-auto py-8">
        
        {/* Avatar/Memoji Photo with circular gradient border */}
        <motion.div
          variants={fadeInUp(0.1)}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <motion.div
            animate={floatAnimation}
            transition={floatTransition}
            className="w-32 h-32 md:w-36 md:h-36 rounded-full p-[2px] bg-gradient-to-tr from-[#5DADE2] via-cyan-500 to-violet-600 shadow-[0_0_30px_rgba(93,173,226,0.2)]"
          >
            <div className="w-full h-full rounded-full bg-[#050505] overflow-hidden flex items-center justify-center">
              <Image
                src="/avatar.png"
                alt="João Lucas Avatar"
                width={140}
                height={140}
                className="object-cover w-full h-full scale-105"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Location Badge */}
        <motion.div
          variants={fadeInUp(0.2)}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm text-xs font-medium text-white/70 shadow-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-[#5DADE2]" />
          <span>Ceará, Brasil</span>
        </motion.div>

        {/* Large Title */}
        <motion.h1
          variants={fadeInUp(0.3)}
          initial="hidden"
          animate="visible"
          className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-none"
        >
          Modern <span className="text-[#5DADE2] bg-gradient-to-r from-[#5DADE2] to-cyan-400 bg-clip-text text-transparent">Web</span> Developer
        </motion.h1>

        {/* Bio Description */}
        <motion.p
          variants={fadeInUp(0.4)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-base sm:text-lg text-white/60 font-sans leading-relaxed mt-2"
        >
          Olá, sou <span className="text-white font-semibold">João Lucas</span>, Desenvolvedor Web criando soluções web completas. De interfaces front-end intuitivas a sistemas back-end robustos, eu construo aplicações web escaláveis, eficientes e confiáveis.
        </motion.p>
      </div>

      {/* Vertical Fixed Social Sidebar */}
      <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-6 z-30">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 border border-white/5 bg-[#0d0d0d]/80 rounded-full text-white/60 hover:text-[#5DADE2] hover:border-[#5DADE2]/30 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 border border-white/5 bg-[#0d0d0d]/80 rounded-full text-white/60 hover:text-[#5DADE2] hover:border-[#5DADE2]/30 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <div className="w-[1px] h-12 bg-white/10 mx-auto" />
      </div>

      {/* Subtle Scroll Indicator (in-flow at the bottom) */}
      <motion.div
        variants={fadeInUp(0.6)}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-1 cursor-pointer z-10 pb-4"
        onClick={handleScrollDown}
      >
        <span className="text-[9px] text-white/30 uppercase tracking-widest font-display">Scroll Down</span>
        <motion.div
          animate={animationsEnabled ? { y: [0, 6, 0] } : {}}
          transition={animationsEnabled ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#5DADE2]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
