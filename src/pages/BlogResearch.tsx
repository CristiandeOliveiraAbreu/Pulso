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
      <section className="mb-20 lg:mb-32">
        <div className="text-center mb-10 lg:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-4 md:mb-6 block"
          >
            {data.hero.tag}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-7xl font-sans font-black text-black tracking-tight leading-[1.1] max-w-4xl mx-auto px-4"
          >
            {data.hero.title}
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative group overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-[#f8f9fa] mb-12 shadow-premium max-w-5xl mx-auto aspect-video md:aspect-[21/9]"
        >
          <img 
            src={formatDriveUrl(data.hero.imageUrl)} 
            alt={data.hero.title} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
        </motion.div>

        <div className="flex flex-col items-center gap-10">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-black/60 text-lg max-w-2xl text-center leading-relaxed font-medium"
          >
            A pesquisa é fundamental para definir o rumo das nossas decisões de amanhã. Suas opiniões ajudam a construir um cenário mais claro sobre o futuro da nossa sociedade.
          </motion.p>
          
          <motion.a 
            href={data.hero.buttonLink}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-14 py-6 rounded-full font-black text-[10px] tracking-[0.3em] flex items-center gap-4 shadow-2xl transition-all uppercase"
          >
            {data.hero.buttonText} <ArrowRight size={16} />
          </motion.a>

          <div className="flex gap-10 text-[9px] font-black text-black/20 uppercase tracking-[0.3em] mt-2">
            <span className="flex items-center gap-2"> {data.hero.views} VISUALIZAÇÕES</span>
            <span className="flex items-center gap-2"> {data.hero.responses} RESPOSTAS</span>
          </div>
        </div>
      </section>

      {/* Editorials / Opinions Section */}
      {opinions.length > 0 && (
        <section className="mb-40 pt-32 border-t border-black/5">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-4 block">ESPAÇO DE REFLEXÃO</span>
              <h2 className="text-5xl font-sans font-black text-black tracking-tight">Editoriais & Opiniões</h2>
            </div>
            <Link to="/conteudo" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-black border-b-2 border-black pb-1 hover:opacity-50 transition-all">
              VER TODOS OS ARTIGOS
            </Link>
          </div>

          <div className="space-y-32">
            {opinions.slice(0, 1).map((article) => (
              <div key={article.id} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7">
                  <div className="relative rounded-[3rem] overflow-hidden shadow-premium aspect-video group cursor-pointer bg-white border border-slate-100 flex items-center justify-center">
                    <img 
                      src={formatDriveUrl(article.imageUrl)} 
                      alt={article.title}
                      className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105 p-8"
                    />
                  </div>
                </div>
                
                <div className="lg:col-span-5 space-y-8">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-serif italic text-lg shadow-xl">RE</div>
                    <div>
                      <div className="text-[10px] font-black text-black uppercase tracking-widest">{article.author}</div>
                      <div className="text-[9px] font-bold text-black/30 uppercase tracking-widest mt-0.5">{article.date} • 5 MIN LEITURA</div>
                    </div>
                  </div>
                  
                  <h3 className="text-5xl font-sans font-black text-black tracking-tight leading-tight hover:opacity-70 transition-opacity cursor-pointer">
                    {article.title}
                  </h3>
                  
                  <p className="text-black/50 text-lg leading-relaxed font-medium line-clamp-3 italic font-serif">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-10 pt-8 border-t border-black/5">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/20">
                      {article.stats.likes} CURTIDAS
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/20">
                      {article.stats.comments} COMENTÁRIOS
                    </div>
                    <Link to={`/artigo/${article.id}`} className="ml-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black group">
                      LER ARTIGO <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Archives Section */}
      <section className="mb-40 pt-32 border-t border-black/5">
        <div className="text-center mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-4 block">SISTEMA PULSO</span>
          <h2 className="text-5xl font-sans font-black text-black tracking-tight mb-6 uppercase">Arquivos de Pesquisa</h2>
          <div className="w-16 h-1 bg-black mx-auto rounded-full" />
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
          <div key={year} className="mb-24">
            <div className="flex items-center gap-6 mb-12">
              <h3 className="text-2xl font-black text-black tracking-tight">{year}</h3>
              <div className="flex-1 h-[1px] bg-black/5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {items
                .sort((a, b) => b.number - a.number)
                .map((item) => (
                <Link to={`/resultado/${item.id}`} key={item.id} className="group cursor-pointer">
                  <div className="relative rounded-[2.5rem] overflow-hidden aspect-video mb-6 shadow-premium bg-slate-50">
                    <img src={formatDriveUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-white px-4 py-1.5 rounded-full text-[9px] font-black text-black shadow-sm uppercase tracking-widest">
                      ED. #{String(item.number).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-black/20 mb-3">{item.date}</div>
                  <h4 className="text-2xl font-sans font-black text-black mb-4 line-clamp-2 leading-tight group-hover:opacity-70 transition-opacity">{item.title}</h4>
                  <div className="flex justify-between items-center text-[9px] font-black text-black/40 uppercase tracking-[0.2em] pt-4 border-t border-black/5">
                    <span>ACESSAR DADOS</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Sponsores / Partners Section (Infinite Ticker) */}
      <section className="py-20 border-t border-black/5 mb-32 overflow-hidden">
        <div className="text-center mb-16">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-black/10 italic">APOIO INSTITUCIONAL</span>
        </div>
        
        <div className="relative flex overflow-hidden">
          <div className="animate-ticker flex items-center gap-32 whitespace-nowrap opacity-20 hover:opacity-100 transition-opacity duration-700">
            {/* First Set */}
            {data.partners.map((partner) => (
              <div 
                key={partner.id} 
                className={`text-4xl font-black tracking-tighter text-black
                  ${partner.style === 'serif' ? 'font-serif' : 'font-sans'}
                  ${partner.isItalic ? 'italic' : 'not-italic'}
                  ${partner.isUppercase ? 'uppercase' : 'normal-case'}
                `}
              >
                {partner.name}
              </div>
            ))}

            {/* Duplicate for Seamless Loop */}
            {data.partners.map((partner) => (
              <div 
                key={`${partner.id}-dup`} 
                className={`text-4xl font-black tracking-tighter text-black
                  ${partner.style === 'serif' ? 'font-serif' : 'font-sans'}
                  ${partner.isItalic ? 'italic' : 'not-italic'}
                  ${partner.isUppercase ? 'uppercase' : 'normal-case'}
                `}
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </BlogLayout>
  );
}
