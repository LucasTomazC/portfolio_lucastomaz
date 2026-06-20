"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";
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
          <p className="max-w-md mx-auto text-sm text-white/50 leading-relaxed font-sans">
            Seja para criar um web app moderno do zero, integrar APIs complexas ou debugar seu produto atual, sinta-se à vontade para enviar uma mensagem.
          </p>
        </div>

        {/* Copyable & Clickable Email Box */}
        <div className="relative group">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-3 px-6 py-4 border border-white/10 bg-[#0d0d0d] hover:border-[#5DADE2]/30 hover:shadow-[0_0_20px_rgba(93,173,226,0.05)] text-white text-sm sm:text-base font-mono transition-all duration-300 relative overflow-hidden focus:outline-none"
            style={{ borderRadius: "0px" }} // Sharp geometry choice
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
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#5DADE2] text-black text-[10px] font-display font-bold uppercase tracking-wider px-3 py-1.5 whitespace-nowrap shadow-md pointer-events-none"
                style={{ borderRadius: "0px" }}
              >
                Copiado com sucesso!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Network Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-white/5 bg-[#0d0d0d] rounded-full text-white/50 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center justify-center"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-white/5 bg-[#0d0d0d] rounded-full text-white/50 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center justify-center"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
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
            className="flex items-center gap-1 hover:text-white transition-colors uppercase tracking-wider font-display font-medium text-[10px] focus:outline-none"
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
