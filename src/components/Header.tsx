"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { Eye, EyeOff, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "stacks", label: "Stacks" },
  { id: "projetos", label: "Projetos" },
  { id: "certificados", label: "Certificados" },
  { id: "contato", label: "Contato" },
];

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { animationsEnabled, toggleAnimations } = useAnimation();

  // Scroll Spy Observer
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section occupies the center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: animationsEnabled ? "smooth" : "auto",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-md border-white/5 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Monogram Logo "JL" */}
        <button
          onClick={() => handleNavClick("home")}
          className="relative group focus:outline-none flex items-center gap-2"
          aria-label="Voltar ao início"
        >
          <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-[#5DADE2]/50 transition-colors duration-300 bg-[#0d0d0d] relative overflow-hidden">
            {/* Monogram Graphic */}
            <svg
              viewBox="0 0 100 100"
              className="w-7 h-7 text-white fill-none stroke-current stroke-[6] transition-transform duration-500 group-hover:scale-110"
            >
              {/* Stylized J and L */}
              <path
                d="M 30,25 L 55,25 M 55,25 L 55,65 C 55,78 35,78 35,65"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 50,55 L 75,55 L 75,65"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#5DADE2]"
              />
            </svg>
            <div className="absolute inset-0 bg-[#5DADE2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-display font-bold text-white tracking-widest text-sm hidden sm:inline-block transition-colors group-hover:text-[#5DADE2]">
            JOÃO LUCAS
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full px-2 py-1 backdrop-blur-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-300 rounded-full relative ${
                  isActive ? "text-[#5DADE2]" : "text-white/60 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-0"
                    transition={
                      animationsEnabled
                        ? { type: "spring", stiffness: 380, damping: 30 }
                        : { duration: 0 }
                    }
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Animation Control and Menu Controls */}
        <div className="flex items-center gap-3">
          {/* Toggle Animation Button */}
          <button
            onClick={toggleAnimations}
            className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-[#5DADE2] hover:border-[#5DADE2]/30 transition-all duration-300 relative group"
            title={animationsEnabled ? "Desativar animações" : "Ativar animações"}
            aria-label={animationsEnabled ? "Desativar animações" : "Ativar animações"}
          >
            {animationsEnabled ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4 text-red-400" />
            )}
            <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-white bg-black border border-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {animationsEnabled ? "Motion: ON" : "Motion: OFF"}
            </span>
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 md:hidden border border-white/10 bg-white/5 rounded-full text-white/70 hover:text-white hover:border-white/20 transition-all"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: animationsEnabled ? 0.3 : 0 }}
            className="fixed inset-x-0 top-[73px] bg-[#050505] border-b border-white/5 z-30 px-6 py-8 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-lg font-display font-medium tracking-wide border-l-2 pl-4 py-1.5 transition-colors ${
                    activeSection === item.id
                      ? "text-[#5DADE2] border-[#5DADE2]"
                      : "text-white/60 border-transparent hover:text-white hover:border-white/20"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
