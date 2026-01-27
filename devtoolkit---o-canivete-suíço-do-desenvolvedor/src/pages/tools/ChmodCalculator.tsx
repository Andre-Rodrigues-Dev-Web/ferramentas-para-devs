
import React, { useState } from 'react';
import { HardDrive, Info } from 'lucide-react';

const ChmodCalculator: React.FC = () => {
  const [permissions, setPermissions] = useState({
    owner: { read: true, write: true, execute: false },
    group: { read: true, write: false, execute: false },
    public: { read: true, write: false, execute: false },
  });

  const toggle = (type: keyof typeof permissions, perm: keyof typeof permissions['owner']) => {
    setPermissions(prev => ({
      ...prev,
      [type]: { ...prev[type], [perm]: !prev[type][perm] }
    }));
  };

  const calculateNumeric = () => {
    const calc = (p: typeof permissions['owner']) => 
      (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
    return `${calc(permissions.owner)}${calc(permissions.group)}${calc(permissions.public)}`;
  };

  const calculateSymbolic = () => {
    const calc = (p: typeof permissions['owner']) => 
      `${p.read ? 'r' : '-'}${p.write ? 'w' : '-'}${p.execute ? 'x' : '-'}`;
    return `-${calc(permissions.owner)}${calc(permissions.group)}${calc(permissions.public)}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
          <HardDrive size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Chmod Calculator</h1>
          <p className="text-slate-400">Calculadora visual para permissões de arquivos Linux e Unix.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8">
           {(['owner', 'group', 'public'] as const).map(role => (
             <div key={role} className="space-y-4">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{role === 'owner' ? 'Dono (Owner)' : role === 'group' ? 'Grupo (Group)' : 'Público (Public)'}</h3>
               <div className="flex gap-4">
                 {(['read', 'write', 'execute'] as const).map(p => (
                   <button 
                     key={p} 
                     onClick={() => toggle(role, p)}
                     className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all ${permissions[role][p] ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'}`}
                   >
                     {p.charAt(0).toUpperCase() + p.slice(1)}
                   </button>
                 ))}
               </div>
             </div>
           ))}
        </div>

        <div className="space-y-6">
          <div className="bg-blue-600 p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center">
            <span className="text-7xl font-black text-white leading-none">{calculateNumeric()}</span>
            <span className="text-blue-100 font-bold uppercase tracking-widest mt-4 text-sm opacity-80">Permissão Numérica</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center">
             <code className="text-2xl font-mono text-blue-400 font-bold">{calculateSymbolic()}</code>
             <p className="text-xs text-slate-500 mt-2 uppercase font-bold tracking-tighter">Notação Simbólica</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex gap-3 text-slate-500 text-xs leading-relaxed">
             <Info size={16} className="text-blue-500 flex-shrink-0" />
             <p>Use o comando <code className="text-blue-400">chmod {calculateNumeric()} [arquivo]</code> no terminal para aplicar estas permissões.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChmodCalculator;
