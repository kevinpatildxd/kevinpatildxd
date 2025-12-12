'use client';

import { motion } from 'framer-motion';
import BentoCard from '@/components/BentoCard';
import ThemeToggle from '@/components/ThemeToggle';
import SocialButton from '@/components/SocialButton';
import MagneticButton from '@/components/MagneticButton';
import CyberTerminal from '@/components/CyberTerminal';
import FingerprintScanner from '@/components/FingerprintScanner';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Bento Grid - 4 columns x 4 rows */}
        <div className="grid grid-cols-4 grid-rows-4 gap-5 h-[calc(100vh-160px)]">

          {/* Main Visual Block - Spans 2 columns x 4 rows */}
          <BentoCard
            className="col-span-2 row-span-4 relative overflow-hidden p-0"
            delay={0}
            hover={false}
          >
            {/* Video/Image Placeholder with Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-tertiary to-secondary">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <motion.div
                  className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white/20"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.2, 0.4],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/25"
                  animate={{
                    scale: [1, 1.3, 1],
                    y: [-20, 20, -20],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </div>

            {/* Cyber Terminal Section */}
            <div className="absolute inset-0 flex flex-col">
              {/* Terminal at the top */}
              <div className="flex-1 flex items-center justify-center pt-8 px-6">
                <CyberTerminal />
              </div>

              {/* Content at the bottom */}
              <div className="p-8">
                <div className="glass rounded-3xl p-6">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-tertiary font-semibold mb-2"
                  >
                    B.Tech CSE Student & Cybersecurity Enthusiast
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-bold text-primary mb-3"
                  >
                    Kevin Patil
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-primary/70 text-sm max-w-xl leading-relaxed"
                  >
                    I am currently pursuing a B.Tech in Computer Science Engineering from Uka Tarsadia University, with a primary focus on Cybersecurity and a strong interest in software and web development. I actively work on real-world projects, continuously enhance my technical skills through hands-on development and certifications, and showcase my work through GitHub. I am a motivated learner with a passion for building secure, scalable, and innovative digital solutions while growing as a cybersecurity professional and developer.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-5 flex gap-4"
                  >
                    <Link href="/projects">
                      <MagneticButton variant="gradient" size="lg">
                        View Projects
                      </MagneticButton>
                    </Link>
                    <Link href="/about">
                      <MagneticButton variant="outline" size="lg">
                        Get in Touch
                      </MagneticButton>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Theme Toggle Card */}
          <BentoCard
            className="col-span-1 row-span-1 flex flex-col items-center justify-center"
            delay={1}
          >
            <p className="text-sm font-semibold text-primary/60 mb-4">Theme</p>
            <ThemeToggle />
          </BentoCard>

          {/* Quick Stats Card - Education */}
          <BentoCard
            className="col-span-1 row-span-1 flex flex-col justify-center"
            delay={2}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tertiary to-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-white">8.15</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">GPA</p>
                <p className="text-sm text-primary/60">B.Tech CSE</p>
              </div>
            </div>
          </BentoCard>

          {/* "How It Works" Text Card */}
          <BentoCard
            className="col-span-1 row-span-1 flex flex-col justify-between"
            delay={3}
          >
            <div>
              <p className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-2">
                Currently
              </p>
              <h3 className="text-lg font-bold text-primary leading-tight">
                Uka Tarsadia University
              </h3>
            </div>
            <p className="text-sm text-primary/60 mt-4">
              B.Tech in Computer Science and Engineering. Building applications for mobile, web, and desktop environments.
            </p>
            <div className="mt-4">
              <Link href="/about" className="text-tertiary font-semibold text-sm hover:underline">
                Learn More →
              </Link>
            </div>
          </BentoCard>

          {/* Social Media Cluster */}
          <BentoCard
            className="col-span-1 row-span-1 flex flex-col justify-center"
            delay={4}
          >
            <p className="text-sm font-semibold text-primary/60 mb-4">Connect</p>
            <div className="flex gap-3 flex-wrap">
              <SocialButton
                href="https://github.com/kevinpatildxd"
                label="GitHub"
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                }
              />
              <SocialButton
                href="https://www.linkedin.com/in/kevin-patil-1b8a75291/"
                label="LinkedIn"
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                }
              />
              <SocialButton
                href="mailto:kevinpatil6354@gmail.com"
                label="Email"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              <SocialButton
                href="tel:+916354864920"
                label="Phone"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />
            </div>
          </BentoCard>

          {/* Projects Counter Card */}
          <BentoCard
            className="col-span-1 row-span-1 gradient-card text-white overflow-hidden"
            delay={5}
            hover={false}
          >
            <Link href="/projects" className="text-center w-full h-full flex flex-col items-center justify-center -m-6 p-6">
              <motion.span
                className="text-5xl font-bold text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.7 }}
              >
                5+
              </motion.span>
              <p className="text-white/80 font-semibold mt-2">Projects</p>
              <p className="text-white/60 text-sm mt-1">View All →</p>
            </Link>
          </BentoCard>

          {/* Fingerprint Scanner Card */}
          <BentoCard
            className="col-span-1 row-span-1"
            delay={6}
          >
            <p className="text-sm font-semibold text-primary/60 mb-2 text-center">Biometric</p>
            <FingerprintScanner />
          </BentoCard>

          {/* Featured Tech Stack - spans 2 columns */}
          <BentoCard
            className="col-span-2 row-span-1"
            delay={7}
          >
            <p className="text-sm font-semibold text-primary/60 mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'JavaScript', 'PostgreSQL', 'Firebase', 'Flutter', 'Socket.io', 'Git'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="px-3 py-1.5 bg-secondary text-primary text-xs font-semibold rounded-full"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
