import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [navGlass, setNavGlass] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setNavGlass(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className="navbar"
            style={{
                background: navGlass ? 'rgba(255, 255, 255, 0.8)' : 'rgba(243, 232, 231, 0.7)',
                borderBottom: navGlass ? '1px solid rgba(59, 59, 59, 0.1)' : '1px solid rgba(59, 59, 59, 0.05)'
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 2.6, duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
            <div className="nav-container">
                <a href="/" className="logo">EA<span>.</span></a>
                <ul className="nav-links">
                    <li><a href="/#sobre">SOBRE</a></li>
                    <li><a href="/#parceiros">PARCEIROS</a></li>
                    <li><a href="/#contato">CONTATO</a></li>
                </ul>
            </div>
        </motion.nav>
    );
}
