import React from 'react';
import { Facebook, Instagram, Twitter, Search, Menu } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { formatDriveUrl } from '../utils/formatters';

interface BlogLayoutProps {
  children: React.ReactNode;
}

export function BlogLayout({ children }: BlogLayoutProps) {
  const { data } = useBlog();
  const [logoError, setLogoError] = React.useState(false);

  // Reset error when URL changes
  React.useEffect(() => {
    setLogoError(false);
  }, [data.branding.logoUrl]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Top Bar Branding */}
      <div className="border-b border-slate-100 py-8 print:hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <div className="flex justify-between w-full mb-8 items-center">
            <div className="w-24 hidden md:block">
              <Link to="/admin" className="text-[9px] font-black uppercase tracking-widest text-slate-200 hover:text-primary transition-colors">Admin</Link>
            </div>
            
            <div className="flex flex-col items-center">
              {data.branding.logoUrl && !logoError ? (
                <img 
                  src={formatDriveUrl(data.branding.logoUrl)} 
                  alt="Logomarca" 
                  className="h-80 md:h-[450px] w-auto object-contain transition-all duration-500"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex flex-col items-center">
                   <h1 className="text-8xl md:text-9xl font-serif font-black tracking-[-0.1em] text-black leading-none uppercase">
                    PULSO
                  </h1>
                </div>
              )}
            </div>

            <div className="flex gap-4 items-center">
              <a href={data.social.facebook} className="p-2 bg-slate-50 rounded-full hover:bg-primary hover:text-white transition-all">
                <Facebook size={16} />
              </a>
              <a href={data.social.instagram} className="p-2 bg-slate-50 rounded-full hover:bg-primary hover:text-white transition-all">
                <Instagram size={16} />
              </a>
            </div>
          </div>
          
          {data.branding.showTagline && (
            <div className="text-[20px] font-serif italic text-black mt-1">
              {data.branding.tagline}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50 print:hidden">
        <div className="max-w-6xl mx-auto px-6">
          <ul className="flex justify-center gap-8 py-4 overflow-x-auto no-scrollbar">
            {['Principal', 'Sobre', 'Conteúdo', 'Contato', 'Apoio'].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className={`text-xs font-black uppercase tracking-widest hover:text-primary transition-colors ${
                    item === 'Principal' ? 'text-primary' : 'text-slate-500'
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 mt-20 print:hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">{data.footer.newsletterTitle}</h3>
              <p className="text-slate-400 text-sm">{data.footer.newsletterDesc}</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="seu@email.com" 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-primary transition-all text-sm"
              />
              <button className="bg-primary hover:bg-primary-hover px-8 py-4 rounded-xl font-bold text-sm transition-all">
                Participar
              </button>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex gap-4">
              <a href={data.social.facebook}><Facebook size={14} className="hover:text-white cursor-pointer transition-colors" /></a>
              <a href={data.social.instagram}><Instagram size={14} className="hover:text-white cursor-pointer transition-colors" /></a>
            </div>
            <div>{data.footer.copyright}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
