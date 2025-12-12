'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const commands = [
    { prompt: '$ ', command: 'initializing security scan...', delay: 100 },
    { prompt: '> ', command: 'scanning network vulnerabilities...', delay: 80 },
    { prompt: '> ', command: 'firewall status: ACTIVE ✓', delay: 60, isSuccess: true },
    { prompt: '> ', command: 'encryption: AES-256 enabled', delay: 70, isSuccess: true },
    { prompt: '> ', command: 'checking authentication protocols...', delay: 90 },
    { prompt: '> ', command: 'MFA: enabled ✓', delay: 50, isSuccess: true },
    { prompt: '> ', command: 'intrusion detection: monitoring...', delay: 80 },
    { prompt: '> ', command: 'system integrity: verified', delay: 60, isSuccess: true },
    { prompt: '$ ', command: 'STATUS: ALL SYSTEMS SECURE 🛡️', delay: 100, isHighlight: true },
];

export default function CyberTerminal() {
    const [displayedLines, setDisplayedLines] = useState<Array<{ text: string; isSuccess?: boolean; isHighlight?: boolean }>>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (currentLineIndex >= commands.length) {
            // Reset after a pause
            const resetTimeout = setTimeout(() => {
                setDisplayedLines([]);
                setCurrentLineIndex(0);
                setCurrentCharIndex(0);
                setIsTyping(true);
            }, 3000);
            return () => clearTimeout(resetTimeout);
        }

        const currentCommand = commands[currentLineIndex];
        const fullText = currentCommand.prompt + currentCommand.command;

        if (currentCharIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedLines(prev => {
                    const newLines = [...prev];
                    if (newLines.length <= currentLineIndex) {
                        newLines.push({
                            text: fullText.slice(0, currentCharIndex + 1),
                            isSuccess: currentCommand.isSuccess,
                            isHighlight: currentCommand.isHighlight
                        });
                    } else {
                        newLines[currentLineIndex] = {
                            text: fullText.slice(0, currentCharIndex + 1),
                            isSuccess: currentCommand.isSuccess,
                            isHighlight: currentCommand.isHighlight
                        };
                    }
                    return newLines;
                });
                setCurrentCharIndex(prev => prev + 1);
            }, currentCommand.delay);
            return () => clearTimeout(timeout);
        } else {
            // Move to next line after a short pause
            const nextLineTimeout = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, 500);
            return () => clearTimeout(nextLineTimeout);
        }
    }, [currentLineIndex, currentCharIndex]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-md mx-auto"
        >
            {/* Terminal Window */}
            <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
                {/* Terminal Header */}
                <div className="bg-gray-800/80 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-gray-400 text-sm font-mono ml-3">security@kevin-patil:~</span>
                </div>

                {/* Terminal Content */}
                <div className="p-5 font-mono text-sm min-h-[200px] max-h-[250px] overflow-hidden">
                    {displayedLines.map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`mb-1.5 ${line.isHighlight
                                    ? 'text-green-400 font-bold text-base'
                                    : line.isSuccess
                                        ? 'text-green-400'
                                        : 'text-gray-300'
                                }`}
                        >
                            {line.text}
                        </motion.div>
                    ))}

                    {/* Blinking cursor */}
                    {isTyping && currentLineIndex < commands.length && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-2 h-4 bg-green-400 ml-0.5"
                        />
                    )}
                </div>

                {/* Terminal Footer */}
                <div className="bg-gray-800/50 px-4 py-2 flex items-center justify-between border-t border-gray-700/30">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-green-400 text-xs">SECURE CONNECTION</span>
                    </div>
                    <span className="text-gray-500 text-xs">🔒 TLS 1.3</span>
                </div>
            </div>
        </motion.div>
    );
}
