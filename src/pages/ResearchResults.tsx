import React, { useMemo, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { BlogLayout } from '../components/BlogLayout';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Users, 
  Calendar,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  FileText,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

export default function ResearchResults() {
  const { id } = useParams();
  const { data } = useBlog();
  const location = useLocation();
  
  const research = data.researches.find(r => r.id === id);
  const researchResponses = data.responses.filter(r => r.researchId === id);
  const totalResponses = researchResponses.length;

  const COLORS = ['#000000', '#334155', '#64748b', '#94a3b8', '#cbd5e1'];

  useEffect(() => {
    const originalTitle = document.title;
    if (research) {
      document.title = `Relatório PULSO - ${research.title}`;
    }
    
    const params = new URLSearchParams(location.search);
    if (params.get('print') === 'true' && research) {
      setTimeout(() => {
        window.print();
      }, 1000);
    }

    return () => {
      document.title = originalTitle;
    };
  }, [location, research]);

  const getStats = (questionId: string) => {
    const question = research?.questions.find(q => q.id === questionId);
    if (!question) return [];

    if (question.type === 'multiple' && question.options) {
      return question.options.map(opt => ({
        name: opt,
        value: researchResponses.filter(r => r.answers[questionId] === opt).length
      }));
    }

    if (question.type === 'rating') {
      return [1, 2, 3, 4, 5].map(val => ({
        name: `${val} Estrela${val > 1 ? 's' : ''}`,
        value: researchResponses.filter(r => Number(r.answers[questionId]) === val).length
      }));
    }

    return [];
  };

  if (!research) return null;

  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto">
        
        {/* PDF EXCLUSIVE COVER (Hidden on screen) */}
        <div className="hidden print:flex flex-col items-center justify-between min-h-screen text-center p-20 border-[1.5cm] border-slate-50">
           <div className="flex flex-col items-center">
              {data.branding.logoUrl ? (
                <img src={data.branding.logoUrl} className="h-32 w-auto mb-8" alt="Logo" />
              ) : (
                <h1 className="text-8xl font-serif font-black tracking-tighter mb-8">PULSO</h1>
              )}
              <div className="w-20 h-1 bg-slate-900 mb-12" />
           </div>

           <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                Relatório Consolidado de Dados
              </div>
              <h1 className="text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">{research.title}</h1>
              <p className="text-2xl font-serif italic text-slate-400 mt-6 max-w-2xl mx-auto">
                {research.description || 'Uma análise detalhada sobre a percepção pública e indicadores coletados pelo Portal PULSO.'}
              </p>
           </div>

           <div className="w-full max-w-2xl mx-auto border-t border-slate-100 pt-16 grid grid-cols-3 gap-12 text-left">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Edição</p>
                <p className="text-2xl font-black text-slate-900">#{String(research.number).padStart(2, '0')}/{research.year}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Amostragem</p>
                <p className="text-2xl font-black text-slate-900">{totalResponses} Respostas</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Data de Emissão</p>
                <p className="text-2xl font-black text-slate-900">{new Date().toLocaleDateString('pt-BR')}</p>
              </div>
           </div>
           
           <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
             Documento Oficial — Portal PULSO — {new Date().getFullYear()}
           </div>
           <div className="page-break" />
        </div>

        {/* Screen Content */}
        <div className="flex justify-between items-center mb-12 print:hidden">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors">
            <ArrowLeft size={16} /> Voltar ao Blog
          </Link>
          <div className="flex gap-4">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-black transition-all shadow-lg shadow-slate-200"
            >
              <Download size={16} /> Baixar PDF
            </button>
          </div>
        </div>

        {/* Hero Section (Hidden on Print because Cover exists) */}
        <header className="text-center space-y-6 mb-20 no-break print:hidden">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full font-black text-[10px] uppercase tracking-widest">
            <CheckCircle2 size={14} /> Resultados Consolidados
          </div>
          
          <h1 className="text-5xl md:text-6xl font-sans font-black text-slate-900 tracking-tight leading-tight">
            {research.title}
          </h1>

          <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
            {research.description || 'Relatório oficial detalhando a percepção e os dados coletados junto à nossa comunidade.'}
          </p>

          <div className="flex justify-center gap-12 pt-8 border-t border-slate-100 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900">{totalResponses}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Participantes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900">{research.date.split(' ')[0]} {research.year}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Data de Coleta</div>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="bg-white rounded-[3rem] p-16 border-4 border-slate-900 mb-20 shadow-soft-2xl relative overflow-hidden no-break">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <TrendingUp className="text-slate-900" size={32} />
              <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-slate-900">Resumo dos Resultados</h2>
            </div>
            <div className="space-y-12">
              <p className="text-2xl text-slate-800 leading-relaxed font-serif italic max-w-4xl">
                {research.executiveSummary}
              </p>
              <div className="p-10 bg-slate-50 rounded-[2rem] border-2 border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Insight Principal</div>
                  <div className="text-3xl font-black text-slate-900 leading-tight">"{research.mainInsight}"</div>
                </div>
                <div className="flex-shrink-0">
                  <Award className="text-slate-200" size={64} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="prose prose-slate prose-lg max-w-none mb-24 font-serif text-slate-700 leading-relaxed whitespace-pre-wrap">
          {research.content}
        </article>

        {/* Visualized Data Divider */}
        <div className="flex items-center gap-4 mb-20">
          <div className="flex-1 h-[1px] bg-slate-100" />
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 px-4">Indicadores e Dados</h3>
          <div className="flex-1 h-[1px] bg-slate-100" />
        </div>

        {/* Detailed Data */}
        <section className="space-y-24 mb-24">
          {research.questions.map((q, idx) => {
            const stats = getStats(q.id);
            return (
              <div key={q.id} className="space-y-10 no-break">
                <div className="flex gap-6 items-start">
                   <div className="text-5xl font-black text-slate-100">0{idx + 1}</div>
                   <h3 className="text-3xl font-sans font-black text-slate-900 tracking-tight pt-2 leading-tight">
                    {q.label}
                   </h3>
                </div>

                {q.type === 'text' ? (
                  <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <FileText className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1 text-lg">Respostas qualitativas</h4>
                      <p className="text-slate-500 text-sm">Esta pergunta gerou uma base rica de textos que estão sendo processados pela nossa equipe editorial.</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-soft-2xl">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        {q.type === 'multiple' ? (
                          <BarChart data={stats} layout="vertical" margin={{ left: 20, right: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={150} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#0f172a' }} />
                            <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="value" radius={[0, 12, 12, 0]} barSize={40}>
                              {stats.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        ) : (
                          <PieChart>
                            <Pie
                              data={stats}
                              innerRadius={80}
                              outerRadius={130}
                              paddingAngle={8}
                              dataKey="value"
                            >
                              {stats.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                          </PieChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
                      {stats.map((s, i) => (
                        <div key={i}>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.name}</div>
                          <div className="text-2xl font-black text-slate-900">
                            {totalResponses > 0 ? Math.round((s.value / totalResponses) * 100) : 0}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Final CTA */}
        <section className="text-center py-20 border-t border-slate-100 print:hidden">
           <h3 className="text-2xl font-black text-slate-900 mb-8">O PULSO continua batendo. Participe da próxima pesquisa!</h3>
           <Link to="/" className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-full font-black text-sm tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
             VER PESQUISAS ATUAIS
           </Link>
        </section>
      </div>
    </BlogLayout>
  );
}
