import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import React from 'react';

export default function PillButton({ children, dark = false, onClick }: { children: React.ReactNode, dark?: boolean, onClick?: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            className={`pill-btn ${dark ? 'light-btn' : ''}`}
            whileHover="hover"
            initial="initial"
            style={{ border: 'none', cursor: 'pointer', outline: 'none', background: 'transparent', padding: 0, font: 'inherit' }}
        >
            {children}
            <motion.span
                className={`arrow-circle ${dark ? 'dark-circle' : ''}`}
                variants={{
                    initial: { y: 0, rotate: 0 },
                    hover: { y: 5, rotate: 0 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <ArrowDown size={18} />
            </motion.span>
        </motion.button>
    );
}
