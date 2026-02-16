"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MobileCarouselProps {
    children: React.ReactNode;
    className?: string;
}

export function MobileCarousel({ children, className }: MobileCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState({ left: 0, right: 0 });
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = React.Children.toArray(children);

    // Drag and Animation Values
    const x = useMotionValue(0);
    const scrollX = useSpring(x, {
        stiffness: 300,
        damping: 35,
        mass: 0.8
    });

    const CARD_WIDTH = 300; // max-w-[300px]
    const GAP = 16; // gap-4
    const CARD_SIZE = CARD_WIDTH + GAP;

    useEffect(() => {
        const updateConstraints = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const totalWidth = items.length * CARD_SIZE - GAP;
                const padding = (containerWidth - CARD_WIDTH) / 2;

                // Constraints to allow the first and last cards to be centered
                setConstraints({
                    left: -(totalWidth - containerWidth + padding),
                    right: padding
                });

                // Initial position: center the first card
                x.set(padding);
            }
        };

        updateConstraints();
        window.addEventListener("resize", updateConstraints);
        return () => window.removeEventListener("resize", updateConstraints);
    }, [items.length, CARD_SIZE, GAP, x]);

    // Handle Snap Logic
    const handleDragEnd = (_: any, info: any) => {
        const currentX = x.get();
        const velocity = info.velocity.x;

        // Predict where we should end up based on velocity (Smart Momentum)
        const predictedOffset = velocity * 0.2;
        const targetX = currentX + predictedOffset;

        // Find nearest card index
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const centerPadding = (containerWidth - CARD_WIDTH) / 2;

            // Calculate which index is closest to the target position
            let nearestIndex = Math.round((targetX - centerPadding) / -CARD_SIZE);
            nearestIndex = Math.max(0, Math.min(items.length - 1, nearestIndex));

            const finalX = centerPadding - (nearestIndex * CARD_SIZE);

            x.set(finalX);
            setCurrentIndex(nearestIndex);
        }
    };

    return (
        <div className={cn("w-full flex flex-col items-center", className)}>
            <div
                ref={containerRef}
                className="w-full h-[280px] overflow-hidden cursor-grab active:cursor-grabbing relative flex items-center"
            >
                <motion.div
                    drag="x"
                    dragConstraints={constraints}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    style={{ x: scrollX }}
                    className="flex gap-4 absolute"
                >
                    {items.map((child, index) => {
                        // Advanced visual feedback based on position relative to center
                        // We use the motion value directly for smooth interpolation
                        return (
                            <CarouselItem
                                key={index}
                                index={index}
                                x={x}
                                cardSize={CARD_SIZE}
                                containerRef={containerRef}
                                cardWidth={CARD_WIDTH}
                            >
                                {child}
                            </CarouselItem>
                        );
                    })}
                </motion.div>
            </div>

            {/* Premium Progress Indicators */}
            <div className="flex gap-1.5 mt-2">
                {items.map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            width: currentIndex === i ? 20 : 6,
                            backgroundColor: currentIndex === i ? "#CC9400" : "rgba(204, 148, 0, 0.2)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="h-1.5 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
}

function CarouselItem({ children, index, x, cardSize, containerRef, cardWidth }: any) {
    const itemRef = useRef<HTMLDivElement>(null);

    // Calculate displacement from center to drive animations
    const range = [
        -(index + 1) * cardSize,
        -index * cardSize,
        -(index - 1) * cardSize
    ];

    // These maps create smooth transitions as you scroll
    // When the card is at the center (0 relative), it has full opacity and scale
    const scale = useTransform(x, (value) => {
        if (!containerRef.current) return 0.95;
        const centerPadding = (containerRef.current.offsetWidth - cardWidth) / 2;
        const relativeX = value - centerPadding;
        const distance = Math.abs(relativeX + (index * cardSize));
        const normalized = Math.min(distance / cardSize, 1);
        return 1 - (normalized * 0.1); // Scale from 1 to 0.9
    });

    const opacity = useTransform(x, (value) => {
        if (!containerRef.current) return 0.5;
        const centerPadding = (containerRef.current.offsetWidth - cardWidth) / 2;
        const relativeX = value - centerPadding;
        const distance = Math.abs(relativeX + (index * cardSize));
        const normalized = Math.min(distance / cardSize, 1);
        return 1 - (normalized * 0.5); // Opacity from 1 to 0.5
    });

    return (
        <motion.div
            style={{ scale, opacity }}
            whileTap={{ scale: 0.98 }}
            className="w-[300px] shrink-0"
        >
            {children}
        </motion.div>
    );
}
