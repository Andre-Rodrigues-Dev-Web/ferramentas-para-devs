
import React, { useState, useMemo } from 'react';
import { Monitor, Search, Globe, Info, ExternalLink, ArrowRight, Check, X, AlertTriangle, TrendingUp, Chrome, Compass, AppWindow, Smartphone } from 'lucide-react';

interface BrowserSupport {
  name: string;
  version: string;
  status: 'y' | 'n' | 'a'; // yes, no, partial
}

interface WebFeature {
  id: string;
  title: string;
  description: string;
  usage: number;
  tags: string[];
  stats: {
    chrome: BrowserSupport;
    firefox: BrowserSupport;
    safari: BrowserSupport;
    edge: BrowserSupport;
    ios: BrowserSupport;
    android: BrowserSupport;
  };
}

const FEATURE_DATA: WebFeature[] = [
  {
    id: 'css-grid',
    title: 'CSS Grid Layout',
    description: 'Method of laying out content in two dimensions, with rows and columns.',
    usage: 97.5,
    tags: ['css', 'layout'],
    stats: {
      chrome: { name: 'Chrome', version: '57+', status: 'y' },
      firefox: { name: 'Firefox', version: '52+', status: 'y' },
      safari: { name: 'Safari', version: '10.1+', status: 'y' },
      edge: { name: 'Edge', version: '16+', status: 'y' },
      ios: { name: 'iOS Safari', version: '10.3+', status: 'y' },
      android: { name: 'Android Browser', version: '124+', status: 'y' },
    }
  },
  {
    id: 'webgl2',
    title: 'WebGL 2.0',
    description: 'JavaScript API for rendering interactive 3D and 2D graphics within any compatible web browser.',
    usage: 92.1,
    tags: ['js', 'graphics', 'canvas'],
    stats: {
      chrome: { name: 'Chrome', version: '56+', status: 'y' },
      firefox: { name: 'Firefox', version: '51+', status: 'y' },
      safari: { name: 'Safari', version: '15+', status: 'y' },
      edge: { name: 'Edge', version: '79+', status: 'y' },
      ios: { name: 'iOS Safari', version: '15+', status: 'y' },
      android: { name: 'Android Browser', version: '56+', status: 'y' },
    }
  },
  {
    id: 'fetch-api',
    title: 'Fetch API',
    description: 'A modern replacement for XMLHttpRequest for making network requests.',
    usage: 98.2,
    tags: ['js', 'network'],
    stats: {
      chrome: { name: 'Chrome', version: '42+', status: 'y' },
      firefox: { name: 'Firefox', version: '39+', status: 'y' },
      safari: { name: 'Safari', version: '10.1+', status: 'y' },
      edge: { name: 'Edge', version: '14+', status: 'y' },
      ios: { name: 'iOS Safari', version: '10.3+', status: 'y' },
      android: { name: 'Android Browser', version: '42+', status: 'y' },
    }
  },
  {
    id: 'webgpu',
    title: 'WebGPU',
    description: 'Future standard for low-level graphics and compute on the web.',
    usage: 68.4,
    tags: ['graphics', 'future'],
    stats: {
      chrome: { name: 'Chrome', version: '113+', status: 'y' },
      firefox: { name: 'Firefox', version: 'Nightly', status: 'a' },
      safari: { name: 'Safari', version: 'TP', status: 'a' },
      edge: { name: 'Edge', version: '113+', status: 'y' },
      ios: { name: 'iOS Safari', version: '17+', status: 'n' },
      android: { name: 'Android Browser', version: '124+', status: 'y' },
    }
  },
  {
    id: 'container-queries',
    title: 'CSS Container Queries',
    description: 'Allows styling elements based on the size of a containment context.',
    usage: 89.5,
    tags: ['css', 'layout', 'responsive'],
    stats: {
      chrome: { name: 'Chrome', version: '105+', status: 'y' },
      firefox: { name: 'Firefox', version: '110+', status: 'y' },
      safari: { name: 'Safari', version: '16+', status: 'y' },
      edge: { name: 'Edge', version: '105+', status: 'y' },
      ios: { name: 'iOS Safari', version: '16+', status: 'y' },
      android: { name: 'Android Browser', version: '105+', status: 'y' },
    }
  },
  {
    id: 'wasm',
    title: 'WebAssembly (Wasm)',
    description: 'Binary instruction format for a stack-based virtual machine.',
    usage: 96.8,
    tags: ['js', 'performance'],
    stats: {
      chrome: { name: 'Chrome', version: '57+', status: 'y' },
      firefox: { name: 'Firefox', version: '52+', status: 'y' },
      safari: { name: 'Safari', version: '11+', status: 'y' },
      edge: { name: 'Edge', version: '16+', status: 'y' },
      ios: { name: 'iOS Safari', version: '11+', status: 'y' },
      android: { name: 'Android Browser', version: '57+', status: 'y' },
    }
  }
];

const CanIUseTool: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(FEATURE_DATA[0].id);

  const filteredFeatures = useMemo(() => {
    return FEATURE_DATA.filter(f => 
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  const selectedFeature = useMemo(() => 
    FEATURE_DATA.find(f => f.id === selectedFeatureId) || FEATURE_DATA[0]
  , [selectedFeatureId]);

  const getStatusColor = (status: 'y' | 'n' | 'a') => {
    switch(status) {
      case 'y': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'a': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'n': return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  const getStatusIcon = (status: 'y' | 'n' | 'a') => {
    switch(status) {
      case 'y': return <Check size={14} />;
      case 'a': return <AlertTriangle size={14} />;
      case 'n': return <X size={14} />;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
            <Monitor size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Can I Use</h1>
            <p className="text-slate-400">Consulte a compatibilidade de recursos web em navegadores modernos.</p>
          </div>
        </div>
        <a 
          href="https://caniuse.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-400 transition-colors bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"
        >
          <ExternalLink size={14} /> Dados Oficiais
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Search and Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Pesquisar recurso (ex: grid, wasm...)"
              className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 max-h-[500px] overflow-y-auto space-y-2 custom-scrollbar">
            {filteredFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeatureId(feature.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${selectedFeatureId === feature.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
              >
                <div className="text-left overflow-hidden">
                  <div className={`font-bold text-sm truncate ${selectedFeatureId === feature.id ? 'text-white' : 'group-hover:text-white'}`}>{feature.title}</div>
                  <div className={`text-[10px] uppercase font-bold tracking-widest ${selectedFeatureId === feature.id ? 'text-blue-200' : 'text-slate-600'}`}>{feature.usage}% usage</div>
                </div>
                <ArrowRight size={14} className={`transition-transform group-hover:translate-x-1 ${selectedFeatureId === feature.id ? 'text-white' : 'text-slate-700'}`} />
              </button>
            ))}
            {filteredFeatures.length === 0 && (
              <div className="py-10 text-center text-slate-600">
                <p className="text-sm italic">Nenhum recurso encontrado.</p>
              </div>
            )}
          </div>
        </div>

        {/* Feature Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

             <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-slate-800 pb-8 mb-8">
                <div className="space-y-3">
                   <div className="flex flex-wrap gap-2">
                      {selectedFeature.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-widest bg-slate-800 text-slate-500 px-2 py-0.5 rounded">#{tag}</span>
                      ))}
                   </div>
                   <h2 className="text-4xl font-black text-white">{selectedFeature.title}</h2>
                   <p className="text-slate-400 max-w-xl leading-relaxed">{selectedFeature.description}</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center min-w-[140px] shadow-inner">
                   <TrendingUp size={24} className="text-green-500 mb-2" />
                   <span className="text-3xl font-black text-white">{selectedFeature.usage}%</span>
                   <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Usage Global</span>
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <BrowserSupportCard browser={selectedFeature.stats.chrome} icon={<Chrome size={20} className="text-blue-400" />} />
                <BrowserSupportCard browser={selectedFeature.stats.firefox} icon={<Globe size={20} className="text-orange-400" />} />
                <BrowserSupportCard browser={selectedFeature.stats.safari} icon={<Compass size={20} className="text-blue-500" />} />
                <BrowserSupportCard browser={selectedFeature.stats.edge} icon={<AppWindow size={20} className="text-blue-300" />} />
                <BrowserSupportCard browser={selectedFeature.stats.ios} icon={<Smartphone size={20} className="text-slate-400" />} />
                <BrowserSupportCard browser={selectedFeature.stats.android} icon={<Smartphone size={20} className="text-green-400" />} />
             </div>

             <div className="mt-8 p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl flex gap-3 text-xs text-slate-400">
                <Info size={18} className="text-blue-500 flex-shrink-0" />
                <p>Os dados de suporte refletem as versões estáveis atuais. Recursos parciais (amarelo) podem exigir flags ou prefixos.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <LegendItem status="y" label="Suportado" color="bg-green-500" />
             <LegendItem status="a" label="Parcial / Quase" color="bg-yellow-500" />
             <LegendItem status="n" label="Não Suportado" color="bg-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const BrowserSupportCard = ({ browser, icon }: { browser: BrowserSupport, icon: React.ReactNode }) => {
  const getStatusColor = (status: 'y' | 'n' | 'a') => {
    switch(status) {
      case 'y': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'a': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'n': return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  const getStatusLabel = (status: 'y' | 'n' | 'a') => {
    switch(status) {
      case 'y': return 'YES';
      case 'a': return 'ALMOST';
      case 'n': return 'NO';
    }
  };

  return (
    <div className={`p-5 rounded-2xl border bg-slate-950 flex flex-col gap-4 group transition-all hover:scale-[1.02] ${getStatusColor(browser.status)}`}>
       <div className="flex items-center justify-between">
          <div className="p-2 bg-slate-900 rounded-xl">
             {icon}
          </div>
          <span className="text-[10px] font-black tracking-widest opacity-80">{getStatusLabel(browser.status)}</span>
       </div>
       <div>
          <h4 className="font-bold text-white text-sm">{browser.name}</h4>
          <p className="text-[11px] font-medium opacity-60">Version: {browser.version}</p>
       </div>
    </div>
  );
};

const LegendItem = ({ status, label, color }: { status: 'y' | 'n' | 'a', label: string, color: string }) => (
  <div className="flex items-center gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
     <div className={`w-3 h-3 rounded-full ${color} shadow-lg shadow-${status === 'y' ? 'green' : status === 'a' ? 'yellow' : 'red'}-500/50`}></div>
     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
  </div>
);

export default CanIUseTool;
