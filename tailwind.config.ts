import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            colors: {
                primary: {
                    DEFAULT: "#6366f1",
                    dark: "#4f46e5",
                },
                accent: {
                    DEFAULT: "#8b5cf6",
                    secondary: "#a78bfa",
                },
                surface: {
                    DEFAULT: "#f9fafb",
                    elevated: "#f3f4f6",
                },
                border: {
                    DEFAULT: "#e5e7eb",
                },
                text: {
                    DEFAULT: "#111827",
                    secondary: "#4b5563",
                    tertiary: "#6b7280",
                    muted: "#6b7280",
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
