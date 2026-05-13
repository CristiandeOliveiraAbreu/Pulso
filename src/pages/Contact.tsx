import React from 'react';
import { BlogLayout } from '../components/BlogLayout';
import { useBlog } from '../context/BlogContext';
import { Mail, Instagram, Facebook, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const { data } = useBlog();

  return (
    <BlogLayout>
      <div className="max-w-6xl mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 px-4 md:px-0">
          {/* Left Column: Info */}
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase">
                Fale Conosco
              </h1>
              <p className="text-lg md:text-xl text-slate-500 font-serif italic">
                Tem uma sugestão de pauta ou quer compartilhar um feedback? Estamos prontos para ouvir.
              </p>
            </div>

            <div className="space-y-8 pt-10">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">E-mail</div>
                  <div className="text-lg font-bold text-slate-900">{data.contact.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Localização</div>
                  <div className="text-lg font-bold text-slate-900">{data.contact.address}</div>
                </div>
              </div>
            </div>

            <div className="pt-10 flex gap-4">
              <a href={data.social.facebook} className="p-4 bg-slate-50 rounded-2xl hover:bg-primary hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href={data.social.instagram} className="p-4 bg-slate-50 rounded-2xl hover:bg-primary hover:text-white transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-soft-xl">
            <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nome Completo</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-transparent rounded-3xl px-8 py-5 outline-none focus:bg-white focus:border-slate-200 transition-all font-bold text-slate-900" 
                  placeholder="Seu nome aqui..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">E-mail de Contato</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-50 border border-transparent rounded-3xl px-8 py-5 outline-none focus:bg-white focus:border-slate-200 transition-all font-bold text-slate-900" 
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mensagem</label>
                <textarea 
                  rows={5}
                  className="w-full bg-slate-50 border border-transparent rounded-[2rem] px-8 py-6 outline-none focus:bg-white focus:border-slate-200 transition-all font-medium text-slate-900 resize-none" 
                  placeholder="Como podemos ajudar?"
                />
              </div>

              <button className="w-full bg-slate-900 text-white rounded-3xl py-6 font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all">
                <Send size={16} /> Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}
