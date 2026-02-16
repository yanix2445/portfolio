"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MobileCarouselProps {
    children: React.ReactNode;
    className?: string;
}

export function MobileCarousel({ children, className }: MobileCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = React.Children.toArray(children);

    // Scroll Handler for Pagination
    const handleScroll = () => {
        if (containerRef.current) {
            const scrollLeft = containerRef.current.scrollLeft;
            const containerWidth = containerRef.current.offsetWidth;
            const center = scrollLeft + (containerWidth / 2);

            // Standard card width + gap
            const itemWidth = 300 + 16;

            // Calculate index based on which card center is closest to scroll center
            const index = Math.round(scrollLeft / itemWidth);
            setCurrentIndex(Math.max(0, Math.min(items.length - 1, index)));
        }
    };

    return (
        <div className={cn("w-full flex flex-col items-center", className)}>
            {/* Native Scroll Container with CSS Snap */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-[calc(50%-150px)] gap-4"
                style={{ scrollBehavior: 'smooth' }}
            >
                {items.map((child, index) => (
                    <div
                        key={index}
                        className={cn(
                            "snap-center shrink-0 w-[300px] transition-all duration-300 ease-out",
                            index === currentIndex ? "scale-100 opacity-100" : "scale-90 opacity-60"
                        )}
                    >
                        {child}
                    </div>
                ))}
            </div>

            {/* Pagination Indicators */}
            <div className="flex gap-2 mt-2">
                {items.map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            width: currentIndex === i ? 24 : 6,
                            opacity: currentIndex === i ? 1 : 0.3,
                            backgroundColor: currentIndex === i ? "#CC9400" : "#ffffff"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="h-1.5 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
}
