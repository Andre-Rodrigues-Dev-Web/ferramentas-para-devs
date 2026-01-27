
import React, { useState, useRef, useEffect } from 'react';
import { FileCode, Upload, Download, Check, Trash2, Loader2, Settings, Eye, Code, Zap, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface OptimizedSvg {
  id: string;
  name: string;
  originalSize: number;
  optimizedSize: number;
  status: 'idle' | 'optimizing' | 'done';
  content: string;
  optimizedContent?: string;
}

const SvgOmgTool: React.FC = () => {
  const [files, setFiles] = useState<OptimizedSvg[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Optimization settings (simulated)
  const [config, setConfig] = useState({
    removeMetadata: true,
    removeComments: true,
    removeEditorData: true,
    cleanupAttrs: true,
    roundCoords: true,
    precision: 2
  });

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    Array.from(newFiles).forEach(file => {
      if (file.type !== 'image/svg+xml') return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const id = Math.random().toString(36).substr(2, 9);
        const newFile: OptimizedSvg = {
          id,
          name: file.name,
          originalSize: file.size,
          optimizedSize: 0,
          status: 'idle',
          content
        };
        setFiles(prev => [...prev, newFile]);
        if (!activeFileId) setActiveFileId(id);
      };
      reader.readAsText(file);
    });
  };

  const optimizeFile = async (id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'optimizing' } : f));

    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    setFiles(prev => prev.map(f => {
      if (f.id === id) {
        // Simulated reduction based on config
        let reductionBase = 0.2;
        if (config.removeMetadata) reductionBase += 0.1;
        if (config.removeComments) reductionBase += 0.05;
        if (config.removeEditorData) reductionBase += 0.15;
        if (config.cleanupAttrs) reductionBase += 0.05;
        
        const reduction = reductionBase + (Math.random() * 0.1);
        const newSize = Math.floor(f.originalSize * (1 - reduction));
        
        // Mock optimized content (just minified text for show)
        const optimizedContent = f.content
          .replace(/<!--[\s\S]*?-->/g, '') // remove comments
          .replace(/>\s+</g, '><') // remove whitespace
          .trim();

        return { 
          ...f, 
          status: 'done', 
          optimizedSize: newSize,
          optimizedContent
        };
      }
      return f;
    }));
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    if (activeFileId === id) setActiveFileId(files.find(f => f.id !== id)?.id || null);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const activeFile = files.find(f => f.id === activeFileId);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600/10 text-indigo-500 rounded-2xl">
            <FileCode size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">SVGOMG</h1>
            <p className="text-slate-400">Otimize e limpe seus arquivos SVG para web sem perder qualidade visual.</p>
          </div>
        </div>
        {files.length > 0 && (
          <Button variant="outline" onClick={() => setFiles([])} className="text-red-400 border-red-500/20">
            <Trash2 size={16} className="mr-2" /> Limpar Tudo
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration & File List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Settings size={16} className="text-indigo-500" />
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Configurações</h3>
            </div>
            
            <div className="space-y-4">
              <ToggleSetting 
                label="Remover Metadados" 
                checked={config.removeMetadata} 
                onChange={(v) => setConfig({...config, removeMetadata: v})} 
              />
              <ToggleSetting 
                label="Remover Comentários" 
                checked={config.removeComments} 
                onChange={(v) => setConfig({...config, removeComments: v})} 
              />
              <ToggleSetting 
                label="Remover Dados do Editor" 
                checked={config.removeEditorData} 
                onChange={(v) => setConfig({...config, removeEditorData: v})} 
              />
              <ToggleSetting 
                label="Limpar Atributos" 
                checked={config.cleanupAttrs} 
                onChange={(v) => setConfig({...config, cleanupAttrs: v})} 
              />
              <div className="pt-2 border-t border-slate-800 space-y-3">
                 <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase">
                    <span>Precisão Decimal</span>
                    <span className="text-indigo-400">{config.precision}</span>
                 </div>
                 <input 
                  type="range" min="0" max="5" value={config.precision} 
                  onChange={(e) => setConfig({...config, precision: parseInt(e.target.value)})}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                 />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Arquivos</h3>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1"
                >
                  <Plus size={14} /> ADD
                </button>
             </div>

             {files.length === 0 ? (
               <div className="py-10 text-center border-2 border-dashed border-slate-800 rounded-xl">
                  <Upload size={24} className="mx-auto text-slate-700 mb-2" />
                  <p className="text-xs text-slate-600">Nenhum arquivo</p>
               </div>
             ) : (
               <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {files.map(file => (
                    <div 
                      key={file.id}
                      onClick={() => setActiveFileId(file.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer group ${activeFileId === file.id ? 'bg-indigo-600/10 border-indigo-500/30' : 'bg-slate-800/50 border-slate-800 hover:border-slate-700'}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                         <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-200 truncate">{file.name}</p>
                            <p className="text-[10px] text-slate-500">{formatSize(file.originalSize)}</p>
                         </div>
                         <div className="flex items-center gap-2">
                            {file.status === 'idle' && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); optimizeFile(file.id); }}
                                className="p-1.5 bg-indigo-600 rounded text-white hover:bg-indigo-700"
                              >
                                <Zap size={14} />
                              </button>
                            )}
                            {file.status === 'optimizing' && <Loader2 size={14} className="animate-spin text-indigo-500" />}
                            {file.status === 'done' && <Check size={14} className="text-green-500" />}
                            <button 
                              onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                              className="p-1.5 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                         </div>
                      </div>
                    </div>
                  ))}
               </div>
             )}
          </div>
        </div>

        {/* Right: Main Workspace */}
        <div className="lg:col-span-8 space-y-6">
           {!activeFile ? (
             <div 
               onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
               onDragLeave={() => setIsDragging(false)}
               onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
               onClick={() => fileInputRef.current?.click()}
               className={`aspect-[16/9] border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center text-center p-12 transition-all cursor-pointer group ${isDragging ? 'border-indigo-500 bg-indigo-600/5 scale-[0.99]' : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700'}`}
             >
                <input ref={fileInputRef} type="file" multiple accept=".svg" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                <div className="p-6 bg-slate-800 rounded-full text-slate-600 group-hover:text-indigo-400 group-hover:scale-110 transition-all mb-4">
                  <Upload size={48} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Clique ou arraste seu SVG</h3>
                <p className="text-slate-500 max-w-sm">Comece a otimizar seus vetores para diminuir o tempo de carregamento do seu site.</p>
             </div>
           ) : (
             <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl h-[600px]">
                {/* File Header */}
                <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-600/10 text-indigo-500 rounded-xl flex items-center justify-center">
                        <FileCode size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{activeFile.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                           <span className="text-[10px] font-bold text-slate-500 uppercase">{formatSize(activeFile.originalSize)}</span>
                           {activeFile.status === 'done' && (
                             <>
                              <ArrowRight size={10} className="text-slate-700" />
                              <span className="text-[10px] font-bold text-green-400 uppercase">{formatSize(activeFile.optimizedSize)}</span>
                              <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-1 rounded">-{((1 - activeFile.optimizedSize / activeFile.originalSize) * 100).toFixed(1)}%</span>
                             </>
                           )}
                        </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-2">
                      <div className="flex p-1 bg-slate-800 rounded-lg mr-2">
                        <button 
                          onClick={() => setViewMode('preview')}
                          className={`p-2 rounded-md transition-all ${viewMode === 'preview' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                          title="Visualização"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => setViewMode('code')}
                          className={`p-2 rounded-md transition-all ${viewMode === 'code' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                          title="Código"
                        >
                          <Code size={16} />
                        </button>
                      </div>

                      {activeFile.status === 'done' ? (
                        <Button size="sm" onClick={() => {
                          const blob = new Blob([activeFile.optimizedContent || activeFile.content], { type: 'image/svg+xml' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `optimized-${activeFile.name}`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}>
                          <Download size={16} className="mr-2" /> Baixar
                        </Button>
                      ) : activeFile.status === 'idle' ? (
                        <Button size="sm" onClick={() => optimizeFile(activeFile.id)}>
                          <Zap size={16} className="mr-2" /> Otimizar
                        </Button>
                      ) : (
                        <Button size="sm" disabled>
                          <Loader2 size={16} className="mr-2 animate-spin" /> Processando
                        </Button>
                      )}
                   </div>
                </div>

                {/* Workspace Content */}
                <div className="flex-1 overflow-hidden flex">
                   {viewMode === 'preview' ? (
                     <div className="flex-1 grid grid-cols-2 divide-x divide-slate-800">
                        <div className="flex flex-col">
                           <div className="p-2 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/50 border-b border-slate-800 text-center">Original</div>
                           <div className="flex-1 flex items-center justify-center p-12 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                              <div className="max-w-full max-h-full drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: activeFile.content }}></div>
                           </div>
                        </div>
                        <div className="flex flex-col bg-slate-950/20">
                           <div className="p-2 text-[10px] font-bold text-indigo-500 uppercase bg-slate-950/50 border-b border-slate-800 text-center">Otimizado</div>
                           <div className="flex-1 flex items-center justify-center p-12 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                              {activeFile.status === 'done' ? (
                                <div className="max-w-full max-h-full drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: activeFile.optimizedContent || activeFile.content }}></div>
                              ) : (
                                <div className="text-slate-700 text-center">
                                   <RefreshCw size={48} className={`mx-auto mb-4 ${activeFile.status === 'optimizing' ? 'animate-spin text-indigo-500' : 'opacity-20'}`} />
                                   <p className="text-xs italic">Aguardando otimização...</p>
                                </div>
                              )}
                           </div>
                        </div>
                     </div>
                   ) : (
                     <div className="flex-1 overflow-hidden flex divide-x divide-slate-800">
                        <div className="flex-1 flex flex-col">
                           <div className="p-2 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/50 border-b border-slate-800 text-center">Código Original</div>
                           <pre className="flex-1 p-6 text-[11px] code-font text-slate-500 overflow-auto whitespace-pre-wrap">
                              {activeFile.content}
                           </pre>
                        </div>
                        <div className="flex-1 flex flex-col bg-slate-950/40">
                           <div className="p-2 text-[10px] font-bold text-indigo-500 uppercase bg-slate-950/50 border-b border-slate-800 text-center">Código Otimizado</div>
                           <pre className="flex-1 p-6 text-[11px] code-font text-indigo-300 overflow-auto whitespace-pre-wrap">
                              {activeFile.optimizedContent || (activeFile.status === 'optimizing' ? 'Otimizando...' : 'Clique em otimizar para ver o código limpo.')}
                           </pre>
                        </div>
                     </div>
                   )}
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const ToggleSetting = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) => (
  <label className="flex items-center justify-between cursor-pointer group">
    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{label}</span>
    <div 
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-slate-800'}`}
    >
      <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${checked ? 'translate-x-4' : ''}`}></div>
    </div>
  </label>
);

const Plus = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14m-7-7v14"/>
  </svg>
);

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14m-7-7 7 7-7 7"/>
  </svg>
);

export default SvgOmgTool;
