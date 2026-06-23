"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import Image from "next/image";

// Utilitário simples para mesclar classes CSS
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  siteUrl?: string;
  githubUrl?: string;
  isActive: boolean;
  comingSoon?: boolean;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Jennyfer Felicio",
    subtitle: "Landing Page Makeup",
    description: "Landing Page profissional para maquiadora, focada em conversão e apresentação visual elegante.",
    image: "/landingpage_makeup.png",
    siteUrl: "https://jennyferfelicio.vercel.app",
    githubUrl: "https://github.com/LucasTomazC",
    isActive: true,
  },
  {
    id: 2,
    title: "Treinador Tomaz",
    subtitle: "Personal Trainer Portfolio",
    description: "Portfólio web para personal trainer com design impactante, seções de planos e depoimentos.",
    image: "/landingpage_personaltomaz.png",
    siteUrl: "https://treinadortomaz.vercel.app",
    githubUrl: "https://github.com/LucasTomazC",
    isActive: true,
  },
  {
    id: 3,
    title: "Gestão Financeira",
    subtitle: "Fintech Platform",
    description: "Plataforma de gestão financeira pessoal com dashboards analíticos e controle de receitas.",
    image: "/coming_soon.png",
    siteUrl: "#",
    githubUrl: "",
    isActive: true,
    comingSoon: true,
  },
  { id: 4, title: "Em breve", subtitle: "PROJETO 04", description: "Novidades em desenvolvimento", isActive: false },
  { id: 5, title: "Em breve", subtitle: "PROJETO 05", description: "Novidades em desenvolvimento", isActive: false },
  { id: 6, title: "Em breve", subtitle: "PROJETO 06", description: "Novidades em desenvolvimento", isActive: false },
  { id: 7, title: "Em breve", subtitle: "PROJETO 07", description: "Novidades em desenvolvimento", isActive: false },
  { id: 8, title: "Em breve", subtitle: "PROJETO 08", description: "Novidades em desenvolvimento", isActive: false },
  { id: 9, title: "Em breve", subtitle: "PROJETO 09", description: "Novidades em desenvolvimento", isActive: false },
];

export const Projects: React.FC = () => {
  const { animationsEnabled } = useAnimation();
  const [activeRow, setActiveRow] = useState(1);
  const [activeCol, setActiveCol] = useState(1);

  const gridTemplateRows = [
    activeRow === 0 ? "3.2fr" : "1fr",
    activeRow === 1 ? "3.2fr" : "1fr",
    activeRow === 2 ? "3.2fr" : "1fr",
  ].join(" ");

  const gridTemplateColumns = [
    activeCol === 0 ? "3.2fr" : "1fr",
    activeCol === 1 ? "3.2fr" : "1fr",
    activeCol === 2 ? "3.2fr" : "1fr",
  ].join(" ");

  const transitionConfig = animationsEnabled
    ? ({ type: "spring", stiffness: 320, damping: 28, mass: 0.8 } as const)
    : ({ duration: 0 } as const);

  return (
    <section id="projetos" className="w-full bg-[#050505] border-t border-white/5 font-sans py-24 md:py-32 px-6 md:px-12 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Seção de Cabeçalho */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-display text-brand font-semibold">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mt-2 tracking-tight">
            Arquivos de <span className="text-white/20">Projetos</span>
          </h2>
          <p className="max-w-md text-sm text-neutral-400 mt-4 leading-relaxed font-sans mx-auto md:mx-0">
            Uma grade interativa e dinâmica exibindo os projetos desenvolvidos, unindo design de ponta e engenharia de software robusta.
          </p>
        </div>

        {/* Grade Bento Interativa */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl aspect-[4/3] min-h-[450px] md:min-h-[600px] relative">
            <motion.div
              className="grid gap-3 w-full h-full"
              animate={{
                gridTemplateRows,
                gridTemplateColumns,
              }}
              onMouseLeave={() => {
                setActiveRow(1);
                setActiveCol(1);
              }}
              transition={transitionConfig}
            >
              {PROJECTS_DATA.map((project, i) => {
                const row = Math.floor(i / 3);
                const col = i % 3;
                const isActive = activeRow === row && activeCol === col;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    className={cn(
                      "relative overflow-hidden cursor-pointer group border shadow-lg transition-shadow duration-500 rounded-xl bg-[#09090b]",
                      isActive 
                        ? "z-20 border-brand/40 shadow-2xl scale-[1.01]" 
                        : "z-0 border-white/5 opacity-60 hover:opacity-100"
                    )}
                    onMouseEnter={() => {
                      setActiveRow(row);
                      setActiveCol(col);
                    }}
                    onClick={() => {
                      setActiveRow(row);
                      setActiveCol(col);
                    }}
                  >
                    {project.isActive && project.image ? (
                      /* Projetos ativos com imagem de fundo */
                      <>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className={cn(
                            "object-cover object-top transition-transform duration-700 pointer-events-none",
                            isActive ? "scale-105 opacity-90" : "scale-100 opacity-60 group-hover:scale-105 group-hover:opacity-85"
                          )}
                          sizes="(max-width: 768px) 100vw, 400px"
                          priority={i < 3}
                        />
                        {/* Overlay escuro para legibilidade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none" />
                      </>
                    ) : (
                      /* Projetos "Em breve" com gradiente abstrato escuro e pulso de luz */
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0e] via-[#050505] to-[#121217] flex flex-col justify-between p-4 pointer-events-none select-none">
                        {/* Linhas de blueprint para dar um aspecto tech */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
                        
                        {/* Indicador pulsante premium */}
                        <div className="flex justify-between items-start z-10 w-full">
                          <div className="flex items-center gap-1.5">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand/40 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand"></span>
                            </span>
                            <span className="text-[8px] font-mono text-white/35 uppercase tracking-wider">Breve</span>
                          </div>
                          <span className="text-[8px] font-mono text-white/20">0{project.id} {"// BACKLOG"}</span>
                        </div>

                        {/* Brilho sutil no centro */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-brand/5 blur-[35px] pointer-events-none group-hover:bg-brand/10 transition-colors duration-500" />
                      </div>
                    )}

                    {/* Camada de Texto e Conteúdo */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 md:p-5 select-none">
                      <p className="text-brand text-[8px] md:text-[9px] font-mono uppercase tracking-[0.15em] mb-1 font-semibold">
                        {project.subtitle}
                      </p>
                      
                      <h3 className="text-white text-xs md:text-sm font-display font-bold uppercase tracking-wide truncate max-w-[90%] group-hover:text-brand transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Detalhes do projeto aberto (com animação Framer Motion) */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden mt-1 md:mt-2 text-left"
                          >
                            <p className="text-[10px] md:text-xs text-neutral-400 font-sans leading-relaxed mb-3 line-clamp-2">
                              {project.description}
                            </p>

                            {/* Botões de Ação Discretos (Opção A) */}
                            <div className="flex flex-wrap items-center gap-2">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 px-2.5 py-1.5 bg-neutral-900/90 border border-white/10 hover:border-white/20 text-white font-semibold text-[8px] md:text-[9px] tracking-wider uppercase transition-all duration-300 hover:bg-neutral-800 rounded-none cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <GitHubIcon className="w-3 h-3 fill-current" />
                                  GitHub
                                </a>
                              )}
                              
                              {project.comingSoon ? (
                                <span className="text-[8px] md:text-[9px] font-mono text-brand border border-brand/30 bg-brand/5 px-2 py-1 uppercase tracking-wider font-semibold">
                                  Em Breve
                                </span>
                              ) : (
                                project.siteUrl && project.siteUrl !== "#" && (
                                  <a
                                    href={project.siteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 px-2.5 py-1.5 bg-brand text-black font-semibold text-[8px] md:text-[9px] tracking-wider uppercase transition-all duration-300 hover:bg-brand/90 hover:shadow-[0_0_12px_rgba(93,173,226,0.35)] rounded-none cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Visitar
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Efeito de Borda Brilhante no Card Ativo */}
                    {isActive && (
                      <motion.div
                        layoutId="active-glow"
                        className="absolute inset-0 ring-1 ring-brand/40 pointer-events-none z-30 rounded-xl"
                        transition={transitionConfig}
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
