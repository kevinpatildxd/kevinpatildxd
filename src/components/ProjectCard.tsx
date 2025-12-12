'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    tags: string[];
    codeUrl?: string;
    liveUrl?: string;
    delay?: number;
}

export default function ProjectCard({
    title,
    description,
    image,
    tags,
    codeUrl = '#',
    liveUrl = '#',
    delay = 0,
}: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: delay * 0.15,
            }}
            whileHover={{
                scale: 1.05,
                y: -10,
            }}
            className="group bg-white rounded-bento overflow-hidden shadow-bento hover:shadow-bento-hover transition-all duration-500"
        >
            {/* Image */}
            <div className="relative h-[220px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-tertiary/20"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-tertiary text-white text-xs font-semibold rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-tertiary transition-colors">
                    {title}
                </h3>
                <p className="text-primary/70 text-sm mb-6 line-clamp-2">
                    {description}
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                    <Link
                        href={codeUrl}
                        className="flex-1 magnetic-element"
                        data-magnetic
                    >
                        <motion.span
                            className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-primary text-primary rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            Code
                        </motion.span>
                    </Link>
                    <Link
                        href={liveUrl}
                        className="flex-1 magnetic-element"
                        data-magnetic
                    >
                        <motion.span
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-tertiary text-white rounded-full text-sm font-semibold hover:from-tertiary hover:to-primary transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                        </motion.span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
