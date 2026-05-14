import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useData } from '../hooks/useData';

export default function ProjectDetails() {
    const { projectId } = useParams();
    const { projectDetails } = useData();
    const project = projectId ? projectDetails[projectId] : null;

    if (!project) {
        return (
            <div className="flex items-center justify-center min-h-screen text-2xl text-[var(--accent)] font-semibold">
                Projeto não encontrado!
            </div>
        );
    }

    return (
        <div className="project-details-page pattern-bg">
            <Navbar />

            {/* HERO ROW */}
            <div className="relative min-h-[95vh] md:min-h-screen w-full bg-[#fdfdfd] overflow-x-hidden md:overflow-hidden font-sans flex flex-col items-center justify-start md:block md:justify-center pt-32 md:pt-0">

                {/* Texto Topo Esquerda: MEET OUR */}
                <div className="w-full px-6 md:px-0 flex flex-col items-start z-10 pointer-events-auto md:absolute md:top-28 md:left-16 md:w-auto mt-4 md:mt-0">
                    <Link to="/" className="inline-flex items-center text-[#555] hover:text-[#000] transition-colors mb-4 md:mb-6 font-medium text-sm">
                        <ArrowLeft className="mr-2" size={16} />
                        Voltar
                    </Link>
                    <div className="relative inline-block">
                        <h1 className="text-4xl md:text-[4rem] font-medium text-[#333] tracking-tight uppercase leading-none">
                            {project.heroTopText || "MEET OUR"}
                        </h1>
                    </div>
                </div>

                {/* IMAGEM CENTRAL */}
                <div className="relative md:absolute md:inset-0 flex items-center justify-center z-0 pointer-events-none mt-12 md:mt-0">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-auto max-h-[35vh] md:max-h-full md:h-[60vh] w-[80%] md:w-auto object-contain mix-blend-multiply shadow-sm rounded-lg"
                    />
                </div>

                {/* Texto Canto Inferior Direito */}
                <div className="w-full px-6 flex flex-col items-end z-10 text-right pointer-events-none mt-10 md:mt-0 pb-16 md:pb-0 md:absolute md:bottom-10 md:right-12">
                    <h2 className="text-5xl md:text-[5.5rem] font-serif italic text-[#3a3a3a] leading-none tracking-tight">
                        {project.heroBottomText1 || "complete"}<br />{project.heroBottomText2 || "lineup"}
                    </h2>
                </div>

                {/* Card Flutuante Esquerda (Desktop) */}
                <div className="hidden md:flex absolute left-8 lg:left-12 bottom-8 lg:bottom-12 z-20 w-[85%] max-w-[450px] bg-white rounded-[1.25rem] p-6 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.1)] flex-col justify-between pointer-events-auto">
                    <div className="mb-4">
                        <h3 className="text-[1.5rem] leading-[1.1] font-medium text-[#333] mb-2 tracking-tight">
                            {project.heroCardTitle1 || "Understand"}<br />
                            <span className="font-serif italic font-normal text-[#444]">{project.heroCardTitle2 || "Your Routine"}</span>
                        </h3>
                        <p className="text-[#555] text-[11px] leading-[1.5] font-medium text-justify">
                            {project.heroCardDescription || "Skincare is not just about the products you use, but it's also about how you use those products effectively."}
                        </p>
                    </div>
                    <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="w-full bg-[#3d3d3d] hover:bg-[#222] text-white rounded-full py-2.5 px-5 text-[11px] font-semibold tracking-[0.2em] transition-colors duration-300 uppercase">
                        Ler Mais
                    </button>
                </div>

            </div>

            <main className="pb-16 px-4 md:px-8 max-w-[1440px] w-[95%] mx-auto min-h-screen">

                <div className="md:hidden relative z-20 w-[95%] max-w-[420px] bg-white rounded-t-[2rem] rounded-b-[1.25rem] p-6 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.08)] flex flex-col justify-between mx-auto -mt-10 mb-16">
                    <div className="mb-4">
                        <h3 className="text-[1.35rem] leading-[1.1] font-medium text-[#333] mb-2 tracking-tight">
                            {project.heroCardTitle1 || "Understand"}<br />
                            <span className="font-serif italic font-normal text-[#444]">{project.heroCardTitle2 || "Your Routine"}</span>
                        </h3>
                        <p className="text-[#555] text-[11px] leading-[1.5] font-medium text-justify">
                            {project.heroCardDescription || "Skincare is not just about the products you use."}
                        </p>
                    </div>
                    <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="w-full bg-[#3d3d3d] hover:bg-[#222] text-white rounded-full py-2.5 px-5 text-[10px] font-semibold tracking-[0.2em] transition-colors duration-300 uppercase">
                        Ler Mais
                    </button>
                </div>

                {/* MURAL DE PARTICIPANTES */}
                <motion.section
                    className="mb-32 mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="projects-header mb-16">
                        <span className="eyebrow !inline-flex items-center justify-center mb-3"><Users size={16} className="mr-2" /> DESTAQUES</span>
                        <h2>Mural da <i>Equipe de Coordenação</i></h2>
                    </div>
                    <div className="projects-grid">
                        {project.participants.map((person: any, idx: number) => (
                            <motion.div
                                key={idx}
                                className="project-card team-card"
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                            >
                                <div className="project-image">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="primary-img"
                                        style={person.objectPosition ? { objectPosition: person.objectPosition } : {}}
                                    />
                                    <div className="project-hover">
                                        <div className="project-icon">
                                            <Users strokeWidth={1.5} size={28} />
                                        </div>
                                    </div>
                                </div>
                                <div className="project-content text-left">
                                    <h3>{person.name}</h3>
                                    <p className="text-[var(--accent)] font-medium m-0">{person.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* ENCONTROS ROW */}
                <section className="flex flex-col gap-10 md:gap-14 bg-[#f8f5f4] p-8 md:p-12 xl:p-16 rounded-[2.5rem] mt-16 shadow-sm border border-gray-100">
                    <div className="w-full text-center max-w-3xl mx-auto flex flex-col items-center">
                        <span className="eyebrow !flex items-center mb-4 text-[#777] font-semibold text-xs tracking-widest"><Calendar size={16} className="mr-2 opacity-70" /> JORNADA</span>
                        <h2 className="text-[2.5rem] md:text-5xl font-serif font-medium text-[#333] mb-6 leading-tight">Encontros Realizados</h2>
                        <p className="text-[#666] text-sm md:text-base leading-[1.7]">
                            Resumo das etapas fundamentais percorridas até aqui no projeto.
                        </p>
                    </div>

                    <div className="w-full space-y-8">
                        {project.meetings.map((meeting: any) => (
                            <Link to={`/projetos/${projectId}/encontros/${meeting.id}`} key={meeting.id} className="bg-white p-6 md:p-8 lg:p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 lg:gap-12 items-start md:items-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 group">

                                {/* Container que segue o tamanho da imagem */}
                                <div className="shrink-0 rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm bg-white">
                                    <img
                                        src={meeting.image || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"}
                                        alt={meeting.title}
                                        className="w-full h-auto max-w-full md:max-w-[25rem] lg:max-w-[32rem] block group-hover:scale-[1.02] transition-transform duration-700"
                                    />
                                </div>

                                <div className="flex-1 text-left">
                                    <div className="text-[1rem] md:text-[1.2rem] font-bold text-[var(--accent)] mb-2 uppercase tracking-wider opacity-80">
                                        {meeting.date}
                                    </div>
                                    <h4 className="text-xl md:text-[1.8rem] font-bold text-[#111] mb-4 leading-tight">{meeting.title}</h4>
                                    <p className="text-[#444] text-[0.95rem] md:text-[1.1rem] leading-relaxed font-medium line-clamp-3">{meeting.summary}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
