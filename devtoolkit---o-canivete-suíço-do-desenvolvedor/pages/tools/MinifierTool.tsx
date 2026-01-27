
import React, { useState } from 'react';
import { Minimize, Copy, Check, Trash2, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Input';

const MinifierTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState<{ original: number, minified: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    if (!input.trim()) return;

    // Lógica simples de minificação (remove comentários e espaços extras)
    const minified = input
      .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '') // Remove comentários
      .replace(/\s+/g, ' ') // Colapsa espaços múltiplos
      .replace(/\s*([{};,:])\s*/g, '$1') // Remove espaços ao redor de símbolos
      .trim();

    setOutput(minified);
    setStats({
      original: new Blob([input]).size,
      minified: new Blob([minified]).size
    });
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const compressionRate = stats ? ((1 - stats.minified / stats.original) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
          <Minimize size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">JS & CSS Minifier</h1>
          <p className="text-slate-400">Reduza o tamanho dos seus arquivos de estilo e script para produção.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Código Fonte</label>
             <button onClick={() => setInput('')} className="text-slate-600 hover:text-red-400 transition-colors">
               <Trash2 size={16} />
             </button>
          </div>
          <Textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Cole seu CSS ou JavaScript aqui..." 
            className="h-[400px] border-slate-800 focus:border-blue-500"
          />
          <Button onClick={handleMinify} className="w-full" disabled={!input}>
            <Zap size={18} className="mr-2" /> Minificar Código
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resultado Minificado</label>
             <button disabled={!output} onClick={copy} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold">
               {copied ? <Check size={14} /> : <Copy size={14} />}
               {copied ? 'COPIADO' : 'COPIAR'}
             </button>
          </div>
          <div className="relative group">
            <div className="w-full h-[400px] bg-slate-950 border-2 border-slate-800 rounded-xl p-4 code-font text-xs text-blue-300 break-all overflow-auto">
               {output || <span className="text-slate-700 italic">O resultado aparecerá aqui após a minificação...</span>}
            </div>
            
            {stats && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                 <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-lg flex-1">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Economia</div>
                    <div className="text-green-400 font-bold">{compressionRate}% menor</div>
                 </div>
                 <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-lg flex-1">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Tamanho Final</div>
                    <div className="text-blue-400 font-bold">{(stats.minified / 1024).toFixed(2)} KB</div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinifierTool;
