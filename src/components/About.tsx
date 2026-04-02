import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData';

const MotionLink = motion(Link);

export default function About() {
    const { projects } = useData();

    return (
        <section id="sobre" className="projects-section">
            <div className="projects-container">
                <motion.div
                    className="projects-header"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="eyebrow">NOSSO PROPÓSITO</span>
                    <h2>Nossos <i>projetos</i> em destaque.</h2>
                    <p>
                        Os <strong>projetos</strong> atuam diretamente na Educação Ambiental por meio de vivências imersivas e ações práticas, reconectando as pessoas com a essência da vida.
                    </p>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <MotionLink
                            to={project.link}
                            key={project.id}
                            className="project-card"
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                        >
                            <div className={`project-image ${project.hoverImage ? 'has-hover-img' : ''}`}>
                                <img src={project.image} alt={project.title} className="primary-img" />
                                {project.hoverImage && (
                                    <img src={project.hoverImage} alt={`${project.title} hover`} className="secondary-img" />
                                )}
                                <div className="project-hover">
                                    <div className="project-icon">
                                        <ArrowUpRight strokeWidth={1.5} size={28} />
                                    </div>
                                </div>
                            </div>
                            <div className="project-content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <span className="project-link-text">Ver detalhes do projeto</span>
                            </div>
                        </MotionLink>
                    ))}
                </div>
            </div>
        </section>
    );
}
