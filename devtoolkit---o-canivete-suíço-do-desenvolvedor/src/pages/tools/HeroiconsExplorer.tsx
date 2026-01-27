
import React, { useState, useMemo, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Sparkles, Search, Copy, Check, Info, FileCode, ExternalLink, X, Filter, MousePointer2 } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

type IconStyle = 'outline' | 'solid' | 'mini';

interface HeroIcon {
  name: string;
  tags: string[];
}

const POPULAR_ICONS: HeroIcon[] = [
  { name: 'Home', tags: ['house', 'dashboard', 'index', 'inicio'] },
  { name: 'User', tags: ['account', 'profile', 'person', 'usuario'] },
  { name: 'Settings', tags: ['gear', 'cog', 'config', 'ajustes'] },
  { name: 'Search', tags: ['find', 'magnifier', 'lookup', 'busca'] },
  { name: 'Bell', tags: ['notification', 'alert', 'notice', 'notificacao'] },
  { name: 'Mail', tags: ['envelope', 'email', 'message', 'correio'] },
  { name: 'Trash', tags: ['delete', 'remove', 'bin', 'lixeira'] },
  { name: 'Edit', tags: ['pencil', 'write', 'update', 'editar'] },
  { name: 'Plus', tags: ['add', 'create', 'new', 'adicionar'] },
  { name: 'Minus', tags: ['subtract', 'remove', 'decrease', 'subtrair'] },
  { name: 'ChevronRight', tags: ['arrow', 'next', 'direction', 'proximo'] },
  { name: 'ChevronLeft', tags: ['arrow', 'back', 'previous', 'voltar'] },
  { name: 'Calendar', tags: ['date', 'event', 'schedule', 'calendario'] },
  { name: 'Clock', tags: ['time', 'history', 'recent', 'relogio'] },
  { name: 'Camera', tags: ['photo', 'image', 'picture', 'foto'] },
  { name: 'MapPin', tags: ['location', 'place', 'gps', 'localizacao'] },
  { name: 'Globe', tags: ['world', 'earth', 'network', 'browser', 'globo'] },
  { name: 'Heart', tags: ['love', 'like', 'favorite', 'coracao'] },
  { name: 'Star', tags: ['rate', 'favorite', 'bookmark', 'estrela'] },
  { name: 'Download', tags: ['save', 'get', 'receive', 'baixar'] },
  { name: 'Upload', tags: ['send', 'share', 'push', 'enviar'] },
  { name: 'RefreshCw', tags: ['sync', 'reload', 'update', 'atualizar'] },
  { name: 'Terminal', tags: ['code', 'command', 'cli', 'console'] },
  { name: 'ShieldCheck', tags: ['secure', 'protect', 'safe', 'escudo'] },
  { name: 'Lock', tags: ['private', 'secure', 'encrypt', 'cadeado'] },
  { name: 'Unlock', tags: ['public', 'open', 'decrypt', 'aberto'] },
  { name: 'ExternalLink', tags: ['new-tab', 'redirect', 'goto', 'link'] },
  { name: 'Eye', tags: ['view', 'watch', 'show', 'olho'] },
  { name: 'EyeOff', tags: ['hide', 'private', 'hidden', 'escondido'] },
  { name: 'Sun', tags: ['light', 'day', 'brightness', 'sol'] },
  { name: 'Moon', tags: ['dark', 'night', 'theme', 'lua'] },
  { name: 'Briefcase', tags: ['work', 'job', 'business', 'maleta'] },
  { name: 'ShoppingBag', tags: ['cart', 'store', 'buy', 'sacola'] },
  { name: 'CreditCard', tags: ['payment', 'bank', 'money', 'cartao'] },
  { name: 'FileText', tags: ['doc', 'content', 'article', 'arquivo'] },
  { name: 'Folder', tags: ['directory', 'storage', 'files', 'pasta'] },
  { name: 'Layout', tags: ['grid', 'view', 'structure', 'layout'] },
  { name: 'Layers', tags: ['stack', 'design', 'z-index', 'camadas'] },
  { name: 'Mic', tags: ['audio', 'record', 'voice', 'microfone'] },
  { name: 'Video', tags: ['movie', 'record', 'stream', 'video'] },
  { name: 'Menu', tags: ['hamburger', 'nav', 'list', 'menu'] },
  { name: 'Filter', tags: ['sort', 'refine', 'adjust', 'filtro'] },
  { name: 'Link', tags: ['url', 'attach', 'anchor', 'link'] },
  { name: 'Wifi', tags: ['internet', 'connection', 'signal', 'wifi'] },
  { name: 'Cloud', tags: ['storage', 'online', 'weather', 'nuvem'] },
];

const HeroiconsExplorer: React.FC = () => {
  const [search, setSearch] = useState('');
  const [style, setStyle] = useState<IconStyle>('outline');
  const [selectedIcon, setSelectedIcon] = useState<HeroIcon | null>(null);
  const [copiedType, setCopiedType] = useState<'svg' | 'jsx' | null>(null);

  // Advanced search and filter logic
  const filteredIcons = useMemo(() => {
    let query = search.toLowerCase();
    
    // Check for style prefixes in search query: "solid:home", "mini:user", etc.
    const stylePrefixes: { prefix: string, style: IconStyle }[] = [
      { prefix: 'solid:', style: 'solid' },
      { prefix: 'outline:', style: 'outline' },
      { prefix: 'mini:', style: 'mini' },
    ];

    let activeStyleInQuery: IconStyle | null = null;
    for (const item of stylePrefixes) {
      if (query.startsWith(item.prefix)) {
        activeStyleInQuery = item.style;
        query = query.replace(item.prefix, '').trim();
        break;
      }
    }

    // If query has style, we temporarily use that style for rendering if requested by filtering
    // but the request is to "allow filtering by style in addition to name and tags"
    // So we combine the global style state with the query-based override.
    
    return POPULAR_ICONS.filter(icon => {
      const matchesSearch = icon.name.toLowerCase().includes(query) ||
                            icon.tags.some(tag => tag.includes(query));
      
      // If we used a prefix, we only show matches. 
      // If no prefix, we show all matches for the current global style.
      return matchesSearch;
    });
  }, [search]);

  // Effect to sync global style state if prefix is used (optional UX choice)
  useEffect(() => {
    const query = search.toLowerCase();
    if (query.startsWith('solid:')) setStyle('solid');
    else if (query.startsWith('outline:')) setStyle('outline');
    else if (query.startsWith('mini:')) setStyle('mini');
  }, [search]);

  const getIconComponent = (name: string, overrideStyle?: IconStyle) => {
    const IconComp = (Icons as any)[name];
    if (!IconComp) return <Icons.HelpCircle />;
    
    const currentStyle = overrideStyle || style;
    const size = currentStyle === 'mini' ? 20 : 24;
    const strokeWidth = currentStyle === 'outline' ? 1.5 : 2;
    
    return <IconComp size={size} strokeWidth={strokeWidth} />;
  };

  const copyToClipboard = (type: 'svg' | 'jsx') => {
    if (!selectedIcon) return;
    
    const code = type === 'svg' 
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="${style === 'outline' ? 'none' : 'currentColor'}" viewBox="0 0 24 24" stroke-width="${style === 'outline' ? '1.5' : '0'}" stroke="currentColor" class="w-6 h-6">\n  <path stroke-linecap="round" stroke-linejoin="round" d="..." />\n</svg>`
      : `import { ${selectedIcon.name}Icon } from '@heroicons/react/24/${style}';\n\nfunction MyComponent() {\n  return <${selectedIcon.name}Icon className="h-6 w-6 text-blue-500" />;\n}`;

    navigator.clipboard.writeText(code);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const clearSearch = () => setSearch('');

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600/10 text-indigo-500 rounded-2xl">
            <Sparkles size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Heroicons Explorer</h1>
            <p className="text-slate-400">Encontre o ícone perfeito filtrando por nome, tags ou estilo.</p>
          </div>
        </div>
        <a 
          href="https://heroicons.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"
        >
          <ExternalLink size={14} /> Heroicons.com
        </a>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Background visual detail */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] -z-10 rounded-full"></div>

        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Ex: 'home', 'user' ou 'solid:search' para filtrar por estilo..."
              className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl pl-12 pr-12 py-4 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button 
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-600 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/50 p-2 rounded-[1.5rem] border border-slate-800">
             <div className="px-3 flex items-center gap-2 text-slate-600">
                <Filter size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Estilo:</span>
             </div>
             <div className="flex gap-1">
              {(['outline', 'solid', 'mini'] as IconStyle[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${style === s ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between px-2">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
             {filteredIcons.length} Ícones encontrados
           </p>
           <div className="flex items-center gap-4 text-[10px] text-slate-600">
              <span className="flex items-center gap-1"><MousePointer2 size={10}/> Clique para detalhar</span>
           </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4">
          {filteredIcons.map((icon) => (
            <button
              key={icon.name}
              onClick={() => setSelectedIcon(icon)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group border-2 ${selectedIcon?.name === icon.name ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl scale-105' : 'bg-slate-950 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 text-slate-400'}`}
            >
              <div className="transition-transform group-hover:scale-110">
                {getIconComponent(icon.name)}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-tighter truncate w-full px-2 text-center ${selectedIcon?.name === icon.name ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'}`}>
                {icon.name}
              </span>
            </button>
          ))}
        </div>

        {filteredIcons.length === 0 && (
          <div className="py-24 text-center border-2 border-dashed border-slate-800 rounded-[3rem] bg-slate-950/20">
            <Icons.SearchX size={64} className="mx-auto text-slate-800 mb-6" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Nenhum ícone corresponde à sua busca</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Tente nomes mais genéricos ou verifique se não há filtros de estilo conflitantes.</p>
            </div>
            <Button variant="outline" className="mt-8" onClick={clearSearch}>Limpar Filtros</Button>
          </div>
        )}
      </div>

      {/* Selected Icon Detail Drawer */}
      {selectedIcon && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSelectedIcon(null)}></div>
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
             <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl border border-white/10">
                      <div className="scale-[1.8]">
                        {getIconComponent(selectedIcon.name)}
                      </div>
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-white">{selectedIcon.name}</h3>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-[10px] font-black uppercase border border-indigo-500/20">{style}</span>
                        {selectedIcon.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-slate-800 text-slate-500 rounded-lg text-[10px] font-bold uppercase">{tag}</span>
                        ))}
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedIcon(null)}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-all shadow-lg"
                >
                  <X size={20} />
                </button>
             </div>

             <div className="p-8 space-y-8 bg-slate-900/80">
                <div className="grid grid-cols-2 gap-4">
                   <button 
                    onClick={() => copyToClipboard('svg')}
                    className="flex flex-col items-center gap-4 p-8 bg-slate-950 border-2 border-slate-800 rounded-3xl hover:border-indigo-500 group transition-all relative overflow-hidden"
                   >
                      <div className="p-4 bg-slate-900 rounded-2xl text-indigo-500 group-hover:scale-110 transition-transform">
                        <FileCode size={32} />
                      </div>
                      <div className="text-center">
                        <span className="block text-xs font-black text-white uppercase tracking-widest">COPIAR SVG</span>
                        <span className="text-[10px] text-slate-600 font-bold">Código HTML puro</span>
                      </div>
                      {copiedType === 'svg' && (
                        <div className="absolute inset-0 bg-green-600/10 flex items-center justify-center animate-in fade-in duration-200">
                          <Check size={32} className="text-green-500" />
                        </div>
                      )}
                   </button>
                   <button 
                    onClick={() => copyToClipboard('jsx')}
                    className="flex flex-col items-center gap-4 p-8 bg-slate-950 border-2 border-slate-800 rounded-3xl hover:border-indigo-500 group transition-all relative overflow-hidden"
                   >
                      <div className="p-4 bg-slate-900 rounded-2xl text-indigo-500 group-hover:scale-110 transition-transform">
                        <Icons.Atom size={32} />
                      </div>
                      <div className="text-center">
                        <span className="block text-xs font-black text-white uppercase tracking-widest">COPIAR JSX</span>
                        <span className="text-[10px] text-slate-600 font-bold">Para React/Next.js</span>
                      </div>
                      {copiedType === 'jsx' && (
                        <div className="absolute inset-0 bg-green-600/10 flex items-center justify-center animate-in fade-in duration-200">
                          <Check size={32} className="text-green-500" />
                        </div>
                      )}
                   </button>
                </div>

                <div className="p-5 bg-indigo-600/5 border-2 border-indigo-500/10 rounded-[2rem] flex gap-4 text-xs leading-relaxed text-slate-400 shadow-inner">
                   <div className="p-2 bg-indigo-500/10 rounded-xl h-fit">
                     <Info size={20} className="text-indigo-400" />
                   </div>
                   <div className="space-y-1">
                     <p className="font-bold text-slate-200 uppercase tracking-tighter">Instalação Recomendada</p>
                     <p>Use o pacote oficial <code className="text-indigo-400 font-bold">@heroicons/react</code> para uma integração perfeita com componentes Tailwind CSS.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Footer / Search Tips */}
      {!search && (
        <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-slate-800/50 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
          <SearchTip label="Por Estilo" code="solid:home" />
          <SearchTip label="Por Tag" code="correio" />
          <SearchTip label="Preciso" code="ChevronRight" />
        </div>
      )}
    </div>
  );
};

const SearchTip = ({ label, code }: { label: string, code: string }) => (
  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
    <span>{label}:</span>
    <code className="bg-slate-800 px-2 py-1 rounded text-indigo-400">{code}</code>
  </div>
);

export default HeroiconsExplorer;
