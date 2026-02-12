import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft, Terminal, CheckCircle2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Vercel Composition Patterns: Compound Components for Project Details
 * This architecture allows for a flexible and modular project page.
 */

interface ProjectDetailProps {
    children: React.ReactNode;
    className?: string;
}

// Simple formatter for basic markdown-like bold syntax
function FormattedText({ text }: { text: string }) {
    if (!text) return null;

    // Split by **text** and map to <strong> tags
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </>
    );
}

function ProjectDetailRoot({ children, className }: ProjectDetailProps) {
    return <div className={cn("max-w-4xl mx-auto", className)}>{children}</div>;
}

// 1. Back Navigation
function ProjectDetailBackLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-2 text-white/50 hover:text-[#CC9400] transition-colors mb-12 text-sm font-medium uppercase tracking-widest"
        >
            <div className="group-hover:-translate-x-1 transition-transform duration-300">
                <ArrowLeft className="w-4 h-4" />
            </div>
            {label}
        </Link>
    );
}

// 2. Header (Title & Badges)
function ProjectDetailHeader({ title, tech }: { title: string; tech?: string[] }) {
    return (
        <div className="flex flex-col gap-6 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {title}
            </h1>
            {tech && tech.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {tech.map((t: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                            {t}
                        </span>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

// 3. Hero Visual (Image)
function ProjectDetailHero({ src, alt }: { src: string | StaticImageData; alt: string }) {
    return (
        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 mb-16 group">
            <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                className="object-cover transition-all duration-800 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
    );
}

// 4. Layout Grid
function ProjectDetailGrid({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">{children}</div>;
}

// 5. Main Content Area
function ProjectDetailMain({ children }: { children: React.ReactNode }) {
    return <div className="lg:col-span-2 space-y-12">{children}</div>;
}

// 6. Section (Overview/Results)
function ProjectDetailSection({
    title,
    icon: Icon,
    children
}: {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode
}) {
    return (
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="text-[#CC9400]">
                    <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white uppercase tracking-widest">{title}</h2>
            </div>
            <div className="text-gray-400 text-lg leading-relaxed font-light">
                {typeof children === "string" ? <FormattedText text={children} /> : children}
            </div>
        </section>
    );
}

// 7. Achievement List Item (Static JSX Hoisting example)
function Achievement({ text }: { text: string }) {
    return (
        <li className="flex gap-4 group">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#CC9400] shrink-0" />
            <p className="text-gray-300 text-base leading-snug">
                <FormattedText text={text} />
            </p>
        </li>
    );
}

function ProjectDetailAchievements({ items }: { items: string[] }) {
    return (
        <ul className="space-y-4">
            {items.map((item, i) => (
                <Achievement key={i} text={item} />
            ))}
        </ul>
    );
}

// 8. Sidebar
function ProjectDetailSidebar({ children }: { children: React.ReactNode }) {
    return <div className="space-y-8">{children}</div>;
}

// 9. Card for Sidebar
function ProjectDetailCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-xl space-y-6">
            <h3 className="text-white font-bold text-lg uppercase tracking-widest">{title}</h3>
            {children}
        </div>
    );
}

// 10. Code Block
function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
    return (
        <div className="relative rounded-lg bg-[#0d1117] border border-white/10 overflow-hidden my-4 group/code">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-80" />
                </div>
                <span className="text-[10px] uppercase font-mono text-white/40 tracking-wider text-wrap-balance">{language}</span>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-gray-300 leading-relaxed text-wrap-balance">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}

// 11. Steps List
function ProjectDetailSteps({ steps }: { steps: { title: string; description: string; code?: string; language?: string }[] }) {
    return (
        <div className="space-y-12">
            {steps.map((step, i) => (
                <div key={i} className="relative pl-8 border-l border-white/10 pb-8 last:pb-0 group/step">
                    {/* Step Marker */}
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#CC9400] ring-4 ring-black" />

                    <h3 className="text-lg font-bold text-white mb-2 group-hover/step:text-[#CC9400] transition-colors">
                        <FormattedText text={step.title} />
                    </h3>
                    <div className="text-gray-400 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                        <FormattedText text={step.description} />
                    </div>
                    {step.code && <CodeBlock code={step.code} language={step.language} />}
                </div>
            ))}
        </div>
    );
}

// Export compound component
export const ProjectDetail = Object.assign(ProjectDetailRoot, {
    BackLink: ProjectDetailBackLink,
    Header: ProjectDetailHeader,
    Hero: ProjectDetailHero,
    Grid: ProjectDetailGrid,
    Main: ProjectDetailMain,
    Section: ProjectDetailSection,
    Achievements: ProjectDetailAchievements,
    Sidebar: ProjectDetailSidebar,
    Card: ProjectDetailCard,
    Steps: ProjectDetailSteps,
    CodeBlock: CodeBlock, // Optional if we want to expose it
});
