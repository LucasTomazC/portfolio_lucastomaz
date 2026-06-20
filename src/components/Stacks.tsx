"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { Layers, Server, Database, Settings } from "lucide-react";

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "database" | "devops";
}

const TECH_LIST: TechItem[] = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "HTML5/CSS3", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "GSAP", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Prisma ORM", category: "database" },
  { name: "Docker", category: "devops" },
  { name: "Git", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
];

export const Stacks: React.FC = () => {
  const { animationsEnabled } = useAnimation();

  // Create double list for infinite loop marquee
  const row1 = [...TECH_LIST, ...TECH_LIST];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: animationsEnabled ? 0.6 : 0,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  // Organize techs by architecture layers
  const layers = [
    {
      title: "Front-end Development",
      icon: <Layers className="w-5 h-5 text-[#5DADE2]" />,
      techs: TECH_LIST.filter((t) => t.category === "frontend"),
      desc: "Interfaces limpas, responsivas e orientadas à performance e experiência.",
    },
    {
      title: "Back-end Development",
      icon: <Server className="w-5 h-5 text-[#5DADE2]" />,
      techs: TECH_LIST.filter((t) => t.category === "backend"),
      desc: "Regras de negócio, criação de APIs escaláveis e arquiteturas limpas.",
    },
    {
      title: "Banco de Dados",
      icon: <Database className="w-5 h-5 text-[#5DADE2]" />,
      techs: TECH_LIST.filter((t) => t.category === "database"),
      desc: "Modelagem relacional e não-relacional, consultas ágeis e ORMs.",
    },
    {
      title: "DevOps & Tools",
      icon: <Settings className="w-5 h-5 text-[#5DADE2]" />,
      techs: TECH_LIST.filter((t) => t.category === "devops"),
      desc: "Containers, versionamento seguro e fluxos de integração e entrega contínua.",
    },
  ];

  return (
    <section
      id="stacks"
      className="py-24 md:py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden z-10"
    >
      {/* Infinite Marquee Section */}
      <div className="w-full relative py-6 mb-20 overflow-hidden">
        
        {/* Single Row (Scrolling Left - Slower and Natural text stream) */}
        <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div
            className={`flex gap-8 shrink-0 py-4 items-center ${
              animationsEnabled ? "animate-marquee-slow" : ""
            }`}
          >
            {row1.map((tech, i) => (
              <div
                key={`row1-${tech.name}-${i}`}
                className="flex items-center gap-8 select-none"
              >
                <span className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-widest text-white/15 hover:text-[#5DADE2] transition-colors duration-300 cursor-default">
                  {tech.name}
                </span>
                <span className="text-white/5 text-2xl font-bold">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Layers (Tree/Pyramid) Dashboard */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-20 text-center">
          <span className="text-xs uppercase tracking-widest font-display text-[#5DADE2] font-semibold">
            Tecnologias
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mt-2 tracking-tight">
            Nível Técnico <span className="text-white/20">&</span> Stacks
          </h2>
          <p className="max-w-xl mx-auto text-sm text-white/50 mt-4 leading-relaxed font-sans">
            Organização hierárquica e prática das ferramentas que utilizo no dia a dia para desenvolver soluções robustas.
          </p>
        </div>

        {/* Layer Blocks */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {layers.map((layer, idx) => (
            <motion.div
              key={layer.title}
              variants={itemVariants}
              className="p-6 bg-[#0d0d0d] border border-white/5 relative group hover:border-[#5DADE2]/20 transition-all duration-300 flex flex-col justify-between"
              style={{ borderRadius: "0px" }} // Sharp geometry
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                <div className="absolute top-[-8px] right-[-8px] w-12 h-12 bg-[#5DADE2]/0 group-hover:bg-[#5DADE2]/10 blur-md transition-colors duration-500 rounded-full" />
              </div>

              <div>
                {/* Header Icon + Label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-[#5DADE2]/30 transition-colors duration-300">
                    {layer.icon}
                  </div>
                  <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                    {layer.title.split(" ")[0]} <span className="text-white/50">{layer.title.split(" ").slice(1).join(" ")}</span>
                  </h3>
                </div>

                <p className="text-xs text-white/40 leading-relaxed font-sans mb-6">
                  {layer.desc}
                </p>
              </div>

              {/* Badges Container */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {layer.techs.map((tech) => (
                  <span
                    key={tech.name}
                    className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/5 text-white/70 hover:border-[#5DADE2]/40 hover:text-white transition-all duration-300 cursor-default"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
