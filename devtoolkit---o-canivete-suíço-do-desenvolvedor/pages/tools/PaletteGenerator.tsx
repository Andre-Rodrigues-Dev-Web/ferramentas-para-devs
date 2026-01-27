
import React, { useState, useEffect, useCallback } from 'react';
import { Paintbrush, RefreshCw, Lock, Unlock, Copy, Check, Download, Share2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface ColorItem {
  id: string;
  hex: string;
  isLocked: boolean;
}

const generateRandomHex = () => {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PaletteGenerator: React.FC = () => {
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const generatePalette = useCallback((forceAll = false) => {
    setColors(prev => {
      if (prev.length === 0 || forceAll) {
        return Array.from({ length: 5 }, () => ({
          id: Math.random().toString(36).substr(2, 9),
          hex: generateRandomHex(),
          isLocked: false
        }));
      }
      return prev.map(c => c.isLocked ? c : { ...c, hex: generateRandomHex() });
    });
  }, []);

  useEffect(() => {
    generatePalette(true);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        generatePalette();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generatePalette]);

  const toggleLock = (id: string) => {
    setColors(prev => prev.map(c => c.id === id ? { ...c, isLocked: !c.isLocked } : c));
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const getBrightness = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-600/10 text-pink-500 rounded-2xl">
            <Paintbrush size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Gerador de Paletas</h1>
            <p className="text-slate-400">Pressione <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-700">Espaço</kbd> para gerar novas cores.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => generatePalette(true)}>
             <RefreshCw size={16} className="mr-2" /> Nova Paleta
          </Button>
          <Button>
             <Download size={16} className="mr-2" /> Exportar
          </Button>
        </div>
      </div>

      <div className="flex-1 flex rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {colors.map((color) => {
          const brightness = getBrightness(color.hex);
          const isDark = brightness < 128;
          const textColor = isDark ? 'text-white/90' : 'text-black/70';
          const iconColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)';
          const activeIconColor = isDark ? 'white' : 'black';

          return (
            <div 
              key={color.id}
              className="flex-1 flex flex-col items-center justify-center relative group transition-all duration-300"
              style={{ backgroundColor: color.hex }}
            >
              <div className={`flex flex-col items-center gap-8 z-10 ${textColor}`}>
                <button 
                  onClick={() => toggleLock(color.id)}
                  className="p-3 rounded-full hover:bg-black/10 transition-colors"
                  style={{ color: color.isLocked ? activeIconColor : iconColor }}
                >
                  {color.isLocked ? <Lock size={28} /> : <Unlock size={28} />}
                </button>

                <div className="flex flex-col items-center gap-2">
                   <button 
                    onClick={() => copyColor(color.hex)}
                    className={`text-2xl font-black uppercase tracking-widest hover:scale-110 transition-transform active:scale-95 code-font`}
                   >
                     {color.hex}
                   </button>
                   <div className={`text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-60 transition-opacity`}>
                     Clique para Copiar
                   </div>
                </div>

                <div className="flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                   <button className="p-2 hover:bg-black/10 rounded-lg transition-colors" style={{ color: iconColor }}><Share2 size={20}/></button>
                   <button 
                    onClick={() => copyColor(color.hex)}
                    className="p-2 hover:bg-black/10 rounded-lg transition-colors" 
                    style={{ color: iconColor }}
                   >
                    {copiedHex === color.hex ? <Check size={20} className="text-green-400" /> : <Copy size={20}/>}
                   </button>
                </div>
              </div>

              {/* Feedback de cópia individual */}
              {copiedHex === color.hex && (
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white z-20 animate-in fade-in zoom-in duration-200`}>
                  Copiado!
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-8 py-4">
         <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700"></div>
            <span>Auto-ajuste de contraste</span>
         </div>
         <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Lock size={12} />
            <span>Trave cores que você gostou</span>
         </div>
      </div>
    </div>
  );
};

export default PaletteGenerator;
