"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import HarleyScrollCanvas from "@/components/HarleyScrollCanvas";
import HarleyExperience from "@/components/HarleyExperience";
import Navbar from "@/components/Navbar";
import SpecsGrid from "@/components/SpecsGrid";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import DesignPhilosophy from "@/components/DesignPhilosophy";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001
  });

  return (
    <main className="bg-harley-black min-h-screen selection:bg-harley-orange selection:text-white">
      <Navbar />

      <section ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HarleyScrollCanvas scrollYProgress={smoothProgress} />
          <HarleyExperience scrollYProgress={smoothProgress} />
        </div>
      </section>

      <div className="relative z-20 bg-harley-black border-t border-white/5">
        <SpecsGrid />
        <Features />
        <HowItWorks />
        <DesignPhilosophy />
        <Footer />
      </div>
    </main>
  );
}
