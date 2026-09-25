"use client";

import React from "react";
import { StaggerText } from "@/components/ui/StaggerText";
import { WhyUsBento } from "@/components/ui/WhyUsBento";
import { TypingKeyboard } from "@/components/ui/TypingKeyboard";

export const Services: React.FC = () => {
  return (
    <section
      id="servicos"
      className="py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-[#050505]/95 border-t border-white/5 relative z-10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5DADE2]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#3ECF8E]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 md:mb-20 text-center md:text-left">
          <StaggerText
            as="span"
            text="Soluções & Atuação"
            divideBy="word"
            className="text-xs uppercase tracking-widest font-display text-[#5DADE2] font-semibold"
          />
          <StaggerText
            as="h2"
            text="Serviços & Engenharia Sob Medida"
            divideBy="word"
            delay={0.1}
            className="text-3xl md:text-5xl font-display font-bold text-white uppercase mt-2 tracking-tight"
          />
          <p className="max-w-xl text-sm text-neutral-400 mt-4 leading-relaxed font-sans mx-auto md:mx-0">
            Do alinhamento estratégico à entrega final em produção: construo automações inteligentes, integrações de APIs e aplicações web modernas de alto padrão.
          </p>
        </div>

        {/* Layout Grid Assimétrico 65% / 35% */}
        <div className="flex flex-col xl:flex-row items-stretch gap-6 lg:gap-8">
          
          {/* Lado Esquerdo: Bento Grid (Em mobile fica abaixo como order-2, em desktop à esquerda como order-1) */}
          <div className="w-full xl:w-[63%] order-2 xl:order-1 flex flex-col justify-center">
            <WhyUsBento />
          </div>

          {/* Lado Direito: Teclado 3D Limpo & Funcional (Em mobile fica no topo como order-1, em desktop à direita como order-2) */}
          <div className="w-full xl:w-[37%] order-1 xl:order-2 flex flex-col justify-center">
            <div className="h-full min-h-[400px] sm:min-h-[460px] rounded-2xl bg-[#09090b]/90 border border-white/10 p-2 sm:p-4 flex items-center justify-center relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] group hover:border-[#5DADE2]/30 transition-colors">
              <TypingKeyboard 
                scale={0.74}
                accentColor="#5DADE2"
                secondaryAccent="#3ECF8E"
                autoTypeText="Faço soluções úteis para automatizar processos e escalar produtos web.        "
                className="w-full h-full"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;
