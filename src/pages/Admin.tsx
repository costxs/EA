import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../hooks/useData';
import { Settings, Plus, LogOut, Trash2, Home, Newspaper, User, UploadCloud, Link } from 'lucide-react';

export default function Admin() {
    const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('ea_admin_logged_in') === 'true');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { 
        news, 
        projects, 
        addNewsToSupabase, 
        deleteNewsFromSupabase,
        addProjectToSupabase, 
        deleteProjectFromSupabase,
        uploadMediaToSupabase 
    } = useData();

    // News state
    const [newsTitle, setNewsTitle] = useState('');
    const [newsFile, setNewsFile] = useState<File | null>(null);
    const [newsLink, setNewsLink] = useState('');
    const [isUploading, setIsUploading] = useState(false);







    // Full Project unified state
    const [fullProjTitle, setFullProjTitle] = useState('');
    const [fullProjSlug, setFullProjSlug] = useState('');
    const [fullProjShortDesc, setFullProjShortDesc] = useState('');
    const [fullProjDetailedDesc, setFullProjDetailedDesc] = useState('');
    const [fullProjLogo, setFullProjLogo] = useState<File | null>(null);
    const [fullProjCoordinators, setFullProjCoordinators] = useState([{ name: '', role: '', file: null as File | null }]);
    const [fullProjMeetings, setFullProjMeetings] = useState([{ title: '', date: '', summary: '', expandedSummary: '', file: null as File | null }]);
    const [isSubmittingProject, setIsSubmittingProject] = useState(false);



    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const expectedUser = import.meta.env.VITE_ADMIN_USER || 'admin';
        const expectedPass = import.meta.env.VITE_ADMIN_PASS || 'conectando2026';

        if (username === expectedUser && password === expectedPass) {
            setLoggedIn(true);
            localStorage.setItem('ea_admin_logged_in', 'true');
        } else {
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem('ea_admin_logged_in');
    };

    const handleNewsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        try {
            const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
            const newItem = {
                date: today,
                title: newsTitle,
                category: "COMUNIDADE",
                link: newsLink,
                image: '' // Will be handled by addNewsToSupabase
            };

            await addNewsToSupabase(newItem, newsFile || undefined);

            setNewsTitle(''); setNewsFile(null); setNewsLink('');
            alert('Notícia adicionada com sucesso ao Supabase!');
        } catch (err) {
            console.error('Error adding news:', err);
            alert('Erro ao adicionar notícia. Verifique as configurações do Supabase.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteNews = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
            try {
                await deleteNewsFromSupabase(id);
            } catch (err) {
                console.error(err);
                alert('Erro ao deletar notícia.');
            }
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
            try {
                await deleteProjectFromSupabase(id);
            } catch (err) {
                console.error(err);
                alert('Erro ao deletar projeto.');
            }
        }
    };

    const handleFullProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingProject(true);
        try {
            const logoUrl = fullProjLogo ? await uploadMediaToSupabase(fullProjLogo) : '';

            const uploadedCoordinators = await Promise.all(fullProjCoordinators.map(async (c) => {
                const imageUrl = c.file ? await uploadMediaToSupabase(c.file) : '';
                return { name: c.name, role: c.role, image: imageUrl, objectPosition: "center 20%" };
            }));

            const uploadedMeetings = await Promise.all(fullProjMeetings.map(async (m, idx) => {
                const imageUrl = m.file ? await uploadMediaToSupabase(m.file) : '';
                return {
                    id: String(Date.now() + idx),
                    title: m.title,
                    date: m.date,
                    summary: m.summary,
                    expandedSummary: m.expandedSummary,
                    image: imageUrl,
                    pdfLink: '',
                    slidesIframeSrc: '',
                    slidesLink: ''
                };
            }));

            const slug = fullProjSlug || fullProjTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const newProj = {
                id: Date.now(),
                title: fullProjTitle,
                description: fullProjShortDesc,
                image: logoUrl,
                hoverImage: '',
                link: `/projetos/${slug}`,
                slug: slug,
                fullDescription: fullProjDetailedDesc,
                participants: uploadedCoordinators,
                meetings: uploadedMeetings
            };

            await addProjectToSupabase(newProj);
            alert('Projeto criado com sucesso!');

            // Reset form
            setFullProjTitle(''); setFullProjSlug(''); setFullProjShortDesc(''); setFullProjDetailedDesc('');
            setFullProjLogo(null);
            setFullProjCoordinators([{ name: '', role: '', file: null }]);
            setFullProjMeetings([{ title: '', date: '', summary: '', expandedSummary: '', file: null }]);

        } catch (err) {
            console.error(err);
            alert('Erro ao criar projeto no Supabase. Tente novamente.');
        } finally {
            setIsSubmittingProject(false);
        }
    };

    if (!loggedIn) {
        return (
            <div className="serene-login-container">
                <motion.div className="serene-login-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="serene-icon-wrapper">
                        <Settings size={40} className="serene-icon" />
                    </div>
                    <h2 className="serene-headline">Painel de Controle</h2>
                    <p className="serene-body-text">Insira suas credenciais para gerenciar a plataforma.</p>

                    <form onSubmit={handleLogin} className="serene-form">
                        <div className="serene-input-group">
                            <label className="serene-label">Usuário</label>
                            <input
                                type="text"
                                className="serene-input"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                placeholder="Digite seu usuário"
                            />
                        </div>
                        <div className="serene-input-group">
                            <label className="serene-label">Senha</label>
                            <input
                                type="password"
                                className="serene-input"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="Digite sua senha"
                            />
                        </div>

                        {error && (
                            <div className="serene-error-box">
                                {error}
                            </div>
                        )}

                        <button type="submit" className="serene-btn-primary">
                            Entrar na Plataforma
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-[#f8faef] text-[#191d16] min-h-screen flex flex-col font-sans">
            <header className="sticky top-0 z-50 bg-[#f8faef]/80 backdrop-blur-md border-b border-[#e7e9de] px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Settings className="text-[#356a1b]" size={24} />
                    <h1 className="text-lg font-semibold tracking-tight">Painel Administrativo</h1>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-1 text-[#ba1a1a] font-medium hover:bg-[#ffdad6] px-3 py-1.5 rounded-full transition-all">
                    <span className="text-sm">Sair</span>
                    <LogOut size={18} />
                </button>
            </header>

            <main className="flex-grow p-4 pb-24 space-y-6 max-w-md mx-auto w-full">
                {/* Seção Notícias */}
                <section className="bg-[#ffffff] p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#e7e9de]">
                    <h2 className="text-xl font-bold mb-6 text-[#191d16]">Adicionar Nova Notícia</h2>
                    <form onSubmit={handleNewsSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#191d16] ml-1" htmlFor="title">Legenda / Título</label>
                            <input
                                id="title"
                                type="text"
                                value={newsTitle}
                                onChange={e => setNewsTitle(e.target.value)}
                                className="w-full bg-[#f3f5ea] border border-[#c1c9b8] rounded-lg px-4 py-3 text-sm focus:ring-[#356a1b] focus:border-[#356a1b] outline-none transition-all text-[#191d16] placeholder-[#72796b]"
                                placeholder="Digite o título da notícia"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#191d16] ml-1">Foto da Notícia</label>
                            <div className="relative group">
                                <input
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                            setNewsFile(e.target.files[0]);
                                        }
                                    }}
                                    required
                                />
                                <label htmlFor="photo" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#c1c9b8] rounded-lg cursor-pointer bg-[#f3f5ea] hover:bg-[#edefe4] transition-all group-hover:border-[#356a1b]">
                                    <UploadCloud className={`mb-2 ${newsFile ? 'text-[#356a1b]' : 'text-[#72796b] group-hover:text-[#356a1b]'}`} size={32} />
                                    <span className="text-xs text-[#42493c] text-center px-4">
                                        {newsFile ? newsFile.name : 'Clique para selecionar imagem'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#191d16] ml-1" htmlFor="instagram">Link para Instagram</label>
                            <div className="relative">
                                <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-[#72796b]" size={18} />
                                <input
                                    id="instagram"
                                    type="url"
                                    value={newsLink}
                                    onChange={e => setNewsLink(e.target.value)}
                                    className="w-full bg-[#f3f5ea] border border-[#c1c9b8] rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-[#356a1b] focus:border-[#356a1b] outline-none transition-all text-[#191d16] placeholder-[#72796b]"
                                    placeholder="https://instagram.com/..."
                                    required
                                />
                            </div>
                        </div>

                        <button disabled={isUploading} type="submit" className="w-full bg-[#356a1b] hover:bg-[#2a5415] text-[#ffffff] font-semibold py-4 rounded-lg shadow-[0_4px_10px_rgba(53,106,27,0.15)] hover:shadow-[0_6px_14px_rgba(53,106,27,0.2)] flex items-center justify-center gap-2 transition-all active:translate-y-0 -translate-y-[1px] mt-2">
                            {isUploading ? <span>Enviando...</span> : <><Plus size={20} /><span>Adicionar Notícia</span></>}
                        </button>
                    </form>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-lg font-bold text-[#191d16]">Notícias Atuais</h2>
                        <span className="text-xs font-semibold text-[#72796b] uppercase tracking-wider">{news.length} itens</span>
                    </div>

                    <div className="space-y-3">
                        {news.map((item: any) => (
                            <div key={item.id} className="bg-[#ffffff] p-3 rounded-lg flex gap-4 border border-[#e7e9de] shadow-sm">
                                <img src={item.image || "https://via.placeholder.com/150"} alt="Thumbnail" className="w-20 h-20 rounded-md object-cover" />
                                <div className="flex-grow min-w-0 flex flex-col justify-between py-0.5">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-semibold truncate pr-2 text-[#191d16]">{item.title}</h3>
                                        <button 
                                            onClick={() => handleDeleteNews(item.id)}
                                            className="text-[#72796b] hover:text-[#ba1a1a] transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-[#42493c] line-clamp-2">{item.link}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] bg-[#d0ebbc] text-[#356a1b] px-2 py-0.5 rounded-full font-medium">Publicado</span>
                                        <span className="text-[10px] text-[#72796b]">{item.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {news.length === 0 && (
                            <div className="bg-[#ffffff] p-3 rounded-lg flex gap-4 border border-[#e7e9de] shadow-sm opacity-80 italic">
                                <div className="flex-grow text-center text-sm text-[#72796b] py-4">Nenhuma notícia cadastrada.</div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Seção de Criação de Projetos */}
                <section className="bg-[#ffffff] p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#e7e9de] mt-8">
                    <h2 className="text-xl font-bold mb-6 text-[#191d16]">Criar Novo Projeto</h2>

                    <form onSubmit={handleFullProjectSubmit} className="space-y-6">
                        {/* Dados Básicos */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-[#356a1b] uppercase tracking-wider border-b border-[#e7e9de] pb-2">1. Dados Básicos</h3>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#191d16] ml-1">Nome do Projeto</label>
                                <input type="text" value={fullProjTitle} onChange={e => setFullProjTitle(e.target.value)} required className="w-full bg-[#f3f5ea] border border-[#c1c9b8] rounded-lg px-4 py-3 text-sm focus:ring-[#356a1b] focus:border-[#356a1b] outline-none text-[#191d16]" placeholder="Ex: Projeto Esperança" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#191d16] ml-1">Logo do Projeto</label>
                                <div className="relative group">
                                    <input type="file" id="projLogo" accept="image/*" className="hidden" onChange={e => { if (e.target.files && e.target.files[0]) setFullProjLogo(e.target.files[0]); }} required />
                                    <label htmlFor="projLogo" className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[#c1c9b8] rounded-lg cursor-pointer bg-[#f3f5ea] hover:bg-[#edefe4] transition-all group-hover:border-[#356a1b]">
                                        <UploadCloud className={`mb-1 ${fullProjLogo ? 'text-[#356a1b]' : 'text-[#72796b] group-hover:text-[#356a1b]'}`} size={24} />
                                        <span className="text-xs text-[#42493c] text-center px-4">
                                            {fullProjLogo ? fullProjLogo.name : 'Selecionar Logo'}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#191d16] ml-1">Resumo Curto (Card)</label>
                                <textarea value={fullProjShortDesc} onChange={e => setFullProjShortDesc(e.target.value)} required rows={2} className="w-full bg-[#f3f5ea] border border-[#c1c9b8] rounded-lg px-4 py-3 text-sm focus:ring-[#356a1b] focus:border-[#356a1b] outline-none text-[#191d16]" placeholder="Uma frase para atrair as pessoas..." />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#191d16] ml-1">Resumo Detalhado (Página do Projeto)</label>
                                <textarea value={fullProjDetailedDesc} onChange={e => setFullProjDetailedDesc(e.target.value)} required rows={4} className="w-full bg-[#f3f5ea] border border-[#c1c9b8] rounded-lg px-4 py-3 text-sm focus:ring-[#356a1b] focus:border-[#356a1b] outline-none text-[#191d16]" placeholder="Detalhe as atividades do projeto aqui..." />
                            </div>
                        </div>

                        {/* Coordenadores */}
                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-end border-b border-[#e7e9de] pb-2">
                                <h3 className="text-sm font-bold text-[#356a1b] uppercase tracking-wider">2. Coordenadores</h3>
                                <button type="button" onClick={() => setFullProjCoordinators([...fullProjCoordinators, { name: '', role: '', file: null }])} className="text-xs text-[#356a1b] font-bold bg-[#d0ebbc] px-2 py-1 rounded hover:bg-[#b5d69e]">+ Adicionar</button>
                            </div>

                            {fullProjCoordinators.map((coord, idx) => (
                                <div key={idx} className="p-4 bg-[#f3f5ea] rounded-xl border border-[#c1c9b8] space-y-3 relative">
                                    {fullProjCoordinators.length > 1 && (
                                        <button type="button" onClick={() => setFullProjCoordinators(fullProjCoordinators.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-[#ba1a1a] p-1"><Trash2 size={14} /></button>
                                    )}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#42493c] ml-1">Nome</label>
                                        <input type="text" value={coord.name} onChange={e => { const newC = [...fullProjCoordinators]; newC[idx].name = e.target.value; setFullProjCoordinators(newC); }} required className="w-full bg-[#ffffff] border border-[#c1c9b8] rounded-md px-3 py-2 text-sm focus:ring-[#356a1b] outline-none" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#42493c] ml-1">Função (ex: Coordenador)</label>
                                        <input type="text" value={coord.role} onChange={e => { const newC = [...fullProjCoordinators]; newC[idx].role = e.target.value; setFullProjCoordinators(newC); }} required className="w-full bg-[#ffffff] border border-[#c1c9b8] rounded-md px-3 py-2 text-sm focus:ring-[#356a1b] outline-none" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#42493c] ml-1">Foto</label>
                                        <input type="file" accept="image/*" onChange={e => { if (e.target.files && e.target.files[0]) { const newC = [...fullProjCoordinators]; newC[idx].file = e.target.files[0]; setFullProjCoordinators(newC); } }} required className="w-full text-xs text-[#42493c] file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-[#d0ebbc] file:text-[#356a1b]" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Encontros */}
                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-end border-b border-[#e7e9de] pb-2">
                                <h3 className="text-sm font-bold text-[#356a1b] uppercase tracking-wider">3. Encontros</h3>
                                <button type="button" onClick={() => setFullProjMeetings([...fullProjMeetings, { title: '', date: '', summary: '', expandedSummary: '', file: null }])} className="text-xs text-[#356a1b] font-bold bg-[#d0ebbc] px-2 py-1 rounded hover:bg-[#b5d69e]">+ Adicionar</button>
                            </div>

                            {fullProjMeetings.map((meet, idx) => (
                                <div key={idx} className="p-4 bg-[#f3f5ea] rounded-xl border border-[#c1c9b8] space-y-3 relative">
                                    {fullProjMeetings.length > 1 && (
                                        <button type="button" onClick={() => setFullProjMeetings(fullProjMeetings.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-[#ba1a1a] p-1"><Trash2 size={14} /></button>
                                    )}
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-[#42493c] ml-1">Título</label>
                                            <input type="text" value={meet.title} onChange={e => { const newM = [...fullProjMeetings]; newM[idx].title = e.target.value; setFullProjMeetings(newM); }} required className="w-full bg-[#ffffff] border border-[#c1c9b8] rounded-md px-3 py-2 text-sm outline-none" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-[#42493c] ml-1">Data</label>
                                            <input type="text" placeholder="Ex: 01 Out." value={meet.date} onChange={e => { const newM = [...fullProjMeetings]; newM[idx].date = e.target.value; setFullProjMeetings(newM); }} required className="w-full bg-[#ffffff] border border-[#c1c9b8] rounded-md px-3 py-2 text-sm outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#42493c] ml-1">Sinopse Inicial</label>
                                        <textarea value={meet.summary} onChange={e => { const newM = [...fullProjMeetings]; newM[idx].summary = e.target.value; setFullProjMeetings(newM); }} required rows={2} className="w-full bg-[#ffffff] border border-[#c1c9b8] rounded-md px-3 py-2 text-sm outline-none" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#42493c] ml-1">Resumo Detalhado</label>
                                        <textarea value={meet.expandedSummary} onChange={e => { const newM = [...fullProjMeetings]; newM[idx].expandedSummary = e.target.value; setFullProjMeetings(newM); }} required rows={3} className="w-full bg-[#ffffff] border border-[#c1c9b8] rounded-md px-3 py-2 text-sm outline-none" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#42493c] ml-1">Imagem Capa do Encontro</label>
                                        <input type="file" accept="image/*" onChange={e => { if (e.target.files && e.target.files[0]) { const newM = [...fullProjMeetings]; newM[idx].file = e.target.files[0]; setFullProjMeetings(newM); } }} required className="w-full text-xs text-[#42493c] file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-[#d0ebbc] file:text-[#356a1b]" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button disabled={isSubmittingProject} type="submit" className="w-full bg-[#356a1b] hover:bg-[#2a5415] text-[#ffffff] font-semibold py-4 rounded-lg shadow-[0_4px_10px_rgba(53,106,27,0.15)] mt-6">
                            {isSubmittingProject ? 'Enviando Projeto...' : 'Publicar Projeto e Fazer Upload'}
                        </button>
                    </form>

                    <div className="border-t border-[#e7e9de] pt-6 mt-8">
                        <h3 className="text-sm font-bold mb-4 text-[#191d16]">Projetos Criados (Gerenciamento Local)</h3>
                        <ul className="space-y-2">
                            {projects.map((p: any, i: number) => (
                                <li key={p.id} className="flex justify-between items-center bg-[#f3f5ea] border border-[#e7e9de] p-3 rounded-lg text-sm text-[#191d16]">
                                    <span>{p.title}</span>
                                    {i >= 2 && (
                                        <button 
                                            onClick={() => handleDeleteProject(p.id)} 
                                            className="text-[#ba1a1a] hover:bg-[#ffdad6] p-1 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#ffffff]/90 backdrop-blur-lg border-t border-[#e7e9de] px-6 pt-3 pb-6 flex justify-between items-center z-50">
                <button className="flex flex-col items-center gap-1 text-[#72796b] hover:text-[#356a1b] transition-colors">
                    <Home size={24} />
                    <span className="text-[10px] font-medium">Início</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-[#356a1b] transition-colors">
                    <div className="relative">
                        <Newspaper size={24} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-[#ffffff]"></span>
                    </div>
                    <span className="text-[10px] font-bold">Notícias</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-[#72796b] hover:text-[#356a1b] transition-colors">
                    <User size={24} />
                    <span className="text-[10px] font-medium">Perfil</span>
                </button>
            </nav>
        </div>
    );
}
