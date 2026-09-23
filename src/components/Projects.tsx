"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import Image from "next/image";

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

interface MagnetProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  active?: boolean;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  strength = 0.22,
  className = "",
  active = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", damping: 15, stiffness: 150, mass: 0.1 }}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface LiveProjectButtonProps {
  href: string;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ href, className = "" }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/btn inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-5 py-2 sm:px-7 sm:py-2.5 md:px-8 md:py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:shadow-[0_0_20px_rgba(215,226,234,0.2)] active:scale-95 cursor-pointer ${className}`}
    >
      <span>Live Project</span>
      <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
    </a>
  );
};

interface GitHubButtonProps {
  href: string;
  className?: string;
}

export const GitHubButton: React.FC<GitHubButtonProps> = ({ href, className = "" }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/git inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/40 px-4 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/85 transition-all duration-300 hover:border-[#D7E2EA] hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/10 hover:shadow-[0_0_20px_rgba(215,226,234,0.15)] active:scale-95 cursor-pointer ${className}`}
    >
      <GitHubIcon className="w-3.5 h-3.5 fill-current transition-transform duration-300 group-hover/git:scale-110" />
      <span>GitHub</span>
    </a>
  );
};

// ==========================================
// DATA STRUCTURE
// ==========================================

interface ProjectItem {
  id: number;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  siteUrl: string;
  githubUrl: string;
  tags: string[];
  highlights: string[];
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 1,
    number: "01",
    category: "Landing Page Makeup",
    title: "Jennyfer Felicio",
    description: "Landing page profissional de alta conversão para maquiadora, desenvolvida com estética sofisticada, agendamento facilitado e performance otimizada para dispositivos móveis.",
    image: "/landingpage_makeup.png",
    siteUrl: "https://jennyferfelicio.vercel.app",
    githubUrl: "https://github.com/LucasTomazC",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    highlights: ["Design Responsivo & Mobile-First", "Otimização de SEO e Conversão", "Arquitetura Moderna e Limpa"],
  },
  {
    id: 2,
    number: "02",
    category: "Personal Trainer Portfolio",
    title: "Treinador Tomaz",
    description: "Portfólio interativo para consultoria fitness com apresentação dinâmica de treinos, planos personalizados, seções de resultados comprovados e engajamento direto.",
    image: "/landingpage_personaltomaz.png",
    siteUrl: "https://treinadortomaz.vercel.app",
    githubUrl: "https://github.com/LucasTomazC",
    tags: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
    highlights: ["Microinterações & Animações", "Planos de Consultoria Online", "Experiência de Navegação Fluida"],
  },
  {
    id: 3,
    number: "03",
    category: "Controle & Gestão Financeira",
    title: "Gestão Financeira",
    description: "Plataforma de inteligência e controle financeiro pessoal com dashboards analíticos, gráficos interativos, classificação inteligente de despesas e relatórios em tempo real.",
    image: "/landingpage_gestaofinanceira.png",
    siteUrl: "https://gestaofinanceira-three.vercel.app",
    githubUrl: "https://github.com/LucasTomazC/gestao_financeira",
    tags: ["React", "TypeScript", "Tailwind CSS", "Dashboards"],
    highlights: ["Métricas & Relatórios Visuais", "Controle Total de Gastos", "Interface Intuitiva e Segura"],
  },
];

// ==========================================
// STICKY CARD COMPONENT (OVERWRITING SCROLL)
// ==========================================

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  animationsEnabled: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  progress,
  range,
  targetScale,
  animationsEnabled,
}) => {
  // Scale down smoothly as subsequent cards scroll over this card
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      className="h-[85vh] flex items-start justify-center sticky px-2 sm:px-4"
      style={{
        // 5rem (80px) on mobile + index * 28px offset
        top: `calc(5rem + ${index * 28}px)`,
        // Later cards strictly cover earlier cards
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale: animationsEnabled ? scale : 1,
          transformOrigin: "top center",
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-7 md:p-9 lg:p-10 shadow-[0_35px_80px_rgba(0,0,0,0.95)] relative overflow-hidden transition-shadow duration-500 will-change-transform"
      >
        {/* Subtle radial ambient light */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/[0.03] blur-[90px] pointer-events-none" />

        {/* Top Row: Number, Category, Project Name, and Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white/25 select-none tracking-tighter leading-none">
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[#5DADE2] text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.2em] font-semibold">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white uppercase tracking-tight mt-0.5">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Action Buttons with Magnet Effect */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Magnet strength={0.2} active={animationsEnabled}>
              <LiveProjectButton href={project.siteUrl} />
            </Magnet>
            <Magnet strength={0.2} active={animationsEnabled}>
              <GitHubButton href={project.githubUrl} />
            </Magnet>
          </div>
        </div>

        {/* Bottom Row: Two-Column Showcase (40% content / 60% image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 pt-5 sm:pt-6 items-center relative z-10">
          {/* Left Column (40%): Description + Tech Badges + Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <p className="text-neutral-300 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
              {project.description}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono text-neutral-300 bg-white/5 border border-white/10 backdrop-blur-sm tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-1.5 pt-1">
              {project.highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5DADE2] shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (60%): High-Resolution Image Vitrine */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[16/10] max-h-[260px] sm:max-h-[320px] md:max-h-[360px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-white/10 overflow-hidden bg-neutral-950 group">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
                priority={index === 0}
              />
              {/* Subtle vignette gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

              {/* View Overlay Tag */}
              <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Preview
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// MAIN SECTION
// ==========================================

export const Projects: React.FC = () => {
  const { animationsEnabled } = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = PROJECTS_DATA.length;

  // Track parent scroll progress across all stacked cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projetos"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-28 md:pt-32 pb-24 sm:pb-32 px-4 sm:px-6 md:px-12 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn className="mb-8 sm:mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-display text-[#5DADE2] font-semibold">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase mt-2 tracking-tight hero-heading">
            Projetos em Destaque
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed font-sans max-w-xl mx-auto">
            Seleção de aplicações web e interfaces digitais de alta performance desenvolvidas com foco em experiência do usuário e arquitetura moderna.
          </p>
        </FadeIn>

        {/* Sticky Cards Stacking Deck (Cards overwrite each other as you scroll down) */}
        <div ref={containerRef} className="relative mt-6 sm:mt-10">
          {PROJECTS_DATA.map((project, index) => {
            const targetScale = 1 - (totalCards - 1 - index) * 0.03;
            // Progressive scale timing: Card 0 scales when scroll progress is 0 to 0.45,
            // Card 1 scales when scroll progress is 0.33 to 0.85, Card 2 stays at 1.
            const range: [number, number] = [index * 0.25, 1];

            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                totalCards={totalCards}
                progress={scrollYProgress}
                range={range}
                targetScale={targetScale}
                animationsEnabled={animationsEnabled}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
