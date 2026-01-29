"use client";

import { useMotionValueEvent, MotionValue, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

interface HarleyScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames?: number;
    imageFolderPath?: string;
    colorFilter?: string;
}

// Detect reduced motion preference
const prefersReducedMotion = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * LINEAR SCROLL-TO-FRAME MAPPING
 * Smooth 1:1 mapping for consistent frame progression
 */
function mechanicalEasing(progress: number): number {
    // Clamp between 0 and 1 and return linear mapping
    return Math.max(0, Math.min(1, progress));
}

export default function HarleyScrollCanvas({
    scrollYProgress,
    totalFrames = 238,
    imageFolderPath = "/images/harley-sequence",
    colorFilter = "none",
}: HarleyScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // PRIORITY-BASED IMAGE LOADING
    // Load first frame immediately, then batch load rest for smoother UX
    useEffect(() => {
        let loadedCount = 0;
        const tempImages = new Array<HTMLImageElement>(totalFrames);
        const PRIORITY_FRAMES = [1, 2, 3, Math.floor(totalFrames / 2), totalFrames]; // Critical frames first
        const loadedSet = new Set<number>();

        const loadImage = (index: number): Promise<void> => {
            return new Promise((resolve) => {
                if (loadedSet.has(index)) {
                    resolve();
                    return;
                }
                loadedSet.add(index);

                const img = new Image();
                img.decoding = "async";
                // Add loading priority hint
                if (PRIORITY_FRAMES.includes(index)) {
                    img.fetchPriority = "high";
                }
                img.src = `${imageFolderPath}/${index}.jpg`;

                const onComplete = () => {
                    loadedCount++;
                    setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
                    tempImages[index - 1] = img;

                    if (loadedCount === totalFrames) {
                        imagesRef.current = tempImages;
                        // Small delay for dramatic effect
                        setTimeout(() => setIsLoaded(true), 300);
                    }
                    resolve();
                };

                img.onload = onComplete;
                img.onerror = onComplete;
            });
        };

        // Load priority frames first, then batch the rest
        const loadAll = async () => {
            // Phase 1: Priority frames
            await Promise.all(PRIORITY_FRAMES.map(loadImage));

            // Phase 2: Remaining frames in chunks to avoid network congestion
            const CHUNK_SIZE = 20;
            const remainingFrames = Array.from({ length: totalFrames }, (_, i) => i + 1)
                .filter(i => !PRIORITY_FRAMES.includes(i));

            for (let i = 0; i < remainingFrames.length; i += CHUNK_SIZE) {
                const chunk = remainingFrames.slice(i, i + CHUNK_SIZE);
                await Promise.all(chunk.map(loadImage));
            }
        };

        loadAll();
    }, [totalFrames, imageFolderPath]);

    // Draw frame function - memoized for performance
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const images = imagesRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
        if (!ctx) return;

        const img = images[index];
        if (!img.complete || img.naturalWidth === 0) return;

        // Skip if same frame
        if (currentFrameRef.current === index) return;
        currentFrameRef.current = index;

        const dpr = window.devicePixelRatio || 1;
        const cssWidth = canvas.width / dpr;
        const cssHeight = canvas.height / dpr;
        const canvasRatio = cssWidth / cssHeight;
        const imgRatio = img.naturalWidth / img.naturalHeight;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        let drawWidth: number;
        let drawHeight: number;
        let offsetX: number;
        let offsetY: number;

        if (canvasRatio > imgRatio) {
            // Canvas wider than image -> Fit to WIDTH (Cover)
            drawWidth = cssWidth;
            drawHeight = img.naturalHeight * (cssWidth / img.naturalWidth);
            offsetX = 0;
            offsetY = (cssHeight - drawHeight) / 2;
        } else {
            // Canvas taller than image -> Fit to HEIGHT (Cover)
            drawHeight = cssHeight;
            drawWidth = img.naturalWidth * (cssHeight / img.naturalHeight);
            offsetX = (cssWidth - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, []);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const dpr = window.devicePixelRatio || 1;
                canvas.width = Math.floor(window.innerWidth * dpr);
                canvas.height = Math.floor(window.innerHeight * dpr);

                // Force re-render on resize with mechanical easing
                currentFrameRef.current = -1;
                const currentProgress = scrollYProgress.get();
                const easedProgress = mechanicalEasing(currentProgress);
                const frameIndex = Math.min(
                    totalFrames - 1,
                    Math.max(0, Math.floor(easedProgress * (totalFrames - 1)))
                );
                if (isLoaded) {
                    renderFrame(frameIndex);
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, scrollYProgress, totalFrames, renderFrame]);

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) {
            currentFrameRef.current = -1;
            renderFrame(0);
        }
    }, [isLoaded, renderFrame]);

    // React to Scroll Change - Direct render for smoothness
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded) return;

        // Apply mechanical easing - scroll feels weighted
        const easedProgress = mechanicalEasing(latest);
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.max(0, Math.floor(easedProgress * (totalFrames - 1)))
        );

        renderFrame(frameIndex);
    });

    // Dynamic vignette intensity based on scroll phase
    const vignetteIntensity = useMemo(() => {
        const progress = scrollYProgress.get();
        // Intensify during silence zone (50-70%)
        if (progress > 0.50 && progress < 0.70) return 0.6;
        return 0.3;
    }, [scrollYProgress]);

    return (
        <div className="fixed inset-0 z-0 bg-harley-black">
            <canvas
                ref={canvasRef}
                className="block w-full h-full transition-[filter] duration-500"
                style={{ width: "100%", height: "100%", filter: colorFilter }}
                aria-label="Harley-Davidson motorcycle 360-degree view controlled by scrolling"
                role="img"
            />

            {/* CINEMATIC VIGNETTE OVERLAY */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,${vignetteIntensity}) 100%)`,
                    transition: 'background 0.5s ease-out'
                }}
            />

            {/* FILM GRAIN OVERLAY - Adds texture & premium feel */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* DRAMATIC LOADING EXPERIENCE */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-harley-black z-50"
                    >
                        {/* Geometric loading animation */}
                        <div className="relative w-32 h-32 mb-12">
                            {/* Outer ring */}
                            <motion.div
                                className="absolute inset-0 border border-white/10 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Middle ring */}
                            <motion.div
                                className="absolute inset-4 border border-white/20 rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Progress ring */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="48"
                                    fill="none"
                                    stroke="rgba(255, 106, 0, 0.3)"
                                    strokeWidth="1"
                                />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="48"
                                    fill="none"
                                    stroke="#ff6a00"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray={`${loadProgress * 3.01} 301`}
                                    className="transition-all duration-300"
                                />
                            </svg>
                            {/* Center pulse */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="w-2 h-2 bg-harley-orange rounded-full" />
                            </motion.div>
                        </div>

                        {/* Progress bar */}
                        <div className="w-48 h-px bg-white/5 relative overflow-hidden mb-4">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-harley-orange to-white/50"
                                style={{ width: `${loadProgress}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${loadProgress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {/* Status text */}
                        <div className="text-center">
                            <motion.div
                                className="text-white/40 font-rajdhani text-[10px] tracking-[0.5em] uppercase mb-2"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                INITIALIZING SYSTEM
                            </motion.div>
                            <div className="text-harley-orange font-orbitron text-2xl font-bold tabular-nums">
                                {loadProgress}<span className="text-white/30">%</span>
                            </div>
                        </div>

                        {/* Decorative corners */}
                        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/10" />
                        <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/10" />
                        <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/10" />
                        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/10" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
