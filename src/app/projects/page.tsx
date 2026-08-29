import { projects, profile } from '@/data/profile';

const statusLabel: Record<string, string> = {
    live: 'Live',
    ongoing: 'In progress',
    completed: 'Completed',
};

export default function ProjectsPage() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
            <header className="border-b border-line pb-8">
                <p className="label mb-3">{projects.length} projects · solo work only</p>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">The work</h1>
                <p className="mt-4 max-w-2xl text-muted">
                    Developer tooling, payment platforms, mobile apps and smart contracts. Client
                    projects built at Nudge Systems live on the studio site — these are mine end to
                    end.
                </p>
            </header>

            <div className="mt-10 space-y-px bg-line">
                {projects.map((project, i) => (
                    <article key={project.name} className="bg-surface p-6 sm:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="flex items-baseline gap-4">
                                <span className="font-mono text-xs text-dim">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h2 className="text-xl font-semibold">{project.name}</h2>
                                    <p className="label mt-1">{project.category}</p>
                                </div>
                            </div>
                            <span
                                className={`chip ${project.status === 'ongoing' ? 'chip-open' : 'chip-pass'}`}
                            >
                                {statusLabel[project.status]}
                            </span>
                        </div>

                        <p className="mt-5 text-sm font-medium text-accent">{project.outcome}</p>
                        <p className="mt-3 max-w-2xl text-sm text-muted">{project.description}</p>

                        <ul className="mt-5 space-y-1.5">
                            {project.highlights.map((h) => (
                                <li key={h} className="flex gap-3 text-sm text-muted">
                                    <span className="text-accent" aria-hidden="true">
                                        —
                                    </span>
                                    {h}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            {project.tags.map((tag) => (
                                <span key={tag} className="tag">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {project.link ? (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-accent mt-5 inline-block text-sm"
                            >
                                View source ↗
                            </a>
                        ) : (
                            <p className="mt-5 font-mono text-xs text-dim">
                                Private deployment — source not public
                            </p>
                        )}
                    </article>
                ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
                <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-sm"
                >
                    All repos on GitHub ↗
                </a>
                <a
                    href={profile.contact.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-sm"
                >
                    devguard on npm ↗
                </a>
            </div>
        </div>
    );
}
