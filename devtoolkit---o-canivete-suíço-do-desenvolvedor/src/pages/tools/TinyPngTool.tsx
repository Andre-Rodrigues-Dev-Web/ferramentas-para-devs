
import React, { useState, useRef } from 'react';
// Add missing Layers import
import { Image as ImageIcon, Upload, Download, Check, Trash2, Loader2, Sparkles, Layers } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

interface CompressedFile {
  id: string;
  name: string;
  originalSize: number;
  compressedSize: number;
  status: 'idle' | 'compressing' | 'done';
  previewUrl: string;
  compressedUrl?: string;
}

const TinyPngTool: React.FC = () => {
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const fileList = Array.from(newFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      originalSize: file.size,
      compressedSize: 0,
      status: 'idle' as const,
      previewUrl: URL.createObjectURL(file),
      file: file
    }));

    setFiles(prev => [...prev, ...fileList]);
  };

  const compressFile = async (id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'compressing' } : f));

    // Simulate network/compression delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    setFiles(prev => prev.map(f => {
      if (f.id === id) {
        // Simulated compression: between 40% and 75% reduction
        const reduction = 0.4 + Math.random() * 0.35;
        const newSize = Math.floor(f.originalSize * (1 - reduction));
        return { 
          ...f, 
          status: 'done', 
          compressedSize: newSize,
          compressedUrl: f.previewUrl // In a real app, this would be the new blob
        };
      }
      return f;
    }));
  };

  const compressAll = async () => {
    const idleFiles = files.filter(f => f.status === 'idle');
    for (const file of idleFiles) {
      await compressFile(file.id);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      const removed = prev.find(f => f.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return filtered;
    });
  };

  const clearAll = () => {
    files.forEach(f => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const totalOriginal = files.reduce((acc, f) => acc + f.originalSize, 0);
  const totalCompressed = files.reduce((acc, f) => acc + (f.status === 'done' ? f.compressedSize : f.originalSize), 0);
  const totalSaved = totalOriginal - totalCompressed;
  const savingPercentage = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
            <ImageIcon size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">TinyPNG (Simulado)</h1>
            <p className="text-slate-400">Otimize suas imagens PNG e JPEG reduzindo o tamanho do arquivo sem perda de qualidade visual.</p>
          </div>
        </div>
        <div className="flex gap-2">
          {files.length > 0 && (
            <>
              <Button variant="outline" onClick={clearAll} className="text-red-400 border-red-500/20 hover:bg-red-500/10">
                <Trash2 size={16} className="mr-2" /> Limpar Tudo
              </Button>
              <Button onClick={compressAll} disabled={files.every(f => f.status !== 'idle')}>
                <Sparkles size={16} className="mr-2" /> Comprimir Todos
              </Button>
            </>
          )}
        </div>
      </div>

      <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-[2.5rem] p-12 text-center transition-all cursor-pointer group
          ${isDragging 
            ? 'border-blue-500 bg-blue-500/10 scale-[0.99]' 
            : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
          }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          multiple 
          accept="image/png, image/jpeg" 
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-6 rounded-full transition-all duration-300 ${isDragging ? 'bg-blue-600 text-white scale-110' : 'bg-slate-800 text-slate-500 group-hover:scale-110 group-hover:text-blue-400'}`}>
            <Upload size={48} />
          </div>
          <div>
            <p className="text-xl font-bold text-white">Arraste e solte suas imagens aqui</p>
            <p className="text-slate-500 mt-2">Suporta PNG e JPEG até 5MB por arquivo.</p>
          </div>
          <Button variant="secondary" size="sm" className="pointer-events-none">
            Selecionar Arquivos
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Summary Stats */}
          {files.some(f => f.status === 'done') && (
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="text-center md:text-left">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Original</p>
                  <p className="text-xl font-bold text-white">{formatSize(totalOriginal)}</p>
                </div>
                <div className="w-[1px] h-10 bg-slate-800 hidden md:block"></div>
                <div className="text-center md:text-left">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Otimizado</p>
                  <p className="text-xl font-bold text-blue-400">{formatSize(totalCompressed)}</p>
                </div>
              </div>
              <div className="bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/20 text-center">
                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Você economizou</p>
                 <p className="text-3xl font-black">{savingPercentage}%</p>
              </div>
            </div>
          )}

          {/* File List */}
          <div className="space-y-3">
            {files.map(file => (
              <div 
                key={file.id} 
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 group transition-all hover:border-slate-700"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                  <img src={file.previewUrl} alt={file.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0 text-center md:text-left">
                  <p className="font-bold text-white truncate">{file.name}</p>
                  <div className="flex items-center justify-center md:justify-start gap-3 mt-1 text-xs">
                    <span className="text-slate-500">{formatSize(file.originalSize)}</span>
                    {file.status === 'done' && (
                      <>
                        <ArrowRight size={12} className="text-slate-700" />
                        <span className="text-blue-400 font-bold">{formatSize(file.compressedSize)}</span>
                        <span className="text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                          -{((1 - file.compressedSize / file.originalSize) * 100).toFixed(0)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {file.status === 'idle' && (
                    <Button variant="outline" size="sm" onClick={() => compressFile(file.id)}>
                      Comprimir
                    </Button>
                  )}
                  {file.status === 'compressing' && (
                    <div className="flex items-center gap-2 text-blue-400 px-4">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-xs font-bold uppercase tracking-widest">Processando</span>
                    </div>
                  )}
                  {file.status === 'done' && (
                    <div className="flex items-center gap-2">
                       <div className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20 text-xs font-bold uppercase">
                         <Check size={14} /> Pronto
                       </div>
                       <a 
                        href={file.compressedUrl} 
                        download={`compressed-${file.name}`}
                        className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-all border border-slate-700"
                       >
                         <Download size={18} />
                       </a>
                    </div>
                  )}
                  <button 
                    onClick={() => removeFile(file.id)}
                    className="p-2.5 text-slate-600 hover:text-red-400 transition-all rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
           <FeatureCard 
            icon={<Zap size={20} />} 
            title="Compressão Inteligente" 
            description="Algoritmos avançados que removem metadados e cores desnecessárias."
           />
           <FeatureCard 
            icon={<Layers size={20} />} 
            title="Processamento Batch" 
            description="Adicione múltiplos arquivos de uma vez e processe todos simultaneamente."
           />
           <FeatureCard 
            icon={<ImageIcon size={20} />} 
            title="Preview em Tempo Real" 
            description="Visualize suas imagens antes e depois da compressão instantaneamente."
           />
        </div>
      )}
    </div>
  );
};

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14m-7-7 7 7-7 7"/>
  </svg>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
    <div className="p-2.5 bg-blue-600/10 text-blue-500 rounded-lg w-fit">
      {icon}
    </div>
    <h3 className="font-bold text-white">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const Zap = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

export default TinyPngTool;
