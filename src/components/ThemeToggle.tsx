'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
    className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={toggleTheme}
            className={`relative w-[140px] h-[60px] rounded-full p-1.5 transition-colors magnetic-element ${isDark ? 'bg-primary' : 'bg-secondary'
                } ${className}`}
            whileTap={{ scale: 0.95 }}
            data-magnetic
        >
            <motion.div
                className={`absolute top-1.5 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg ${isDark ? 'bg-tertiary' : 'bg-white'
                    }`}
                animate={{
                    left: isDark ? 'calc(100% - 56px)' : '6px',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                {isDark ? (
                    <motion.svg
                        initial={{ rotate: -30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </motion.svg>
                ) : (
                    <motion.svg
                        initial={{ rotate: 30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        className="w-6 h-6 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    </motion.svg>
                )}
            </motion.div>

            {/* Labels */}
            <span
                className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold transition-opacity ${isDark ? 'opacity-100 text-white' : 'opacity-0'
                    }`}
            >
                Dark
            </span>
            <span
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold transition-opacity ${isDark ? 'opacity-0' : 'opacity-100 text-primary'
                    }`}
            >
                Light
            </span>
        </motion.button>
    );
}
