import {
    profile,
    projects,
    publication,
    certifications,
    skillCategories,
} from '@/data/profile';

function Row({
    title,
    subtitle,
    note,
    meta,
    href,
}: {
    title: string;
    subtitle?: string;
    note?: string;
    meta?: string;
    href?: string;
}) {
    return (
        <div className="flex flex-col gap-1 border-b border-line py-4 last:border-0 sm:flex-row sm:justify-between sm:gap-6">
            <div className="min-w-0">
                <p className="font-medium">
                    {href ? (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent"
                        >
                            {title} ↗
                        </a>
                    ) : (
                        title
                    )}
                </p>
                {subtitle && <p className="text-sm text-accent">{subtitle}</p>}
                {note && <p className="mt-0.5 font-mono text-xs text-dim">{note}</p>}
            </div>
            {meta && (
                <span className="shrink-0 font-mono text-xs text-dim sm:text-right">{meta}</span>
            )}
        </div>
    );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="border-b border-line px-6 py-7 last:border-0 sm:px-8">
            <h2 className="label mb-4">{title}</h2>
            {children}
        </section>
    );
}

export default function ResumePage() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
            <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-8">
                <div>
                    <p className="label mb-3">Curriculum vitae</p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Résumé</h1>
                </div>
                <a
                    href="/kevinpatildxd/kevin_resume.pdf"
                    download="Kevin_Patil_Resume.pdf"
                    className="btn-primary text-sm"
                >
                    Download PDF ↓
                </a>
            </header>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
                <article className="panel">
                    <header className="border-b border-line bg-elevated px-6 py-6 sm:px-8">
                        <h2 className="text-2xl font-semibold">{profile.name}</h2>
                        <p className="mt-1 text-sm text-accent">{profile.role}</p>
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs text-muted">
                            <a
                                href={`mailto:${profile.contact.email}`}
                                className="hover:text-accent"
                            >
                                {profile.contact.email}
                            </a>
                            <a
                                href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}
                                className="hover:text-accent"
                            >
                                {profile.contact.phone}
                            </a>
                            <span>{profile.contact.location}</span>
                        </div>
                    </header>

                    <Block title="Summary">
                        <p className="text-sm text-muted">
                            {profile.bio} Co-founder and CDO at Nudge Systems, currently completing
                            a B.Tech in Computer Science Engineering at{' '}
                            {profile.education.institution}. Published cybersecurity researcher and
                            author of an open-source developer CLI on npm.
                        </p>
                    </Block>

                    <Block title="Experience">
                        <Row
                            title="Co-Founder &amp; Chief Development Officer"
                            subtitle="Nudge Systems, Surat"
                            note="Custom software, web and mobile product development."
                            href={profile.contact.company}
                        />
                    </Block>

                    <Block title="Publication">
                        <Row
                            title={publication.title}
                            subtitle={publication.venue}
                            note={`Co-authored with ${publication.coAuthor}`}
                            meta={publication.details}
                            href={publication.href}
                        />
                    </Block>

                    <Block title="Education">
                        <Row
                            title={profile.education.degree}
                            subtitle={`${profile.education.institution}, ${profile.education.location}`}
                            note={`${profile.education.gpa} GPA`}
                            meta={profile.education.graduation}
                        />
                        <Row
                            title={profile.schooling.degree}
                            subtitle={profile.schooling.institution}
                            meta={profile.schooling.date}
                        />
                    </Block>

                    <Block title={`Projects (${projects.length})`}>
                        {projects.map((project) => (
                            <Row
                                key={project.name}
                                title={project.name}
                                subtitle={project.outcome}
                                note={project.tags.join(' · ')}
                                href={project.link}
                            />
                        ))}
                    </Block>

                    <Block title="Certifications">
                        {certifications.map((cert) => (
                            <Row
                                key={cert.title}
                                title={cert.title}
                                subtitle={cert.issuer}
                                meta={cert.date}
                            />
                        ))}
                    </Block>

                    <Block title="Skills">
                        <div className="space-y-4">
                            {skillCategories.map((category) => (
                                <div key={category.title}>
                                    <p className="label mb-2">{category.title}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {category.skills.map((skill) => (
                                            <span key={skill} className="tag">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Block>
                </article>

                <aside className="panel lg:sticky lg:top-20">
                    <h2 className="label border-b border-line px-5 py-3">At a glance</h2>
                    <dl className="divide-y divide-line">
                        {[
                            ['Role', 'Co-Founder & CDO'],
                            ['Company', 'Nudge Systems'],
                            ['University', 'Uka Tarsadia'],
                            ['GPA', profile.education.gpa],
                            ['Graduating', 'June 2026'],
                            ['Projects', String(projects.length)],
                            ['Publications', '1'],
                            ['Certifications', String(certifications.length)],
                        ].map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-3 px-5 py-2.5">
                                <dt className="font-mono text-xs text-dim">{label}</dt>
                                <dd className="text-right font-mono text-xs">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </aside>
            </div>
        </div>
    );
}
