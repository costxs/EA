import { motion } from 'framer-motion';

const partners = [
    { id: 1, name: "Universidade Federal do Pará", logo: `${import.meta.env.BASE_URL}assets/ufpa-logo.png` },
    { id: 2, name: "Pró-Reitoria de Extensão", logo: `${import.meta.env.BASE_URL}assets/proex-logo.jpg` },
    { id: 3, name: "Laboratório de Inovação Interdisciplinar", logo: `${import.meta.env.BASE_URL}assets/labx.png` },
    { id: 4, name: "Laboratório de Física Industrial", logo: `${import.meta.env.BASE_URL}assets/LAFI.png` },
    { id: 5, name: "GEMAR", logo: `${import.meta.env.BASE_URL}assets/gemar.png` },
    { id: 6, name: "UFPA_SAL", logo: `${import.meta.env.BASE_URL}assets/UFPA_SAL.png` },
];

export default function Pillars() {
    return (
        <section id="parceiros" className="pillars-section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <span className="eyebrow">REDE DE APOIO</span>
                <h2>Nossos <i>Parceiros</i></h2>
            </motion.div>

            <div className="partners-grid">
                {partners.map((partner, index) => (
                    <motion.div
                        key={partner.id}
                        className="partner-card glass-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{
                            y: -10,
                            backgroundColor: "rgba(255,255,255,0.8)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                            scale: 1.05,
                            transition: { duration: 0.3 }
                        }}
                    >
                        {partner.logo ? (
                            <img src={partner.logo} alt={partner.name} title={partner.name} />
                        ) : (
                            <div className="partner-placeholder">
                                {partner.name}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
