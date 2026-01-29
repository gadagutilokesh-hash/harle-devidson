"use client";

export default function Features() {
    const highlights = [
        { title: "Aerodynamic Winglets", detail: "Downforce at speed" },
        { title: "Track-Tuned Suspension", detail: "Precision damping" },
        { title: "Race-Grade Braking", detail: "Carbon-ceramic bite" },
        { title: "Lightweight Chassis", detail: "Rigid, ultra-light" },
    ];

    return (
        <section id="performance" className="bg-engine-steel py-24 relative z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-rajdhani mb-3">Performance</p>
                    <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white leading-tight">
                        Performance highlights
                    </h2>
                    <p className="mt-4 text-white/60 font-rajdhani text-sm md:text-base">
                        Minimal text. Maximum intent.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item) => (
                        <div key={item.title} className="border border-white/10 bg-harley-black/40 p-6 rounded-xl hover:border-white/20 transition-colors">
                            <h3 className="text-lg font-orbitron text-white">{item.title}</h3>
                            <p className="mt-2 text-sm font-rajdhani text-white/60 uppercase tracking-[0.2em]">
                                {item.detail}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
