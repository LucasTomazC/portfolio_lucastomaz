"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAnimation } from "@/context/AnimationContext";

interface Point {
  x: number;
  y: number;
}

// ──────────────────────────────────────────────────────────
// Configuração
// ──────────────────────────────────────────────────────────
// IMPORTANTE: esta versão NÃO usa "spring chain" (cada ponto perseguindo o
// anterior). Em vez disso, gravamos um HISTÓRICO de posições reais do mouse
// e desenhamos o rastro seguindo exatamente esse caminho. Isso evita o
// efeito de "elástico esticando em linha reta" e garante que a cauda
// acompanhe fielmente as curvas que o cursor realmente fez.

const HISTORY_LENGTH = 42;     // quantas posições passadas mantemos (mais = cauda mais longa)
const INPUT_SMOOTHING = 0.35;  // suaviza o movimento bruto do mouse antes de gravar (0-1, menor = mais suave/atrasado)
const MAX_THICKNESS = 13;
const TAPER_POWER = 1.8;       // >1 = afina mais rápido perto da ponta (efeito fumaça leve)
const FADE_POWER = 1.4;        // >1 = mantém o início mais opaco por mais tempo, dissipando rápido no final
const SHADOW_BLUR_AMOUNT = 26;

// ──────────────────────────────────────────────────────────
// Camadas de "cortina" de aurora (o que faltava: profundidade)
// Cada fita usa o MESMO histórico de posições, mas com um pequeno
// deslocamento perpendicular ao caminho que ondula com o tempo de forma
// independente — como cortinas de luz reais se movendo lado a lado.
// ──────────────────────────────────────────────────────────
interface StrandConfig {
  amplitude: number;   // o quanto essa fita se afasta do caminho central (px)
  frequency: number;   // velocidade da ondulação própria dessa fita
  phase: number;       // defasagem inicial (pra não ondularem em sincronia)
  hueShift: number;    // pequeno desvio de cor em relação à fita base
  widthMul: number;    // multiplicador de espessura
  alphaMul: number;    // multiplicador de opacidade
}

const STRANDS: StrandConfig[] = [
  { amplitude: 0, frequency: 0, phase: 0, hueShift: 0, widthMul: 1.0, alphaMul: 1.0 },
  { amplitude: 9, frequency: 1.6, phase: 0, hueShift: -18, widthMul: 0.6, alphaMul: 0.55 },
  { amplitude: 14, frequency: 1.1, phase: Math.PI, hueShift: 28, widthMul: 0.45, alphaMul: 0.4 },
];

export const CursorAuroraTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { animationsEnabled } = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  const historyRef = useRef<Point[]>([]);
  const smoothedRef = useRef<Point>({ x: -1000, y: -1000 });
  const targetRef = useRef<Point>({ x: -1000, y: -1000 });
  const initializedRef = useRef(false);
  const mouseActiveRef = useRef(false);
  const globalAlphaRef = useRef(0);
  const hueOffsetRef = useRef(0);
  const idleFramesRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!animationsEnabled || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      if (!initializedRef.current) {
        smoothedRef.current = { x: e.clientX, y: e.clientY };
        historyRef.current = Array.from({ length: HISTORY_LENGTH }, () => ({
          x: e.clientX,
          y: e.clientY,
        }));
        initializedRef.current = true;
      }

      mouseActiveRef.current = true;
      idleFramesRef.current = 0;
    };

    const handleMouseLeave = () => {
      mouseActiveRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";

      timeRef.current += 0.04;

      if (initializedRef.current) {
        // 1. Suaviza ligeiramente a entrada do mouse (só pra tirar tremor de
        // sensor/tela, NÃO para criar atraso elástico grande)
        smoothedRef.current.x +=
          (targetRef.current.x - smoothedRef.current.x) * INPUT_SMOOTHING;
        smoothedRef.current.y +=
          (targetRef.current.y - smoothedRef.current.y) * INPUT_SMOOTHING;

        // 2. Grava a posição atual no histórico (desloca o array)
        historyRef.current.unshift({
          x: smoothedRef.current.x,
          y: smoothedRef.current.y,
        });
        if (historyRef.current.length > HISTORY_LENGTH) {
          historyRef.current.pop();
        }
      }

      // 3. Fade in/out geral conforme atividade do mouse
      if (mouseActiveRef.current) {
        globalAlphaRef.current = Math.min(1, globalAlphaRef.current + 0.08);
      } else {
        idleFramesRef.current += 1;
        if (idleFramesRef.current > 45) {
          globalAlphaRef.current = Math.max(0, globalAlphaRef.current - 0.02);
        }
      }

      hueOffsetRef.current = (hueOffsetRef.current + 0.25) % 360;
      const alpha = globalAlphaRef.current;
      const history = historyRef.current;

      if (alpha > 0.01 && history.length > 2) {
        const n = history.length;

        // Pré-calcula as normais (perpendiculares) ao longo do caminho,
        // usadas para deslocar cada fita lateralmente sem alterar a
        // trajetória central real do mouse.
        const normals: Point[] = new Array(n);
        for (let i = 0; i < n; i++) {
          const a = history[Math.max(0, i - 1)];
          const b = history[Math.min(n - 1, i + 1)];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy) || 1;
          // perpendicular ao vetor direção (dx,dy) -> (-dy, dx)
          normals[i] = { x: -dy / len, y: dx / len };
        }

        for (const strand of STRANDS) {
          for (let i = 0; i < n - 2; i++) {
            const t = i / (n - 1); // 0 = ponto mais novo, 1 = mais antigo

            const width = Math.max(
              0.5,
              MAX_THICKNESS * Math.pow(1 - t, TAPER_POWER) * strand.widthMul
            );
            const segAlpha =
              alpha * Math.pow(1 - t, FADE_POWER) * strand.alphaMul;

            if (segAlpha < 0.01) continue;

            // Deslocamento perpendicular ondulante, independente por fita.
            // Cresce levemente da cabeça pra cauda (ratio) pra parecer que a
            // "cortina" se abre mais longe do cursor, como no vídeo de referência.
            const ratio = 0.3 + t * 0.7;
            const wave =
              Math.sin(timeRef.current * strand.frequency + i * 0.18 + strand.phase) *
              strand.amplitude *
              ratio;

            const n1 = normals[i];
            const n2 = normals[i + 1];
            const n3 = normals[Math.min(n - 1, i + 2)];

            const p1 = { x: history[i].x + n1.x * wave, y: history[i].y + n1.y * wave };
            const p2 = {
              x: history[i + 1].x + n2.x * wave,
              y: history[i + 1].y + n2.y * wave,
            };
            const p3 = {
              x: history[i + 2].x + n3.x * wave,
              y: history[i + 2].y + n3.y * wave,
            };

            const hue = (150 + t * 130 + hueOffsetRef.current + strand.hueShift + 360) % 360;
            const lightness = 78 - t * 28;
            const saturation = 55 + t * 35;

            const midX = (p2.x + p3.x) / 2;
            const midY = (p2.y + p3.y) / 2;

            // Camada externa (glow difuso) dessa fita
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(p2.x, p2.y, midX, midY);
            ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${segAlpha * 0.6})`;
            ctx.lineWidth = width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();

            // Núcleo interno mais brilhante (só no terço mais próximo da cabeça,
            // e só na fita central, pra não saturar demais de branco)
            if (t < 0.35 && strand === STRANDS[0]) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.quadraticCurveTo(p2.x, p2.y, midX, midY);
              ctx.strokeStyle = `hsla(${hue}, ${saturation}%, 93%, ${segAlpha * 0.85})`;
              ctx.lineWidth = width * 0.32;
              ctx.lineCap = "round";
              ctx.stroke();
            }
          }
        }

        // Cabeça brilhante na posição mais recente
        const head = history[0];
        const headHue = (150 + hueOffsetRef.current) % 360;

        ctx.save();
        ctx.shadowBlur = SHADOW_BLUR_AMOUNT;
        ctx.shadowColor = `hsl(${headHue}, 80%, 70%)`;

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${headHue}, 90%, 80%, ${alpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationsEnabled, isMobile]);

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-cyan-500/10 blur-[120px] transition-all duration-[8000ms] ${
            animationsEnabled ? "animate-pulse" : ""
          }`}
          style={{ animationDuration: "12s" }}
        />
        <div
          className={`absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-violet-600/5 blur-[150px] transition-all duration-[10000ms] ${
            animationsEnabled ? "animate-pulse" : ""
          }`}
          style={{ animationDuration: "16s", animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/3 w-[45vw] h-[45vw] rounded-full bg-[#5DADE2]/5 blur-[100px] pointer-events-none" />
      </div>

      {animationsEnabled && !isMobile && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
          style={{ filter: "blur(2.5px)" }}
        />
      )}
    </>
  );
};
