import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, FileText, Presentation } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projectData } from './ProjectDetails';

export default function MeetingDetails() {
    const { projectId, meetingId } = useParams();
    const project = projectId ? projectData[projectId] : null;
    const meeting = project?.meetings.find((m: any) => m.id.toString() === meetingId);

    if (!project || !meeting) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-2xl text-[#333] font-serif">Encontro não encontrado!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fdfdfd] font-sans">
            <Navbar />

            <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
                <Link to={`/projetos/${projectId}`} className="inline-flex items-center text-[#555] hover:text-[#000] transition-colors mb-10 font-medium text-sm">
                    <ArrowLeft className="mr-2" size={16} />
                    Voltar aos Encontros
                </Link>

                {/* MEETING HEADER */}
                <header className="mb-14">
                    <span className="eyebrow flex items-center mb-4 text-[#777] font-semibold text-xs tracking-widest uppercase">
                        {meeting.date}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-medium text-[#333] leading-[1.15] mb-6">
                        {meeting.title}
                    </h1>
                </header>

                {/* GRAVAÇÃO DO ENCONTRO */}
                <section className="mb-20">
                    <div className="flex items-center mb-6">
                        <Play size={20} className="mr-3 text-[#333]" />
                        <h2 className="text-2xl font-semibold text-[#333]">Gravação do Encontro</h2>
                    </div>

                    {/* Placeholder Video Player */}
                    <div className="w-full aspect-video bg-gray-100 rounded-[2rem] overflow-hidden shadow-sm relative group cursor-pointer">
                        <img
                            src={meeting.image || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"}
                            alt="Video Thumbnail"
                            className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-colors duration-300">
                                <Play size={32} className="text-[#333] ml-2" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-[#f8f5f4] p-8 md:p-10 rounded-[2rem] border border-gray-100">
                        <h3 className="text-xs font-semibold text-[#555] uppercase tracking-[0.2em] mb-4">Resumo Expandido</h3>
                        <p className="text-[#555] leading-[1.8] text-[0.95rem] md:text-base font-light">
                            {meeting.summary} Neste encontro, mergulhamos nos pilares fundamentais do nosso projeto.
                            Discutimos ativamente as estratégias que moldarão as próximas fases, compartilhando materiais, experiências e delineando
                            as funções de cada membro para garantir a execução com extrema excelência.
                        </p>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* TEXTO DE APOIO */}
                    <section>
                        <div className="flex items-center mb-6">
                            <FileText size={20} className="mr-3 text-[#333]" />
                            <h2 className="text-2xl font-semibold text-[#333]">Texto de Apoio</h2>
                        </div>
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 h-full flex flex-col items-start hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                            <h4 className="font-serif text-xl italic text-[#444] mb-4 leading-tight">Material<br />de Leitura Base</h4>
                            <p className="text-[#777] leading-relaxed text-sm mb-8 font-light flex-grow">
                                Este material complementar contém toda a fundamentação teórica discutida. Ele serve como o guia primário para as dinâmicas e deve ser consultado para maior aprofundamento.
                            </p>
                            <button className="inline-flex items-center justify-center px-8 py-3.5 bg-[#3d3d3d] hover:bg-[#222] text-white text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] rounded-full transition-colors duration-300 w-full md:w-auto">
                                Baixar Arquivo PDF
                            </button>
                        </div>
                    </section>

                    {/* SLIDES */}
                    <section>
                        <div className="flex items-center mb-6">
                            <Presentation size={20} className="mr-3 text-[#333]" />
                            <h2 className="text-2xl font-semibold text-[#333]">Apresentação</h2>
                        </div>
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 h-full flex flex-col hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                            <h4 className="font-serif text-xl italic text-[#444] mb-6">Slides Utilizados</h4>

                            {/* Slides Placeholder */}
                            <div className="w-full aspect-[4/3] bg-gray-50 rounded-[1.25rem] mb-6 overflow-hidden relative group cursor-pointer border border-gray-100">
                                <img
                                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
                                    alt="Slides Cover"
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="bg-white/90 text-[#333] px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase shadow-sm opacity-100 group-hover:opacity-0 transition-opacity duration-300">Ver Apresentação</span>
                                </div>
                            </div>

                            <button className="mt-auto inline-flex items-center justify-center px-8 py-3.5 border border-[#ccc] hover:border-[#333] hover:bg-[#333] hover:text-white text-[#333] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] rounded-full transition-all duration-300 w-full md:w-auto">
                                Visualizar Completo
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
