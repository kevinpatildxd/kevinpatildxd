'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface SocialButtonProps {
    icon: React.ReactNode;
    href: string;
    label: string;
}

export default function SocialButton({ icon, href, label }: SocialButtonProps) {
    return (
        <Link href={href} target="_blank" rel="noopener noreferrer">
            <motion.div
                className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-bento text-primary hover:bg-primary hover:text-white transition-colors magnetic-element"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                data-magnetic
                data-cursor-text={label}
            >
                {icon}
            </motion.div>
        </Link>
    );
}
