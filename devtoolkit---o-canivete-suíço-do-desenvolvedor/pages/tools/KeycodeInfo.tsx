
import React, { useState, useEffect } from 'react';
import { Keyboard, MousePointer2, Info } from 'lucide-react';

const KeycodeInfo: React.FC = () => {
  const [keyInfo, setKeyInfo] = useState<{
    key: string;
    code: string;
    which: number;
    altKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser shortcuts for testing purposes if you want, 
      // but usually better to just capture them.
      setKeyInfo({
        key: e.key === ' ' ? 'Space' : e.key,
        code: e.code,
        which: e.keyCode, // Deprecated but often requested for legacy support
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">JavaScript Keycode Info</h1>
        <p className="text-slate-400 mt-2">Pressione qualquer tecla para obter informações detalhadas do evento.</p>
      </div>

      {!keyInfo ? (
        <div className="h-[400px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center space-y-4 bg-slate-900/50">
          <Keyboard size={64} className="text-slate-700 animate-pulse" />
          <p className="text-slate-500 font-medium">Aguardando entrada do teclado...</p>
        </div>
      ) : (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex justify-center">
            <div className="bg-blue-600 px-12 py-8 rounded-[2.5rem] shadow-2xl shadow-blue-600/20 flex flex-col items-center min-w-[200px]">
              <span className="text-6xl font-black text-white mb-2">{keyInfo.which}</span>
              <span className="text-blue-100 font-medium uppercase tracking-widest text-sm">Keycode</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard label="event.key" value={keyInfo.key} />
            <InfoCard label="event.code" value={keyInfo.code} />
            <InfoCard label="event.which" value={keyInfo.which.toString()} />
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center gap-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Modifiers</span>
              <div className="flex gap-3">
                <ModifierBadge active={keyInfo.altKey} label="Alt" />
                <ModifierBadge active={keyInfo.ctrlKey} label="Ctrl" />
                <ModifierBadge active={keyInfo.shiftKey} label="Shift" />
                <ModifierBadge active={keyInfo.metaKey} label="Meta / Cmd" />
              </div>
            </div>
          </div>

          <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3">
            <Info className="text-blue-500 mt-0.5" size={18} />
            <p className="text-sm text-slate-400">
              <strong className="text-slate-200">Dica:</strong> <code className="text-blue-400">event.which</code> e <code className="text-blue-400">event.keyCode</code> estão obsoletos em favor de <code className="text-blue-400">event.key</code> e <code className="text-blue-400">event.code</code>, mas ainda são amplamente utilizados em aplicações legadas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoCard: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    <div className="text-2xl font-bold text-white font-mono">{value}</div>
  </div>
);

const ModifierBadge: React.FC<{ active: boolean, label: string }> = ({ active, label }) => (
  <div className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
    active ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-600'
  }`}>
    {label}
  </div>
);

export default KeycodeInfo;
