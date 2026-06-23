"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { Layers, Server, Database, Settings } from "lucide-react";

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "database" | "devops";
  color: string;
  desc: string;
  icon: React.ReactNode;
}

const TECH_DATA: TechItem[] = [
  // ================= FRONTEND =================
  {
    name: "React",
    category: "frontend",
    color: "#61DAFB",
    desc: "Desenvolvimento de interfaces de alto desempenho baseadas em componentes declarativos, gerenciamento de estado refinado e hooks customizados.",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "frontend",
    color: "#FFFFFF",
    desc: "Aplicações corporativas full-stack com SSR/SSG otimizados, App Router, estratégias híbridas de renderização, Server Actions e SEO técnico.",
    icon: (
      <svg viewBox="0 0 180 180" className="w-6 h-6">
        <circle cx="90" cy="90" r="85" fill="black" stroke="white" strokeWidth="6" />
        <path d="M140 145 L80 70 L70 70 L70 120" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="115" y="70" width="12" height="50" fill="white" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "frontend",
    color: "#3178C6",
    desc: "Estruturação de código limpo utilizando tipagem estática estrita, interfaces genéricas, types customizados e validação ativa em compilação.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-6 h-6 fill-[#3178C6]">
        <rect width="100" height="100" rx="10" />
        <text x="24" y="72" fill="white" fontSize="40" fontWeight="bold" fontFamily="monospace">T</text>
        <text x="54" y="72" fill="white" fontSize="40" fontWeight="bold" fontFamily="monospace">S</text>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    color: "#38BDF8",
    desc: "Estilização modular baseada em utilitários e design tokens consistentes, promovendo responsividade mobile-first e excelente performance gráfica.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#38BDF8]">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 0.913 0.228 1.565 0.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-0.913-0.228-1.565-0.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913 0.228 1.565 0.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    category: "frontend",
    color: "#F7DF1E",
    desc: "Manipulação nativa da DOM (ES6+), Promises, async/await assíncrono, gerenciamento de memória e otimização geral no motor Chrome V8.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-6 h-6 fill-[#F7DF1E]">
        <rect width="100" height="100" rx="10" />
        <text x="50" y="80" fill="black" fontSize="42" fontWeight="bold" fontFamily="sans-serif">JS</text>
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    category: "frontend",
    color: "#E10098",
    desc: "Animações fluidas de interface de usuário baseadas em física real (spring physics), transições de rotas e orquestração de layouts complexos.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#E10098]">
        <path d="M12 0l12 12H12V0zm-12 12l12 12V12H0zm12 0h12v12H12V12z" />
      </svg>
    ),
  },
  {
    name: "GSAP",
    category: "frontend",
    color: "#88CE02",
    desc: "Animações avançadas baseadas em scroll (ScrollTrigger), manipulação precisa de timelines complexas e renderização vetorial de alto desempenho.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-[#88CE02] stroke-[8]">
        <rect x="10" y="10" width="80" height="80" rx="15" strokeWidth="6" />
        <text x="18" y="65" fill="#88CE02" fontSize="45" fontWeight="bold" fontFamily="sans-serif" stroke="none">G</text>
      </svg>
    ),
  },
  {
    name: "Vite",
    category: "frontend",
    color: "#646CFF",
    desc: "Ferramental de bundling moderno e ultra-rápido com Hot Module Replacement (HMR) instantâneo para otimização do fluxo de desenvolvimento.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-6 h-6">
        <defs>
          <linearGradient id="vite-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4158D0" />
            <stop offset="50%" stopColor="#C850C0" />
            <stop offset="100%" stopColor="#FFCC70" />
          </linearGradient>
        </defs>
        <path d="M10 20 L50 90 L90 20 Z" fill="url(#vite-grad)" />
        <path d="M45 40 L55 25 L45 55 L55 55 L45 75 L60 48 L50 48 Z" fill="#FFD600" />
      </svg>
    ),
  },

  // ================= BACKEND =================
  {
    name: "Node.js",
    category: "backend",
    color: "#339933",
    desc: "Desenvolvimento de microserviços e serviços back-end rápidos utilizando o modelo de I/O não-bloqueante orientado a eventos.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#339933]">
        <path d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2zm6 12.3l-6 3.4-6-3.4v-6.8l6-3.4 6 3.4v6.8z" />
      </svg>
    ),
  },
  {
    name: "Express",
    category: "backend",
    color: "#FFFFFF",
    desc: "Criação de rotas modulares de API RESTful rápidas e minimalistas com estruturação robusta de middlewares globais e tratamento de erros.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-white stroke-[8]">
        <rect x="10" y="10" width="80" height="80" rx="15" strokeWidth="6" />
        <text x="22" y="65" fill="white" fontSize="40" fontWeight="bold" fontFamily="sans-serif" stroke="none">Ex</text>
      </svg>
    ),
  },
  {
    name: "NestJS",
    category: "backend",
    color: "#E0234E",
    desc: "Estruturação corporativa utilizando a arquitetura Model-View-Controller clássica orientada por injeção de dependências sob regras do SOLID.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#E0234E]">
        <path d="M12 2L2 9.5l3.5 12h13L22 9.5L12 2zm0 3.5l6 4.5l-2.5 8.5h-7L6 10l6-4.5z" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "backend",
    color: "#3776AB",
    desc: "Automação de fluxos de processos, desenvolvimento ágil de microsserviços integrados com FastAPI e tratamento de conjuntos de dados.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-6 h-6">
        <path d="M50 5C25.1 5 25.1 15.9 25.1 15.9L25.1 26.8H46.9C52.4 26.8 56.9 31.3 56.9 36.8L56.9 47.7H67.8C78.7 47.7 89.6 47.7 89.6 22.9C89.6-1.9 67.8 5 50 5Z" fill="#3776AB" />
        <path d="M50 95C74.9 95 74.9 84.1 74.9 84.1L74.9 73.2H53.1C47.6 73.2 43.1 68.7 43.1 63.2L43.1 52.3H32.2C21.3 52.3 10.4 52.3 10.4 77.1C10.4 98.9 32.2 95 50 95Z" fill="#FFE873" />
        <circle cx="37.5" cy="15.9" r="4" fill="white" />
        <circle cx="62.5" cy="84.1" r="4" fill="black" />
      </svg>
    ),
  },
  {
    name: "REST APIs",
    category: "backend",
    color: "#00A3E0",
    desc: "Modelagem criteriosa de interfaces de comunicação com padronização semântica HTTP, códigos de status específicos e versionamento seguro.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#00A3E0]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <path d="M12 8v8M5 16l7-8 7 8" />
      </svg>
    ),
  },
  {
    name: "Fastify",
    category: "backend",
    color: "#E2E8F0",
    desc: "Desenvolvimento de APIs RESTful de baixíssimo overhead, com validação instantânea de schemas via JSON Schema e alta taxa de vazão.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-[#4A5568] stroke-[8]">
        <circle cx="50" cy="50" r="45" fill="black" stroke="#4A5568" strokeWidth="6" />
        <path d="M35 50 L50 25 L45 50 L65 50 L50 75 L55 50 Z" fill="#FFD600" stroke="none" />
      </svg>
    ),
  },
  {
    name: "GraphQL",
    category: "backend",
    color: "#E10098",
    desc: "Consultas otimizadas através de tipos auto-declarativos, resolvendo problemas clássicos de underfetching e overfetching na rede.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-6 h-6">
        <g fill="none" stroke="#E10098" strokeWidth="4">
          <polygon points="50,10 90,32 90,78 50,90 10,78 10,32" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="90" y1="32" x2="10" y2="78" />
          <line x1="90" y1="78" x2="10" y2="32" />
        </g>
        <g fill="#E10098">
          <circle cx="50" cy="10" r="6" />
          <circle cx="90" cy="32" r="6" />
          <circle cx="90" cy="78" r="6" />
          <circle cx="50" cy="90" r="6" />
          <circle cx="10" cy="78" r="6" />
          <circle cx="10" cy="32" r="6" />
        </g>
      </svg>
    ),
  },
  {
    name: "WebSockets",
    category: "backend",
    color: "#00E6FF",
    desc: "Transmissão contínua de dados em tempo real utilizando conexões TCP persistentes bidirecionais eficientes sem overhead HTTP.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#00E6FF]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="2" fill="#00E6FF" />
        <circle cx="19" cy="12" r="2" fill="#00E6FF" />
        <path d="M7 12h10M12 7v10M9 9l6 6M9 15l6-6" />
      </svg>
    ),
  },

  // ================= BANCO DE DADOS =================
  {
    name: "PostgreSQL",
    category: "database",
    color: "#336791",
    desc: "Arquitetura relacional avançada, otimização de consultas complexas com joins, indexação de performance e controle transacional rígido.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#336791]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a8 8 0 0 0 8-8c0-5.5-4.5-8-10-8H8c-2.2 0-4 1.8-4 4s1.8 4 4 4h1" />
        <path d="M16 14a2 2 0 1 0-4 0M10 8V6a3 3 0 0 0-3-3" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    category: "database",
    color: "#47A248",
    desc: "Modelagem documental Não-Relacional de grande escala, manipulação de coleções complexas, agregações e schemas flexíveis.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#47A248]" strokeWidth="2">
        <path d="M12 2C12 2 6 7 6 12C6 17 12 22 12 22C12 22 18 17 18 12C18 7 12 2" fill="#47A248" fillOpacity="0.2" />
        <path d="M12 2v20" />
        <path d="M12 8c2.5 1.5 4 4 4 4s-1.5 2.5-4 4M12 8c-2.5 1.5-4 4-4 4s1.5 2.5 4 4" />
      </svg>
    ),
  },
  {
    name: "Prisma",
    category: "database",
    color: "#2B6CB0",
    desc: "Mapeamento objeto-relacional (ORM) seguro com geração automática de tipos TypeScript estritos, migrations estruturadas e queries velozes.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-[#2B6CB0]" strokeWidth="6">
        <polygon points="50,10 90,80 10,80" />
        <line x1="50" y1="10" x2="50" y2="80" />
        <line x1="50" y1="50" x2="90" y2="80" />
        <line x1="50" y1="50" x2="10" y2="80" />
      </svg>
    ),
  },
  {
    name: "Redis",
    category: "database",
    color: "#DC382D",
    desc: "Armazenamento em cache na memória RAM de alta velocidade, barramento de mensageria chave-valor simples e rate limiting de requisições.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#DC382D]" strokeWidth="2">
        <path d="M3 6l9-3 9 3-9 3-9-3zM3 12l9-3 9 3-9 3-9-3zM3 18l9-3 9 3-9 3-9-3z" fill="#DC382D" fillOpacity="0.1" />
        <path d="M3 6v12M21 6v12M12 9v12" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    category: "database",
    color: "#3ECF8E",
    desc: "Arquitetura PostgreSQL como serviço (BaaS) com autenticação nativa, Row Level Security (RLS) avançado e gatilhos de dados em tempo real.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#3ECF8E]">
        <path d="M13.5 2L4.5 12.5h7.5V22l9-10.5h-7.5V2z" />
      </svg>
    ),
  },
  {
    name: "SQL",
    category: "database",
    color: "#007ACC",
    desc: "Escrita manual de scripts otimizados para relacionamentos complexos de tabelas, joins encadeados, subqueries de controle e views rápidas.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#007ACC]" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
  },
  {
    name: "Firebase",
    category: "database",
    color: "#FFCA28",
    desc: "Base NoSQL Firestore para prototipagem rápida em tempo real, integração direta com redes sociais e armazenamento de sessões estáticas.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#FFCA28]">
        <path d="M3.89 15.67L10.05 2.18c.17-.37.71-.37.88 0l2.08 4.09 1.12-2.18c.17-.33.64-.33.81 0l5.04 9.87c.21.41-.09.91-.55.91H4.45c-.46 0-.76-.5-.56-.91z" />
        <path d="M3.89 15.67L10.05 2.18c.17-.37.71-.37.88 0l9.05 13.49c.32.48-.02 1.13-.6.13l-9.33-13.62z" fill="#F57C00" />
      </svg>
    ),
  },
  {
    name: "SQLite",
    category: "database",
    color: "#003B57",
    desc: "Banco de dados relacional encapsulado de alta performance local, perfeito para mocks de infraestrutura local, testes rápidos e micro-instâncias.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-[#003B57]" strokeWidth="8">
        <ellipse cx="50" cy="30" rx="40" ry="15" />
        <path d="M10 30v40c0 8.3 17.9 15 40 15s40-6.7 40-15V30" />
        <path d="M10 50c0 8.3 17.9 15 40 15s40-6.7 40-15" />
        <text x="32" y="58" fill="#003B57" fontSize="22" fontWeight="bold" fontFamily="sans-serif" stroke="none">SQL</text>
      </svg>
    ),
  },

  // ================= DEVOPS =================
  {
    name: "Docker",
    category: "devops",
    color: "#2496ED",
    desc: "Isolamento de infraestrutura através de contêineres replicáveis, garantindo consistência total entre ambientes locais e produção.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#2496ED]">
        <path d="M13.983 8.871h-1.996v1.996h1.996V8.871zm-2.495 0h-1.996v1.996h1.996V8.871zm-2.495 0H6.997v1.996h1.996V8.871zm-2.495 0H4.501v1.996h1.996V8.871zm5.234-2.5h-1.996v1.996h1.996V6.371zm-2.495 0H6.997V8.37h1.996V6.371zm-2.495 0H4.501V8.37h1.996V6.371zm0-2.5H4.501v1.996h1.996V3.871zm15.74 8.76c-.056-.168-.266-.889-.785-1.57-.45-.589-1.127-.889-2.022-.889-.968 0-1.745.385-2.226.792-.375.318-.686.721-.908 1.157-.183-.056-.37-.084-.564-.084h-.056c-.03 0-.056.014-.084.014-.422-.056-.84-.112-1.258-.112h-.056c-.225 0-.442.028-.655.056-.188-.124-.469-.25-.83-.25h-5.235c-.056 0-.112.014-.168.028a3.175 3.175 0 00-.591-.056h-1.996c-.33 0-.616.14-.814.364v5.474c0 .35.286.63.63.63H18.99c2.812 0 5.093-2.281 5.093-5.093 0-1.042-.37-2.022-1.01-2.822z" />
      </svg>
    ),
  },
  {
    name: "Git",
    category: "devops",
    color: "#F05032",
    desc: "Versionamento distribuído de código com controle de ramificações (branching), commits organizados e histórico limpo com rebase.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#F05032]" strokeWidth="2">
        <circle cx="12" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="12" r="3" />
        <path d="M6 9v3a3 3 0 0 0 3 3h6" />
        <path d="M18 9v3" />
      </svg>
    ),
  },
  {
    name: "GitHub Actions",
    category: "devops",
    color: "#58A6FF",
    desc: "Automação completa do ciclo de deploy integrando testes contínuos, análise de cobertura de código e entrega direta de código à nuvem.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#58A6FF]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 16V8l5 4-5 4z" fill="#58A6FF" fillOpacity="0.2" />
        <path d="M21 12H14" />
      </svg>
    ),
  },
  {
    name: "Linux",
    category: "devops",
    color: "#FCC624",
    desc: "Operação e administração nativa de servidores baseados em distribuições Unix, scripts Bash para automação e manipulação avançada de terminais.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#FCC624]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    name: "AWS",
    category: "devops",
    color: "#FF9900",
    desc: "Orquestração básica de infraestrutura em nuvem segura, gerenciando instâncias de execução EC2, bucket S3 e isolamento de rede VPC.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-6 h-6">
        <path d="M80 50 C80 65 65 80 50 80 C35 80 20 65 20 50 C20 35 35 20 50 20 C65 20 80 35 80 50 Z" fill="#232F3E" />
        <path d="M25 85 Q50 98 75 85" fill="none" stroke="#FF9900" strokeWidth="6" strokeLinecap="round" />
        <polygon points="75,85 70,75 82,82" fill="#FF9900" />
        <text x="32" y="58" fill="white" fontSize="24" fontWeight="bold" fontFamily="sans-serif">aws</text>
      </svg>
    ),
  },
  {
    name: "Vercel",
    category: "devops",
    color: "#FFFFFF",
    desc: "Serviço gerenciado otimizado para frameworks web modernos com deploys git-triggered, edge computing rápida e serverless functions nativas.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <polygon points="12,2 22,20 2,20" />
      </svg>
    ),
  },
  {
    name: "CI/CD",
    category: "devops",
    color: "#00FF66",
    desc: "Modelagem de fluxos automatizados de integração, validação de tipos, verificação de qualidade com linters e compilação limpa de bundles.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#00FF66]" strokeWidth="2">
        <path d="M4 12c0-3.3 2.7-6 6-6 2.5 0 4.7 1.5 5.5 3.8l.5 1.4c.8 2.3 3 3.8 5.5 3.8 3.3 0 6-2.7 6-6s-2.7-6-6-6c-2.5 0-4.7 1.5-5.5 3.8l-.5 1.4c-.8 2.3-3 3.8-5.5 3.8-3.3 0-6-2.7-6-6z" transform="scale(0.8) translate(3, 3)" />
      </svg>
    ),
  },
  {
    name: "HTML5/CSS3",
    category: "devops",
    color: "#E34F26",
    desc: "Construção semântica de layouts modernos seguindo padrões rígidos de acessibilidade (WAI-ARIA), SEO técnico e responsividade de tela.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#E34F26]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
];

const TABS = [
  { id: "frontend", label: "Front-end", icon: <Layers className="w-4 h-4" /> },
  { id: "backend", label: "Back-end", icon: <Server className="w-4 h-4" /> },
  { id: "database", label: "Banco de Dados", icon: <Database className="w-4 h-4" /> },
  { id: "devops", label: "DevOps & Tools", icon: <Settings className="w-4 h-4" /> },
] as const;

export const Stacks: React.FC = () => {
  const { animationsEnabled } = useAnimation();
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "database" | "devops">("frontend");
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  // Math orbital settings responsive
  const [radius, setRadius] = useState({ x: 300, y: 75 });
  const [rotationAngle, setRotationAngle] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isHoveringWheel = useRef(false);
  const startX = useRef(0);
  const startAngle = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  // Resize listener
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setRadius({ x: 130, y: 35 }); // Mobile
      } else if (window.innerWidth < 1024) {
        setRadius({ x: 230, y: 60 }); // Tablet
      } else {
        setRadius({ x: 320, y: 80 }); // Desktop
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Filter tech by current category (memoized to prevent infinite useEffect triggers)
  const activeTechs = useMemo(() => TECH_DATA.filter((t) => t.category === activeTab), [activeTab]);

  // Reset rotation angle on category change has been moved directly to the tab click handlers.

  // RequestAnimationFrame loop for auto rotation and inertia drag
  useEffect(() => {
    if (!animationsEnabled) return;

    let frameId: number;
    const tick = () => {
      if (!isDragging.current) {
        if (Math.abs(velocity.current) > 0.02) {
          setRotationAngle((prev) => prev + velocity.current * 0.015);
          velocity.current *= 0.95; // Damping/friction factor
        } else if (!isHoveringWheel.current) {
          // Slow ambient orbit animation when idle: 0.0025 rads per frame
          setRotationAngle((prev) => prev + 0.0025);
        }
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [animationsEnabled]);

  // Dynamically select the tech that is currently closest to the front (depth z is maximized)
  useEffect(() => {
    if (isHoveringWheel.current || isDragging.current) return;
    if (activeTechs.length === 0) return;

    let closestIndex = 0;
    let maxZ = -Infinity;

    activeTechs.forEach((tech, index) => {
      const itemAngle = rotationAngle + (index * 2 * Math.PI) / activeTechs.length;
      const z = Math.cos(itemAngle);
      if (z > maxZ) {
        maxZ = z;
        closestIndex = index;
      }
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHoveredTech(activeTechs[closestIndex]);
  }, [rotationAngle, activeTab, activeTechs]);

  // Drag handlers using Pointer Events for unified touch/mouse support
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!animationsEnabled) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startAngle.current = rotationAngle;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    velocity.current = 0;
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    
    // Rotation sensitivity
    const sensitivity = window.innerWidth < 640 ? 0.012 : 0.007;
    const newAngle = startAngle.current + dx * sensitivity;
    setRotationAngle(newAngle);

    // Speed velocity measurement
    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      const speed = (e.clientX - lastX.current) / dt;
      velocity.current = speed * 12; // Speed multiplier
    }
    lastX.current = e.clientX;
    lastTime.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section
      id="stacks"
      className="py-24 md:py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden z-10 select-none"
    >
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <span className="text-xs uppercase tracking-widest font-display text-[#5DADE2] font-semibold">
            Tecnologias
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mt-2 tracking-tight">
            Nível Técnico <span className="text-white/20">&</span> Stacks
          </h2>
          <p className="max-w-xl mx-auto text-sm text-white/55 mt-4 leading-relaxed font-sans">
            Explore as ferramentas e arquiteturas agrupadas por categoria. Arraste ou segure o anel para interagir com as Stacks em 3D.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-2xl mx-auto border border-white/5 p-1.5 bg-[#090909] rounded-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setRotationAngle(0);
                }}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-display font-semibold uppercase tracking-wider transition-all duration-300 rounded-none w-full sm:w-auto justify-center ${
                  isActive
                    ? "bg-[#5DADE2] text-black shadow-[0_0_20px_rgba(93,173,226,0.2)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Area */}
        <div className="relative min-h-[460px] w-full flex flex-col items-center justify-between">
          
          {animationsEnabled ? (
            /* ================= 3D INTERACTIVE ORBITAL LAYOUT ================= */
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onMouseEnter={() => { isHoveringWheel.current = true; }}
              onMouseLeave={() => { isHoveringWheel.current = false; }}
              className="relative w-full h-[280px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
            >
              {/* Glowing category engine central core */}
              <div
                className="absolute w-12 h-12 rounded-full blur-2xl opacity-40 transition-colors duration-1000 pointer-events-none"
                style={{
                  backgroundColor: TABS.find((t) => t.id === activeTab)?.id === "frontend"
                    ? "#61DAFB"
                    : TABS.find((t) => t.id === activeTab)?.id === "backend"
                    ? "#339933"
                    : TABS.find((t) => t.id === activeTab)?.id === "database"
                    ? "#4169E1"
                    : "#FF9900",
                }}
              />

              {/* Render orbiting elements */}
              <AnimatePresence mode="popLayout">
                {activeTechs.map((tech, index) => {
                  // Octagon calculations: 8 items -> 2 * PI / 8 = 45 degrees step
                  const itemAngle = rotationAngle + (index * 2 * Math.PI) / activeTechs.length;

                  // Coordinates
                  const x = radius.x * Math.sin(itemAngle);
                  const y = radius.y * Math.cos(itemAngle);
                  
                  // Math translation for depth (from -1 behind to +1 front)
                  const z = Math.cos(itemAngle); 
                  const depthFactor = (z + 1) / 2; // Normalizes depth between [0, 1]

                  // Scalers
                  const scale = 0.65 + 0.45 * depthFactor; // [0.65, 1.1]
                  const opacity = 0.25 + 0.75 * depthFactor; // [0.25, 1.0]
                  const zIndex = Math.round(10 + 90 * depthFactor); // [10, 100]
                  const blur = (1 - depthFactor) * 3; // [3px blur in background, 0px in foreground]

                  const isHovered = hoveredTech?.name === tech.name;

                  return (
                    <motion.div
                      key={`${activeTab}-${tech.name}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: opacity }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px - 20px)`, // Shunted upward by 20px
                        transform: `translate(-50%, -50%) scale(${scale})`, // Hard translation prevents Framer Motion override
                        zIndex: zIndex,
                        filter: `blur(${blur}px)`,
                      }}
                      className="absolute origin-center"
                    >
                      <button
                        onMouseEnter={() => {
                          isHoveringWheel.current = true;
                          setHoveredTech(tech);
                        }}
                        onClick={() => setHoveredTech(tech)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 bg-[#0d0d0d]/90 border border-white/10 relative transition-all duration-300 rounded-none group focus:outline-none ${
                          isHovered 
                            ? "border-[#5DADE2] shadow-[0_0_25px_rgba(93,173,226,0.15)] bg-black" 
                            : "hover:border-white/20 hover:bg-[#121212]"
                        }`}
                        style={{
                          boxShadow: isHovered
                            ? `0 0 25px ${tech.color}1e`
                            : undefined,
                          borderColor: isHovered ? tech.color : undefined,
                        }}
                      >
                        {/* Futuristic HUD corner ticks on hover */}
                        {isHovered && (
                          <>
                            <span className="absolute top-[-1px] left-[-1px] w-2 h-2 border-t border-l" style={{ borderColor: tech.color }} />
                            <span className="absolute top-[-1px] right-[-1px] w-2 h-2 border-t border-r" style={{ borderColor: tech.color }} />
                            <span className="absolute bottom-[-1px] left-[-1px] w-2 h-2 border-b border-l" style={{ borderColor: tech.color }} />
                            <span className="absolute bottom-[-1px] right-[-1px] w-2 h-2 border-b border-r" style={{ borderColor: tech.color }} />
                          </>
                        )}
                        
                        {/* Perfect flex layout inside the box */}
                        <div className="flex flex-col items-center justify-between h-full py-3">
                          <div className="flex-1 flex items-center justify-center">
                            <div className="transition-transform duration-300 group-hover:scale-110">
                              {tech.icon}
                            </div>
                          </div>

                          <span className="text-[8px] font-mono text-white/40 tracking-wider uppercase group-hover:text-white/60 transition-colors">
                            {tech.name}
                          </span>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            /* ================= STATIC ACCESS ACCESSIBLE FALLBACK GRID ================= */
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 py-6 z-10">
              {activeTechs.map((tech) => (
                <button
                  key={`static-${tech.name}`}
                  onClick={() => setHoveredTech(tech)}
                  className={`p-5 bg-[#0d0d0d] border flex flex-col items-center gap-4 text-center rounded-none transition-all duration-300 ${
                    hoveredTech?.name === tech.name
                      ? "border-[#5DADE2] bg-[#0d0d0d]"
                      : "border-white/5 hover:border-white/25"
                  }`}
                  style={{
                    borderColor: hoveredTech?.name === tech.name ? tech.color : undefined,
                  }}
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                    {tech.icon}
                  </div>
                  <span className="text-xs font-display font-bold uppercase tracking-wider text-white">
                    {tech.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Detailed Info Panel below the orbiting wheel */}
          <div className="w-full max-w-2xl border border-white/5 bg-[#0d0d0d] p-6 relative overflow-hidden flex flex-col justify-between min-h-[110px] mt-24 rounded-none z-10">
            {/* Left corner accent */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              style={{
                backgroundColor: hoveredTech?.color || "#5DADE2",
                boxShadow: hoveredTech ? `0 0 15px ${hoveredTech.color}` : undefined,
              }}
            />
            
            {hoveredTech ? (
              <motion.div
                key={hoveredTech.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: animationsEnabled ? 0.2 : 0 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border"
                    style={{
                      borderColor: `${hoveredTech.color}30`,
                      color: hoveredTech.color,
                      backgroundColor: `${hoveredTech.color}0a`,
                    }}
                  >
                    {activeTab === "frontend"
                      ? "Front-end"
                      : activeTab === "backend"
                      ? "Back-end"
                      : activeTab === "database"
                      ? "Banco de Dados"
                      : "DevOps & Tools"}
                  </span>
                  <h3 className="text-base font-display font-bold text-white uppercase tracking-wider">
                    {hoveredTech.name}
                  </h3>
                </div>
                
                <p className="text-xs text-white/55 leading-relaxed font-sans">
                  {hoveredTech.desc}
                </p>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-xs text-white/30 font-sans italic">
                  Passe o mouse sobre uma tecnologia para ler os detalhes técnicos.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
