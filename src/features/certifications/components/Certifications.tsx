"use client";

import { useTranslations } from "next-intl";
import { Certification } from "../types";
import Image from "next/image";

export function Certifications({ items }: { items: Certification[] }) {
    const t = useTranslations("Certifications");

    return (
        <section id="certifications" className="relative z-10 px-6 py-12 md:px-12 lg:py-16 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <h2 className="mb-16 text-3xl md:text-4xl font-bold text-[#CC9400] tracking-tight text-center uppercase text-wrap-balance">
                    {t("title")}
                </h2>

                <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                    {items.map((cert, idx) => (
                        <a
                            key={idx}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col gap-4 border-l border-white/10 pl-6 group transition-colors hover:border-[#CC9400]/50 w-full md:w-[280px]"
                        >
                            <div className="relative size-24 mb-2 transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src={cert.image}
                                    alt={cert.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-[#CC9400] text-[10px] font-bold uppercase tracking-widest group-hover:text-[#CC9400] transition-colors">
                                    {cert.issuer}
                                </h3>
                                <p className="text-white/70 text-sm font-medium leading-tight group-hover:text-white transition-colors">
                                    {cert.name}
                                </p>
                                <span className="text-gray-600 text-[10px] uppercase font-mono tracking-wide mt-1">
                                    {cert.date}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Certifications;
