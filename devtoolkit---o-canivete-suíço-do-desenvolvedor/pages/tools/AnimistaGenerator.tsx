
import React, { useState, useEffect } from 'react';
import { Wind, Play, Copy, Check, RefreshCw, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface AnimationDef {
  name: string;
  className: string;
  keyframes: string;
  description: string;
}

interface AnimationCategory {
  id: string;
  name: string;
  animations: AnimationDef[];
}

const CATEGORIES: AnimationCategory[] = [
  {
    id: 'basic',
    name: 'Básicas',
    animations: [
      {
        name: 'Scale Up',
        className: 'scale-up-center',
        keyframes: `@keyframes scale-up-center {
  0% { transform: scale(0.5); }
  100% { transform: scale(1); }
}`,
        description: 'Aumenta o elemento a partir do centro.'
      },
      {
        name: 'Rotate Center',
        className: 'rotate-center',
        keyframes: `@keyframes rotate-center {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}`,
        description: 'Gira o elemento 360 graus no próprio eixo.'
      }
    ]
  },
  {
    id: 'entrances',
    name: 'Entradas',
    animations: [
      {
        name: 'Slide In Top',
        className: 'slide-in-top',
        keyframes: `@keyframes slide-in-top {
  0% { transform: translateY(-1000px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}`,
        description: 'Desliza o elemento do topo para a posição original.'
      },
      {
        name: 'Fade In',
        className: 'fade-in',
        keyframes: `@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`,
        description: 'Aparecimento suave do elemento.'
      },
      {
        name: 'Bounce In Top',
        className: 'bounce-in-top',
        keyframes: `@keyframes bounce-in-top {
  0% { transform: translateY(-500px); animation-timing-function: ease-in; opacity: 0; }
  38% { transform: translateY(0); animation-timing-function: ease-out; opacity: 1; }
  55% { transform: translateY(-65px); animation-timing-function: ease-in; }
  72% { transform: translateY(0); animation-timing-function: ease-out; }
  81% { transform: translateY(-28px); animation-timing-function: ease-in; }
  90% { transform: translateY(0); animation-timing-function: ease-out; }
  95% { transform: translateY(-8px); animation-timing-function: ease-in; }
  100% { transform: translateY(0); animation-timing-function: ease-out; }
}`,
        description: 'Entrada com efeito de quique vindo de cima.'
      }
    ]
  },
  {
    id: 'attention',
    name: 'Atenção',
    animations: [
      {
        name: 'Vibrate',
        className: 'vibrate-1',
        keyframes: `@keyframes vibrate-1 {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}`,
        description: 'Vibração rápida para chamar atenção.'
      },
      {
        name: 'Shake Horizontal',
        className: 'shake-horizontal',
        keyframes: `@keyframes shake-horizontal {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70% { transform: translateX(-10px); }
  20%, 40%, 60% { transform: translateX(10px); }
  80% { transform: translateX(8px); }
  90% { transform: translateX(-8px); }
}`,
        description: 'Sacode o elemento horizontalmente.'
      }
    ]
  }
];

const AnimistaGenerator: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]);
  const [selectedAnim, setSelectedAnim] = useState(CATEGORIES[0].animations[0]);
  const [duration, setDuration] = useState(0.4);
  const [delay, setDelay] = useState(0);
  const [iterations, setIterations] = useState(1);
  const [timing, setTiming] = useState('ease');
  const [direction, setDirection] = useState('normal');
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Trigger animation replay
  const replay = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);
  };

  useEffect(() => {
    replay();
  }, [selectedAnim, duration, delay, iterations, timing, direction]);

  const animationStyle: React.CSSProperties = {
    animationName: selectedAnim.className,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    animationIterationCount: iterations === 0 ? 'infinite' : iterations,
    animationTimingFunction: timing,
    animationDirection: direction,
    animationFillMode: 'both'
  };

  const cssClassCode = `.${selectedAnim.className} {
  animation: ${selectedAnim.className} ${duration}s ${timing} ${delay}s ${iterations === 0 ? 'infinite' : iterations} ${direction} both;
}`;

  const fullCssCode = `${cssClassCode}\n\n${selectedAnim.keyframes}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullCssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
            <Wind size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Animista - CSS Animations</h1>
            <p className="text-slate-400">Descubra e configure animações CSS performáticas para seus elementos.</p>
          </div>
        </div>
        <Button variant="outline" onClick={replay}>
          <Play size={16} className="mr-2" /> Play
        </Button>
      </div>

      {/* Inject Keyframes into DOM */}
      <style>{selectedAnim.keyframes}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-4">Categorias</h3>
            <div className="space-y-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCat(cat);
                    setSelectedAnim(cat.animations[0]);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedCat.id === cat.id ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-4">Animações</h3>
            <div className="grid grid-cols-1 gap-1">
              {selectedCat.animations.map(anim => (
                <button
                  key={anim.className}
                  onClick={() => setSelectedAnim(anim)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                    selectedAnim.className === anim.className ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {anim.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Preview & Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="aspect-video bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div 
              className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl shadow-blue-500/20"
              style={isAnimating ? animationStyle : {}}
            ></div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center px-4">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Preview: {selectedAnim.name}</span>
               <button onClick={replay} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all">
                 <RefreshCw size={14} />
               </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
             <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase">
                  <span>Duração</span>
                  <span className="text-blue-400">{duration}s</span>
                </div>
                <input type="range" min="0.1" max="5" step="0.1" value={duration} onChange={e => setDuration(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase">
                  <span>Delay</span>
                  <span className="text-blue-400">{delay}s</span>
                </div>
                <input type="range" min="0" max="5" step="0.1" value={delay} onChange={e => setDelay(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">Timing Function</label>
                <select value={timing} onChange={e => setTiming(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500">
                  <option value="ease">Ease</option>
                  <option value="linear">Linear</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                  <option value="ease-in-out">Ease In Out</option>
                  <option value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">Back</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">iterações</label>
                <select value={iterations} onChange={e => setIterations(parseInt(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500">
                  <option value="1">1 vez</option>
                  <option value="2">2 vezes</option>
                  <option value="3">3 vezes</option>
                  <option value="0">Infinito</option>
                </select>
             </div>
          </div>
        </div>

        {/* Code Output Sidebar */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Código CSS</h3>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-600 font-bold uppercase">Classe</span>
                <code className="block bg-slate-950 p-3 rounded-lg text-blue-400 code-font text-[11px] break-all border border-slate-800/50">
                  {cssClassCode}
                </code>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-600 font-bold uppercase">Keyframes</span>
                <code className="block bg-slate-950 p-3 rounded-lg text-purple-400 code-font text-[11px] break-all border border-slate-800/50 max-h-[300px] overflow-y-auto">
                  {selectedAnim.keyframes}
                </code>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl flex gap-3 text-[11px] leading-relaxed">
             <Zap size={16} className="text-blue-500 flex-shrink-0" />
             <p className="text-slate-400">
               <strong className="text-slate-200">Dica:</strong> Para melhor performance, use animações que manipulem apenas <code className="text-blue-400">transform</code> e <code className="text-blue-400">opacity</code>.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimistaGenerator;
