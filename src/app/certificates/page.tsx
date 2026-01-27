'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certificates = [
    {
        id: 1,
        title: 'Cybersecurity Job Simulation',
        issuer: 'Mastercard (via Forage)',
        date: 'October 2025',
        description: 'Completed a comprehensive cybersecurity job simulation covering security awareness, threat identification, and implementing security measures in enterprise environments.',
        badge: '🔐',
        color: 'from-orange-500 to-red-600',
    },
    {
        id: 2,
        title: 'Cyber Job Simulation',
        issuer: 'Deloitte (via Forage)',
        date: 'October 2025',
        description: 'Participated in a hands-on cyber security simulation focusing on risk assessment, vulnerability analysis, and security best practices in corporate environments.',
        badge: '🛡️',
        color: 'from-blue-500 to-indigo-600',
    },
];

export default function CertificatesPage() {
    const [selectedCert, setSelectedCert] = useState(certificates[0]);

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
                            Credentials
                        </motion.span>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                            My <span className="gradient-text">Certificates</span>
                        </h1>
                        <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-4">
                            Professional certifications and job simulations that demonstrate my skills and learning journey.
                        </p>
                    </motion.div>

                    {/* Certificates Layout */}
                    <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Certificate List */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-1 space-y-3 sm:space-y-4"
                        >
                            {certificates.map((cert, index) => (
                                <motion.button
                                    key={cert.id}
                                    onClick={() => setSelectedCert(cert)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={{ x: 5 }}
                                    className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all ${selectedCert.id === cert.id
                                            ? 'bg-gradient-to-r ' + cert.color + ' text-white shadow-lg'
                                            : 'card hover:border-border-hover'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <span className="text-2xl sm:text-3xl">{cert.badge}</span>
                                        <div className="min-w-0 flex-1">
                                            <h3 className={`font-bold text-sm sm:text-base truncate ${selectedCert.id === cert.id ? 'text-white' : ''}`}>
                                                {cert.title}
                                            </h3>
                                            <p className={`text-xs sm:text-sm truncate ${selectedCert.id === cert.id ? 'text-white/70' : 'text-text-tertiary'}`}>
                                                {cert.issuer}
                                            </p>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}

                            {/* Coming Soon */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 border-dashed border-border text-text-tertiary"
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <span className="text-2xl sm:text-3xl">🎯</span>
                                    <div>
                                        <h3 className="font-bold text-sm sm:text-base">More Coming Soon...</h3>
                                        <p className="text-xs sm:text-sm">Currently learning & growing</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Certificate Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-2"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedCert.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="card overflow-hidden h-full"
                                >
                                    {/* Certificate Visual */}
                                    <div className={`bg-gradient-to-br ${selectedCert.color} p-6 sm:p-8 md:p-12 text-center`}>
                                        <motion.span
                                            key={selectedCert.badge}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.2 }}
                                            className="text-5xl sm:text-6xl md:text-8xl block mb-4 sm:mb-6"
                                        >
                                            {selectedCert.badge}
                                        </motion.span>
                                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                                            {selectedCert.title}
                                        </h2>
                                        <p className="text-sm sm:text-base md:text-lg text-white/80">
                                            {selectedCert.issuer}
                                        </p>
                                        <p className="text-xs sm:text-sm text-white/60 mt-1 sm:mt-2">
                                            Issued: {selectedCert.date}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <div className="p-4 sm:p-6 md:p-8">
                                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4 sm:mb-6">
                                            {selectedCert.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 sm:gap-3">
                                            <motion.button
                                                className="btn-primary text-xs sm:text-sm"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                View Credential
                                            </motion.button>
                                            <motion.button
                                                className="btn-secondary text-xs sm:text-sm"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Share
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 sm:mt-12 card p-4 sm:p-6 md:p-8"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
                            <div>
                                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">Continuously Learning</h3>
                                <p className="text-xs sm:text-sm text-text-secondary max-w-2xl">
                                    I'm always expanding my knowledge through online courses, job simulations, and hands-on projects.
                                    Currently pursuing my B.Tech in Computer Science.
                                </p>
                            </div>
                            <div className="flex gap-3 sm:gap-4 w-full md:w-auto">
                                <div className="flex-1 md:flex-none text-center px-4 sm:px-6 py-3 sm:py-4 bg-secondary rounded-xl sm:rounded-2xl">
                                    <span className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text">2</span>
                                    <p className="text-[10px] sm:text-xs text-text-tertiary">Certifications</p>
                                </div>
                                <div className="flex-1 md:flex-none text-center px-4 sm:px-6 py-3 sm:py-4 bg-secondary rounded-xl sm:rounded-2xl">
                                    <span className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text">2026</span>
                                    <p className="text-[10px] sm:text-xs text-text-tertiary">Graduation</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
