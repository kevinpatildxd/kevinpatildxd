'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            {/* Profile Image */}
            <div className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
              <Image
                src="/kevinpatildxd/images/profile.png"
                alt="Kevin Patil"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Available for opportunities
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Kevin Patil
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-6">
              B.Tech CSE Student & Cybersecurity Enthusiast
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Currently pursuing B.Tech in Computer Science Engineering from Uka Tarsadia University.
              Passionate about building secure, scalable, and innovative digital solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  View Projects
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:border-indigo-600 dark:hover:border-indigo-400 transition-all"
                >
                  Get in Touch
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
          >
            <StatsCard label="GPA" value="8.15" />
            <StatsCard label="Projects" value="8" />
            <StatsCard label="Certifications" value="2" />
          </motion.div>

          {/* Education & Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
          >
            {/* Education Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                    Currently Studying
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Uka Tarsadia University
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    B.Tech in Computer Science and Engineering
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Expected Graduation: June 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'JavaScript', 'PostgreSQL', 'Firebase', 'Flutter', 'Socket.io', 'Git'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Explore My Work
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Check out my projects, skills, and achievements
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <QuickLinkCard
                title="Projects"
                description="View my latest work"
                icon="💻"
                href="/projects"
              />
              <QuickLinkCard
                title="Skills"
                description="Technologies I use"
                icon="🛠️"
                href="/skills"
              />
              <QuickLinkCard
                title="Certificates"
                description="My certifications"
                icon="🏆"
                href="/certificates"
              />
              <QuickLinkCard
                title="Resume"
                description="Download my CV"
                icon="📄"
                href="/resume"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatsCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-lg transition-shadow">
      <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
        {value}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
}

function QuickLinkCard({ title, description, icon, href }: { title: string; description: string; icon: string; href: string }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center cursor-pointer hover:shadow-xl transition-all group"
      >
        <span className="text-4xl mb-4 block">{icon}</span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </motion.div>
    </Link>
  );
}
