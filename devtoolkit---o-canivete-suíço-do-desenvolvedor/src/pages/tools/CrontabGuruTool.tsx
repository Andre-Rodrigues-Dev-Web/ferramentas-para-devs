
import React, { useState, useMemo, useEffect } from 'react';
import { Clock, Info, HelpCircle, ChevronRight, Zap, List, Calendar, Star, RefreshCw } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

const PRESETS = [
  { label: 'A cada minuto', value: '* * * * *' },
  { label: 'A cada 5 minutos', value: '*/5 * * * *' },
  { label: 'A cada hora', value: '0 * * * *' },
  { label: 'Todo dia à meia-noite', value: '0 0 * * *' },
  { label: 'Toda segunda-feira à meia-noite', value: '0 0 * * 1' },
  { label: 'No primeiro dia de cada mês', value: '0 0 1 * *' },
  { label: 'Todos os domingos às 04:30', value: '30 4 * * 0' },
  { label: 'A cada hora comercial (Mon-Fri)', value: '0 9-17 * * 1-5' },
];

const CrontabGuruTool: React.FC = () => {
  const [expression, setExpression] = useState('*/15 * * * *');
  const [parts, setParts] = useState(['*/15', '*', '*', '*', '*']);
  const [activePart, setActivePart] = useState<number | null>(null);

  const handleInputChange = (val: string) => {
    setExpression(val);
    const split = val.trim().split(/\s+/);
    if (split.length <= 5) {
      setParts([...split, ...Array(5 - split.length).fill('')].slice(0, 5));
    }
  };

  const handlePartChange = (index: number, val: string) => {
    const newParts = [...parts];
    newParts[index] = val;
    setParts(newParts);
    setExpression(newParts.join(' '));
  };

  const explanation = useMemo(() => {
    try {
      const [m, h, dom, mon, dow] = parts;
      
      const explainPart = (val: string, type: string) => {
        if (val === '*') return `cada ${type}`;
        if (val.includes('*/')) return `a cada ${val.split('/')[1]} ${type}s`;
        if (val.includes('-')) return `de ${val.split('-')[0]} a ${val.split('-')[1]} (${type})`;
        if (val.includes(',')) return `nos ${type}s ${val.split(',').join(' e ')}`;
        return `no ${type} ${val}`;
      };

      // Simple pseudo-parser for human explanation
      let text = "“A tarefa será executada ";
      
      if (m === '*' && h === '*' && dom === '*' && mon === '*' && dow === '*') {
        return "“A tarefa será executada a cada minuto de cada dia.”";
      }

      const minuteText = m === '*' ? 'cada minuto' : `no minuto ${m}`;
      const hourText = h === '*' ? 'de cada hora' : `na hora ${h}`;
      const dayOfMonthText = dom === '*' ? '' : ` no dia do mês ${dom}`;
      const monthText = mon === '*' ? '' : ` em ${getMonthName(mon)}`;
      const dayOfWeekText = dow === '*' ? '' : ` nas ${getWeekdayName(dow)}`;

      text += `${minuteText} ${hourText}${dayOfMonthText}${monthText}${dayOfWeekText}.”`;
      
      return text;
    } catch (e) {
      return "Expressão inválida ou não suportada para tradução simples.";
    }
  }, [parts]);

  function getMonthName(m: string) {
    const months = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return months[parseInt(m)] || `mês ${m}`;
  }

  function getWeekdayName(d: string) {
    const days = ['Domingos', 'Segundas', 'Terças', 'Quartas', 'Quintas', 'Sextas', 'Sábados'];
    return days[parseInt(d)] || `dia da semana ${d}`;
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-600/10 text-amber-500 rounded-2xl">
            <Clock size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Crontab Guru</h1>
            <p className="text-slate-400">Editor visual e explicador de expressões cron para agendamento de tarefas.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Main Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl space-y-10">
             {/* Expression Inputs */}
             <div className="flex flex-col items-center space-y-6">
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 w-full">
                   <CronInputPart label="Minuto" value={parts[0]} index={0} active={activePart === 0} onFocus={() => setActivePart(0)} onChange={(v) => handlePartChange(0, v)} />
                   <CronInputPart label="Hora" value={parts[1]} index={1} active={activePart === 1} onFocus={() => setActivePart(1)} onChange={(v) => handlePartChange(1, v)} />
                   <CronInputPart label="Dia (Mês)" value={parts[2]} index={2} active={activePart === 2} onFocus={() => setActivePart(2)} onChange={(v) => handlePartChange(2, v)} />
                   <CronInputPart label="Mês" value={parts[3]} index={3} active={activePart === 3} onFocus={() => setActivePart(3)} onChange={(v) => handlePartChange(3, v)} />
                   <CronInputPart label="Dia (Semana)" value={parts[4]} index={4} active={activePart === 4} onFocus={() => setActivePart(4)} onChange={(v) => handlePartChange(4, v)} />
                </div>

                <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl p-1 flex items-center shadow-inner group focus-within:border-amber-500/50 transition-all">
                   <div className="px-4 text-slate-600 font-mono text-xs">cron</div>
                   <input 
                    type="text" 
                    value={expression} 
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-amber-400 font-mono text-xl py-3 placeholder:text-slate-800"
                    placeholder="* * * * *"
                   />
                   <button onClick={() => setExpression('* * * * *')} className="p-3 text-slate-700 hover:text-slate-400 transition-colors">
                     <RefreshCw size={18} />
                   </button>
                </div>
             </div>

             {/* Human Explanation */}
             <div className="bg-amber-600/5 border border-amber-600/20 rounded-3xl p-8 text-center space-y-4">
                <p className="text-2xl font-medium text-amber-100 leading-relaxed italic">
                  {explanation}
                </p>
                <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-600/60">
                   <Zap size={14} /> Tradução em tempo real
                </div>
             </div>

             {/* Documentation/Reference */}
             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-slate-800">
                <RefPart label="Minutos" range="0-59" />
                <RefPart label="Horas" range="0-23" />
                <RefPart label="Dia do Mês" range="1-31" />
                <RefPart label="Mês" range="1-12" />
                <RefPart label="Dia da Semana" range="0-6 (Dom-Sab)" />
             </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-start gap-4">
             <div className="p-3 bg-blue-600/10 text-blue-500 rounded-xl flex-shrink-0">
               <Info size={20} />
             </div>
             <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Como funciona?</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  As expressões cron seguem o padrão Unix. Os caracteres especiais permitidos incluem: <code className="text-amber-500">*</code> (qualquer), <code className="text-amber-500">,</code> (lista), <code className="text-amber-500">-</code> (intervalo) e <code className="text-amber-500">/</code> (incremento).
                </p>
             </div>
          </div>
        </div>

        {/* Presets Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-xl h-full flex flex-col">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 px-2">
                <Star size={14} className="text-amber-500" /> Expressões Comuns
              </h3>
              <div className="space-y-2 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                 {PRESETS.map((p) => (
                   <button 
                    key={p.value}
                    onClick={() => handleInputChange(p.value)}
                    className="w-full text-left p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:border-amber-500/50 hover:bg-slate-900 transition-all group"
                   >
                      <p className="text-xs font-bold text-slate-300 mb-2 group-hover:text-amber-400 transition-colors">{p.label}</p>
                      <div className="flex items-center justify-between">
                         <code className="text-[10px] font-mono text-slate-600 bg-slate-900 px-2 py-1 rounded group-hover:text-slate-400 transition-colors">{p.value}</code>
                         <ChevronRight size={14} className="text-slate-800 group-hover:text-amber-500 transition-all transform group-hover:translate-x-1" />
                      </div>
                   </button>
                 ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-800">
                 <Button variant="outline" className="w-full text-xs" onClick={() => window.open('https://crontab.guru', '_blank')}>
                   <HelpCircle size={14} className="mr-2" /> Documentação Completa
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const CronInputPart = ({ label, value, active, onFocus, onChange }: { label: string, value: string, active: boolean, index: number, onFocus: () => void, onChange: (v: string) => void }) => (
  <div className="flex flex-col items-center gap-2">
     <label className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${active ? 'text-amber-500' : 'text-slate-600'}`}>{label}</label>
     <input 
      type="text" 
      value={value}
      onFocus={onFocus}
      onChange={(e) => onChange(e.target.value)}
      className={`w-12 md:w-16 h-12 md:h-16 text-center text-lg font-black rounded-2xl border-2 transition-all focus:outline-none ${active ? 'bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-600/20 scale-110' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
     />
  </div>
);

const RefPart = ({ label, range }: { label: string, range: string }) => (
  <div className="text-center md:text-left">
    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
    <div className="text-xs font-mono text-slate-300 mt-0.5">{range}</div>
  </div>
);

export default CrontabGuruTool;
