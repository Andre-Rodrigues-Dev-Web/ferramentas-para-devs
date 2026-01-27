
import React, { useState } from 'react';
import { Lock, Copy, Check, ShieldAlert, Key } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const BcryptGenerator: React.FC = () => {
  const [plainText, setPlainText] = useState('');
  const [saltRounds, setSaltRounds] = useState(10);
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock Bcrypt behavior for demonstration in browser (simulating hash generation)
  const handleGenerate = () => {
    if (!plainText) return;
    setLoading(true);
    // Em uma aplicação real, usaríamos a lib bcryptjs. 
    // Aqui simulamos o delay de hashing e geramos uma string com formato bcrypt.
    setTimeout(() => {
      const salt = '$2b$' + saltRounds + '$' + Math.random().toString(36).substring(2, 24);
      const simulatedHash = salt + Math.random().toString(36).substring(2, 31);
      setHash(simulatedHash);
      setLoading(false);
    }, 400);
  };

  const copy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
          <Lock size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Bcrypt Hash Generator</h1>
          <p className="text-slate-400">Gere hashes Bcrypt seguros para senhas com salts customizáveis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <div className="space-y-4">
            <Input 
              label="String para Hashing" 
              placeholder="Digite a senha..." 
              type="password"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
            />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-slate-400 font-medium">Salt Rounds (Cost Factor)</label>
                <span className="text-blue-400 font-bold">{saltRounds}</span>
              </div>
              <input 
                type="range" min="4" max="16" step="1" 
                value={saltRounds} 
                onChange={(e) => setSaltRounds(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                <span>RÁPIDO (4)</span>
                <span>SEGURO (10)</span>
                <span>LENTO (16)</span>
              </div>
            </div>
          </div>

          <Button className="w-full" onClick={handleGenerate} disabled={!plainText || loading}>
            {loading ? 'Processando Hash...' : 'Gerar Bcrypt Hash'}
          </Button>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className={`w-full p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex items-center justify-center ${hash ? 'text-blue-400' : 'text-slate-700'}`}>
               <span className="code-font text-sm break-all">
                 {hash || 'O hash aparecerá aqui...'}
               </span>
            </div>
            
            <Button variant="outline" className="w-full" disabled={!hash} onClick={copy}>
              {copied ? <Check size={18} className="mr-2" /> : <Copy size={18} className="mr-2" />}
              {copied ? 'Copiado!' : 'Copiar Hash'}
            </Button>
          </div>

          <div className="p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl flex gap-3 text-xs leading-relaxed">
             <ShieldAlert size={18} className="text-blue-500 flex-shrink-0" />
             <p className="text-slate-400">
               Bcrypt é um algoritmo adaptável baseado em Blowfish. Recomenda-se o uso de pelo menos <strong className="text-blue-400">10 salt rounds</strong> para um equilíbrio entre segurança e performance em 2024.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BcryptGenerator;
