
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { TOOLS, CATEGORIES } from '../../../entities/tool/model';

const Dashboard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tudo');

  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={24} /> : <Icons.HelpCircle size={24} />;
  };

  const filteredTools = activeCategory === 'Tudo' 
    ? TOOLS 
    : TOOLS.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Sua Caixa de Ferramentas <span className="text-blue-500">Digital</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Tudo o que você precisa para acelerar seu desenvolvimento em um só lugar. Moderno, rápido e 100% gratuito.
        </p>
      </header>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('Tudo')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === 'Tudo' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
          }`}
        >
          Tudo
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map(tool => (
          <Link
            key={tool.id}
            to={`/tool/${tool.slug}`}
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl transition-colors ${tool.isImplemented ? 'bg-blue-600/10 text-blue-500' : 'bg-slate-800 text-slate-600'}`}>
                {getIcon(tool.icon)}
              </div>
              {!tool.isImplemented && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-slate-800 text-slate-500 rounded-md">
                  Em Breve
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {tool.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
              {tool.description}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
               <span className="text-xs font-medium text-slate-500">{tool.category}</span>
               <Icons.ArrowRight size={16} className="text-slate-600 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
