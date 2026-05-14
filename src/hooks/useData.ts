import { useState, useEffect } from 'react';
import { initialProjectDetails } from '../data/initialProjectDetails';
import { supabase } from '../lib/supabase';

// Default Data (Fallback)
export const initialNews = [
    {
        id: 1,
        date: "25 Mar 2026",
        title: "Aula sobre Cultura Oceânica na Escola Aracy Alves Dias",
        category: "COMUNIDADE",
        image: `${import.meta.env.BASE_URL}assets/NW_01.jpg`,
        link: "https://www.instagram.com/p/DWZX6c4CfbY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
        id: 2,
        date: "23 Mar 2026",
        title: "Aula sobre Microplásticos na Escola Dom Bosco",
        category: "COMUNIDADE",
        image: `${import.meta.env.BASE_URL}assets/NW_02.png`,
        link: "https://www.instagram.com/p/DWUepq5iRtk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
        id: 3,
        date: "19 Mar 2026",
        title: "Visitas nas Escolas",
        category: "EDUCAÇÃO",
        image: `${import.meta.env.BASE_URL}assets/NW_03.png`,
        link: "/noticias/2"
    }
];

export const initialProjects = [
    {
        id: 1,
        title: "EA Saberes",
        description: "O projeto integra Educação Ambiental crítica e os saberes da tradição com a finalidade de aprimorar a formação de professores do litoral amazônico.",
        image: `${import.meta.env.BASE_URL}assets/EA.jpg`,
        hoverImage: `${import.meta.env.BASE_URL}assets/EA-hover.jpg`,
        link: "/projetos/escolas",
        slug: "escolas"
    },
    {
        id: 2,
        title: "Conectando-se com o Ambiente",
        description: "O projeto integra tecnologias digitais à educação ambiental crítica. Focamos na formação continuada de professores e inicial de discentes, unindo inovação tecnológica e prática pedagógica transformadora.",
        image: `${import.meta.env.BASE_URL}assets/conectando.png`,
        hoverImage: `${import.meta.env.BASE_URL}assets/conectando-hover.jpg`,
        link: "/projetos/comunidade",
        slug: "comunidade"
    }
];

export function useData() {
    // Fingerprint to detect code changes automatically
    const dataFingerprint = JSON.stringify({ version: "v2", initialNews, initialProjects, initialProjectDetails });

    const [news, setNews] = useState<any[]>(() => {
        const lastFingerprint = localStorage.getItem('ea_sys_v2_fingerprint');
        const local = localStorage.getItem('ea_sys_v2_news');
        if (lastFingerprint !== dataFingerprint) return initialNews;
        return local ? JSON.parse(local) : initialNews;
    });

    const [projects, setProjects] = useState<any[]>(() => {
        const lastFingerprint = localStorage.getItem('ea_sys_v2_fingerprint');
        const local = localStorage.getItem('ea_sys_v2_projects');
        const stored = local ? JSON.parse(local) : null;

        if (lastFingerprint !== dataFingerprint) {
            if (!stored) return initialProjects;
            const initialSlugs = new Set(initialProjects.map(p => p.slug));
            const userProjects = stored.filter((p: any) => !initialSlugs.has(p.slug));
            return [...initialProjects, ...userProjects];
        }
        return stored || initialProjects;
    });

    const [projectDetails, setProjectDetails] = useState<Record<string, any>>(() => {
        const lastFingerprint = localStorage.getItem('ea_sys_v2_fingerprint');
        const local = localStorage.getItem('ea_sys_v2_project_details');
        const stored = local ? JSON.parse(local) : null;

        if (lastFingerprint !== dataFingerprint) {
            if (!stored) return initialProjectDetails;
            return { ...stored, ...initialProjectDetails };
        }
        return stored || initialProjectDetails;
    });

    useEffect(() => {
        const lastFingerprint = localStorage.getItem('ea_sys_v2_fingerprint');
        if (lastFingerprint !== dataFingerprint) {
            setNews(initialNews);
            setProjects(prev => {
                const initialSlugs = new Set(initialProjects.map(p => p.slug));
                const userProjects = prev.filter((p: any) => !initialSlugs.has(p.slug));
                return [...initialProjects, ...userProjects];
            });
            setProjectDetails(prev => ({ ...prev, ...initialProjectDetails }));
            localStorage.setItem('ea_sys_v2_fingerprint', dataFingerprint);
        }
    }, [dataFingerprint]);

    useEffect(() => { localStorage.setItem('ea_sys_v2_news', JSON.stringify(news)); }, [news]);
    useEffect(() => { localStorage.setItem('ea_sys_v2_projects', JSON.stringify(projects)); }, [projects]);
    useEffect(() => { localStorage.setItem('ea_sys_v2_project_details', JSON.stringify(projectDetails)); }, [projectDetails]);

    // Fetch News
    useEffect(() => {
        async function fetchNews() {
            try {
                const { data } = await supabase
                    .from('news')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (data && data.length > 0) {
                    setNews(data.map(item => ({ ...item, image: item.image_url })));
                }
            } catch (err) { console.error('Error fetching news:', err); }
        }
        fetchNews();
    }, []);

    // Fetch Projects
    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (data && data.length > 0) {
                    const mappedProjects = data.map(p => ({
                        id: p.id,
                        title: p.title,
                        description: p.description,
                        image: p.image_url,
                        slug: p.slug,
                        link: `/projetos/${p.slug}`,
                        fullDescription: p.full_description,
                        participants: p.participants || [],
                        meetings: p.meetings || []
                    }));

                    setProjects(prev => {
                        const supSlugs = new Set(mappedProjects.map(p => p.slug));
                        return [...prev.filter(p => !supSlugs.has(p.slug)), ...mappedProjects];
                    });

                    setProjectDetails(prev => {
                        const newDets = { ...prev };
                        mappedProjects.forEach(p => {
                            newDets[p.slug] = {
                                title: p.title, description: p.description, image: p.image,
                                fullDescription: p.fullDescription, participants: p.participants, meetings: p.meetings
                            };
                        });
                        return newDets;
                    });
                }
            } catch (err) { console.error('Error fetching projects:', err); }
        }
        fetchProjects();
    }, []);

    const addNewsToSupabase = async (item: any, file?: File) => {
        let imageUrl = item.image;
        if (file) {
            const fileName = `news/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
            const { data: uploadData, error: uploadError } = await supabase.storage.from('news-media').upload(fileName, file);
            if (uploadError) throw uploadError;
            const { data: pubUrl } = supabase.storage.from('news-media').getPublicUrl(uploadData.path);
            imageUrl = pubUrl.publicUrl;
        }
        const { data, error } = await supabase.from('news').insert([{
            date: item.date, title: item.title, category: item.category, image_url: imageUrl, link: item.link
        }]).select();
        if (error) throw error;
        if (data) setNews(prev => [data[0], ...prev]);
    };

    const deleteNewsFromSupabase = async (id: number) => {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) throw error;
        setNews(prev => prev.filter(n => n.id !== id));
    };

    const addProjectToSupabase = async (item: any) => {
        const { data, error } = await supabase.from('projects').insert([{
            title: item.title, slug: item.slug, description: item.description,
            image_url: item.image, full_description: item.fullDescription,
            participants: item.participants, meetings: item.meetings
        }]).select();
        if (error) throw error;
        if (data && data[0]) {
            const p = data[0];
            const mapped = {
                id: p.id, title: p.title, description: p.description, image: p.image_url,
                slug: p.slug, link: `/projetos/${p.slug}`, fullDescription: p.full_description,
                participants: p.participants, meetings: p.meetings
            };
            setProjects(prev => [mapped, ...prev]);
            setProjectDetails(prev => ({ ...prev, [mapped.slug]: mapped }));
        }
    };

    const deleteProjectFromSupabase = async (id: number) => {
        const p = projects.find(x => x.id === id);
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
        
        setProjects(prev => prev.filter(x => x.id !== id));
        if (p?.slug) {
            setProjectDetails(old => {
                const n = { ...old };
                delete n[p.slug];
                return n;
            });
        }
    };

    const uploadMediaToSupabase = async (file: File): Promise<string> => {
        const fileName = `media/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const { data, error } = await supabase.storage.from('news-media').upload(fileName, file);
        if (error) throw error;
        const { data: pubUrl } = supabase.storage.from('news-media').getPublicUrl(data.path);
        return pubUrl.publicUrl;
    };

    return {
        news, projects, projectDetails,
        addNewsToSupabase, deleteNewsFromSupabase,
        addProjectToSupabase, deleteProjectFromSupabase,
        uploadMediaToSupabase
    };
}
