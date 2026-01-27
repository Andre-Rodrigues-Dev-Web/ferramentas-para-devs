
import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Layers } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

const GlassmorphismGenerator: React.FC = () => {
  const [blur, setBlur] = useState(10);
  const [transparency, setTransparency] = useState(0.2);
  const [color, setColor] = useState('#ffffff');
  const [borderOpacity, setBorderOpacity] = useState(0.1);
  const [saturation, setSaturation] = useState(100);
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const glassStyle = {
    background: `rgba(${hexToRgb(color)}, ${transparency})`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
    borderRadius: '24px',
  };

  const cssCode = `background: rgba(${hexToRgb(color)}, ${transparency});
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border: 1px solid rgba(255, 255, 255, ${borderOpacity});
border-radius: 24px;`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Glassmorphism Generator</h1>
        <p className="text-slate-400">Crie efeitos de vidro fosco elegantes com filtros de backdrop.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-400">Blur</label>
                  <span className="text-blue-400 font-medium">{blur}px</span>
                </div>
                <input type="range" min="0" max="40" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-400">Transparência</label>
                  <span className="text-blue-400 font-medium">{transparency}</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={transparency} onChange={(e) => setTransparency(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-400">Saturação</label>
                  <span className="text-blue-400 font-medium">{saturation}%</span>
                </div>
                <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-400">Opacidade da Borda</label>
                  <span className="text-blue-400 font-medium">{borderOpacity}</span>
                </div>
                <input type="range" min="0" max="0.5" step="0.01" value={borderOpacity} onChange={(e) => setBorderOpacity(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400 block">Cor Principal</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 bg-slate-800 rounded-lg cursor-pointer" />
              </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden flex items-center justify-center bg-slate-800 shadow-2xl border border-slate-700">
            {/* Background for preview */}
            <div className="absolute inset-0 z-0">
               <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
               <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[80px] opacity-40"></div>
            </div>
            <div className="z-10 w-2/3 h-2/3 p-8 flex flex-col justify-center" style={glassStyle}>
              <div className="w-12 h-12 bg-white/20 rounded-full mb-4"></div>
              <div className="h-4 w-1/2 bg-white/20 rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-white/10 rounded"></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Código CSS</h3>
              <button onClick={copyToClipboard} className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <pre className="block bg-slate-950 p-4 rounded-lg text-blue-400 code-font text-xs overflow-x-auto">
              {cssCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismGenerator;
