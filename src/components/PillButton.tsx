import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';

export default function PillButton({ children, dark = false, href = '#' }: { children: React.ReactNode, dark?: boolean, href?: string }) {
    return (
        <motion.a
            href={href}
            className={`pill-btn ${dark ? 'light-btn' : ''}`}
            whileHover="hover"
            initial="initial"
        >
            {children}
            <motion.span
                className={`arrow-circle ${dark ? 'dark-circle' : ''}`}
                variants={{
                    initial: { x: 0, rotate: 0 },
                    hover: { x: 5, rotate: 45 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <ArrowUpRight size={18} />
            </motion.span>
        </motion.a>
    );
}
