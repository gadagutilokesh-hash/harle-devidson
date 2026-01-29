"use client";

import { useEffect, useRef, useCallback } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    life: number;
    maxLife: number;
}

interface ParticleEffectsProps {
    scrollYProgress: MotionValue<number>;
    particleCount?: number;
}

export default function ParticleEffects({
    scrollYProgress,
    particleCount = 50
}: ParticleEffectsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);
    const scrollVelocityRef = useRef<number>(0);
    const lastScrollRef = useRef<number>(0);
    const lastFrameTime = useRef<number>(0);

    // Create a new particle
    const createParticle = useCallback((width: number, height: number, burst: boolean = false): Particle => {
        const baseSpeed = burst ? 1.5 : 0.2;
        return {
            x: Math.random() * width,
            y: burst ? height * 0.6 + Math.random() * height * 0.4 : Math.random() * height,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * baseSpeed,
            speedY: burst ? -Math.random() * 1.5 - 0.5 : (Math.random() - 0.5) * 0.15,
            opacity: Math.random() * 0.2 + 0.05,
            life: 0,
            maxLife: burst ? 80 + Math.random() * 80 : 400 + Math.random() * 200,
        };
    }, []);

    // Initialize particles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            // Initialize particles
            particlesRef.current = Array.from({ length: particleCount }, () =>
                createParticle(canvas.width, canvas.height)
            );
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [particleCount, createParticle]);

    // Track scroll velocity for particle bursts
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const delta = Math.abs(latest - lastScrollRef.current);
        scrollVelocityRef.current = delta * 100; // Amplify for effect
        lastScrollRef.current = latest;

        // Add burst particles when scrolling fast
        if (scrollVelocityRef.current > 0.5 && canvasRef.current) {
            const burstCount = Math.min(5, Math.floor(scrollVelocityRef.current * 3));
            for (let i = 0; i < burstCount; i++) {
                particlesRef.current.push(
                    createParticle(canvasRef.current.width, canvasRef.current.height, true)
                );
            }
        }
    });

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const animate = () => {
            const dpr = window.devicePixelRatio || 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particlesRef.current = particlesRef.current.filter((particle) => {
                // Update position
                particle.x += particle.speedX + scrollVelocityRef.current * 0.5;
                particle.y += particle.speedY - scrollVelocityRef.current * 0.3;
                particle.life++;

                // Calculate fade based on life
                const lifeFraction = particle.life / particle.maxLife;
                let alpha = particle.opacity;

                // Fade in first 20%, fade out last 30%
                if (lifeFraction < 0.2) {
                    alpha *= lifeFraction / 0.2;
                } else if (lifeFraction > 0.7) {
                    alpha *= (1 - lifeFraction) / 0.3;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size * dpr,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();

                // Keep particle if still alive and on screen
                const isAlive = particle.life < particle.maxLife;
                const isOnScreen =
                    particle.x > -50 &&
                    particle.x < canvas.width + 50 &&
                    particle.y > -50 &&
                    particle.y < canvas.height + 50;

                // Respawn if died naturally (not burst particles)
                if (!isAlive && particle.maxLife > 200) {
                    Object.assign(particle, createParticle(canvas.width, canvas.height));
                    return true;
                }

                return isAlive && isOnScreen;
            });

            // Maintain minimum particle count
            while (particlesRef.current.length < particleCount && canvas) {
                particlesRef.current.push(createParticle(canvas.width, canvas.height));
            }

            // Decay scroll velocity
            scrollVelocityRef.current *= 0.95;

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [particleCount, createParticle]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-10"
            style={{ mixBlendMode: "screen" }}
            aria-hidden="true"
        />
    );
}
