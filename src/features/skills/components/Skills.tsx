"use client";

import { Tool, SkillCategory as SkillCategoryType, Language, Education } from "../types";
import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { useTranslations } from "next-intl";

// --- Composition Components ---

interface SkillsContextValue {
    mounted: boolean;
}

const SkillsContext = createContext<SkillsContextValue | null>(null);

function useSkills() {
    const context = useContext(SkillsContext);
    if (!context) throw new Error("useSkills must be used within a SkillsProvider");
    return context;
}

export function SkillsProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <SkillsContext.Provider value={{ mounted }}>
            {children}
        </SkillsContext.Provider>
    );
}

export function SkillsHeader({ title }: { title: string }) {
    return (
        <h2 className="mb-16 text-3xl md:text-4xl font-bold text-[#CC9400] tracking-tight text-center uppercase text-wrap-balance">
            {title}
        </h2>
    );
}

export function SkillsGrid({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {children}
        </div>
    );
}

import { SkillIcon } from "./SkillIcon";

export function SkillCategory({ name, icon, skills, tools }: { name: string, icon: string, skills: string[], tools: Tool[] }) {
    return (
        <div className="flex flex-col gap-4 border-l border-white/10 pl-6 group [content-visibility:auto]">
            <div className="flex items-center gap-2 mb-1">
                <SkillIcon name={icon} className="w-4 h-4 text-[#CC9400] opacity-70" />
                <h3 className="text-[#CC9400] text-[10px] font-bold uppercase tracking-widest">{name}</h3>
            </div>
            <ul className="flex flex-col gap-1.5">
                {skills.map((s, i) => (
                    <li key={i} className="text-white/70 text-sm font-medium leading-tight">{s}</li>
                ))}
            </ul>
            <div className="flex flex-wrap gap-4 mt-3">
                {tools.map((t, i) => (
                    <div key={i} className="group/tool relative flex items-center justify-center">
                        <div className="w-5 h-5 transition-[filter,opacity] duration-300 opacity-100 grayscale-0 md:opacity-50 md:grayscale group-hover:opacity-100 group-hover:grayscale-0" style={{ color: t.color }}>
                            <SkillIcon name={t.icon} className="w-full h-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function LanguageList({ languages }: { languages: { name: string, level: string, percentage: number }[] }) {
    const { mounted } = useSkills();
    const t = useTranslations("Skills");
    return (
        <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 uppercase tracking-wider">{t("languages.title")}</h3>
            <div className="space-y-5">
                {languages.map((lang, index) => (
                    <div key={index}>
                        <div className="flex justify-between mb-1.5 align-bottom">
                            <span className="text-white font-bold text-sm md:text-base">{lang.name}</span>
                            <span className="text-gray-500 text-[10px] uppercase font-mono tracking-wider">{lang.level}</span>
                        </div>
                        <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#CC9400] rounded-full transition-[width] duration-1000 ease-out"
                                style={{ width: mounted ? `${lang.percentage}%` : "0%" }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function EducationList({ education }: { education: { school: string, degree: string, year: string }[] }) {
    const t = useTranslations("Skills");
    return (
        <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 uppercase tracking-wider">{t("education.title")}</h3>
            <div className="space-y-6">
                {education.map((edu, index) => (
                    <div key={index} className="flex gap-4 group">
                        <div className="flex flex-col items-center mt-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#CC9400] shrink-0 group-hover:shadow-[0_0_8px_#CC9400] transition-shadow"></span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm md:text-base leading-tight mb-1 group-hover:text-[#CC9400] transition-colors">{edu.school}</h4>
                            <p className="text-white/70 font-medium text-xs md:text-sm mb-0.5">{edu.degree}</p>
                            <p className="text-gray-600 text-[10px] uppercase font-mono tracking-wide">{edu.year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Skills({ children }: { children: ReactNode }) {
    return (
        <section id="skills" className="relative z-10 px-6 py-12 md:px-12 lg:py-16">
            <div className="max-w-6xl mx-auto">
                {children}
            </div>
        </section>
    );
}

// Attach sub-components to root component
export const SkillsRoot = Object.assign(Skills, {
    Provider: SkillsProvider,
    Header: SkillsHeader,
    Grid: SkillsGrid,
    Category: SkillCategory,
    LanguageList,
    EducationList
});

interface SkillsSectionProps {
    categories: SkillCategoryType[];
    languages: Language[];
    education: Education[];
}

// For backward compatibility and standard use
export default function SkillsSection({ categories, languages, education }: SkillsSectionProps) {
    const t = useTranslations("Skills");
    return (
        <SkillsRoot.Provider>
            <SkillsRoot>
                <SkillsRoot.Header title={t("title")} />

                <SkillsRoot.Grid>
                    {categories.map((cat, idx) => (
                        <SkillsRoot.Category
                            key={idx}
                            name={cat.name}
                            icon={cat.icon}
                            skills={cat.skills}
                            tools={cat.tools}
                        />
                    ))}
                </SkillsRoot.Grid>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 border-t border-white/5 pt-12">
                    <SkillsRoot.LanguageList languages={languages} />
                    <SkillsRoot.EducationList education={education} />
                </div>
            </SkillsRoot>
        </SkillsRoot.Provider>
    );
}
