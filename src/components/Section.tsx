import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Numbered section heading — the spine of the report layout.
 * `01 / SUMMARY ───────────────────────────`
 */
export default function Section({
    number,
    title,
    action,
    children,
    className,
}: {
    number: string;
    title: string;
    action?: { href: string; label: string };
    children: ReactNode;
    className?: string;
}) {
    return (
        <section className={`py-14 sm:py-16 ${className ?? ''}`}>
            <div className="section-rule mb-8">
                <span className="font-mono text-xs text-accent">{number}</span>
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">{title}</h2>
                <span className="flex-1" />
                {action && (
                    <Link href={action.href} className="link-accent shrink-0 text-sm">
                        {action.label} →
                    </Link>
                )}
            </div>
            {children}
        </section>
    );
}
