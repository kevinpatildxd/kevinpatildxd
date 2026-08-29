'use client';

import { profile } from '@/data/profile';
import { useTerminal } from './TerminalOverlay';

const links = [
    { label: 'GitHub', href: profile.contact.github },
    { label: 'LinkedIn', href: profile.contact.linkedin },
    { label: 'npm', href: profile.contact.npm },
    { label: 'Nudge Systems', href: profile.contact.company },
];

export default function SiteFooter() {
    const { open } = useTerminal();

    return (
        <footer className="mt-20 border-t border-line bg-surface">
            <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
                <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
                    <div>
                        <p className="label mb-2">Get in touch</p>
                        <a
                            href={`mailto:${profile.contact.email}`}
                            className="block text-lg font-medium hover:text-accent"
                        >
                            {profile.contact.email}
                        </a>
                        <a
                            href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}
                            className="mt-1 block font-mono text-sm text-muted hover:text-accent"
                        >
                            {profile.contact.phone}
                        </a>
                    </div>

                    <nav aria-label="Elsewhere">
                        <p className="label mb-2">Elsewhere</p>
                        <ul className="space-y-1">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted hover:text-accent"
                                    >
                                        {link.label} ↗
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-xs text-dim">
                        © {new Date().getFullYear()} Kevin Purushottam Patil · {profile.contact.location}
                    </p>
                    {/* The shell is discoverable, never in the way. */}
                    <button onClick={open} className="text-left font-mono text-xs text-dim hover:text-accent">
                        Prefer a command line? Press{' '}
                        <kbd className="border border-line px-1">~</kbd> to open the devguard shell.
                    </button>
                </div>
            </div>
        </footer>
    );
}
