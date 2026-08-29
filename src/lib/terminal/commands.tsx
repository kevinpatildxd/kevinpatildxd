import type { ReactNode } from 'react';
import { profile, projects, publication, certifications } from '@/data/profile';
import { allNames, findLoose, listing, nodeAt, pathString, resolvePath, type FsNode } from './fs';

export type LineKind = 'input' | 'text' | 'ok' | 'warn' | 'err' | 'dim' | 'node';

export interface Line {
    id: number;
    kind: LineKind;
    text?: string;
    node?: ReactNode;
    /** Render with a typing delay, used by the boot sequence and `devguard`. */
    pending?: boolean;
}

export interface Ctx {
    cwd: string[];
    setCwd: (next: string[]) => void;
    clear: () => void;
    toggleTheme: () => void;
    setTheme: (t: 'dark' | 'light') => void;
    history: string[];
}

export interface Result {
    lines: Array<Omit<Line, 'id'>>;
    /** Commands the terminal should run afterwards, e.g. the boot sequence. */
    then?: string[];
}

const t = (text: string): Omit<Line, 'id'> => ({ kind: 'text', text });
const dim = (text: string): Omit<Line, 'id'> => ({ kind: 'dim', text });
const ok = (text: string): Omit<Line, 'id'> => ({ kind: 'ok', text });
const err = (text: string): Omit<Line, 'id'> => ({ kind: 'err', text });
const warn = (text: string): Omit<Line, 'id'> => ({ kind: 'warn', text });
const blank = (): Omit<Line, 'id'> => ({ kind: 'text', text: '' });
const node = (n: ReactNode): Omit<Line, 'id'> => ({ kind: 'node', node: n });

const pad = (s: string, n: number) => s.padEnd(n, ' ');

/** Mirrors the slug used to name project files in the virtual filesystem. */
const slugify = (name: string) =>
    name
        .toLowerCase()
        .replace(/\+/g, ' plus ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

/**
 * Output is clickable: anything the terminal prints that maps to a command can
 * be run by clicking it, so a visitor who never types still gets everywhere.
 * The Terminal listens for this event.
 */
export const RUN_EVENT = 'terminal:run';

export function RunLink({
    command,
    className,
    children,
}: {
    command: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent(RUN_EVENT, { detail: command }))}
            className={`cursor-pointer text-left underline decoration-dotted underline-offset-4 hover:decoration-solid ${className ?? ''}`}
            title={`run: ${command}`}
        >
            {children}
        </button>
    );
}

/** Renders a filesystem entry the way `ls` colours it. */
function Entry({ item, dir }: { item: FsNode; dir: string[] }) {
    const colour =
        item.kind === 'dir'
            ? 'text-term-dir'
            : item.kind === 'link'
              ? 'text-term-link'
              : 'text-term-fg';
    const label = item.kind === 'dir' ? `${item.name}/` : item.name;
    const full = [...dir, item.name].join('/');
    const command =
        item.kind === 'dir' ? `cd /${full}` : item.kind === 'link' ? `open /${full}` : `cat /${full}`;
    // Grid rather than a min-width, so a long filename pushes its hint across
    // instead of colliding with it.
    return (
        <span className="grid grid-cols-1 gap-x-6 sm:grid-cols-[minmax(0,24rem)_1fr]">
            <RunLink command={command} className={colour}>
                {label}
            </RunLink>
            {item.hint && <span className="text-term-dim">{item.hint}</span>}
        </span>
    );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a
            href={href}
            target={href.startsWith('/') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="text-term-link underline underline-offset-2 hover:text-term-accent"
        >
            {children}
        </a>
    );
}

const COMMANDS: Record<
    string,
    { summary: string; usage?: string; run: (args: string[], ctx: Ctx) => Result }
> = {
    help: {
        summary: 'list every command',
        run: () => ({
            lines: [
                blank(),
                ok('AVAILABLE COMMANDS'),
                blank(),
                ...Object.entries(COMMANDS)
                    .filter(([name]) => name !== 'sudo')
                    .map(([name, cmd]) => t(`  ${pad(cmd.usage ?? name, 24)}${cmd.summary}`)),
                blank(),
                dim('  [tab] complete   [↑ ↓] history   [ctrl+l] clear'),
                dim('  New here? Try:  devguard  ·  ls projects  ·  cat about.md'),
                blank(),
            ],
        }),
    },

    whoami: {
        summary: 'identity and current role',
        run: () => ({
            lines: [
                blank(),
                t(profile.name),
                ok(profile.role),
                dim(`${profile.contact.location} · ${profile.education.graduation}`),
                blank(),
                t(profile.bio),
                blank(),
            ],
        }),
    },

    ls: {
        summary: 'list directory contents',
        usage: 'ls [path]',
        run: (args, ctx) => {
            const target = args[0] ? resolvePath(ctx.cwd, args[0]) : ctx.cwd;
            const found = nodeAt(target);
            if (!found) return { lines: [err(`ls: ${args[0]}: no such file or directory`)] };
            if (found.kind !== 'dir')
                return { lines: [node(<Entry item={found} dir={target.slice(0, -1)} />)] };
            const items = found.children ?? [];
            return {
                lines: [
                    blank(),
                    dim(`${items.length} entries in ${pathString(target)}`),
                    ...items.map((item) => node(<Entry item={item} dir={target} />)),
                    blank(),
                ],
            };
        },
    },

    cd: {
        summary: 'change directory',
        usage: 'cd <path>',
        run: (args, ctx) => {
            if (!args[0]) {
                ctx.setCwd([]);
                return { lines: [] };
            }
            const target = resolvePath(ctx.cwd, args[0]);
            const found = nodeAt(target);
            if (!found) return { lines: [err(`cd: ${args[0]}: no such file or directory`)] };
            if (found.kind !== 'dir') return { lines: [err(`cd: ${args[0]}: not a directory`)] };
            ctx.setCwd(target);
            return { lines: [] };
        },
    },

    pwd: {
        summary: 'print working directory',
        run: (_a, ctx) => ({ lines: [t(pathString(ctx.cwd))] }),
    },

    cat: {
        summary: 'print a file',
        usage: 'cat <file>',
        run: (args, ctx) => {
            if (!args[0]) return { lines: [err('cat: missing operand')] };
            const target = resolvePath(ctx.cwd, args[0]);
            const found = nodeAt(target);
            if (!found) return { lines: [err(`cat: ${args[0]}: no such file or directory`)] };
            if (found.kind === 'dir') return { lines: [err(`cat: ${args[0]}: is a directory`)] };
            if (!found.body && found.href)
                return {
                    lines: [
                        blank(),
                        node(
                            <span>
                                binary file — <ExternalLink href={found.href}>open it</ExternalLink>
                            </span>
                        ),
                        blank(),
                    ],
                };
            return {
                lines: [
                    blank(),
                    ...(found.body ?? '').split('\n').map((line) => {
                        if (line.startsWith('# ')) return ok(line.slice(2));
                        if (line.startsWith('  - ')) return dim(line);
                        if (/^[a-z-]+ {2,}/.test(line)) return t(line);
                        return t(line);
                    }),
                    ...(found.href
                        ? [
                              blank(),
                              node(<ExternalLink href={found.href}>{found.href}</ExternalLink>),
                          ]
                        : []),
                    blank(),
                ],
            };
        },
    },

    tree: {
        summary: 'show the whole filesystem',
        run: () => {
            const lines: Array<Omit<Line, 'id'>> = [blank(), ok('~')];
            const walk = (items: FsNode[], prefix: string) => {
                items.forEach((item, i) => {
                    const last = i === items.length - 1;
                    const branch = last ? '└── ' : '├── ';
                    lines.push(
                        node(
                            <span>
                                <span className="text-term-dim">{prefix + branch}</span>
                                <span
                                    className={
                                        item.kind === 'dir' ? 'text-term-dir' : 'text-term-fg'
                                    }
                                >
                                    {item.name}
                                    {item.kind === 'dir' ? '/' : ''}
                                </span>
                            </span>
                        )
                    );
                    if (item.children) walk(item.children, prefix + (last ? '    ' : '│   '));
                });
            };
            walk(listing([]), '');
            lines.push(blank());
            return { lines };
        },
    },

    open: {
        summary: 'open a link in a new tab',
        usage: 'open <file|target>',
        run: (args, ctx) => {
            const targets: Record<string, string> = {
                github: profile.contact.github,
                linkedin: profile.contact.linkedin,
                npm: profile.contact.npm,
                studio: profile.contact.company,
                paper: publication.href,
                resume: '/kevinpatildxd/kevin_resume.pdf',
            };
            const key = (args[0] ?? '').toLowerCase();
            let href = targets[key];
            if (!href) {
                const found = nodeAt(resolvePath(ctx.cwd, args[0] ?? ''));
                href = found?.href ?? '';
            }
            if (!href)
                return {
                    lines: [
                        err(`open: ${args[0] ?? ''}: nothing to open`),
                        dim(`  targets: ${Object.keys(targets).join(', ')}`),
                    ],
                };
            if (typeof window !== 'undefined') window.open(href, '_blank', 'noopener');
            return { lines: [ok(`opening ${href}`)] };
        },
    },

    /**
     * The signature command: Kevin's own CLI, run against his own profile.
     */
    devguard: {
        summary: 'run a profile audit (his actual npm CLI)',
        usage: 'devguard [--strict]',
        run: () => {
            const releases = 8;
            return {
                lines: [
                    blank(),
                    dim(`devguard v3.4.1   target: kevin-patil   mode: strict`),
                    dim('─'.repeat(58)),
                    blank(),
                    { ...t('  running 5 checks…'), pending: true },
                    blank(),
                    { ...ok(`  ✓ identity        PASS   ${profile.role}`), pending: true },
                    {
                        ...ok(`  ✓ ship-record     PASS   ${projects.length} projects · ${releases} npm releases`),
                        pending: true,
                    },
                    {
                        ...ok(`  ✓ peer-review     PASS   ${publication.details}`),
                        pending: true,
                    },
                    {
                        ...ok(`  ✓ credentials     PASS   ${certifications.length} simulations`),
                        pending: true,
                    },
                    {
                        ...warn('  ⚠ availability    OPEN   accepting work'),
                        pending: true,
                    },
                    blank(),
                    dim('─'.repeat(58)),
                    { ...ok('  exit code 0 — 4 passed, 1 open, 0 failed'), pending: true },
                    blank(),
                    dim('  next:  ls projects   ·   cat research/anti-phishing.md'),
                    blank(),
                ],
            };
        },
    },

    projects: {
        summary: 'summarise every project',
        run: () => ({
            lines: [
                blank(),
                ok(`${projects.length} PROJECTS · solo work only`),
                dim('  client work built at Nudge Systems is not listed here'),
                blank(),
                ...projects.flatMap((p, i) => [
                    node(
                        <span className="flex flex-wrap gap-x-3">
                            <span className="text-term-dim">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <RunLink
                                command={`cat /projects/${p.name.toLowerCase().replace(/\+/g, ' plus ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.md`}
                                className="text-term-accent min-w-[16rem] shrink-0"
                            >
                                {p.name}
                            </RunLink>
                            <span className="text-term-dim">{p.status}</span>
                        </span>
                    ),
                    dim(`     ${p.outcome}`),
                    dim(`     ${p.tags.join(' · ')}`),
                    blank(),
                ]),
            ],
        }),
    },

    research: {
        summary: 'show the published paper',
        run: () => ({
            lines: [
                blank(),
                ok(publication.title),
                dim(`${publication.venue} · ${publication.details}`),
                blank(),
                t(publication.summary),
                blank(),
                ...publication.highlights.map((h) => t(`  · ${h}`)),
                blank(),
                node(<ExternalLink href={publication.href}>read the paper →</ExternalLink>),
                blank(),
            ],
        }),
    },

    skills: {
        summary: 'the stack, by area',
        run: () => ({ lines: [], then: ['cat /skills.txt'] }),
    },

    contact: {
        summary: 'how to reach me',
        run: () => ({
            lines: [
                blank(),
                node(
                    <span>
                        email      <ExternalLink href={`mailto:${profile.contact.email}`}>{profile.contact.email}</ExternalLink>
                    </span>
                ),
                node(
                    <span>
                        phone      <ExternalLink href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}>{profile.contact.phone}</ExternalLink>
                    </span>
                ),
                node(
                    <span>
                        github     <ExternalLink href={profile.contact.github}>kevinpatildxd</ExternalLink>
                    </span>
                ),
                node(
                    <span>
                        linkedin   <ExternalLink href={profile.contact.linkedin}>kevin-patil</ExternalLink>
                    </span>
                ),
                node(
                    <span>
                        studio     <ExternalLink href={profile.contact.company}>nudgesystems.in</ExternalLink>
                    </span>
                ),
                blank(),
            ],
        }),
    },

    resume: {
        summary: 'download the CV',
        run: () => ({
            lines: [
                blank(),
                node(
                    <span>
                        <ExternalLink href="/kevinpatildxd/kevin_resume.pdf">
                            ↓ Kevin_Patil_Resume.pdf
                        </ExternalLink>
                    </span>
                ),
                blank(),
            ],
        }),
    },

    neofetch: {
        summary: 'system-style profile card',
        run: () => {
            const art = [
                '  ██╗  ██╗██████╗ ',
                '  ██║ ██╔╝██╔══██╗',
                '  █████╔╝ ██████╔╝',
                '  ██╔═██╗ ██╔═══╝ ',
                '  ██║  ██╗██║     ',
                '  ╚═╝  ╚═╝╚═╝     ',
            ];
            const info = [
                `${profile.shortName.toLowerCase().replace(' ', '')}@portfolio`,
                '─────────────────────',
                `Role      Co-Founder & CDO`,
                `Studio    Nudge Systems`,
                `Uptime    B.Tech → Jun 2026`,
                `Shell     devguard v3.4.1`,
                `Projects  ${projects.length}`,
                `Papers    1`,
                `Location  Surat, India`,
            ];
            const rows = Math.max(art.length, info.length);
            return {
                lines: [
                    blank(),
                    ...Array.from({ length: rows }, (_, i) =>
                        node(
                            <span className="flex gap-4">
                                <span className="text-term-accent whitespace-pre">
                                    {pad(art[i] ?? '', 19)}
                                </span>
                                <span className="text-term-fg whitespace-pre">{info[i] ?? ''}</span>
                            </span>
                        )
                    ),
                    blank(),
                ],
            };
        },
    },

    /**
     * Full-text search. Without this, a visitor who types a technology name
     * ("stripe", "flutter") just gets "command not found" - which is the most
     * likely thing for someone to try.
     */
    grep: {
        summary: 'search everything for a term',
        usage: 'grep <term>',
        run: (args) => {
            const needle = args.join(' ').toLowerCase().trim();
            if (!needle) return { lines: [err('grep: missing search term')] };

            const hits: Array<Omit<Line, 'id'>> = [];

            for (const project of projects) {
                const haystack = [
                    project.name,
                    project.category,
                    project.outcome,
                    project.description,
                    ...project.tags,
                    ...project.highlights,
                ]
                    .join(' ')
                    .toLowerCase();
                if (!haystack.includes(needle)) continue;
                const matched = project.tags.filter((tag) => tag.toLowerCase().includes(needle));
                hits.push(
                    node(
                        <span className="flex flex-wrap gap-x-3">
                            <span className="text-term-dim">projects/</span>
                            <RunLink
                                command={`cat /projects/${slugify(project.name)}.md`}
                                className="text-term-accent"
                            >
                                {project.name}
                            </RunLink>
                            <span className="text-term-dim">
                                {matched.length ? matched.join(' · ') : project.outcome}
                            </span>
                        </span>
                    )
                );
            }

            const paperText = [
                publication.title,
                publication.summary,
                publication.venue,
                ...publication.highlights,
            ]
                .join(' ')
                .toLowerCase();
            if (paperText.includes(needle)) {
                hits.push(
                    node(
                        <span className="flex flex-wrap gap-x-3">
                            <span className="text-term-dim">research/</span>
                            <RunLink command="cat /research/anti-phishing.md" className="text-term-accent">
                                {publication.title}
                            </RunLink>
                        </span>
                    )
                );
            }

            for (const cert of certifications) {
                if (`${cert.title} ${cert.issuer} ${cert.description}`.toLowerCase().includes(needle)) {
                    hits.push(
                        node(
                            <span className="flex flex-wrap gap-x-3">
                                <span className="text-term-dim">research/</span>
                                <span className="text-term-fg">{cert.title}</span>
                                <span className="text-term-dim">{cert.issuer}</span>
                            </span>
                        )
                    );
                }
            }

            if (hits.length === 0) {
                return {
                    lines: [
                        blank(),
                        warn(`no matches for "${needle}"`),
                        dim('  try: react · flutter · solidity · stripe · phishing · npm'),
                        blank(),
                    ],
                };
            }

            return {
                lines: [
                    blank(),
                    dim(`${hits.length} match${hits.length === 1 ? '' : 'es'} for "${needle}"`),
                    ...hits,
                    blank(),
                ],
            };
        },
    },

    man: {
        summary: 'detail on one command',
        usage: 'man <command>',
        run: (args) => {
            const target = (args[0] ?? '').toLowerCase();
            const found = COMMANDS[target];
            if (!found)
                return {
                    lines: [err(`man: no entry for ${args[0] ?? '(nothing)'}`), dim('try `help`')],
                };
            return {
                lines: [
                    blank(),
                    ok(target.toUpperCase()),
                    t(`  usage    ${found.usage ?? target}`),
                    t(`  purpose  ${found.summary}`),
                    blank(),
                ],
            };
        },
    },

    theme: {
        summary: 'switch dark / light',
        usage: 'theme [dark|light]',
        run: (args, ctx) => {
            const value = (args[0] ?? '').toLowerCase();
            if (value === 'dark' || value === 'light') {
                ctx.setTheme(value);
                return { lines: [ok(`theme set to ${value}`)] };
            }
            ctx.toggleTheme();
            return { lines: [ok('theme toggled')] };
        },
    },

    history: {
        summary: 'commands run this session',
        run: (_a, ctx) => ({
            lines:
                ctx.history.length === 0
                    ? [dim('no history yet')]
                    : ctx.history.map((h, i) => dim(`  ${String(i + 1).padStart(3)}  ${h}`)),
        }),
    },

    clear: {
        summary: 'clear the screen',
        run: (_a, ctx) => {
            ctx.clear();
            return { lines: [] };
        },
    },

    date: {
        summary: 'current date',
        run: () => ({ lines: [t(new Date().toString())] }),
    },

    echo: {
        summary: 'print text',
        usage: 'echo <text>',
        run: (args) => ({ lines: [t(args.join(' '))] }),
    },

    sudo: {
        summary: 'hidden',
        run: () => ({
            lines: [
                err('kevin is not in the sudoers file. This incident will be reported.'),
                dim('…to nobody. It is a portfolio.'),
            ],
        }),
    },

    exit: {
        summary: 'close the session',
        run: () => ({
            lines: [dim('There is no exit. Try `open studio` instead.')],
        }),
    },
};

export const commandNames = Object.keys(COMMANDS);

/** Levenshtein distance, for "did you mean" suggestions. */
function distance(a: string, b: string): number {
    const rows = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 0; j <= b.length; j++) rows[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            rows[i][j] = Math.min(
                rows[i - 1][j] + 1,
                rows[i][j - 1] + 1,
                rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
            );
        }
    }
    return rows[a.length][b.length];
}

function suggest(input: string): string | null {
    const pool = [...commandNames.filter((c) => c !== 'sudo'), ...allNames()];
    let best: string | null = null;
    let bestScore = Infinity;
    for (const candidate of pool) {
        const score = distance(input.toLowerCase(), candidate.toLowerCase());
        if (score < bestScore) {
            bestScore = score;
            best = candidate;
        }
    }
    return bestScore <= Math.max(2, Math.floor(input.length / 2)) ? best : null;
}

export function runCommand(raw: string, ctx: Ctx): Result {
    const trimmed = raw.trim();
    if (!trimmed) return { lines: [] };
    const [name, ...args] = trimmed.split(/\s+/);
    const command = COMMANDS[name.toLowerCase()];
    if (command) {
        return command.run(args.filter((a) => !a.startsWith('--')), ctx);
    }

    /*
     * Not a command - treat it as a path. Typing `/about`, `about` or
     * `projects/compi` should just work, the way clicking a link would.
     * Directories open and list; files print.
     */
    const hit = findLoose(ctx.cwd, name);
    if (hit) {
        if (hit.node.kind === 'dir') {
            ctx.setCwd(hit.segments);
            return { lines: [], then: ['ls'] };
        }
        return COMMANDS.cat.run([`/${hit.segments.join('/')}`], ctx);
    }

    const guess = suggest(name);
    return {
        lines: [
            err(`command not found: ${name}`),
            dim(guess ? `did you mean \`${guess}\`?  ·  \`help\` lists everything` : 'try `help`'),
        ],
    };
}

/** Tab-completion over commands, then paths. */
export function complete(input: string, cwd: string[]): string[] {
    const parts = input.split(/\s+/);
    if (parts.length <= 1) {
        return commandNames.filter((c) => c.startsWith(parts[0] ?? '') && c !== 'sudo');
    }
    const fragment = parts[parts.length - 1];
    const slashIndex = fragment.lastIndexOf('/');
    const dirPart = slashIndex >= 0 ? fragment.slice(0, slashIndex) : '';
    const namePart = slashIndex >= 0 ? fragment.slice(slashIndex + 1) : fragment;
    const base = dirPart ? resolvePath(cwd, dirPart) : cwd;
    return listing(base)
        .filter((item) => item.name.startsWith(namePart))
        .map((item) => {
            const full = `${dirPart ? `${dirPart}/` : ''}${item.name}${item.kind === 'dir' ? '/' : ''}`;
            return [...parts.slice(0, -1), full].join(' ');
        });
}
