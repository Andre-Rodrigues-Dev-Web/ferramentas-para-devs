
import React, { useState, useRef, useEffect } from 'react';
import { Copy, RefreshCw, Check, Plus, Trash2, Move, LayoutGrid, FileCode, Box } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

const CssGradientGenerator: React.FC = () => {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  
  // Radial specific state
  const [radialShape, setRadialShape] = useState<'circle' | 'ellipse'>('circle');
  const [radialSize, setRadialSize] = useState('farthest-corner');
  const [radialPosX, setRadialPosX] = useState(50);
  const [radialPosY, setRadialPosY] = useState(50);

  const [stops, setStops] = useState<ColorStop[]>([
    { id: '1', color: '#3b82f6', position: 0 },
    { id: '2', color: '#ef4444', position: 100 },
  ]);
  const [copied, setCopied] = useState(false);
  const [exportMode, setExportMode] = useState<'property' | 'class'>('property');

  const pickerRef = useRef<HTMLDivElement>(null);

  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  const stopsString = sortedStops
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(', ');

  const gradientValue = type === 'linear' 
    ? `linear-gradient(${angle}deg, ${stopsString})`
    : `radial-gradient(${radialShape} ${radialSize} at ${radialPosX}% ${radialPosY}%, ${stopsString})`;

  const fullCssCode = `.gradient-preview {
  width: 100%;
  height: 300px;
  border-radius: 16px;
  background: ${gradientValue};
}`;

  const currentCode = exportMode === 'property' 
    ? `background: ${gradientValue};` 
    : fullCssCode;

  const reset = () => {
    setType('linear');
    setAngle(90);
    setRadialShape('circle');
    setRadialSize('farthest-corner');
    setRadialPosX(50);
    setRadialPosY(50);
    setStops([
      { id: '1', color: '#3b82f6', position: 0 },
      { id: '2', color: '#ef4444', position: 100 },
    ]);
  };

  const addStop = () => {
    if (stops.length >= 6) return;
    const newId = Math.random().toString(36).substr(2, 9);
    setStops([...stops, { id: newId, color: '#ffffff', position: 50 }]);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(stops.filter(s => s.id !== id));
  };

  const updateStop = (id: string, updates: Partial<ColorStop>) => {
    setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handlePositionPick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!pickerRef.current) return;
    const rect = pickerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    
    setRadialPosX(Math.round(x));
    setRadialPosY(Math.round(y));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: 'TL', x: 0, y: 0 }, { label: 'T', x: 50, y: 0 }, { label: 'TR', x: 100, y: 0 },
    { label: 'L', x: 0, y: 50 }, { label: 'C', x: 50, y: 50 }, { label: 'R', x: 100, y: 50 },
    { label: 'BL', x: 0, y: 100 }, { label: 'B', x: 50, y: 100 }, { label: 'BR', x: 100, y: 100 },
  ];

  const radialSizeOptions = [
    { value: 'closest-side', label: 'Closest Side' },
    { value: 'farthest-side', label: 'Farthest Side' },
    { value: 'closest-corner', label: 'Closest Corner' },
    { value: 'farthest-corner', label: 'Farthest Corner' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">CSS Gradient Generator</h1>
          <p className="text-slate-400">Crie gradientes incríveis e exporte o código CSS pronto para uso.</p>
        </div>
        <Button variant="outline" onClick={reset}>
          <RefreshCw size={16} className="mr-2" /> Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 overflow-hidden">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 block">Tipo de Gradiente</label>
              <div className="flex p-1 bg-slate-800 rounded-lg w-fit">
                <button 
                  onClick={() => setType('linear')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${type === 'linear' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Linear
                </button>
                <button 
                  onClick={() => setType('radial')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${type === 'radial' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Radial
                </button>
              </div>
            </div>

            {type === 'linear' ? (
              <div className="space-y-4 p-4 bg-slate-800/30 rounded-xl border border-slate-800/50 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex justify-between text-sm">
                  <label className="text-slate-400 font-medium">Ângulo</label>
                  <span className="text-blue-400 font-bold">{angle}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={angle} 
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-bold px-1">
                  <span>0°</span>
                  <span>90°</span>
                  <span>180°</span>
                  <span>270°</span>
                  <span>360°</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6 p-4 bg-slate-800/30 rounded-xl border border-slate-800/50 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Shape</label>
                    <select 
                      value={radialShape}
                      onChange={(e) => setRadialShape(e.target.value as any)}
                      className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="circle">Círculo</option>
                      <option value="ellipse">Elipse</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Extent Size</label>
                    <select 
                      value={radialSize}
                      onChange={(e) => setRadialSize(e.target.value)}
                      className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      {radialSizeOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Position (at X Y)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Visual Position Picker */}
                    <div 
                      ref={pickerRef}
                      onMouseDown={handlePositionPick}
                      className="aspect-square bg-slate-800 rounded-lg border-2 border-slate-700 relative cursor-crosshair overflow-hidden group shadow-inner"
                    >
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                      <div 
                        className="absolute w-6 h-6 -ml-3 -mt-3 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center pointer-events-none transition-all duration-75"
                        style={{ left: `${radialPosX}%`, top: `${radialPosY}%` }}
                      >
                        <Move size={12} className="text-white" />
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="grid grid-cols-3 gap-1">
                        {presets.map((p) => (
                          <button
                            key={p.label}
                            onClick={() => { setRadialPosX(p.x); setRadialPosY(p.y); }}
                            className={`h-8 rounded text-[10px] font-bold border transition-all ${
                              radialPosX === p.x && radialPosY === p.y 
                                ? 'bg-blue-600 border-blue-500 text-white' 
                                : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300 hover:bg-slate-750'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                            <span>X Position</span>
                            <span className="text-blue-400">{radialPosX}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={radialPosX} 
                            onChange={(e) => setRadialPosX(parseInt(e.target.value))}
                            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                            <span>Y Position</span>
                            <span className="text-blue-400">{radialPosY}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={radialPosY} 
                            onChange={(e) => setRadialPosY(parseInt(e.target.value))}
                            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Color Stops</label>
                <button 
                  onClick={addStop}
                  disabled={stops.length >= 6}
                  className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 disabled:opacity-30 transition-all font-bold"
                >
                  <Plus size={14} /> Adicionar
                </button>
              </div>
              
              <div className="space-y-3">
                {stops.map((stop) => (
                  <div key={stop.id} className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-800 group hover:border-slate-700 transition-all">
                    <input 
                      type="color" 
                      value={stop.color} 
                      onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                      className="w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer p-0 overflow-hidden"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold px-1">
                        <span>Position</span>
                        <span className="text-blue-500">{stop.position}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={stop.position} 
                        onChange={(e) => updateStop(stop.id, { position: parseInt(e.target.value) })}
                        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>
                    <button 
                      onClick={() => removeStop(stop.id)}
                      className="p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[350px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative group shadow-2xl">
            <div 
              className="absolute inset-0 transition-all duration-300"
              style={{ background: gradientValue }}
            ></div>
            <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-all pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-700 shadow-xl">
              Real-time Preview
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex p-1 bg-slate-800 rounded-lg">
                <button 
                  onClick={() => setExportMode('property')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${exportMode === 'property' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <FileCode size={14} /> Propriedade
                </button>
                <button 
                  onClick={() => setExportMode('class')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${exportMode === 'class' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Box size={14} /> Classe CSS
                </button>
              </div>

              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            
            <div className="relative group">
              <pre className="block bg-slate-950 p-4 rounded-lg text-blue-400 code-font text-sm border border-slate-800/50 leading-relaxed whitespace-pre-wrap break-all">
                {exportMode === 'property' ? (
                  <>
                    <span className="text-slate-500">background:</span> {gradientValue};
                  </>
                ) : (
                  <>
                    <span className="text-purple-400">.gradient-preview</span> {'{\n'}
                    {'  '}<span className="text-slate-500">width:</span> <span className="text-blue-200">100%</span>;{'\n'}
                    {'  '}<span className="text-slate-500">height:</span> <span className="text-blue-200">300px</span>;{'\n'}
                    {'  '}<span className="text-slate-500">border-radius:</span> <span className="text-blue-200">16px</span>;{'\n'}
                    {'  '}<span className="text-slate-500">background:</span> {gradientValue};{'\n'}
                    {'}'}
                  </>
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssGradientGenerator;
