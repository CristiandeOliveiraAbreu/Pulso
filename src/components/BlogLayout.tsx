import React from 'react';
import { Facebook, Instagram, Twitter, Search, Menu } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { Link, useLocation } from 'react-router-dom';
import { formatDriveUrl } from '../utils/formatters';

interface BlogLayoutProps {
  children: React.ReactNode;
}

export function BlogLayout({ children }: BlogLayoutProps) {
  const { data, addSubscriber } = useBlog();
  const location = useLocation();
  const [logoError, setLogoError] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addSubscriber(email);
      setEmail('');
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const navItems = [
    { label: 'Principal', path: '/' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Contato', path: '/contato' },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Top Bar Branding */}
      <div className="pt-16 pb-8 print:hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <div className="flex justify-between w-full mb-4 items-center">
             <div className="w-24 md:flex hidden items-center gap-2">
               <div className="w-1 h-1 bg-black rounded-full" />
               <span className="text-[8px] font-black uppercase tracking-[0.3em] text-black/20">EST. 2026</span>
             </div>

             <Link to="/" className="flex flex-col items-center group">
              {data.branding.logoUrl && !logoError ? (
                <div className="relative">
                  <img 
                    src={formatDriveUrl(data.branding.logoUrl)} 
                    alt="Logomarca" 
                    className="h-40 md:h-[480px] w-auto object-contain transition-all duration-700 group-hover:scale-105"
                    onError={(e) => {
                      console.error("Erro ao carregar logomarca:", e);
                      setLogoError(true);
                    }}
                    onLoad={() => {
                      console.log("Logomarca carregada com sucesso");
                      setLogoError(false);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                </div>
              ) : (
                <h1 className="text-[8rem] md:text-[27rem] font-serif font-black tracking-[-0.05em] text-black leading-none uppercase select-none transition-all duration-700 group-hover:tracking-normal px-4 text-center">
                  PULSO
                </h1>
              )}
            </Link>

            <div className="flex gap-4 items-center w-24 justify-end">
              <a href={data.social.facebook} className="text-black hover:opacity-50 transition-opacity">
                <Facebook size={16} strokeWidth={2.5} />
              </a>
              <a href={data.social.instagram} className="text-black hover:opacity-50 transition-opacity">
                <Instagram size={16} strokeWidth={2.5} />
              </a>
            </div>
          </div>
          
          {data.branding.showTagline && (
            <div className="text-[12px] md:text-[14px] font-serif italic text-black/60 tracking-wider mb-2">
              {data.branding.tagline}
            </div>
          )}

          {/* Navigation */}
          <nav className="w-full border-t border-black/5 pt-2">
            <ul className="flex justify-center gap-8 md:gap-12 overflow-x-auto no-scrollbar">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'text-black border-b-2 border-black pb-1' : 'text-black/30 hover:text-black'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {children}
      </main>

      {/* Footer - Soft & Minimalist */}
      <footer className="bg-white border-t border-slate-100 pt-32 pb-20 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">
            <div className="max-w-md space-y-6">
              <h3 className="text-3xl font-serif font-black text-black leading-tight">
                {data.footer.newsletterTitle}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {data.footer.newsletterDesc}
              </p>
            </div>

            <div className="w-full md:w-auto">
              {isSubscribed ? (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 text-sm font-bold text-black animate-pulse">
                  ✓ Obrigado por se inscrever!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com" 
                    required
                    className="bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 text-sm outline-none focus:border-black transition-all min-w-[320px] font-medium"
                  />
                  <button 
                    type="submit"
                    className="bg-black text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all whitespace-nowrap"
                  >
                    Participar
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-10">
              <a href={data.social.facebook} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-black transition-colors">Facebook</a>
              <a href={data.social.instagram} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-black transition-colors">Instagram</a>
            </div>
            
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
              {data.footer.copyright}
            </div>

            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              PULSO • EST. 2026
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
