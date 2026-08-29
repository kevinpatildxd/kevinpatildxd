import { profile, projects, publication, certifications, skillCategories } from '@/data/profile';

/**
 * A virtual filesystem assembled from the profile data. The terminal is the
 * only UI, so this is the site's real information architecture - every route
 * maps onto a path in here.
 */

export type NodeKind = 'dir' | 'file' | 'link';

export interface FsNode {
    name: string;
    kind: NodeKind;
    /** Short right-hand annotation shown by `ls`. */
    hint?: string;
    /** Rendered by `cat`. */
    body?: string;
    /** External target for `open`. */
    href?: string;
    children?: FsNode[];
}

const slug = (name: string) =>
    name
        .toLowerCase()
        .replace(/\+/g, ' plus ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

function projectFile(project: (typeof projects)[number]): FsNode {
    const lines = [
        `# ${project.name}`,
        '',
        `category   ${project.category}`,
        `status     ${project.status}`,
        `outcome    ${project.outcome}`,
        `stack      ${project.tags.join(', ')}`,
        project.link ? `source     ${project.link}` : `source     private deployment`,
        '',
        project.description,
        '',
        'highlights',
        ...project.highlights.map((h) => `  - ${h}`),
    ];
    return {
        name: `${slug(project.name)}.md`,
        kind: 'file',
        hint: `${project.tags[0]} · ${project.status}`,
        body: lines.join('\n'),
        href: project.link,
    };
}

const aboutBody = [
    `# ${profile.name}`,
    '',
    `role       ${profile.role}`,
    `location   ${profile.contact.location}`,
    `education  ${profile.education.degree}`,
    `           ${profile.education.institution} · ${profile.education.graduation} · ${profile.education.gpa} GPA`,
    '',
    profile.bio,
    '',
    'I co-founded Nudge Systems, a software studio in Surat, where I lead',
    'development across web, mobile and e-commerce products. Alongside that',
    "I'm finishing a B.Tech in Computer Science Engineering.",
    '',
    'Everything under /projects is my own work. Client projects built at the',
    'studio live on nudgesystems.in and are deliberately not listed here.',
].join('\n');

const researchBody = [
    `# ${publication.title}`,
    '',
    `venue      ${publication.venue}`,
    `issue      ${publication.details}`,
    `co-author  ${publication.coAuthor}`,
    `doi        ${publication.href}`,
    '',
    publication.summary,
    '',
    'key findings',
    ...publication.highlights.map((h) => `  - ${h}`),
].join('\n');

const skillsBody = skillCategories
    .map((category) => `[${category.title}]\n${category.skills.map((s) => `  ${s}`).join('\n')}`)
    .join('\n\n');

const contactBody = [
    `email      ${profile.contact.email}`,
    `phone      ${profile.contact.phone}`,
    `location   ${profile.contact.location}`,
    `github     ${profile.contact.github}`,
    `linkedin   ${profile.contact.linkedin}`,
    `npm        ${profile.contact.npm}`,
    `studio     ${profile.contact.company}`,
].join('\n');

const certsBody = certifications
    .map((c) => `${c.title}\n  issuer   ${c.issuer}\n  date     ${c.date}\n  ${c.description}`)
    .join('\n\n');

export const root: FsNode = {
    name: '/',
    kind: 'dir',
    children: [
        {
            name: 'projects',
            kind: 'dir',
            hint: `${projects.length} entries`,
            children: projects.map(projectFile),
        },
        {
            name: 'research',
            kind: 'dir',
            hint: '1 publication',
            children: [
                {
                    name: 'anti-phishing.md',
                    kind: 'file',
                    hint: 'peer-reviewed · 2026',
                    body: researchBody,
                    href: publication.href,
                },
                {
                    name: 'certifications.txt',
                    kind: 'file',
                    hint: `${certifications.length} entries`,
                    body: certsBody,
                },
            ],
        },
        { name: 'about.md', kind: 'file', hint: 'who I am', body: aboutBody },
        { name: 'skills.txt', kind: 'file', hint: 'the stack', body: skillsBody },
        { name: 'contact.txt', kind: 'file', hint: 'reach me', body: contactBody },
        {
            name: 'resume.pdf',
            kind: 'link',
            hint: 'download',
            href: '/kevinpatildxd/kevin_resume.pdf',
        },
    ],
};

/** Normalise a path against a working directory into absolute segments. */
export function resolvePath(cwd: string[], input: string): string[] {
    const segments = input.startsWith('/') ? [] : [...cwd];
    for (const part of input.split('/')) {
        if (!part || part === '.') continue;
        if (part === '..') segments.pop();
        else segments.push(part);
    }
    return segments;
}

export function nodeAt(segments: string[]): FsNode | null {
    let current: FsNode = root;
    for (const segment of segments) {
        if (current.kind !== 'dir' || !current.children) return null;
        const next = current.children.find((c) => c.name === segment);
        if (!next) return null;
        current = next;
    }
    return current;
}

export const pathString = (segments: string[]) =>
    segments.length === 0 ? '~' : `~/${segments.join('/')}`;

/** Every completable path, used by tab-completion. */
export function listing(segments: string[]): FsNode[] {
    const node = nodeAt(segments);
    return node?.kind === 'dir' ? (node.children ?? []) : [];
}

/** Depth-first walk yielding every node with its absolute segments. */
function* walk(node: FsNode = root, trail: string[] = []): Generator<{ node: FsNode; segments: string[] }> {
    for (const child of node.children ?? []) {
        const segments = [...trail, child.name];
        yield { node: child, segments };
        if (child.kind === 'dir') yield* walk(child, segments);
    }
}

const stripExt = (name: string) => name.replace(/\.(md|txt|pdf)$/, '');

/**
 * Forgiving lookup used when someone types a bare path instead of a command:
 * `/about`, `about`, `about.md` and `research/anti-phishing` all land on the
 * same file. Tries the literal path first, then common extensions, then a
 * basename match anywhere in the tree.
 */
export function findLoose(
    cwd: string[],
    input: string
): { node: FsNode; segments: string[] } | null {
    const cleaned = input.replace(/\/+$/, '');
    if (!cleaned) return null;

    const candidates = [cleaned, `${cleaned}.md`, `${cleaned}.txt`, `${cleaned}.pdf`];
    for (const candidate of candidates) {
        for (const base of [cwd, [] as string[]]) {
            const segments = resolvePath(base, candidate);
            const found = nodeAt(segments);
            if (found) return { node: found, segments };
        }
    }

    // Fall back to matching the last path component anywhere in the tree.
    const needle = stripExt(cleaned.split('/').pop() ?? '').toLowerCase();
    if (!needle) return null;
    for (const entry of walk()) {
        if (stripExt(entry.node.name).toLowerCase() === needle) return entry;
    }
    return null;
}

/** Names used for "did you mean" suggestions. */
export function allNames(): string[] {
    return [...walk()].map((e) => e.segments.join('/'));
}
