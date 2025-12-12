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
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                tertiary: "var(--tertiary)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                "card-bg": "var(--card-bg)",
                "dark-background": "#0D0D12",
                "dark-foreground": "#F5F3F7",
            },
            fontFamily: {
                sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
            },
            borderRadius: {
                bento: "30px",
            },
            animation: {
                marquee: "marquee 25s linear infinite",
                "marquee-reverse": "marquee-reverse 25s linear infinite",
                float: "float 6s ease-in-out infinite",
                pulse: "pulse 2s ease-in-out infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "marquee-reverse": {
                    "0%": { transform: "translateX(-50%)" },
                    "100%": { transform: "translateX(0%)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                pulse: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
            },
            boxShadow: {
                bento: "0 4px 20px rgba(80, 32, 122, 0.08)",
                "bento-hover": "0 20px 40px rgba(80, 32, 122, 0.15)",
                "bento-dark": "0 4px 20px rgba(0, 0, 0, 0.3)",
                "bento-dark-hover": "0 20px 40px rgba(0, 0, 0, 0.4)",
                "inset-cut": "inset 0 2px 8px rgba(80, 32, 122, 0.1)",
            },
        },
    },
    plugins: [],
} satisfies Config;
