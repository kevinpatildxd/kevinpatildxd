'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';

const projects: Array<{
    title: string;
    description: string;
    image: string;
    tags: string[];
    codeUrl: string;
    liveUrl: string;
}> = [
        {
            title: 'ODOO_SIGKILL_BOTS',
            description: 'A full-stack Q&A forum platform with user authentication, real-time voting, tag-based filtering, and notification system. Built with Node.js backend and Flutter frontend.',
            image: '/project-stackit.png',
            tags: ['Flutter', 'Node.js', 'PostgreSQL', 'Socket.io'],
            codeUrl: 'https://github.com/kevinpatildxd/ODOO_SIGKILL_BOTS',
            liveUrl: '#',
        },
        {
            title: 'crystal-canvas',
            description: 'A modern React web application built with Vite, TypeScript, shadcn-ui, and Tailwind CSS. Features crystal-like glass morphism design with elegant UI components.',
            image: '/project-crystal-canvas.png',
            tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
            codeUrl: 'https://github.com/kevinpatildxd/crystal-canvas',
            liveUrl: 'https://shreeradheshyam.vercel.app',
        },
        {
            title: 'Reactjs-cryptojs-Based-project',
            description: 'A collection of privacy-focused React applications using CryptoJS for AES encryption. All data is encrypted before being stored in LocalStorage for maximum security.',
            image: '/project-cryptojs.png',
            tags: ['React', 'CryptoJS', 'AES Encryption', 'JavaScript'],
            codeUrl: 'https://github.com/kevinpatildxd/Reactjs-cryptojs-Based-project',
            liveUrl: '#',
        },
        {
            title: 'smart-contract',
            description: 'A full-stack decentralized application (dApp) with Solidity smart contracts and React frontend. Features MetaMask wallet integration and Web3/Ethers.js for blockchain interactions.',
            image: '/project-smart-contract.png',
            tags: ['Solidity', 'React', 'Ethereum', 'Web3'],
            codeUrl: 'https://github.com/kevinpatildxd/smart-contract',
            liveUrl: '#',
        },
        {
            title: 'moto-link-app',
            description: 'Rider group connectivity app with low-latency voice chat (WebRTC), live GPS tracking, group management, and battery-efficient background location updates for motorcycle riders.',
            image: '/project-motolink.png',
            tags: ['Flutter', 'Dart', 'WebRTC', 'GPS'],
            codeUrl: 'https://github.com/kevinpatildxd/moto-link-app',
            liveUrl: '#',
        },
        {
            title: 'interior-design',
            description: 'A high-performance interior design portfolio website with Next.js. Features image optimization, SSR, mobile-first responsive design, and immersive visual galleries.',
            image: '/project-interior.png',
            tags: ['Next.js', 'TypeScript', 'Vercel', 'SSR'],
            codeUrl: 'https://github.com/kevinpatildxd/interior-design',
            liveUrl: 'https://interiordesign-phi-three.vercel.app',
        },
        {
            title: 'IHWP-Project',
            description: 'A responsive web project featuring interactive UI with DOM manipulation, modern CSS3 styling with Flexbox/Grid, form validation, and clean code structure following best practices.',
            image: '/project-ihwp.png',
            tags: ['JavaScript', 'HTML', 'CSS', 'DOM'],
            codeUrl: 'https://github.com/kevinpatildxd/IHWP-Project',
            liveUrl: '#',
        },
        {
            title: 'vastra',
            description: 'Premium ethnic wear e-commerce platform for Indian sarees, lehengas, and salwar kameez. Features hybrid B2B/B2C model, advanced filtering, wishlist, cart, and WhatsApp enquiry.',
            image: '/project-vastra.png',
            tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
            codeUrl: 'https://github.com/kevinpatildxd/vastra',
            liveUrl: 'https://vastra-beryl.vercel.app',
        },
        // Add more projects here
    ];

export default function ProjectsPage() {
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
                        My Work
                    </motion.span>
                    <h1 className="text-5xl font-bold text-[#2D1248] dark:text-white mb-4 drop-shadow-sm">Featured Projects</h1>
                    <p className="text-lg text-[#4A3660] dark:text-white/70 max-w-2xl mx-auto">
                        A collection of my projects showcasing full-stack development, mobile apps, and blockchain technology.
                    </p>
                </motion.div>

                {/* Projects Grid - 3 columns */}
                <div className="grid grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            {...project}
                            delay={index}
                        />
                    ))}
                </div>

                {/* GitHub CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex justify-center mt-16"
                >
                    <motion.a
                        href="https://github.com/kevinpatildxd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all magnetic-element flex items-center gap-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-magnetic
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        View All Projects on GitHub
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
}
