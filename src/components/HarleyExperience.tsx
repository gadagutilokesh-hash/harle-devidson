"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface HarleyExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function HarleyExperience({ scrollYProgress }: HarleyExperienceProps) {
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

    return (
        <motion.div
            id="hero"
            style={{ opacity: heroOpacity, y: heroY }}
            className="absolute inset-0 z-10 flex items-center pointer-events-none"
        >
            <div className="max-w-6xl mx-auto px-6 w-full">
                <div className="max-w-xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-rajdhani mb-4">
                        APEX R1 — Track-focused Superbike
                    </p>
                    <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white leading-tight">
                        Engineered to Dominate.
                    </h1>
                    <p className="mt-4 text-white/70 font-rajdhani text-sm md:text-base">
                        Precision aero, race-grade control, and relentless power—built for the apex.
                    </p>

                    <div className="mt-8 pointer-events-auto">
                        <a href="#overview" className="btn-primary">Explore the Machine</a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
