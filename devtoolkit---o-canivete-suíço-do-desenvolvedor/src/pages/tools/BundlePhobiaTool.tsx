
import React, { useState, useMemo, useEffect } from 'react';
import { Package, Search, BarChart3, Zap, Info, Download, History, ExternalLink, Loader2, AlertCircle, Check, ArrowRight, Server, Layers, ShieldCheck } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

interface PackageStats {
  name: string;
  version: string;
  minifiedSize: number;
  gzippedSize: number;
  downloadTime3G: number;
  downloadTime4G: number;
  dependencies: number;
  hasTreeShaking: boolean;
  hasSideEffects: boolean;
  description: string;
}

const SIMULATED_PACKAGES: Record<string, PackageStats> = {
  'react': {
    name: 'react',
    version: '18.3.1',
    minifiedSize: 10400,
    gzippedSize: 6400,
    downloadTime3G: 120,
    downloadTime4G: 15,
    dependencies: 0,
    hasTreeShaking: true,
    hasSideEffects: false,
    description: 'A JavaScript library for building user interfaces.'
  },
  'lodash': {
    name: 'lodash',
    version: '4.17.21',
    minifiedSize: 72000,
    gzippedSize: 24400,
    downloadTime3G: 480,
    downloadTime4G: 60,
    dependencies: 0,
    hasTreeShaking: false,
    hasSideEffects: true,
    description: 'A modern JavaScript utility library delivering modularity, performance, & extras.'
  },
  'moment': {
    name: 'moment',
    version: '2.30.1',
    minifiedSize: 232000,
    gzippedSize: 72100,
    downloadTime3G: 1400,
    downloadTime4G: 180,
    dependencies: 0,
    hasTreeShaking: false,
    hasSideEffects: true,
    description: 'Parse, validate, manipulate, and display dates and times in JavaScript.'
  },
  'axios': {
    name: 'axios',
    version: '1.7.2',
    minifiedSize: 29000,
    gzippedSize: 11100,
    downloadTime3G: 220,
    downloadTime4G: 28,
    dependencies: 1,
    hasTreeShaking: true,
    hasSideEffects: false,
    description: 'Promise based HTTP client for the browser and node.js'
  },
  'framer-motion': {
    name: 'framer-motion',
    version: '11.2.10',
    minifiedSize: 124000,
    gzippedSize: 34500,
    downloadTime3G: 680,
    downloadTime4G: 85,
    dependencies: 5,
    hasTreeShaking: true,
    hasSideEffects: false,
    description: 'A production-ready motion library for React.'
  },
  'tailwindcss': {
    name: 'tailwindcss',
    version: '3.4.4',
    minifiedSize: 3400000,
    gzippedSize: 450000,
    downloadTime3G: 8500,
    downloadTime4G: 1200,
    dependencies: 12,
    hasTreeShaking: true,
    hasSideEffects: false,
    description: 'A utility-first CSS framework for rapid UI development.'
  }
};

const BundlePhobiaTool: React.FC = () => {
  const [packageName, setPackageName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PackageStats | null>(null);
  const [history, setHistory] = useState<PackageStats[]>([]);

  useEffect(() => {
    // Carregar histórico do localStorage
    const saved = localStorage.getItem('bundlephobia_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSearch = async (e?: React.FormEvent, overrideName?: string) => {
    e?.preventDefault();
    const query = (overrideName || packageName).trim().toLowerCase();
    if (!query) return;

    setLoading(true);
    setResult(null);

    // Simulação de delay de análise
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    const found = SIMULATED_PACKAGES[query];
    const finalResult = found || {
      name: query,
      version: '1.0.0',
      minifiedSize: Math.floor(Math.random() * 80000) + 5000,
      gzippedSize: Math.floor(Math.random() * 25000) + 2000,
      downloadTime3G: Math.floor(Math.random() * 600) + 100,
      downloadTime4G: Math.floor(Math.random() * 120) + 20,
      dependencies: Math.floor(Math.random() * 8),
      hasTreeShaking: Math.random() > 0.4,
      hasSideEffects: Math.random() > 0.7,
      description: 'Pacote analisado via base de dados estática simulada.'
    };

    setResult(finalResult);
    setLoading(false);
    
    // Atualizar histórico
    setHistory(prev => {
      const filtered = prev.filter(h => h.name !== finalResult.name);
      const newHistory = [finalResult, ...filtered].slice(0, 5);
      localStorage.setItem('bundlephobia_history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-600/10 text-orange-500 rounded-2xl">
            <Package size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">BundlePhobia</h1>
            <p className="text-slate-400">Analise o peso e o custo de pacotes NPM antes de instalá-los.</p>
          </div>
        </div>
        <div className="flex gap-2">
           <a 
            href="https://bundlephobia.com" 
            target="_blank" 
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-500 hover:text-orange-500 transition-all"
           >
             <ExternalLink size={14} /> Site Oficial
           </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Barra de Busca Gigante */}
        <form onSubmit={handleSearch} className="relative group">
          <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${loading ? 'text-orange-500 animate-pulse' : 'text-slate-500 group-focus-within:text-orange-500'}`} size={24} />
          <input 
            type="text"
            placeholder="Digite o nome do pacote (ex: react, lodash, axios...)"
            className="w-full bg-slate-900 border-2 border-slate-800 rounded-[2rem] pl-14 pr-32 py-5 text-lg text-slate-100 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-slate-600 shadow-2xl"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading || !packageName.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-800 text-white text-sm font-bold uppercase px-6 py-3 rounded-[1.5rem] transition-all shadow-lg"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Analisar'}
          </button>
        </form>

        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
               <Package size={80} className="text-orange-500/10 animate-bounce" />
               <Loader2 size={40} className="text-orange-500 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-y-2">
              <p className="text-white font-black text-2xl tracking-tight">Analisando Dependências...</p>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">Calculando tamanho minificado e simulando compressão gzip.</p>
            </div>
          </div>
        ) : result ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-8">
            {/* Header do Resultado */}
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/5 blur-[100px] -z-10 pointer-events-none"></div>
               
               <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10 border-b border-slate-800/50 pb-10">
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <h2 className="text-5xl font-black text-white tracking-tighter">{result.name}</h2>
                        <span className="px-3 py-1 bg-slate-800 text-orange-400 rounded-full text-xs font-mono font-bold border border-orange-500/20">{result.version}</span>
                     </div>
                     <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{result.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <FeatureBadge label="Tree-shaking" active={result.hasTreeShaking} />
                    <FeatureBadge label="No Side-effects" active={!result.hasSideEffects} />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Tamanhos */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Tamanho do Bundle</h4>
                     <div className="grid grid-cols-1 gap-4">
                        <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-3xl space-y-1">
                           <p className="text-[10px] font-bold text-slate-500 uppercase">Minificado</p>
                           <p className="text-4xl font-black text-white">{formatSize(result.minifiedSize)}</p>
                        </div>
                        <div className="bg-orange-600/10 border-2 border-orange-500/20 p-6 rounded-3xl space-y-1 relative group overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                              <Zap size={40} />
                           </div>
                           <p className="text-[10px] font-bold text-orange-500 uppercase">Minificado + Gzipped</p>
                           <p className="text-4xl font-black text-white">{formatSize(result.gzippedSize)}</p>
                        </div>
                     </div>
                  </div>

                  {/* Download Times */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Tempos de Download</h4>
                     <div className="bg-slate-950/50 border border-slate-800 p-8 rounded-3xl space-y-8 h-full">
                        <div className="space-y-3">
                           <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-400 font-bold uppercase tracking-tighter">Slow 3G (100kb/s)</span>
                              <span className="text-white font-black">{(result.downloadTime3G / 100).toFixed(1)}s</span>
                           </div>
                           <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-600 rounded-full" style={{ width: `${Math.min(100, (result.gzippedSize / 150000) * 100)}%` }}></div>
                           </div>
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-400 font-bold uppercase tracking-tighter">Emerging 4G (1.5mb/s)</span>
                              <span className="text-white font-black">{(result.downloadTime4G / 100).toFixed(1)}s</span>
                           </div>
                           <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, (result.gzippedSize / 500000) * 100)}%` }}></div>
                           </div>
                        </div>
                        <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-600 leading-tight">
                           Estimativas baseadas em condições ideais de rede.
                        </div>
                     </div>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Composição</h4>
                     <div className="bg-slate-950/50 border border-slate-800 p-8 rounded-3xl space-y-6 flex flex-col justify-center h-full">
                        <div className="flex items-center justify-between group cursor-help">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400"><Layers size={18} /></div>
                              <span className="text-sm font-bold text-slate-300">Dependências</span>
                           </div>
                           <span className="text-lg font-black text-white">{result.dependencies}</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400"><ShieldCheck size={18} /></div>
                              <span className="text-sm font-bold text-slate-300">Vulnerabilidades</span>
                           </div>
                           <span className="text-xs font-black text-green-500 uppercase">None</span>
                        </div>
                        <Button variant="outline" className="w-full text-[10px] h-10 border-slate-800 hover:border-orange-500/30">
                           <BarChart3 size={14} className="mr-2" /> VER GRÁFICO COMPLETO
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-orange-600/5 border border-orange-500/10 rounded-3xl flex gap-6 text-sm text-slate-400">
               <div className="p-3 bg-orange-500/10 rounded-2xl h-fit">
                  <Info size={24} className="text-orange-500" />
               </div>
               <div className="space-y-2">
                  <p className="font-bold text-slate-200">Por que o tamanho do bundle é importante?</p>
                  <p className="leading-relaxed">Cada KB de JavaScript adicionado aumenta o tempo de parsing e execução, especialmente em dispositivos de entrada. Manter seus pacotes leves garante uma experiência fluida (Core Web Vitals) para todos os seus usuários.</p>
               </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 flex flex-col items-center text-center">
                <div className="p-5 bg-orange-600/10 text-orange-500 rounded-3xl shadow-xl shadow-orange-600/5">
                   <BarChart3 size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Análise Inteligente</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                    Entenda como uma biblioteca afeta seu tempo de carregamento e performance geral antes mesmo do `npm install`.
                  </p>
                </div>
             </div>
             
             <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <History size={18} className="text-orange-500" />
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Análises Recentes</h3>
                </div>
                <div className="space-y-3">
                   {history.length > 0 ? history.map(item => (
                     <button 
                       key={item.name}
                       onClick={() => { setPackageName(item.name); handleSearch(undefined, item.name); }}
                       className="w-full flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:border-orange-500/50 hover:bg-slate-900 transition-all group"
                     >
                        <div className="flex items-center gap-4 text-left">
                           <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-orange-400 transition-colors">
                              <Package size={20} />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-200">{item.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono uppercase">{formatSize(item.gzippedSize)} Gzipped</p>
                           </div>
                        </div>
                        <ArrowRight size={16} className="text-slate-700 group-hover:text-orange-500 transition-all transform group-hover:translate-x-1" />
                     </button>
                   )) : (
                     <div className="py-12 text-center border-2 border-dashed border-slate-800 rounded-3xl opacity-20">
                        <p className="text-sm italic">Nenhum pacote pesquisado ainda.</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FeatureBadge = ({ label, active }: { label: string, active: boolean }) => (
  <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter transition-all ${
    active 
      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
      : 'bg-red-500/10 border-red-500/30 text-red-400'
  }`}>
    {active ? <Check size={12} /> : <AlertCircle size={12} />}
    {label}
  </div>
);

export default BundlePhobiaTool;
