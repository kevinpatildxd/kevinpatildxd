// Animated devguard session for the README. Every output line below is copied
// from a real devguard 3.4.3 run against a small demo app with planted issues
// (missing env key, unused + vulnerable deps, an <img> without alt, an inline
// handler). Re-run devguard and update SCRIPT when its output format changes.
import { fonts, text, textPath, measure, svgDoc, write } from './lib.mjs';

const W = 1280;
const SIZE = 15;
const LINE = 27;
const PAD_X = 40;
const TITLE_H = 46;
const TOP = TITLE_H + 38;
const CYCLE = 17; // seconds
const FADE_AT = CYCLE - 0.9;

const c = {
    bg: '#0B0B0B',
    bar: '#151515',
    border: '#2A2A2A',
    fg: '#E6E6E1',
    dim: '#77776F',
    red: '#E8241C',
};

// kind: cmd (typed), rule (section header), err, warn, plain, score, verdict, gap
const SCRIPT = [
    { kind: 'cmd', text: 'npx @kevinpatil/devguard', at: 0.4, dur: 1.1 },
    { kind: 'rule', text: 'ENV AUDIT', at: 2.0 },
    { kind: 'err', text: 'STRIPE_SECRET_KEY      Missing required key (defined in .env.example)', at: 2.25 },
    { kind: 'rule', text: 'DEPS AUDIT', at: 2.7 },
    { kind: 'err', text: 'lodash                 imported nowhere in your source files', at: 2.95 },
    { kind: 'err', text: 'lodash@4.17.21         GHSA-f23m-r3pf-42rh', at: 3.15 },
    { kind: 'err', text: 'moment@2.30.1          GHSA-4p3w-j4w9-5jqw', at: 3.35 },
    { kind: 'warn', text: 'moment                 67KB  →  consider date-fns (13KB) or dayjs (2KB)', at: 3.55 },
    { kind: 'score', text: '22 / 100', fill: 4, at: 4.1 },
    { kind: 'verdict', text: 'devguard  ›  6 error(s) — fix before deploying.', at: 4.5 },
    { kind: 'gap' },
    { kind: 'cmd', text: 'npx @kevinpatil/devguard react', at: 6.0, dur: 1.2 },
    { kind: 'rule', text: 'REACT: A11Y', at: 7.7 },
    { kind: 'warn', text: 'src/App.jsx:10         <img> is missing an alt attribute — required for screen readers', at: 7.95 },
    { kind: 'rule', text: 'REACT: RE-RENDERS', at: 8.4 },
    { kind: 'warn', text: "src/App.jsx:11         inline function in 'onClick' prop — causes re-render on every render", at: 8.65 },
    { kind: 'warn', text: "src/App.jsx:11         inline object in 'style' prop — causes re-render on every render", at: 8.85 },
];

const pct = (s) => `${((s / CYCLE) * 100).toFixed(3)}%`;
let css = '';
let n = 0;

/** Wraps markup so it appears at `at` seconds and clears just before the loop restarts. */
function appear(markup, at) {
    const id = `a${n++}`;
    css += `@keyframes ${id}{0%{opacity:0}${pct(at)}{opacity:1}${pct(FADE_AT)}{opacity:1}${pct(CYCLE - 0.3)}{opacity:0}100%{opacity:0}}`;
    css += `.${id}{animation:${id} ${CYCLE}s infinite step-end}`;
    return `<g class="${id}">${markup}</g>`;
}

function errIcon(x, y) {
    const s = SIZE * 0.36;
    const cy = y - SIZE * 0.34;
    return `<path d="M${x - s} ${cy - s}L${x + s} ${cy + s}M${x + s} ${cy - s}L${x - s} ${cy + s}" stroke="${c.red}" stroke-width="2.2" stroke-linecap="square"/>`;
}

function warnIcon(x, y) {
    const s = SIZE * 0.5;
    const base = y + 1;
    return (
        `<path d="M${x} ${base - s * 1.7}L${x + s} ${base}H${x - s}Z" fill="none" stroke="${c.fg}" stroke-width="1.6" stroke-linejoin="miter"/>` +
        `<rect x="${x - 0.9}" y="${base - s * 1.05}" width="1.8" height="${s * 0.55}" fill="${c.fg}"/>` +
        `<rect x="${x - 0.9}" y="${base - s * 0.35}" width="1.8" height="1.8" fill="${c.fg}"/>`
    );
}

function body() {
    const parts = [];
    let y = TOP;
    const indent = PAD_X + 28;

    for (const line of SCRIPT) {
        if (line.kind === 'gap') {
            y += LINE * 0.6;
            continue;
        }

        if (line.kind === 'cmd') {
            const prompt = text(fonts.mono, '$', PAD_X, y, SIZE, c.red).svg;
            const x = PAD_X + measure(fonts.mono, '$ ', SIZE);
            const { d, width } = textPath(fonts.mono, line.text, 0, 0, SIZE);
            const id = `t${n}`;
            const end = line.at + line.dur;
            css += `@keyframes ${id}{0%{transform:scaleX(0)}${pct(line.at)}{transform:scaleX(0);animation-timing-function:steps(${line.text.length},end)}${pct(end)}{transform:scaleX(1)}100%{transform:scaleX(1)}}`;
            css += `.${id}{animation:${id} ${CYCLE}s infinite}`;
            const typed =
                `<g transform="translate(${x.toFixed(1)} ${y})">` +
                `<clipPath id="${id}c"><rect class="${id}" x="0" y="${-SIZE}" width="${(width + 1).toFixed(1)}" height="${SIZE * 1.6}"/></clipPath>` +
                `<path clip-path="url(#${id}c)" fill="${c.fg}" d="${d}"/></g>`;
            parts.push(appear(prompt + typed, line.at - 0.3));
        } else if (line.kind === 'rule') {
            const label = `── ${line.text} `;
            const t = text(fonts.mono, label, PAD_X, y, SIZE, c.dim);
            const ruleX = PAD_X + t.width + 6;
            parts.push(
                appear(
                    t.svg + `<rect x="${ruleX.toFixed(1)}" y="${y - SIZE * 0.32}" width="${(W * 0.62 - ruleX).toFixed(1)}" height="1" fill="${c.dim}"/>`,
                    line.at,
                ),
            );
        } else if (line.kind === 'err' || line.kind === 'warn') {
            const icon = line.kind === 'err' ? errIcon(PAD_X + 12, y) : warnIcon(PAD_X + 12, y);
            // First column (the subject) is brighter than the message.
            const split = line.text.search(/\s{2,}/);
            const subject = line.text.slice(0, split);
            const rest = line.text.slice(split);
            const a = text(fonts.mono, subject, indent, y, SIZE, line.kind === 'err' ? c.red : c.fg);
            const b = text(fonts.mono, rest, indent + a.width, y, SIZE, c.dim);
            parts.push(appear(icon + a.svg + b.svg, line.at));
        } else if (line.kind === 'score') {
            const cells = 20;
            const cw = 11;
            const gap = 3;
            let bar = '';
            for (let i = 0; i < cells; i++) {
                const filled = i < line.fill;
                bar += `<rect x="${PAD_X + i * (cw + gap)}" y="${y - SIZE * 0.78}" width="${cw}" height="${SIZE * 0.85}" fill="${filled ? c.red : '#262626'}"/>`;
            }
            const label = text(fonts.mono, line.text, PAD_X + cells * (cw + gap) + 14, y, SIZE, c.fg);
            const hint = text(fonts.mono, 'PROJECT HEALTH SCORE', PAD_X + cells * (cw + gap) + 14 + label.width + 22, y, 12, c.dim, {
                tracking: 1.6,
            });
            parts.push(appear(bar + label.svg + hint.svg, line.at));
        } else if (line.kind === 'verdict') {
            parts.push(appear(text(fonts.mono, line.text, PAD_X, y, SIZE, c.red).svg, line.at));
        }
        y += LINE;
    }

    // Idle prompt with a blinking caret once the session has finished.
    const idle = text(fonts.mono, '$', PAD_X, y + 6, SIZE, c.red).svg +
        `<rect class="blink" x="${PAD_X + measure(fonts.mono, '$ ', SIZE)}" y="${y + 6 - SIZE * 0.8}" width="${SIZE * 0.55}" height="${SIZE}" fill="${c.fg}"/>`;
    parts.push(appear(idle, 9.4));

    return { parts, height: y + LINE + 26 };
}

const { parts, height } = body();
const H = Math.round(height);

const chrome = [
    `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="${c.bg}" stroke="${c.border}"/>`,
    `<rect x="1" y="1" width="${W - 2}" height="${TITLE_H - 1}" fill="${c.bar}"/>`,
    `<rect x="1" y="${TITLE_H}" width="${W - 2}" height="1" fill="${c.border}"/>`,
    `<rect x="${PAD_X - 18}" y="${TITLE_H / 2 - 5}" width="10" height="10" fill="${c.red}"/>`,
    text(fonts.mono, 'DEVGUARD — ~/acme-shop', PAD_X, TITLE_H / 2 + 5, 13, c.fg, { tracking: 1.8 }).svg,
    text(fonts.mono, 'v3.4.3 · REAL OUTPUT, DEMO APP', W - PAD_X, TITLE_H / 2 + 5, 12, c.dim, { tracking: 1.6, anchor: 'end' }).svg,
];

const style =
    css +
    '@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}.blink{animation:blink 1s infinite}' +
    '@media (prefers-reduced-motion:reduce){*{animation:none!important}}';

write(
    'devguard-demo.svg',
    svgDoc(W, H, 'devguard catching a missing env key, vulnerable and unused dependencies, a missing alt attribute and inline handlers in a demo app.', [...chrome, ...parts].join('\n'), style),
);
