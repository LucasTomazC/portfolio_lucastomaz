"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Copy, Check, Mail, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const { animationsEnabled } = useAnimation();
  const [copied, setCopied] = useState(false);
  const email = "contato@joaolucas.dev";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: animationsEnabled ? "smooth" : "auto",
    });
  };

  return (
    <footer
      id="contato"
      className="bg-[#050505] border-t border-white/5 pt-24 pb-12 px-6 md:px-12 relative overflow-hidden z-10"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-12 relative z-10">
        
        {/* Call to Action Title */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest font-display text-[#5DADE2] font-semibold">
            Contato
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-none">
            Vamos Construir <br className="sm:hidden" /> Algo Juntos
          </h2>
          <p className="max-w-md mx-auto text-sm text-white/60 leading-relaxed font-sans">
            Seja para criar um web app moderno do zero, integrar APIs complexas ou debugar seu produto atual, sinta-se à vontade para enviar uma mensagem.
          </p>
        </div>

        {/* Copyable & Clickable Email Box */}
        <div className="relative group">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-3 px-6 py-4 border border-white/10 bg-[#0d0d0d] hover:border-[#5DADE2]/30 hover:shadow-[0_0_20px_rgba(93,173,226,0.05)] text-white text-sm sm:text-base font-mono transition-all duration-300 relative overflow-hidden focus:outline-none rounded-none"
            title="Clique para copiar o e-mail"
          >
            <Mail className="w-4 h-4 text-[#5DADE2]" />
            <span>{email}</span>
            <div className="w-[1px] h-4 bg-white/10 mx-1" />
            
            {/* Swapping Copy / Check icon */}
            <div className="relative w-4 h-4 flex items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: animationsEnabled ? 0.15 : 0 }}
                  >
                    <Check className="w-4 h-4 text-green-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: animationsEnabled ? 0.15 : 0 }}
                  >
                    <Copy className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>

          {/* Copy Success Floating Tooltip */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#5DADE2] text-black text-[10px] font-display font-bold uppercase tracking-wider px-3 py-1.5 whitespace-nowrap shadow-md pointer-events-none rounded-none"
              >
                Copiado com sucesso!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Network Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/LucasTomazC"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-white/5 bg-[#0d0d0d] rounded-full text-white/50 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label="GitHub"
          >
            <GitHubIcon className="w-4 h-4 fill-current" />
          </a>
          <a
            href="https://www.linkedin.com/in/jo%C3%A3o-lucas-tomaz-2720aa24b"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-white/5 bg-[#0d0d0d] rounded-full text-white/50 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-4 h-4 fill-current" />
          </a>
        </div>

        {/* Separator Line */}
        <div className="w-full h-[1px] bg-white/5 my-4" />

        {/* Footer bottom details: logo monogram, copyright and scroll to top button */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/30 font-sans">
          
          {/* Monogram logo on footer */}
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 100 100"
              className="w-5 h-5 text-white/40 fill-none stroke-current stroke-[6]"
            >
              <path
                d="M 30,25 L 55,25 M 55,25 L 55,65 C 55,78 35,78 35,65"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 50,55 L 75,55 L 75,65"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#5DADE2]"
              />
            </svg>
            <span className="font-display font-bold tracking-widest text-[10px]">JOÃO LUCAS</span>
          </div>

          <div>
            © {new Date().getFullYear()} João Lucas. Todos os direitos reservados.
          </div>

          <button
            onClick={handleScrollTop}
            className="flex items-center gap-1 hover:text-white transition-colors uppercase tracking-wider font-display font-medium text-[10px] focus:outline-none cursor-pointer"
            aria-label="Voltar para o topo"
          >
            Voltar ao topo
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
