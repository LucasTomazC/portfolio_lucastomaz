"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TypingKeyboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text to auto-type in a loop */
  autoTypeText?: string;
  /** [min, max] ms delay between keystrokes */
  typingSpeed?: [number, number];
  /** Overall scale factor */
  scale?: number;
  /** Accent color (modifier keys + screen glow) */
  accentColor?: string;
  /** Secondary accent (enter key) */
  secondaryAccent?: string;
}

// ─── Key sub-component ──────────────────────────────────────────────────────

function Key({ size = "", accent = "" }: { size?: string; accent?: string }) {
  const s = size ? `--${size}` : "";
  const a1 = accent === "b" ? " tk-face--b" : accent === "o" ? " tk-face--o" : "";

  return (
    <div className={`tk-key tk-flex${size ? ` tk-key${s}` : ""}`}>
      <div className={`tk-key__front tk-face${size ? ` tk-key__front${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b3" : a1 === " tk-face--o" ? " tk-face--o3" : ""}`} />
      <div className={`tk-key__back tk-face${size ? ` tk-key__back${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}`} />
      <div className={`tk-key__right tk-face${size ? ` tk-key__right${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}`} />
      <div className={`tk-key__left tk-face${size ? ` tk-key__left${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b2" : a1 === " tk-face--o" ? " tk-face--o2" : ""}`} />
      <div className={`tk-key__top tk-face${size ? ` tk-key__top${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}`} />
      <div className={`tk-key__bottom tk-face${size ? ` tk-key__bottom${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b2" : a1 === " tk-face--o" ? " tk-face--o2" : ""}`} />
    </div>
  );
}

// ─── Keycode → DOM index map ────────────────────────────────────────────────

const KC_MAP: Record<number, number> = {
  81:15, 87:16, 69:17, 82:18, 84:19, 89:20, 85:21, 73:22, 79:23, 80:24,
  65:29, 83:30, 68:31, 70:32, 71:33, 72:34, 74:35, 75:36, 76:37,
  90:41, 88:42, 67:43, 86:44, 66:45, 78:46, 77:47,
  32:56, 13:39, 8:27,
};

// ─── Main Component ─────────────────────────────────────────────────────────

export function TypingKeyboard({
  className,
  autoTypeText = "Faço soluções úteis para automatizar processos e escalar produtos web.       ",
  typingSpeed = [40, 110],
  scale = 0.72,
  accentColor = "#5DADE2",
  secondaryAccent = "#3ECF8E",
  ...props
}: TypingKeyboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const kbRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // IntersectionObserver to pause typing when outside viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const kb = kbRef.current;
    const screen = screenRef.current;
    if (!kb || !screen || !isVisible) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Set fixed isometric perspective
    kb.style.transform = "perspective(10000px) rotateX(60deg) rotateZ(-35deg)";

    const allKeys = kb.querySelectorAll<HTMLDivElement>(".tk-key");
    let alive = true;
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;

    if (prefersReducedMotion) {
      screen.textContent = autoTypeText.trim();
      return;
    }

    const pressKey = (kc: number) => {
      const domIdx = KC_MAP[kc];
      const el = allKeys[domIdx];
      if (el) {
        el.classList.add("tk-key--down");
        setTimeout(() => el?.classList.remove("tk-key--down"), 75);
      }
    };

    const typeNext = () => {
      if (!alive || !screen) return;
      const char = autoTypeText[idx];
      if (!char) return;

      // Normaliza acentos para apertar tecla correspondente no teclado físico
      const normalized = char.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
      const kc = char === " " ? 32 : normalized.charCodeAt(0);

      pressKey(kc);
      screen.textContent += char === " " ? " " : char;

      idx++;
      if (idx >= autoTypeText.length) {
        timer = setTimeout(() => {
          if (!alive) return;
          screen.textContent = "";
          idx = 0;
          timer = setTimeout(typeNext, 800);
        }, 2200);
      } else {
        const delay = typingSpeed[0] + Math.random() * (typingSpeed[1] - typingSpeed[0]);
        timer = setTimeout(typeNext, delay);
      }
    };

    timer = setTimeout(typeNext, 1200);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [autoTypeText, typingSpeed, isVisible]);

  return (
    <div
      ref={containerRef}
      className={cn("tk-container select-none overflow-hidden", className)}
      {...props}
    >
      <style>{`
        .tk-container * { transform-style: preserve-3d; }
        .tk-container {
          width: 100%;
          min-height: 440px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          color: rgba(255, 255, 251, 0.7);
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
        }
        .tk-main {
          width: 650px;
          height: 480px;
          position: relative;
          cursor: pointer;
          transform: scale(${scale});
          transform-origin: center center;
          transition: transform 0.3s ease;
        }
        @media (max-width: 1024px) {
          .tk-main {
            transform: scale(${Math.max(scale - 0.15, 0.52)});
          }
        }
        @media (max-width: 640px) {
          .tk-main {
            transform: scale(0.48);
          }
        }
        .tk-flex { display: flex; justify-content: center; align-items: center; }
        .tk-face { position: absolute; }

        /* Keyboard body */
        .tk-keyboard {
          width: 500px;
          height: 160px;
          transform: perspective(10000px) rotateX(50deg) rotateZ(-25deg);
        }
        .tk-keyboard__front {
          width: 500px;
          height: 25px;
          transform: rotateX(-90deg) translateZ(80px);
          background-color: #27272a;
        }
        .tk-keyboard__back  {
          width: 500px;
          height: 25px;
          transform: rotateX(90deg) translateZ(80px);
          background-color: #18181b;
        }
        .tk-keyboard__top   {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 500px;
          height: 160px;
          transform: rotateY(0deg) translateZ(12.5px);
          background-image: linear-gradient(to bottom, #18181b, #09090b);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
        }
        .tk-keyboard__bottom {
          width: 500px;
          height: 160px;
          transform: rotateY(180deg) translateZ(12.5px);
          background-color: #09090b;
        }
        .tk-keyboard__right {
          width: 25px;
          height: 160px;
          transform: rotateY(90deg) translateZ(250px);
          background-color: #18181b;
        }
        .tk-keyboard__left  {
          width: 25px;
          height: 160px;
          transform: rotateY(90deg) translateZ(-250px);
          background-color: #27272a;
        }

        /* Screen */
        .tk-screen {
          width: 320px;
          height: 220px;
          transform: translateZ(105px) translateY(-190px) translateZ(50px) rotateX(270deg);
          background-color: #050a14;
          border: 1.5px solid ${accentColor}66;
          border-radius: 12px;
          padding: 18px;
          font-size: 13.5px;
          line-height: 1.6;
          word-wrap: break-word;
          white-space: pre-wrap;
          overflow: hidden;
          text-transform: none;
          letter-spacing: 0.5px;
          color: #f0f6fc;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          align-items: flex-start !important;
          justify-content: flex-start !important;
          box-shadow:
            0 0 10px ${accentColor}40,
            0 0 25px ${accentColor}25,
            0 0 45px ${accentColor}15,
            inset 0 0 20px rgba(0, 0, 0, 0.8);
          animation: tk-screen-flicker 4s ease-in-out infinite;
        }
        @keyframes tk-screen-flicker {
          0%, 94%, 100% { border-color: ${accentColor}66; box-shadow: 0 0 15px ${accentColor}30, 0 0 35px ${accentColor}15; }
          95%           { border-color: ${accentColor}99; box-shadow: 0 0 25px ${accentColor}50, 0 0 50px ${accentColor}30; }
          97%           { border-color: ${accentColor}44; box-shadow: 0 0 8px ${accentColor}20; }
        }

        /* Keys container */
        .tk-keys {
          display: flex;
          justify-content: space-between;
          width: 100%;
          transform: translateZ(4px);
          padding: 0 2px;
        }

        /* Individual key — depth is 8px */
        .tk-key { width: 30px; height: 27px; transition: .05s ease; }
        .tk-key--w2 { width: 60px; }
        .tk-key--w3 { width: 90px; }
        .tk-key--w6 { width: 195px; }

        .tk-key__front { width: 30px; height: 8px; transform: rotateX(-90deg) translateZ(13.5px); background-color: #27272a; }
        .tk-key__front--w2 { width: 60px; }
        .tk-key__front--w3 { width: 90px; }
        .tk-key__front--w6 { width: 195px; }

        .tk-key__back { width: 30px; height: 8px; transform: rotateX(90deg) translateZ(13.5px); background-color: #3f3f46; }
        .tk-key__back--w2 { width: 60px; }
        .tk-key__back--w3 { width: 90px; }
        .tk-key__back--w6 { width: 195px; }

        .tk-key__top {
          width: 30px;
          height: 27px;
          transform: rotateY(0deg) translateZ(4px);
          background-color: #27272a;
          background-image: linear-gradient(to bottom, #3f3f46, #18181b);
          border: 0.5px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.05), 0 -1px 2px rgba(0,0,0,0.5);
        }
        .tk-key__top--w2 { width: 60px; }
        .tk-key__top--w3 { width: 90px; }
        .tk-key__top--w6 { width: 195px; }

        .tk-key__bottom { width: 30px; height: 27px; transform: rotateY(180deg) translateZ(4px); background-color: #18181b; }
        .tk-key__bottom--w2 { width: 60px; }
        .tk-key__bottom--w3 { width: 90px; }
        .tk-key__bottom--w6 { width: 195px; }

        .tk-key__right { width: 8px; height: 27px; transform: rotateY(90deg) translateZ(15px); background-color: #27272a; }
        .tk-key__right--w2 { transform: rotateY(90deg) translateZ(30px); }
        .tk-key__right--w3 { transform: rotateY(90deg) translateZ(45px); }
        .tk-key__right--w6 { transform: rotateY(90deg) translateZ(97.5px); }

        .tk-key__left {
          width: 8px;
          height: 27px;
          transform: rotateY(90deg) translateZ(-15px);
          background-image: linear-gradient(to bottom, #3f3f46, #27272a);
        }
        .tk-key__left--w2 { transform: rotateY(90deg) translateZ(-30px); }
        .tk-key__left--w3 { transform: rotateY(90deg) translateZ(-45px); }
        .tk-key__left--w6 { transform: rotateY(90deg) translateZ(-97.5px); }

        /* Accent colors (Cyan #5DADE2 & Emerald #3ECF8E) */
        .tk-face--b1 { background: ${accentColor}; }
        .tk-face--b2 { background-image: linear-gradient(to bottom, #1b4965, ${accentColor}); }
        .tk-face--b3 { background-color: #0c2333; }

        .tk-face--o1 { background: ${secondaryAccent}; }
        .tk-face--o2 { background-image: linear-gradient(to bottom, #115e3b, ${secondaryAccent}); }
        .tk-face--o3 { background-color: #06331e; }

        /* Pressed state */
        .tk-key--down {
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translateZ(-4.5px);
          transition: .05s ease;
        }
        .tk-key--down > .tk-key__top {
          background: ${accentColor} !important;
          box-shadow: 0 0 10px ${accentColor} !important;
        }
      `}</style>

      <div className="tk-main tk-flex" ref={mainRef}>
        <div className="tk-keyboard tk-flex" ref={kbRef}>
          <div className="tk-screen tk-flex" ref={screenRef} />

          <div className="tk-keyboard__front tk-face" />
          <div className="tk-keyboard__back tk-face" />
          <div className="tk-keyboard__right tk-face" />
          <div className="tk-keyboard__left tk-face" />
          <div className="tk-keyboard__top tk-face">

            {/* Row 1 */}
            <div className="tk-keys">
              <Key accent="b" />
              {Array.from({ length: 12 }).map((_, i) => <Key key={`r1-${i}`} />)}
              <Key size="w2" accent="b" />
            </div>

            {/* Row 2 */}
            <div className="tk-keys">
              <Key size="w2" accent="b" />
              {Array.from({ length: 12 }).map((_, i) => <Key key={`r2-${i}`} />)}
              <Key accent="b" />
            </div>

            {/* Row 3 */}
            <div className="tk-keys">
              <Key size="w3" accent="b" />
              {Array.from({ length: 10 }).map((_, i) => <Key key={`r3-${i}`} />)}
              <Key size="w2" accent="o" />
            </div>

            {/* Row 4 */}
            <div className="tk-keys">
              <Key size="w2" accent="b" />
              {Array.from({ length: 11 }).map((_, i) => <Key key={`r4-${i}`} />)}
              <Key size="w3" accent="b" />
            </div>

            {/* Row 5 */}
            <div className="tk-keys">
              <Key accent="b" />
              <Key accent="o" />
              {Array.from({ length: 2 }).map((_, i) => <Key key={`r5a-${i}`} accent="b" />)}
              <Key size="w6" />
              {Array.from({ length: 5 }).map((_, i) => <Key key={`r5b-${i}`} accent="b" />)}
            </div>

          </div>
          <div className="tk-keyboard__bottom tk-face" />
        </div>
      </div>
    </div>
  );
}

export default TypingKeyboard;
