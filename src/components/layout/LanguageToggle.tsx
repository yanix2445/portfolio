"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("LanguageToggle");

    const otherLocale = locale === "fr" ? "en" : "fr";
    const label = otherLocale.toUpperCase();

    function switchLocale() {
        router.replace(pathname, { locale: otherLocale });
    }

    return (
        <button
            onClick={switchLocale}
            aria-label={t("switchTo", { language: otherLocale.toUpperCase() })}
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur-sm transition-all hover:border-[#CC9400]/50 hover:bg-[#CC9400]/10 hover:text-white"
        >
            <span className="text-sm">{locale === "fr" ? "🇫🇷" : "🇬🇧"}</span>
            <span className="tracking-wider">{locale.toUpperCase()}</span>
        </button>
    );
}
