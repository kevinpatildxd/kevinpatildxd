'use client';

import { motion } from 'framer-motion';

const projects = [
    {
        title: 'ODOO_SIGKILL_BOTS',
        description: 'A full-stack Q&A forum platform with user authentication, real-time voting, tag-based filtering, and notification system.',
        tags: ['Flutter', 'Node.js', 'PostgreSQL', 'Socket.io'],
        codeUrl: 'https://github.com/kevinpatildxd/ODOO_SIGKILL_BOTS',
    },
    {
        title: 'crystal-canvas',
        description: 'A modern React web application built with Vite, TypeScript, shadcn-ui, and Tailwind CSS with glassmorphism design.',
        tags: ['React', 'TypeScript', 'Vite', 'Tailwind'],
        codeUrl: 'https://github.com/kevinpatildxd/crystal-canvas',
    },
    {
        title: 'Reactjs-cryptojs-Based-project',
        description: 'Privacy-focused React apps using CryptoJS for AES encryption. All data encrypted before LocalStorage storage.',
        tags: ['React', 'CryptoJS', 'AES', 'JavaScript'],
        codeUrl: 'https://github.com/kevinpatildxd/Reactjs-cryptojs-Based-project',
    },
    {
        title: 'smart-contract',
        description: 'Full-stack dApp with Solidity smart contracts and React frontend. Features MetaMask wallet integration.',
        tags: ['Solidity', 'React', 'Ethereum', 'Web3'],
        codeUrl: 'https://github.com/kevinpatildxd/smart-contract',
    },
    {
        title: 'moto-link-app',
        description: 'Rider connectivity app with low-latency voice chat (WebRTC), live GPS tracking, and group management for motorcyclists.',
        tags: ['Flutter', 'Dart', 'WebRTC', 'GPS'],
        codeUrl: 'https://github.com/kevinpatildxd/moto-link-app',
    },
    {
        title: 'interior-design',
        description: 'Interior design portfolio with Next.js. Features image optimization, SSR, and mobile-first responsive design.',
        tags: ['Next.js', 'TypeScript', 'Vercel', 'SSR'],
        codeUrl: 'https://github.com/kevinpatildxd/interior-design',
    },
    {
        title: 'IHWP-Project',
        description: 'Responsive web project with interactive UI, DOM manipulation, and modern CSS3 styling with Flexbox/Grid.',
        tags: ['JavaScript', 'HTML', 'CSS', 'DOM'],
        codeUrl: 'https://github.com/kevinpatildxd/IHWP-Project',
    },
    {
        title: 'vastra',
        description: 'Premium ethnic wear e-commerce platform with hybrid B2B/B2C model, advanced filtering, and WhatsApp enquiry.',
        tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
        codeUrl: 'https://github.com/kevinpatildxd/vastra',
    },
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen pt-24">
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-block px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 mb-4">
                            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                My Work
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Featured Projects
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            A collection of my projects showcasing full-stack development, mobile apps, and blockchain technology.
                        </p>
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all group"
                            >
                                {/* Project Number */}
                                <span className="inline-block px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 font-bold text-sm mb-4">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* View Code Link */}
                                <a
                                    href={project.codeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                    View Source Code
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    {/* GitHub CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex justify-center mt-12"
                    >
                        <a
                            href="https://github.com/kevinpatildxd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            View All on GitHub
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
