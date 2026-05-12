import React from 'react';
import { BlogLayout } from '../components/BlogLayout';
import { useBlog } from '../context/BlogContext';
import { 
  ArrowRight, 
  ExternalLink, 
  Heart, 
  MessageCircle, 
  Share2,
  Clock,
  User,
  PenTool,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { formatDriveUrl } from '../utils/formatters';

export default function BlogResearch() {
  const { data } = useBlog();

  const opinions = data.articles.filter(a => a.type === 'opinion' && a.status === 'published');
  const commonArticles = data.articles.filter(a => a.type === 'article' && a.status === 'published');

  return (
    <BlogLayout>
      {/* Current Research Section */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-4 block">{data.hero.tag}</span>
          <h2 className="text-4xl md:text-6xl font-sans font-black text-slate-900 tracking-tighter leading-[0.9] max-w-4xl mx-auto">
            {data.hero.title}
          </h2>
        </div>

        <div className="relative group overflow-hidden rounded-[3rem] border border-slate-100 bg-white mb-8 shadow-soft-2xl max-w-5xl mx-auto">
          <img 
            src={formatDriveUrl(data.hero.imageUrl)} 
            alt={data.hero.title} 
            className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="flex flex-col items-center gap-8">
          <p className="text-slate-500 text-lg max-w-2xl text-center leading-relaxed font-medium">
            A pesquisa é fundamental para definir o rumo das nossas decisões de amanhã. Suas opiniões ajudam a construir um cenário mais claro sobre o futuro da nossa sociedade.
          </p>
          
          <motion.a 
            href={data.hero.buttonLink}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-slate-900 hover:bg-black text-white px-12 py-6 rounded-[2rem] font-black text-xs tracking-[0.2em] flex items-center gap-3 shadow-2xl shadow-slate-200 transition-all uppercase"
          >
            {data.hero.buttonText} <ExternalLink size={18} />
          </motion.a>

          <div className="flex gap-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-4">
            <span className="flex items-center gap-2"><Heart size={14} className="text-slate-900" /> {data.hero.views} visualizações</span>
            <span className="flex items-center gap-2"><MessageCircle size={14} className="text-slate-900" /> {data.hero.responses} respostas</span>
          </div>
        </div>
      </section>

      {/* Editorials / Opinions Section */}
      {opinions.length > 0 && (
        <section className="mb-32 pt-24 border-t border-slate-100">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block">Espaço de Reflexão</span>
              <h2 className="text-5xl font-sans font-black text-slate-900 tracking-tighter">Editoriais & Opiniões</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 border-b-4 border-slate-900 pb-2">
              <PenTool size={16} /> Voz do Pulso
            </div>
          </div>

          <div className="space-y-20">
            {opinions.map((article, idx) => (
              <div key={article.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`lg:col-span-7 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-[3rem] overflow-hidden shadow-soft-2xl aspect-[16/10] group">
                    <img 
                      src={formatDriveUrl(article.imageUrl)} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                
                <div className="lg:col-span-5 space-y-8">
                  <div className="flex gap-4 items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-serif italic text-xl shadow-xl">RE</div>
                    <div>
                      <div className="text-slate-900">{article.author}</div>
                      <div className="flex gap-2 items-center mt-1">
                        <span>{article.date}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="flex items-center gap-1"><Clock size={10} /> 5 min leitura</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-4xl font-sans font-black text-slate-900 tracking-tight group cursor-pointer hover:text-slate-600 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-500 text-lg leading-relaxed font-medium line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-8 pt-6 border-t border-slate-100">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                      <Heart size={18} /> {article.stats.likes}
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                      <MessageCircle size={18} /> {article.stats.comments}
                    </button>
                    <button className="ml-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 group">
                      Ler Artigo <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Common Articles Section */}
      {commonArticles.length > 0 && (
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Artigos & Reportagens</h2>
            <div className="flex-1 h-[1px] bg-slate-100" />
            <BookOpen size={20} className="text-slate-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {commonArticles.map((article) => (
              <div key={article.id} className="group cursor-pointer space-y-6">
                <div className="relative rounded-[2.5rem] overflow-hidden aspect-video shadow-soft-lg">
                  <img src={formatDriveUrl(article.imageUrl)} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-slate-900 shadow-sm uppercase tracking-widest">
                    {article.category}
                  </div>
                </div>
                <div>
                   <h4 className="text-2xl font-black text-slate-900 mb-3 line-clamp-2 group-hover:text-slate-600 transition-colors leading-tight">{article.title}</h4>
                   <p className="text-slate-400 text-sm font-medium line-clamp-2 leading-relaxed">{article.excerpt}</p>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] pt-4 border-t border-slate-50">
                  <span>Por {article.author}</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Archives Section */}
      <section className="mb-24 pt-24 border-t border-slate-100">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block">Acervo Histórico</span>
          <h2 className="text-4xl font-sans font-black text-slate-900 tracking-tighter mb-4">Arquivos de Pesquisa</h2>
          <div className="w-20 h-1 bg-slate-900 mx-auto rounded-full" />
        </div>

        {Object.entries(
          data.researches.reduce((acc, curr) => {
            const year = curr.year || 2026;
            if (!acc[year]) acc[year] = [];
            acc[year].push(curr);
            return acc;
          }, {} as Record<number, any[]>)
        )
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, items]) => (
          <div key={year} className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-2xl font-black text-slate-900">{year}</h3>
              <div className="flex-1 h-[1px] bg-slate-100" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {items
                .sort((a, b) => b.number - a.number)
                .map((item) => (
                <Link to={`/resultado/${item.id}`} key={item.id} className="group cursor-pointer">
                  <div className="relative rounded-[2rem] overflow-hidden aspect-video mb-6 shadow-soft-lg">
                    <img src={formatDriveUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-slate-900 shadow-sm">
                      #{String(item.number).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">{item.date}</div>
                  <h4 className="text-xl font-sans font-black text-slate-900 mb-4 line-clamp-2 group-hover:text-slate-600 transition-colors leading-tight">{item.title}</h4>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                    <span>Acessar Relatório</span>
                    <ExternalLink size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Sponsores / Partners Section */}
      <section className="py-24 border-t border-slate-100 mb-20 bg-slate-50/50 rounded-[4rem]">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Apoio Institucional</span>
        </div>
        <div className="flex flex-wrap justify-center gap-24 opacity-20 grayscale hover:opacity-100 transition-all duration-500">
          <div className="text-3xl font-serif font-black tracking-tighter">PULSO</div>
          <div className="text-3xl font-sans font-black italic tracking-tighter">REDAÇÃO</div>
          <div className="text-3xl font-serif font-black uppercase tracking-tighter">ESTADUAL</div>
        </div>
      </section>
    </BlogLayout>
  );
}
