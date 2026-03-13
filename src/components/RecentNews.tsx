import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const newsItems = [
    {
        id: 1,
        date: "VEM AÍ - 15 Mar 2026",
        title: "Oficina de Hortas Urbanas e Tecnologias Sustentáveis",
        category: "COMUNIDADE",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=1200",
        link: "/noticias/1"
    },
    {
        id: 2,
        date: "08 Mar 2026",
        title: "O Sucesso da Semana da Água nas Escolas Brasileiras",
        category: "EDUCAÇÃO",
        image: "https://images.unsplash.com/photo-1577880216142-8549e9488dad?auto=format&fit=crop&q=80&w=800",
        link: "/noticias/2"
    },
    {
        id: 3,
        date: "28 Fev 2026",
        title: "Lançamento da Campanha 'Desperdício Zero'",
        category: "DIGITAL",
        image: "https://images.unsplash.com/photo-1532996122724-c0ecce11b816?auto=format&fit=crop&q=80&w=800",
        link: "/noticias/3"
    }
];

export default function RecentNews() {
    return (
        <section className="news-section">
            <div className="news-container">
                <div className="news-top-bar">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="eyebrow">AÇÕES E IMPACTO</span>
                        <h2>Últimas <i>atualizações</i>.</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <button className="pill-btn light-btn">
                            Ver todas as notícias
                            <span className="arrow-circle dark-circle">
                                <ArrowUpRight size={18} />
                            </span>
                        </button>
                    </motion.div>
                </div>

                <div className="news-layout">
                    {/* Featured Large Card */}
                    <motion.div
                        className="news-featured"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="news-image-wrapper">
                            <img src={newsItems[0].image} alt={newsItems[0].title} />
                            <div className="news-badge">{newsItems[0].category}</div>
                        </div>
                        <div className="news-content">
                            <div className="news-meta">
                                <Clock size={16} /> <span>{newsItems[0].date}</span>
                            </div>
                            <h3>{newsItems[0].title}</h3>
                        </div>
                    </motion.div>

                    {/* Small Cards */}
                    <div className="news-grid-small">
                        {newsItems.slice(1).map((item, index) => (
                            <motion.div
                                className="news-small-card"
                                key={item.id}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 + (index * 0.15), ease: "easeOut" }}
                            >
                                <div className="news-small-image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="news-small-content">
                                    <div className="news-meta">
                                        <span>{item.category}</span>
                                        <div className="dot"></div>
                                        <span>{item.date}</span>
                                    </div>
                                    <h4>{item.title}</h4>
                                    <Link className="read-more" to={item.link}>Ler mais <ArrowUpRight size={14} /></Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
