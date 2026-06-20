"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AnimationContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // Check if the user prefers reduced motion at OS level
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const handleInitialCheck = () => {
      if (mediaQuery.matches) {
        setAnimationsEnabled(false);
      }
    };

    // Run check asynchronously to avoid synchronous setState during initial mount/render
    const timer = setTimeout(handleInitialCheck, 0);

    const handleChange = (e: MediaQueryListEvent) => {
      setAnimationsEnabled(!e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleAnimations = () => {
    setAnimationsEnabled((prev) => !prev);
  };

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
