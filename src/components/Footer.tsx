export default function Footer() {
    return (
        <footer className="w-full bg-harley-black text-white relative z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-rajdhani">Status</p>
                <h2 className="mt-4 text-4xl md:text-6xl font-orbitron font-bold text-white">
                    Full Specifications Launching Soon
                </h2>
                <p className="mt-4 text-white/60 font-rajdhani text-sm md:text-base">
                    Track-ready. Engineered with zero excess.
                </p>

                <div className="mt-8">
                    <a href="#overview" className="btn-primary">View Specifications</a>
                </div>
            </div>

            <div className="border-t border-white/5 py-6 px-6">
                <div className="max-w-7xl mx-auto text-xs text-white/40 font-rajdhani">
                    © 2026 APEX R1 Prototype. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
