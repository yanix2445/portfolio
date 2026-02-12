"use client";

import { useTranslations } from "next-intl";
import { MarkdownText } from "@/components/ui/MarkdownText";

export default function About() {
    const t = useTranslations("About");

    return (
        <section id="summary" className="relative z-10 px-6 py-16 md:px-12 lg:py-20">
            <div className="max-w-4xl mx-auto">
                <h2 className="mb-8 text-2xl md:text-3xl font-bold text-[#CC9400] uppercase tracking-widest">{t("title")}</h2>
                <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed font-light">
                    <MarkdownText content={t("p1")} />
                    <MarkdownText content={t("p2")} />
                    <MarkdownText content={t("p3")} />
                </div>
            </div>
        </section>
    );
}
