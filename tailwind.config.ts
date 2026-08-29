import type { Config } from "tailwindcss";

/**
 * Every colour resolves through a CSS variable declared in globals.css, as
 * space-separated RGB triplets so `/<alpha-value>` keeps working. That wiring
 * is what makes `.dark` actually re-theme both the site and the terminal.
 */
const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", "system-ui", "sans-serif"],
                mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
            },
            colors: {
                bg: withOpacity("--bg"),
                surface: withOpacity("--surface"),
                elevated: withOpacity("--elevated"),
                text: withOpacity("--text"),
                muted: withOpacity("--muted"),
                dim: withOpacity("--dim"),
                line: withOpacity("--line"),
                accent: withOpacity("--accent"),
                ok: withOpacity("--ok"),
                warn: withOpacity("--warn"),
                term: {
                    bg: withOpacity("--term-bg"),
                    panel: withOpacity("--term-panel"),
                    fg: withOpacity("--term-fg"),
                    dim: withOpacity("--term-dim"),
                    accent: withOpacity("--term-accent"),
                    ok: withOpacity("--term-ok"),
                    warn: withOpacity("--term-warn"),
                    err: withOpacity("--term-err"),
                    dir: withOpacity("--term-dir"),
                    link: withOpacity("--term-link"),
                    line: withOpacity("--term-line"),
                },
            },
            borderColor: {
                DEFAULT: withOpacity("--line"),
            },
        },
    },
    plugins: [],
} satisfies Config;
