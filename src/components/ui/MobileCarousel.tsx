"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MobileCarouselProps {
    children: React.ReactNode;
    className?: string;
}

export function MobileCarousel({ children, className }: MobileCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState({ left: 0, right: 0 });
    const x = useMotionValue(0);

    // Spring animation for smoother "fluid" feel
    const springX = useSpring(x, {
        stiffness: 400,
        damping: 40,
        mass: 1
    });

    useEffect(() => {
        const updateConstraints = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const contentWidth = containerRef.current.scrollWidth;
                setConstraints({
                    left: -(contentWidth - containerWidth + 24), // Add some padding
                    right: 0
                });
            }
        };

        updateConstraints();
        window.addEventListener("resize", updateConstraints);
        return () => window.removeEventListener("resize", updateConstraints);
    }, [children]);

    return (
        <div
            ref={containerRef}
            className={cn("w-full overflow-hidden cursor-grab active:cursor-grabbing px-1", className)}
        >
            <motion.div
                drag="x"
                dragConstraints={constraints}
                dragElastic={0.1}
                style={{ x: springX }}
                className="flex gap-4 pr-12 w-max"
            >
                {React.Children.map(children, (child) => (
                    <div className="w-[85vw] max-w-[320px] shrink-0">
                        {child}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
