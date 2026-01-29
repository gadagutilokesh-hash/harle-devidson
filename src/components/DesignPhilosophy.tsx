export default function DesignPhilosophy() {
    const principles = [
        "Motorsport DNA",
        "Functional aerodynamics",
        "Sharp, intentional geometry",
        "Minimalist aggression",
    ];

    return (
        <section id="design" className="bg-harley-black py-24 relative z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-rajdhani mb-3">Design Philosophy</p>
                    <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white leading-tight">
                        Form follows speed
                    </h2>
                    <p className="mt-4 text-white/60 font-rajdhani text-sm md:text-base">
                        Every surface is engineered to manage airflow, stability, and intent.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 border border-white/10 rounded-xl overflow-hidden bg-engine-steel">
                        <img
                            src="/images/design/image1.jpg"
                            alt="Side profile visual"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="border border-white/10 rounded-xl p-6 bg-harley-black/40">
                        <div className="text-xs uppercase tracking-[0.3em] text-white/40 font-rajdhani">Principles</div>
                        <ul className="mt-4 space-y-3 text-sm font-rajdhani text-white/70">
                            {principles.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-harley-orange" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 h-px w-full bg-white/10" />
                        <div className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50">
                            Prototype-grade finish
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-engine-steel">
                        <img
                            src="/images/design/image2.jpg"
                            alt="Isometric angle visual"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-engine-steel">
                        <img
                            src="/images/design/image3.jpg"
                            alt="Engineering detail visual"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-engine-steel">
                        <img
                            src="/images/design/image4.jpg"
                            alt="Design detail visual"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
