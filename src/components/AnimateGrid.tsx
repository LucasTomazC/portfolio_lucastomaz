"use client";

import React, { useMemo } from "react";
import { useAnimation } from "@/context/AnimationContext";

export interface AnimateGridCard {
  id: string;
  name: string;
  color: string;
  desc: string;
  icon: React.ReactNode;
}

interface AnimateGridProps {
  cards: AnimateGridCard[];
  hoveredIndex: number | null;
  onHoverIndex: (index: number | null) => void;
  className?: string;
  perspective?: number;
  rotateX?: number;
  rotateY?: number;
  glowColor?: string;
}

// 4x4 Grid Neighbor detection from Inspira UI: [i-1, i+1, i-4, i+4]
function adjacentCardItems(i: number): number[] {
  return [i - 1, i + 1, i - 4, i + 4].filter((index) => {
    if (index < 0 || index > 15) return false;
    if (i % 4 === 0 && index === i - 1) return false;
    if (i % 4 === 3 && index === i + 1) return false;
    return true;
  });
}

export const AnimateGrid: React.FC<AnimateGridProps> = ({
  cards,
  hoveredIndex,
  onHoverIndex,
  className = "",
  perspective = 600,
  rotateX = -1,
  rotateY = -15,
  glowColor = "#38ef7d",
}) => {
  const { animationsEnabled } = useAnimation();

  const adjacentIndices = useMemo(() => {
    if (hoveredIndex === null || !animationsEnabled) return [];
    return adjacentCardItems(hoveredIndex);
  }, [hoveredIndex, animationsEnabled]);

  return (
    <div
      className={`relative block select-none ${className}`}
      style={{
        perspective: animationsEnabled ? `${perspective}px` : "none",
      }}
    >
      <style jsx>{`
        @keyframes text-glow {
          0% {
            filter: drop-shadow(0px 0px 2px rgba(56, 239, 125, 0.5));
          }
          100% {
            filter: drop-shadow(0px 1px 8px #38ef7d);
          }
        }
        @keyframes text-glow-small {
          0% {
            filter: drop-shadow(0px 0px 2px rgba(56, 239, 125, 0.15));
          }
          100% {
            filter: drop-shadow(0px 1px 4px rgba(56, 239, 125, 0.5));
          }
        }
      `}</style>

      {/* Inspira UI Radial Ambient Background */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[140%] h-[130%] pointer-events-none -z-10 rounded-full blur-2xl opacity-40 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, #1f2937 0%, #020420 70%, transparent 100%)",
        }}
      />

      {/* 3D Perspective Plane */}
      <div
        className="relative grid grid-cols-4 gap-2 sm:gap-2.5 items-center justify-center p-2 transition-transform duration-300 ease-out"
        style={{
          transformStyle: animationsEnabled ? "preserve-3d" : "flat",
          transform: animationsEnabled
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            : "none",
        }}
        onMouseLeave={() => onHoverIndex(null)}
      >
        {cards.map((card, index) => {
          const isHovered = hoveredIndex === index;
          const isAdjacent = adjacentIndices.includes(index);

          let zIndex = index + 1;
          let transformStyle = "none";
          let borderStyle = "1px solid rgba(31, 41, 55, 0.5)";
          let bgStyle = "rgba(2, 4, 32, 0.7)";
          let shadowStyle =
            "2px 2px 5px rgba(31, 41, 55, 0.2), 3px 3px 10px rgba(31, 41, 55, 0.2), 6px 6px 20px rgba(31, 41, 55, 0.1)";
          let animationStyle = "none";

          if (isHovered && animationsEnabled) {
            zIndex = 50;
            transformStyle = "scale(1.15) translateX(-18px) translateY(-18px) translateZ(18px)";
            borderStyle = "1px solid rgba(217, 251, 232, 0.4)";
            bgStyle = "#020420";
            shadowStyle = `0 0 25px ${glowColor}66, 0 0 50px ${glowColor}33`;
            animationStyle = "text-glow 1.5s alternate infinite ease-in-out";
          } else if (isAdjacent && animationsEnabled) {
            zIndex = 30;
            transformStyle = "scale(1.05) translateX(-5px) translateY(-5px) translateZ(6px)";
            borderStyle = "1px solid rgba(217, 251, 232, 0.25)";
            bgStyle = "rgba(2, 4, 32, 0.85)";
            shadowStyle = `0 0 12px ${glowColor}33`;
            animationStyle = "text-glow-small 1.5s alternate infinite ease-in-out";
          }

          return (
            <button
              key={card.id}
              type="button"
              onMouseEnter={() => onHoverIndex(index)}
              onFocus={() => onHoverIndex(index)}
              onClick={() => onHoverIndex(index)}
              onTouchStart={() => onHoverIndex(index)}
              aria-label={card.name}
              className="relative block w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-lg p-3 sm:p-4 transition-all duration-200 outline-none focus:outline-none cursor-pointer"
              style={{
                zIndex,
                transform: animationsEnabled ? transformStyle : undefined,
                border: borderStyle,
                backgroundColor: bgStyle,
                boxShadow: shadowStyle,
                animation: animationsEnabled ? animationStyle : undefined,
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className="transition-opacity duration-200 flex items-center justify-center"
                  style={{
                    opacity: isHovered ? 1 : 0.72,
                  }}
                >
                  {card.icon}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default AnimateGrid;
