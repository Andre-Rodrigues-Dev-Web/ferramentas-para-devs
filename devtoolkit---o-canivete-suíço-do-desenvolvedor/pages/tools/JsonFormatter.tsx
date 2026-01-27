
import React, { useState } from 'react';
import { Copy, Check, Trash2, FileJson, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Input';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">JSON Formatter & Validator</h1>
        <p className="text-slate-400">Embeleze, valide ou minifique seus objetos JSON instantaneamente.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Input</label>
            <div className="flex gap-2">
              <button onClick={clear} className="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-red-400 transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <Textarea 
            placeholder="Cole seu JSON bruto aqui..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-[400px] border-slate-800 focus:border-blue-500"
          />
          <div className="flex gap-3">
            <Button onClick={handleFormat} className="flex-1">
              <FileJson size={18} className="mr-2" /> Formatar
            </Button>
            <Button variant="outline" onClick={handleMinify} className="flex-1">
              Minificar
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Output</label>
            <button 
              disabled={!output}
              onClick={copyOutput}
              className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-30"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          
          <div className="relative group">
            <div className={`w-full min-h-[400px] bg-slate-900 border-2 rounded-xl p-4 code-font text-sm whitespace-pre-wrap overflow-auto max-h-[460px] ${error ? 'border-red-500/50 bg-red-500/5' : 'border-slate-800'}`}>
              {error ? (
                <div className="flex items-start gap-3 text-red-400">
                  <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">JSON Inválido</p>
                    <p className="mt-1 opacity-80">{error}</p>
                  </div>
                </div>
              ) : output ? (
                <pre className="text-blue-400">{output}</pre>
              ) : (
                <p className="text-slate-600 italic">O resultado aparecerá aqui...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
