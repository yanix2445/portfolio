"use client";

import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface BackgroundStyle {
  core: string;
  opacity: string;
  vignette: string;
  backgroundSize?: string;
}

interface AdaptiveBackgroundProps {
  children: ReactNode;
  className?: string;
  darkVariant?: "default" | "subtle" | "intense";
  lightVariant?: "default" | "subtle" | "intense";
}

export default function AdaptiveBackground({
  children,
  className = "",
  darkVariant = "default",
  lightVariant = "default",
}: AdaptiveBackgroundProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`min-h-screen w-full bg-gray-100 relative ${className}`}>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  const isDark = theme === "dark";

  // Backgrounds pré-définis
  const darkBackground: Record<
    "default" | "subtle" | "intense",
    BackgroundStyle
  > = {
    default: {
      core: "radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255,20,147,0.15), transparent 50%), radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0,255,255,0.12), transparent 60%), radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138,43,226,0.18), transparent 65%), radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255,215,0,0.08), transparent 40%), #000000",
      opacity: "opacity-100",
      vignette: "opacity-20",
    },
    subtle: {
      core: "radial-gradient(ellipse 100% 60% at 65% 25%, rgba(255,20,147,0.08), transparent 45%), radial-gradient(ellipse 80% 40% at 35% 15%, rgba(0,255,255,0.06), transparent 50%), radial-gradient(ellipse 70% 50% at 50% 5%, rgba(138,43,226,0.10), transparent 55%), radial-gradient(ellipse 90% 40% at 75% 35%, rgba(255,215,0,0.04), transparent 35%), #000000",
      opacity: "opacity-80",
      vignette: "opacity-15",
    },
    intense: {
      core: "radial-gradient(ellipse 140% 100% at 75% 15%, rgba(255,20,147,0.22), transparent 55%), radial-gradient(ellipse 120% 80% at 25% 5%, rgba(0,255,255,0.18), transparent 65%), radial-gradient(ellipse 110% 90% at 50% 0%, rgba(138,43,226,0.25), transparent 70%), radial-gradient(ellipse 130% 60% at 85% 25%, rgba(255,215,0,0.12), transparent 45%), radial-gradient(ellipse 60% 40% at 40% 60%, rgba(255,105,180,0.08), transparent 30%), #000000",
      opacity: "opacity-100 brightness-110",
      vignette: "opacity-30",
    },
  };

  const lightBackground: Record<
    "default" | "subtle" | "intense",
    BackgroundStyle
  > = {
    default: {
      core: "linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px), radial-gradient(circle 500px at 20% 100%, rgba(139,92,246,0.3), transparent), radial-gradient(circle 500px at 100% 80%, rgba(59,130,246,0.3), transparent)",
      backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
      opacity: "opacity-100",
      vignette: "opacity-20",
    },
    subtle: {
      core: "linear-gradient(to right, rgba(229,231,235,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(229,231,235,0.6) 1px, transparent 1px), radial-gradient(circle 400px at 25% 100%, rgba(139,92,246,0.2), transparent), radial-gradient(circle 400px at 100% 75%, rgba(59,130,246,0.2), transparent)",
      backgroundSize: "64px 64px, 64px 64px, 100% 100%, 100% 100%",
      opacity: "opacity-80",
      vignette: "opacity-15",
    },
    intense: {
      core: "linear-gradient(to right, rgba(203,213,225,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(203,213,225,0.9) 1px, transparent 1px), radial-gradient(circle 600px at 15% 100%, rgba(139,92,246,0.4), transparent), radial-gradient(circle 600px at 100% 85%, rgba(59,130,246,0.4), transparent), radial-gradient(circle 300px at 50% 50%, rgba(168,85,247,0.15), transparent)",
      backgroundSize: "32px 32px, 32px 32px, 100% 100%, 100% 100%, 100% 100%",
      opacity: "opacity-100 brightness-105",
      vignette: "opacity-30",
    },
  };

  const currentTheme = isDark
    ? darkBackground[darkVariant]
    : lightBackground[lightVariant];

  return (
    <div
      className={`min-h-screen w-full relative transition-all duration-500 ${
        isDark ? "bg-black" : "bg-white"
      } ${className}`}
    >
      {/* Background principal */}
      <div
        className={`absolute inset-0 ${currentTheme.opacity} transition-all duration-500`}
        style={{
          background: currentTheme.core,
          backgroundSize: currentTheme.backgroundSize,
        }}
      />

      {/* Vignette */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${currentTheme.vignette}`}
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 50%, transparent 70%, rgba(0,0,0,0.4) 100%)"
            : "radial-gradient(circle at 50% 50%, transparent 80%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 transition-all duration-500">
        {children}
      </div>
    </div>
  );
}
