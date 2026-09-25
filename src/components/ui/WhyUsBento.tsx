"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Headphones,
  Compass,
  Cpu,
  CheckCircle2,
  Rocket,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import IsometricBox01 from "./svgs/IsometricBox01";
import IsometricBoxes02 from "./svgs/IsometricBoxes02";
import { cn } from "@/lib/utils";

const PIPELINE_STEPS = [
  { id: "01", label: "BRIEFING", Icon: Headphones },
  { id: "02", label: "PLANO", Icon: Compass },
  { id: "03", label: "BUILD", Icon: Cpu },
  { id: "04", label: "TESTE", Icon: CheckCircle2 },
  { id: "05", label: "DEPLOY", Icon: Rocket },
];

export interface WhyUsBentoProps {
  className?: string;
}

export function WhyUsBento({ className }: WhyUsBentoProps) {
  return (
    <div className={cn("w-full relative z-10", className)}>
      {/* Bento Grid (3 colunas em telas médias/grandes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 auto-rows-auto">
        
        {/* 01: Automação & Agentes IA (Wide - Col span 2) */}
        <motion.div
          initial="initial"
          whileHover="hover"
          className="col-span-1 md:col-span-2 row-span-1 rounded-2xl bg-[#09090b]/90 border border-white/10 p-5 sm:p-6 md:p-7 relative overflow-hidden group transition-all duration-500 flex flex-col justify-center min-h-[175px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#5DADE2]/40"
        >
          {/* Visual: Isometric Box on the right */}
          <div className="absolute right-2 sm:right-4 md:right-3 lg:right-6 top-1/2 -translate-y-1/2 w-32 sm:w-44 md:w-52 lg:w-60 z-20 hidden sm:block pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity">
            <IsometricBox01 className="w-full h-auto" />
          </div>

          <div className="relative z-30 w-full sm:w-3/5">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white mb-2 relative overflow-hidden flex flex-wrap">
              <span className="flex">
                {"Automação & Agentes IA".split("").map((l, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    variants={{
                      initial: { y: 0 },
                      hover: { y: "-100%" },
                    }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.015,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                  >
                    {l === " " ? "\u00A0" : l}
                  </motion.span>
                ))}
              </span>
              <span
                className="absolute inset-0 flex text-[#5DADE2] pointer-events-none"
                aria-hidden
              >
                {"Automação & Agentes IA".split("").map((l, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    variants={{
                      initial: { y: "100%" },
                      hover: { y: 0 },
                    }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.015,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                  >
                    {l === " " ? "\u00A0" : l}
                  </motion.span>
                ))}
              </span>
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
              Construção de fluxos inteligentes, scripts e integrações que eliminam tarefas manuais repetitivas, conectando APIs, webhooks e bancos de dados para acelerar seus processos de negócio.
            </p>
          </div>

          {/* Watermark Number */}
          <div className="absolute -right-3 -bottom-8 text-[6rem] sm:text-[7rem] font-bold text-white/[0.03] pointer-events-none group-hover:scale-105 transition-transform duration-700 leading-none select-none font-display">
            01
          </div>
        </motion.div>

        {/* 02: Do Briefing ao Deploy (Tall & Dark - Col span 1, Row span 2) */}
        <div className="col-span-1 md:col-span-1 row-span-1 md:row-span-2 rounded-2xl border border-white/10 bg-[#09090b]/90 p-5 sm:p-6 md:p-7 relative overflow-hidden group transition-all duration-500 flex flex-col justify-between text-white min-h-[340px] sm:min-h-[380px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-white/20">
          
          {/* Visual: Stacked Cards */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] mb-4">
            <div className="relative w-full max-w-[170px] sm:max-w-[190px] aspect-4/3 group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 ease-out">
              {/* Back card 4 */}
              <div className="absolute inset-0 bg-neutral-900 rounded-xl border border-neutral-700/60 transform -rotate-12 -translate-x-3 translate-y-3 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-20deg] group-hover:-translate-x-6 group-hover:translate-y-6" />
              {/* Back card 3 */}
              <div className="absolute inset-0 bg-neutral-800 rounded-xl border border-neutral-600/60 transform -rotate-9 -translate-x-2.5 translate-y-2.5 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-15deg] group-hover:-translate-x-5 group-hover:translate-y-5" />
              {/* Back card 2 */}
              <div className="absolute inset-0 bg-neutral-800/90 rounded-xl border border-neutral-500/60 transform -rotate-6 -translate-x-1.5 translate-y-1.5 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-10deg] group-hover:-translate-x-3 group-hover:translate-y-3" />
              {/* Back card 1 */}
              <div className="absolute inset-0 bg-neutral-700/90 rounded-xl border border-neutral-400/60 transform -rotate-3 -translate-x-1 translate-y-1 shadow-xl transition-all duration-300 ease-out group-hover:-rotate-5 group-hover:-translate-x-1.5 group-hover:translate-y-1.5" />

              {/* Front card */}
              <div
                className="absolute inset-0 bg-[#0c0d12] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between text-white shadow-2xl border border-[#5DADE2]/30"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(93,173,226,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(93,173,226,0.06) 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-[#5DADE2] rounded-full animate-pulse" />
                  <div className="w-1.5 h-1.5 bg-[#3ECF8E] rounded-full" />
                  <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full" />
                </div>

                <div className="font-mono text-[13px] sm:text-[15px] font-bold leading-tight tracking-tight mt-auto mb-2 text-neutral-200">
                  Briefing.
                  <br />
                  <span className="text-[#5DADE2]">Arquitetura.</span>
                  <br />
                  <span className="text-[#3ECF8E]">Produção.</span>
                </div>

                <div className="font-mono text-[7.5px] sm:text-[8.5px] text-[#5DADE2] font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span>&gt; PRONTO PARA ESCALAR</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-1.5">
              Do Briefing ao Deploy
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
              Traga sua ideia ou gargalo operacional. Mapeamos requisitos técnicos, desenhamos a arquitetura ideal e entregamos a solução em produção com suporte contínuo.
            </p>
          </div>

          {/* Watermark Number */}
          <div className="absolute -right-4 -bottom-10 text-[8rem] sm:text-[10rem] font-bold text-white/[0.03] pointer-events-none group-hover:scale-105 transition-transform duration-700 leading-none select-none font-display">
            02
          </div>
        </div>

        {/* 03: Engenharia Direta (Box - Col span 1) */}
        <motion.div
          initial="initial"
          whileHover="hover"
          className="col-span-1 md:col-span-1 row-span-1 rounded-2xl border border-white/10 bg-[#09090b]/90 p-5 sm:p-6 relative overflow-hidden group transition-all duration-500 flex flex-col justify-between min-h-[175px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#3ECF8E]/40"
        >
          {/* Lucas Tomaz Profile Card Header */}
          <div className="flex items-center gap-3 relative z-10 mb-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#5DADE2]/60 shadow-[0_0_12px_rgba(93,173,226,0.3)] shrink-0">
              <Image
                src="/avatar.png"
                alt="Lucas Tomaz"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white font-display tracking-tight">
                  Lucas Tomaz
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E] animate-ping" />
              </div>
              <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                <ShieldCheck size={11} className="text-[#3ECF8E]" />
                Engenheiro Direto
              </span>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-base sm:text-lg font-bold font-display text-white mb-1">
              Engenharia Direta
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
              Sem intermediários ou telefone sem-fio. Você trata diretamente com quem arquiteta, programa e publica a sua aplicação.
            </p>
          </div>

          {/* Watermark Number */}
          <div className="absolute -right-2 -bottom-7 text-[5.5rem] font-bold text-white/[0.03] pointer-events-none group-hover:scale-105 transition-transform duration-700 leading-none select-none font-display">
            03
          </div>
        </motion.div>

        {/* 04: Esteira de Entrega Ágil (Box - Col span 1) */}
        <motion.div
          initial="initial"
          whileHover="hover"
          className="col-span-1 md:col-span-1 row-span-1 rounded-2xl border border-white/10 bg-[#09090b]/90 p-5 sm:p-6 relative overflow-hidden group transition-all duration-500 flex flex-col justify-between min-h-[175px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-white/20"
        >
          {/* Pipeline visual */}
          <div className="relative z-10 w-full mb-3">
            <div className="flex items-start justify-between">
              {PIPELINE_STEPS.map(({ id, label, Icon }, i) => (
                <React.Fragment key={id}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative p-1 rounded-md bg-white/5 border border-white/10 group-hover:border-[#5DADE2]/50 transition-colors">
                      <Icon
                        size={15}
                        className={cn(
                          "transition-colors",
                          i === PIPELINE_STEPS.length - 1
                            ? "text-[#3ECF8E]"
                            : "text-neutral-300 group-hover:text-white"
                        )}
                      />
                      {i === PIPELINE_STEPS.length - 1 && (
                        <span className="absolute -inset-0.5 rounded-md bg-[#3ECF8E]/20 animate-ping pointer-events-none" />
                      )}
                    </div>
                    <span className="text-[6.5px] sm:text-[7px] text-neutral-400 font-mono font-bold tracking-wider">
                      {label}
                    </span>
                  </div>

                  {i < PIPELINE_STEPS.length - 1 && (
                    <div className="mt-1 text-neutral-600 group-hover:text-neutral-400 transition-colors">
                      <ChevronRight size={10} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-base sm:text-lg font-bold font-display text-white mb-1">
              Esteira de Entrega Ágil
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
              Fluxo transparente em 5 etapas contínuas: alinhamento, estratégia, codificação, testes e publicação estável.
            </p>
          </div>

          {/* Watermark Number */}
          <div className="absolute -right-2 -bottom-7 text-[5.5rem] font-bold text-white/[0.03] pointer-events-none group-hover:scale-105 transition-transform duration-700 leading-none select-none font-display">
            04
          </div>
        </motion.div>

        {/* 05: Aplicações Web Modernas (Wide Bottom - Col span 3) */}
        <motion.div
          initial="initial"
          whileHover="hover"
          className="col-span-1 md:col-span-3 row-span-1 min-h-[175px] rounded-2xl bg-[#09090b]/90 border border-white/10 p-5 sm:p-6 md:p-7 relative overflow-hidden group transition-all duration-500 flex flex-col justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#5DADE2]/40"
        >
          {/* Visual: Isometric Layered Boxes on the right */}
          <div className="absolute right-2 sm:right-6 md:right-8 lg:right-12 bottom-0 w-36 sm:w-56 md:w-68 lg:w-76 z-20 hidden sm:block pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity">
            <IsometricBoxes02 className="w-full h-auto drop-shadow-md" />
          </div>

          <div className="relative z-30 w-full sm:w-3/5 md:w-3/5">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white mb-2">
              Aplicações Web Modernas
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-sans">
              Desenvolvimento completo com Next.js, React 19, TypeScript, APIs RESTful e bancos relacionais. Aplicações ultra-rápidas, focadas em alta conversão, responsividade e código limpo para fácil evolução.
            </p>
          </div>

          {/* Watermark Number */}
          <div className="absolute -right-4 -bottom-10 text-[7rem] sm:text-[9rem] font-bold text-white/[0.03] pointer-events-none group-hover:scale-105 transition-transform duration-700 leading-none select-none z-10 font-display">
            05
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default WhyUsBento;
