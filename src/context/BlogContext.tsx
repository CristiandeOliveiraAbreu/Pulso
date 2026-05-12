import React, { createContext, useContext, useState, useEffect } from 'react';

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
  executiveSummary: string;
  mainInsight: string;
  content: string;
  questions: Question[];
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
    comments: number;
  };
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
  footer: {
    newsletterTitle: string;
    newsletterDesc: string;
    copyright: string;
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
        comments: 8
      }
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
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<BlogData>(() => {
    const saved = localStorage.getItem('pulso_blog_data');
    if (!saved) return DEFAULT_DATA;
    
    try {
      const parsed = JSON.parse(saved);
      
      // FORCED MIGRATION: If articles are missing, it's an old version
      if (!parsed.articles || !Array.isArray(parsed.articles) || parsed.articles.length === 0) {
        console.log('Versão antiga detectada. Forçando migração...');
        return DEFAULT_DATA;
      }
      
      const safeData = {
        ...DEFAULT_DATA,
        ...parsed,
        branding: { ...DEFAULT_DATA.branding, ...parsed.branding },
        hero: { ...DEFAULT_DATA.hero, ...parsed.hero },
        opinion: { ...DEFAULT_DATA.opinion, ...parsed.opinion },
        social: { ...DEFAULT_DATA.social, ...parsed.social },
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
        responses: Array.isArray(parsed.responses) ? parsed.responses : []
      };
      
      return safeData;
    } catch (e) {
      console.error("Erro ao carregar dados do localStorage", e);
      return DEFAULT_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem('pulso_blog_data', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<BlogData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const submitResponse = (response: Response) => {
    setData(prev => ({
      ...prev,
      responses: [...prev.responses, response]
    }));
  };

  const resetData = () => {
    setData(DEFAULT_DATA);
    localStorage.removeItem('pulso_blog_data');
  };

  return (
    <BlogContext.Provider value={{ data, updateData, resetData, submitResponse }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within a BlogProvider');
  return context;
};
