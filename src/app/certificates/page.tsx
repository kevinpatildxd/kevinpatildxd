import { certifications, publication } from '@/data/profile';

const metrics = [
    { value: '30', label: 'Papers reviewed' },
    { value: '235,795', label: 'URLs analysed' },
    { value: '99.96%', label: 'XGBoost accuracy' },
    { value: '9', label: 'Leaky features found' },
];

export default function ResearchPage() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
            <header className="border-b border-line pb-8">
                <p className="label mb-3">Credentials</p>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Research</h1>
                <p className="mt-4 max-w-2xl text-muted">
                    Peer-reviewed cybersecurity work, plus the professional simulations behind it.
                </p>
            </header>

            <article className="panel mt-10 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="chip chip-pass">Peer-reviewed</span>
                    <span className="label">{publication.details}</span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold">{publication.title}</h2>
                <p className="mt-1 text-sm text-accent">{publication.venue}</p>
                <p className="mt-5 max-w-2xl text-sm text-muted">{publication.summary}</p>

                <dl className="mt-7 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="bg-surface px-4 py-4">
                            <dt className="font-mono text-lg font-semibold tabular-nums">
                                {metric.value}
                            </dt>
                            <dd className="label mt-0.5">{metric.label}</dd>
                        </div>
                    ))}
                </dl>

                <ul className="mt-6 space-y-1.5">
                    {publication.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm text-muted">
                            <span className="text-accent" aria-hidden="true">—</span>
                            {h}
                        </li>
                    ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                    <a
                        href={publication.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm"
                    >
                        Read the paper ↗
                    </a>
                    <p className="font-mono text-xs text-dim">
                        Co-authored with {publication.coAuthor}
                    </p>
                </div>
            </article>

            <section className="mt-14">
                <h2 className="section-rule mb-6 text-sm font-semibold uppercase tracking-[0.14em]">
                    Certifications
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                    {certifications.map((cert) => (
                        <article key={cert.title} className="panel flex flex-col p-6">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl" aria-hidden="true">{cert.badge}</span>
                                <div>
                                    <h3 className="font-semibold leading-tight">{cert.title}</h3>
                                    <p className="mt-1 text-sm text-accent">{cert.issuer}</p>
                                </div>
                            </div>
                            <p className="mt-4 flex-1 text-sm text-muted">{cert.description}</p>
                            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                                <span className="font-mono text-xs text-dim">{cert.date}</span>
                                {cert.href ? (
                                    <a
                                        href={cert.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-accent text-sm"
                                    >
                                        View credential ↗
                                    </a>
                                ) : (
                                    <span className="font-mono text-xs text-dim">No public link</span>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
