
import React, { useState, useMemo, useRef } from 'react';
import { 
  Camera, Download, Settings, Monitor, Maximize, Palette, Layout, 
  Trash2, Check, Copy, Info, Loader2, Sparkles, Sliders, Hash, 
  ShieldCheck, Wrench, Type, Terminal, Code2, Cpu, Globe, 
  Zap, Package, Heart, Flame, Command
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { toPng, toBlob } from 'https://esm.sh/html-to-image';

interface CarbonSettings {
  language: string;
  theme: string;
  padding: number;
  borderRadius: number;
  showControls: boolean;
  showLineNumbers: boolean;
  showLogo: boolean;
  logoText: string;
  logoIcon: string;
  background: string;
  shadowIntensity: number;
  fontSize: number;
}

const LANGUAGES = ['JavaScript', 'TypeScript', 'CSS', 'HTML', 'Python', 'React JSX'];

const THEMES = [
  { name: 'Dracula', bg: '#282a36', text: '#f8f8f2' },
  { name: 'Night Owl', bg: '#011627', text: '#d6deeb' },
  { name: 'One Dark', bg: '#282c34', text: '#abb2bf' },
  { name: 'Monokai', bg: '#272822', text: '#f8f8f2' },
  { name: 'GitHub Dark', bg: '#0d1117', text: '#c9d1d9' },
  { name: 'Synthwave', bg: '#262335', text: '#ffffff' },
];

const BACKGROUNDS = [
  { name: 'Indigo Mist', style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Ocean Blue', style: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Cyber Sunset', style: 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)' },
  { name: 'Deep Space', style: 'linear-gradient(to right, #434343 0%, #000000 100%)' },
  { name: 'Lush Green', style: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)' },
  { name: 'Pure White', style: '#ffffff' },
  { name: 'Slate Dark', style: '#0f172a' },
];

const WATERMARK_ICONS = [
  { id: 'Wrench', component: Wrench },
  { id: 'Terminal', component: Terminal },
  { id: 'Code2', component: Code2 },
  { id: 'Cpu', component: Cpu },
  { id: 'Globe', component: Globe },
  { id: 'Zap', component: Zap },
  { id: 'Package', component: Package },
  { id: 'Heart', component: Heart },
  { id: 'Flame', component: Flame },
  { id: 'Command', component: Command },
];

const DEFAULT_CODE = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

// Transformando código em arte
const carbon = {
  isBeautiful: true,
  theme: 'Dark Mode',
  padding: 40
};

greet('Dev');`;

const CarbonCodeTool: React.FC = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [settings, setSettings] = useState<CarbonSettings>({
    language: 'JavaScript',
    theme: 'Night Owl',
    padding: 48,
    borderRadius: 16,
    showControls: true,
    showLineNumbers: true,
    showLogo: true,
    logoText: 'DevToolkit',
    logoIcon: 'Wrench',
    background: BACKGROUNDS[0].style,
    shadowIntensity: 40,
    fontSize: 14,
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  
  const exportRef = useRef<HTMLDivElement>(null);

  const activeTheme = useMemo(() => 
    THEMES.find(t => t.name === settings.theme) || THEMES[1], 
  [settings.theme]);

  const codeLines = useMemo(() => code.split('\n'), [code]);

  const highlightedCode = useMemo(() => {
    return codeLines.map(line => {
      let html = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      html = html.replace(/(['"`][^'"`]*['"`])(?![^<]*>)/g, '<span style="color: #ecc48d">$1</span>');
      html = html.replace(/(\/\/.*)(?![^<]*>)/g, '<span style="color: #637777; font-style: italic">$1</span>');
      const keywords = /\b(function|const|let|var|if|else|return|export|import|from|class|extends|new|true|false|async|await|try|catch)\b(?![^<]*>)/g;
      html = html.replace(keywords, '<span style="color: #c792ea">$1</span>');
      html = html.replace(/\b(\d+)\b(?![^<]*>)/g, '<span style="color: #f78c6c">$1</span>');
      html = html.replace(/\b(\w+)(?=\()(?![^<]*>)/g, '<span style="color: #82aaff">$1</span>');

      return html;
    });
  }, [codeLines]);

  const handleExport = async () => {
    if (!exportRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(exportRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        backgroundColor: 'transparent'
      });
      const link = document.createElement('a');
      link.download = `carbon-code-${settings.logoText.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Falha ao exportar imagem', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyImage = async () => {
    if (!exportRef.current) return;
    setIsCopying(true);
    try {
      const blob = await toBlob(exportRef.current, { cacheBust: true, pixelRatio: 2 });
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setShowCopyFeedback(true);
        setTimeout(() => setShowCopyFeedback(false), 2000);
      }
    } catch (err) {
      console.error('Falha ao copiar imagem', err);
    } finally {
      setIsCopying(false);
    }
  };

  const ActiveLogoIcon = useMemo(() => {
    const icon = WATERMARK_ICONS.find(i => i.id === settings.logoIcon);
    return icon ? icon.component : Wrench;
  }, [settings.logoIcon]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-600/10 text-pink-500 rounded-2xl">
            <Camera size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Carbon Code Studio</h1>
            <p className="text-slate-400">Transforme seus trechos de código em imagens deslumbrantes.</p>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={() => setCode('')} className="text-red-400 border-red-500/20">
             <Trash2 size={16} className="mr-2" /> Limpar
           </Button>
           <Button variant="secondary" onClick={handleCopyImage} disabled={isCopying} className="rounded-2xl border-slate-700">
             {isCopying ? <Loader2 size={18} className="animate-spin mr-2" /> : showCopyFeedback ? <Check size={18} className="mr-2 text-green-500" /> : <Copy size={18} className="mr-2" />}
             {showCopyFeedback ? 'Copiado!' : 'Copiar Imagem'}
           </Button>
           <Button onClick={handleExport} disabled={isExporting} className="bg-pink-600 hover:bg-pink-700 shadow-xl shadow-pink-500/20 px-8 rounded-2xl">
             {isExporting ? <Loader2 size={18} className="animate-spin mr-2" /> : <Download size={18} className="mr-2" />}
             {isExporting ? 'Exportando...' : 'Exportar PNG'}
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-xl space-y-8 overflow-hidden">
              <div className="space-y-6">
                 {/* Theme & Language */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Linguagem</label>
                       <select 
                        value={settings.language}
                        onChange={(e) => setSettings({...settings, language: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-pink-500 transition-all cursor-pointer"
                       >
                         {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Tema Code</label>
                       <select 
                        value={settings.theme}
                        onChange={(e) => setSettings({...settings, theme: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-pink-500 transition-all cursor-pointer"
                       >
                         {THEMES.map(t => <option key={t.name}>{t.name}</option>)}
                       </select>
                    </div>
                 </div>

                 {/* Padding & Radius Sliders */}
                 <div className="space-y-6 pt-4 border-t border-slate-800">
                    <div className="space-y-3">
                       <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
                          <span>Padding</span>
                          <span className="text-pink-500">{settings.padding}px</span>
                       </div>
                       <input 
                        type="range" min="16" max="128" value={settings.padding} 
                        onChange={(e) => setSettings({...settings, padding: parseInt(e.target.value)})}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-600" 
                       />
                    </div>
                    <div className="space-y-3">
                       <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
                          <span>Arredondamento</span>
                          <span className="text-pink-500">{settings.borderRadius}px</span>
                       </div>
                       <input 
                        type="range" min="0" max="40" value={settings.borderRadius} 
                        onChange={(e) => setSettings({...settings, borderRadius: parseInt(e.target.value)})}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-600" 
                       />
                    </div>
                 </div>

                 {/* Backgrounds Selection */}
                 <div className="space-y-4 pt-4 border-t border-slate-800">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Background</label>
                    <div className="grid grid-cols-4 gap-3">
                       {BACKGROUNDS.map((bg) => (
                          <button 
                            key={bg.name}
                            onClick={() => setSettings({...settings, background: bg.style})}
                            className={`aspect-square rounded-xl border-2 transition-all ${settings.background === bg.style ? 'border-pink-500 scale-110 shadow-lg' : 'border-transparent'}`}
                            style={{ background: bg.style }}
                            title={bg.name}
                          />
                       ))}
                    </div>
                 </div>

                 {/* Visibility & Branding */}
                 <div className="pt-4 border-t border-slate-800 space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 block mb-2">Visibilidade & Branding</label>
                    <div className="space-y-3">
                      <ToggleOption 
                        label="Controles da Janela" 
                        checked={settings.showControls} 
                        onChange={(v) => setSettings({...settings, showControls: v})} 
                      />
                      <ToggleOption 
                        label="Números de Linha" 
                        checked={settings.showLineNumbers} 
                        onChange={(v) => setSettings({...settings, showLineNumbers: v})} 
                      />
                      <ToggleOption 
                        label="Marca d'água Logo" 
                        checked={settings.showLogo} 
                        onChange={(v) => setSettings({...settings, showLogo: v})} 
                      />
                    </div>
                    
                    {settings.showLogo && (
                      <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 flex items-center gap-1.5">
                             <Type size={10} /> Texto da Logo
                           </label>
                           <input 
                             type="text" 
                             value={settings.logoText}
                             onChange={(e) => setSettings({...settings, logoText: e.target.value})}
                             className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-pink-500 transition-all"
                             placeholder="Digite seu nome ou marca..."
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 flex items-center gap-1.5">
                             <Sparkles size={10} /> Ícone da Logo
                           </label>
                           <div className="grid grid-cols-5 gap-2">
                              {WATERMARK_ICONS.map((icon) => {
                                 const IconComp = icon.component;
                                 return (
                                    <button
                                       key={icon.id}
                                       onClick={() => setSettings({...settings, logoIcon: icon.id})}
                                       className={`p-2 rounded-lg border transition-all ${settings.logoIcon === icon.id ? 'bg-pink-600 border-pink-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-600 hover:text-slate-400'}`}
                                       title={icon.id}
                                    >
                                       <IconComp size={14} />
                                    </button>
                                 );
                              })}
                           </div>
                        </div>
                      </div>
                    )}
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex gap-4">
              <div className="p-3 bg-blue-600/10 rounded-2xl h-fit">
                 <Sparkles size={20} className="text-blue-500" />
              </div>
              <div className="space-y-1">
                 <p className="text-sm font-bold text-slate-200 uppercase tracking-tighter">Personalização Completa</p>
                 <p className="text-xs text-slate-500 leading-relaxed">Personalize ícone, texto e estilo para criar uma identidade única para seus snippets.</p>
              </div>
           </div>
        </div>

        {/* Studio Canvas */}
        <div className="lg:col-span-8 space-y-6">
           {/* Code Input Area */}
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Código Fonte</h3>
                 <span className="text-[10px] font-bold text-slate-700 uppercase">Input manual</span>
              </div>
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-sm font-mono text-pink-400 focus:outline-none focus:border-pink-500/50 transition-all min-h-[150px] resize-none overflow-hidden"
                placeholder="Cole seu código aqui..."
                spellCheck={false}
              />
           </div>

           {/* Live Preview Container */}
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-4 shadow-2xl flex items-center justify-center min-h-[500px] relative overflow-hidden group">
              {/* Background visual detail */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              
              <div 
                ref={exportRef}
                className="transition-all duration-500 shadow-2xl relative"
                style={{ 
                  background: settings.background,
                  padding: `${settings.padding}px`,
                  borderRadius: '12px',
                  maxWidth: '100%',
                }}
              >
                 {/* The Code Window */}
                 <div 
                  className="overflow-hidden shadow-2xl border border-white/10 relative"
                  style={{ 
                    backgroundColor: activeTheme.bg,
                    borderRadius: `${settings.borderRadius}px`,
                    boxShadow: `0 ${settings.shadowIntensity / 2}px ${settings.shadowIntensity}px rgba(0,0,0,0.4)`
                  }}
                 >
                    {/* Window Controls */}
                    {settings.showControls && (
                      <div className="px-5 py-4 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        <div className="ml-4 text-[11px] font-bold text-slate-600/80 tracking-widest uppercase">
                          {settings.language}
                        </div>
                      </div>
                    )}

                    {/* Code Content */}
                    <div 
                      className={`px-8 pb-8 ${settings.showControls ? 'pt-4' : 'pt-8'} flex`}
                      style={{ 
                        fontSize: `${settings.fontSize}px`,
                        lineHeight: '1.6'
                      }}
                    >
                       {settings.showLineNumbers && (
                         <div className="pr-4 mr-2 border-r border-white/5 flex flex-col text-right select-none opacity-20 font-mono">
                           {codeLines.map((_, i) => (
                             <div key={i}>{i + 1}</div>
                           ))}
                         </div>
                       )}
                       <pre className="m-0 font-mono whitespace-pre text-left flex-1">
                         <code 
                          className="block"
                          style={{ color: activeTheme.text }}
                         >
                           {highlightedCode.map((lineHtml, i) => (
                             <div key={i} dangerouslySetInnerHTML={{ __html: lineHtml || ' ' }} />
                           ))}
                         </code>
                       </pre>
                    </div>

                    {/* Watermark/Logo inside Window */}
                    {settings.showLogo && (
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-20 grayscale pointer-events-none">
                         <div className="bg-pink-500 p-1 rounded-md">
                           <ActiveLogoIcon size={10} className="text-white" />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-white">{settings.logoText}</span>
                      </div>
                    )}
                 </div>
              </div>

              {/* Resolution Badge */}
              <div className="absolute top-6 left-6 pointer-events-none">
                 <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 flex items-center gap-2">
                    <Maximize size={12} className="text-pink-500" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Canvas Live View</span>
                 </div>
              </div>
           </div>

           {/* Mobile warning / Tips */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl flex gap-3 items-center">
                 <div className="p-2 bg-slate-800 rounded-xl"><Hash size={16} className="text-pink-400" /></div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase">Números de linha ajudam na explicação de trechos</p>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl flex gap-3 items-center">
                 <div className="p-2 bg-slate-800 rounded-xl"><ShieldCheck size={16} className="text-blue-400" /></div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase">Marca d'água integrada para proteção de autor</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ToggleOption = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) => (
  <label className="flex items-center justify-between cursor-pointer group">
    <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-tighter">{label}</span>
    <div 
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-pink-600' : 'bg-slate-800'}`}
    >
      <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${checked ? 'translate-x-4' : ''}`}></div>
    </div>
  </label>
);

export default CarbonCodeTool;
