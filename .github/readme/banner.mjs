// README masthead: KEVIN / PATIL over a red halftone plate that drifts out of
// register, with a typed status line cycling underneath. Light + dark.
import { fonts, themes, text, textPath, measure, svgDoc, write } from './lib.mjs';

const W = 1280;
const H = 420;
const PAD = 64;

// Kept specific on purpose - generic titles are what every other profile types.
const LINES = [
    'SHIPPING @KEVINPATIL/DEVGUARD ON NPM',
    'PUBLISHED: ANTI-PHISHING FRAMEWORKS, 2026',
    'BUILDING PRODUCTS AT NUDGE SYSTEMS',
];
const SLOT = 4; // seconds per line
const CYCLE = SLOT * LINES.length;
const TYPE = 1.4; // seconds spent typing
const ERASE = 0.45; // seconds spent erasing

function halftone(color) {
    // One plate at the 15° red screen angle; dot area follows a radial tone
    // that peaks off the bottom-right corner and fades out under the masthead.
    const step = 15;
    const a = (15 * Math.PI) / 180;
    const [cos, sin] = [Math.cos(a), Math.sin(a)];
    const [cx, cy, reach] = [W + 40, H + 60, 620];
    const dots = [];
    for (let u = -900; u < 900; u += step) {
        for (let v = -900; v < 900; v += step) {
            const x = cx + u * cos - v * sin;
            const y = cy + u * sin + v * cos;
            if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue;
            const t = 1 - Math.hypot(x - cx, y - cy) / reach;
            if (t <= 0.04) continue;
            const r = (step / 2) * Math.sqrt(Math.min(1, t * 1.15)) * 0.8;
            if (r < 0.6) continue;
            dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}"/>`);
        }
    }
    return `<g class="plate" fill="${color}">${dots.join('')}</g>`;
}

const pct = (s) => `${((s / CYCLE) * 100).toFixed(3)}%`;

function typedLines(t, x, y) {
    const size = 16;
    const tracking = 2.2;
    const promptW = measure(fonts.mono, '› ', size, tracking) + tracking;
    let svg = text(fonts.mono, '›', x, y, size, t.red).svg;
    let css = '';

    LINES.forEach((line, i) => {
        const { d, width } = textPath(fonts.mono, line, 0, 0, size, { tracking });
        const chars = line.length;
        const start = i * SLOT;
        const typed = start + TYPE;
        const erase = start + SLOT - ERASE;
        const end = start + SLOT;
        const stepIn = `animation-timing-function:steps(${chars},end)`;
        const stepOut = `animation-timing-function:steps(${Math.ceil(chars / 3)},end)`;

        // The clip rect and the cursor share one timeline so the caret rides the typing edge.
        const frames = (prop, from, to) =>
            `0%{${prop}:${from}}` +
            `${pct(start)}{${prop}:${from};${stepIn}}` +
            `${pct(typed)}{${prop}:${to}}` +
            `${pct(erase)}{${prop}:${to};${stepOut}}` +
            `${pct(end)}{${prop}:${from}}` +
            `100%{${prop}:${from}}`;
        css += `@keyframes clip${i}{${frames('transform', 'scaleX(0)', 'scaleX(1)')}}`;
        css += `@keyframes caret${i}{${frames('transform', 'translateX(0px)', `translateX(${width.toFixed(1)}px)`)}}`;
        css += `@keyframes show${i}{0%{opacity:0}${pct(start)}{opacity:1}${pct(end)}{opacity:0}100%{opacity:0}}`;
        css +=
            `.clip${i}{animation:clip${i} ${CYCLE}s infinite}` +
            `.caret${i}{animation:caret${i} ${CYCLE}s infinite}` +
            `.line${i}{animation:show${i} ${CYCLE}s infinite step-end}`;

        // Without motion only the first line shows, fully typed.
        const still = i === 0 ? '' : ' opacity="0"';
        svg +=
            `<g class="line${i}"${still} transform="translate(${(x + promptW).toFixed(1)} ${y})">` +
            `<clipPath id="clip${i}"><rect class="clip${i}" x="0" y="${-size}" width="${(width + 2).toFixed(1)}" height="${size * 1.6}"/></clipPath>` +
            `<path clip-path="url(#clip${i})" fill="${t.ink}" d="${d}"/>` +
            `<g class="caret${i}" transform="translate(${(width + 4).toFixed(1)} 0)"><rect class="blink" x="4" y="${-size * 0.78}" width="${size * 0.55}" height="${size * 0.95}" fill="${t.red}"/></g>` +
            `</g>`;
    });

    // Under reduced motion no animation runs, so each caret keeps its static
    // transform attribute: parked at the end of the fully typed first line.
    return { svg, css };
}

function banner(t) {
    const parts = [`<rect width="${W}" height="${H}" fill="${t.paper}"/>`, halftone(t.red)];

    const eyebrowY = PAD + 6;
    parts.push(text(fonts.mono, 'CO-FOUNDER & CDO — NUDGE SYSTEMS', PAD, eyebrowY, 17, t.ink, { tracking: 2.6 }).svg);
    parts.push(
        text(fonts.mono, 'SURAT, INDIA', W - PAD, eyebrowY, 17, t.ink, {
            tracking: 2.6,
            anchor: 'end',
            knockout: t.paper,
            knockoutWidth: 7,
        }).svg,
    );
    parts.push(`<rect x="${PAD}" y="${eyebrowY + 20}" width="${W - PAD * 2}" height="2" fill="${t.ink}"/>`);

    // Masthead sized so "KEVIN PATIL" spans the text column exactly.
    const gap = 34;
    const probe = 100;
    const probeW = measure(fonts.display, 'KEVIN', probe, 2) + measure(fonts.display, 'PATIL', probe, 2);
    const size = Math.floor((probe * (W - PAD * 2 - gap)) / probeW);
    const baseline = eyebrowY + 20 + size * 0.86;
    const first = text(fonts.display, 'KEVIN', PAD, baseline, size, t.ink, { tracking: 2 });
    parts.push(first.svg);
    parts.push(
        text(fonts.display, 'PATIL', PAD + first.width + gap, baseline, size, t.red, {
            tracking: 2,
            knockout: t.paper,
            knockoutWidth: 14,
        }).svg,
    );

    const footY = H - PAD + 8;
    parts.push(`<rect x="${PAD}" y="${footY - 30}" width="${W - PAD * 2}" height="1" fill="${t.rule}"/>`);
    const typed = typedLines(t, PAD, footY);
    parts.push(typed.svg);
    parts.push(
        text(fonts.mono, 'NO. 01', W - PAD, footY, 16, t.ink, {
            tracking: 2.2,
            anchor: 'end',
            knockout: t.paper,
            knockoutWidth: 7,
        }).svg,
    );

    const style =
        // The red plate slips a few pixels out of register and back.
        '@keyframes drift{from{transform:translate(0px,0px)}to{transform:translate(-7px,4px)}}' +
        '.plate{animation:drift 7s ease-in-out infinite alternate}' +
        '@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}' +
        '.blink{animation:blink 1s infinite}' +
        typed.css +
        '@media (prefers-reduced-motion:reduce){*{animation:none!important}}';

    return svgDoc(W, H, 'Kevin Patil — Co-Founder & CDO, Nudge Systems. Full-stack developer and cybersecurity researcher.', parts.join('\n'), style);
}

write('banner-light.svg', banner(themes.light));
write('banner-dark.svg', banner(themes.dark));
