"use client";

import { Mail, Phone, Terminal } from "lucide-react";
import { SiLinkedin, SiInstagram, SiGithub, SiX } from "react-icons/si";
import { useTranslations } from "next-intl";

const socialLinks = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/yanis-harrat/",
        Icon: SiLinkedin
    },
    {
        name: "GitHub",
        url: "https://github.com/yanix2445",
        Icon: SiGithub
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/yanix2445",
        Icon: SiInstagram
    },
    {
        name: "X",
        url: "https://x.com/yanix_213",
        Icon: SiX
    }
];

export function Contact() {
    const t = useTranslations("Contact");
    return (
        <section id="links" className="relative z-10 px-6 pt-32 pb-40 md:pt-40 md:pb-48">
            <div className="max-w-4xl mx-auto">
                <h2 className="mb-12 text-4xl md:text-5xl font-bold text-[#CC9400] tracking-tight">Links</h2>

                {/* Social Icons Row */}
                <div className="flex flex-wrap gap-4 mb-16">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Follow on ${link.name}`}
                            className="bg-white/10 hover:bg-[#CC9400] rounded-xl w-12 h-12 flex items-center justify-center transition-[background-color,transform] duration-300 group"
                        >
                            <link.Icon className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                        </a>
                    ))}
                </div>

                {/* Contact Info Row */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-8 md:gap-x-16 md:gap-y-8 text-lg md:text-xl font-medium text-white mb-24">
                    <a href="mailto:contact@yanis-harrat.com" className="flex items-center gap-4 hover:text-[#CC9400] transition-colors focus-visible:ring-2 focus-visible:ring-[#CC9400] rounded-lg outline-none">
                        <Mail className="w-6 h-6 text-[#CC9400]" />
                        <span>contact@yanis-harrat.com</span>
                    </a>
                    <a href="tel:+33768187934" className="flex items-center gap-4 hover:text-[#CC9400] transition-colors focus-visible:ring-2 focus-visible:ring-[#CC9400] rounded-lg outline-none">
                        <Phone className="w-6 h-6 text-[#CC9400]" />
                        <span>+33 7 68 18 79 34</span>
                    </a>
                    <div className="flex items-center gap-4 text-white/50">
                        <Terminal className="w-6 h-6 text-[#CC9400]" />
                        <span>Nanterre, Paris, Île-de-France</span>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-gray-500 text-sm font-medium">
                    <p>{t("copyright", { year: new Date().getFullYear() })}</p>
                </div>
            </div>
        </section>
    );
}
