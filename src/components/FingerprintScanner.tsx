'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FingerprintScanner() {
    const [scanPhase, setScanPhase] = useState<'idle' | 'scanning' | 'success'>('idle');
    const [scanProgress, setScanProgress] = useState(0);

    useEffect(() => {
        // Auto-start scanning cycle
        const startScan = () => {
            setScanPhase('scanning');
            setScanProgress(0);
        };

        // Initial delay before first scan
        const initialTimeout = setTimeout(startScan, 1000);

        return () => clearTimeout(initialTimeout);
    }, []);

    useEffect(() => {
        if (scanPhase === 'scanning') {
            if (scanProgress < 100) {
                const progressInterval = setTimeout(() => {
                    setScanProgress(prev => Math.min(prev + 2, 100));
                }, 50);
                return () => clearTimeout(progressInterval);
            } else {
                // Scan complete
                setScanPhase('success');
                const resetTimeout = setTimeout(() => {
                    setScanPhase('idle');
                    setScanProgress(0);
                    // Restart scan after pause
                    setTimeout(() => {
                        setScanPhase('scanning');
                    }, 1500);
                }, 2500);
                return () => clearTimeout(resetTimeout);
            }
        }
    }, [scanPhase, scanProgress]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {/* Fingerprint Container */}
            <div className="relative w-16 h-20 md:w-20 md:h-24">
                {/* Outer Glow */}
                <motion.div
                    className={`absolute inset-0 rounded-2xl blur-xl ${scanPhase === 'success' ? 'bg-green-500/40' : 'bg-tertiary/30'
                        }`}
                    animate={{
                        scale: scanPhase === 'scanning' ? [1, 1.1, 1] : 1,
                        opacity: scanPhase === 'idle' ? 0.3 : 0.6,
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: scanPhase === 'scanning' ? Infinity : 0,
                    }}
                />

                {/* Fingerprint SVG */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <svg
                        viewBox="0 0 64 80"
                        className={`w-12 h-16 md:w-16 md:h-20 transition-colors duration-300 ${scanPhase === 'success' ? 'text-green-500' : 'text-primary/60'
                            }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        {/* Fingerprint pattern */}
                        <motion.path
                            d="M32 10 C20 10 12 20 12 35 C12 50 20 65 32 70"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: scanProgress / 100 }}
                            transition={{ duration: 0.1 }}
                        />
                        <motion.path
                            d="M32 10 C44 10 52 20 52 35 C52 50 44 65 32 70"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: scanProgress / 100 }}
                            transition={{ duration: 0.1 }}
                        />
                        <motion.path
                            d="M32 18 C24 18 18 26 18 38 C18 50 24 60 32 64"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: scanProgress / 100 }}
                            transition={{ duration: 0.1, delay: 0.1 }}
                        />
                        <motion.path
                            d="M32 18 C40 18 46 26 46 38 C46 50 40 60 32 64"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: scanProgress / 100 }}
                            transition={{ duration: 0.1, delay: 0.1 }}
                        />
                        <motion.path
                            d="M32 26 C28 26 24 32 24 40 C24 48 28 56 32 58"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: scanProgress / 100 }}
                            transition={{ duration: 0.1, delay: 0.2 }}
                        />
                        <motion.path
                            d="M32 26 C36 26 40 32 40 40 C40 48 36 56 32 58"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: scanProgress / 100 }}
                            transition={{ duration: 0.1, delay: 0.2 }}
                        />
                        <motion.path
                            d="M32 34 C30 34 28 37 28 42 C28 47 30 50 32 52"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: scanProgress / 100 }}
                            transition={{ duration: 0.1, delay: 0.3 }}
                        />
                        <motion.path
                            d="M32 34 C34 34 36 37 36 42 C36 47 34 50 32 52"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: scanProgress / 100 }}
                            transition={{ duration: 0.1, delay: 0.3 }}
                        />
                    </svg>

                    {/* Scan Line */}
                    {scanPhase === 'scanning' && (
                        <motion.div
                            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-tertiary to-transparent"
                            initial={{ top: '0%' }}
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Status Text */}
            <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {scanPhase === 'idle' && (
                    <p className="text-xs text-primary/50">Touch to verify</p>
                )}
                {scanPhase === 'scanning' && (
                    <p className="text-xs text-tertiary font-medium">Scanning...</p>
                )}
                {scanPhase === 'success' && (
                    <motion.p
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-xs text-green-500 font-bold"
                    >
                        ✓ Verified
                    </motion.p>
                )}
            </motion.div>

            {/* Progress Bar */}
            <div className="w-16 h-1 bg-secondary rounded-full mt-2 overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${scanPhase === 'success'
                        ? 'bg-green-500'
                        : 'bg-gradient-to-r from-primary to-tertiary'
                        }`}
                    initial={{ width: '0%' }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>
        </div>
    );
}
