'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Dot cursor - fast response
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

        const handleElementEnter = () => setIsHovering(true);
        const handleElementLeave = () => setIsHovering(false);

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleElementEnter);
            el.addEventListener('mouseleave', handleElementLeave);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);

            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleElementEnter);
                el.removeEventListener('mouseleave', handleElementLeave);
            });
        };
    }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

    if (!isVisible) return null;

    return (
        <>
            {/* Center Dot - Simple dot cursor */}
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
                            ? '0 0 15px rgba(131, 140, 229, 0.5)'
                            : '0 0 8px rgba(80, 32, 122, 0.3)',
                    }}
                    animate={{
                        width: isHovering ? 14 : 10,
                        height: isHovering ? 14 : 10,
                    }}
                    transition={{
                        type: 'spring',
                        damping: 30,
                        stiffness: 400,
                    }}
                />
            </motion.div>
        </>
    );
}

