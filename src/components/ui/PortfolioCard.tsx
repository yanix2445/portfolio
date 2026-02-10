import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
    name: string;
    description: string;
    image: string;
    link: string;
    className?: string;
}

export const PortfolioCard = React.memo(function PortfolioCard({ name, description, image, link, className }: PortfolioCardProps) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group/card relative aspect-video overflow-hidden rounded-lg bg-neutral-900 border border-white/5 hover:border-[#CC9400]/30 transition-all duration-300 block",
                className
            )}
        >
            {/* Background Image */}
            <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover opacity-80 group-hover/card:scale-110 group-hover/card:opacity-100 transition-all duration-700"
                />
            </div>

            {/* Arrow Icon */}
            <div className="absolute top-3 right-3 z-20">
                <ArrowUpRight className="text-white/70 w-4 h-4 group-hover/card:text-[#CC9400] group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all" />
            </div>

            {/* Text Overlay */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-10">
                <h4 className="text-white font-bold text-base mb-0.5 group-hover/card:text-[#CC9400] transition-colors">
                    {name}
                </h4>
                <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">
                    {description}
                </p>
            </div>
        </a>
    );
});
