"use client";

import React, { createContext, useContext, useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Vercel Composition Patterns: Timeline Compound Components
 * Unified Client Component architecture to resolve Turbopack module resolution issues.
 */

interface TimelineContextValue {
    variant?: "default" | "dense";
}

const TimelineContext = createContext<TimelineContextValue | undefined>(undefined);

export function useTimeline() {
    const context = useContext(TimelineContext);
    if (!context) {
        throw new Error("Timeline sub-components must be used within a <Timeline> component.");
    }
    return context;
}

interface TimelineProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "dense";
}

function TimelineRoot({ children, className, variant = "default" }: TimelineProps) {
    const value = useMemo(() => ({ variant }), [variant]);
    return (
        <TimelineContext.Provider value={value}>
            <div className={cn("space-y-16", variant === "dense" && "space-y-10", className)}>
                {children}
            </div>
        </TimelineContext.Provider>
    );
}

function TimelineItem({ children, className }: { children: React.ReactNode; className?: string }) {
    const { variant } = useTimeline();

    return (
        <div className={cn("relative", className)}>
            <div className={cn(
                "hidden md:block absolute left-0 top-2 bottom-0 w-px bg-white/10 group-last:bottom-auto group-last:h-full",
                variant === "dense" && "top-1.5"
            )}></div>

            <div className={cn(
                "hidden md:block absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full bg-[#CC9400] ring-4 ring-black transition-transform duration-300",
                variant === "dense" && "top-2 h-2 w-2 -left-[4px]"
            )}></div>

            <div className={cn("md:pl-10", variant === "dense" && "md:pl-8")}>
                {children}
            </div>
        </div>
    );
}

function TimelineHeader({ title, period, subtitle, className }: { title: string; period: string; subtitle?: string; className?: string }) {
    const { variant } = useTimeline();

    return (
        <div className={cn("mb-6", variant === "dense" && "mb-4", className)}>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                <h3 className={cn(
                    "text-xl md:text-2xl font-bold text-white uppercase tracking-wide flex items-center gap-2",
                    variant === "dense" && "text-lg md:text-xl"
                )}>
                    <span className="text-[#CC9400] mr-2 md:hidden">•</span> {title}
                </h3>
                <span className="text-white font-medium text-sm mt-1 md:mt-0 tabular-nums opacity-80">{period}</span>
            </div>
            {subtitle && (
                <div className="text-[#CC9400] text-xs font-medium uppercase tracking-wide italic opacity-90">
                    {subtitle}
                </div>
            )}
        </div>
    );
}

function TimelineContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("text-gray-400 leading-relaxed mb-6 max-w-2xl text-sm font-light", className)}>
            {children}
        </div>
    );
}

function TimelineGallery({ title = "Selected Projects", children, className }: { title?: string; children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("mb-8", className)}>
            <div className="mb-3 text-[#CC9400] text-[10px] font-bold uppercase tracking-widest opacity-80">{title}</div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    );
}

function TimelineAchievements({ items, className }: { items: string[]; className?: string }) {
    return (
        <ul className={cn("space-y-2", className)}>
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400 text-sm group/achieve">
                    <span className="mt-2 h-0.5 w-2 bg-[#CC9400] shrink-0 transition-all duration-300 group-hover/achieve:w-3"></span>
                    <span className="font-light">{item}</span>
                </li>
            ))}
        </ul>
    );
}

// Export subcomponents
export { TimelineItem, TimelineHeader, TimelineContent, TimelineGallery, TimelineAchievements };

// Export compound component
export const Timeline = Object.assign(TimelineRoot, {
    Item: TimelineItem,
    Header: TimelineHeader,
    Content: TimelineContent,
    Gallery: TimelineGallery,
    Achievements: TimelineAchievements,
});
