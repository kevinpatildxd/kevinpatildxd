import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import TerminalOverlay from "@/components/TerminalOverlay";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://kevinpatildxd.github.io/kevinpatildxd";
const TITLE = "Kevin Patil | Full-Stack Developer & Security Researcher";
const DESCRIPTION =
  "Co-Founder & CDO at Nudge Systems. Full-stack developer working across React, Node.js, Flutter and Solidity, author of the @kevinpatil/devguard CLI on npm, and published cybersecurity researcher.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Kevin Patil",
    "Nudge Systems",
    "full-stack developer",
    "devguard",
    "cybersecurity research",
    "React",
    "Next.js",
    "Flutter",
    "Solidity",
    "Surat",
  ],
  authors: [{ name: "Kevin Purushottam Patil" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Kevin Patil",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Runs before first paint so the stored theme is applied without the
          flash the static export would otherwise show on every load.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('light');}})();`,
          }}
        />
      </head>
      <body className={`${geist.variable} ${jetbrainsMono.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider>
          <TerminalOverlay>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-accent focus:bg-surface focus:px-4 focus:py-2"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </TerminalOverlay>
        </ThemeProvider>
      </body>
    </html>
  );
}
