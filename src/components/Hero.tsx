import { motion } from 'framer-motion';
import PillButton from './PillButton';

export default function Hero() {
    return (
        <header className="hero">
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 1, ease: "easeOut" }}
            >
                <h1 className="hero-title">
                    Educação <br /> <span className="italic">Ambiental</span>
                </h1>
                <p className="hero-subtitle">Cultivando consciência, plantando o futuro. Projeto de extensão acadêmica focado em reconectar a comunidade com a natureza.</p>
                <PillButton onClick={() => window.scrollBy({ top: window.innerHeight - 80, behavior: 'smooth' })}>
                    DESCUBRA
                </PillButton>
            </motion.div>

            <motion.div
                className="hero-image-wrapper"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 1.2, ease: "easeOut" }}
            >
                <div
                    className="oval-mask hero-oval"
                    style={{ willChange: 'transform' }}
                >
                    <video
                        src="./assets/0306-01.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        title="Nature video"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
            </motion.div>
        </header>
    );
}
