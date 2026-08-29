'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { TerminalButton } from './TerminalOverlay';

const nav = [
    { name: 'Work', href: '/projects' },
    { name: 'Research', href: '/certificates' },
    { name: 'Skills', href: '/skills' },
    { name: 'Résumé', href: '/resume' },
    { name: 'About', href: '/about' },
];

export default function SiteHeader() {
    const pathname = usePathname();
    const { toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    // Derived from the path rather than pushed from an effect.
    const [seenPath, setSeenPath] = useState(pathname);
    if (seenPath !== pathname) {
        setSeenPath(pathname);
        if (menuOpen) setMenuOpen(false);
    }

    return (
        <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
                <Link href="/" className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center bg-accent font-mono text-xs font-bold text-white">
                        KP
                    </span>
                    <span className="text-sm font-semibold">Kevin Patil</span>
                </Link>

                <nav className="hidden md:block" aria-label="Main">
                    <ul className="flex items-center gap-1">
                        {nav.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={active ? 'page' : undefined}
                                        className={`px-3 py-2 text-sm transition-colors ${
                                            active ? 'text-accent' : 'text-muted hover:text-text'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
                    <TerminalButton />
                    <button
                        onClick={toggleTheme}
                        className="flex h-8 w-8 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                        aria-label="Toggle colour theme"
                    >
                        <svg className="hidden h-4 w-4 dark:block" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.4 6.4l-.7-.7M6.3 6.3l-.7-.7m12.8 0l-.7.7M6.3 17.7l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <svg className="block h-4 w-4 dark:hidden" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.4 15.4A9 9 0 018.6 3.6 9 9 0 1020.4 15.4z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex h-8 w-8 items-center justify-center border border-line text-muted md:hidden"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                            {menuOpen ? (
                                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <nav className="border-t border-line bg-surface md:hidden" aria-label="Mobile">
                    <ul>
                        {nav.map((item) => (
                            <li key={item.href} className="border-b border-line last:border-0">
                                <Link
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`block px-5 py-3 text-sm ${
                                        pathname === item.href ? 'text-accent' : 'text-muted'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}
