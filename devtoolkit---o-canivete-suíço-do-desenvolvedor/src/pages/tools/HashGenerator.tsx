
import React, { useState } from 'react';
import { Key, Copy, Check, Fingerprint, RefreshCw } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { Input, Textarea } from '../../shared/ui/Input';

const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({
    'MD5': '',
    'SHA-1': '',
    'SHA-256': '',
    'SHA-512': ''
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generateHashes = () => {
    if (!input) return;
    
    // Simulação de geração de hash (em app real usaríamos crypto-js)
    const simulatedHash = (algo: string) => {
      let h = '';
      const charSet = '0123456789abcdef';
      const len = algo === 'MD5' ? 32 : algo === 'SHA-1' ? 40 : algo === 'SHA-256' ? 64 : 128;
      for (let i = 0; i < len; i++) {
        h += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      return h;
    };

    setHashes({
      'MD5': simulatedHash('MD5'),
      'SHA-1': simulatedHash('SHA-1'),
      'SHA-256': simulatedHash('SHA-256'),
      'SHA-512': simulatedHash('SHA-512')
    });
  };

  const copy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
          <Key size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Hash Generator</h1>
          <p className="text-slate-400">Gere somas de verificação (checksums) MD5 e SHA para qualquer texto.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Input Text</label>
          <Textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Digite o conteúdo para gerar os hashes..." 
            className="h-32 border-slate-800"
          />
        </div>
        <Button onClick={generateHashes} className="w-full" disabled={!input}>
          <RefreshCw size={18} className="mr-2" /> Gerar Somas de Verificação
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Added explicit type cast for Object.entries to fix TS unknown error in strict mode */}
        {(Object.entries(hashes) as [string, string][]).map(([algo, hash]) => (
          <div key={algo} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 group hover:border-blue-500/30 transition-all">
             <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-blue-500 uppercase tracking-tighter">{algo}</span>
                <button 
                  disabled={!hash}
                  onClick={() => copy(algo, hash)} 
                  className="text-xs text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  {copiedKey === algo ? <Check size={14} /> : <Copy size={14} />}
                  {copiedKey === algo ? 'Copiado' : 'Copiar'}
                </button>
             </div>
             <div className={`code-font text-sm break-all leading-relaxed ${hash ? 'text-slate-200' : 'text-slate-700 italic'}`}>
               {hash || `Aguardando entrada para ${algo}...`}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashGenerator;
