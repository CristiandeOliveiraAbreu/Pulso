import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { BlogLayout } from '../components/BlogLayout';
import { formatDriveUrl } from '../utils/formatters';
import { ArrowLeft, User, Share2, MessageCircle, Heart, ThumbsDown, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ArticleDetail() {
  const { id } = useParams();
  const { data, interactWithArticle, addArticleComment } = useBlog();
  
  const article = data.articles.find(a => a.id === id);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState({ author: '', content: '' });

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

  const handleInteraction = (type: 'like' | 'dislike') => {
    if (!hasInteracted) {
      interactWithArticle(article.id, type);
      setHasInteracted(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author || !newComment.content) return;
    
    addArticleComment(article.id, newComment);
    setNewComment({ author: '', content: '' });
    setShowCommentForm(false);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const scrollToComments = () => {
    document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
  };

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
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{article.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-400">
                <Heart size={20} className={article.stats.likes > 0 ? 'text-red-500 fill-red-500' : ''} /> 
                <span className="text-[10px] font-black">{article.stats.likes}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <ThumbsDown size={20} /> 
                <span className="text-[10px] font-black">{article.stats.dislikes}</span>
              </div>
              <button 
                onClick={scrollToComments}
                className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors"
              >
                <MessageCircle size={20} /> <span className="text-[10px] font-black">{article.stats.comments}</span>
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative rounded-[2.5rem] overflow-hidden mb-20 shadow-premium bg-white border border-slate-100 max-h-[70vh] flex items-center justify-center p-12">
          <img 
            src={formatDriveUrl(article.imageUrl)} 
            alt={article.title}
            className="w-full h-full object-contain max-h-[600px]"
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

        {/* Interaction Footer */}
        <footer id="comments-section" className="max-w-2xl mx-auto mt-32 pt-12 border-t border-slate-100 space-y-20">
          <div className="p-10 bg-slate-50 rounded-[3rem] text-center space-y-8">
            <h3 className="text-2xl font-black text-black uppercase tracking-tight">O que você achou deste conteúdo?</h3>
            <p className="text-slate-500 font-medium">Sua opinião é fundamental para mantermos o pulso da sociedade ativo.</p>
            
            <div className="flex flex-wrap justify-center gap-4">
               <button 
                 onClick={() => handleInteraction('like')}
                 disabled={hasInteracted}
                 className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${hasInteracted ? 'bg-slate-200 text-slate-400' : 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-100'}`}
               >
                 <Heart size={16} fill={hasInteracted ? 'none' : 'currentColor'} /> Gostei
               </button>
               <button 
                 onClick={() => handleInteraction('dislike')}
                 disabled={hasInteracted}
                 className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${hasInteracted ? 'bg-slate-200 text-slate-400' : 'bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-100'}`}
               >
                 <ThumbsDown size={16} /> Não Gostei
               </button>
               <button 
                 onClick={() => setShowCommentForm(!showCommentForm)}
                 className="bg-white border border-slate-200 text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
               >
                 Comentar
               </button>
            </div>

            <AnimatePresence>
              {showCommentForm && (
                <motion.form 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleCommentSubmit}
                  className="pt-8 space-y-4 text-left"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Seu nome"
                      value={newComment.author}
                      onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-6 py-4 text-sm font-medium outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                  <textarea 
                    placeholder="Sua opinião..."
                    value={newComment.content}
                    onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                    className="w-full bg-white border border-slate-200 rounded-xl px-6 py-4 text-sm font-medium outline-none focus:border-black transition-colors resize-none"
                    required
                  />
                  <button 
                    type="submit"
                    className="flex items-center gap-2 px-10 py-4 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all"
                  >
                    <Send size={14} /> Enviar Comentário
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Comments List */}
          <div className="space-y-12 pb-20">
            <h4 className="text-xl font-black text-black uppercase tracking-widest border-b border-slate-100 pb-6 flex items-center gap-3">
              <MessageCircle size={20} /> Comentários ({article.stats.comments})
            </h4>
            
            <div className="space-y-10">
              {(article.commentsList || []).map((comment) => (
                <div key={comment.id} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-black uppercase tracking-widest text-black">{comment.author}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{comment.date}</div>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-serif text-lg italic">
                    "{comment.content}"
                  </p>
                </div>
              ))}
              
              {(article.commentsList || []).length === 0 && (
                <p className="text-center text-slate-400 font-medium italic py-10">Nenhum comentário ainda. Seja o primeiro a opinar!</p>
              )}
            </div>
          </div>
        </footer>
      </article>
    </BlogLayout>
  );
}
