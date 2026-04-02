import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../hooks/useData';
import { Settings, Plus, LogOut, Trash2 } from 'lucide-react';

const extractDriveId = (url: string) => {
    const match = url.match(/\/d\/(.*?)\//) || url.match(/id=(.*?)(&|$)/);
    return match ? match[1] : url;
};

const getDriveDirectUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
        const id = extractDriveId(url);
        return `https://drive.google.com/uc?id=${id}`;
    }
    return url;
};

export default function Admin() {
    const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('ea_admin_logged_in') === 'true');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { news, projects, projectDetails, addNews, addProject, deleteProject, updateProjectParticipants, updateProjectMeetings } = useData();

    // News state
    const [newsTitle, setNewsTitle] = useState('');
    const [newsImage, setNewsImage] = useState('');
    const [newsLink, setNewsLink] = useState('');

    // Project state
    const [projTitle, setProjTitle] = useState('');
    const [projSlug, setProjSlug] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const [projImage, setProjImage] = useState('');

    // Project Details Management
    const [activeProjectSlug, setActiveProjectSlug] = useState('');

    // Member state
    const [memberName, setMemberName] = useState('');
    const [memberRole, setMemberRole] = useState('');
    const [memberImage, setMemberImage] = useState('');

    // Meeting state
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingSummary, setMeetingSummary] = useState('');
    const [meetingExpanded, setMeetingExpanded] = useState('');
    const [meetingImage, setMeetingImage] = useState('');
    const [meetingPdf, setMeetingPdf] = useState('');
    const [meetingSlides, setMeetingSlides] = useState('');

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

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleNewsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
        const newItem = {
            id: Date.now(),
            date: today,
            title: newsTitle,
            category: "COMUNIDADE",
            image: newsImage,
            link: newsLink
        };
        addNews(newItem);
        setNewsTitle(''); setNewsImage(''); setNewsLink('');
        alert('Notícia adicionada com sucesso!');
    };

    const handleProjectSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const slug = projSlug || projTitle.toLowerCase().replace(/\s+/g, '-');
        const newProj = {
            id: Date.now(),
            title: projTitle,
            description: projDesc,
            image: getDriveDirectUrl(projImage),
            hoverImage: '',
            link: `/projetos/${slug}`,
            slug: slug
        };
        addProject(newProj);
        setProjTitle(''); setProjDesc(''); setProjImage(''); setProjSlug('');
        alert('Projeto adicionado com sucesso!');
    };

    const handleAddMember = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeProjectSlug) return;
        updateProjectParticipants(activeProjectSlug, {
            name: memberName,
            role: memberRole,
            image: getDriveDirectUrl(memberImage)
        });
        setMemberName(''); setMemberRole(''); setMemberImage('');
        alert('Integrante adicionado!');
    };

    const handleAddMeeting = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeProjectSlug) return;
        updateProjectMeetings(activeProjectSlug, {
            title: meetingTitle,
            date: meetingDate,
            summary: meetingSummary,
            expandedSummary: meetingExpanded,
            image: getDriveDirectUrl(meetingImage),
            pdfLink: meetingPdf,
            slidesIframeSrc: meetingSlides,
            slidesLink: meetingSlides
        });
        setMeetingTitle(''); setMeetingDate(''); setMeetingSummary('');
        setMeetingExpanded(''); setMeetingImage(''); setMeetingPdf(''); setMeetingSlides('');
        alert('Encontro adicionado!');
    };

    if (!loggedIn) {
        return (
            <div className="admin-login-container">
                <motion.div className="admin-login-box glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Settings size={40} className="admin-icon" />
                    <h2>Painel de Controle</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Usuário</label>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label>Senha</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        {error && <p className="error-msg">{error}</p>}
                        <button type="submit" className="pill-btn dark-btn" style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>ENTRAR</button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h2><Settings size={28} /> Painel Administrativo</h2>
                <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> Sair</button>
            </header>

            <div className="admin-content">
                <section className="admin-section">
                    <h3>Adicionar Nova Notícia</h3>
                    <form onSubmit={handleNewsSubmit} className="admin-form">
                        <div className="input-group">
                            <label>Legenda / Título</label>
                            <input type="text" value={newsTitle} onChange={e => setNewsTitle(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label>Foto da Notícia (Upload)</label>
                            <input type="file" accept="image/*" onChange={async e => {
                                if (e.target.files && e.target.files[0]) {
                                    setNewsImage(await fileToBase64(e.target.files[0]));
                                }
                            }} required />
                        </div>
                        <div className="input-group">
                            <label>Link para Instagram</label>
                            <input type="url" value={newsLink} onChange={e => setNewsLink(e.target.value)} required />
                        </div>
                        <button type="submit" className="pill-btn dark-btn"><Plus size={18} /> Adicionar Notícia</button>
                    </form>
                    <div className="admin-items-preview">
                        <h4>Notícias Atuais:</h4>
                        <ul>{news.map((n: any) => <li key={n.id}>{n.title} - {n.date}</li>)}</ul>
                    </div>
                </section>

                <section className="admin-section">
                    <h3>Cadastrar Novo Projeto</h3>
                    <form onSubmit={handleProjectSubmit} className="admin-form">
                        <div className="input-group">
                            <label>Nome do Projeto</label>
                            <input type="text" value={projTitle} onChange={e => setProjTitle(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label>Identificador na URL (Slug) - opcional</label>
                            <input type="text" value={projSlug} onChange={e => setProjSlug(e.target.value)} placeholder="ex: novo-projeto" />
                        </div>
                        <div className="input-group">
                            <label>Descrição</label>
                            <textarea value={projDesc} onChange={e => setProjDesc(e.target.value)} required rows={4}></textarea>
                        </div>
                        <div className="input-group">
                            <label>Link Google Drive da Foto do Projeto</label>
                            <input type="text" value={projImage} onChange={e => setProjImage(e.target.value)} required placeholder="https://drive.google.com/file/d/..." />
                        </div>
                        <button type="submit" className="pill-btn dark-btn"><Plus size={18} /> Cadastrar Projeto</button>
                    </form>
                    <div className="admin-items-preview">
                        <h4>Projetos Cadastrados:</h4>
                        <ul>{projects.map((p: any, i: number) => <li key={p.id}>{p.title} {i >= 2 && <button onClick={() => deleteProject(p.id)} className="delete-btn"><Trash2 size={16} /></button>}</li>)}</ul>
                    </div>
                </section>

                <section className="admin-section" style={{ borderTop: '2px dashed #ddd', paddingTop: '2rem' }}>
                    <h3>Gerenciar Informações do Projeto</h3>
                    <div className="input-group">
                        <label>Selecione um Projeto para Editar:</label>
                        <select value={activeProjectSlug} onChange={e => setActiveProjectSlug(e.target.value)}>
                            <option value="">-- Selecione --</option>
                            {projects.map((p: any) => p.slug && <option key={p.id} value={p.slug}>{p.title}</option>)}
                        </select>
                    </div>

                    {activeProjectSlug && projectDetails[activeProjectSlug] && (
                        <div style={{ marginTop: '2rem' }}>
                            <div style={{ marginBottom: '3rem' }}>
                                <h4>Adicionar Integrante à Coordenação</h4>
                                <form onSubmit={handleAddMember} className="admin-form">
                                    <div className="input-group">
                                        <label>Nome do Integrante</label>
                                        <input type="text" value={memberName} onChange={e => setMemberName(e.target.value)} required />
                                    </div>
                                    <div className="input-group">
                                        <label>Cargo / Função</label>
                                        <input type="text" value={memberRole} onChange={e => setMemberRole(e.target.value)} required placeholder="Ex: Coordenador" />
                                    </div>
                                    <div className="input-group">
                                        <label>Link Google Drive da Foto</label>
                                        <input type="text" value={memberImage} onChange={e => setMemberImage(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="pill-btn dark-btn"><Plus size={18} /> Adicionar Integrante</button>
                                </form>
                                <div className="admin-items-preview" style={{ marginTop: '1rem' }}>
                                    <h5>Integrantes Atuais:</h5>
                                    <ul>{projectDetails[activeProjectSlug].participants?.map((m: any, idx: number) => <li key={idx}>{m.name} - {m.role}</li>)}</ul>
                                </div>
                            </div>

                            <div>
                                <h4>Adicionar Encontro / Reunião</h4>
                                <form onSubmit={handleAddMeeting} className="admin-form">
                                    <div className="input-group">
                                        <label>Título do Encontro</label>
                                        <input type="text" value={meetingTitle} onChange={e => setMeetingTitle(e.target.value)} required />
                                    </div>
                                    <div className="input-group">
                                        <label>Data</label>
                                        <input type="text" value={meetingDate} onChange={e => setMeetingDate(e.target.value)} required placeholder="Ex: 01 Out. 2025" />
                                    </div>
                                    <div className="input-group">
                                        <label>Resumo Curto</label>
                                        <textarea value={meetingSummary} onChange={e => setMeetingSummary(e.target.value)} required rows={2}></textarea>
                                    </div>
                                    <div className="input-group">
                                        <label>Resumo Expandido</label>
                                        <textarea value={meetingExpanded} onChange={e => setMeetingExpanded(e.target.value)} rows={4}></textarea>
                                    </div>
                                    <div className="input-group">
                                        <label>Link Google Drive da Imagem Capa</label>
                                        <input type="text" value={meetingImage} onChange={e => setMeetingImage(e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label>Link Google Drive do Artigo (PDF)</label>
                                        <input type="url" value={meetingPdf} onChange={e => setMeetingPdf(e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label>Link Google Slides (Iframe ou Compartilhamento)</label>
                                        <input type="url" value={meetingSlides} onChange={e => setMeetingSlides(e.target.value)} />
                                    </div>
                                    <button type="submit" className="pill-btn dark-btn"><Plus size={18} /> Adicionar Encontro</button>
                                </form>
                                <div className="admin-items-preview" style={{ marginTop: '1rem' }}>
                                    <h5>Encontros Atuais:</h5>
                                    <ul>{projectDetails[activeProjectSlug].meetings?.map((m: any) => <li key={m.id}>{m.date} - {m.title}</li>)}</ul>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
