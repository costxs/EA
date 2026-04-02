import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import PillButton from './PillButton';

export default function Hero() {
    const { scrollY } = useScroll();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasPlayed, setHasPlayed] = useState(false);

    // Parallax suave: o container desce um pouco
    const ovalY = useTransform(scrollY, [0, 1000], [0, 150]);

    // Efeito Premium de Scroll: O vídeo dá um leve zoom conforme o usuário desce a página
    const videoScale = useTransform(scrollY, [0, 600], [1, 1.15]);

    // A máscara oval vai sutilmente perdendo o arredondamento conforme desce
    const borderRadius = useTransform(scrollY, [0, 600], ["40% 40% 50% 50%", "15%"]);

    // D
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 10 && !hasPlayed && videoRef.current) {
            videoRef.current.play();
            setHasPlayed(true);
        }
    });

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
                <motion.div
                    className="oval-mask hero-oval"
                    style={{ y: ovalY, borderRadius: borderRadius }}
                >
                    <motion.video
                        ref={videoRef}
                        src="./assets/0306-01.mp4"
                        muted
                        playsInline
                        preload="auto"
                        title="Nature video"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            scale: videoScale
                        }}
                    />
                </motion.div>
            </motion.div>
        </header>
    );
}
