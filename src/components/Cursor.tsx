'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// Clickable elements that trigger hover effect
const CLICKABLES = [
    'a',
    'button',
    'input',
    'textarea',
    'select',
    '[data-magnetic]',
    '.magnetic-element',
    '.nav-pill',
    '.link',
    '.bento-card',
];

interface CursorState {
    isHovering: boolean;
    isVisible: boolean;
    isClicking: boolean;
}

export default function Cursor() {
    const [state, setState] = useState<CursorState>({
        isHovering: false,
        isVisible: true,
        isClicking: false,
    });

    // Raw mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Cursor spring - smooth, responsive follow
    const springConfig = { damping: 30, stiffness: 400, mass: 0.2 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        if (!state.isVisible) {
            setState(prev => ({ ...prev, isVisible: true }));
        }
    }, [mouseX, mouseY, state.isVisible]);

    const handleMouseDown = useCallback(() => {
        setState(prev => ({ ...prev, isClicking: true }));
    }, []);

    const handleMouseUp = useCallback(() => {
        setState(prev => ({ ...prev, isClicking: false }));
    }, []);

    const handleMouseLeave = useCallback(() => {
        setState(prev => ({ ...prev, isVisible: false }));
    }, []);

    const handleMouseEnter = useCallback(() => {
        setState(prev => ({ ...prev, isVisible: true }));
    }, []);

    useEffect(() => {
        // Mouse event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        // Setup clickable element detection
        const addHoverListeners = () => {
            const selector = CLICKABLES.join(', ');
            const clickableElements = document.querySelectorAll(selector);

            const handleElementEnter = () => {
                setState(prev => ({ ...prev, isHovering: true }));
            };

            const handleElementLeave = () => {
                setState(prev => ({ ...prev, isHovering: false }));
            };

            clickableElements.forEach((el) => {
                el.addEventListener('mouseenter', handleElementEnter);
                el.addEventListener('mouseleave', handleElementLeave);
            });

            return () => {
                clickableElements.forEach((el) => {
                    el.removeEventListener('mouseenter', handleElementEnter);
                    el.removeEventListener('mouseleave', handleElementLeave);
                });
            };
        };

        // Initial setup
        const cleanup = addHoverListeners();

        // Re-attach listeners when DOM changes (for dynamic content)
        const observer = new MutationObserver(() => {
            cleanup();
            addHoverListeners();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            cleanup();
            observer.disconnect();
        };
    }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

    const { isHovering, isVisible, isClicking } = state;

    return (
        <AnimatePresence>
            {isVisible && (
                <div
                    className="fixed inset-0 pointer-events-none z-[9999]"
                    style={{ mixBlendMode: 'difference' }}
                >
                    {/* Single Dot Cursor */}
                    <motion.div
                        className="fixed top-0 left-0"
                        style={{
                            x: cursorX,
                            y: cursorY,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    >
                        <motion.div
                            className="rounded-full bg-white"
                            animate={{
                                width: isHovering ? 40 : isClicking ? 6 : 10,
                                height: isHovering ? 40 : isClicking ? 6 : 10,
                                opacity: 1,
                                scale: isClicking ? 0.8 : 1,
                            }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 400,
                            }}
                        />
                    </motion.div>

                    {/* Click ripple effect */}
                    <AnimatePresence>
                        {isClicking && (
                            <motion.div
                                className="fixed top-0 left-0"
                                style={{
                                    x: cursorX,
                                    y: cursorY,
                                    translateX: '-50%',
                                    translateY: '-50%',
                                }}
                                initial={{ opacity: 0.5, scale: 1 }}
                                animate={{ opacity: 0, scale: 3 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            >
                                <div className="w-10 h-10 rounded-full border border-white/50" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </AnimatePresence>
    );
}
