"use client";

import React, { useState } from "react";
import { useAnimation } from "@/context/AnimationContext";
import { GraduationCap, Clock } from "lucide-react";
import Image from "next/image";

// Helper to merge classes
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

interface Certificate {
  id: number;
  title: string;
  tutor: string;
  status: string;
  image: string;
  subtitle: string;
}

const CERTIFICATES_DATA: Certificate[] = [
  {
    id: 1,
    title: "The Complete Full-Stack Web Development Bootcamp",
    tutor: "Angela Yu",
    status: "Em andamento",
    subtitle: "Web Development Bootcamp",
    image: "/cert_fullstack.png",
  },
  {
    id: 2,
    title: "The Complete JavaScript Course",
    tutor: "Jonas Schmedtmann",
    status: "Em andamento",
    subtitle: "Modern JavaScript",
    image: "/cert_javascript.png",
  },
  {
    id: 3,
    title: "The Ultimate React Course: React, Next.js & More",
    tutor: "Jonas Schmedtmann",
    status: "Em andamento",
    subtitle: "React & Next.js Ecosystem",
    image: "/cert_react.png",
  },
  {
    id: 4,
    title: "Algoritmos e Lógica de Programação",
    tutor: "Nelio Alves",
    status: "Em andamento",
    subtitle: "Algorithms & Logic",
    image: "/cert_logic.png",
  },
];

export const Certificates: React.FC = () => {
  const { animationsEnabled } = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="certificados"
      className="py-24 md:py-32 px-6 md:px-12 bg-[#050505]/95 border-t border-white/5 relative z-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-display text-[#5DADE2] font-semibold">
            Formação & Estudos
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mt-2 tracking-tight">
            Certificados <span className="text-white/20">&</span> Especializações
          </h2>
          <p className="max-w-md text-sm text-neutral-400 mt-4 leading-relaxed font-sans mx-auto md:mx-0">
            Especializações e cursos de alto nível em desenvolvimento de software atualmente em andamento. Passe o mouse ou toque para expandir os detalhes.
          </p>
        </div>

        {/* Expandable Gallery Component */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl flex flex-col md:flex-row h-[850px] md:h-[480px] gap-3 md:gap-4">
            {CERTIFICATES_DATA.map((cert, index) => {
              const isExpanded = hoveredIndex === index;
              return (
                <div
                  key={cert.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setHoveredIndex(isExpanded ? null : index)}
                  className={cn(
                    "relative overflow-hidden cursor-pointer rounded-xl border transition-all duration-500 ease-out group select-none bg-[#09090b]",
                    hoveredIndex === null
                      ? "flex-1 border-white/5"
                      : isExpanded
                      ? "flex-[3.5] border-[#5DADE2]/40 shadow-[0_0_30px_rgba(93,173,226,0.15)] scale-[1.005]"
                      : "flex-[0.7] border-white/5 opacity-40"
                  )}
                >
                  {/* Background Image */}
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700 pointer-events-none",
                      isExpanded ? "scale-105 opacity-90" : "scale-100 opacity-60 group-hover:scale-105 group-hover:opacity-85"
                    )}
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority={index < 2}
                  />

                  {/* Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none" />

                  {/* Content Container */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 md:p-6 pointer-events-none">
                    
                    {/* Top: Status Badge */}
                    <div className="flex justify-between items-start w-full">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-[#5DADE2]/30 text-[#5DADE2] font-mono text-[9px] uppercase tracking-wider rounded-md">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5DADE2]/50 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5DADE2]"></span>
                        </span>
                        {cert.status}
                      </div>
                      <span className="text-[10px] font-mono text-white/30 font-semibold">0{cert.id}</span>
                    </div>

                    {/* Bottom: Title & Instructor details */}
                    <div className="w-full flex flex-col text-left">
                      <p className="text-[#5DADE2] text-[8px] md:text-[9px] font-mono uppercase tracking-[0.15em] mb-1 font-semibold">
                        {cert.subtitle}
                      </p>
                      
                      <h3 className={cn(
                        "text-white font-display font-bold uppercase tracking-wide transition-all duration-300 leading-snug",
                        isExpanded ? "text-sm md:text-base" : "text-xs md:text-sm line-clamp-2 md:line-clamp-none md:truncate md:max-w-[90%]"
                      )}>
                        {cert.title}
                      </h3>

                      {/* Expanded Details Section */}
                      <div
                        className={cn(
                          "transition-all duration-500 ease-in-out overflow-hidden",
                          isExpanded ? "opacity-100 max-h-24 mt-3" : "opacity-0 max-h-0"
                        )}
                      >
                        <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                          <div className="flex items-center gap-2 text-neutral-300 font-sans text-xs">
                            <GraduationCap className="w-4 h-4 text-[#5DADE2]/80" />
                            <span>Tutor: <strong className="text-white font-semibold">{cert.tutor}</strong></span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-300 font-sans text-xs">
                            <Clock className="w-4 h-4 text-[#5DADE2]/80" />
                            <span className="font-mono text-[9px] text-neutral-400">STATUS // ESTUDO ATIVO</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
