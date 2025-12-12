'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MarqueeProps {
    children: ReactNode;
    speed?: number;
    reverse?: boolean;
    className?: string;
}

export default function Marquee({
    children,
    speed = 25,
    reverse = false,
    className = '',
}: MarqueeProps) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                className="flex gap-6 whitespace-nowrap"
                animate={{
                    x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: speed,
                        ease: 'linear',
                    },
                }}
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
}
