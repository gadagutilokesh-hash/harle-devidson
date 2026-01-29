export default function SpecsGrid() {
    const specs = [
        { label: "Model", value: "APEX R1" },
        { label: "Category", value: "Track-Focused Superbike" },
        { label: "Engine", value: "998cc Inline‑4" },
        { label: "Power", value: "205 HP" },
        { label: "Torque", value: "125 Nm" },
        { label: "Weight", value: "172 kg (dry)" },
    ];

    return (
        <section id="overview" className="bg-harley-black py-24 relative z-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-rajdhani mb-3">Machine Overview</p>
                    <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white leading-tight">
                        Apex R1
                    </h2>
                    <p className="mt-4 text-white/60 font-rajdhani text-sm md:text-base">
                        Built around power density, stability, and ruthless control.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specs.map((spec) => (
                        <div key={spec.label} className="border border-white/10 rounded-xl p-6 bg-harley-black/40">
                            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{spec.label}</div>
                            <div className="mt-3 text-xl font-orbitron text-white">{spec.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
