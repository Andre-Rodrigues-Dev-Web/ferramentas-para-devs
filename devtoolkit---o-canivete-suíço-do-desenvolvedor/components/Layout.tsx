
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { TOOLS, CATEGORIES } from '../toolsData';
import SearchModal from './SearchModal';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={18} /> : <Icons.HelpCircle size={18} />;
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden md:relative absolute z-40 h-full`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Icons.Wrench size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white whitespace-nowrap">DevToolkit</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">
                {cat}
              </h3>
              <div className="space-y-1">
                {TOOLS.filter(t => t.category === cat).map(tool => {
                  const isActive = location.pathname === `/tool/${tool.slug}`;
                  return (
                    <Link
                      key={tool.id}
                      to={`/tool/${tool.slug}`}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm group ${
                        isActive 
                          ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                      }`}
                    >
                      <span className={isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400 transition-colors'}>
                        {getIcon(tool.icon)}
                      </span>
                      <span className="truncate">{tool.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 text-slate-400 text-sm hover:bg-slate-700 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Icons.Search size={16} />
              <span>Buscar...</span>
            </div>
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-600 bg-slate-700 px-1.5 font-mono text-[10px] font-medium text-slate-400 opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          <div className="text-[10px] text-center text-slate-500 font-medium px-2 leading-tight">
            Desenvolvido por <br/>
            <a 
              href="https://andrelaurentino.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-bold block mt-1"
            >
              André Laurentino Rodrigues
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
            >
              <Icons.Menu size={20} />
            </button>
            <Link to="/" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
              <Icons.Home size={18} />
              <span className="hidden sm:inline font-medium">Dashboard</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
             <a href="https://github.com" target="_blank" className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all">
               <Icons.Github size={20} />
             </a>
             <div className="h-8 w-[1px] bg-slate-800 hidden sm:block"></div>
             <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               V1.0.0 Stable
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-950">
          <div className="max-w-6xl mx-auto w-full animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Layout;
