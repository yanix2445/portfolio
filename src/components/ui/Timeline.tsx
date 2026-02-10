import React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps {
    children: React.ReactNode;
    className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
    return (
        <div className={cn("space-y-16", className)}>
            {children}
        </div>
    );
}

interface TimelineItemProps {
    children: React.ReactNode;
    className?: string;
}

export function TimelineItem({ children, className }: TimelineItemProps) {
    return (
        <div className={cn("relative group", className)}>
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-0 top-2 bottom-0 w-px bg-white/10 group-last:bottom-auto group-last:h-full"></div>

            {/* Timeline Dot */}
            <div className="hidden md:block absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full bg-[#CC9400] ring-4 ring-black"></div>

            <div className="md:pl-10">
                {children}
            </div>
        </div>
    );
}

interface TimelineHeaderProps {
    title: string;
    period: string;
    subtitle?: string;
    className?: string;
}

export function TimelineHeader({ title, period, subtitle, className }: TimelineHeaderProps) {
    return (
        <div className={cn("mb-6", className)}>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
                    <span className="text-[#CC9400] mr-2 md:hidden">•</span> {title}
                </h3>
                <span className="text-white font-medium text-sm mt-1 md:mt-0">{period}</span>
            </div>
            {subtitle && (
                <div className="text-[#CC9400] text-xs font-medium uppercase tracking-wide italic">
                    {subtitle}
                </div>
            )}
        </div>
    );
}

interface TimelineContentProps {
    children: React.ReactNode;
    className?: string;
}

export function TimelineContent({ children, className }: TimelineContentProps) {
    return (
        <div className={cn("text-gray-400 leading-relaxed mb-6 max-w-2xl text-sm", className)}>
            {children}
        </div>
    );
}

interface TimelineGalleryProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function TimelineGallery({ title = "Selected Projects", children, className }: TimelineGalleryProps) {
    return (
        <div className={cn("mb-8", className)}>
            <div className="mb-3 text-[#CC9400] text-xs font-bold uppercase tracking-widest">{title}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    );
}

interface TimelineAchievementsProps {
    items: string[];
    className?: string;
}

export function TimelineAchievements({ items, className }: TimelineAchievementsProps) {
    return (
        <ul className={cn("space-y-2", className)}>
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                    <span className="mt-2 h-0.5 w-2 bg-[#CC9400] shrink-0"></span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

// Attach sub-components to Timeline for compound component pattern
Timeline.Item = TimelineItem;
Timeline.Header = TimelineHeader;
Timeline.Content = TimelineContent;
Timeline.Gallery = TimelineGallery;
Timeline.Achievements = TimelineAchievements;
