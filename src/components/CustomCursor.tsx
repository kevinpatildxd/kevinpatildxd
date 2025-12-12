'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isOnCard, setIsOnCard] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spotlight - smooth, slightly delayed follow
    const spotlightConfig = { damping: 30, stiffness: 200, mass: 0.8 };
    const spotlightX = useSpring(cursorX, spotlightConfig);
    const spotlightY = useSpring(cursorY, spotlightConfig);

    // Center dot - fast response
    const dotConfig = { damping: 25, stiffness: 400, mass: 0.3 };
    const dotX = useSpring(cursorX, dotConfig);
    const dotY = useSpring(cursorY, dotConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        setIsVisible(true);
    }, [cursorX, cursorY]);

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        // Interactive elements (buttons, links)
        const interactiveElements = document.querySelectorAll(
            'a, button, [data-magnetic], .magnetic-element, input, textarea'
        );

        // Card elements for spotlight effect
        const cardElements = document.querySelectorAll('.bento-card, [data-spotlight]');

        const handleElementEnter = () => setIsHovering(true);
        const handleElementLeave = () => setIsHovering(false);

        const handleCardEnter = () => setIsOnCard(true);
        const handleCardLeave = () => setIsOnCard(false);

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleElementEnter);
            el.addEventListener('mouseleave', handleElementLeave);
        });

        cardElements.forEach((el) => {
            el.addEventListener('mouseenter', handleCardEnter);
            el.addEventListener('mouseleave', handleCardLeave);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);

            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleElementEnter);
                el.removeEventListener('mouseleave', handleElementLeave);
            });

            cardElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleCardEnter);
                el.removeEventListener('mouseleave', handleCardLeave);
            });
        };
    }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

    if (!isVisible) return null;

    return (
        <>
            {/* Main Spotlight - Large fuzzy glow */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9995]"
                style={{
                    x: spotlightX,
                    y: spotlightY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="rounded-full"
                    style={{
                        background: `radial-gradient(circle, 
              rgba(131, 140, 229, ${isOnCard ? 0.15 : 0.08}) 0%, 
              rgba(80, 32, 122, ${isOnCard ? 0.1 : 0.05}) 30%, 
              rgba(214, 185, 252, ${isOnCard ? 0.05 : 0.02}) 50%, 
              transparent 70%
            )`,
                        filter: 'blur(2px)',
                    }}
                    animate={{
                        width: isOnCard ? 450 : 350,
                        height: isOnCard ? 450 : 350,
                        opacity: isOnCard ? 1 : 0.8,
                    }}
                    transition={{
                        type: 'spring',
                        damping: 25,
                        stiffness: 150,
                    }}
                />
            </motion.div>

            {/* Secondary Spotlight Ring - Soft border */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9996]"
                style={{
                    x: spotlightX,
                    y: spotlightY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="rounded-full"
                    style={{
                        background: `radial-gradient(circle, 
              transparent 60%, 
              rgba(131, 140, 229, 0.03) 70%, 
              rgba(80, 32, 122, 0.02) 85%, 
              transparent 100%
            )`,
                    }}
                    animate={{
                        width: isOnCard ? 500 : 400,
                        height: isOnCard ? 500 : 400,
                    }}
                    transition={{
                        type: 'spring',
                        damping: 30,
                        stiffness: 120,
                    }}
                />
            </motion.div>

            {/* Inner Glow - Brighter center */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9997]"
                style={{
                    x: spotlightX,
                    y: spotlightY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="rounded-full"
                    style={{
                        background: `radial-gradient(circle, 
              rgba(255, 255, 255, ${isOnCard ? 0.12 : 0.06}) 0%, 
              rgba(214, 185, 252, ${isOnCard ? 0.08 : 0.04}) 20%, 
              transparent 50%
            )`,
                        filter: 'blur(1px)',
                    }}
                    animate={{
                        width: isOnCard ? 200 : 150,
                        height: isOnCard ? 200 : 150,
                    }}
                    transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 180,
                    }}
                />
            </motion.div>

            {/* Focus Ring - Appears on interactive elements */}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[9998]"
                        style={{
                            x: dotX,
                            y: dotY,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <motion.div
                            className="rounded-full border-2"
                            style={{
                                borderColor: 'rgba(131, 140, 229, 0.6)',
                                boxShadow: '0 0 20px rgba(131, 140, 229, 0.3)',
                            }}
                            animate={{
                                width: 50,
                                height: 50,
                            }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 300,
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Center Dot - Precise pointer */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="rounded-full"
                    style={{
                        background: isHovering
                            ? 'linear-gradient(135deg, #838CE5 0%, #50207A 100%)'
                            : 'rgba(80, 32, 122, 0.9)',
                        boxShadow: isHovering
                            ? '0 0 20px rgba(131, 140, 229, 0.6), 0 0 40px rgba(80, 32, 122, 0.3)'
                            : '0 0 10px rgba(80, 32, 122, 0.4)',
                    }}
                    animate={{
                        width: isHovering ? 12 : 8,
                        height: isHovering ? 12 : 8,
                    }}
                    transition={{
                        type: 'spring',
                        damping: 30,
                        stiffness: 400,
                    }}
                />
            </motion.div>

            {/* Pulse effect when hovering cards */}
            <AnimatePresence>
                {isOnCard && (
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[9994]"
                        style={{
                            x: spotlightX,
                            y: spotlightY,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="rounded-full"
                            style={{
                                border: '1px solid rgba(131, 140, 229, 0.2)',
                            }}
                            animate={{
                                width: [200, 350],
                                height: [200, 350],
                                opacity: [0.4, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeOut',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
