export default function HowItWorks() {
    const intents = [
        "Track dominance",
        "Precision cornering",
        "High-speed stability",
        "Aggressive riding posture",
    ];

    return (
        <section id="built" className="bg-harley-black py-24 relative z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-rajdhani mb-3">Built For</p>
                    <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white leading-tight">
                        Purpose-built aggression
                    </h2>
                    <p className="mt-4 text-white/60 font-rajdhani text-sm md:text-base">
                        No comfort compromises. Every surface answers to speed.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {intents.map((intent) => (
                        <div key={intent} className="border border-white/10 rounded-xl p-6 bg-engine-steel">
                            <div className="text-lg font-orbitron text-white">{intent}</div>
                            <div className="mt-2 h-px w-12 bg-harley-orange" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
