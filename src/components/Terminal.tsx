'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { pathString } from '@/lib/terminal/fs';
import {
    complete,
    commandNames,
    runCommand,
    RUN_EVENT,
    type Ctx,
    type Line,
} from '@/lib/terminal/commands';

const KIND_CLASS: Record<Line['kind'], string> = {
    input: 'text-term-fg',
    text: 'text-term-fg',
    ok: 'text-term-ok',
    warn: 'text-term-warn',
    err: 'text-term-err',
    dim: 'text-term-dim',
    node: 'text-term-fg',
};

/**
 * `cd` updates the URL so a path stays shareable, but only these directories
 * have a real exported route. Writing `/research` would produce a URL that 404s
 * on reload, so anything unmapped leaves the address bar alone.
 */
const ROUTE_FOR_CWD: Record<string, string> = {
    '': '/kevinpatildxd/',
    projects: '/kevinpatildxd/projects/',
    research: '/kevinpatildxd/certificates/',
};

const HISTORY_KEY = 'devguard-shell-history';
const HISTORY_MAX = 60;

/**
 * Block art needs its own tight leading - the shell's 1.65 line-height pulls
 * the rows apart - and a single colour, or the glyphs get sliced in half.
 */
const BANNER_ART = `██╗  ██╗██████╗
██║ ██╔╝██╔══██╗
█████╔╝ ██████╔╝
██╔═██╗ ██╔═══╝
██║  ██╗██║
╚═╝  ╚═╝╚═╝`;

function Banner() {
    return (
        <span className="flex flex-wrap items-center gap-x-6 gap-y-3 py-1">
            <pre className="font-mono text-[10px] leading-[1.05] text-term-accent sm:text-xs">
                {BANNER_ART}
            </pre>
            <span className="flex flex-col">
                <span className="text-term-fg">devguard shell v3.4.1</span>
                <span className="text-term-ok">Kevin Patil — Co-Founder &amp; CDO, Nudge Systems</span>
                <span className="text-term-dim">Surat, India</span>
                <span className="mt-1 text-term-dim">
                    type <span className="text-term-accent">help</span> ·{' '}
                    <span className="text-term-accent">grep &lt;term&gt;</span> · or click anything
                    underlined
                </span>
            </span>
        </span>
    );
}

const QUICK = ['devguard', 'ls projects', 'whoami', 'research', 'contact', 'help'];

let counter = 0;
const nextId = () => ++counter;

export default function Terminal({
    seed = [],
    seedPath,
    onClose,
}: {
    /** Commands run automatically on mount, so each route has an entry point. */
    seed?: string[];
    /** URL this session started at, kept in sync as you navigate. */
    seedPath?: string;
    /** When overlaid, the titlebar shows a close control instead of [theme]. */
    onClose?: () => void;
}) {
    const [lines, setLines] = useState<Line[]>([]);
    const [input, setInput] = useState('');
    const [caret, setCaret] = useState(0);
    const [cwd, setCwd] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const [busy, setBusy] = useState(true);
    const [hint, setHint] = useState<string[]>([]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    /**
     * Mirrors state the async command runner needs to read at call time.
     * Written only from handlers - never during render.
     */
    const cwdRef = useRef<string[]>([]);
    const historyRef = useRef<string[]>([]);
    const busyRef = useRef(true);

    const { toggleTheme, setTheme } = useTheme();
    const reduced = useReducedMotion();

    const push = useCallback((incoming: Array<Omit<Line, 'id'>>) => {
        setLines((prev) => [...prev, ...incoming.map((l) => ({ ...l, id: nextId() }))]);
    }, []);

    /** Append lines one at a time so scans feel like they are running. */
    const pushPaced = useCallback(
        async (incoming: Array<Omit<Line, 'id'>>) => {
            for (const line of incoming) {
                push([line]);
                if (line.pending && !reduced) {
                    await new Promise((r) => setTimeout(r, 90));
                }
            }
        },
        [push, reduced]
    );

    const execute = useCallback(
        async (raw: string, { echo = true }: { echo?: boolean } = {}) => {
            setBusy(true);
            busyRef.current = true;

            if (echo) {
                push([
                    {
                        kind: 'input',
                        node: (
                            <span>
                                <Prompt path={pathString(cwdRef.current)} />
                                <span className="text-term-fg">{raw}</span>
                            </span>
                        ),
                    },
                ]);
            }

            /*
             * Rebuilt per command rather than shared: a command like `/research`
             * changes the directory and then chains `ls`, which must see the NEW
             * cwd. A single ctx would hand the follow-up a stale snapshot.
             */
            const makeCtx = (): Ctx => ({
                cwd: cwdRef.current,
                setCwd: (next) => {
                    cwdRef.current = next;
                    setCwd(next);
                },
                clear: () => setLines([]),
                toggleTheme,
                setTheme,
                // Read from the ref so `history` is never a render behind.
                history: historyRef.current,
            });

            const result = runCommand(raw, makeCtx());
            await pushPaced(result.lines);
            for (const follow of result.then ?? []) {
                const nested = runCommand(follow, makeCtx());
                await pushPaced(nested.lines);
            }

            setBusy(false);
            busyRef.current = false;
            // The input is never disabled, so focus survives - but a click on a
            // RunLink moves it, and this brings it back.
            inputRef.current?.focus();
        },
        [push, pushPaced, toggleTheme, setTheme]
    );

    const submitCommand = useCallback(
        (raw: string) => {
            if (busyRef.current) return;
            setInput('');
            setCaret(0);
            setHint([]);
            setHistoryIndex(null);
            if (raw.trim()) {
                const next = [...historyRef.current, raw.trim()].slice(-HISTORY_MAX);
                historyRef.current = next;
                try {
                    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
                } catch {
                    // Private mode - history simply will not persist.
                }
            }
            void execute(raw);
        },
        [execute]
    );

    // Restore history from a previous visit.
    useEffect(() => {
        try {
            const saved = localStorage.getItem(HISTORY_KEY);
            if (!saved) return;
            const parsed: unknown = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                historyRef.current = parsed.filter((x): x is string => typeof x === 'string');
            }
        } catch {
            // Corrupt or blocked storage - start with an empty history.
        }
    }, []);

    // Clicking any underlined output runs the command it represents.
    useEffect(() => {
        const onRun = (e: Event) => {
            const command = (e as CustomEvent<string>).detail;
            if (typeof command === 'string') submitCommand(command);
        };
        window.addEventListener(RUN_EVENT, onRun);
        return () => window.removeEventListener(RUN_EVENT, onRun);
    }, [submitCommand]);

    // Boot sequence, plus whatever command this route seeds.
    const bootedRef = useRef(false);
    useEffect(() => {
        if (bootedRef.current) return;
        bootedRef.current = true;

        (async () => {
            await pushPaced([
                { kind: 'node', node: <Banner />, pending: true },
                { kind: 'text', text: '' },
            ]);
            for (const command of seed) {
                await execute(command);
            }
            setBusy(false);
            busyRef.current = false;
            inputRef.current?.focus();
        })();
    }, [seed, execute, pushPaced]);

    // Keep the newest output in view.
    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [lines]);

    /*
     * Reflect the working directory in the URL - but only when this terminal
     * owns the page (`seedPath` given) and only for directories that have a
     * real exported route. As an overlay it must not touch the address bar.
     */
    useEffect(() => {
        if (typeof window === 'undefined' || !seedPath) return;
        const key = cwd.join('/');
        const target = key === '' ? seedPath : ROUTE_FOR_CWD[key];
        if (target) window.history.replaceState(null, '', target);
    }, [cwd, seedPath]);

    /** Inline fish-style suggestion for the rest of the current word. */
    const ghost = (() => {
        if (!input || busy) return '';
        if (input.includes(' ')) {
            const matches = complete(input, cwd);
            if (matches.length !== 1) return '';
            return matches[0].startsWith(input) ? matches[0].slice(input.length) : '';
        }
        const match = commandNames.find((c) => c !== 'sudo' && c.startsWith(input) && c !== input);
        return match ? match.slice(input.length) : '';
    })();

    const syncCaret = () => {
        requestAnimationFrame(() => {
            setCaret(inputRef.current?.selectionStart ?? 0);
        });
    };

    const setValue = (value: string, caretAt = value.length) => {
        setInput(value);
        setCaret(caretAt);
        requestAnimationFrame(() => {
            inputRef.current?.setSelectionRange(caretAt, caretAt);
        });
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const el = e.currentTarget;
        const pos = el.selectionStart ?? input.length;

        if (e.key === 'Enter') {
            e.preventDefault();
            submitCommand(input);
            return;
        }

        if (e.key === 'Tab') {
            e.preventDefault();
            if (ghost) {
                setValue(input + ghost);
                setHint([]);
                return;
            }
            const matches = complete(input, cwd);
            if (matches.length === 1) {
                setValue(matches[0]);
                setHint([]);
            } else if (matches.length > 1) {
                setHint(matches.map((m) => m.split(/\s+/).pop() ?? m));
            }
            return;
        }

        // Accept the inline suggestion, like a real shell.
        if (e.key === 'ArrowRight' && ghost && pos === input.length) {
            e.preventDefault();
            setValue(input + ghost);
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyRef.current.length === 0) return;
            const index =
                historyIndex === null
                    ? historyRef.current.length - 1
                    : Math.max(0, historyIndex - 1);
            setHistoryIndex(index);
            setValue(historyRef.current[index]);
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex === null) return;
            const index = historyIndex + 1;
            if (index >= historyRef.current.length) {
                setHistoryIndex(null);
                setValue('');
            } else {
                setHistoryIndex(index);
                setValue(historyRef.current[index]);
            }
            return;
        }

        // Standard readline bindings.
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'l') {
                e.preventDefault();
                setLines([]);
                return;
            }
            if (e.key === 'c') {
                e.preventDefault();
                push([{ kind: 'dim', text: `${pathString(cwdRef.current)} $ ${input}^C` }]);
                setValue('');
                return;
            }
            if (e.key === 'u') {
                e.preventDefault();
                setValue(input.slice(pos), 0);
                return;
            }
            if (e.key === 'k') {
                e.preventDefault();
                setValue(input.slice(0, pos), pos);
                return;
            }
            if (e.key === 'a') {
                e.preventDefault();
                setValue(input, 0);
                return;
            }
            if (e.key === 'e') {
                e.preventDefault();
                setValue(input, input.length);
                return;
            }
            if (e.key === 'w') {
                e.preventDefault();
                const before = input.slice(0, pos).replace(/\s*\S+\s*$/, '');
                setValue(before + input.slice(pos), before.length);
                return;
            }
        }

        syncCaret();
    };

    return (
        <div
            className="term-shell"
            onClick={(e) => {
                // Never steal the selection when the visitor is copying text.
                if (window.getSelection()?.toString()) return;
                const target = e.target as HTMLElement;
                if (target.closest('a') || target.closest('button')) return;
                inputRef.current?.focus();
            }}
        >
            {/* Window chrome */}
            <div className="term-titlebar">
                <span className="flex gap-2" aria-hidden="true">
                    <i className="term-dot bg-term-err" />
                    <i className="term-dot bg-term-warn" />
                    <i className="term-dot bg-term-ok" />
                </span>
                <span className="truncate text-term-dim text-xs">
                    kevin@portfolio — {pathString(cwd)} — devguard
                </span>
                {onClose ? (
                    <button
                        onClick={onClose}
                        className="shrink-0 font-mono text-xs text-term-dim hover:text-term-accent"
                        aria-label="Close terminal"
                    >
                        [esc ✕]
                    </button>
                ) : (
                    <button
                        onClick={toggleTheme}
                        className="shrink-0 text-term-dim hover:text-term-accent text-xs"
                        aria-label="Toggle colour theme"
                    >
                        [theme]
                    </button>
                )}
            </div>

            {/* Scrollback */}
            <div
                ref={scrollRef}
                className="term-screen"
                role="log"
                aria-live="polite"
                aria-label="Terminal output"
            >
                {lines.map((line) => (
                    <div key={line.id} className={`term-line ${KIND_CLASS[line.kind]}`}>
                        {line.node ?? (line.text === '' ? ' ' : line.text)}
                    </div>
                ))}

                {hint.length > 0 && (
                    <div className="term-line text-term-dim flex flex-wrap gap-x-4">
                        {hint.map((h) => (
                            <span key={h}>{h}</span>
                        ))}
                    </div>
                )}

                {/* Prompt */}
                <div className="term-line flex items-start">
                    <Prompt path={pathString(cwd)} />
                    <span className="relative min-w-0 flex-1">
                        {/*
                          A mirror of the typed text sits under the transparent
                          input. It renders the ghost suggestion and anchors the
                          block cursor to the real caret index.
                        */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none block min-h-[1.5em] whitespace-pre-wrap break-words text-term-fg"
                        >
                            {input.slice(0, caret)}
                            <span className={`term-cursor-inline ${busy ? 'opacity-0' : ''}`} />
                            {input.slice(caret)}
                            <span className="text-term-dim">{ghost}</span>
                        </span>

                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setCaret(e.target.selectionStart ?? e.target.value.length);
                            }}
                            onKeyDown={onKeyDown}
                            onKeyUp={syncCaret}
                            onSelect={syncCaret}
                            onClick={syncCaret}
                            className="term-input"
                            aria-label="Terminal command input"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck={false}
                            enterKeyHint="go"
                            inputMode="text"
                        />
                    </span>
                </div>
            </div>

            {/* Tap targets for anyone who will not type, plus key hints. */}
            <div className="term-quickbar">
                {QUICK.map((command) => (
                    <button
                        key={command}
                        onClick={() => submitCommand(command)}
                        className="term-chip"
                    >
                        {command}
                    </button>
                ))}
            </div>

            <div className="term-statusbar">
                <span>[tab] complete</span>
                <span>[↑ ↓] history</span>
                <span>[ctrl+l] clear</span>
                <span className="text-term-accent">grep &lt;term&gt;</span>
            </div>
        </div>
    );
}

function Prompt({ path }: { path: string }) {
    return (
        <span className="shrink-0 whitespace-pre">
            <span className="text-term-ok">kevin</span>
            <span className="text-term-dim">@</span>
            <span className="text-term-accent">portfolio</span>
            <span className="text-term-dim">:</span>
            <span className="text-term-dir">{path}</span>
            <span className="text-term-dim">$ </span>
        </span>
    );
}
