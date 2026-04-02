import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ setLoading }: { setLoading: (v: boolean) => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); // 2.5s simulated loading
        return () => clearTimeout(timer);
    }, [setLoading]);

    return (
        <>
            {/* Left Black Panel (Goes Up) */}
            <motion.div
                initial={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                style={{
                    position: "fixed",
                    top: "-10vh",
                    left: 0,
                    width: "60vw",
                    height: "120vh",
                    background: "#111", // Cinza/Preto super escuro
                    zIndex: 9998,
                }}
            />

            {/* Right Black Panel (Goes Down) */}
            <motion.div
                initial={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                style={{
                    position: "fixed",
                    top: "-10vh",
                    right: 0,
                    width: "60vw",
                    height: "120vh",
                    background: "#111",
                    zIndex: 9998,
                }}
            />

            {/* Centered Text */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                    position: "fixed",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                    pointerEvents: "none", // Pra não atrapalhar clicks em loading
                    padding: "0 1rem",
                    boxSizing: "border-box"
                }}
            >
                <div className="loader-text" style={{ color: "#fff", margin: 0, textAlign: "center" }}>
                    Educação Ambiental<span style={{ color: '#8c9071' }}>.</span>
                </div>
            </motion.div>
        </>
    );
}
