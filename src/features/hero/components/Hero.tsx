"use client";

import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function Hero() {
    const t = useTranslations("Hero");
    const [scrollConfig, setScrollConfig] = useState({ blur: 0, opacity: 1 });

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            let blur = 0;

            // Standard blur logic: increase as you scroll down
            blur = Math.min(scrollY / 40, 20);

            // Unblur logic: Check distance to the #links section
            const linksSection = document.getElementById("links");
            if (linksSection) {
                const rect = linksSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // If Links section is entering the viewport (or is visible)
                if (rect.top < windowHeight) {
                    // Calculate how far into the view it is (0 to 1)
                    // 0 = just entered bottom, 1 = top of section hits top of viewport
                    // We want to fully unblur when it's substantially visible (e.g. 50%)
                    const visibleProgress = Math.max(0, 1 - (rect.top / windowHeight));

                    // Unblur faster: fully unblurred when it takes up 30% of screen
                    const unblurFactor = Math.min(1, visibleProgress * 3);

                    // Reduce blur based on this factor
                    blur = Math.max(0, blur - (blur * unblurFactor));
                }
            }

            setScrollConfig({ blur, opacity: 1 });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Initial calculation
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="home" className="relative flex min-h-screen items-center px-6 md:px-12 lg:px-20">
            {/* Background Image - Fixed & Blurry on Scroll */}
            <div
                className="fixed inset-0 z-0 will-change-[filter] bg-black"
                style={{
                    filter: `blur(${scrollConfig.blur}px)`,
                    transition: 'filter 0.1s ease-out'
                }}
            >
                <Image
                    src="/bg-v2.png"
                    alt="Background"
                    fill
                    sizes="100vw"
                    className="object-cover object-[60%_50%] md:object-center brightness-75 transition-opacity duration-700"
                    priority
                    quality={75}
                />
                {/* Responsive Overlay: Vertical on mobile, horizontal on desktop */}
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto pt-24 md:pt-36 pb-12">
                <div className="max-w-4xl">
                    <h2 className="mb-4 text-base md:text-lg font-bold tracking-widest text-[#CC9400] uppercase text-wrap-balance">
                        {t("subtitle")}
                    </h2>
                    <h1 className="mb-10 text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-[6rem] leading-[0.9] text-wrap-balance">
                        {t("name")}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-base font-medium text-white/90 w-fit">
                        <a
                            href="mailto:contact@yanis-harrat.com"
                            className="flex items-center gap-3 transition-colors hover:text-[#CC9400] group"
                        >
                            <Mail className="h-5 w-5 text-[#CC9400] group-hover:scale-110 transition-transform" />
                            <span>contact@yanis-harrat.com</span>
                        </a>
                        <a
                            href="tel:+33768187934"
                            className="flex items-center gap-3 transition-colors hover:text-[#CC9400] group"
                        >
                            <Phone className="h-5 w-5 text-[#CC9400] group-hover:scale-110 transition-transform" />
                            <span>+33 7 68 18 79 34</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/yanis-harrat/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 transition-colors hover:text-[#CC9400] group"
                        >
                            <Linkedin className="h-5 w-5 text-[#CC9400] group-hover:scale-110 transition-transform" />
                            <span>linkedin.com/in/yanis-harrat</span>
                        </a>
                        <div className="flex items-center gap-3 group">
                            <MapPin className="h-5 w-5 text-[#CC9400]" />
                            <span>Nanterre, Paris, Île-de-France</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
