import React from 'react';
import { LayoutDashboard, Settings, User, Bell, Search, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-[#fcfcfd]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border-main flex flex-col py-8 hidden md:flex">
        <div className="px-8 mt-4 mb-12">
          <div className="font-black text-2xl text-primary tracking-tight italic">PROJETO</div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { label: "Dashboard", icon: <LayoutDashboard size={18} />, active: true },
            { label: "Perfil", icon: <User size={18} /> },
            { label: "Configurações", icon: <Settings size={18} /> },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all rounded-xl text-sm font-bold ${
                item.active 
                  ? 'text-primary bg-primary/5' 
                  : 'text-text-muted hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-text-muted hover:text-red-500 hover:bg-red-50 transition-all rounded-xl text-sm font-bold">
            <LogOut size={18} /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-border-main flex items-center justify-between px-8">
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl text-text-muted text-xs font-bold border border-gray-100 min-w-[300px]">
            <Search size={14} />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="bg-transparent border-none outline-none w-full placeholder:text-gray-300" 
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 text-text-muted hover:text-primary transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xs border border-primary/20">
              U
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
