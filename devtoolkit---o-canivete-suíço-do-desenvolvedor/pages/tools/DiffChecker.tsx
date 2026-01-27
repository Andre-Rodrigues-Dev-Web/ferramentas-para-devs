
import React, { useState } from 'react';
import { Copy, ArrowRightLeft, Check, Trash2 } from 'lucide-react';
import { Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

const DiffChecker: React.FC = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<{ type: 'same' | 'added' | 'removed', value: string }[] | null>(null);

  const handleDiff = () => {
    // Implementação simplificada de diff por linhas
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: any[] = [];
    
    // Este é um algoritmo básico de comparação para demonstração UI
    const maxLines = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLines; i++) {
      if (lines1[i] === lines2[i]) {
        result.push({ type: 'same', value: lines1[i] });
      } else {
        if (lines1[i] !== undefined) result.push({ type: 'removed', value: lines1[i] });
        if (lines2[i] !== undefined) result.push({ type: 'added', value: lines2[i] });
      }
    }
    setDiff(result);
  };

  const clear = () => {
    setText1('');
    setText2('');
    setDiff(null);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
            <Copy size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Diff Checker</h1>
            <p className="text-slate-400">Compare dois blocos de texto ou código para encontrar alterações.</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={clear}>
          <Trash2 size={16} className="mr-2" /> Limpar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Texto Original</label>
          <Textarea 
            value={text1} 
            onChange={(e) => setText1(e.target.value)} 
            placeholder="Insira o texto original aqui..." 
            className="h-64 border-slate-800"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Texto Modificado</label>
          <Textarea 
            value={text2} 
            onChange={(e) => setText2(e.target.value)} 
            placeholder="Insira o texto alterado aqui..." 
            className="h-64 border-slate-800"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleDiff} className="px-12">
          <ArrowRightLeft size={18} className="mr-2" /> Comparar Textos
        </Button>
      </div>

      {diff && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-700 flex justify-between items-center">
             <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Resultado da Comparação</h3>
             <div className="flex gap-4 text-[10px] font-bold">
                <span className="flex items-center gap-1 text-green-400"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Adicionado</span>
                <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 bg-red-500 rounded-full"></span> Removido</span>
             </div>
          </div>
          <div className="p-6 code-font text-xs overflow-auto max-h-[600px] bg-slate-950">
            {diff.map((line, i) => (
              <div 
                key={i} 
                className={`flex gap-4 py-0.5 px-2 -mx-2 ${
                  line.type === 'added' ? 'bg-green-500/10 text-green-400' : 
                  line.type === 'removed' ? 'bg-red-500/10 text-red-400' : 
                  'text-slate-500'
                }`}
              >
                <span className="w-8 text-right select-none opacity-30">{i + 1}</span>
                <span className="select-none w-4">{line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}</span>
                <span className="whitespace-pre-wrap">{line.value || ' '}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiffChecker;
