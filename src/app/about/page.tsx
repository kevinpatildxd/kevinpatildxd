'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/kevinpatildxd',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/kevin-patil-1b8a75291/',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        ),
    },
    {
        name: 'Email',
        href: 'mailto:kevinpatil6354@gmail.com',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        name: 'Phone',
        href: 'tel:+916354864920',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
    },
];

export default function AboutPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Create mailto link with form data
        const mailtoLink = `mailto:kevinpatil6354@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;

        // Open email client
        window.location.href = mailtoLink;

        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

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
                            About & Contact
                        </motion.span>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                            Let's <span className="gradient-text">Connect</span>
                        </h1>
                        <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-4">
                            Learn more about me and get in touch for collaborations or opportunities!
                        </p>
                    </motion.div>

                    {/* Main Layout - Consistent 2:1 Grid */}
                    <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Main Content - 2/3 */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 order-2 lg:order-1"
                        >
                            <div className="card p-6 sm:p-8 lg:p-10">
                                {/* Profile Section */}
                                <div className="border-b border-border pb-6 sm:pb-8 mb-6 sm:mb-8">
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center flex-shrink-0">
                                            <span className="text-3xl sm:text-5xl">👨‍💻</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Kevin Patil</h2>
                                            <p className="text-accent font-semibold text-sm sm:text-base mb-3 sm:mb-4">B.Tech CSE Student</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="tag text-xs">🎯 Problem Solver</span>
                                                <span className="tag text-xs">💡 Creative</span>
                                                <span className="tag text-xs">🚀 Fast Learner</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="mb-6 sm:mb-8">
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
                                        About Me
                                    </h3>
                                    <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
                                        <p>
                                            Hello! I'm Kevin Purushottam Patil, currently pursuing B.Tech in Computer Science
                                            at Uka Tarsadia University, Surat. I'm passionate about building
                                            modern web and mobile applications.
                                        </p>
                                        <p>
                                            I specialize in full-stack development with React, Next.js, and Flutter. I also work
                                            with databases like PostgreSQL and Firebase, and I'm exploring blockchain development.
                                        </p>
                                        <p>
                                            Let's build something amazing together!
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="mb-6 sm:mb-8">
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
                                        Quick Stats
                                    </h3>
                                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                        {[
                                            { label: 'GPA', value: '8.15' },
                                            { label: 'Projects', value: '5+' },
                                            { label: 'Certifications', value: '2' },
                                        ].map((stat, index) => (
                                            <motion.div
                                                key={stat.label}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 + index * 0.1 }}
                                                className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 sm:p-4 text-center border-2 border-gray-200 dark:border-gray-700 flex-1 min-w-0"
                                            >
                                                <span className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text block mb-1">{stat.value}</span>
                                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
                                        Follow Me
                                    </h3>
                                    <div className="flex gap-3">
                                        {socialLinks.map((link) => (
                                            <motion.a
                                                key={link.name}
                                                href={link.href}
                                                target={link.href.startsWith('mailto') || link.href.startsWith('tel') ? undefined : '_blank'}
                                                rel="noopener noreferrer"
                                                className="p-3 rounded-xl bg-secondary border border-border hover:border-accent hover:text-accent transition-all"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                title={link.name}
                                            >
                                                {link.icon}
                                            </motion.a>
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
                            {/* Contact Form Card */}
                            <div className="card p-6 sm:p-8">
                                <h2 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Send a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="input"
                                            placeholder="Name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="input"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="input"
                                            placeholder="Subject"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={4}
                                            className="input resize-none"
                                            placeholder="Tell me about your project..."
                                            required
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary w-full py-3 inline-flex items-center justify-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </div>

                            {/* Direct Contact Card */}
                            <div className="card p-6">
                                <p className="text-text-tertiary text-xs sm:text-sm mb-4">
                                    Or reach out directly
                                </p>
                                <motion.a
                                    href="mailto:kevinpatil6354@gmail.com"
                                    className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-secondary rounded-xl text-sm font-medium hover:bg-surface-elevated transition-colors border border-border"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="truncate">kevinpatil6354@gmail.com</span>
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
