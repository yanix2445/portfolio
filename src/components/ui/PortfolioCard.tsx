"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { StaticImageData } from "next/image";

interface PortfolioCardProps {
    name: string;
    description: string;
    image: string | StaticImageData;
    link: string;
    className?: string;
}

export const PortfolioCard = React.memo(function PortfolioCard({ name, description, image, link, className }: PortfolioCardProps) {
    const isInternal = link.startsWith("/");

    const content = (
        <>
            {/* Background Image */}
            <div className="absolute inset-0 bg-neutral-900 overflow-hidden rounded-xl group/img">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover opacity-85 group-hover/img:scale-110 group-hover/img:opacity-100 transition-all duration-700 ease-out"
                />
            </div>

            {/* Arrow Icon */}
            <div className="absolute top-3 right-3 z-20 pointer-events-none">
                <div className="text-white/70 group-hover:text-[#CC9400] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>

            {/* Text Overlay */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-10 pointer-events-none">
                <h4 className="text-white font-bold text-base mb-0.5 group-hover:text-[#CC9400] transition-colors text-wrap-balance">
                    {name}
                </h4>
                <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">
                    {description}
                </p>
            </div>
        </>
    );

    const cardClassName = cn(
        "group relative aspect-video overflow-hidden rounded-xl bg-neutral-900 border border-white/5 hover:border-[#CC9400]/40 transition-all duration-300 block",
        className
    );

    if (isInternal) {
        return (
            <Link href={link} className={cardClassName}>
                {content}
            </Link>
        );
    }

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClassName}
        >
            {content}
        </a>
    );
});
