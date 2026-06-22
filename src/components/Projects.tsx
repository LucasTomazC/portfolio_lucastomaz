"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { Folder, ChevronRight, X, ExternalLink, Database, ShieldAlert } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register GSAP plugin at module level (must only run once)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  techs: string[];
  challenges: string;
  architecture: string;
  image: string;
  siteUrl: string;
  githubUrl?: string;
  meta: string;
  comingSoon?: boolean;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Jennyfer Felicio",
    shortDesc: "Landing Page profissional para maquiadora, focada em conversão e apresentação visual elegante do portfólio de beleza.",
    longDesc: "Uma landing page imersiva desenvolvida para a maquiadora Jennyfer Felicio. O projeto destaca o trabalho artístico da profissional com um design visual sofisticado, galeria de portfólio e integração direta com WhatsApp para agendamentos.",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    architecture: "Aplicação estática otimizada com Next.js, deploy via Vercel com CDN global. Design responsivo mobile-first com animações suaves.",
    challenges: "Criar uma experiência visual premium que refletisse a sofisticação do trabalho da maquiadora, garantindo carregamento rápido das imagens em alta resolução.",
    image: "/landingpage_makeup.png",
    siteUrl: "https://jennyferfelicio.vercel.app",
    githubUrl: "https://github.com/LucasTomazC",
    meta: "Projeto 1",
  },
  {
    id: 2,
    title: "Treinador Tomaz",
    shortDesc: "Portfólio web para personal trainer com design impactante, seções de planos, resultados e depoimentos.",
    longDesc: "Um portfólio web de alto impacto visual desenvolvido para o personal trainer Treinador Tomaz. O site combina tipografia bold com animações dinâmicas para transmitir energia e profissionalismo, incluindo seções de diferenciais, planos, resultados e depoimentos.",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    architecture: "Aplicação SSG com Next.js e deploy otimizado na Vercel. Animações de scroll com GSAP ScrollTrigger e design responsivo.",
    challenges: "Desenvolver um design com forte identidade visual esportiva que transmitisse energia e confiança, com performance excelente em dispositivos móveis.",
    image: "/landingpage_personaltomaz.png",
    siteUrl: "https://treinadortomaz.vercel.app",
    githubUrl: "https://github.com/LucasTomazC",
    meta: "Projeto 2",
  },
  {
    id: 3,
    title: "Gestão Financeira",
    shortDesc: "Plataforma de gestão financeira pessoal com dashboards analíticos, controle de receitas/despesas e relatórios automatizados.",
    longDesc: "Uma plataforma completa de gestão financeira em fase final de testes. O sistema permite controle detalhado de receitas e despesas, categorização inteligente de transações, dashboards com gráficos analíticos e geração de relatórios financeiros.",
    techs: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    architecture: "Full-stack com Next.js App Router, Server Actions para mutações seguras, banco de dados PostgreSQL com Prisma ORM e autenticação robusta.",
    challenges: "Implementar um sistema de categorização automática de transações e dashboards com gráficos responsivos que funcionem em tempo real.",
    image: "/coming_soon.png",
    siteUrl: "#",
    meta: "Projeto 3",
    comingSoon: true,
  },
];

// Tech Icon mapping matching Stacks.tsx
const TECH_ICONS: Record<string, React.ReactNode> = {
  "React": (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-3.5 h-3.5">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 180 180" className="w-3.5 h-3.5">
      <circle cx="90" cy="90" r="85" fill="black" stroke="white" strokeWidth="6" />
      <path d="M140 145 L80 70 L70 70 L70 120" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="115" y="70" width="12" height="50" fill="white" />
    </svg>
  ),
  "TypeScript": (
    <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-[#3178C6]">
      <rect width="100" height="100" rx="10" />
      <text x="24" y="72" fill="white" fontSize="40" fontWeight="bold" fontFamily="monospace">T</text>
      <text x="54" y="72" fill="white" fontSize="40" fontWeight="bold" fontFamily="monospace">S</text>
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#38BDF8]">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 0.913 0.228 1.565 0.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-0.913-0.228-1.565-0.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913 0.228 1.565 0.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  "Framer Motion": (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#E10098]">
      <path d="M12 0l12 12H12V0zm-12 12l12 12V12H0zm12 0h12v12H12V12z" />
    </svg>
  ),
  "GSAP": (
    <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-none stroke-[#88CE02] stroke-[8]">
      <rect x="10" y="10" width="80" height="80" rx="15" strokeWidth="6" />
      <text x="18" y="65" fill="#88CE02" fontSize="45" fontWeight="bold" fontFamily="sans-serif" stroke="none">G</text>
    </svg>
  ),
  "Prisma": (
    <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-none stroke-[#2B6CB0]" strokeWidth="6">
      <polygon points="50,10 90,80 10,80" />
      <line x1="50" y1="10" x2="50" y2="80" />
      <line x1="50" y1="50" x2="90" y2="80" />
      <line x1="50" y1="50" x2="10" y2="80" />
    </svg>
  ),
  "PostgreSQL": (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-[#336791]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a8 8 0 0 0 8-8c0-5.5-4.5-8-10-8H8c-2.2 0-4 1.8-4 4s1.8 4 4 4h1" />
      <path d="M16 14a2 2 0 1 0-4 0M10 8V6a3 3 0 0 0-3-3" />
    </svg>
  )
};

export const Projects: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const { animationsEnabled } = useAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop layout capability
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024 && animationsEnabled);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [animationsEnabled]);

  // GSAP Cabinet Stack Animation Setup
  useEffect(() => {
    if (!isDesktop) return;

    const trigger = triggerRef.current;
    const cards = cardRefs.current;
    const contents = contentRefs.current;
    if (!trigger || !cards || cards.length < 3 || !contents || contents.length < 3) return;

    // Set initial layout states directly in GSAP to avoid React style override conflicts
    gsap.set(cards[0], { width: 620, left: 0 });
    gsap.set(contents[0], { opacity: 1 });

    gsap.set(cards[1], { width: 100, left: 640 });
    gsap.set(contents[1], { opacity: 0 });

    gsap.set(cards[2], { width: 100, left: 760 });
    gsap.set(contents[2], { opacity: 0 });

    // Create GSAP Timeline pinned for a comfortable scroll depth
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "projects-pin",
        trigger: trigger,
        pin: true,
        scrub: 0.8,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.5}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          // Apply class active/collapsed state directly to DOM nodes
          if (p < 0.35) {
            cards[0].classList.add("is-active");
            cards[0].classList.remove("is-collapsed");
            
            cards[1].classList.add("is-collapsed");
            cards[1].classList.remove("is-active");
            
            cards[2].classList.add("is-collapsed");
            cards[2].classList.remove("is-active");
          } else if (p < 0.70) {
            cards[0].classList.add("is-collapsed");
            cards[0].classList.remove("is-active");
            
            cards[1].classList.add("is-active");
            cards[1].classList.remove("is-collapsed");
            
            cards[2].classList.add("is-collapsed");
            cards[2].classList.remove("is-active");
          } else {
            cards[0].classList.add("is-collapsed");
            cards[0].classList.remove("is-active");
            
            cards[1].classList.add("is-collapsed");
            cards[1].classList.remove("is-active");
            
            cards[2].classList.add("is-active");
            cards[2].classList.remove("is-collapsed");
          }
        }
      },
    });

    // Step 0: Scroll Delay (Plateau 1)
    // 0.0 to 1.5: Keep Card 1 active
    tl.to({}, { duration: 1.5 });

    // Step 1: Transition State 0 -> State 1
    // 1.5 to 4.5: Card 1 shrinks, Card 2 moves & expands
    tl.to(cards[0], { width: 100, ease: "power2.inOut", duration: 3 }, 1.5);
    tl.to(contents[0], { opacity: 0, ease: "power2.inOut", duration: 1.5 }, 1.5);

    tl.to(cards[1], { left: 120, width: 620, ease: "power2.inOut", duration: 3 }, 1.5);
    tl.to(contents[1], { opacity: 1, ease: "power2.inOut", duration: 2 }, 2.5);

    // Step 2: Middle Plateau
    // 4.5 to 5.5: Keep Card 2 active
    tl.to({}, { duration: 1.0 });

    // Step 3: Transition State 1 -> State 2
    // 5.5 to 8.5: Card 2 shrinks, Card 3 moves & expands
    tl.to(cards[1], { width: 100, ease: "power2.inOut", duration: 3 }, 5.5);
    tl.to(contents[1], { opacity: 0, ease: "power2.inOut", duration: 1.5 }, 5.5);

    tl.to(cards[2], { left: 240, width: 620, ease: "power2.inOut", duration: 3 }, 5.5);
    tl.to(contents[2], { opacity: 1, ease: "power2.inOut", duration: 2 }, 6.5);

    // Step 4: End Plateau
    // 8.5 to 10.0: Keep Card 3 active
    tl.to({}, { duration: 1.5 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isDesktop]);

  // Lock body scroll when modal is open & handle Escape key
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedProject(null);
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedProject]);

  // Click-to-snap navigation logic for folders
  const handleCardClick = (idx: number) => {
    if (!isDesktop) return;
    const cards = cardRefs.current;
    if (!cards || !cards[idx]) return;

    if (cards[idx].classList.contains("is-collapsed")) {
      const st = ScrollTrigger.getById("projects-pin");
      if (st) {
        const start = st.start;
        const end = st.end;
        const dist = end - start;

        let targetProgress = 0;
        if (idx === 0) targetProgress = 0.05;      // Card 1 plateau center
        else if (idx === 1) targetProgress = 0.5;   // Card 2 plateau center
        else if (idx === 2) targetProgress = 0.95;  // Card 3 plateau center

        window.scrollTo({
          top: start + targetProgress * dist,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div id="projetos" ref={triggerRef} className="relative bg-[#050505] border-t border-white/5 w-full">
      
      {isDesktop ? (
        /* HORIZONTAL CABINET LAYOUT (DESKTOP) */
        <div className="h-screen flex flex-col justify-center items-center py-6 overflow-hidden">
          
          {/* Desktop Compact Title Section */}
          <div className="w-full max-w-5xl px-12 mb-10 text-left">
            <span className="text-xs uppercase tracking-widest font-display text-[#5DADE2] font-semibold">
              Portfólio
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase mt-1 tracking-tight">
              Arquivos de <span className="text-white/20">Projetos</span>
            </h2>
            <p className="text-xs text-white/50 mt-2 leading-relaxed font-sans max-w-xl">
              Arraste verticalmente (scroll) ou clique nas pastas da direita para navegar pelos arquivos técnicos.
            </p>
          </div>

          {/* Cabinet Cards Frame */}
          <div ref={containerRef} className="relative w-[860px] h-[500px] mx-auto">
            {PROJECTS_DATA.map((project, idx) => {
              const isActiveInit = idx === 0;
              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    if (el) cardRefs.current[idx] = el;
                  }}
                  onClick={() => handleCardClick(idx)}
                  // Initial layout class styles matching state 0 for SSR & hydration alignment
                  className={`absolute top-0 h-[480px] bg-[#0d0d0d] shadow-[0_0_40px_rgba(0,0,0,0.4)] border border-white/5 transition-[border-color,box-shadow] duration-300 group
                    ${isActiveInit ? "is-active cursor-default lg:w-[620px] lg:left-[0px]" : "is-collapsed cursor-pointer hover:border-[#5DADE2]/30 lg:w-[100px]"}
                    ${idx === 1 ? "lg:left-[640px]" : ""}
                    ${idx === 2 ? "lg:left-[760px]" : ""}
                  `}
                >
                  {/* Folder Tab Header */}
                  <div className="absolute top-[-21px] left-[-1px] h-[22px] bg-[#0d0d0d] border-t border-x border-white/5 px-4 py-2 flex items-center gap-2 group-hover:border-[#5DADE2]/30 group-[.is-active]:border-[#5DADE2]/40 z-10 transition-colors">
                    <Folder className="w-3.5 h-3.5 text-white/30 group-hover:text-[#5DADE2] group-[.is-active]:text-[#5DADE2] transition-colors" />
                    <span className="text-[9px] font-mono text-white/40 tracking-wider group-hover:text-white/80 group-[.is-active]:text-white/80 transition-colors uppercase font-bold">
                      {project.meta}
                    </span>
                  </div>

                  {/* Card Content with mask */}
                  <div className="w-full h-full overflow-hidden p-8 flex flex-col justify-between relative">
                    {/* Inner contents fixed size container to block text reflow glitches */}
                    <div
                      ref={(el) => {
                        if (el) contentRefs.current[idx] = el;
                      }}
                      style={{ opacity: isActiveInit ? 1 : 0 }}
                      className="w-[556px] h-full flex flex-col justify-between shrink-0"
                    >
                      {/* Project Screenshot */}
                      <div className="h-44 w-full bg-[#050505] border border-white/5 relative overflow-hidden group-hover:border-[#5DADE2]/10 transition-colors">
                        <Image
                          src={project.image}
                          alt={`Screenshot do projeto ${project.title}`}
                          fill
                          className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                          sizes="600px"
                        />
                        {project.comingSoon && (
                          <div className="absolute inset-0 bg-[#050505]/60 flex items-center justify-center z-10">
                            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#5DADE2] border border-[#5DADE2]/30 px-4 py-2 bg-[#050505]/80 backdrop-blur-sm">
                              Em Breve
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Project Specs */}
                      <div>
                        <h3 className="text-2xl font-display font-bold text-white tracking-tight uppercase mb-2">
                          {project.title}
                        </h3>
                        <p className="text-xs text-white/60 leading-relaxed font-sans line-clamp-2">
                          {project.shortDesc}
                        </p>
                      </div>

                      {/* Tech Tags & CTA */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                          {project.techs.map((tech) => (
                            <span
                              key={tech}
                              className="text-[9px] font-mono px-2 py-0.5 border border-white/5 bg-white/5 text-white/60 flex items-center gap-1.5"
                            >
                              {TECH_ICONS[tech] || null}
                              {tech}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="flex items-center gap-1 text-[11px] font-display font-semibold tracking-wider text-black bg-[#5DADE2] hover:bg-cyan-400 px-4 py-2 uppercase hover:shadow-[0_0_15px_rgba(93,173,226,0.2)] transition-all duration-300"
                        >
                          Abrir Relatório
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VERTICAL LIST LAYOUT (MOBILE) */
        <>
          <div className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-8 text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest font-display text-[#5DADE2] font-semibold">
              Portfólio
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mt-2 tracking-tight">
              Arquivos de <span className="text-white/20">Projetos</span>
            </h2>
            <p className="text-sm text-white/60 mt-4 leading-relaxed font-sans max-w-xl">
              Explore os cards de projeto e seus relatórios técnicos abaixo.
            </p>
          </div>

          <div className="max-w-xl mx-auto px-6 py-12 flex flex-col gap-12 pb-24">
            {PROJECTS_DATA.map((project) => (
              <div
                key={project.id}
                className="border border-white/5 bg-[#0d0d0d] p-6 flex flex-col gap-6 relative"
              >
                {/* Mobile Card Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-[9px] font-mono text-[#5DADE2] tracking-widest uppercase">
                    {project.meta}
                  </span>
                  <Folder className="w-4 h-4 text-white/30" />
                </div>

                {/* Project Screenshot */}
                <div className="w-full h-40 bg-[#050505] border border-white/5 relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Screenshot do projeto ${project.title}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  {project.comingSoon && (
                    <div className="absolute inset-0 bg-[#050505]/60 flex items-center justify-center z-10">
                      <span className="text-xs font-display font-bold uppercase tracking-widest text-[#5DADE2] border border-[#5DADE2]/30 px-4 py-2 bg-[#050505]/80 backdrop-blur-sm">
                        Em Breve
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Info */}
                <div>
                  <h3 className="text-xl font-display font-bold text-white uppercase mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono px-2 py-0.5 border border-white/5 bg-white/5 text-white/60 flex items-center gap-1.5"
                    >
                      {TECH_ICONS[tech] || null}
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Trigger Modal */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full flex items-center justify-center gap-1 text-xs font-display font-semibold tracking-wider text-black bg-[#5DADE2] px-4 py-3 uppercase"
                >
                  Abrir Relatório Técnico
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* DETAILED PROJECT MODAL (CINEMATIC) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 md:p-12 overflow-y-auto">
            
            {/* Dark Scrim overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: animationsEnabled ? 0.4 : 0 }}
              className="bg-[#0c0c0c] border border-white/10 w-full max-w-3xl relative z-10 overflow-hidden shadow-[0_0_60px_rgba(93,173,226,0.15)] flex flex-col rounded-none"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 border border-white/5 hover:border-white/20 text-white/50 hover:text-white bg-[#0c0c0c]/80 backdrop-blur-sm z-20 transition-all duration-300"
                aria-label="Fechar relatório"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Project Image Banner Header */}
              <div className="h-52 bg-[#050505] border-b border-white/5 relative overflow-hidden">
                <Image
                  src={selectedProject.image}
                  alt={`Screenshot do projeto ${selectedProject.title}`}
                  fill
                  className="object-cover object-top opacity-60"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/40 to-transparent" />
                <div className="absolute bottom-4 left-6 text-left z-10">
                  <span className="text-[10px] font-mono text-[#5DADE2] tracking-widest block uppercase mb-1">
                    REPORT_FILE // {selectedProject.meta}
                  </span>
                  <h3 className="text-xl md:text-3xl font-display font-bold text-white uppercase tracking-tight">
                    {selectedProject.title}
                  </h3>
                  {selectedProject.comingSoon && (
                    <span className="inline-block mt-2 text-[10px] font-display font-bold uppercase tracking-widest text-[#5DADE2] border border-[#5DADE2]/30 px-3 py-1 bg-[#050505]/80 backdrop-blur-sm">
                      Em Breve — Fase de Testes Finais
                    </span>
                  )}
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs uppercase font-display tracking-widest text-[#5DADE2] font-semibold mb-2">
                    Visão Geral
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed font-sans">
                    {selectedProject.longDesc}
                  </p>
                </div>

                {/* Grid of technical metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/5">
                  {/* Architecture */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#5DADE2]" />
                      <h4 className="text-xs uppercase font-display tracking-widest text-white font-semibold">
                        Arquitetura & Infra
                      </h4>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-sans">
                      {selectedProject.architecture}
                    </p>
                  </div>

                  {/* Challenges */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-[#5DADE2]" />
                      <h4 className="text-xs uppercase font-display tracking-widest text-white font-semibold">
                        Principais Desafios
                      </h4>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-sans">
                      {selectedProject.challenges}
                    </p>
                  </div>
                </div>

                {/* Stacks tags in modal */}
                <div className="border-t border-white/5 pt-6">
                  <h4 className="text-xs uppercase font-display tracking-widest text-white/50 font-semibold mb-3">
                    Tecnologias Utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-3 py-1 bg-white/5 border border-white/5 text-white/80 flex items-center gap-1.5"
                      >
                        {TECH_ICONS[tech] || null}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA links */}
              <div className="p-6 bg-[#090909] border-t border-white/5 flex flex-col sm:flex-row items-center gap-4 justify-end">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 border border-white/10 hover:border-white/20 text-white font-semibold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 hover:bg-white/5 transition-all duration-300 rounded-none animate-focus-visible"
                  >
                    <GitHubIcon className="w-4 h-4 fill-current" />
                    Código Fonte
                  </a>
                )}
                
                <a
                  href={selectedProject.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#5DADE2] hover:bg-[#4ea0d6] text-black font-semibold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(93,173,226,0.3)] transition-all duration-300 rounded-none animate-focus-visible"
                >
                  Visitar o Site
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
