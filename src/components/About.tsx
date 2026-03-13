import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

const projects = [
    {
        id: 1,
        title: "EA Saberes",
        description: "Levando consciência ambiental e sustentabilidade para formar as futuras lideranças do amanhã nas salas de aula.",
        image: "/assets/EA.jpg",
        hoverImage: "/assets/EA-hover.jpg",
        link: "/projetos/escolas"
    },
    {
        id: 2,
        title: "Conectando-se com o Ambiente",
        description: "Engajamento local em práticas sustentáveis, hortas urbanas comunitárias e valorização do meio ambiente.",
        image: "/assets/conectando.png",
        hoverImage: "/assets/conectando-hover.jpg",
        link: "/projetos/comunidade"
    },
    {
        id: 3,
        title: "Meios Digitais",
        description: "Conscientização em massa através de campanhas impactantes e conteúdo informativo totalmente digital.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
        link: "/projetos/digitais"
    }
];

export default function About() {
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
