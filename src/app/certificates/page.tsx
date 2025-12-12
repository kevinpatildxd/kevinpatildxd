'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoCard from '@/components/BentoCard';

const certificates = [
    {
        id: 1,
        title: 'Cybersecurity Job Simulation',
        issuer: 'Mastercard (via Forage)',
        date: 'October 2025',
        description: 'Completed a comprehensive cybersecurity job simulation covering security awareness, threat identification, and implementing security measures in enterprise environments.',
        badge: '🔐',
        color: 'from-orange-400 to-red-500',
    },
    {
        id: 2,
        title: 'Cyber Job Simulation',
        issuer: 'Deloitte (via Forage)',
        date: 'October 2025',
        description: 'Participated in a hands-on cyber security simulation focusing on risk assessment, vulnerability analysis, and security best practices in corporate environments.',
        badge: '🛡️',
        color: 'from-blue-400 to-indigo-500',
    },
];

export default function CertificatesPage() {
    const [selectedCert, setSelectedCert] = useState(certificates[0]);

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
                        Credentials
                    </motion.span>
                    <h1 className="text-5xl font-bold text-[#2D1248] dark:text-white mb-4 drop-shadow-sm">Certificates</h1>
                    <p className="text-lg text-[#4A3660] dark:text-white/70 max-w-2xl mx-auto">
                        Professional certifications and job simulations that demonstrate my skills and learning journey.
                    </p>
                </motion.div>

                {/* Split View Layout */}
                <div className="flex gap-6 h-[600px]">
                    {/* Left Side - Certificate List (30%) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-[30%] overflow-y-auto pr-2 space-y-3"
                    >
                        {certificates.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                                onClick={() => setSelectedCert(cert)}
                                className={`p-5 rounded-bento cursor-pointer transition-all magnetic-element ${selectedCert.id === cert.id
                                    ? 'bg-gradient-to-r from-primary to-tertiary text-white shadow-bento-hover'
                                    : 'bg-white text-primary hover:shadow-bento'
                                    }`}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                data-magnetic
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl">{cert.badge}</span>
                                    <div>
                                        <h3 className={`font-bold ${selectedCert.id === cert.id ? 'text-white' : 'text-primary'}`}>
                                            {cert.title}
                                        </h3>
                                        <p className={`text-sm ${selectedCert.id === cert.id ? 'text-white/70' : 'text-primary/60'}`}>
                                            {cert.issuer}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Coming Soon Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-5 rounded-bento bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 border-2 border-dashed border-gray-300"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-3xl">🎯</span>
                                <div>
                                    <h3 className="font-bold">More Coming Soon...</h3>
                                    <p className="text-sm text-gray-400">
                                        Currently learning & growing
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Preview Area (70%) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-[70%]"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCert.id}
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                <BentoCard className="h-full flex flex-col" hover={false}>
                                    {/* Certificate Preview */}
                                    <div className={`flex-1 rounded-2xl bg-gradient-to-br ${selectedCert.color} p-10 flex flex-col justify-center items-center relative overflow-hidden`}>
                                        {/* Decorative elements */}
                                        <div className="absolute top-6 left-6 w-20 h-20 border-4 border-white/20 rounded-xl" />
                                        <div className="absolute bottom-6 right-6 w-16 h-16 border-4 border-white/20 rounded-full" />
                                        <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-white/10 rounded-full" />

                                        {/* Badge */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.2 }}
                                            className="text-8xl mb-6"
                                        >
                                            {selectedCert.badge}
                                        </motion.div>

                                        {/* Certificate Title */}
                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-3xl font-bold text-white text-center mb-2"
                                        >
                                            {selectedCert.title}
                                        </motion.h2>

                                        {/* Issuer */}
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-white/80 text-lg mb-1"
                                        >
                                            {selectedCert.issuer}
                                        </motion.p>

                                        {/* Date */}
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="text-white/60"
                                        >
                                            Issued: {selectedCert.date}
                                        </motion.p>
                                    </div>

                                    {/* Description */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="mt-6"
                                    >
                                        <p className="text-primary/70 text-lg leading-relaxed">
                                            {selectedCert.description}
                                        </p>
                                        <div className="flex gap-4 mt-6">
                                            <motion.button
                                                className="px-6 py-3 bg-gradient-to-r from-primary to-tertiary text-white rounded-full font-semibold magnetic-element"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                data-magnetic
                                            >
                                                View Credential
                                            </motion.button>
                                            <motion.button
                                                className="px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors magnetic-element"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                data-magnetic
                                            >
                                                Share
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </BentoCard>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Additional Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12"
                >
                    <BentoCard className="p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-primary mb-2">Continuously Learning</h3>
                                <p className="text-primary/70 max-w-2xl">
                                    I'm always expanding my knowledge through online courses, job simulations, and hands-on projects.
                                    Currently pursuing my B.Tech in Computer Science with a focus on full-stack development and cybersecurity.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-center px-6 py-4 bg-secondary rounded-2xl">
                                    <span className="text-3xl font-bold text-primary">2</span>
                                    <p className="text-sm text-primary/60">Certifications</p>
                                </div>
                                <div className="text-center px-6 py-4 bg-secondary rounded-2xl">
                                    <span className="text-3xl font-bold text-tertiary">2026</span>
                                    <p className="text-sm text-primary/60">Expected Graduation</p>
                                </div>
                            </div>
                        </div>
                    </BentoCard>
                </motion.div>
            </div>
        </div>
    );
}
