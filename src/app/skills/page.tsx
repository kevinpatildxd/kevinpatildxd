import { skillCategories, projects } from '@/data/profile';

/** Which projects prove which skill — evidence instead of a percentage bar. */
const provenBy: Record<string, string[]> = {
    'React': ['GV Fitness', 'Compi'],
    'Next.js': ['Compi'],
    'TypeScript': ['devguard', 'Compi'],
    'JavaScript': ['React + CryptoJS Privacy Suite'],
    'Tailwind CSS': ['GV Fitness'],
    'Shadcn UI': ['GV Fitness'],
    'HTML/CSS': ['React + CryptoJS Privacy Suite'],
    'Node.js': ['devguard', 'StackIt'],
    'Express': ['Compi', 'StackIt'],
    'PHP REST APIs': ['GV Fitness'],
    'PostgreSQL': ['StackIt', 'Compi'],
    'MySQL': ['GV Fitness'],
    'Socket.io': ['StackIt'],
    'Flutter': ['StackIt', 'MotoLink'],
    'Dart': ['MotoLink'],
    'WebRTC': ['MotoLink'],
    'Solidity': ['Blockchain Supply Chain dApp'],
    'Hardhat': ['Blockchain Supply Chain dApp'],
    'Ethers.js': ['Blockchain Supply Chain dApp'],
    'Stripe': ['Compi'],
    'Cloudinary': ['Compi'],
    'React Query': ['GV Fitness'],
    'Vite': ['React + CryptoJS Privacy Suite'],
    'CI static analysis': ['devguard'],
};

export default function SkillsPage() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
            <header className="border-b border-line pb-8">
                <p className="label mb-3">Toolkit</p>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">The stack</h1>
                <p className="mt-4 max-w-2xl text-muted">
                    No percentage bars — a self-assigned &ldquo;React 85%&rdquo; means nothing. Each
                    row names the projects the skill was actually used in.
                </p>
            </header>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {skillCategories.map((category) => (
                    <section key={category.title} className="panel">
                        <h2 className="border-b border-line bg-elevated px-5 py-3 text-sm font-semibold">
                            {category.title}
                        </h2>
                        <ul className="divide-y divide-line">
                            {category.skills.map((skill) => {
                                const proof = provenBy[skill] ?? [];
                                return (
                                    <li
                                        key={skill}
                                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-2.5"
                                    >
                                        <span className="text-sm">{skill}</span>
                                        <span className="font-mono text-[11px] text-dim">
                                            {proof.length ? proof.join(', ') : '—'}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                ))}
            </div>

            <section className="mt-14">
                <h2 className="section-rule mb-6 text-sm font-semibold uppercase tracking-[0.14em]">
                    What each project exercised
                </h2>
                <dl className="border-t border-line">
                    {projects.map((project) => (
                        <div
                            key={project.name}
                            className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:gap-6"
                        >
                            <dt className="text-sm font-medium sm:w-64 sm:shrink-0">
                                {project.name}
                            </dt>
                            <dd className="font-mono text-xs text-muted">
                                {project.tags.join(' · ')}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>
        </div>
    );
}
