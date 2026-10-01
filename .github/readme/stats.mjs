// Live numbers strip for the README, redrawn on a schedule by
// .github/workflows/readme-assets.yml and published to the `output` branch
// (never main - a commit to main would redeploy the portfolio every run).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fonts, themes, text, measure, svgDoc } from './lib.mjs';

const USER = 'kevinpatildxd';
const PKG = '@kevinpatil/devguard';
const OUT = process.env.OUT_DIR ?? path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');

async function json(url, init) {
    const res = await fetch(url, init);
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    return res.json();
}

async function npmStats() {
    const doc = await json(`https://registry.npmjs.org/${PKG.replace('/', '%2f')}`);
    const stable = Object.keys(doc.versions).filter((v) => !v.includes('-'));
    const year = await json(`https://api.npmjs.org/downloads/point/last-year/${PKG}`);
    return {
        version: doc['dist-tags'].latest,
        releases: stable.length,
        firstRelease: doc.time[stable[0]] ?? doc.time.created,
        downloads: year.downloads,
    };
}

async function contributions() {
    // GraphQL when a token is available (always, inside Actions)...
    if (process.env.GITHUB_TOKEN) {
        try {
            const res = await json('https://api.github.com/graphql', {
                method: 'POST',
                headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `query { user(login: "${USER}") { contributionsCollection { contributionCalendar { totalContributions } } } }`,
                }),
            });
            const total = res.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;
            if (Number.isInteger(total)) return total;
        } catch (err) {
            console.warn('graphql failed, falling back to profile page:', err.message);
        }
    }
    // ...otherwise the same figure GitHub prints on the public profile.
    const res = await fetch(`https://github.com/users/${USER}/contributions`);
    const html = await res.text();
    const match = html.match(/js-contribution-activity-description[^>]*>\s*([\d,]+)\s*contribution/);
    if (!match) throw new Error('could not read contribution count');
    return Number(match[1].replace(/,/g, ''));
}

async function lastPush() {
    const headers = process.env.GITHUB_TOKEN ? { Authorization: `bearer ${process.env.GITHUB_TOKEN}` } : {};
    const [repo] = await json(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=1`, { headers });
    return { repo: repo.name, at: repo.pushed_at };
}

// Fixed three-letter months: locale data varies by Node build ("SEP" vs "SEPT").
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const fmtMonth = (iso) => {
    const d = new Date(iso);
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};
const fmtDate = (iso) => `${String(new Date(iso).getUTCDate()).padStart(2, '0')} ${fmtMonth(iso)}`;

function card(t, cells, footer) {
    const W = 1280;
    const H = 236;
    const PAD = 64;
    const colW = (W - PAD * 2) / cells.length;
    const parts = [
        `<rect width="${W}" height="${H}" fill="${t.paper}"/>`,
        `<rect x="${PAD}" y="28" width="${W - PAD * 2}" height="2" fill="${t.ink}"/>`,
        `<rect x="${PAD}" y="${H - 58}" width="${W - PAD * 2}" height="1" fill="${t.rule}"/>`,
    ];

    cells.forEach((cell, i) => {
        const x = PAD + i * colW + (i === 0 ? 0 : 28);
        if (i > 0) parts.push(`<rect x="${PAD + i * colW}" y="30" width="1" height="${H - 88}" fill="${t.rule}"/>`);
        parts.push(text(fonts.mono, String(i + 1).padStart(2, '0'), x, 58, 13, t.red, { tracking: 1.6 }).svg);
        // Shrink long figures to fit their column.
        let size = 84;
        while (measure(fonts.display, cell.value, size, 1) > colW - 44 && size > 40) size -= 2;
        parts.push(text(fonts.display, cell.value, x, 140, size, i === 0 ? t.red : t.ink, { tracking: 1 }).svg);
        let labelSize = 12.5;
        while (measure(fonts.mono, cell.label, labelSize, 1.6) > colW - 44 && labelSize > 9) labelSize -= 0.5;
        parts.push(text(fonts.mono, cell.label, x, 166, labelSize, t.grey, { tracking: 1.6 }).svg);
    });

    parts.push(text(fonts.mono, footer.left, PAD, H - 26, 12.5, t.grey, { tracking: 1.8 }).svg);
    parts.push(text(fonts.mono, footer.right, W - PAD, H - 26, 12.5, t.grey, { tracking: 1.8, anchor: 'end' }).svg);

    const label = cells.map((c) => `${c.value} ${c.label.toLowerCase()}`).join(', ');
    return svgDoc(W, H, `Live stats: ${label}. ${footer.left.toLowerCase()}.`, parts.join('\n'));
}

const [npm, total, push] = await Promise.all([npmStats(), contributions(), lastPush()]);
const now = new Date().toISOString();

const cells = [
    { value: `v${npm.version}`, label: 'DEVGUARD, LATEST ON NPM' },
    { value: npm.downloads.toLocaleString('en-US'), label: 'NPM DOWNLOADS, 12 MONTHS' },
    { value: String(npm.releases), label: `RELEASES SINCE ${fmtMonth(npm.firstRelease)}` },
    { value: total.toLocaleString('en-US'), label: 'CONTRIBUTIONS, 12 MONTHS' },
];
const footer = {
    left: `LAST PUSH  ${push.repo.toUpperCase()}  ·  ${fmtDate(push.at)}`,
    right: `UPDATED ${fmtDate(now)}  ·  EVERY 12 HOURS`,
};

fs.mkdirSync(OUT, { recursive: true });
for (const [name, theme] of Object.entries(themes)) {
    const file = path.join(OUT, `stats-${name}.svg`);
    fs.writeFileSync(file, card(theme, cells, footer));
    console.log(`wrote ${file}`);
}
