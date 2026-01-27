
import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, RefreshCw, Layers, Image as ImageIcon, HelpCircle, Info } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

interface Point {
  x: number;
  y: number;
}

interface Shape {
  name: string;
  points: Point[];
  description: string;
}

const PRESETS: Shape[] = [
  { name: 'Triângulo', points: [{ x: 50, y: 0 }, { x: 0, y: 100 }, { x: 100, y: 100 }], description: 'Um polígono simples de três lados, ideal para setas ou indicadores de direção.' },
  { name: 'Trapézio', points: [{ x: 20, y: 0 }, { x: 80, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }], description: 'Um quadrilátero com um par de lados paralelos. Ótimo para abas de navegação.' },
  { name: 'Paralelogramo', points: [{ x: 25, y: 0 }, { x: 100, y: 0 }, { x: 75, y: 100 }, { x: 0, y: 100 }], description: 'Um quadrilátero com dois pares de lados paralelos, criando um efeito de inclinação dinâmico.' },
  { name: 'Losango', points: [{ x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 50 }], description: 'Uma forma de diamante equilibrada, perfeita para selos ou destaques visuais.' },
  { name: 'Pentágono', points: [{ x: 50, y: 0 }, { x: 100, y: 38 }, { x: 82, y: 100 }, { x: 18, y: 100 }, { x: 0, y: 38 }], description: 'Polígono de cinco lados que oferece uma estética moderna e geométrica.' },
  { name: 'Hexágono', points: [{ x: 50, y: 0 }, { x: 100, y: 25 }, { x: 100, y: 75 }, { x: 50, y: 100 }, { x: 0, y: 75 }, { x: 0, y: 25 }], description: 'A forma da colmeia, excelente para layouts modulares e grids criativos.' },
  { name: 'Heptágono', points: [{ x: 50, y: 0 }, { x: 90, y: 20 }, { x: 100, y: 60 }, { x: 75, y: 100 }, { x: 25, y: 100 }, { x: 0, y: 60 }, { x: 10, y: 20 }], description: 'Um polígono de sete lados menos comum, garantindo um visual único ao elemento.' },
  { name: 'Octógono', points: [{ x: 30, y: 0 }, { x: 70, y: 0 }, { x: 100, y: 30 }, { x: 100, y: 70 }, { x: 70, y: 100 }, { x: 30, y: 100 }, { x: 0, y: 70 }, { x: 0, y: 30 }], description: 'Forma clássica de sinalização, útil para botões de parada ou containers robustos.' },
  { name: 'Seta Direita', points: [{ x: 0, y: 20 }, { x: 60, y: 20 }, { x: 60, y: 0 }, { x: 100, y: 50 }, { x: 60, y: 100 }, { x: 60, y: 80 }, { x: 0, y: 80 }], description: 'Seta clássica apontando para a direita, ideal para botões de próximo ou links.' },
  { name: 'Seta Esquerda', points: [{ x: 40, y: 0 }, { x: 40, y: 20 }, { x: 100, y: 20 }, { x: 100, y: 80 }, { x: 40, y: 80 }, { x: 40, y: 100 }, { x: 0, y: 50 }], description: 'Seta clássica apontando para a esquerda, perfeita para navegação de retorno.' },
  { name: 'Chevron', points: [{ x: 75, y: 0 }, { x: 100, y: 50 }, { x: 75, y: 100 }, { x: 0, y: 100 }, { x: 25, y: 50 }, { x: 0, y: 0 }], description: 'Forma de chevron ou espinha de peixe, dinâmica para indicadores de fluxo.' },
  { name: 'Estrela 5', points: [{ x: 50, y: 0 }, { x: 61, y: 35 }, { x: 98, y: 35 }, { x: 68, y: 57 }, { x: 79, y: 91 }, { x: 50, y: 70 }, { x: 21, y: 91 }, { x: 32, y: 57 }, { x: 2, y: 35 }, { x: 39, y: 35 }], description: 'Estrela de cinco pontas clássica. Ideal para ícones de favoritos ou avaliações.' },
  { name: 'Estrela 8', points: [{ x: 50, y: 0 }, { x: 61, y: 39 }, { x: 100, y: 50 }, { x: 61, y: 61 }, { x: 50, y: 100 }, { x: 39, y: 61 }, { x: 0, y: 50 }, { x: 39, y: 39 }], description: 'Estrela de oito pontas, garantindo um visual de destaque e brilho.' },
  { name: 'Cruz', points: [{ x: 10, y: 25 }, { x: 35, y: 25 }, { x: 35, y: 0 }, { x: 65, y: 0 }, { x: 65, y: 25 }, { x: 90, y: 25 }, { x: 90, y: 50 }, { x: 65, y: 50 }, { x: 65, y: 100 }, { x: 35, y: 100 }, { x: 35, y: 50 }, { x: 10, y: 50 }], description: 'Símbolo universal de adição ou cruz, útil para interfaces médicas ou botões de novo item.' },
  { name: 'Mensagem', points: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 75 }, { x: 75, y: 75 }, { x: 75, y: 100 }, { x: 50, y: 75 }, { x: 0, y: 75 }], description: 'Formato de balão de fala com cauda centralizada. Perfeito para tooltips ou chat.' },
  { name: 'Balão Canto', points: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 75 }, { x: 25, y: 75 }, { x: 0, y: 100 }], description: 'Balão de fala com ponta direcionada para o canto inferior esquerdo.' },
  { name: 'Chanfro', points: [{ x: 20, y: 0 }, { x: 80, y: 0 }, { x: 100, y: 20 }, { x: 100, y: 80 }, { x: 80, y: 100 }, { x: 20, y: 100 }, { x: 0, y: 80 }, { x: 0, y: 20 }], description: 'Bordas cortadas em 45 graus, criando uma estética de design industrial ou futurista.' },
  { name: 'Tag Preço', points: [{ x: 25, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 25, y: 100 }, { x: 0, y: 50 }], description: 'Formato clássico de etiqueta ou tag, excelente para e-commerce e promoções.' },
  { name: 'Moldura', points: [{ x: 0, y: 0 }, { x: 0, y: 100 }, { x: 25, y: 100 }, { x: 25, y: 25 }, { x: 75, y: 25 }, { x: 75, y: 75 }, { x: 25, y: 75 }, { x: 25, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 0 }], description: 'Cria uma moldura vazada, permitindo efeitos de overlay interessantes.' },
];

const ClippyGenerator: React.FC = () => {
  const [points, setPoints] = useState<Point[]>(PRESETS[0].points);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const clipPathString = `polygon(${points.map(p => `${p.x}% ${p.y}%`).join(', ')})`;

  const handleMouseDown = (idx: number) => {
    setDraggingIdx(idx);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (draggingIdx === null || !svgRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = Math.round(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100)));

    const newPoints = [...points];
    newPoints[draggingIdx] = { x, y };
    setPoints(newPoints);
  };

  const handleMouseUp = () => {
    setDraggingIdx(null);
  };

  useEffect(() => {
    if (draggingIdx !== null) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
      return () => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [draggingIdx]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`clip-path: ${clipPathString};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Clippy - CSS clip-path</h1>
          <p className="text-slate-400">Crie formas complexas usando a propriedade clip-path com polígonos.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={() => setShowImage(!showImage)}>
             <ImageIcon size={16} className="mr-2" /> {showImage ? 'Cor Sólida' : 'Imagem de Fundo'}
           </Button>
           <Button variant="outline" onClick={() => setPoints(PRESETS[0].points)}>
             <RefreshCw size={16} className="mr-2" /> Reset
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Presets Sidebar */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between px-2 mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Presets</h3>
            <Info size={14} className="text-slate-600" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {PRESETS.map((shape) => (
              <div key={shape.name} className="relative group/tooltip">
                <button
                  onClick={() => setPoints(shape.points)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700"
                >
                  <div 
                    className="w-6 h-6 bg-blue-600/20 border border-blue-500/30 rounded flex-shrink-0"
                    style={{ clipPath: `polygon(${shape.points.map(p => `${p.x}% ${p.y}%`).join(', ')})` }}
                  ></div>
                  <span className="truncate">{shape.name}</span>
                </button>
                
                {/* Custom Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-[60] w-64 p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-hover/tooltip:translate-x-1 transition-all duration-300 pointer-events-none hidden lg:block border-l-4 border-l-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-8 h-8 bg-blue-600/40 border border-blue-500/50 rounded flex-shrink-0"
                      style={{ clipPath: `polygon(${shape.points.map(p => `${p.x}% ${p.y}%`).join(', ')})` }}
                    ></div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">{shape.name}</p>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-normal">{shape.description}</p>
                  
                  {/* Arrow */}
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-slate-800 border-l border-b border-slate-700 rotate-45"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative aspect-square bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Background Layers */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div 
              className="absolute inset-8 transition-all duration-300"
              style={{ 
                clipPath: clipPathString,
                backgroundImage: showImage ? 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800)' : 'none',
                backgroundColor: showImage ? 'transparent' : '#3b82f6',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>

            {/* Interaction Layer */}
            <svg 
              ref={svgRef}
              className="absolute inset-8 w-[calc(100%-64px)] h-[calc(100%-64px)] touch-none cursor-crosshair overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleMouseMove}
            >
              <polygon 
                points={points.map(p => `${p.x},${p.y}`).join(' ')}
                className="fill-blue-500/20 stroke-blue-500 stroke-[0.5]"
              />
              {points.map((p, idx) => (
                <g 
                  key={idx}
                  onMouseEnter={() => setHoveredPointIdx(idx)}
                  onMouseLeave={() => setHoveredPointIdx(null)}
                >
                  <circle 
                    cx={p.x}
                    cy={p.y}
                    r="2.5"
                    className={`cursor-grab active:cursor-grabbing fill-white stroke-blue-600 stroke-[0.8] shadow-lg transition-transform hover:scale-125 ${draggingIdx === idx ? 'scale-150 fill-blue-500' : ''}`}
                    onMouseDown={() => handleMouseDown(idx)}
                    onTouchStart={() => handleMouseDown(idx)}
                  />
                  {/* Coordinate Tooltip */}
                  {(hoveredPointIdx === idx || draggingIdx === idx) && (
                    <g transform={`translate(${p.x}, ${p.y - 6})`}>
                      <rect 
                        x="-10" 
                        y="-6" 
                        width="20" 
                        height="8" 
                        rx="2" 
                        className="fill-slate-900/90 stroke-slate-700 stroke-[0.2]"
                      />
                      <text 
                        textAnchor="middle" 
                        fontSize="3.5" 
                        className="fill-blue-400 font-bold pointer-events-none"
                        y="-1"
                      >
                        {p.x}%, {p.y}%
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
            
            <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-700 pointer-events-none">
              Canvas Interativo
            </div>
          </div>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Código CSS</h3>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <div className="relative group">
              <code className="block bg-slate-950 p-4 rounded-lg text-blue-400 code-font text-xs break-all border border-slate-800/50 leading-relaxed max-h-[200px] overflow-y-auto">
                clip-path: {clipPathString};
              </code>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Pontos</h3>
             <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {points.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3 text-xs bg-slate-800/50 p-2 rounded-lg border border-slate-800 group/point">
                    <span className="font-bold text-slate-500">#{idx + 1}</span>
                    <div className="flex gap-4">
                       <span className="text-slate-300">X: <span className="text-blue-400 group-hover/point:text-blue-300 transition-colors">{p.x}%</span></span>
                       <span className="text-slate-300">Y: <span className="text-blue-400 group-hover/point:text-blue-300 transition-colors">{p.y}%</span></span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClippyGenerator;
