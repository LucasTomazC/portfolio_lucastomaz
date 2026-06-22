"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { ShieldCheck, Award, ExternalLink, Calendar } from "lucide-react";

interface Certificate {
  id: number;
  title: string;
  institution: string;
  date: string;
  techs: string[];
  credentialId: string;
}

const CERTIFICATES_DATA: Certificate[] = [
  {
    id: 1,
    title: "Next.js & React Fullstack Masterclass",
    institution: "Rocketseat",
    date: "Dez 2025",
    techs: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Server Actions", "Prisma"],
    credentialId: "RKT-NX-8827-X",
  },
  {
    id: 2,
    title: "Desenvolvimento Web & Performance Avançada",
    institution: "Alura",
    date: "Out 2025",
    techs: ["JavaScript Engine", "V8 Optimization", "Web Workers", "Core Web Vitals", "Lighthouse"],
    credentialId: "ALR-WP-0091-Y",
  },
  {
    id: 3,
    title: "Banco de Dados & Engenharia de APIs",
    institution: "Rocketseat",
    date: "Jul 2025",
    techs: ["PostgreSQL", "Node.js", "Redis Caching", "API Rate Limiting", "Docker"],
    credentialId: "RKT-DB-4012-P",
  },
];

export const Certificates: React.FC = () => {
  const { animationsEnabled } = useAnimation();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: animationsEnabled ? 0.7 : 0,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Rockstar cubic ease
      },
    },
  };

  return (
    <section
      id="certificados"
      className="py-24 md:py-32 px-6 md:px-12 bg-[#050505]/95 border-t border-white/5 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-display text-[#5DADE2] font-semibold">
            Conquistas
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mt-2 tracking-tight">
            Certificados <span className="text-white/20">&</span> Especializações
          </h2>
        </div>

        {/* Certificate Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {CERTIFICATES_DATA.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              className="bg-[#0d0d0d] border border-white/5 p-6 flex flex-col justify-between relative group hover:border-[#5DADE2]/30 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(93,173,226,0.05)] rounded-none"
            >
              {/* Outer top highlight border line */}
              <div className="absolute top-[-1px] left-[-1px] right-[-1px] h-[1px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-[#5DADE2]/50 transition-all duration-500" />

              <div>
                {/* SVG Certificate Graphic Mockup (Highly stylized & techy) */}
                <div className="h-40 w-full bg-[#050505] border border-white/5 flex flex-col justify-between p-4 relative overflow-hidden mb-6 group-hover:border-[#5DADE2]/10 transition-colors">
                  
                  {/* Grid Lines Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
                  
                  {/* Certificate Top details */}
                  <div className="flex justify-between items-start relative z-10">
                    <Award className="w-5 h-5 text-[#5DADE2] opacity-80" />
                    <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">
                      CRED_ID // {cert.credentialId}
                    </span>
                  </div>

                  {/* Circular seal stamp */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-dashed border-[#5DADE2]/10 flex items-center justify-center pointer-events-none">
                    <ShieldCheck className="w-6 h-6 text-[#5DADE2]/5" />
                  </div>

                  {/* Certificate graphic bottom stamp */}
                  <div className="flex justify-between items-end relative z-10 border-t border-white/5 pt-2">
                    <div className="text-left">
                      <span className="text-[7px] font-mono text-white/30 block">VERIFIED_ISSUER</span>
                      <span className="text-[8px] font-mono text-white/60 font-semibold uppercase">{cert.institution}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[7px] font-mono text-white/30 block">DATE_STAMP</span>
                      <span className="text-[8px] font-mono text-white/60 font-semibold uppercase">{cert.date}</span>
                    </div>
                  </div>
                </div>

                {/* Date stamp details */}
                <div className="flex items-center gap-1.5 text-xs text-white/55 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-[#5DADE2]/70" />
                  <span>Concluído em {cert.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-bold text-white group-hover:text-[#5DADE2] transition-colors uppercase tracking-tight leading-snug">
                  {cert.title}
                </h3>

                {/* Institution label */}
                <h4 className="text-sm font-semibold text-white/60 mt-1 mb-6">
                  {cert.institution}
                </h4>
              </div>

              {/* Technologies tag badges & credentials link */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6 border-t border-white/5 pt-4">
                  {cert.techs.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono px-2 py-0.5 border border-white/5 bg-white/5 text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {cert.techs.length > 3 && (
                    <span className="text-[9px] font-mono px-2 py-0.5 text-white/30 font-semibold">
                      +{cert.techs.length - 3} mais
                    </span>
                  )}
                </div>

                <a
                  href="https://github.com/LucasTomazC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 border border-white/5 hover:border-white/20 text-[10px] font-display font-semibold tracking-wider text-white/70 hover:text-white uppercase flex items-center justify-center gap-1.5 hover:bg-white/5 transition-all duration-300 rounded-none"
                >
                  Verificar Autenticidade
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
