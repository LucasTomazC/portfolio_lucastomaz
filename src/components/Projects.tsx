"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { Folder, FileText, ChevronRight, X, ExternalLink, Code, CheckCircle, Database, ShieldAlert } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Project {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  techs: string[];
  challenges: string;
  architecture: string;
  siteUrl: string;
  githubUrl?: string;
  meta: string; // e.g. "FILE_ID_042"
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Gestão de Frotas Coca-Cola",
    shortDesc: "Sistema corporativo de controle de combustível, auditoria de pneus e telemetria para frotas de distribuição.",
    longDesc: "Um ecossistema robusto desenvolvido para digitalizar a logística de distribuição. Ele elimina planilhas manuais substituindo-as por auditoria digital, rastreamento de pneus via sensores virtuais e controle preciso de custos de combustível.",
    techs: ["React", "Node.js", "PostgreSQL", "Leaflet Maps", "Tailwind CSS"],
    architecture: "Arquitetura cliente-servidor com persistência transacional ACID. Painel analítico com otimização de consultas espaciais e telemetria em tempo real.",
    challenges: "Gerenciamento eficiente de volumetria de dados geográficos e otimização de renderização de múltiplos marcadores no mapa sem travamentos.",
    siteUrl: "https://github.com",
    githubUrl: "https://github.com",
    meta: "LOGISTICS_SYS_V4",
  },
  {
    id: 2,
    title: "ERP Financeiro Inteligente",
    shortDesc: "Plataforma analítica corporativa para conciliação bancária, fluxo de caixa e relatórios fiscais automatizados.",
    longDesc: "Plataforma de alta segurança destinada a pequenas e médias empresas para centralizar transações financeiras, conciliar contas por upload de arquivos e gerar previsões de fluxo de caixa com base em dados passados.",
    techs: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    architecture: "SSR (Server-Side Rendering) e Server Actions. Banco de dados relacional normalizado com criptografia simétrica para chaves de transação.",
    challenges: "Implementar um validador de conciliação bancária que processe arquivos bancários de grande escala sob tempo limite do servidor (10s).",
    siteUrl: "https://github.com",
    githubUrl: "https://github.com",
    meta: "FINANCIAL_ERP_V2",
  },
  {
    id: 3,
    title: "E-Commerce Headless",
    shortDesc: "Loja virtual modular de alto desempenho com checkout de página única e gerenciamento de estoque distribuído.",
    longDesc: "Uma loja virtual ultra veloz focada na conversão. Ele utiliza renderização estática para páginas de produto e APIs GraphQL descentralizadas para garantir tempos de carregamento imperceptíveis.",
    techs: ["Next.js", "GraphQL", "Redis", "MongoDB", "Framer Motion"],
    architecture: "Incremental Static Regeneration (ISR) para páginas estáticas dinamicamente geradas, cache de carrinho de compras no Redis para velocidade < 100ms.",
    challenges: "Sincronização de estoque distribuído em tempo real durante múltiplos acessos simultâneos em momentos de pico de vendas.",
    siteUrl: "https://github.com",
    githubUrl: "https://github.com",
    meta: "COMMERCE_HDL_V1",
  },
];

export const Projects: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // GSAP Horizontal Pinning Setup
  useEffect(() => {
    if (!isDesktop) return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!trigger || !container) return;

    const panels = gsap.utils.toArray(".project-panel");
    const totalPanels = panels.length;

    // Create GSAP Tween
    const tween = gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        pin: true,
        scrub: 0.8,
        start: "top top",
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isDesktop]);

  return (
    <div id="projetos" ref={triggerRef} className="relative bg-[#050505] border-t border-white/5">
      
      {/* Cinematic section intro visible on scroll */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-8 text-center lg:text-left">
        <span className="text-xs uppercase tracking-widest font-display text-[#5DADE2] font-semibold">
          Portfólio
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mt-2 tracking-tight">
          Arquivos de <span className="text-white/20">Projetos</span>
        </h2>
        <p className="text-sm text-white/50 mt-4 leading-relaxed font-sans max-w-xl">
          {isDesktop 
            ? "Arraste verticalmente (scroll) para navegar horizontalmente pelos arquivos técnicos." 
            : "Explore os cards de projeto e seus relatórios técnicos abaixo."}
        </p>
      </div>

      {isDesktop ? (
        /* HORIZONTAL PINNED LAYOUT (DESKTOP) */
        <div className="overflow-hidden min-h-screen flex items-center">
          <div ref={containerRef} className="flex flex-row shrink-0 pl-12 pr-40 gap-16 py-12">
            {PROJECTS_DATA.map((project) => (
              <div
                key={project.id}
                className="project-panel w-[600px] h-[480px] border border-white/5 bg-[#0d0d0d] p-8 flex flex-col justify-between relative group hover:border-[#5DADE2]/30 transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.4)]"
              >
                {/* File tab details */}
                <div className="absolute top-[-21px] left-[-1px] h-5 bg-[#0d0d0d] border-t border-x border-white/5 group-hover:border-[#5DADE2]/30 transition-colors px-4 py-2 flex items-center gap-2">
                  <Folder className="w-3.5 h-3.5 text-[#5DADE2]" />
                  <span className="text-[9px] font-mono text-white/40 tracking-wider group-hover:text-white/60 transition-colors uppercase">
                    {project.meta}
                  </span>
                </div>

                {/* Tech Blueprint Placeholder Image */}
                <div className="h-44 w-full bg-[#050505] border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-[#5DADE2]/10 transition-colors">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:14px_14px]" />
                  <Code className="w-12 h-12 text-[#5DADE2]/10 group-hover:text-[#5DADE2]/20 transition-all duration-500 scale-100 group-hover:scale-110" />
                  <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white/30">
                    BLUEPRINT_0{project.id}.DWG
                  </div>
                </div>

                {/* Project Specs */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight uppercase mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-sans line-clamp-2">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Tech Tags & CTA */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                    {project.techs.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono px-2 py-0.5 border border-white/5 bg-white/5 text-white/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1 text-[11px] font-display font-semibold tracking-wider text-black bg-[#5DADE2] hover:bg-cyan-400 px-4 py-2 uppercase hover:shadow-[0_0_15px_rgba(93,173,226,0.2)] transition-all duration-300"
                  >
                    Abrir Relatório
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VERTICAL LIST LAYOUT (MOBILE) */
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

              {/* Title & Info */}
              <div>
                <h3 className="text-xl font-display font-bold text-white uppercase mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  {project.shortDesc}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono px-2 py-0.5 border border-white/5 bg-white/5 text-white/60"
                  >
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
              className="bg-[#0c0c0c] border border-white/10 w-full max-w-3xl relative z-10 overflow-hidden shadow-[0_0_60px_rgba(93,173,226,0.15)] flex flex-col"
              style={{ borderRadius: "0px" }} // Sharp geometry
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 border border-white/5 hover:border-white/20 text-white/50 hover:text-white bg-[#0c0c0c]/80 backdrop-blur-sm z-20 transition-all duration-300"
                aria-label="Fechar relatório"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative Blueprint Banner Header */}
              <div className="h-44 bg-[#050505] border-b border-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
                <Code className="w-16 h-16 text-[#5DADE2]/5" />
                <div className="absolute bottom-4 left-6 text-left">
                  <span className="text-[10px] font-mono text-[#5DADE2] tracking-widest block uppercase mb-1">
                    REPORT_FILE // {selectedProject.meta}
                  </span>
                  <h3 className="text-xl md:text-3xl font-display font-bold text-white uppercase tracking-tight">
                    {selectedProject.title}
                  </h3>
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
                    <p className="text-xs text-white/50 leading-relaxed font-sans">
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
                    <p className="text-xs text-white/50 leading-relaxed font-sans">
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
                        className="text-[10px] font-mono px-3 py-1 bg-white/5 border border-white/5 text-white/80"
                      >
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
                    className="w-full sm:w-auto px-6 py-3 border border-white/10 hover:border-white/20 text-white font-semibold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 hover:bg-white/5 transition-all duration-300"
                    style={{ borderRadius: "0px" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    Código Fonte
                  </a>
                )}
                
                <a
                  href={selectedProject.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#5DADE2] hover:bg-[#4ea0d6] text-black font-semibold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(93,173,226,0.3)] transition-all duration-300"
                  style={{ borderRadius: "0px" }}
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
