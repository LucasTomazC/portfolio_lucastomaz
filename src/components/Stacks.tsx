"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { AnimateGrid, AnimateGridCard } from "./AnimateGrid";
import { StaggerText } from "@/components/ui/StaggerText";

// =========================================================================
// 16 HIGH-FIDELITY, AUTHENTIC, AESTHETIC TECH ICONS (4x4 Matrix)
// =========================================================================
const TECH_DATA: AnimateGridCard[] = [
  // 0. HTML5
  {
    id: "html",
    name: "HTML5",
    color: "#E44D26",
    desc: "Estruturação semântica e acessível (padrões WAI-ARIA) de interfaces modernas, com foco em SEO técnico, marcação limpa e carregamento performático.",
    icon: (
      <svg viewBox="0 0 512 512" className="w-8 h-8 sm:w-10 sm:h-10">
        <path fill="#E44D26" d="M107.6 461.4L64 0h384l-43.6 461.4L256 512z" />
        <path fill="#F16529" d="M256 472.4l120.3-33.4 36.4-409.8H256z" />
        <path fill="#EBEBEB" d="M256 208.6H179l-5.6-62.8H256V83.5H108.2l15.6 187.9H256zM256 355.8l-.5.1-66.8-18-4.3-48.4H121.8l8.5 95.3 125.7 34.9V355.8z" />
        <path fill="#FFFFFF" d="M256 208.6v62.8h72.6l-6.8 76.5-65.8 17.7v62.8l122.9-34.1 1.2-13.6 13.9-155.6 1.7-18.7H256zm0-125.1v62.3h143.5l3.8-42.6 1.9-19.7H256z" />
      </svg>
    ),
  },

  // 1. CSS3
  {
    id: "css",
    name: "CSS3",
    color: "#1572B6",
    desc: "Arquitetura avançada de folhas de estilo utilizando Flexbox, Grid Layout nativo, animações fluidas via keyframes e design responsivo mobile-first.",
    icon: (
      <svg viewBox="0 0 512 512" className="w-8 h-8 sm:w-10 sm:h-10">
        <path fill="#1572B6" d="M107.6 461.4L64 0h384l-43.6 461.4L256 512z" />
        <path fill="#33A9DC" d="M256 472.4l120.3-33.4 36.4-409.8H256z" />
        <path fill="#EBEBEB" d="M256 208.2h-74.8l-5.4-60.6H256V85.3H113.6l15.6 175.7H256zM256 355.7l-.5.1-64.8-17.5-4.2-47H124.1l8.2 92.5 123.7 34.3V355.7z" />
        <path fill="#FFFFFF" d="M256 208.2v62.8h70.3l-6.6 74.2-63.7 17.2v62.8l121.2-33.6 16.7-183.4H256zm0-122.9v62.3h139.7l3.7-41.9 1.8-20.4H256z" />
      </svg>
    ),
  },

  // 2. JavaScript
  {
    id: "javascript",
    name: "JavaScript",
    color: "#F7DF1E",
    desc: "Manipulação avançada da DOM com ES6+, programação assíncrona (Promises, async/await), closures, manipulação de eventos e otimização para motores V8.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-10 sm:h-10">
        <rect width="100" height="100" rx="14" fill="#F7DF1E" />
        <path fill="#000000" d="M29.5 76.5c2.4 1.8 5.6 2.8 9.3 2.8 6.4 0 10.6-3.8 10.6-11.2V38h-8.8v29.8c0 3.8-1.9 5.4-4.8 5.4-1.9 0-3.6-.8-4.7-1.8l-1.6 5.1zM58.3 75.8c3.2 2.2 7.7 3.5 12.8 3.5 9.1 0 14.8-4.8 14.8-12.2 0-7.3-4.5-10.4-11.7-13.4-5.3-2.2-7.5-3.8-7.5-6.5 0-2.4 2-4.2 5.5-4.2 3.3 0 6.1 1.2 8.1 2.8l2.5-6c-2.4-1.8-6.1-2.9-10.4-2.9-8.4 0-13.8 4.7-13.8 11.8 0 7.3 4.6 10.5 11.5 13.4 5.4 2.2 7.8 4 7.8 6.8 0 2.8-2.4 4.8-6.6 4.8-3.9 0-7.4-1.5-9.8-3.6l-3.6 5.7z" />
      </svg>
    ),
  },

  // 3. React (Default Pre-selected)
  {
    id: "react",
    name: "React",
    color: "#61DAFB",
    desc: "Construção de aplicações reativas de alta performance com arquitetura baseada em componentes reutilizáveis, gerenciamento de estado refinado e custom hooks.",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 sm:w-10 sm:h-10">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1.1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },

  // 4. Node.js (Grand Iconic - Flaticon)
  {
    id: "nodejs",
    name: "Node.js",
    color: "#539E43",
    desc: "Desenvolvimento de microsserviços e APIs com arquitetura orientada a eventos não-bloqueante (Event Loop), streaming contínuo de dados e alta vazão.",
    icon: (
      <svg viewBox="0 0 512 512" className="w-8 h-8 sm:w-10 sm:h-10">
        <path fill="#539E43" d="M256 8.5L25.6 141.5v229L256 503.5l230.4-133v-229L256 8.5zm0 52l185.1 106.8v178.4L256 450.5 70.9 343.7V165.3L256 60.5z" />
        <path fill="#68BD45" d="M256 112.5L116.2 193.2v125.6L256 399.5l139.8-80.7V193.2L256 112.5zm0 46.5l99.5 57.4v76.2L256 349.9 156.5 292.6v-76.2l99.5-57.4z" />
        <circle cx="256" cy="256" r="32" fill="#539E43" />
      </svg>
    ),
  },

  // 5. GitHub
  {
    id: "github",
    name: "GitHub",
    color: "#FFFFFF",
    desc: "Controle de versionamento distribuído (Git), fluxos de colaboração em equipe via Pull Requests, revisão rigorosa de código e automação com GitHub Actions.",
    icon: (
      <svg viewBox="0 0 98 96" className="w-8 h-8 sm:w-10 sm:h-10" fill="white">
        <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
      </svg>
    ),
  },

  // 6. PostgreSQL (Icons8: 38561)
  {
    id: "postgresql",
    name: "PostgreSQL",
    color: "#336791",
    desc: "Modelagem relacional corporativa, estruturação de schemas otimizados, indexação de alta velocidade, integridade transacional ACID e queries avançadas.",
    icon: (
      <Image
        src="/icons/postgresql.png"
        alt="PostgreSQL"
        width={40}
        height={40}
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow"
      />
    ),
  },

  // 7. Supabase
  {
    id: "supabase",
    name: "Supabase",
    color: "#3ECF8E",
    desc: "PostgreSQL gerenciado na nuvem com autenticação segura, Row Level Security (RLS) rígido, sincronização em tempo real e APIs geradas instantaneamente.",
    icon: (
      <svg viewBox="0 0 109 113" className="w-8 h-8 sm:w-10 sm:h-10">
        <path d="M63.7 110.3c-2.3 3-7.2 1.7-7.6-2.1l-6-60.8h46.7c4.6 0 7.3 5 4.8 8.8l-37.9 54.1z" fill="#249361" />
        <path d="M45.3 2.7c2.3-3 7.2-1.7 7.6 2.1l6 60.8H12.2c-4.6 0-7.3-5-4.8-8.8L45.3 2.7z" fill="#3ECF8E" />
      </svg>
    ),
  },

  // 8. Vercel
  {
    id: "vercel",
    name: "Vercel",
    color: "#FFFFFF",
    desc: "Deploy contínuo e escalabilidade global para frameworks modernos, com Serverless Functions, Edge Middleware e CDN de baixíssima latência.",
    icon: (
      <svg viewBox="0 0 116 100" className="w-8 h-8 sm:w-10 sm:h-10" fill="white">
        <polygon points="58,0 116,100 0,100" />
      </svg>
    ),
  },

  // 9. Render
  {
    id: "render",
    name: "Render",
    color: "#46E3B7",
    desc: "Hospedagem ágil e gerenciada de servidores backend, bancos de dados e microsserviços na nuvem, com integração contínua automática a partir do Git.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-10 sm:h-10" fill="none">
        <path d="M22 22h32c14.36 0 26 11.64 26 26s-11.64 26-26 26H22V22z" fill="#46E3B7" />
        <path d="M46 74h28c11.05 0 20 8.95 20 20v6H46V74z" fill="#26B48B" opacity="0.9" />
        <circle cx="54" cy="48" r="9" fill="#020420" />
      </svg>
    ),
  },

  // 10. Vite
  {
    id: "vite",
    name: "Vite",
    color: "#646CFF",
    desc: "Ambiente de compilação ultra-rápido alimentado por ES Modules nativos e Rollup, garantindo Hot Module Replacement (HMR) quase instantâneo.",
    icon: (
      <svg viewBox="0 0 410 404" className="w-8 h-8 sm:w-10 sm:h-10">
        <defs>
          <linearGradient id="vite-shield-brand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#41D1FF" />
            <stop offset="100%" stopColor="#BD34FE" />
          </linearGradient>
          <linearGradient id="vite-bolt-brand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEA83" />
            <stop offset="100%" stopColor="#FFDD35" />
          </linearGradient>
        </defs>
        <path fill="url(#vite-shield-brand)" d="M399.7 59.4L215.7 386.6c-4.4 7.9-15.9 7.9-20.3 0L10.3 59.4c-4.9-8.7-.3-19.6 9.5-22.1l180.2-46.4c3.4-.9 7-.9 10.4 0l179.8 46.4c9.8 2.5 14.4 13.4 9.5 22.1z" />
        <path fill="url(#vite-bolt-brand)" d="M283.8 28.5l-133 24.3c-4.6.8-7.5 5.5-6.2 10l30.9 104.5c1.1 3.8-.8 7.8-4.4 9.4L114 200.2c-5.7 2.6-6.6 10.4-1.6 14.2l121.7 91.9c5.1 3.9 12.3-.1 11.7-6.5l-10.4-106.6c-.4-4.2 2.6-8 6.7-8.6l57.7-8.6c6.1-.9 8.8-8.2 4.7-12.7L283.8 28.5z" />
      </svg>
    ),
  },

  // 11. Next.js
  {
    id: "nextjs",
    name: "Next.js",
    color: "#FFFFFF",
    desc: "Aplicações corporativas escaláveis com App Router, renderização híbrida (SSR/SSG), Server Components, Server Actions e otimização para Core Web Vitals.",
    icon: (
      <svg viewBox="0 0 180 180" className="w-8 h-8 sm:w-10 sm:h-10">
        <circle cx="90" cy="90" r="86" fill="#000000" stroke="#FFFFFF" strokeWidth="8" />
        <path d="M148 148 L80 60 L62 60 L62 120" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="118" y="60" width="14" height="60" fill="#FFFFFF" />
      </svg>
    ),
  },

  // 12. Claude Code (Icons8: o6yNtKLfZIc6)
  {
    id: "claude-code",
    name: "Claude Code",
    color: "#D97706",
    desc: "Engenharia de software acelerada por agentes avançados de inteligência artificial via terminal, permitindo raciocínio arquitetural e refatorações complexas.",
    icon: (
      <Image
        src="/icons/claude-color.png"
        alt="Claude Code"
        width={40}
        height={40}
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow"
      />
    ),
  },

  // 13. Codex (Icons8: FBO05Dys9QCg)
  {
    id: "codex",
    name: "Codex",
    color: "#10A37F",
    desc: "Síntese inteligente de código e automação de rotinas via grandes modelos de linguagem (LLMs), potencializando a velocidade de entrega técnica.",
    icon: (
      <Image
        src="/icons/codex-color.png"
        alt="Codex"
        width={40}
        height={40}
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow"
      />
    ),
  },

  // 14. VS Code (Icons8: 121601 - Replacing Antigravity)
  {
    id: "vscode",
    name: "VS Code",
    color: "#007ACC",
    desc: "Ambiente de desenvolvimento integrado (IDE) leve, moderno e altamente extensível com suporte a depuração nativa, IntelliSense, Git e ecossistema de extensões.",
    icon: (
      <Image
        src="/icons/vscode-color.png"
        alt="VS Code"
        width={40}
        height={40}
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow"
      />
    ),
  },

  // 15. Tailwind CSS
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    color: "#38BDF8",
    desc: "Estilização utilitária moderna com design tokens atômicos consistentes, suporte a container queries e compilação de alta performance sem CSS supérfluo.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="#38BDF8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 0.913 0.228 1.565 0.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-0.913-0.228-1.565-0.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913 0.228 1.565 0.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
];

// React is index 3 (Default pre-selected)
const DEFAULT_TECH_INDEX = 3;

export const Stacks: React.FC = () => {
  const { animationsEnabled } = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(DEFAULT_TECH_INDEX);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeIndex = hoveredIndex ?? DEFAULT_TECH_INDEX;
  const activeTech = TECH_DATA[activeIndex];

  return (
    <section
      id="stacks"
      aria-label="Tecnologias e Stacks"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-[#050505] overflow-hidden"
    >
      {/* Background subtle technical grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ==================================================== */}
          {/* LEFT COLUMN: Section Title & Clean Details Card      */}
          {/* ==================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            
            {/* Eyebrow Header */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#5DADE2]" />
              <StaggerText
                as="span"
                text="// TECH STACK"
                divideBy="word"
                className="text-xs font-mono tracking-widest uppercase text-[#5DADE2]"
              />
            </div>

            {/* Section Main Title */}
            <div>
              <StaggerText
                as="h2"
                text="Habilidade & Tecnologias"
                divideBy="word"
                delay={0.1}
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight uppercase"
              />
              <p className="mt-3 text-sm text-white/50 leading-relaxed font-sans max-w-md">
                Passe o mouse sobre os blocos da matriz 3D para inspecionar os detalhes técnicos de cada ferramenta.
              </p>
            </div>

            {/* Clean Minimalist Technology Card (without extra clutter) */}
            <div className="relative border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl min-h-[170px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTech.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: animationsEnabled ? 0.18 : 0 }}
                  className="space-y-3"
                >
                  {/* Technology Icon + Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-2.5">
                      {activeTech.icon}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wider">
                      {activeTech.name}
                    </h3>
                  </div>

                  {/* Technology Technical Description */}
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
                    {activeTech.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: Inspira UI 3D Animate Grid             */}
          {/* ==================================================== */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[460px]">
            <AnimateGrid
              cards={TECH_DATA}
              hoveredIndex={hoveredIndex}
              onHoverIndex={(idx) => {
                if (idx !== null) {
                  setHoveredIndex(idx);
                }
              }}
              perspective={600}
              rotateX={isMobile ? 0 : -1}
              rotateY={isMobile ? 0 : -15}
              glowColor="#38ef7d"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
export default Stacks;
