'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    // Initialize theme from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }
    }, []);

    // Update localStorage and document class when theme changes
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('theme', theme);
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // Prevent flash of wrong theme
    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
