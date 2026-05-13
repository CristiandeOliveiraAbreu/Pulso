import React from 'react';
import { BlogLayout } from '../components/BlogLayout';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { formatDriveUrl } from '../utils/formatters';
import { ArrowRight, Clock, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContentList() {
  const { data } = useBlog();
  const articles = data.articles.filter(a => a.status === 'published');

  return (
    <BlogLayout>
      <div className="max-w-6xl mx-auto py-12 px-4 md:px-0">
        <header className="mb-20 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-4 block">REPOSITÓRIO EDITORIAL</span>
          <h1 className="text-5xl md:text-7xl font-sans font-black text-black tracking-tight uppercase">Todos os Posts</h1>
          <div className="w-16 h-1 bg-black mx-auto mt-8 rounded-full" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {articles.map((article, idx) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={`/artigo/${article.id}`}>
                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 shadow-premium bg-slate-50">
                  <img 
                    src={formatDriveUrl(article.imageUrl)} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-black shadow-sm uppercase tracking-widest">
                    {article.type === 'opinion' ? 'Editorial' : 'Notícia'}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-black/30">
                    <span className="flex items-center gap-1"><User size={10} /> {article.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {article.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-sans font-black text-black leading-tight group-hover:opacity-70 transition-opacity line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black pt-4 border-t border-black/5">
                    LER ARTIGO <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-40">
            <p className="text-slate-400 font-medium italic">Nenhum artigo publicado ainda.</p>
          </div>
        )}
      </div>
    </BlogLayout>
  );
}
