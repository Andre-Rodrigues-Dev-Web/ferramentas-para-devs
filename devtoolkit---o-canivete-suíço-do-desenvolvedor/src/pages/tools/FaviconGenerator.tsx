
import React, { useState, useRef } from 'react';
import { Bookmark, Upload, Download, Smartphone, Monitor, Layout, Trash2, Check, Chrome } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

const FaviconGenerator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600/10 text-indigo-500 rounded-2xl">
            <Bookmark size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Favicon Generator</h1>
            <p className="text-slate-400">Converta qualquer imagem em um conjunto completo de favicons otimizados.</p>
          </div>
        </div>
        {image && (
          <div className="flex gap-2">
             <Button variant="outline" onClick={() => setImage(null)} className="text-red-400 border-red-500/20">
               <Trash2 size={16} className="mr-2" /> Resetar
             </Button>
             <Button>
               <Download size={16} className="mr-2" /> Baixar Pacote .zip
             </Button>
          </div>
        )}
      </div>

      {!image ? (
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`aspect-[21/9] border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center transition-all cursor-pointer group ${
            isDragging ? 'border-indigo-500 bg-indigo-600/5 scale-[0.99]' : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} 
          />
          <div className="p-6 bg-slate-800 rounded-full text-slate-600 group-hover:text-indigo-400 group-hover:scale-110 transition-all mb-4">
            <Upload size={48} />
          </div>
          <h3 className="text-xl font-bold text-white">Selecione uma imagem</h3>
          <p className="text-slate-500 mt-2 max-w-sm">Use um arquivo quadrado de alta resolução (mínimo 512x512px) para melhores resultados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Main Context Previews */}
          <div className="lg:col-span-8 space-y-8">
             {/* Browser Tab Preview */}
             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor size={16} className="text-indigo-500" />
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aba do Navegador</h3>
                </div>
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-1 flex items-center">
                   <div className="flex-1 bg-slate-900 rounded-lg p-2 flex items-center gap-3 border border-slate-800 max-w-[240px] shadow-lg">
                      <img src={image} alt="Preview" className="w-4 h-4 rounded-sm object-contain" />
                      <span className="text-[11px] font-medium text-slate-300 truncate">DevToolkit - Suíte Dev</span>
                      <div className="ml-auto flex gap-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                      </div>
                   </div>
                   <div className="ml-2 w-4 h-4 rounded-full bg-slate-800"></div>
                </div>
             </div>

             {/* Mobile Home Screen Preview */}
             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone size={16} className="text-indigo-500" />
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Home Screen (iOS/Android)</h3>
                </div>
                <div className="flex flex-wrap gap-8 justify-center">
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-white rounded-[22%] p-0 overflow-hidden shadow-2xl border border-slate-800/20">
                         <img src={image} alt="App Icon" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">iOS App</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-white rounded-full p-0 overflow-hidden shadow-2xl border border-slate-800/20">
                         <img src={image} alt="App Icon" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Android</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Sizes and Details */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Tamanhos Gerados</h3>
                <div className="space-y-3">
                   <SizeItem size="16x16" label="favicon.ico (Classic)" image={image} />
                   <SizeItem size="32x32" label="favicon.png" image={image} />
                   <SizeItem size="180x180" label="apple-touch-icon.png" image={image} />
                   <SizeItem size="192x192" label="android-chrome-192.png" image={image} />
                   <SizeItem size="512x512" label="android-chrome-512.png" image={image} />
                </div>
             </div>

             <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-4 flex gap-3 text-[11px] leading-relaxed">
                <Chrome size={16} className="text-blue-500 flex-shrink-0" />
                <div className="space-y-1">
                   <p className="font-bold text-slate-200">Recomendação PWA</p>
                   <p className="text-slate-400">Também incluímos um arquivo <code className="text-blue-400">manifest.json</code> pré-configurado no pacote de download.</p>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SizeItem = ({ size, label, image }: { size: string, label: string, image: string }) => (
  <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl group hover:border-indigo-500/30 transition-all">
    <div className="flex items-center gap-3 min-w-0">
       <div className="w-8 h-8 bg-slate-900 rounded border border-slate-800 p-1 flex items-center justify-center">
          <img src={image} className="max-w-full max-h-full object-contain" />
       </div>
       <div className="min-w-0">
          <p className="text-[11px] font-bold text-slate-200 truncate">{label}</p>
          <p className="text-[9px] text-slate-600 font-mono">{size} px</p>
       </div>
    </div>
    <div className="text-green-500/40 group-hover:text-green-500 transition-colors">
       <Check size={14} />
    </div>
  </div>
);

export default FaviconGenerator;
