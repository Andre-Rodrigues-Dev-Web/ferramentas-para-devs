
import React, { useState, useEffect } from 'react';
import { Brackets, Info, AlertCircle, Check } from 'lucide-react';
import { Input, Textarea } from '../../components/ui/Input';

const RegexTester: React.FC = () => {
  const [regex, setRegex] = useState('\\d+');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('Encontrei 42 erros em 3 arquivos diferentes.');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!regex) {
        setMatches([]);
        setError(null);
        return;
      }
      const re = new RegExp(regex, flags);
      const allMatches = Array.from(testString.matchAll(re));
      setMatches(allMatches as any);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  }, [regex, flags, testString]);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
          <Brackets size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Regex Tester</h1>
          <p className="text-slate-400">Teste suas expressões regulares em tempo real com suporte a flags.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Expressão Regular</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 font-mono">/</span>
                  <input 
                    type="text" 
                    value={regex} 
                    onChange={(e) => setRegex(e.target.value)}
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg pl-6 pr-4 py-2 text-blue-400 focus:outline-none focus:border-blue-500 code-font"
                    placeholder="digite o padrão..."
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 font-mono">/</span>
                </div>
              </div>
              <div className="w-24 space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Flags</label>
                <input 
                  type="text" 
                  value={flags} 
                  onChange={(e) => setFlags(e.target.value)}
                  className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-3 py-2 text-purple-400 focus:outline-none focus:border-blue-500 code-font"
                  placeholder="gim"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Texto de Teste</label>
              <Textarea 
                value={testString} 
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Insira o texto para testar a regex..."
                className="h-48 border-slate-800"
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Highlight de Matches</h3>
             <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 code-font text-sm leading-relaxed whitespace-pre-wrap break-all min-h-[100px]">
                {error ? (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                ) : (
                  testString.split(new RegExp(`(${regex})`, flags)).map((part, i) => {
                    const isMatch = part.match(new RegExp(regex, flags));
                    return isMatch && regex ? (
                      <mark key={i} className="bg-blue-600/30 text-blue-200 border-b-2 border-blue-500 px-0.5 rounded-sm">
                        {part}
                      </mark>
                    ) : (
                      <span key={i} className="text-slate-400">{part}</span>
                    );
                  })
                )}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resultados</h3>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">
                {matches.length} matches
              </span>
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
               {matches.map((match, i) => (
                 <div key={i} className="p-3 bg-slate-800/50 rounded-lg border border-slate-800 text-xs space-y-2 group">
                   <div className="flex justify-between text-[10px] font-bold text-slate-500">
                     <span>MATCH #{i + 1}</span>
                     <span>Index: {match.index}</span>
                   </div>
                   <div className="text-blue-400 font-mono font-medium truncate">"{match[0]}"</div>
                 </div>
               ))}
               {matches.length === 0 && !error && (
                 <div className="text-center py-8 text-slate-600 text-xs italic">
                    Nenhum match encontrado.
                 </div>
               )}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-[10px] text-slate-500 space-y-2">
            <h4 className="font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Info size={12} className="text-blue-500" /> Referência Rápida
            </h4>
            <ul className="space-y-1">
              <li><code className="text-blue-400">\d</code> - Qualquer dígito</li>
              <li><code className="text-blue-400">\w</code> - Alfanumérico e "_"</li>
              <li><code className="text-blue-400">\s</code> - Espaço em branco</li>
              <li><code className="text-blue-400">+</code> - 1 ou mais ocorrências</li>
              <li><code className="text-blue-400">*</code> - 0 ou mais ocorrências</li>
              <li><code className="text-blue-400">?</code> - 0 ou 1 ocorrência</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTester;
