"use client";

import React from "react";
import { motion, type Transition } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface StaggerTextProps {
  children?: React.ReactNode;
  text?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  duration?: number;
  divideBy?: "word" | "letter";
  className?: string;
  itemClassName?: string;
  highlightWord?: string;
  highlightClassName?: string;
  once?: boolean;
  viewportMargin?: string;
  triggerOnMount?: boolean;
}

export const StaggerText: React.FC<StaggerTextProps> = ({
  children,
  text,
  as: Component = "span",
  delay = 0,
  stagger,
  duration = 0.55,
  divideBy = "word",
  className = "",
  itemClassName = "",
  highlightWord,
  highlightClassName = "",
  once = true,
  viewportMargin = "-10%",
  triggerOnMount = false,
}) => {
  const { animationsEnabled } = useAnimation();

  // Extract plain text string safely
  let rawText = text;
  if (rawText === undefined) {
    if (typeof children === "string") {
      rawText = children;
    } else if (typeof children === "number" || typeof children === "boolean") {
      rawText = String(children);
    } else {
      rawText = "";
    }
  }

  // Graceful fallback if motion is disabled via OS (prefers-reduced-motion) or user toggle
  if (!animationsEnabled || !rawText) {
    if (highlightWord) {
      const parts = rawText.split(new RegExp(`(${highlightWord})`, "i"));
      return (
        <Component className={className}>
          {parts.map((part, i) =>
            part.toLowerCase() === highlightWord.toLowerCase() ? (
              <span key={i} className={highlightClassName}>
                {part}
              </span>
            ) : (
              part
            )
          )}
        </Component>
      );
    }
    return <Component className={className}>{rawText || children}</Component>;
  }

  const defaultStagger = divideBy === "letter" ? 0.025 : 0.055;
  const actualStagger = stagger ?? defaultStagger;

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: actualStagger,
        delayChildren: delay,
      },
    },
  };

  const itemTransition: Transition = {
    duration,
    ease: EASE,
  };

  const itemVariants = {
    hidden: { y: "115%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: itemTransition,
    },
  };

  // Words breakdown for divideBy="word"
  const words = rawText.trim().split(/\s+/);

  return (
    <Component className={className} aria-label={rawText}>
      <motion.span
        aria-hidden="true"
        className="inline-block"
        variants={containerVariants}
        initial="hidden"
        {...(triggerOnMount
          ? { animate: "show" }
          : {
              whileInView: "show",
              viewport: { once, margin: viewportMargin },
            })}
      >
        {divideBy === "word" ? (
          words.map((word, wordIndex) => {
            const isHighlight =
              highlightWord && word.toLowerCase() === highlightWord.toLowerCase();
            const wordStyle = isHighlight ? highlightClassName : itemClassName;

            return (
              <span
                key={`word-${wordIndex}-${word}`}
                className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0 pb-[0.08em]"
              >
                <motion.span
                  variants={itemVariants}
                  className={`inline-block will-change-transform ${wordStyle || ""}`}
                >
                  {word}
                </motion.span>
              </span>
            );
          })
        ) : (
          // Group letters by word to prevent words from awkwardly breaking in the middle across lines
          words.map((word, wordIndex) => {
            const isHighlight =
              highlightWord && word.toLowerCase() === highlightWord.toLowerCase();
            const letterStyle = isHighlight ? highlightClassName : itemClassName;

            return (
              <span
                key={`word-group-${wordIndex}-${word}`}
                className="inline-block whitespace-nowrap mr-[0.26em] last:mr-0 align-top"
              >
                {word.split("").map((letter, letterIndex) => (
                  <span
                    key={`letter-${wordIndex}-${letterIndex}-${letter}`}
                    className="inline-block overflow-hidden align-top pb-[0.08em]"
                  >
                    <motion.span
                      variants={itemVariants}
                      className={`inline-block will-change-transform ${letterStyle || ""}`}
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </span>
            );
          })
        )}
      </motion.span>
    </Component>
  );
};

export default StaggerText;
