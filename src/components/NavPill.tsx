'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Resume', path: '/resume' },
    { name: 'About', path: '/about' },
];

export default function NavPill() {
    const pathname = usePathname();

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.2 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="glass rounded-full px-2 py-2 shadow-bento">
                <ul className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className="relative magnetic-element"
                                    data-magnetic
                                >
                                    <motion.span
                                        className={`block px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${isActive
                                                ? 'text-white'
                                                : 'text-primary hover:text-tertiary'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.name}
                                    </motion.span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 bg-gradient-to-r from-primary to-tertiary rounded-full -z-10"
                                            transition={{
                                                type: 'spring',
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </motion.nav>
    );
}
