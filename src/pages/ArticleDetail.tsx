import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { BlogLayout } from '../components/BlogLayout';
import { formatDriveUrl } from '../utils/formatters';
import { ArrowLeft, Clock, User, Share2, MessageCircle, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function ArticleDetail() {
  const { id } = useParams();
  const { data } = useBlog();
  
  const article = data.articles.find(a => a.id === id);

  if (!article) {
    return (
      <BlogLayout>
        <div className="text-center py-40">
          <h2 className="text-3xl font-black text-slate-900 mb-6">Artigo não encontrado</h2>
          <Link to="/conteudo" className="text-black font-black uppercase tracking-widest text-xs border-b-2 border-black pb-1">Voltar aos posts</Link>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <article className="max-w-4xl mx-auto py-12 px-4 md:px-0">
        {/* Breadcrumb */}
        <Link to="/conteudo" className="inline-flex items-center gap-2 text-slate-400 hover:text-black font-black text-[10px] uppercase tracking-widest mb-12 transition-colors">
          <ArrowLeft size={16} /> Voltar aos posts
        </Link>

        {/* Header */}
        <header className="space-y-8 mb-16">
          <div className="flex items-center gap-4">
            <span className="bg-black text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
              {article.type === 'opinion' ? 'Editorial' : 'Notícia'}
            </span>
            <div className="flex-1 h-[1px] bg-slate-100" />
          </div>

          <h1 className="text-4xl md:text-7xl font-sans font-black text-black tracking-tight leading-[1.1]">
            {article.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <User size={24} />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-black">{article.author}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{article.date} • 5 min leitura</div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors">
                <Heart size={20} /> <span className="text-[10px] font-black">{article.stats.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors">
                <MessageCircle size={20} /> <span className="text-[10px] font-black">{article.stats.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="aspect-video rounded-[3rem] overflow-hidden mb-20 shadow-premium bg-slate-50">
          <img 
            src={formatDriveUrl(article.imageUrl)} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto">
          <div 
            className="prose prose-slate prose-xl md:prose-2xl max-w-none font-serif text-slate-800 leading-relaxed whitespace-pre-line"
          >
            {article.content || article.excerpt}
          </div>
        </div>

        {/* Footer info */}
        <footer className="max-w-2xl mx-auto mt-32 pt-12 border-t border-slate-100">
          <div className="p-10 bg-slate-50 rounded-[3rem] text-center space-y-6">
            <h3 className="text-xl font-black text-black uppercase tracking-tight">O que você achou deste conteúdo?</h3>
            <p className="text-slate-500 font-medium">Sua opinião é fundamental para mantermos o pulso da sociedade ativo.</p>
            <div className="flex justify-center gap-4">
               <button className="bg-black text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">Gostei</button>
               <button className="bg-white border border-slate-200 text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Comentar</button>
            </div>
          </div>
        </footer>
      </article>
    </BlogLayout>
  );
}
