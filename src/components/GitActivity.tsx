'use client';

import { useEffect, useState } from 'react';

/**
 * Live GitHub activity, fetched in the visitor's browser - the site is a
 * static export, so a build-time snapshot would go stale between deploys.
 *
 * Built on the repos + commits endpoints rather than /events: the events feed
 * only covers public pushes and no longer carries commit messages. Only public
 * repos show up here; private work (Nudge Systems, Compi) never will.
 *
 * Unauthenticated calls are capped at 60/hour per IP, so a result is cached in
 * sessionStorage and the page falls back to a plain profile link on failure.
 */

const USER = 'kevinpatildxd';
const API = 'https://api.github.com';
const CACHE_KEY = 'gh-activity-v1';
const CACHE_TTL = 10 * 60 * 1000;
const REPOS_SHOWN = 5;
const COMMIT_SOURCES = 3;
const COMMITS_SHOWN = 6;

interface Repo {
    name: string;
    url: string;
    pushedAt: string;
    language: string | null;
}

interface Commit {
    sha: string;
    message: string;
    date: string;
    repo: string;
    url: string;
}

interface Activity {
    repos: Repo[];
    commits: Commit[];
}

async function getJson<T>(path: string): Promise<T> {
    const res = await fetch(`${API}${path}`, {
        headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    return res.json() as Promise<T>;
}

async function loadActivity(): Promise<Activity> {
    type RawRepo = { name: string; html_url: string; pushed_at: string; language: string | null; fork: boolean };
    type RawCommit = { sha: string; html_url: string; commit: { message: string; author: { date: string } } };

    const raw = await getJson<RawRepo[]>(`/users/${USER}/repos?sort=pushed&per_page=10`);
    const repos = raw
        .filter((r) => !r.fork)
        .map((r) => ({ name: r.name, url: r.html_url, pushedAt: r.pushed_at, language: r.language }));

    // One empty or failing repo shouldn't take the whole feed down.
    const batches = await Promise.allSettled(
        repos.slice(0, COMMIT_SOURCES).map(async (repo) => {
            const commits = await getJson<RawCommit[]>(
                `/repos/${USER}/${repo.name}/commits?author=${USER}&per_page=${COMMITS_SHOWN}`,
            );
            return commits.map((c) => ({
                sha: c.sha.slice(0, 7),
                message: c.commit.message.split('\n')[0],
                date: c.commit.author.date,
                repo: repo.name,
                url: c.html_url,
            }));
        }),
    );

    const commits = batches
        .flatMap((b) => (b.status === 'fulfilled' ? b.value : []))
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, COMMITS_SHOWN);

    return { repos: repos.slice(0, REPOS_SHOWN), commits };
}

function readCache(): Activity | null {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const { at, data } = JSON.parse(raw) as { at: number; data: Activity };
        return Date.now() - at < CACHE_TTL ? data : null;
    } catch {
        return null;
    }
}

function writeCache(data: Activity) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
    } catch {
        // Private mode or storage full - the feed still renders, just uncached.
    }
}

function timeAgo(iso: string): string {
    const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
    const units: [number, string][] = [
        [365 * 24 * 3600, 'y'],
        [30 * 24 * 3600, 'mo'],
        [7 * 24 * 3600, 'w'],
        [24 * 3600, 'd'],
        [3600, 'h'],
        [60, 'm'],
    ];
    for (const [size, label] of units) {
        if (seconds >= size) return `${Math.floor(seconds / size)}${label} ago`;
    }
    return 'just now';
}

type State = { kind: 'loading' } | { kind: 'error' } | { kind: 'ready'; data: Activity };

export default function GitActivity() {
    const [state, setState] = useState<State>({ kind: 'loading' });

    useEffect(() => {
        const cached = readCache();
        let cancelled = false;
        const source = cached
            ? Promise.resolve(cached)
            : loadActivity().then((data) => {
                  writeCache(data);
                  return data;
              });
        source
            .then((data) => {
                if (!cancelled) setState({ kind: 'ready', data });
            })
            .catch(() => {
                if (!cancelled) setState({ kind: 'error' });
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const profileLink = (
        <a
            href={`https://github.com/${USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent text-sm"
        >
            github.com/{USER} ↗
        </a>
    );

    if (state.kind === 'error') {
        return (
            <div className="panel p-6 text-sm text-muted">
                Couldn’t reach GitHub just now. The latest activity is on {profileLink}.
            </div>
        );
    }

    const data = state.kind === 'ready' ? state.data : null;
    const latest = data?.commits[0] ?? null;

    return (
        <div className="grid gap-px border border-line bg-line lg:grid-cols-[1fr_18rem]" aria-busy={!data}>
            {/* Commits */}
            <div className="bg-surface p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="label">Recent commits</p>
                    <p className="flex items-center gap-2 font-mono text-xs text-dim">
                        <span className="h-1.5 w-1.5 animate-pulse bg-ok" aria-hidden="true" />
                        {latest ? `Last push ${timeAgo(latest.date)}` : 'Live from GitHub'}
                    </p>
                </div>

                {!data ? (
                    <ul className="space-y-3" aria-label="Loading commits">
                        {Array.from({ length: 4 }, (_, i) => (
                            <li key={i} className="h-5 animate-pulse bg-elevated" />
                        ))}
                    </ul>
                ) : data.commits.length === 0 ? (
                    <p className="text-sm text-muted">No recent public commits. See {profileLink}.</p>
                ) : (
                    <ul className="divide-y divide-line border-t border-line">
                        {data.commits.map((c) => (
                            <li key={`${c.repo}-${c.sha}`} className="flex gap-4 py-3">
                                <a
                                    href={c.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 font-mono text-xs text-accent hover:underline"
                                >
                                    {c.sha}
                                </a>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm text-text" title={c.message}>
                                        {c.message}
                                    </p>
                                    <p className="mt-0.5 font-mono text-[11px] text-dim">
                                        {c.repo} · {timeAgo(c.date)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Repos */}
            <div className="bg-surface p-6">
                <p className="label mb-4">Recently active</p>
                {!data ? (
                    <ul className="space-y-3">
                        {Array.from({ length: 4 }, (_, i) => (
                            <li key={i} className="h-5 animate-pulse bg-elevated" />
                        ))}
                    </ul>
                ) : (
                    <ul className="space-y-3">
                        {data.repos.map((r) => (
                            <li key={r.name} className="flex items-baseline justify-between gap-3">
                                <a
                                    href={r.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate text-sm hover:text-accent"
                                >
                                    {r.name}
                                </a>
                                <span className="shrink-0 font-mono text-[11px] text-dim">
                                    {timeAgo(r.pushedAt)}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-6">{profileLink}</div>
            </div>
        </div>
    );
}
