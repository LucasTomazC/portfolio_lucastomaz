"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import Image from "next/image";

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

export const Projects: React.FC = () => {
  const { animationsEnabled } = useAnimation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    updateHeight();

    // Measure on window load and after a short timeout to handle Next.js hydration shifts
    const timer = setTimeout(updateHeight, 500);

    window.addEventListener("resize", updateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const maskStyle = {
    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
    maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)"
  };

  return (
    <div id="projetos" className="w-full bg-[#050505] border-t border-white/5 font-sans md:px-10">
      {/* Title Section */}
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 lg:px-10 text-left">
        <span className="text-xs uppercase tracking-widest font-display text-[#5DADE2] font-semibold">
          Portfólio
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mt-2 tracking-tight">
          Arquivos de <span className="text-white/20">Projetos</span>
        </h2>
        <p className="max-w-md text-sm text-neutral-400 mt-4 leading-relaxed font-sans">
          Uma linha do tempo interativa detalhando alguns dos projetos de engenharia web desenvolvidos do design à produção.
        </p>
      </div>

      {/* Timeline Section */}
      <div ref={timelineRef} className="relative z-0 mx-auto max-w-7xl pb-20">
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
          >
            {/* Left Sticky Column (Title on desktop) */}
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              {/* Point on timeline line */}
              <div className="absolute left-3 flex size-10 items-center justify-center rounded-full bg-[#050505] border border-white/10 md:left-3">
                <div className="size-4 rounded-full border border-neutral-700 bg-neutral-800" />
              </div>
              
              {/* Sticky Title (Desktop Only) */}
              <h3 className="hidden text-xl font-bold md:block md:pl-20 md:text-4xl lg:text-5xl uppercase font-display text-white tracking-tight">
                {project.title}
              </h3>
            </div>

            {/* Right Column (Content) */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full text-left space-y-6">
              {/* Inline Title (Mobile Only) */}
              <h3 className="block text-2xl font-bold md:hidden uppercase font-display text-white tracking-tight">
                {project.title}
              </h3>

              {/* Image Banner */}
              <div className="h-52 md:h-80 w-full max-w-2xl bg-[#0d0d0d] border border-white/5 relative overflow-hidden group hover:border-[#5DADE2]/10 transition-colors">
                <Image
                  src={project.image}
                  alt={`Screenshot do projeto ${project.title}`}
                  fill
                  className="object-cover object-top opacity-80 group-hover:opacity-100 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                {project.comingSoon && (
                  <div className="absolute inset-0 bg-[#050505]/60 flex items-center justify-center z-10">
                    <span className="text-xs font-display font-bold uppercase tracking-widest text-[#5DADE2] border border-[#5DADE2]/30 px-4 py-2 bg-[#050505]/80 backdrop-blur-sm">
                      Em Breve
                    </span>
                  </div>
                )}
              </div>

              {/* Project description (short) */}
              <p className="max-w-2xl text-xs md:text-sm text-neutral-400 font-sans leading-relaxed">
                {project.shortDesc}
              </p>

              {/* Actions direct links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-white/10 hover:border-white/20 text-white font-semibold text-[10px] tracking-wider uppercase transition-all duration-300 hover:bg-neutral-800 rounded-none"
                  >
                    <GitHubIcon className="w-3.5 h-3.5 fill-current" />
                    Código Fonte
                  </a>
                )}

                {!project.comingSoon && (
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#5DADE2] hover:bg-[#4ea0d6] text-black font-semibold text-[10px] tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_15px_rgba(93,173,226,0.2)] rounded-none"
                  >
                    Visitar Site
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Scroll Progress Line */}
        <div
          style={{ height: `${height}px`, ...maskStyle }}
          className="absolute top-0 left-8 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-neutral-800 to-transparent to-99% md:left-8"
        >
          {animationsEnabled ? (
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-[#5DADE2] via-[#3498DB] to-transparent"
            />
          ) : (
            <div
              style={{ height: `${height}px` }}
              className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-[#5DADE2] via-[#3498DB] to-transparent opacity-60"
            />
          )}
        </div>
      </div>
    </div>
  );
};
