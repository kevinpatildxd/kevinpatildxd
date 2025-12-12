'use client';

import { motion } from 'framer-motion';

interface SkillBadgeProps {
    name: string;
    icon?: string;
}

export default function SkillBadge({ name, icon }: SkillBadgeProps) {
    return (
        <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-tertiary text-white rounded-full font-semibold text-lg whitespace-nowrap"
            whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
            {icon && <span className="text-2xl">{icon}</span>}
            <span>{name}</span>
        </motion.div>
    );
}
