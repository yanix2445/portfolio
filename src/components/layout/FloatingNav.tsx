"use client";

import { Link } from "@/i18n/navigation";
import { Home, User, Briefcase, Sparkles, Link as LinkIcon, FolderKanban } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function FloatingNav() {
    const t = useTranslations("Nav");
    const [activeSection, setActiveSection] = useState("home");

    const navItems = [
        { name: t("home"), href: "#home", icon: Home },
        { name: t("summary"), href: "#summary", icon: User },
        { name: t("experience"), href: "#experience", icon: Briefcase },
        { name: t("projects"), href: "#projects", icon: FolderKanban },
        { name: t("skills"), href: "#skills", icon: Sparkles },
        { name: t("links"), href: "#links", icon: LinkIcon },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-black/80 p-1 shadow-lg backdrop-blur-md">
                {navItems.map((item) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveSection(item.href.substring(1))}
                            className={cn(
                                "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                                isActive
                                    ? "bg-white text-black hover:bg-white/90"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            <span className="hidden sm:inline">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
