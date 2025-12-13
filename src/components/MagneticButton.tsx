'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
}

export default function MagneticButton({
    children,
    className = '',
    onClick,
    variant = 'primary',
    size = 'md',
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.3;
        const y = (clientY - (top + height / 2)) * 0.3;
        setPosition({ x, y });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const variants = {
        primary: 'bg-primary text-white hover:bg-tertiary',
        secondary: 'bg-secondary text-primary hover:bg-tertiary hover:text-white',
        outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
        gradient: 'gradient-btn text-white',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm',
        md: 'px-4 py-2 text-sm md:px-6 md:py-3 md:text-base',
        lg: 'px-5 py-2.5 text-sm md:px-8 md:py-4 md:text-lg',
    };

    return (
        <motion.button
            ref={ref}
            className={`magnetic-element rounded-full font-semibold transition-all ${variants[variant]} ${sizes[size]} ${className}`}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            onClick={onClick}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
            whileTap={{ scale: 0.95 }}
            data-magnetic
        >
            {children}
        </motion.button>
    );
}
