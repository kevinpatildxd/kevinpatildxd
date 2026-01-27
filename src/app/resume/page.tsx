'use client';

import { motion } from 'framer-motion';

const resumeData = {
    contact: {
        email: 'kevinpatil6354@gmail.com',
        phone: '+91 6354864920',
        location: 'Surat, Gujarat, India',
    },
    education: [
        {
            degree: 'B.Tech in Computer Science',
            institution: 'Uka Tarsadia University, Surat',
            date: 'Expected June 2026',
            gpa: '8.15 GPA',
        },
        {
            degree: 'Science',
            institution: 'Samithi English Medium School',
            date: 'March 2022',
        },
    ],
    certifications: [
        {
            title: 'Cybersecurity Job Simulation',
            issuer: 'Mastercard (via Forage)',
            date: 'October 2025',
        },
        {
            title: 'Cyber Job Simulation',
            issuer: 'Deloitte (via Forage)',
            date: 'October 2025',
        },
    ],
    skills: ['ReactJS', 'NextJS', 'JavaScript', 'Flutter', 'PostgreSQL', 'Firebase', 'Git', 'Socket.io'],
};

export default function ResumePage() {
    return (
        <div className="min-h-screen pt-20 md:pt-24">
            <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10 sm:mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary border border-border text-xs sm:text-sm text-text-secondary mb-3 sm:mb-4"
                        >
                            Resume
                        </motion.span>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                            My <span className="gradient-text">Resume</span>
                        </h1>
                        <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-4">
                            A comprehensive overview of my education, skills, and achievements.
                        </p>
                    </motion.div>

                    {/* Main Layout - Consistent 2:1 Grid */}
                    <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Resume Content - 2/3 */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 order-2 lg:order-1"
                        >
                            <div className="card p-6 sm:p-8 lg:p-10">
                                {/* Header */}
                                <div className="border-b border-border pb-4 sm:pb-6 mb-6 sm:mb-8">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Kevin Purushottam Patil</h2>
                                    <p className="text-accent font-semibold text-sm sm:text-base mb-3 sm:mb-4">B.Tech Computer Science Student</p>
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-text-secondary">
                                        <span className="flex items-center gap-1.5 sm:gap-2">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="truncate">{resumeData.contact.email}</span>
                                        </span>
                                        <span className="flex items-center gap-1.5 sm:gap-2">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {resumeData.contact.phone}
                                        </span>
                                        <span className="flex items-center gap-1.5 sm:gap-2">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {resumeData.contact.location}
                                        </span>
                                    </div>
                                </div>

                                {/* Professional Summary */}
                                <div className="mb-6 sm:mb-8">
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
                                        Professional Summary
                                    </h3>
                                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                                        Currently pursuing a B.Tech in Computer Science Engineering from Uka Tarsadia University.
                                        Experienced in building applications for mobile, web, and desktop environments
                                        using modern technologies including React, Next.js, Flutter, and PostgreSQL.
                                    </p>
                                </div>

                                {/* Education */}
                                <div className="mb-6 sm:mb-8">
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
                                        Education
                                    </h3>
                                    <div className="space-y-3 sm:space-y-4">
                                        {resumeData.education.map((edu, index) => (
                                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                                <div>
                                                    <p className="font-semibold text-sm sm:text-base">{edu.degree}</p>
                                                    <p className="text-accent text-xs sm:text-sm">{edu.institution}</p>
                                                    {edu.gpa && <p className="text-text-tertiary text-xs sm:text-sm">{edu.gpa}</p>}
                                                </div>
                                                <span className="text-xs sm:text-sm text-text-tertiary">{edu.date}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Certifications */}
                                <div className="mb-6 sm:mb-8">
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
                                        Certifications
                                    </h3>
                                    <div className="space-y-3 sm:space-y-4">
                                        {resumeData.certifications.map((cert, index) => (
                                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                                <div>
                                                    <p className="font-semibold text-sm sm:text-base">{cert.title}</p>
                                                    <p className="text-accent text-xs sm:text-sm">{cert.issuer}</p>
                                                </div>
                                                <span className="text-xs sm:text-sm text-text-tertiary">{cert.date}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Skills */}
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
                                        Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {resumeData.skills.map((skill) => (
                                            <span key={skill} className="tag text-xs">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar - 1/3 */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4 sm:space-y-6 order-1 lg:order-2"
                        >
                            {/* Download Card */}
                            <div className="card p-6 sm:p-8 text-center bg-gradient-to-br from-accent to-accent-secondary border-2 border-accent">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-xl sm:rounded-2xl bg-surface-elevated flex items-center justify-center mb-4 sm:mb-6">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-gray-900 dark:text-white">Download Resume</h3>
                                <p className="text-gray-700 dark:text-white/80 text-xs sm:text-sm mb-4 sm:mb-6">Get my full resume in PDF</p>
                                <motion.a
                                    href="/kevinpatildxd/kevin_resume.pdf"
                                    download="Kevin_Patil_Resume.pdf"
                                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 bg-white dark:bg-gray-900 text-accent dark:text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-lg border-2 border-white dark:border-gray-800"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                                    </svg>
                                    Download PDF
                                </motion.a>
                            </div>

                            {/* Quick Info */}
                            <div className="card p-6">
                                <h3 className="font-bold text-sm sm:text-base mb-4">Quick Info</h3>
                                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-text-tertiary">University</span>
                                        <span className="font-medium">Uka Tarsadia</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-tertiary">GPA</span>
                                        <span className="font-medium">8.15</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-tertiary">Certifications</span>
                                        <span className="font-medium">2 Active</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-tertiary">Graduation</span>
                                        <span className="font-medium text-accent">June 2026</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact CTA */}
                            <div className="card p-6 text-center">
                                <p className="text-xs sm:text-sm text-text-tertiary mb-4">Interested in working together?</p>
                                <motion.a
                                    href="mailto:kevinpatil6354@gmail.com"
                                    className="btn-primary w-full inline-flex items-center justify-center gap-2 text-sm sm:text-base py-3"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Get in Touch
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
