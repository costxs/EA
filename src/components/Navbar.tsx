import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [navGlass, setNavGlass] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setNavGlass(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent, targetId: string) => {
        if (location.pathname === '/') {
            e.preventDefault();
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="logo">EA<span>.</span></Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <ul className="nav-links" style={{ gap: '2rem', display: 'flex' }}>
                        <li><Link to="/#parceiros" onClick={(e) => handleNavClick(e, 'parceiros')}>PARCEIROS</Link></li>
                        <li><Link to="/#contato" onClick={(e) => handleNavClick(e, 'contato')}>CONTATO</Link></li>
                    </ul>
                    <Link to="/admin" title="Administração" style={{ opacity: 0.6, display: 'flex', alignItems: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
