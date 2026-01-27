
import React, { useState } from 'react';
import { Link, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { Textarea } from '../../shared/ui/Input';

const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => setOutput(encodeURIComponent(input));
  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput('ERRO: URL malformada.');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
          <Link size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">URL Encoder / Decoder</h1>
          <p className="text-slate-400">Codifique ou decodifique caracteres especiais para uso seguro em URLs.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Input Text / URL</label>
          <Textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Cole o texto ou URL aqui..." 
            className="h-40 border-slate-800"
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={handleEncode} className="flex-1">Encodar</Button>
          <Button variant="outline" onClick={handleDecode} className="flex-1">Decodar</Button>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
           <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resultado</label>
              <button disabled={!output} onClick={copy} className="text-xs text-blue-400 hover:text-blue-300">
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
           </div>
           <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-20 text-blue-400 break-all code-font">
             {output || <span className="text-slate-700 italic">O resultado aparecerá aqui...</span>}
           </div>
        </div>
      </div>
    </div>
  );
};

export default UrlEncoder;
