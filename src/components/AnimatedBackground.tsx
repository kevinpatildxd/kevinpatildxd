'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface FloatingShape {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    darkColor: string;
    blur: number;
    parallaxFactor: number;
    rotation: number;
    shape: 'circle' | 'square' | 'blob';
}

const shapes: FloatingShape[] = [
    // Large background blobs - more subtle in light mode
    { id: 1, x: 15, y: 20, size: 400, color: 'rgba(214, 185, 252, 0.2)', darkColor: 'rgba(80, 32, 122, 0.3)', blur: 80, parallaxFactor: 0.02, rotation: 0, shape: 'circle' },
    { id: 2, x: 85, y: 15, size: 350, color: 'rgba(131, 140, 229, 0.15)', darkColor: 'rgba(131, 140, 229, 0.25)', blur: 70, parallaxFactor: 0.025, rotation: 0, shape: 'circle' },
    { id: 3, x: 75, y: 75, size: 450, color: 'rgba(80, 32, 122, 0.08)', darkColor: 'rgba(80, 32, 122, 0.2)', blur: 90, parallaxFactor: 0.015, rotation: 0, shape: 'circle' },
    { id: 4, x: 25, y: 80, size: 300, color: 'rgba(214, 185, 252, 0.18)', darkColor: 'rgba(214, 185, 252, 0.25)', blur: 60, parallaxFactor: 0.03, rotation: 0, shape: 'circle' },

    // Medium floating shapes - subtle
    { id: 5, x: 50, y: 30, size: 200, color: 'rgba(131, 140, 229, 0.12)', darkColor: 'rgba(131, 140, 229, 0.2)', blur: 40, parallaxFactor: 0.04, rotation: 45, shape: 'square' },
    { id: 6, x: 30, y: 50, size: 180, color: 'rgba(214, 185, 252, 0.15)', darkColor: 'rgba(214, 185, 252, 0.22)', blur: 35, parallaxFactor: 0.045, rotation: 30, shape: 'blob' },
    { id: 7, x: 70, y: 45, size: 220, color: 'rgba(80, 32, 122, 0.06)', darkColor: 'rgba(80, 32, 122, 0.15)', blur: 50, parallaxFactor: 0.035, rotation: -20, shape: 'circle' },

    // Smaller accent shapes - gentle
    { id: 8, x: 20, y: 35, size: 100, color: 'rgba(131, 140, 229, 0.18)', darkColor: 'rgba(131, 140, 229, 0.3)', blur: 20, parallaxFactor: 0.06, rotation: 15, shape: 'circle' },
    { id: 9, x: 80, y: 55, size: 120, color: 'rgba(214, 185, 252, 0.15)', darkColor: 'rgba(214, 185, 252, 0.25)', blur: 25, parallaxFactor: 0.055, rotation: -30, shape: 'square' },
    { id: 10, x: 45, y: 70, size: 90, color: 'rgba(80, 32, 122, 0.1)', darkColor: 'rgba(80, 32, 122, 0.2)', blur: 15, parallaxFactor: 0.07, rotation: 60, shape: 'blob' },
    { id: 11, x: 60, y: 20, size: 80, color: 'rgba(131, 140, 229, 0.15)', darkColor: 'rgba(131, 140, 229, 0.25)', blur: 18, parallaxFactor: 0.065, rotation: -45, shape: 'circle' },
    { id: 12, x: 10, y: 60, size: 110, color: 'rgba(214, 185, 252, 0.12)', darkColor: 'rgba(214, 185, 252, 0.22)', blur: 22, parallaxFactor: 0.058, rotation: 25, shape: 'circle' },
];

export default function AnimatedBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isDark, setIsDark] = useState(false);

    // Smooth spring for mouse movement
    const springConfig = { damping: 50, stiffness: 100, mass: 1 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        // Normalize mouse position to -1 to 1
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        mouseX.set(x);
        mouseY.set(y);
    }, [mouseX, mouseY]);

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('mousemove', handleMouseMove);

        // Check for dark mode
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkDarkMode();

        // Observe class changes on html element
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, [handleMouseMove]);

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/5 dark:from-dark-background dark:via-dark-background dark:to-primary/5" />

            {/* Floating shapes that respond to cursor */}
            {shapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    className="absolute"
                    style={{
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        x: smoothMouseX.get() * shape.parallaxFactor * windowSize.width,
                        y: smoothMouseY.get() * shape.parallaxFactor * windowSize.height,
                    }}
                    animate={{
                        x: [0, 0],
                        y: [0, 0],
                    }}
                >
                    <motion.div
                        style={{
                            width: shape.size,
                            height: shape.size,
                            background: isDark ? shape.darkColor : shape.color,
                            filter: `blur(${shape.blur}px)`,
                            transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
                            borderRadius: shape.shape === 'circle'
                                ? '50%'
                                : shape.shape === 'square'
                                    ? '20%'
                                    : '60% 40% 30% 70% / 60% 30% 70% 40%',
                        }}
                        animate={{
                            x: smoothMouseX.get() * shape.parallaxFactor * 100,
                            y: smoothMouseY.get() * shape.parallaxFactor * 100,
                            scale: [1, 1.03, 1],
                            rotate: [shape.rotation, shape.rotation + 3, shape.rotation],
                        }}
                        transition={{
                            x: { type: 'spring', damping: 50, stiffness: 100 },
                            y: { type: 'spring', damping: 50, stiffness: 100 },
                            scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
                            rotate: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
                        }}
                    />
                </motion.div>
            ))}

            {/* Subtle grid pattern overlay - even more subtle */}
            <div
                className="absolute inset-0 opacity-[0.008] dark:opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(80, 32, 122, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(80, 32, 122, 0.5) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />
        </div>
    );
}
