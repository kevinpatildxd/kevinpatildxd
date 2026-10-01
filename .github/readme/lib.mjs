// Shared helpers for the README SVGs. All text is outlined to paths with the
// site's fonts, because GitHub serves README SVGs as images: no webfonts load,
// and system fallbacks would render differently on every machine.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const here = path.dirname(fileURLToPath(import.meta.url));

export const fonts = {
    display: opentype.loadSync(path.join(here, 'fonts/BigShouldersDisplay-Black.ttf')),
    mono: opentype.loadSync(path.join(here, 'fonts/IBMPlexMono-Medium.ttf')),
};

export const ASSETS = path.join(here, '../assets');

// Press palette. Dark paper matches GitHub's dark canvas so banners sit flush.
export const themes = {
    light: { paper: '#FFFFFF', ink: '#000000', red: '#E8241C', grey: '#6E6E68', rule: '#D9D8D2' },
    dark: { paper: '#0D1117', ink: '#F2F1ED', red: '#E8241C', grey: '#8B8B85', rule: '#30363D' },
};

export function measure(font, str, size, tracking = 0) {
    const scale = size / font.unitsPerEm;
    const glyphs = font.stringToGlyphs(str);
    return glyphs.reduce((w, g) => w + g.advanceWidth * scale, 0) + tracking * Math.max(0, glyphs.length - 1);
}

/** Path data for a string; opentype has no letter-spacing, so glyphs are laid out by hand. */
export function textPath(font, str, x, y, size, { tracking = 0, anchor = 'start' } = {}) {
    const scale = size / font.unitsPerEm;
    const width = measure(font, str, size, tracking);
    let cx = anchor === 'end' ? x - width : anchor === 'middle' ? x - width / 2 : x;
    let d = '';
    for (const g of font.stringToGlyphs(str)) {
        d += g.getPath(cx, y, size).toPathData(1);
        cx += g.advanceWidth * scale + tracking;
    }
    return { d, width };
}

/** A filled text path; `knockout` adds a paper-coloured trap so text reads over halftone. */
export function text(font, str, x, y, size, fill, opts = {}) {
    const { d, width } = textPath(font, str, x, y, size, opts);
    const ko = opts.knockout
        ? ` stroke="${opts.knockout}" stroke-width="${opts.knockoutWidth ?? 8}" stroke-linejoin="round" paint-order="stroke"`
        : '';
    const cls = opts.className ? ` class="${opts.className}"` : '';
    return { svg: `<path${cls} fill="${fill}"${ko} d="${d}"/>`, width };
}

export function escapeXml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function svgDoc(w, h, label, body, style = '') {
    return [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escapeXml(label)}">`,
        style ? `<style>${style}</style>` : '',
        body,
        '</svg>',
        '',
    ].join('\n');
}

export function write(name, svg) {
    fs.mkdirSync(ASSETS, { recursive: true });
    fs.writeFileSync(path.join(ASSETS, name), svg);
    console.log(`wrote ${name} (${(svg.length / 1024).toFixed(1)} KB)`);
}
