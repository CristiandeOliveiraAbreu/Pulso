import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { BlogLayout } from '../components/BlogLayout';
import { ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function ResearchDetail() {
  const { id } = useParams();
  const { data, submitResponse } = useBlog();
  const navigate = useNavigate();
  
  const research = data.researches.find(r => r.id === id);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!research) {
    return (
      <BlogLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Pesquisa não encontrada</h2>
          <Link to="/" className="text-primary font-bold hover:underline">Voltar para a página inicial</Link>
        </div>
      </BlogLayout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitResponse({
      researchId: research.id,
      answers,
      timestamp: new Date().toISOString()
    });
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswer = (qId: string, value: string | number) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  if (isSubmitted) {
    return (
      <BlogLayout>
        <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Obrigado pela sua participação!</h2>
            <p className="text-slate-500 font-medium">Sua voz foi registrada com sucesso e ajudará a construir um relatório completo sobre este tema.</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all"
          >
            Voltar ao Blog
          </button>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest mb-12 transition-colors">
          <ArrowLeft size={16} /> Voltar ao Blog
        </Link>

        <div className="space-y-4 mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{research.date}</span>
          <h1 className="text-5xl font-sans font-black text-slate-900 tracking-tight leading-tight">{research.title}</h1>
          <p className="text-slate-500 text-lg leading-relaxed">{research.description}</p>
          
          {research.introText && (
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mt-8">
              <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">{research.introText}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {research.questions.map((q, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={q.id} 
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-soft-xl space-y-6"
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm">{idx + 1}</span>
                <h3 className="text-xl font-bold text-slate-900">{q.label}</h3>
              </div>

              {q.type === 'multiple' && (
                <div className="grid grid-cols-1 gap-3">
                  {q.options?.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleAnswer(q.id, opt)}
                      className={`w-full text-left p-4 rounded-xl border-2 font-bold transition-all ${
                        answers[q.id] === opt 
                        ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/5' 
                        : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200 hover:bg-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {q.type === 'rating' && (
                <div className="flex justify-center gap-4">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleAnswer(q.id, val)}
                      className={`w-14 h-14 rounded-2xl border-2 font-black text-lg transition-all ${
                        answers[q.id] === val 
                        ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}

              {q.type === 'text' && (
                <textarea 
                  rows={4}
                  onChange={(e) => handleAnswer(q.id, e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl p-6 outline-none focus:border-primary focus:bg-white transition-all font-medium"
                  placeholder="Sua resposta aqui..."
                />
              )}
            </motion.div>
          ))}

          <div className="pt-8 text-center">
            <button 
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white px-12 py-5 rounded-full font-black text-sm tracking-widest flex items-center gap-3 mx-auto shadow-2xl shadow-primary/20 transition-all active:scale-95"
            >
              ENVIAR MINHA RESPOSTA <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </BlogLayout>
  );
}
