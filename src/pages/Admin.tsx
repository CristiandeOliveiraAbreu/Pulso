import React, { useState, useMemo, useEffect } from 'react';
import { useBlog, Question, Response, ArticleItem } from '../context/BlogContext';
import { 
  Save, 
  Settings, 
  Layout, 
  Share2, 
  FileText, 
  Image as ImageIcon,
  Plus,
  Trash2,
  ArrowLeft,
  BarChart as BarChartIcon,
  Copy,
  Download,
  List,
  Eye,
  CheckCircle,
  Clock,
  ChevronRight,
  Globe,
  Search,
  PenTool,
  Award,
  Mail,
  BookOpen,
  Upload,
  ThumbsDown,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { formatDriveUrl } from '../utils/formatters';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const { data, updateData, resetData } = useBlog();
  const [localData, setLocalData] = useState(data);
  const [activeTab, setActiveTab] = useState('branding');
  const [selectedResearchId, setSelectedResearchId] = useState(data.researches[0]?.id);
  const [isSaved, setIsSaved] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'results'>('edit');
  
  // Editorial State
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<'editor' | 'preview'>('editor');
  const [activeEditorialTab, setActiveEditorialTab] = useState<'Escritório' | 'Rascunhos' | 'Publicados'>('Escritório');

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleSave = () => {
    updateData(localData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updateSection = (section: string, field: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  // Article Management
  const addArticle = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newArticle: ArticleItem = {
      id: newId,
      title: 'Título do Novo Artigo',
      type: 'article',
      category: 'Geral',
      status: 'draft',
      author: 'Redação PULSO',
      date: new Date().toLocaleDateString('pt-BR'),
      lastEdited: 'Agora',
      imageUrl: '',
      excerpt: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      stats: { views: 0, likes: 0, comments: 0 }
    };
    setLocalData(prev => ({
      ...prev,
      articles: [newArticle, ...prev.articles]
    }));
    setEditingArticleId(newId);
  };

  const updateArticle = (id: string, field: keyof ArticleItem, value: any) => {
    setLocalData(prev => ({
      ...prev,
      articles: prev.articles.map(a => a.id === id ? { ...a, [field]: value } : a)
    }));
  };

  const removeArticle = (id: string) => {
    if (confirm('Excluir este artigo permanentemente?')) {
      setLocalData(prev => ({
        ...prev,
        articles: prev.articles.filter(a => a.id !== id)
      }));
      if (editingArticleId === id) setEditingArticleId(null);
    }
  };

  const currentArticle = localData.articles.find(a => a.id === editingArticleId);

  // Research Management
  const addResearch = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newItem = {
      id: newId,
      number: localData.researches.length + 1,
      year: new Date().getFullYear(),
      title: 'Nova Pesquisa',
      date: 'MAIO 2026',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
      description: '',
      executiveSummary: '',
      mainInsight: '',
      content: '',
      questions: []
    };
    setLocalData(prev => ({
      ...prev,
      researches: [...prev.researches, newItem]
    }));
    setSelectedResearchId(newId);
  };

  const updateResearchField = (id: string, field: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      researches: prev.researches.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeResearch = (id: string) => {
    if (confirm('Excluir esta pesquisa?')) {
      setLocalData(prev => ({
        ...prev,
        researches: prev.researches.filter(item => item.id !== id)
      }));
      if (selectedResearchId === id) setSelectedResearchId(localData.researches[0]?.id);
    }
  };

  const addQuestion = (researchId: string) => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'multiple',
      label: 'Nova Pergunta',
      options: ['Opção 1', 'Opção 2']
    };
    setLocalData(prev => ({
      ...prev,
      researches: prev.researches.map(r => 
        r.id === researchId ? { ...r, questions: [...r.questions, newQuestion] } : r
      )
    }));
  };

  const updateQuestion = (researchId: string, qId: string, field: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      researches: prev.researches.map(r => 
        r.id === researchId ? {
          ...r,
          questions: r.questions.map(q => q.id === qId ? { ...q, [field]: value } : q)
        } : r
      )
    }));
  };

  const removeQuestion = (researchId: string, qId: string) => {
    setLocalData(prev => ({
      ...prev,
      researches: prev.researches.map(r => 
        r.id === researchId ? { ...r, questions: r.questions.filter(q => q.id !== qId) } : r
      )
    }));
  };

  const removeSubscriber = (id: string) => {
    if (confirm('Excluir este contato da lista?')) {
      setLocalData(prev => ({
        ...prev,
        subscribers: prev.subscribers.filter(s => s.id !== id)
      }));
    }
  };

  const addPartner = () => {
    const newPartner = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'NOVA MARCA',
      style: 'serif' as const,
      isItalic: false,
      isUppercase: true
    };
    setLocalData(prev => ({
      ...prev,
      partners: [...prev.partners, newPartner]
    }));
  };

  const updatePartner = (id: string, field: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      partners: prev.partners.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const removePartner = (id: string) => {
    setLocalData(prev => ({
      ...prev,
      partners: prev.partners.filter(p => p.id !== id)
    }));
  };

  const getStats = (researchId: string, questionId: string) => {
    const researchResponses = data.responses.filter(r => r.researchId === researchId);
    const question = localData.researches.find(r => r.id === researchId)?.questions.find(q => q.id === questionId);
    
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

  const currentResearch = localData.researches.find(r => r.id === selectedResearchId);
  const statsAvailable = data.responses.filter(r => r.researchId === selectedResearchId).length;
  const COLORS = ['#000000', '#334155', '#64748b', '#94a3b8', '#cbd5e1'];

  // -------------------------------------------------------------------------
  // FULL EDITORIAL EDITOR VIEW
  // -------------------------------------------------------------------------
  if (editingArticleId && currentArticle) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Editor Top Bar */}
        <header className="h-20 border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 bg-white z-50">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => { handleSave(); setEditingArticleId(null); }} 
              className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setEditorMode('editor')}
                className={`px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${editorMode === 'editor' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Editor
              </button>
              <button 
                onClick={() => setEditorMode('preview')}
                className={`px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${editorMode === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Preview
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Salvamento Automático</span>
            <button 
              onClick={handleSave}
              className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isSaved ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-black'}`}
            >
              {isSaved ? 'Artigo Salvo' : 'Publicar'}
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Writing Area */}
          <main className="flex-1 overflow-y-auto p-20 custom-scrollbar">
            {editorMode === 'editor' ? (
              <div className="max-w-3xl mx-auto space-y-12">
                <div className="relative group aspect-video rounded-[2.5rem] overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200">
                  {currentArticle.imageUrl ? (
                    <img src={formatDriveUrl(currentArticle.imageUrl)} className="w-full h-full object-cover" alt="Cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon size={48} className="mb-4" />
                      <p className="font-black text-[10px] uppercase tracking-widest">Clique para adicionar imagem de capa</p>
                    </div>
                  )}
                  <input 
                    type="text" 
                    placeholder="Cole a URL da imagem aqui..."
                    value={currentArticle.imageUrl}
                    onChange={(e) => updateArticle(currentArticle.id, 'imageUrl', e.target.value)}
                    className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <textarea 
                  value={currentArticle.title}
                  onChange={(e) => updateArticle(currentArticle.id, 'title', e.target.value)}
                  placeholder="Título do Artigo..."
                  className="w-full text-5xl font-black tracking-tighter text-slate-900 outline-none resize-none placeholder:text-slate-200"
                  rows={2}
                />

                <textarea 
                  value={currentArticle.content}
                  onChange={(e) => updateArticle(currentArticle.id, 'content', e.target.value)}
                  placeholder="Comece a escrever o seu editorial aqui..."
                  className="w-full text-lg font-serif text-slate-700 outline-none min-h-[500px] leading-relaxed placeholder:text-slate-200"
                />
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-12 pb-20">
                 <img src={formatDriveUrl(currentArticle.imageUrl)} className="w-full aspect-video object-cover rounded-[2.5rem] shadow-soft-2xl" alt="" />
                 <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-tight">{currentArticle.title}</h1>
                 <div className="flex gap-4 items-center border-y border-slate-100 py-6">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-serif italic font-bold">RE</div>
                    <div>
                      <div className="text-xs font-black text-slate-900 uppercase tracking-widest">{currentArticle.author}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{currentArticle.date} • 5 min de leitura</div>
                    </div>
                 </div>
                 <div className="prose prose-slate prose-xl max-w-none font-serif text-slate-700 leading-relaxed whitespace-pre-wrap">
                   {currentArticle.content || 'Sem conteúdo para pré-visualizar.'}
                 </div>
              </div>
            )}
          </main>

          {/* Right Settings Sidebar */}
          <aside className="w-80 border-l border-slate-100 p-8 overflow-y-auto custom-scrollbar space-y-10">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Configurações</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Status do Post</label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                    <button 
                      onClick={() => updateArticle(currentArticle.id, 'status', 'draft')}
                      className={`py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${currentArticle.status === 'draft' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      Rascunho
                    </button>
                    <button 
                      onClick={() => updateArticle(currentArticle.id, 'status', 'published')}
                      className={`py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${currentArticle.status === 'published' ? 'bg-green-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      Publicado
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Classificação</label>
                  <select 
                    value={currentArticle.type}
                    onChange={(e) => updateArticle(currentArticle.id, 'type', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black outline-none focus:border-slate-900"
                  >
                    <option value="article">Artigo Comum</option>
                    <option value="opinion">Opinião / Editorial</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Categoria</label>
                  <input 
                    type="text" 
                    value={currentArticle.category}
                    onChange={(e) => updateArticle(currentArticle.id, 'category', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-black outline-none focus:border-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-2">
                <Globe size={14} /> Metadados SEO
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Meta Title</label>
                  <input 
                    type="text" 
                    value={currentArticle.metaTitle}
                    onChange={(e) => updateArticle(currentArticle.id, 'metaTitle', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-slate-900"
                    placeholder="Título para o Google..."
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Meta Description</label>
                  <textarea 
                    value={currentArticle.metaDescription}
                    onChange={(e) => updateArticle(currentArticle.id, 'metaDescription', e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-slate-900 leading-relaxed"
                    placeholder="Descrição para os resultados de busca..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                  <Heart size={16} className="mx-auto mb-2 text-red-500" fill="currentColor" />
                  <div className="text-lg font-black text-slate-900">{currentArticle.stats.likes}</div>
                  <div className="text-[8px] font-black uppercase text-slate-400">Likes</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                  <ThumbsDown size={16} className="mx-auto mb-2 text-slate-400" />
                  <div className="text-lg font-black text-slate-900">{currentArticle.stats.dislikes}</div>
                  <div className="text-[8px] font-black uppercase text-slate-400">Nãos</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                  <MessageCircle size={16} className="mx-auto mb-2 text-slate-400" />
                  <div className="text-lg font-black text-slate-900">{currentArticle.stats.comments}</div>
                  <div className="text-[8px] font-black uppercase text-slate-400">Coment.</div>
                </div>
              </div>

              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Visuais</h3>
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner mb-6">
                {currentArticle.imageUrl ? (
                  <img src={formatDriveUrl(currentArticle.imageUrl)} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon size={24} />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="file" 
                    id={`article-img-${currentArticle.id}`} 
                    className="hidden" 
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      
                      try {
                        const fileExt = file.name.split('.').pop();
                        const fileName = `article-${Date.now()}.${fileExt}`;
                        const filePath = `articles/${fileName}`;

                        const { error: uploadError } = await supabase.storage
                          .from('branding') // Using same bucket for now, ideally separate
                          .upload(filePath, file);

                        if (uploadError) throw uploadError;

                        const { data: { publicUrl } } = supabase.storage
                          .from('branding')
                          .getPublicUrl(filePath);

                        updateArticle(currentArticle.id, 'imageUrl', publicUrl);
                        alert('Imagem enviada com sucesso!');
                      } catch (error: any) {
                        alert('Erro ao enviar imagem: ' + error.message);
                      }
                    }}
                  />
                  <label 
                    htmlFor={`article-img-${currentArticle.id}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-black cursor-pointer transition-all shadow-lg"
                  >
                    <Upload size={14} /> Trocar Imagem (Upload)
                  </label>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Ou cole a URL da imagem</label>
                  <input 
                    type="text" 
                    value={currentArticle.imageUrl}
                    onChange={(e) => updateArticle(currentArticle.id, 'imageUrl', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[10px] font-medium outline-none focus:border-slate-900"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => removeArticle(currentArticle.id)}
              className="w-full py-4 rounded-2xl bg-red-50 text-red-500 font-black text-[9px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all mt-10"
            >
              Excluir Artigo
            </button>
          </aside>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // MAIN DASHBOARD VIEW
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-30">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-2xl font-black tracking-tighter italic">PULSO <span className="text-white/40 not-italic">ADMIN</span></h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {[
            { id: 'branding', label: 'Identidade', icon: Settings },
            { id: 'hero', label: 'Hero / Destaque', icon: Layout },
            { id: 'opinion', label: 'Escritório Editorial', icon: PenTool },
            { id: 'research', label: 'Pesquisas', icon: BarChartIcon },
            { id: 'newsletter', label: 'Newsletter', icon: Mail },
            { id: 'partners', label: 'Parceiros & Contato', icon: Share2 },
            { id: 'about', label: 'Sobre', icon: BookOpen },
            { id: 'social', label: 'Configurações', icon: Globe },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest ${
                activeTab === tab.id ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-4 text-slate-400 hover:text-white font-black text-xs uppercase tracking-widest transition-colors">
            <ArrowLeft size={18} />
            Ver Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 px-10 py-6 flex justify-between items-center sticky top-0 z-20">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            {activeTab === 'branding' && 'Identidade Visual'}
            {activeTab === 'hero' && 'Destaque Principal'}
            {activeTab === 'opinion' && 'Escritório Editorial'}
            {activeTab === 'research' && 'Sistema de Pesquisas'}
            {activeTab === 'newsletter' && 'Gestão de Leads / Newsletter'}
            {activeTab === 'partners' && 'Parceiros & Contato'}
            {activeTab === 'social' && 'Redes e Rodapé'}
          </h2>

          <div className="flex gap-4">
            <button 
              onClick={handleSave}
              className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-95 ${
                isSaved ? 'bg-green-500 text-white shadow-green-200' : 'bg-slate-900 hover:bg-black text-white shadow-slate-200'
              }`}
            >
              {isSaved ? 'DADOS SALVOS COM SUCESSO' : <><Save size={18} /> Salvar Alterações</>}
            </button>
          </div>
        </header>

        <div className="p-10 max-w-6xl mx-auto w-full">
          
          {/* Escritório Editorial (Opinião) */}
          {activeTab === 'opinion' && (
            <div className="space-y-12">
              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft-xl">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Alcance Total</div>
                  <div className="text-5xl font-black text-slate-900 mb-4">{localData.articles.reduce((acc, a) => acc + a.stats.views, 0).toLocaleString()}</div>
                  <div className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-2"><CheckCircle size={12} /> Tráfego Geral</div>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft-xl">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Rascunhos</div>
                  <div className="text-5xl font-black text-slate-900 mb-4">{localData.articles.filter(a => a.status === 'draft').length}</div>
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2"><Clock size={12} /> Não publicados</div>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft-xl">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Engajamento</div>
                  <div className="text-4xl font-black text-slate-900 mb-4 flex items-center gap-4">
                    <span className="flex items-center gap-2 text-red-500"><Heart size={24} fill="currentColor" /> {localData.articles.reduce((acc, a) => acc + a.stats.likes, 0)}</span>
                    <span className="flex items-center gap-2 text-slate-400"><ThumbsDown size={24} /> {localData.articles.reduce((acc, a) => acc + a.stats.dislikes, 0)}</span>
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><MessageCircle size={12} /> {localData.articles.reduce((acc, a) => acc + a.stats.comments, 0)} Total de Comentários</div>
                </div>
              </div>

              {/* Editorial Content Management */}
              <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-soft-2xl overflow-hidden">
                <div className="flex border-b border-slate-100 px-8">
                  {['Escritório', 'Rascunhos', 'Publicados'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveEditorialTab(tab as any)}
                      className={`px-8 py-8 text-[10px] font-black uppercase tracking-[0.3em] border-b-4 transition-all ${
                        activeEditorialTab === tab ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-300 hover:text-slate-500'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-12 space-y-10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Fluxo Editorial</h3>
                    <button 
                      onClick={addArticle}
                      className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200"
                    >
                      <Plus size={18} /> Novo Artigo
                    </button>
                  </div>

                  <div className="space-y-4">
                    {localData.articles
                      .filter(a => {
                        if (activeEditorialTab === 'Rascunhos') return a.status === 'draft';
                        if (activeEditorialTab === 'Publicados') return a.status === 'published';
                        return true;
                      })
                      .map((article) => (
                      <div 
                        key={article.id}
                        onClick={() => setEditingArticleId(article.id)}
                        className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex justify-between items-center group hover:bg-white hover:shadow-soft-2xl transition-all cursor-pointer border-l-8 border-l-transparent hover:border-l-slate-900"
                      >
                        <div className="flex items-center gap-8">
                          <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                            {article.imageUrl ? (
                              <img src={formatDriveUrl(article.imageUrl)} className="w-full h-full object-cover" alt="" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-200"><FileText size={24} /></div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100">{article.type === 'opinion' ? 'Editorial' : 'Artigo'}</span>
                               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">/ {article.category}</span>
                            </div>
                            <h4 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{article.title}</h4>
                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-2 flex items-center gap-2">
                               <Clock size={10} /> {article.lastEdited} • {article.author}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right hidden md:block">
                             <div className="text-lg font-black text-slate-900">{article.stats.views.toLocaleString()}</div>
                             <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Views</div>
                          </div>
                          <div className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${article.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}>
                            {article.status === 'published' ? 'Ao vivo' : 'Rascunho'}
                          </div>
                          <ChevronRight size={20} className="text-slate-200 group-hover:text-slate-900 transition-all transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    ))}
                    
                    {localData.articles.length === 0 && (
                      <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                         <PenTool size={48} className="mx-auto text-slate-200 mb-4" />
                         <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Nenhum artigo encontrado nesta pasta.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sistema de Pesquisas */}
          {activeTab === 'research' && (
            <div className="space-y-12">
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-soft-xl">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Gestão de Pesquisas</h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={addResearch}
                      className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200"
                    >
                      <Plus size={18} /> Nova Edição
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {localData.researches
                    .sort((a, b) => b.year !== a.year ? b.year - a.year : b.number - a.number)
                    .map(r => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedResearchId(r.id)}
                      className={`w-full group p-6 rounded-[2rem] border-2 transition-all text-left flex items-center justify-between ${
                        selectedResearchId === r.id 
                        ? 'border-slate-900 bg-white shadow-xl translate-x-2' 
                        : 'border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-8">
                        <div className={`text-3xl font-black ${selectedResearchId === r.id ? 'text-slate-900' : 'text-slate-200'} transition-colors`}>
                          #{String(r.number).padStart(2, '0')}
                        </div>
                        <div>
                          <h4 className={`text-lg font-black leading-tight ${selectedResearchId === r.id ? 'text-slate-900' : 'text-slate-500'}`}>{r.title}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{r.date} • {r.year}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</div>
                           <div className="text-xs font-black text-slate-900">Coleta Ativa</div>
                        </div>
                        <ChevronRight size={20} className={`${selectedResearchId === r.id ? 'text-slate-900' : 'text-slate-200'} group-hover:translate-x-1 transition-all`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {currentResearch && (
                <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-soft-2xl overflow-hidden">
                  <div className="flex justify-between items-center p-10 border-b border-slate-100">
                     <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                        <button onClick={() => setViewMode('edit')} className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'edit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Construtor</button>
                        <button onClick={() => setViewMode('results')} className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'results' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Estatísticas</button>
                     </div>
                     <div className="flex gap-4">
                        <button onClick={() => window.open(`/resultado/${currentResearch.id}?print=true`, '_blank')} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black shadow-xl shadow-slate-200 transition-all"><Download size={16} /> Relatório PDF</button>
                     </div>
                  </div>

                  <div className="p-12">
                     {viewMode === 'edit' ? (
                       <div className="grid grid-cols-12 gap-12">
                          <div className="col-span-8 space-y-10">
                             <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Título Oficial</label>
                                <input type="text" value={currentResearch.title} onChange={(e) => updateResearchField(currentResearch.id, 'title', e.target.value)} className="w-full text-4xl font-black tracking-tight outline-none border-b border-slate-100 pb-4 focus:border-slate-900 transition-all" />
                             </div>
                             <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Descrição e Objetivo</label>
                                <textarea rows={2} value={currentResearch.description} onChange={(e) => updateResearchField(currentResearch.id, 'description', e.target.value)} className="w-full text-lg font-medium text-slate-500 outline-none leading-relaxed resize-none" />
                             </div>

                             <div className="space-y-6 pt-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Texto de Introdução (Instruções da Pesquisa)</label>
                                <textarea rows={6} value={currentResearch.introText || ''} onChange={(e) => updateResearchField(currentResearch.id, 'introText', e.target.value)} placeholder="Explique os detalhes da pesquisa, regras ou objetivos aqui. Este texto aparecerá antes das perguntas." className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] px-8 py-6 text-sm font-medium text-slate-600 outline-none focus:border-slate-900 transition-all resize-none" />
                             </div>
                             
                             <div className="pt-10 border-t border-slate-100 space-y-8">
                                <div className="flex justify-between items-center">
                                   <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Perguntas da Pesquisa</h3>
                                   <button onClick={() => addQuestion(currentResearch.id)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 flex items-center gap-2"><Plus size={14} /> Adicionar</button>
                                </div>
                                <div className="space-y-6">
                                   {currentResearch.questions.map((q, i) => (
                                      <div key={q.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group relative">
                                         <button onClick={() => removeQuestion(currentResearch.id, q.id)} className="absolute top-8 right-8 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                                         <div className="flex gap-6">
                                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-black text-xs text-slate-900">{i+1}</div>
                                            <div className="flex-1 space-y-6">
                                               <input type="text" value={q.label} onChange={(e) => updateQuestion(currentResearch.id, q.id, 'label', e.target.value)} className="w-full bg-transparent font-black text-xl outline-none" />
                                               <div className="flex gap-4">
                                                  <select value={q.type} onChange={(e) => updateQuestion(currentResearch.id, q.id, 'type', e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase">
                                                     <option value="multiple">Múltipla</option>
                                                     <option value="rating">Rating</option>
                                                     <option value="text">Texto</option>
                                                  </select>
                                                  {q.type === 'multiple' && (
                                                     <input type="text" value={q.options?.join(', ')} onChange={(e) => updateQuestion(currentResearch.id, q.id, 'options', e.target.value.split(',').map(s => s.trim()))} className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] font-medium" placeholder="Opções separadas por vírgula..." />
                                                  )}
                                               </div>
                                            </div>
                                         </div>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          </div>

                          <div className="col-span-4 space-y-10">
                             <div className="bg-slate-50 rounded-[2.5rem] p-8 space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identidade</h4>
                                <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-white shadow-soft-lg flex items-center justify-center">
                                   {currentResearch.image ? (
                                     <img 
                                       src={formatDriveUrl(currentResearch.image)} 
                                       className="w-full h-full object-cover" 
                                       alt="Preview" 
                                       onError={(e) => {
                                         (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800';
                                       }}
                                     />
                                   ) : (
                                     <div className="text-slate-300">Sem imagem</div>
                                   )}
                                 </div>
                                 
                                 <div className="space-y-4">
                                   <div className="relative">
                                     <input 
                                       type="file" 
                                       id={`research-img-${currentResearch.id}`} 
                                       className="hidden" 
                                       accept="image/*"
                                       onChange={async (e) => {
                                         const file = e.target.files?.[0];
                                         if (!file) return;
                                         
                                         try {
                                           const fileExt = file.name.split('.').pop();
                                           const fileName = `research-${Date.now()}.${fileExt}`;
                                           const filePath = `researches/${fileName}`;

                                           const { error: uploadError } = await supabase.storage
                                             .from('branding')
                                             .upload(filePath, file);

                                           if (uploadError) throw uploadError;

                                           const { data: { publicUrl } } = supabase.storage
                                             .from('branding')
                                             .getPublicUrl(filePath);

                                           updateResearchField(currentResearch.id, 'image', publicUrl);
                                         } catch (error) {
                                           console.error('Error uploading image:', error);
                                           alert('Erro ao carregar imagem. Verifique sua conexão.');
                                         }
                                       }}
                                     />
                                     <label 
                                       htmlFor={`research-img-${currentResearch.id}`}
                                       className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-900 hover:bg-slate-50 cursor-pointer shadow-sm transition-all"
                                     >
                                       <Upload size={16} /> Carregar Arquivo
                                     </label>
                                   </div>

                                   <div className="relative">
                                     <input 
                                       type="text" 
                                       value={currentResearch.image} 
                                       onChange={(e) => updateResearchField(currentResearch.id, 'image', e.target.value)} 
                                       placeholder="Ou cole a URL da imagem aqui..."
                                       className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[10px] font-medium outline-none focus:border-slate-900" 
                                     />
                                   </div>
                                 </div>
                                <div className="grid grid-cols-2 gap-4">
                                   <div>
                                      <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Edição</label>
                                      <input type="number" value={currentResearch.number} onChange={(e) => updateResearchField(currentResearch.id, 'number', Number(e.target.value))} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-black text-center" />
                                   </div>
                                   <div>
                                      <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Ano</label>
                                      <input type="number" value={currentResearch.year} onChange={(e) => updateResearchField(currentResearch.id, 'year', Number(e.target.value))} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-black text-center" />
                                   </div>
                                </div>
                             </div>

                             <div className="p-8 bg-red-50 rounded-[2.5rem] space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-red-400">Zona de Perigo</h4>
                                <button onClick={() => removeResearch(currentResearch.id)} className="w-full py-4 bg-white text-red-500 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-sm hover:bg-red-500 hover:text-white transition-all">Excluir Edição</button>
                             </div>
                          </div>
                       </div>
                     ) : (
                       <div className="space-y-16">
                          <div className="grid grid-cols-3 gap-8">
                             <div className="bg-slate-900 p-10 rounded-[3rem] text-white">
                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Respostas</div>
                                <div className="text-5xl font-black">{statsAvailable}</div>
                             </div>
                             <div className="bg-slate-50 p-10 rounded-[3rem]">
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Status</div>
                                <div className="text-2xl font-black text-slate-900 uppercase">Coleta Ativa</div>
                             </div>
                             <div className="bg-slate-50 p-10 rounded-[3rem]">
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Edição</div>
                                <div className="text-2xl font-black text-slate-900 uppercase">#{String(currentResearch.number).padStart(2, '0')}/{currentResearch.year}</div>
                             </div>
                          </div>

                          <div className="bg-slate-50 rounded-[3rem] p-12 space-y-10">
                             <h3 className="text-xl font-black text-slate-900">Escrita Analítica</h3>
                             <div className="space-y-8">
                                <div>
                                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Insight Principal</label>
                                   <input type="text" value={currentResearch.mainInsight} onChange={(e) => updateResearchField(currentResearch.id, 'mainInsight', e.target.value)} className="w-full bg-white border border-slate-200 rounded-[2rem] px-8 py-6 text-2xl font-serif italic text-slate-900 shadow-sm focus:border-slate-900 outline-none transition-all" />
                                </div>
                                <div>
                                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Resumo Executivo</label>
                                   <textarea rows={4} value={currentResearch.executiveSummary} onChange={(e) => updateResearchField(currentResearch.id, 'executiveSummary', e.target.value)} className="w-full bg-white border border-slate-200 rounded-[2rem] px-8 py-6 text-lg font-medium text-slate-600 shadow-sm focus:border-slate-900 outline-none leading-relaxed" />
                                </div>
                                <div>
                                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Corpo do Artigo</label>
                                   <textarea rows={15} value={currentResearch.content} onChange={(e) => updateResearchField(currentResearch.id, 'content', e.target.value)} className="w-full bg-white border border-slate-200 rounded-[2rem] px-8 py-8 text-lg font-serif text-slate-700 shadow-sm focus:border-slate-900 outline-none leading-relaxed" />
                                </div>
                             </div>
                          </div>

                          <div className="space-y-20 pt-10">
                             {currentResearch.questions.map((q, i) => {
                                const stats = getStats(currentResearch.id, q.id);
                                return (
                                   <div key={q.id} className="space-y-8">
                                      <div className="flex gap-4 items-center">
                                         <span className="text-5xl font-black text-slate-100">0{i+1}</span>
                                         <h4 className="text-2xl font-black text-slate-900">{q.label}</h4>
                                      </div>
                                      {q.type !== 'text' && (
                                         <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-soft-2xl h-[450px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                               {q.type === 'multiple' ? (
                                                  <BarChart data={stats} layout="vertical">
                                                     <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                                     <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                                     <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{ fontSize: 11, fontWeight: 'bold' }} />
                                                     <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                                     <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={32}>
                                                        {stats.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                                     </Bar>
                                                  </BarChart>
                                               ) : (
                                                  <PieChart>
                                                     <Pie data={stats} innerRadius={80} outerRadius={130} paddingAngle={8} dataKey="value">
                                                        {stats.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                                     </Pie>
                                                     <Tooltip />
                                                     <Legend />
                                                  </PieChart>
                                               )}
                                            </ResponsiveContainer>
                                         </div>
                                      )}
                                   </div>
                                );
                             })}
                          </div>
                       </div>
                     )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Social settings */}
          {activeTab === 'social' && (
            <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-soft-xl space-y-12">
               <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Redes Sociais</h4>
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Facebook URL</label>
                        <input type="text" value={localData.social.facebook} onChange={(e) => updateSection('social', 'facebook', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-900 outline-none" />
                     </div>
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Instagram URL</label>
                        <input type="text" value={localData.social.instagram} onChange={(e) => updateSection('social', 'instagram', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-900 outline-none" />
                     </div>
                  </div>
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rodapé</h4>
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Newsletter Título</label>
                        <input type="text" value={localData.footer.newsletterTitle} onChange={(e) => updateSection('footer', 'newsletterTitle', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-900 outline-none" />
                     </div>
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Newsletter Descrição</label>
                        <input type="text" value={localData.footer.newsletterDesc} onChange={(e) => updateSection('footer', 'newsletterDesc', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-900 outline-none" />
                     </div>
                  </div>
               </div>
                
                <div className="pt-12 border-t border-slate-100">
                  <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2">
                       <h4 className="text-sm font-black text-red-900 uppercase tracking-widest">Sincronização de Emergência</h4>
                       <p className="text-xs text-red-700 font-medium max-w-md">Se o seu painel editorial não atualizou, utilize este botão para forçar a limpeza do banco de dados local e carregar o novo sistema.</p>
                    </div>
                    <button 
                      onClick={() => { if(confirm('Isso resetará os dados para o padrão editorial. Continuar?')){ resetData(); window.location.reload(); } }}
                      className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-700 shadow-xl shadow-red-200 transition-all whitespace-nowrap"
                    >
                      Resetar e Atualizar Sistema
                    </button>
                  </div>
                </div>
              </div>
            )}

          {/* Branding */}
          {activeTab === 'branding' && (
            <div className="space-y-10">
              <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-soft-xl">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">Logotipo do Portal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="p-12 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center flex items-center justify-center min-h-[200px] overflow-hidden">
                      {localData.branding.logoUrl ? (
                        <img src={formatDriveUrl(localData.branding.logoUrl)} className="max-h-32 object-contain" alt="Logo Preview" />
                      ) : (
                        <div className="space-y-2">
                          <ImageIcon size={48} className="mx-auto text-slate-200 mb-2" />
                          <div className="text-slate-300 font-black text-2xl tracking-tighter uppercase italic">TEXTO: PULSO</div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhuma imagem detectada</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Link da Logomarca (ou Upload abaixo)</label>
                      <input 
                        type="text" 
                        value={localData.branding.logoUrl} 
                        onChange={(e) => updateSection('branding', 'logoUrl', e.target.value)} 
                        placeholder="https://link-da-logo.png" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:border-slate-900 outline-none font-medium transition-all" 
                      />
                    </div>
                    
                    <div className="relative">
                      <input 
                        type="file" 
                        id="logo-upload" 
                        className="hidden" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          
                          try {
                            const fileExt = file.name.split('.').pop();
                            const fileName = `logo-${Math.random()}.${fileExt}`;
                            const filePath = `${fileName}`;

                            // Upload to 'branding' bucket
                            const { error: uploadError } = await supabase.storage
                              .from('branding')
                              .upload(filePath, file);

                            if (uploadError) throw uploadError;

                            const { data: { publicUrl } } = supabase.storage
                              .from('branding')
                              .getPublicUrl(filePath);

                            updateSection('branding', 'logoUrl', publicUrl);
                            alert('Logo enviada com sucesso!');
                          } catch (error: any) {
                            console.error('Erro no upload:', error.message);
                            alert('Erro ao enviar imagem. Verifique se o bucket "branding" existe no seu Supabase.');
                          }
                        }}
                      />
                      <label 
                        htmlFor="logo-upload"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black cursor-pointer transition-all shadow-lg"
                      >
                        <Upload size={16} /> Anexar Imagem (Upload)
                      </label>
                    </div>

                    <p className="text-[9px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                      Dica: Use imagens em formato PNG com fundo transparente para um acabamento premium. O upload requer um Bucket chamado "branding" no seu Supabase.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-soft-xl">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">Slogan & Visibilidade</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Texto da Tagline</label>
                    <input 
                      type="text" 
                      value={localData.branding.tagline} 
                      onChange={(e) => updateSection('branding', 'tagline', e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:border-slate-900 outline-none font-medium transition-all" 
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-4 cursor-pointer group p-6 bg-slate-50 rounded-2xl w-full border border-transparent hover:border-slate-200 transition-all">
                      <input 
                        type="checkbox" 
                        checked={localData.branding.showTagline} 
                        onChange={(e) => updateSection('branding', 'showTagline', e.target.checked)} 
                        className="w-6 h-6 rounded-lg border-slate-200 text-slate-900 focus:ring-slate-900" 
                      />
                      <div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-900 block">Exibir slogan no site</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Ativar/Desativar no cabeçalho</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sobre Content */}
          {activeTab === 'about' && (
            <div className="space-y-10">
              <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-soft-xl">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">Conteúdo da Página Sobre</h3>
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Título Principal</label>
                    <input 
                      type="text" 
                      value={localData.about.title} 
                      onChange={(e) => updateSection('about', 'title', e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:border-slate-900 outline-none font-medium transition-all" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Citação / Quote</label>
                    <textarea 
                      value={localData.about.quote} 
                      onChange={(e) => updateSection('about', 'quote', e.target.value)} 
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:border-slate-900 outline-none font-medium transition-all resize-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-soft-xl">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">Texto Detalhado</h3>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">História / Manifesto</label>
                  <textarea 
                    value={localData.about.detailedText} 
                    onChange={(e) => updateSection('about', 'detailedText', e.target.value)} 
                    rows={8}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:border-slate-900 outline-none font-medium transition-all resize-none" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Hero settings */}
          {activeTab === 'hero' && (
            <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-soft-xl space-y-12">
               <div className="grid grid-cols-12 gap-12">
                  <div className="col-span-8 space-y-8">
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Título do Hero</label>
                        <input type="text" value={localData.hero.title} onChange={(e) => updateSection('hero', 'title', e.target.value)} className="w-full text-3xl font-black tracking-tight outline-none border-b border-slate-100 pb-4 focus:border-slate-900" />
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Tag de Destaque</label>
                           <input type="text" value={localData.hero.tag} onChange={(e) => updateSection('hero', 'tag', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-900 outline-none" />
                        </div>
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Texto do Botão</label>
                           <input type="text" value={localData.hero.buttonText} onChange={(e) => updateSection('hero', 'buttonText', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-900 outline-none" />
                        </div>
                     </div>
                  </div>
                  <div className="col-span-4 space-y-6">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Imagem do Hero</label>
                     <div className="aspect-square rounded-3xl overflow-hidden border border-slate-100 shadow-soft-xl">
                        <img src={formatDriveUrl(localData.hero.imageUrl)} className="w-full h-full object-cover" alt="" />
                     </div>
                     <input type="text" value={localData.hero.imageUrl} onChange={(e) => updateSection('hero', 'imageUrl', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[10px] outline-none" />
                  </div>
               </div>
            </div>
          )}

          {/* Newsletter / Leads */}
          {activeTab === 'newsletter' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft-xl">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Total de Inscritos</div>
                  <div className="text-5xl font-black text-slate-900 mb-4">{localData.subscribers.length}</div>
                  <div className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-2"><CheckCircle size={12} /> Audiência Ativa</div>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft-xl">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Taxa de Conversão</div>
                  <div className="text-5xl font-black text-slate-900 mb-4">--</div>
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2"><Globe size={12} /> Em processamento</div>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft-xl flex flex-col justify-center">
                  <button className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
                    <Download size={18} /> Exportar Lista (.CSV)
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-soft-2xl overflow-hidden">
                <div className="p-12 space-y-10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Lista de Contatos</h3>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input type="text" placeholder="Buscar e-mail..." className="pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs outline-none focus:bg-white focus:border-slate-200 transition-all min-w-[280px]" />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-50">
                          <th className="text-left py-6 text-[10px] font-black uppercase tracking-widest text-slate-300">E-mail do Usuário</th>
                          <th className="text-left py-6 text-[10px] font-black uppercase tracking-widest text-slate-300">Data de Inscrição</th>
                          <th className="text-right py-6 text-[10px] font-black uppercase tracking-widest text-slate-300">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {localData.subscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="group hover:bg-slate-50 transition-all">
                            <td className="py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                  <Mail size={16} />
                                </div>
                                <span className="font-bold text-slate-900">{subscriber.email}</span>
                              </div>
                            </td>
                            <td className="py-6">
                              <span className="text-xs font-medium text-slate-500">{subscriber.date}</span>
                            </td>
                            <td className="py-6 text-right">
                              <button 
                                onClick={() => removeSubscriber(subscriber.id)}
                                className="p-3 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {localData.subscribers.length === 0 && (
                      <div className="text-center py-20">
                         <Mail size={48} className="mx-auto text-slate-100 mb-4" />
                         <p className="text-slate-300 font-black uppercase tracking-widest text-[10px]">A lista de newsletter está vazia no momento.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Parceiros & Contato */}
          {activeTab === 'partners' && (
            <div className="space-y-12 pb-20">
              {/* Informações de Contato */}
              <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-soft-xl">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">Informações de Contato Oficiais</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">E-mail de Contato</label>
                    <input 
                      type="text" 
                      value={localData.contact.email} 
                      onChange={(e) => updateSection('contact', 'email', e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:border-slate-900 outline-none font-medium transition-all" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Telefone / WhatsApp</label>
                    <input 
                      type="text" 
                      value={localData.contact.phone} 
                      onChange={(e) => updateSection('contact', 'phone', e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:border-slate-900 outline-none font-medium transition-all" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Endereço Físico</label>
                    <input 
                      type="text" 
                      value={localData.contact.address} 
                      onChange={(e) => updateSection('contact', 'address', e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:border-slate-900 outline-none font-medium transition-all" 
                    />
                  </div>
                </div>
              </div>

              {/* Ticker de Parceiros */}
              <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-soft-2xl overflow-hidden">
                <div className="p-12 space-y-10">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Apoio Institucional (Marcas)</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">As marcas abaixo aparecerão no "ticker" infinito do site.</p>
                    </div>
                    <button 
                      onClick={addPartner}
                      className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl"
                    >
                      <Plus size={18} /> Adicionar Marca
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {localData.partners.map((partner) => (
                      <div key={partner.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6 group hover:bg-white hover:shadow-soft-2xl transition-all">
                        <div className="flex justify-between items-start">
                          <div className={`h-16 flex items-center justify-center px-6 bg-white rounded-2xl border border-slate-100 shadow-sm min-w-[120px] transition-all
                            ${partner.style === 'serif' ? 'font-serif' : 'font-sans'}
                            ${partner.isItalic ? 'italic' : 'not-italic'}
                            ${partner.isUppercase ? 'uppercase' : 'normal-case'}
                            font-black text-xl tracking-tighter
                          `}>
                            {partner.name || 'MARCA'}
                          </div>
                          <button onClick={() => removePartner(partner.id)} className="p-2 text-slate-200 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <input 
                            type="text" 
                            value={partner.name}
                            onChange={(e) => updatePartner(partner.id, 'name', e.target.value)}
                            placeholder="Nome da Marca"
                            className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-slate-900"
                          />
                          
                          <div className="grid grid-cols-2 gap-2">
                             <button 
                                onClick={() => updatePartner(partner.id, 'style', 'serif')}
                                className={`py-2 rounded-lg text-[8px] font-black uppercase tracking-widest border ${partner.style === 'serif' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                             >
                                Serif
                             </button>
                             <button 
                                onClick={() => updatePartner(partner.id, 'style', 'sans')}
                                className={`py-2 rounded-lg text-[8px] font-black uppercase tracking-widest border ${partner.style === 'sans' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                             >
                                Sans
                             </button>
                          </div>

                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={partner.isItalic} 
                                onChange={(e) => updatePartner(partner.id, 'isItalic', e.target.checked)}
                                className="w-4 h-4 rounded border-slate-200 text-slate-900 focus:ring-slate-900" 
                              />
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Itálico</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={partner.isUppercase} 
                                onChange={(e) => updatePartner(partner.id, 'isUppercase', e.target.checked)}
                                className="w-4 h-4 rounded border-slate-200 text-slate-900 focus:ring-slate-900" 
                              />
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Caixa Alta</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {localData.partners.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                       <Share2 size={48} className="mx-auto text-slate-200 mb-4" />
                       <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Nenhuma marca adicionada ao ticker.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
