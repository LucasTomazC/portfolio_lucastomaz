"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAnimation } from "@/context/AnimationContext";

interface Point {
  x: number;
  y: number;
}

// Configuration Constants
const TRAIL_POINTS_COUNT = 32; // Slightly more points for longer, smoother waves
const EASE_FACTOR = 0.24;      // Snappy base easing
const MAX_THICKNESS = 18;      // Thicker ribbon for dramatic aurora folds
const MIN_THICKNESS = 2.0;
const SHADOW_BLOW_AMOUNT = 35; // Bright head shadow glow radius

export const CursorAuroraTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { animationsEnabled } = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  // Animation state refs (avoid triggering React re-renders)
  const pointsRef = useRef<Point[]>([]);
  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const initializedRef = useRef(false);
  const mouseActiveRef = useRef(false);
  const globalAlphaRef = useRef(0);
  const hueOffsetRef = useRef(0);
  const idleFramesRef = useRef(0);
  const timeRef = useRef(0);

  // Detect mobile / touch devices
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

  // Initialize trail points off-screen
  useEffect(() => {
    pointsRef.current = Array.from({ length: TRAIL_POINTS_COUNT }, () => ({
      x: -1000,
      y: -1000,
    }));
  }, []);

  // Canvas loop and listeners
  useEffect(() => {
    // If animations are toggled off or on mobile, skip rendering the canvas trail
    if (!animationsEnabled || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Handle canvas resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      targetRef.current = { x: mouseX, y: mouseY };

      // Snap all points on first movement to avoid trail fly-in from off-screen
      if (!initializedRef.current) {
        for (let i = 0; i < pointsRef.current.length; i++) {
          pointsRef.current[i] = { x: mouseX, y: mouseY };
        }
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

    // Animation Render Loop
    const tick = () => {
      // 1. Apply transparent decay overlay for motion blur
      // Using 'destination-out' lets us fade previous frames on a transparent canvas
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)"; // Fades current trail opacity by 12% per frame
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Reset to screen/lighter composite mode for additive aurora colors
      ctx.globalCompositeOperation = "screen";

      const points = pointsRef.current;
      if (points.length === 0) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      // Progress animation time
      timeRef.current += 0.04;
      const time = timeRef.current;

      // 2. Physics Update: Update head position and apply spring physics + wave drift to tail
      // Point 0 follows the mouse directly
      points[0].x = targetRef.current.x;
      points[0].y = targetRef.current.y;

      for (let i = 1; i < points.length; i++) {
        // Tail points ease slightly slower for whip/spring curve feel
        const ease = EASE_FACTOR * (1 - (i / points.length) * 0.2);

        // Dynamic wave forces simulating air current/aurora plasma ripples:
        // We use two sine waves at different frequencies for natural, organic sway
        const ratio = i / points.length;
        const swayX = Math.sin(time * 1.5 + i * 0.35) * 4.0 * ratio;
        const swayY = Math.cos(time * 0.9 - i * 0.25) * 3.0 * ratio;
        const upwardDrift = -0.6 * ratio; // Tail points float gently upwards like smoke

        const targetX = points[i - 1].x + swayX;
        const targetY = points[i - 1].y + swayY + upwardDrift;

        points[i].x += (targetX - points[i].x) * ease;
        points[i].y += (targetY - points[i].y) * ease;
      }

      // 3. Fade-in and Fade-out controls
      if (mouseActiveRef.current) {
        globalAlphaRef.current = Math.min(1, globalAlphaRef.current + 0.08);
      } else {
        idleFramesRef.current += 1;
        if (idleFramesRef.current > 45) { // Fade out if mouse is idle for 45 frames (~0.75s)
          globalAlphaRef.current = Math.max(0, globalAlphaRef.current - 0.02);
        }
      }

      // Slowly increment color hue offset
      hueOffsetRef.current = (hueOffsetRef.current + 0.3) % 360;

      const alpha = globalAlphaRef.current;

      if (alpha > 0.01 && initializedRef.current) {
        // Draw the trail using quadratic curves for perfectly smooth fluid bends (no angular segments)
        for (let i = 1; i < points.length - 1; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];
          const p3 = points[i + 1];

          // Skip drawing if points are still uninitialized off-screen
          if (p1.x < -500 || p2.x < -500 || p3.x < -500) continue;

          const t = i / (points.length - 1); // 0 at head, 1 at tail
          
          // Ripple thickness slightly along length to mimic natural auroral folds/depth
          const foldRipple = Math.sin(time * 2 + i * 0.35) * 1.5;
          const width = Math.max(1.0, (1 - t) * MAX_THICKNESS + MIN_THICKNESS + foldRipple);

          // HSL Aurora color: shift from green (140) to cian, blue, violet (280) + dynamic time shift
          const hue = (140 + t * 140 + hueOffsetRef.current) % 360;

          // Midpoints for smooth C1-continuous bezier connections
          const midX = (p2.x + p3.x) / 2;
          const midY = (p2.y + p3.y) / 2;

          // Draw Outer Glowing Trail Ribbon
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(p2.x, p2.y, midX, midY);
          ctx.strokeStyle = `hsla(${hue}, 85%, 55%, ${alpha * (1 - t * 0.7) * 0.65})`;
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();

          // Draw a second, thinner, brighter inner core trail for visual depth
          if (i < Math.floor(points.length * 0.7)) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(p2.x, p2.y, midX, midY);
            ctx.strokeStyle = `hsla(${hue}, 100%, 85%, ${alpha * (1 - t) * 0.85})`;
            ctx.lineWidth = width * 0.3;
            ctx.lineCap = "round";
            ctx.stroke();
          }
        }

        // Draw the white-hot glowing head at the mouse position
        const headX = points[0].x;
        const headY = points[0].y;

        if (headX > -500 && headY > -500) {
          const headHue = (140 + hueOffsetRef.current) % 360;
          
          ctx.save();
          // Apply strong native canvas glow using shadowBlur
          ctx.shadowBlur = SHADOW_BLOW_AMOUNT;
          ctx.shadowColor = `hsl(${headHue}, 85%, 55%)`;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(headX, headY, 5, 0, Math.PI * 2);
          ctx.fill();
          
          // Outer overlay dot to blend the shadow
          ctx.fillStyle = `hsla(${headHue}, 100%, 75%, ${alpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(headX, headY, 9, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanups
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationsEnabled, isMobile]);

  return (
    <>
      {/* Ambient Aurora Background Glows (Always visible, pulsing on desktop/mobile) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Glow 1 (Cyan/Blue) */}
        <div
          className={`absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-cyan-500/10 blur-[120px] transition-all duration-[8000ms] ${
            animationsEnabled ? "animate-pulse" : ""
          }`}
          style={{ animationDuration: "12s" }}
        />
        {/* Glow 2 (Violet) */}
        <div
          className={`absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-violet-600/5 blur-[150px] transition-all duration-[10000ms] ${
            animationsEnabled ? "animate-pulse" : ""
          }`}
          style={{ animationDuration: "16s", animationDelay: "2s" }}
        />
        {/* Glow 3 (Center Blue) */}
        <div
          className="absolute top-1/2 left-1/3 w-[45vw] h-[45vw] rounded-full bg-[#5DADE2]/5 blur-[100px] pointer-events-none"
        />
      </div>

      {/* Interactive Aurora Trail Canvas (Desktop only, animations on) */}
      {animationsEnabled && !isMobile && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
          style={{ filter: "blur(4px)" }}
        />
      )}
    </>
  );
};
