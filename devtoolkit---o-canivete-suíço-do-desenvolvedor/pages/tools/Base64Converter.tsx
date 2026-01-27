
import React, { useState } from 'react';
import { Copy, Check, Binary, ArrowRightLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Input';

const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e: any) {
      setError('Erro na conversão: Verifique se o formato está correto.');
      setOutput('');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-blue-600/10 text-blue-500 rounded-2xl">
          <Binary size={40} />
        </div>
        <h1 className="text-3xl font-bold text-white">Base64 Encoder / Decoder</h1>
        <p className="text-slate-400">Converta texto para Base64 e vice-versa de forma segura.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
          <div className={`px-4 py-2 rounded-full font-bold text-xs ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>TEXTO</div>
          <button onClick={toggleMode} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-blue-400 transition-all border border-slate-700">
            <ArrowRightLeft size={20} />
          </button>
          <div className={`px-4 py-2 rounded-full font-bold text-xs ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>BASE64</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">{mode === 'encode' ? 'Texto Original' : 'Base64 Input'}</label>
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Cole seu ${mode === 'encode' ? 'texto' : 'Base64'} aqui...`} className="h-64 border-slate-800" />
            <Button onClick={handleConvert} className="w-full">Converter</Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{mode === 'encode' ? 'Base64 Result' : 'Texto Decodificado'}</label>
              <button disabled={!output} onClick={copyOutput} className="text-xs text-blue-400 hover:text-blue-300 disabled:opacity-30">
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <div className={`h-64 bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-auto code-font text-sm whitespace-pre-wrap ${error ? 'text-red-400 border-red-500/30 bg-red-500/5' : 'text-blue-400'}`}>
              {error || output || <span className="text-slate-700 italic">O resultado aparecerá aqui...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Converter;
