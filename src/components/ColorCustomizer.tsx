"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ColorOption {
    id: string;
    name: string;
    color: string;
    filter: string;
}

const COLOR_OPTIONS: ColorOption[] = [
    {
        id: "vivid-black",
        name: "Vivid Black",
        color: "#0b0b0b",
        filter: "none",
    },
    {
        id: "gunship-gray",
        name: "Gunship Gray",
        color: "#4a4a4a",
        filter: "sepia(20%) saturate(50%) brightness(1.1) hue-rotate(180deg)",
    },
    {
        id: "billiard-red",
        name: "Billiard Red",
        color: "#8B0000",
        filter: "sepia(50%) saturate(200%) brightness(0.9) hue-rotate(-30deg)",
    },
    {
        id: "midnight-blue",
        name: "Midnight Blue",
        color: "#1a1a3e",
        filter: "sepia(30%) saturate(150%) brightness(0.95) hue-rotate(200deg)",
    },
    {
        id: "industrial-gray",
        name: "Industrial Gray",
        color: "#2d2d2d",
        filter: "saturate(0%) brightness(1.1)",
    },
];

interface ColorCustomizerProps {
    onColorChange: (filter: string) => void;
}

export default function ColorCustomizer({ onColorChange }: ColorCustomizerProps) {
    const [selectedColor, setSelectedColor] = useState<string>("vivid-black");
    const [isExpanded, setIsExpanded] = useState(false);

    const handleColorSelect = (option: ColorOption) => {
        setSelectedColor(option.id);
        onColorChange(option.filter);
        setIsExpanded(false);
    };

    const selectedOption = COLOR_OPTIONS.find((c) => c.id === selectedColor);

    return (
        <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
        >
            {/* Color Options Panel - Above button */}
            <motion.div
                initial={false}
                animate={{
                    opacity: isExpanded ? 1 : 0,
                    y: isExpanded ? 0 : 10,
                    pointerEvents: isExpanded ? "auto" : "none",
                }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full mb-3 left-0 bg-carbon-gray/95 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden shadow-2xl min-w-[180px]"
            >
                <div className="px-4 py-2 border-b border-white/5">
                    <span className="text-[10px] font-rajdhani text-white/40 tracking-[0.2em] uppercase">
                        Select Color
                    </span>
                </div>

                <div className="p-2 space-y-1">
                    {COLOR_OPTIONS.map((option) => (
                        <motion.button
                            key={option.id}
                            onClick={() => handleColorSelect(option)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${selectedColor === option.id
                                    ? "bg-harley-orange/20 border border-harley-orange/30"
                                    : "hover:bg-white/5 border border-transparent"
                                }`}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div
                                className={`w-5 h-5 rounded-full border-2 transition-colors ${selectedColor === option.id
                                        ? "border-harley-orange"
                                        : "border-white/20"
                                    }`}
                                style={{ backgroundColor: option.color }}
                            />
                            <span
                                className={`text-sm font-rajdhani tracking-wide ${selectedColor === option.id
                                        ? "text-white"
                                        : "text-white/60"
                                    }`}
                            >
                                {option.name}
                            </span>
                            {selectedColor === option.id && (
                                <motion.svg
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-4 h-4 text-harley-orange ml-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </motion.svg>
                            )}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Main Toggle Button */}
            <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-3 bg-carbon-gray/80 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 hover:border-harley-orange/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div
                    className="w-5 h-5 rounded-full border-2 border-white/30"
                    style={{ backgroundColor: selectedOption?.color }}
                />
                <span className="text-xs font-rajdhani text-white/70 tracking-wide uppercase">
                    {selectedOption?.name}
                </span>
                <motion.svg
                    className="w-4 h-4 text-white/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </motion.svg>
            </motion.button>
        </motion.div>
    );
}
