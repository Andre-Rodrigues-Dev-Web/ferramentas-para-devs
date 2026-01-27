
import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Square } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const FancyBorderGenerator: React.FC = () => {
  const [borderRadius, setBorderRadius] = useState([30, 70, 70, 30, 30, 30, 70, 70]);
  const [copied, setCopied] = useState(false);

  const radiusString = `${borderRadius[0]}% ${100 - borderRadius[0]}% ${borderRadius[1]}% ${100 - borderRadius[1]}% / ${borderRadius[3]}% ${borderRadius[2]}% ${100 - borderRadius[2]}% ${100 - borderRadius[3]}%`;

  const handleSliderChange = (index: number, value: number) => {
    const newRadius = [...borderRadius];
    newRadius[index] = value;
    setBorderRadius(newRadius);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`border-radius: ${radiusString};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
          <Square size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Fancy Border Radius</h1>
          <p className="text-slate-400">Crie formas orgânicas e complexas para seus elementos UI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {borderRadius.map((val, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                  <span>Handle #{i + 1}</span>
                  <span className="text-blue-400">{val}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={val} 
                  onChange={(e) => handleSliderChange(i, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full" onClick={() => setBorderRadius([30, 70, 70, 30, 30, 30, 70, 70])}>
            <RefreshCw size={16} className="mr-2" /> Resetar Forma
          </Button>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center">
            <div 
              className="w-64 h-64 bg-gradient-to-br from-blue-600 to-indigo-600 shadow-2xl shadow-blue-500/20 transition-all duration-300 border-4 border-white/10"
              style={{ borderRadius: radiusString }}
            ></div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Código CSS</h3>
              <button onClick={copyToClipboard} className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <code className="block bg-slate-950 p-4 rounded-lg text-blue-400 code-font text-xs break-all border border-slate-800/50">
              border-radius: {radiusString};
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FancyBorderGenerator;
