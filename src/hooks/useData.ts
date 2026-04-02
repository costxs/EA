import { useState, useEffect } from 'react';
import { initialProjectDetails } from '../data/initialProjectDetails';

// Default Data
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
    const [news, setNews] = useState(() => {
        const local = localStorage.getItem('ea_news');
        return local ? JSON.parse(local) : initialNews;
    });

    const [projects, setProjects] = useState(() => {
        const local = localStorage.getItem('ea_projects');
        return local ? JSON.parse(local) : initialProjects;
    });

    const [projectDetails, setProjectDetails] = useState<Record<string, any>>(() => {
        const local = localStorage.getItem('ea_project_details');
        return local ? JSON.parse(local) : initialProjectDetails;
    });

    useEffect(() => {
        localStorage.setItem('ea_news', JSON.stringify(news));
    }, [news]);

    useEffect(() => {
        localStorage.setItem('ea_projects', JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem('ea_project_details', JSON.stringify(projectDetails));
    }, [projectDetails]);

    const addNews = (item: any) => {
        setNews((prev: any[]) => {
            const newNews = [item, prev[0], prev[1]].filter(Boolean); // Keep only max 3 items, newest first
            return newNews;
        });
    };

    const addProject = (item: any) => {
        setProjects((prev: any[]) => [...prev, item]);
        setProjectDetails(prev => ({
            ...prev,
            [item.slug]: {
                title: item.title,
                description: item.description,
                image: item.image,
                fullDescription: item.description,
                participants: [],
                meetings: []
            }
        }));
    };

    const deleteProject = (id: number) => {
        setProjects((prev: any[]) => {
            const p = prev.find(x => x.id === id);
            if (p?.slug) {
                setProjectDetails(oldDets => {
                    const newDets = { ...oldDets };
                    delete newDets[p.slug];
                    return newDets;
                });
            }
            return prev.filter(x => x.id !== id);
        });
    };

    const updateProjectParticipants = (slug: string, newParticipant: any) => {
        setProjectDetails(prev => {
            const proj = prev[slug];
            if (!proj) return prev;
            return {
                ...prev,
                [slug]: {
                    ...proj,
                    participants: [...(proj.participants || []), newParticipant]
                }
            };
        });
    };

    const updateProjectMeetings = (slug: string, newMeeting: any) => {
        setProjectDetails(prev => {
            const proj = prev[slug];
            if (!proj) return prev;
            const meets = proj.meetings || [];
            newMeeting.id = `${Date.now()}`;
            return {
                ...prev,
                [slug]: {
                    ...proj,
                    meetings: [...meets, newMeeting]
                }
            };
        });
    };

    return {
        news, projects, projectDetails,
        addNews, addProject, deleteProject,
        updateProjectParticipants, updateProjectMeetings
    };
}
