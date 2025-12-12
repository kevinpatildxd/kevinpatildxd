'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import BentoCard from '@/components/BentoCard';
import MagneticButton from '@/components/MagneticButton';
import SocialButton from '@/components/SocialButton';

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
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        alert('Message sent successfully!');
    };

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
                        About & Contact
                    </motion.span>
                    <h1 className="text-5xl font-bold text-[#2D1248] dark:text-white mb-4 drop-shadow-sm">Let's Connect</h1>
                    <p className="text-lg text-[#4A3660] dark:text-white/70 max-w-2xl mx-auto">
                        Learn more about me and get in touch for collaborations, opportunities, or just to say hello!
                    </p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="flex gap-8">
                    {/* Left Column - Bio & Avatar */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-1/2 space-y-6"
                    >
                        {/* Avatar Card */}
                        <BentoCard className="relative overflow-hidden" delay={0}>
                            <div className="flex items-start gap-6">
                                {/* Avatar */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', delay: 0.4 }}
                                    className="w-40 h-40 rounded-3xl bg-gradient-to-br from-primary via-tertiary to-secondary flex items-center justify-center flex-shrink-0"
                                >
                                    <span className="text-6xl">👨‍💻</span>
                                </motion.div>

                                {/* Info */}
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold text-primary mb-1">Kevin Patil</h2>
                                    <p className="text-tertiary font-semibold mb-4">B.Tech CSE Student & Developer</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-secondary text-primary text-sm font-semibold rounded-full">
                                            🎯 Problem Solver
                                        </span>
                                        <span className="px-3 py-1 bg-secondary text-primary text-sm font-semibold rounded-full">
                                            💡 Creative Thinker
                                        </span>
                                        <span className="px-3 py-1 bg-secondary text-primary text-sm font-semibold rounded-full">
                                            🚀 Fast Learner
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </BentoCard>

                        {/* Bio Card */}
                        <BentoCard delay={1}>
                            <h3 className="text-xl font-bold text-primary mb-4">About Me</h3>
                            <div className="space-y-4 text-primary/70">
                                <p>
                                    Hello! I'm Kevin Purushottam Patil, currently pursuing B.Tech in Computer Science
                                    and Engineering at Uka Tarsadia University, Surat. I'm passionate about building
                                    modern web and mobile applications using cutting-edge technologies.
                                </p>
                                <p>
                                    I specialize in full-stack development with React, Next.js, and Flutter. I enjoy
                                    working with real-time technologies like Socket.io and databases like PostgreSQL
                                    and Firebase. I'm also exploring blockchain development with Solidity.
                                </p>
                                <p>
                                    When I'm not coding, I'm learning new technologies, contributing to projects,
                                    and sharpening my skills through job simulations and certifications.
                                    Let's build something amazing together!
                                </p>
                            </div>
                        </BentoCard>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <BentoCard delay={2} className="text-center !p-5">
                                <span className="text-4xl font-bold text-primary">8.15</span>
                                <p className="text-sm text-primary/60 mt-1">GPA</p>
                            </BentoCard>
                            <BentoCard delay={3} className="text-center !p-5">
                                <span className="text-4xl font-bold text-tertiary">5+</span>
                                <p className="text-sm text-primary/60 mt-1">Projects</p>
                            </BentoCard>
                            <BentoCard delay={4} className="text-center !p-5">
                                <span className="text-4xl font-bold text-primary">2</span>
                                <p className="text-sm text-primary/60 mt-1">Certifications</p>
                            </BentoCard>
                        </div>

                        {/* Social Media */}
                        <BentoCard delay={5}>
                            <h3 className="text-lg font-bold text-primary mb-4">Follow Me</h3>
                            <div className="flex gap-3">
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
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-1/2"
                    >
                        <BentoCard className="h-full" delay={1} hover={false}>
                            <h2 className="text-2xl font-bold text-primary mb-6">Send a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name Input */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-4 bg-background rounded-2xl input-cutout text-primary font-medium placeholder:text-primary/40 focus:outline-none"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-5 py-4 bg-background rounded-2xl input-cutout text-primary font-medium placeholder:text-primary/40 focus:outline-none"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>

                                {/* Subject Input */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-primary mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-5 py-4 bg-background rounded-2xl input-cutout text-primary font-medium placeholder:text-primary/40 focus:outline-none"
                                        placeholder="Project Collaboration"
                                        required
                                    />
                                </div>

                                {/* Message Textarea */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={5}
                                        className="w-full px-5 py-4 bg-background rounded-2xl input-cutout text-primary font-medium placeholder:text-primary/40 focus:outline-none resize-none"
                                        placeholder="Tell me about your project..."
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-primary to-tertiary text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-shadow disabled:opacity-70 magnetic-element"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    data-magnetic
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Send Message
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    )}
                                </motion.button>
                            </form>

                            {/* Alternative Contact */}
                            <div className="mt-8 pt-6 border-t border-secondary">
                                <p className="text-center text-primary/60 text-sm mb-4">
                                    Or reach out directly via email
                                </p>
                                <div className="flex justify-center">
                                    <motion.a
                                        href="mailto:kevinpatil6354@gmail.com"
                                        className="flex items-center gap-2 px-6 py-3 bg-secondary text-primary rounded-full font-semibold hover:bg-tertiary hover:text-white transition-colors magnetic-element"
                                        whileHover={{ scale: 1.05 }}
                                        data-magnetic
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        kevinpatil6354@gmail.com
                                    </motion.a>
                                </div>
                            </div>
                        </BentoCard>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
