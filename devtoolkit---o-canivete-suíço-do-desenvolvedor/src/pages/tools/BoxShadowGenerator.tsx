
import React, { useState } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

const BoxShadowGenerator: React.FC = () => {
  const [config, setConfig] = useState({
    x: 10,
    y: 10,
    blur: 20,
    spread: 0,
    opacity: 0.2,
    color: '#000000',
    inset: false
  });
  const [copied, setCopied] = useState(false);

  const boxShadow = `${config.inset ? 'inset ' : ''}${config.x}px ${config.y}px ${config.blur}px ${config.spread}px ${hexToRgba(config.color, config.opacity)}`;

  function hexToRgba(hex: string, opacity: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`box-shadow: ${boxShadow};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Box Shadow Generator</h1>
          <p className="text-slate-400">Gere sombras personalizadas com preview em tempo real.</p>
        </div>
        <Button variant="outline" onClick={() => setConfig({ x: 10, y: 10, blur: 20, spread: 0, opacity: 0.2, color: '#000000', inset: false })}>
          <RefreshCw size={16} className="mr-2" /> Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
            <Slider label="Eixo X" value={config.x} min={-100} max={100} onChange={(v) => setConfig({...config, x: v})} />
            <Slider label="Eixo Y" value={config.y} min={-100} max={100} onChange={(v) => setConfig({...config, y: v})} />
            <Slider label="Blur" value={config.blur} min={0} max={100} onChange={(v) => setConfig({...config, blur: v})} />
            <Slider label="Spread" value={config.spread} min={-100} max={100} onChange={(v) => setConfig({...config, spread: v})} />
            <Slider label="Opacidade" value={config.opacity} min={0} max={1} step={0.01} onChange={(v) => setConfig({...config, opacity: v})} />
            
            <div className="flex gap-4">
              <div className="flex-1 space-y-1.5">
                <label className="text-sm text-slate-400 block">Cor da Sombra</label>
                <input 
                  type="color" 
                  value={config.color} 
                  onChange={(e) => setConfig({...config, color: e.target.value})}
                  className="w-full h-10 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-slate-300">
                  <input 
                    type="checkbox" 
                    checked={config.inset}
                    onChange={(e) => setConfig({...config, inset: e.target.checked})}
                    className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500" 
                  />
                  Sombra Interna (Inset)
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[300px] bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center p-12">
            <div 
              className="w-48 h-48 bg-white rounded-2xl transition-all duration-75"
              style={{ boxShadow }}
            ></div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Código CSS</h3>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <code className="block bg-slate-950 p-4 rounded-lg text-blue-400 code-font text-sm break-all">
              box-shadow: {boxShadow};
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

const Slider: React.FC<{ label: string, value: number, min: number, max: number, step?: number, onChange: (v: number) => void }> = ({ label, value, min, max, step = 1, onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <label className="text-slate-400">{label}</label>
      <span className="text-blue-400 font-medium">{value}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
  </div>
);

export default BoxShadowGenerator;
