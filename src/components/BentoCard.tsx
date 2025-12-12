'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface BentoCardProps extends HTMLMotionProps<'div'> {
    children: ReactNode;
    className?: string;
    delay?: number;
    hover?: boolean;
}

export default function BentoCard({
    children,
    className = '',
    delay = 0,
    hover = true,
    ...props
}: BentoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: delay * 0.1,
            }}
            whileHover={
                hover
                    ? {
                        scale: 1.02,
                        y: -5,
                        transition: { type: 'spring', stiffness: 300, damping: 20 },
                    }
                    : undefined
            }
            className={`bento-card ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}
