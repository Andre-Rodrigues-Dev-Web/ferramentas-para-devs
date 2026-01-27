
import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Fingerprint } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

const UuidGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateUUID = () => {
    const newUuids = Array.from({ length: count }, () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    });
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-blue-600/10 text-blue-500 rounded-2xl mb-2">
          <Fingerprint size={48} />
        </div>
        <h1 className="text-3xl font-bold text-white">UUID Generator</h1>
        <p className="text-slate-400">Gere identificadores únicos universais v4 seguros para seus projetos.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-1.5">
            <label className="text-sm text-slate-400">Quantidade</label>
            <input 
              type="number" 
              min="1" 
              max="50" 
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
          <Button onClick={generateUUID} className="h-11">
            <RefreshCw size={18} className="mr-2" /> Gerar
          </Button>
        </div>

        {uuids.length > 0 && (
          <div className="space-y-3 pt-4">
            {uuids.map((uuid, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 group hover:border-blue-500/30 transition-all"
              >
                <code className="text-blue-400 font-mono text-sm md:text-base break-all">{uuid}</code>
                <button 
                  onClick={() => copyToClipboard(uuid)}
                  className="p-2 text-slate-500 hover:text-blue-400 transition-colors"
                >
                  {copiedId === uuid ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UuidGenerator;
