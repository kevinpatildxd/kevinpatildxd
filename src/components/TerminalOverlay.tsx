'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Terminal from './Terminal';

interface TerminalControls {
    open: () => void;
    close: () => void;
    isOpen: boolean;
}

const TerminalContext = createContext<TerminalControls>({
    open: () => {},
    close: () => {},
    isOpen: false,
});

export const useTerminal = () => useContext(TerminalContext);

/**
 * The shell is a power mode, not the front door. Most visitors never open it;
 * developers find it via `~`, the header button, or the footer hint.
 */
export default function TerminalOverlay({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
                return;
            }
            if (e.key !== '~' && e.key !== '`') return;
            // Never hijack the key while someone is typing into a real field.
            const el = document.activeElement as HTMLElement | null;
            if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) {
                return;
            }
            e.preventDefault();
            setIsOpen((prev) => !prev);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen]);

    // Stop the page behind from scrolling while the shell is up.
    useEffect(() => {
        if (!isOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, [isOpen]);

    return (
        <TerminalContext.Provider value={{ open, close, isOpen }}>
            {children}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-[90] bg-black/55 backdrop-blur-[2px]"
                        onClick={close}
                    >
                        <motion.div
                            initial={{ y: 24, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 16, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            onClick={(e) => e.stopPropagation()}
                            className="mx-auto flex h-[100dvh] w-full max-w-5xl flex-col p-0 sm:h-[86dvh] sm:p-4 sm:pt-[7dvh]"
                            role="dialog"
                            aria-modal="true"
                            aria-label="devguard terminal"
                        >
                            <div className="flex-1 overflow-hidden border border-term-line shadow-2xl">
                                <Terminal seed={['devguard']} onClose={close} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </TerminalContext.Provider>
    );
}

/** Header button that opens the shell. */
export function TerminalButton({ className }: { className?: string }) {
    const { open } = useTerminal();
    return (
        <button
            onClick={open}
            className={`inline-flex items-center gap-2 border border-line px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent ${className ?? ''}`}
            title="Open the devguard shell (~)"
        >
            <span aria-hidden="true">&gt;_</span>
            <span className="hidden sm:inline">terminal</span>
            <kbd className="hidden border border-line px-1 text-[10px] text-dim sm:inline">~</kbd>
        </button>
    );
}
