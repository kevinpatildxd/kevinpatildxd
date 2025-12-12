'use client';

import { motion } from 'framer-motion';
import BentoCard from '@/components/BentoCard';
import MagneticButton from '@/components/MagneticButton';

export default function ResumePage() {
    return (
        <div className="min-h-screen px-6 py-8">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1.5 bg-tertiary text-white text-sm font-semibold rounded-full mb-4 shadow-lg"
                    >
                        Resume
                    </motion.span>
                    <h1 className="text-5xl font-bold text-[#2D1248] dark:text-white mb-4 drop-shadow-sm">My Resume</h1>
                    <p className="text-lg text-[#4A3660] dark:text-white/70 max-w-2xl mx-auto">
                        A comprehensive overview of my education, skills, and achievements.
                    </p>
                </motion.div>

                {/* Full Height Split Layout */}
                <div className="flex gap-6 h-[calc(100vh-280px)] min-h-[600px]">
                    {/* Left Side - PDF Preview (70%) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-[70%]"
                    >
                        <BentoCard className="h-full p-0 overflow-hidden" hover={false}>
                            {/* PDF Embed */}
                            <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
                                {/* PDF Header Bar */}
                                <div className="bg-primary/10 px-6 py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                                                <path d="M14 2v6h6" />
                                            </svg>
                                        </div>
                                        <span className="font-semibold text-primary">Kevin_Patil_Resume.pdf</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href="/kevin_resume.pdf"
                                            target="_blank"
                                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                                            title="Open in new tab"
                                        >
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* PDF Content */}
                                <div className="flex-1 p-8 overflow-y-auto">
                                    <div className="bg-white rounded-xl shadow-lg max-w-[600px] mx-auto p-10">
                                        {/* Resume Header */}
                                        <div className="text-center border-b-2 border-primary pb-6 mb-6">
                                            <motion.h2
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-3xl font-bold text-primary"
                                            >
                                                Kevin Purushottam Patil
                                            </motion.h2>
                                            <p className="text-tertiary font-semibold mt-2">B.Tech Computer Science Student</p>
                                            <p className="text-sm text-primary/60 mt-2">
                                                kevinpatil6354@gmail.com • +91 6354864920 • Surat, Gujarat, India
                                            </p>
                                            <div className="flex justify-center gap-4 mt-2 text-sm text-primary/60">
                                                <a href="https://www.linkedin.com/in/kevin-patil-1b8a75291/" target="_blank" className="hover:text-tertiary transition-colors">LinkedIn</a>
                                                <span>•</span>
                                                <a href="https://github.com/kevinpatildxd" target="_blank" className="hover:text-tertiary transition-colors">GitHub</a>
                                            </div>
                                        </div>

                                        {/* Professional Summary */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-primary border-b border-secondary pb-2 mb-4">
                                                Professional Summary
                                            </h3>
                                            <p className="text-sm text-primary/70">
                                                Currently pursuing a B.Tech in Computer Science Engineering from Uka Tarsadia University.
                                                Experienced in building applications for mobile (Android, iOS), web, and desktop environments
                                                using modern technologies including React, Next.js, Flutter, and PostgreSQL.
                                            </p>
                                        </div>

                                        {/* Education Section */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-primary border-b border-secondary pb-2 mb-4">
                                                Education
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <span className="font-semibold text-primary">B.Tech in Computer Science and Engineering</span>
                                                        <span className="text-sm text-primary/60">Expected June 2026</span>
                                                    </div>
                                                    <p className="text-tertiary text-sm">Uka Tarsadia University, Surat</p>
                                                    <p className="text-sm text-primary/70 mt-1">GPA: 8.15</p>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between">
                                                        <span className="font-semibold text-primary">Science</span>
                                                        <span className="text-sm text-primary/60">March 2022</span>
                                                    </div>
                                                    <p className="text-tertiary text-sm">Samithi English Medium School, Surat</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Certifications Section */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-primary border-b border-secondary pb-2 mb-4">
                                                Certifications
                                            </h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <span className="font-semibold text-primary">Cybersecurity Job Simulation</span>
                                                        <span className="text-sm text-primary/60">October 2025</span>
                                                    </div>
                                                    <p className="text-tertiary text-sm">Mastercard (via Forage)</p>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between">
                                                        <span className="font-semibold text-primary">Cyber Job Simulation</span>
                                                        <span className="text-sm text-primary/60">October 2025</span>
                                                    </div>
                                                    <p className="text-tertiary text-sm">Deloitte (via Forage)</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skills Section */}
                                        <div>
                                            <h3 className="text-lg font-bold text-primary border-b border-secondary pb-2 mb-4">
                                                Skills
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {['ReactJS', 'NextJS', 'JavaScript', 'C', 'Flutter', 'PostgreSQL', 'Firebase', 'Git', 'VS Code', 'Socket.io'].map((skill) => (
                                                    <span key={skill} className="px-3 py-1 bg-secondary text-primary text-xs font-semibold rounded-full">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </BentoCard>
                    </motion.div>

                    {/* Right Side - Download Section (30%) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-[30%] flex flex-col gap-6"
                    >
                        {/* Download Card */}
                        <BentoCard className="flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-br from-primary to-tertiary text-white" hover={false}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.6 }}
                                className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center mb-6"
                            >
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </motion.div>

                            <h3 className="text-2xl font-bold mb-2">Download Resume</h3>
                            <p className="text-white/70 mb-6">Get a copy of my full resume in PDF format</p>

                            <a href="/kevin_resume.pdf" download="Kevin_Patil_Resume.pdf">
                                <motion.button
                                    className="px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:shadow-2xl transition-shadow magnetic-element"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    data-magnetic
                                >
                                    Download PDF
                                </motion.button>
                            </a>
                        </BentoCard>

                        {/* Quick Info Card */}
                        <BentoCard delay={5}>
                            <h3 className="font-bold text-primary mb-4">Quick Info</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-primary/60">University</span>
                                    <span className="font-semibold text-primary">Uka Tarsadia</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-primary/60">GPA</span>
                                    <span className="font-semibold text-primary">8.15</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-primary/60">Certifications</span>
                                    <span className="font-semibold text-primary">2 Active</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-primary/60">Graduation</span>
                                    <span className="font-semibold text-tertiary">June 2026</span>
                                </div>
                            </div>
                        </BentoCard>

                        {/* Contact CTA */}
                        <BentoCard delay={6} className="!p-5">
                            <p className="text-sm text-primary/60 mb-3">Interested in working together?</p>
                            <a href="mailto:kevinpatil6354@gmail.com">
                                <MagneticButton variant="gradient" className="w-full">
                                    Get in Touch
                                </MagneticButton>
                            </a>
                        </BentoCard>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
