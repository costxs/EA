import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Users, Calendar, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// Dummy data for projects
export const projectData: Record<string, any> = {
    "escolas": {
        title: "EA Saberes",
        description: "Levando consciência ambiental e sustentabilidade para formar as futuras lideranças do amanhã nas salas de aula.",
        fullDescription: "O projeto EA Saberes tem como foco principal a implementação de atividades lúdicas e educacionais em escolas de ensino fundamental. Através de metodologias ativas, buscamos despertar o interesse das crianças pela preservação da natureza, desenvolvendo um pensamento crítico sobre o impacto humano no planeta.",
        image: "/assets/EA.jpg",
        heroTopText: "EDUCAÇÃO AMBIENTAL",
        heroBottomText1: "SABERES DA",
        heroBottomText2: "TRADIÇÃO",
        heroCardTitle1: "Entenda a",
        heroCardTitle2: "Abordagem",
        heroCardDescription: "A educação ambiental nas escolas é o passo fundamental para plantarmos a semente do futuro nas novas gerações.",
        participants: [
            { name: "Ana Silva", role: "Coordenadora", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" },
            { name: "Carlos Costa", role: "Educador", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80" },
            { name: "Mariana Luz", role: "Voluntária", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80" }
        ],
        meetings: [
            { id: 1, title: "Encontro 1: Introdução", date: "10 Ago", summary: "Apresentação do projeto para a comunidade escolar e engajamento inicial.", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80" },
            { id: 2, title: "Encontro 2: Oficina de Reciclagem", date: "24 Ago", summary: "Como separar resíduos e criar arte com materiais descartados.", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80" },
            { id: 3, title: "Encontro 3: Horta Vertical", date: "05 Set", summary: "Construção de uma horta vertical com garrafas PET no pátio.", image: "https://images.unsplash.com/photo-1595804564257-22792697cdbe?auto=format&fit=crop&q=80" },
            { id: 4, title: "Encontro 4: Plantio de Mudas", date: "18 Set", summary: "Plantio de árvores nativas nos arredores da escola.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" },
            { id: 5, title: "Encontro 5: Feira de Saberes", date: "02 Out", summary: "Encerramento com exposição dos trabalhos para os pais.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80" }
        ]
    },
    "comunidade": {
        title: "Conectando-se com o Ambiente",
        description: "Engajamento local em práticas sustentáveis, hortas urbanas comunitárias e valorização do meio ambiente.",
        fullDescription: "Focado em ações diretas com a comunidade, este projeto visa transformar espaços ociosos em hortas comunitárias e áreas de convívio sustentáveis, promovendo segurança alimentar e integração social.",
        image: "/assets/conectando.png",
        splineScene: "https://prod.spline.design/x6VVq9DARKWZFSB0/scene.splinecode",
        heroTopText: "CONECTANDO-SE",
        heroBottomText1: "com",
        heroBottomText2: "o Ambiente",
        heroCardTitle1: "Engajamento",
        heroCardTitle2: "Local",
        heroCardDescription: "Transformando espaços ociosos em hortas comunitárias e fortalecendo os laços das pessoas com o meio em que vivem.",
        participants: [
            { name: "Roberto Dias", role: "Líder Comunitário", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
            { name: "Fernanda Lima", role: "Engenheira Agrônoma", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80" },
            { name: "João Pedro", role: "Apoiador", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" }
        ],
        meetings: [
            { id: 1, title: "Encontro 1: Mapeamento", date: "12 Mar", summary: "Identificação das áreas potencias para intervenção.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" },
            { id: 2, title: "Encontro 2: Limpeza", date: "26 Mar", summary: "Mutirão para limpeza do terreno selecionado.", image: "https://images.unsplash.com/photo-1516934825316-291703adbb21?auto=format&fit=crop&q=80" },
            { id: 3, title: "Encontro 3: Preparo do Solo", date: "09 Abr", summary: "Oficina sobre compostagem e adubação orgânica.", image: "https://images.unsplash.com/photo-1416879598555-2572ad41c305?auto=format&fit=crop&q=80" },
            { id: 4, title: "Encontro 4: Semeadura", date: "23 Abr", summary: "Plantio das primeiras sementes e mudas.", image: "https://images.unsplash.com/photo-1592424005479-c5c58a69aedc?auto=format&fit=crop&q=80" },
            { id: 5, title: "Encontro 5: Primeira Colheita", date: "14 Mai", summary: "Celebração e distribuição dos primeiros alimentos.", image: "https://images.unsplash.com/photo-1593114569363-231a403d1547?auto=format&fit=crop&q=80" }
        ]
    },
    "digitais": {
        title: "Meios Digitais",
        description: "Conscientização em massa através de campanhas impactantes e conteúdo informativo totalmente digital.",
        fullDescription: "Usando as redes sociais e plataformas digitais como ferramentas primárias, criamos conteúdos virais e educativos sobre preservação da natureza, alcançando milhares de pessoas diariamente.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
        heroTopText: "CONHEÇA OS",
        heroBottomText1: "meios",
        heroBottomText2: "digitais",
        heroCardTitle1: "Alcance",
        heroCardTitle2: "Digital",
        heroCardDescription: "Utilizando a força das redes sociais para propagar mensagens de conscientização e impacto ambiental em larga escala.",
        participants: [
            { name: "Lucas Mendes", role: "Criador de Conteúdo", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80" },
            { name: "Sofia Castro", role: "Social Media", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80" },
            { name: "Thiago Alves", role: "Designer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" }
        ],
        meetings: [
            { id: 1, title: "Encontro 1: Brainstorming", date: "05 Jan", summary: "Definição do calendário editorial e identidade visual.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80" },
            { id: 2, title: "Encontro 2: Gravações", date: "15 Jan", summary: "Captação de vídeos para a campanha principal.", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80" },
            { id: 3, title: "Encontro 3: Edição e Revisão", date: "25 Jan", summary: "Finalização dos materiais e aprovação prévia.", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80" },
            { id: 4, title: "Encontro 4: Lançamento", date: "05 Fev", summary: "Publicação coordenada nas plataformas.", image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80" },
            { id: 5, title: "Encontro 5: Análise de Dados", date: "20 Fev", summary: "Métricas e avaliação dos resultados da campanha.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" }
        ]
    }
};

export default function ProjectDetails() {
    const { projectId } = useParams();
    const project = projectId ? projectData[projectId] : null;

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

            {/* HERO ROW - Substituído pelo código solicitado */}
            <div className="relative min-h-screen w-full bg-[#fdfdfd] overflow-hidden font-sans flex items-center justify-center">

                {/* IMAGEM CENTRAL */}
                <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-[50%] md:h-[60vh] w-auto object-contain mix-blend-multiply shadow-sm rounded-lg"
                    />
                </div>

                {/* Seta curva decorativa (SVG posicionado de forma absoluta) */}
                <svg
                    className="absolute top-[10%] left-[40%] w-[45%] h-[60%] z-0 pointer-events-none stroke-[#333]"
                    viewBox="0 0 500 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Caminho da curva: ajustado para começar no topo esquerdo e terminar no meio direito apontando para baixo */}
                    <path d="M 0 50 C 150 0, 400 50, 450 350" strokeWidth="1" strokeLinecap="round" />
                    {/* Ponta da seta */}
                    <path d="M 445 340 L 450 350 L 455 340" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {/* Texto Topo Esquerda: MEET OUR */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 pointer-events-auto">
                    <Link to="/" className="inline-flex items-center text-[#555] hover:text-[#000] transition-colors mb-4 md:mb-6 font-medium text-sm">
                        <ArrowLeft className="mr-2" size={16} />
                        Voltar
                    </Link>
                    <h1 className="text-4xl md:text-[4rem] font-medium text-[#333] tracking-tight uppercase leading-none">
                        {project.heroTopText || "MEET OUR"}
                    </h1>
                </div>

                {/* Texto Canto Inferior Direito: complete lineup */}
                <div className="absolute bottom-8 right-6 md:bottom-10 md:right-12 z-10 text-right pointer-events-none">
                    <h2 className="text-5xl md:text-[5.5rem] font-serif italic text-[#3a3a3a] leading-none tracking-tight">
                        {project.heroBottomText1 || "complete"}<br />{project.heroBottomText2 || "lineup"}
                    </h2>
                </div>

                {/* Card Flutuante Esquerda */}
                <div className="absolute left-6 md:left-12 lg:left-16 bottom-10 md:bottom-16 lg:bottom-20 z-20 w-[85%] max-w-[240px] bg-white rounded-[1.25rem] p-6 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.1)] flex flex-col justify-between pointer-events-auto">

                    <div className="mb-5">
                        {/* Título do Card */}
                        <h3 className="text-[1.35rem] md:text-[1.5rem] leading-[1.1] font-medium text-[#333] mb-3 tracking-tight">
                            {project.heroCardTitle1 || "Understand"}<br />
                            <span className="font-serif italic font-normal text-[#444]">{project.heroCardTitle2 || "Your Routine"}</span>
                        </h3>

                        {/* Parágrafo do Card */}
                        <p className="text-[#999] text-[11px] md:text-[12px] leading-[1.6] font-light">
                            {project.heroCardDescription || "Skincare is not just about the products you use, but it's also about how you use those products effectively. Head over to clean journal to read more."}
                        </p>
                    </div>

                    {/* Botão de Ação */}
                    <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="w-full bg-[#3d3d3d] hover:bg-[#222] text-white rounded-full py-3 px-5 text-[9px] md:text-[10px] font-semibold tracking-[0.2em] transition-colors duration-300 uppercase">
                        Ler Mais
                    </button>
                </div>

            </div>

            <main className="pb-16 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">

                {/* MURAL DE PARTICIPANTES */}
                <motion.section
                    className="mb-32 mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="projects-header mb-16">
                        <span className="eyebrow inline-flex items-center justify-center mb-3"><Users size={16} className="mr-2" /> DESTAQUES</span>
                        <h2>Mural de <i>Participantes</i></h2>
                    </div>
                    <div className="projects-grid">
                        {project.participants.map((person: any, idx: number) => (
                            <motion.div
                                key={idx}
                                className="project-card"
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                            >
                                <div className="project-image">
                                    <img src={person.image} alt={person.name} className="primary-img" />
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
                <section
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 bg-[#f8f5f4] p-8 md:p-12 rounded-[2.5rem] mt-16 shadow-sm border border-gray-100"
                >
                    <div className="lg:col-span-1">
                        <span className="eyebrow flex items-center mb-4 text-[#777] font-semibold text-xs tracking-widest"><Calendar size={16} className="mr-2 opacity-70" /> JORNADA</span>
                        <h2 className="text-[2.5rem] md:text-5xl font-serif font-medium text-[#333] mb-6 leading-tight">Encontros<br />Realizados</h2>
                        <p className="text-[#666] text-sm md:text-base leading-[1.7] pr-4">
                            Resumo das etapas fundamentais percorridas até aqui no projeto. Cada encontro foi crucial para os avanços e aprendizados compartilhados pelos participantes da comunidade.
                        </p>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        {project.meetings.map((meeting: any) => (
                            <Link to={`/projetos/${projectId}/encontros/${meeting.id}`} key={meeting.id} className="bg-white p-5 md:p-6 rounded-3xl flex flex-col sm:flex-row gap-5 sm:items-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group">
                                <div className="min-w-[80px] text-[1.1rem] md:text-xl font-bold text-[#333] tracking-tight shrink-0 text-left">
                                    {meeting.date}
                                </div>

                                {/* A imagem da capa adicionada com perfeição na estrutura pedida */}
                                <div className="w-full sm:w-[5.5rem] h-32 sm:h-[5.5rem] rounded-2xl overflow-hidden shrink-0">
                                    <img src={meeting.image || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"} alt={meeting.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>

                                <div className="flex-1">
                                    <h4 className="text-[1.15rem] md:text-xl font-semibold text-[#333] mb-1.5">{meeting.title}</h4>
                                    <p className="text-[#777] text-sm leading-relaxed font-light">{meeting.summary}</p>
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
