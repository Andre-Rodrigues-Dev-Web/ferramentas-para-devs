
import React, { useState } from 'react';
import { Grid, Copy, Check, RefreshCw, Plus, Minus, Layout } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const LayoutitGrid: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [columnGap, setColumnGap] = useState(10);
  const [rowGap, setRowGap] = useState(10);
  const [copied, setCopied] = useState(false);

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    columnGap: `${columnGap}px`,
    rowGap: `${rowGap}px`,
    width: '100%',
    height: '100%',
  };

  const cssCode = `.container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  grid-column-gap: ${columnGap}px;
  grid-row-gap: ${rowGap}px;
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setColumns(3);
    setRows(3);
    setColumnGap(10);
    setRowGap(10);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
            <Grid size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">CSS Grid Designer</h1>
            <p className="text-slate-400">Desenhe layouts de grade CSS complexos visualmente.</p>
          </div>
        </div>
        <Button variant="outline" onClick={reset}>
          <RefreshCw size={16} className="mr-2" /> Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8 shadow-xl">
            {/* Columns Control */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Colunas</label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setColumns(Math.max(1, columns - 1))}
                    className="p-1 hover:bg-slate-800 rounded border border-slate-700 text-slate-400 hover:text-white transition-all"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold text-blue-400 w-6 text-center">{columns}</span>
                  <button 
                    onClick={() => setColumns(Math.min(12, columns + 1))}
                    className="p-1 hover:bg-slate-800 rounded border border-slate-700 text-slate-400 hover:text-white transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <input 
                type="range" min="1" max="12" value={columns} 
                onChange={e => setColumns(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Rows Control */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Linhas</label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setRows(Math.max(1, rows - 1))}
                    className="p-1 hover:bg-slate-800 rounded border border-slate-700 text-slate-400 hover:text-white transition-all"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold text-blue-400 w-6 text-center">{rows}</span>
                  <button 
                    onClick={() => setRows(Math.min(12, rows + 1))}
                    className="p-1 hover:bg-slate-800 rounded border border-slate-700 text-slate-400 hover:text-white transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <input 
                type="range" min="1" max="12" value={rows} 
                onChange={e => setRows(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Gaps Control */}
            <div className="space-y-6 pt-4 border-t border-slate-800">
              <div className="space-y-4">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase">
                  <span>Espaçamento Colunas</span>
                  <span className="text-blue-400">{columnGap}px</span>
                </div>
                <input 
                  type="range" min="0" max="50" value={columnGap} 
                  onChange={e => setColumnGap(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase">
                  <span>Espaçamento Linhas</span>
                  <span className="text-blue-400">{rowGap}px</span>
                </div>
                <input 
                  type="range" min="0" max="50" value={rowGap} 
                  onChange={e => setRowGap(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">CSS Output</h3>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copiado!' : 'Copiar CSS'}
              </button>
            </div>
            <code className="block bg-slate-950 p-4 rounded-lg text-blue-400 code-font text-[11px] whitespace-pre-wrap border border-slate-800/50 leading-relaxed">
              {cssCode}
            </code>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="aspect-video bg-slate-950 border border-slate-800 rounded-3xl p-6 relative shadow-2xl overflow-hidden group">
            {/* Background pattern for visual guide */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div style={gridStyle}>
              {Array.from({ length: columns * rows }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-blue-600/10 border border-blue-500/30 rounded-lg flex items-center justify-center group/cell hover:bg-blue-600/20 transition-all cursor-default"
                >
                  <span className="text-[10px] font-black text-blue-500/40 group-hover/cell:text-blue-400 transition-colors">
                    {Math.floor(i / columns) + 1} : {(i % columns) + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
               <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-700 shadow-xl flex items-center gap-2">
                 <Layout size={12} />
                 {columns} x {rows} Grid
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl flex gap-3 text-xs leading-relaxed">
               <div className="p-2 bg-blue-600/10 rounded-lg text-blue-500 h-fit">
                 <Grid size={16} />
               </div>
               <div className="space-y-1">
                 <p className="font-bold text-slate-200">Por que usar CSS Grid?</p>
                 <p className="text-slate-400">O Grid permite criar layouts bidimensionais complexos com muito menos código que o Flexbox ou métodos tradicionais.</p>
               </div>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex gap-3 text-xs leading-relaxed">
               <div className="p-2 bg-slate-800 rounded-lg text-slate-400 h-fit">
                 <Layout size={16} />
               </div>
               <div className="space-y-1">
                 <p className="font-bold text-slate-200">Áreas nomeadas</p>
                 <p className="text-slate-400">Você pode expandir este código usando <code className="text-blue-400">grid-template-areas</code> para maior controle semântico.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutitGrid;
