"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslations } from "next-intl";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Calendar, FileText } from "lucide-react";

export function Header() {
    const t = useTranslations("Header");

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "premier-contact-15", "embedJsUrl": "https://cal.yanis-harrat.com/embed/embed.js" });
            cal("ui", { "hideEventTypeDetails": true, "layout": "month_view" });
        })();
    }, []);

    const handleCvAction = () => {
        // Preview in new tab
        window.open("/cv-yanis-harrat.pdf", "_blank");

        // Force download
        const link = document.createElement("a");
        link.href = "/cv-yanis-harrat.pdf";
        link.download = "Cv-Yanis-Harrat.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-12 lg:px-20 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[2px]">
            <div className="flex items-center gap-2 md:gap-3">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="hidden sm:block text-sm font-medium text-white tracking-wide">{t("openToWork")}</span>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
                <LanguageToggle />
                <Button
                    className="bg-[#CC9400] hover:bg-[#CC9400]/90 text-black rounded-full h-10 px-4 sm:px-6 py-3 text-sm font-bold tracking-wide transition-transform hover:scale-105"
                    data-cal-namespace="premier-contact-15"
                    data-cal-link="yanis-harrat/premier-contact-15"
                    data-cal-config='{"layout":"month_view"}'
                >
                    <Calendar className="w-4 h-4 sm:hidden" />
                    <span className="hidden sm:inline">{t("bookMeeting")}</span>
                </Button>
                <Button
                    onClick={handleCvAction}
                    className="bg-[#CC9400] hover:bg-[#CC9400]/90 text-black rounded-full h-10 px-4 sm:px-6 py-3 text-sm font-bold tracking-wide transition-transform hover:scale-105"
                >
                    <FileText className="w-4 h-4 sm:hidden" />
                    <span className="hidden sm:inline">{t("downloadCv")}</span>
                </Button>
            </div>
        </header>
    );
}
