'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => { },
    setTheme: () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

/**
 * The inline script in `layout.tsx` has already put the correct class on
 * <html> before this ever runs, so we read the theme back off the DOM rather
 * than re-deriving it. That keeps the first render correct and avoids the
 * cascading re-render of setting state inside an effect.
 */
function readInitialTheme(): Theme {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(readInitialTheme);

    // Sync the choice out to the DOM and localStorage - both external systems.
    useEffect(() => {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
        try {
            localStorage.setItem('theme', theme);
        } catch {
            // Private mode / blocked storage - the class is still applied.
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
