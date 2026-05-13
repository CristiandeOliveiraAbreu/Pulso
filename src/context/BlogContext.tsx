import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Question {
  id: string;
  type: 'multiple' | 'text' | 'rating';
  label: string;
  options?: string[];
}

export interface Response {
  researchId: string;
  answers: Record<string, string | number>;
  timestamp: string;
}

export interface ResearchItem {
  id: string;
  number: number;
  year: number;
  title: string;
  date: string;
  image: string;
  description: string;
  introText?: string;
  executiveSummary: string;
  mainInsight: string;
  content: string;
  questions: Question[];
}

export interface CommentItem {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  type: 'opinion' | 'article';
  category: string;
  status: 'draft' | 'published';
  author: string;
  date: string;
  lastEdited: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  stats: {
    views: number;
    likes: number;
    dislikes: number;
    comments: number;
  };
  commentsList?: CommentItem[];
}

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export interface Partner {
  id: string;
  name: string;
  style: 'serif' | 'sans';
  isItalic: boolean;
  isUppercase: boolean;
}

export interface BlogData {
  branding: {
    logoUrl: string;
    tagline: string;
    showTagline: boolean;
  };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  contact: {
    email: string;
    address: string;
    phone: string;
  };
  hero: {
    tag: string;
    title: string;
    imageUrl: string;
    views: string;
    responses: string;
    buttonText: string;
    buttonLink: string;
    researchId: string;
  };
  articles: ArticleItem[];
  // Keep legacy for compatibility
  opinion: {
    tag: string;
    title: string;
    articleTitle: string;
    excerpt: string;
    imageUrl: string;
    author: string;
    date: string;
    readTime: string;
    stats: {
      likes: number;
      comments: number;
    };
  };
  researches: ResearchItem[];
  responses: Response[];
  subscribers: Subscriber[];
  partners: Partner[];
  footer: {
    newsletterTitle: string;
    newsletterDesc: string;
    copyright: string;
  };
  about: {
    title: string;
    quote: string;
    sections: {
      id: string;
      title: string;
      content: string;
    }[];
    detailedText: string;
  };
}

const DEFAULT_DATA: BlogData = {
  branding: {
    logoUrl: '',
    tagline: 'Sua voz, sua notícia',
    showTagline: false,
  },
  social: {
    facebook: '#',
    instagram: '#',
    twitter: '#',
  },
  contact: {
    email: 'contato@pulso.com.br',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    phone: '(11) 99999-9999',
  },
  hero: {
    tag: 'Pesquisa atual',
    title: 'Participe da primeira pesquisa de Pulso, o seu site de notícias',
    imageUrl: '/hero-research.png',
    views: '1.2K',
    responses: '24',
    buttonText: 'CLIQUE E RESPONDA A PESQUISA!',
    buttonLink: '/pesquisa/default',
    researchId: 'default',
  },
  about: {
    title: 'Sobre o Pulso',
    quote: '"Um projeto dedicado a ouvir, entender e reportar a realidade sob uma nova perspectiva editorial."',
    sections: [
      {
        id: 'missao',
        title: 'Nossa Missão',
        content: 'Transformar dados brutos e opiniões isoladas em inteligência editorial coletiva, dando voz ao que realmente importa.'
      },
      {
        id: 'editorial',
        title: 'Editorial',
        content: 'Mantemos um padrão de independência e rigor analítico, priorizando a profundidade em vez da velocidade superficial.'
      },
      {
        id: 'comunidade',
        title: 'Comunidade',
        content: 'O Pulso não existe sem você. Cada pesquisa respondida alimenta o motor da nossa análise jornalística.'
      }
    ],
    detailedText: 'O Pulso nasceu da necessidade de conectar o jornalismo de opinião com a realidade estatística das ruas. Em um mundo saturado de informações rápidas, escolhemos o caminho da pausa, da escuta e da profundidade.\n\nCada edição do Pulso é acompanhada de uma pesquisa proprietária, cujos resultados moldam nossos editoriais e oferecem aos nossos leitores uma visão clara do que a sociedade está pensando agora.'
  },
  articles: [
    {
      id: 'default-article',
      title: 'O que tenho a dizer sobre a última pesquisa?',
      type: 'opinion',
      category: 'Editorial',
      status: 'published',
      author: 'Redação PULSO',
      date: '12 de Maio, 2026',
      lastEdited: 'Hoje, 14:30',
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
      excerpt: 'Os resultados preliminares indicam uma mudança significativa na percepção pública sobre as novas diretrizes de governança regional.',
      content: 'Eu me lembro claramente de como tudo começou para mim no início de 2021, em plena pandemia do Covid-19...',
      metaTitle: 'Opinião: Resultados da Pesquisa de Maio 2026',
      metaDescription: 'Análise editorial profunda sobre os dados coletados na última pesquisa de saúde e bem-estar.',
      stats: {
        views: 1240,
        likes: 124,
        dislikes: 12,
        comments: 8
      },
      commentsList: []
    }
  ],
  opinion: {
    tag: 'Editorial',
    title: 'Opinião',
    articleTitle: 'O que tenho a dizer sobre a última pesquisa?',
    excerpt: 'Os resultados preliminares indicam uma mudança significativa na percepção pública sobre as novas diretrizes de governança regional. Analisamos os dados cruzados para entender o que realmente mudou.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
    author: 'Redação PULSO',
    date: '12 de Maio, 2026',
    readTime: '5 min de leitura',
    stats: {
      likes: 124,
      dislikes: 12,
      comments: 8,
    },
  },
  researches: [
    { 
      id: 'default', 
      number: 1,
      year: 2026,
      title: 'Saúde e Bem-estar no trabalho', 
      date: 'MAIO', 
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
      description: 'Esta pesquisa visa entender os principais desafios da saúde mental e física no ambiente corporativo atual.',
      executiveSummary: 'Analisamos profundamente o impacto do trabalho remoto na saúde mental dos colaboradores durante o último trimestre de 2026.',
      mainInsight: '72% dos trabalhadores sentem que o equilíbrio entre vida pessoal e profissional é o fator mais crítico para sua produtividade.',
      content: 'O ambiente de trabalho moderno passou por transformações sem precedentes. Através desta pesquisa, buscamos mapear não apenas os sintomas de estresse, mas as raízes estruturais que afetam o bem-estar.',
      questions: [
        { id: 'q1', type: 'multiple', label: 'Como você avalia seu nível de estresse atual?', options: ['Baixo', 'Moderado', 'Alto', 'Muito Alto'] },
        { id: 'q2', type: 'rating', label: 'Nota para o equilíbrio entre vida pessoal e profissional (1-5)' },
        { id: 'q3', type: 'text', label: 'Qual a principal mudança que você faria na sua rotina?' }
      ]
    }
  ],
  responses: [],
  subscribers: [],
  partners: [
    { id: '1', name: 'PULSO', style: 'serif', isItalic: false, isUppercase: true },
    { id: '2', name: 'REDAÇÃO', style: 'sans', isItalic: true, isUppercase: true },
    { id: '3', name: 'ESTADUAL', style: 'serif', isItalic: false, isUppercase: true },
    { id: '4', name: 'EDITORIAL', style: 'sans', isItalic: false, isUppercase: true },
    { id: '5', name: 'MÍDIA', style: 'serif', isItalic: true, isUppercase: false },
    { id: '6', name: 'CONEXÃO', style: 'sans', isItalic: false, isUppercase: true },
  ],
  footer: {
    newsletterTitle: 'Receba nossas atualizações',
    newsletterDesc: 'Fique por dentro das últimas pesquisas e opiniões diretamente no seu e-mail.',
    copyright: '© PULSO 2026',
  }
};

interface BlogContextType {
  data: BlogData;
  updateData: (newData: Partial<BlogData>) => void;
  resetData: () => void;
  submitResponse: (response: Response) => void;
  addSubscriber: (email: string) => void;
  interactWithArticle: (id: string, type: 'like' | 'dislike') => void;
  addArticleComment: (id: string, comment: Omit<CommentItem, 'id' | 'date'>) => void;
  isLoading: boolean;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);
export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<BlogData>(() => {
    const saved = localStorage.getItem('pulso_blog_data');
    if (!saved) return DEFAULT_DATA;
    
    try {
      const parsed = JSON.parse(saved);
      
      const safeData = {
        ...DEFAULT_DATA,
        ...parsed,
        branding: { ...DEFAULT_DATA.branding, ...parsed.branding },
        about: { ...DEFAULT_DATA.about, ...parsed.about },
        hero: { ...DEFAULT_DATA.hero, ...parsed.hero },
        opinion: { ...DEFAULT_DATA.opinion, ...parsed.opinion },
        social: { ...DEFAULT_DATA.social, ...parsed.social },
        contact: { ...DEFAULT_DATA.contact, ...parsed.contact },
        footer: { ...DEFAULT_DATA.footer, ...parsed.footer },
        articles: Array.isArray(parsed.articles) ? parsed.articles : DEFAULT_DATA.articles,
        researches: Array.isArray(parsed.researches) ? parsed.researches.map((r: any) => ({
          ...r,
          number: r.number || 1,
          year: r.year || 2026,
          content: r.content || 'O relatório completo ainda está sendo processado pela nossa equipe editorial.',
          executiveSummary: r.executiveSummary || 'Análise preliminar dos dados coletados.',
          mainInsight: r.mainInsight || 'Destaque principal dos resultados.',
          questions: Array.isArray(r.questions) ? r.questions : []
        })) : DEFAULT_DATA.researches,
        responses: Array.isArray(parsed.responses) ? parsed.responses : [],
        subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : [],
        partners: Array.isArray(parsed.partners) ? parsed.partners : DEFAULT_DATA.partners
      };
      
      return safeData;
    } catch (e) {
      console.error("Erro ao carregar dados", e);
      return DEFAULT_DATA;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  // 1. Initial Load (Supabase -> LocalStorage -> Default)
  useEffect(() => {
    const initData = async () => {
      try {
        // Try Supabase first
        const { data: dbData, error } = await supabase
          .from('site_data')
          .select('content')
          .single();

        if (dbData && dbData.content) {
          setData(dbData.content);
          localStorage.setItem('pulso_blog_data', JSON.stringify(dbData.content));
        } else {
          // Fallback to localStorage
          const saved = localStorage.getItem('pulso_blog_data');
          if (saved) {
            setData(JSON.parse(saved));
          }
        }
      } catch (err) {
        console.error("Erro ao sincronizar com Supabase:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, []);

  // 2. Persistence (Local + DB)
  const persist = async (currentData: BlogData) => {
    // Save to LocalStorage immediately
    localStorage.setItem('pulso_blog_data', JSON.stringify(currentData));
    
    // Save to Supabase (Upsert into single record)
    try {
      await supabase
        .from('site_data')
        .upsert({ id: 1, content: currentData });
    } catch (err) {
      console.warn("DB Save Error (Offline or Table missing):", err);
    }
  };

  const updateData = (newData: Partial<BlogData>) => {
    const updated = { ...data, ...newData };
    setData(updated);
    persist(updated);
  };

  const resetData = () => {
    setData(DEFAULT_DATA);
    localStorage.removeItem('pulso_blog_data');
    persist(DEFAULT_DATA);
  };

  const submitResponse = (response: Response) => {
    const updated = {
      ...data,
      responses: [response, ...data.responses]
    };
    setData(updated);
    persist(updated);
  };

  const addSubscriber = (email: string) => {
    const newSubscriber: Subscriber = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    };
    const updated = {
      ...data,
      subscribers: [newSubscriber, ...data.subscribers]
    };
    setData(updated);
    persist(updated);
  };

  const addArticleComment = (id: string, comment: Omit<CommentItem, 'id' | 'date'>) => {
    const newComment: CommentItem = {
      ...comment,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('pt-BR')
    };

    const updated = {
      ...data,
      articles: data.articles.map(a => 
        a.id === id 
          ? { 
              ...a, 
              commentsList: [newComment, ...(a.commentsList || [])],
              stats: { ...a.stats, comments: a.stats.comments + 1 }
            } 
          : a
      )
    };
    setData(updated);
    persist(updated);
  };

  const interactWithArticle = (id: string, type: 'like' | 'dislike') => {
    const updated = {
      ...data,
      articles: data.articles.map(a => 
        a.id === id 
          ? { 
              ...a, 
              stats: { 
                ...a.stats, 
                likes: type === 'like' ? a.stats.likes + 1 : a.stats.likes,
                dislikes: type === 'dislike' ? a.stats.dislikes + 1 : a.stats.dislikes
              } 
            } 
          : a
      )
    };
    setData(updated);
    persist(updated);
  };

  return (
    <BlogContext.Provider value={{ data, updateData, resetData, submitResponse, addSubscriber, interactWithArticle, addArticleComment, isLoading }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within a BlogProvider');
  return context;
};
