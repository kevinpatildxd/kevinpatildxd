import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ThemeProvider from "@/components/ThemeProvider";
import PageWrapper from "@/components/PageWrapper";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
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
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <Navigation />
          <main>
            <PageWrapper>{children}</PageWrapper>
          </main>
          <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  © 2024 Kevin Patil. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                  <a
                    href="https://github.com/kevinpatildxd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kevin-patil-1b8a75291/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="mailto:kevinpatil6354@gmail.com"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
