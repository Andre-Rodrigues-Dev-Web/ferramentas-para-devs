
import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

const NeumorphismGenerator: React.FC = () => {
  const [size, setSize] = useState(200);
  const [radius, setRadius] = useState(40);
  const [distance, setDistance] = useState(20);
  const [intensity, setIntensity] = useState(0.15);
  const [blur, setBlur] = useState(40);
  const [color, setColor] = useState('#0f172a');
  const [shape, setShape] = useState<'flat' | 'concave' | 'convex' | 'pressed'>('flat');
  const [copied, setCopied] = useState(false);

  const getLightColor = (hex: string, intensity: number) => {
    const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + intensity * 255);
    const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + intensity * 255);
    const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + intensity * 255);
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 1)`;
  };

  const getDarkColor = (hex: string, intensity: number) => {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - intensity * 255);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - intensity * 255);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - intensity * 255);
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 1)`;
  };

  const darkShadow = getDarkColor(color, intensity);
  const lightShadow = getLightColor(color, intensity);

  const shadows = shape === 'pressed' 
    ? `inset ${distance}px ${distance}px ${blur}px ${darkShadow}, inset -${distance}px -${distance}px ${blur}px ${lightShadow}`
    : `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;

  const neuStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${radius}px`,
    background: color,
    boxShadow: shadows,
  };

  const cssCode = `border-radius: ${radius}px;
background: ${color};
box-shadow: ${shadows};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Neumorphism Generator</h1>
        <p className="text-slate-400">Gere estilos de UI suave com sombras baseadas em luz natural.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-sm text-slate-400 block">Cor de Fundo</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 bg-slate-800 rounded-lg cursor-pointer" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-400">Tamanho</label>
                  <span className="text-blue-400 font-medium">{size}px</span>
                </div>
                <input type="range" min="50" max="400" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-400">Raio (Border Radius)</label>
                  <span className="text-blue-400 font-medium">{radius}px</span>
                </div>
                <input type="range" min="0" max="100" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-400">Distância</label>
                  <span className="text-blue-400 font-medium">{distance}px</span>
                </div>
                <input type="range" min="1" max="50" value={distance} onChange={(e) => setDistance(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-400">Intensidade</label>
                  <span className="text-blue-400 font-medium">{intensity}</span>
                </div>
                <input type="range" min="0.01" max="0.5" step="0.01" value={intensity} onChange={(e) => setIntensity(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-400">Blur</label>
                  <span className="text-blue-400 font-medium">{blur}px</span>
                </div>
                <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-4">
                {(['flat', 'pressed'] as const).map((s) => (
                  <button key={s} onClick={() => setShape(s)} className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${shape === s ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}>
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="aspect-square rounded-2xl flex items-center justify-center transition-all duration-300 border border-slate-800 shadow-inner" style={{ background: color }}>
            <div style={neuStyle}></div>
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

export default NeumorphismGenerator;
