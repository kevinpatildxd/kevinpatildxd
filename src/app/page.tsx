import Link from 'next/link';
import Image from 'next/image';
import { profile, projects, publication, certifications } from '@/data/profile';
import Section from '@/components/Section';
import GitActivity from '@/components/GitActivity';

/**
 * Shaped like a devguard report - the CLI Kevin publishes - but rendered
 * entirely as a document. Nothing to type, nothing to discover: a recruiter
 * can read it top to bottom in under a minute.
 */
const checks = [
    {
        name: 'Identity',
        status: 'pass' as const,
        value: 'Co-Founder & CDO, Nudge Systems',
        detail: 'Software studio in Surat building web, mobile and e-commerce products.',
        href: profile.contact.company,
        hrefLabel: 'nudgesystems.in',
    },
    {
        name: 'Ship record',
        status: 'pass' as const,
        value: `${projects.length} projects · 8 npm releases`,
        detail: 'A published CLI, a Stripe-integrated platform, a deployed client tool, a dApp.',
        internal: '/projects',
        hrefLabel: 'See the work',
    },
    {
        name: 'Peer review',
        status: 'pass' as const,
        value: publication.details,
        detail: `“${publication.title}” — ${publication.venue}.`,
        href: publication.href,
        hrefLabel: 'Read the paper',
    },
    {
        name: 'Credentials',
        status: 'pass' as const,
        value: `${certifications.length} job simulations`,
        detail: 'Cybersecurity simulations with Mastercard and Deloitte via Forage.',
        internal: '/certificates',
        hrefLabel: 'View credentials',
    },
    {
        name: 'Availability',
        status: 'open' as const,
        value: 'Accepting work',
        detail: 'Open to full-time roles, contract work and collaborations.',
        internal: '/about',
        hrefLabel: 'Get in touch',
    },
];

const stats = [
    { value: String(projects.length), label: 'Projects shipped' },
    { value: '8', label: 'npm releases' },
    { value: '1', label: 'Published paper' },
    { value: profile.education.gpa, label: 'GPA' },
];

export default function HomePage() {
    return (
        <>
            {/* ── Hero ─────────────────────────────────────────── */}
            <section className="border-b border-line">
                <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
                    <div className="flex flex-col-reverse gap-10 sm:flex-row sm:items-start sm:justify-between">
                        <div className="max-w-2xl">
                            <p className="label mb-4">{profile.role}</p>
                            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                                Kevin Patil
                            </h1>
                            <p className="mt-5 text-lg text-muted">{profile.bio}</p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link href="/projects" className="btn-primary text-sm">
                                    View the work
                                </Link>
                                <a
                                    href="/kevinpatildxd/kevin_resume.pdf"
                                    download="Kevin_Patil_Resume.pdf"
                                    className="btn-ghost text-sm"
                                >
                                    Download CV ↓
                                </a>
                            </div>

                            <p className="mt-6 flex items-center gap-2 font-mono text-xs text-dim">
                                <span className="h-1.5 w-1.5 bg-ok" aria-hidden="true" />
                                Available for work · {profile.contact.location}
                            </p>
                        </div>

                        <div className="shrink-0">
                            <div className="relative h-28 w-28 overflow-hidden border border-line sm:h-36 sm:w-36">
                                <Image
                                    src="/kevinpatildxd/images/profile.png"
                                    alt=""
                                    fill
                                    sizes="144px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Numbers ──────────────────────────────────────── */}
            <section className="border-b border-line bg-surface">
                <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y divide-line sm:grid-cols-4 sm:divide-y-0">
                    {stats.map((stat) => (
                        <div key={stat.label} className="px-5 py-6 sm:px-8">
                            <p className="stat text-accent">{stat.value}</p>
                            <p className="label mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── The report ───────────────────────────────────── */}
            <Section number="01" title="Summary" className="mx-auto max-w-5xl px-5 sm:px-8">
                <p className="mb-8 max-w-2xl text-sm text-muted">
                    A quick verification of who I am and what I have actually shipped — every line
                    links to the evidence.
                </p>

                <div className="border-t border-line">
                    {checks.map((check) => (
                        <div key={check.name} className="finding">
                            <div className="flex shrink-0 items-center gap-3 sm:w-52">
                                <span
                                    className={`chip ${check.status === 'pass' ? 'chip-pass' : 'chip-open'}`}
                                >
                                    {check.status === 'pass' ? '✓ Pass' : '● Open'}
                                </span>
                                <span className="text-sm font-medium">{check.name}</span>
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="font-mono text-sm text-text">{check.value}</p>
                                <p className="mt-1 text-sm text-muted">{check.detail}</p>
                            </div>

                            <div className="shrink-0">
                                {check.internal ? (
                                    <Link href={check.internal} className="link-accent text-sm">
                                        {check.hrefLabel} →
                                    </Link>
                                ) : (
                                    <a
                                        href={check.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-accent text-sm"
                                    >
                                        {check.hrefLabel} ↗
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── devguard ─────────────────────────────────────── */}
            <Section number="02" title="Open source" className="mx-auto max-w-5xl px-5 sm:px-8">
                <div className="panel p-6 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-semibold">@kevinpatil/devguard</h3>
                            <p className="mt-1 font-mono text-xs text-dim">v3.4.1 · 8 releases</p>
                        </div>
                        <span className="chip chip-neutral">Node.js CLI</span>
                    </div>

                    <p className="mt-5 max-w-2xl text-sm text-muted">
                        A zero-config command that guards a JavaScript or TypeScript project before
                        it ships — validating environment files, auditing dependencies for known
                        vulnerabilities, and analysing React code quality in a single pass.
                    </p>

                    <div className="mt-6 overflow-x-auto border border-line bg-elevated p-4">
                        <code className="whitespace-nowrap font-mono text-xs text-muted">
                            <span className="text-accent">$</span> npm i -g @kevinpatil/devguard
                        </code>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a
                            href={profile.contact.npm}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost text-sm"
                        >
                            View on npm ↗
                        </a>
                        <a
                            href="https://github.com/kevinpatildxd/devguard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost text-sm"
                        >
                            Source ↗
                        </a>
                    </div>
                </div>
            </Section>

            {/* ── Research ─────────────────────────────────────── */}
            <Section number="03" title="Research" className="mx-auto max-w-5xl px-5 sm:px-8">
                <article className="panel p-6 sm:p-8">
                    <p className="label mb-3">
                        {publication.venue} · {publication.details}
                    </p>
                    <h3 className="text-xl font-semibold sm:text-2xl">{publication.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm text-muted">{publication.summary}</p>

                    <dl className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                        {[
                            ['30', 'Papers reviewed'],
                            ['235,795', 'URLs analysed'],
                            ['99.96%', 'XGBoost accuracy'],
                            ['9', 'Leaky features found'],
                        ].map(([value, label]) => (
                            <div key={label} className="bg-surface px-4 py-4">
                                <dt className="font-mono text-lg font-semibold tabular-nums">
                                    {value}
                                </dt>
                                <dd className="label mt-0.5">{label}</dd>
                            </div>
                        ))}
                    </dl>

                    <a
                        href={publication.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mt-6 text-sm"
                    >
                        Read the paper ↗
                    </a>
                </article>
            </Section>

            {/* ── Selected work ────────────────────────────────── */}
            <Section
                number="04"
                title="Selected work"
                action={{ href: '/projects', label: `All ${projects.length} projects` }}
                className="mx-auto max-w-5xl px-5 sm:px-8"
            >
                <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
                    {projects.slice(0, 4).map((project) => (
                        <Link
                            key={project.name}
                            href="/projects"
                            className="group bg-surface p-6 transition-colors hover:bg-elevated"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <h3 className="font-semibold group-hover:text-accent">
                                    {project.name}
                                </h3>
                                <span className="chip chip-neutral">{project.status}</span>
                            </div>
                            <p className="mt-2 text-sm text-accent">{project.outcome}</p>
                            <p className="mt-3 font-mono text-xs text-dim">
                                {project.tags.slice(0, 4).join(' · ')}
                            </p>
                        </Link>
                    ))}
                </div>
            </Section>

            {/* ── Live activity ────────────────────────────────── */}
            <Section number="05" title="Activity" className="mx-auto max-w-5xl px-5 sm:px-8">
                <GitActivity />
            </Section>
        </>
    );
}
