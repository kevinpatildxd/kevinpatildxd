import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavPill from "@/components/NavPill";
import PageTransition from "@/components/PageTransition";
import ThemeProvider from "@/components/ThemeProvider";
import AnimatedBackground from "@/components/AnimatedBackground";
import ParticlesBackground from "@/components/ParticlesBackground";
import Cursor from "@/components/Cursor";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kevin Patil | Computer Science Student & Developer",
  description: "Portfolio of Kevin Purushottam Patil - B.Tech Computer Science student at Uka Tarsadia University, specializing in React, Next.js, and full-stack development.",
  keywords: ["Kevin Patil", "developer", "portfolio", "React", "Next.js", "computer science", "Uka Tarsadia University", "Surat"],
  authors: [{ name: "Kevin Purushottam Patil" }],
  openGraph: {
    title: "Kevin Patil | Computer Science Student & Developer",
    description: "B.Tech Computer Science student passionate about building modern web applications",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} font-sans antialiased bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground min-h-screen transition-colors duration-300`}>
        <ThemeProvider>
          {/* Antigravity Fluid Cursor */}
          <Cursor />

          {/* Layer 1: Animated Gradient Blobs (furthest back) */}
          <AnimatedBackground />

          {/* Layer 2: Particles - Interactive floating dots */}
          <ParticlesBackground />

          {/* Floating Navigation */}
          <NavPill />

          {/* Main Content with Page Transitions */}
          <main className="pt-24 relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
