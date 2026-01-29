"use client";

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-harley-black/80 backdrop-blur">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#hero" className="text-sm font-orbitron font-semibold tracking-[0.2em] text-white">
                    APEX R1
                </a>

                <nav className="flex items-center gap-6 text-xs md:text-sm font-rajdhani tracking-[0.2em] uppercase text-white/70">
                    <a href="#overview" className="hover:text-white transition-colors">Overview</a>
                    <a href="#performance" className="hover:text-white transition-colors">Performance</a>
                    <a href="#built" className="hover:text-white transition-colors">Built For</a>
                    <a href="#design" className="hover:text-white transition-colors">Design</a>
                </nav>
            </div>
        </header>
    );
}
