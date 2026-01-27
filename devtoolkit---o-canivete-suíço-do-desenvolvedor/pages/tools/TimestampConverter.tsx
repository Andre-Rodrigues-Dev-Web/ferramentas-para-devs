
import React, { useState, useEffect } from 'react';
import { History, Clock, Calendar, RefreshCw, Copy, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const TimestampConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState<string>('');
  const [isoStr, setIsoStr] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    handleTimestampChange(timestamp);
  }, []);

  const handleTimestampChange = (val: string) => {
    setTimestamp(val);
    if (!val) {
      setDateStr('');
      setIsoStr('');
      return;
    }
    
    try {
      let num = parseInt(val);
      // Determine if ms or s
      if (val.length >= 13) {
        // Assume ms
      } else {
        num = num * 1000;
      }
      
      const date = new Date(num);
      if (isNaN(date.getTime())) throw new Error();
      
      setDateStr(date.toLocaleString());
      setIsoStr(date.toISOString());
    } catch {
      setDateStr('Data Inválida');
      setIsoStr('Data Inválida');
    }
  };

  const setNow = () => {
    handleTimestampChange(Math.floor(Date.now() / 1000).toString());
  };

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
          <History size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Unix Timestamp Converter</h1>
          <p className="text-slate-400">Converta timestamps do Unix em datas legíveis e vice-versa.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Unix Timestamp</label>
            <button onClick={setNow} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold">
              <RefreshCw size={12} /> USAR AGORA
            </button>
          </div>
          <div className="flex gap-3">
             <Input 
               value={timestamp} 
               onChange={(e) => handleTimestampChange(e.target.value)} 
               placeholder="Ex: 1715856000" 
               className="flex-1 text-2xl font-bold py-6 code-font"
             />
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase">Suporta Segundos (10 dígitos) e Milissegundos (13 dígitos)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2 relative group">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Calendar size={12} /> Local Time
              </span>
              <div className="text-xl font-bold text-blue-400 truncate pr-8">{dateStr}</div>
              <button onClick={() => copy(dateStr)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 transition-all text-slate-500 hover:text-blue-400">
                <Copy size={18} />
              </button>
           </div>

           <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2 relative group">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Clock size={12} /> ISO 8601
              </span>
              <div className="text-xl font-bold text-blue-400 truncate pr-8">{isoStr}</div>
              <button onClick={() => copy(isoStr)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 transition-all text-slate-500 hover:text-blue-400">
                <Copy size={18} />
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
         <div className="text-center p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Minuto</p>
            <p className="text-lg font-bold text-white">60 s</p>
         </div>
         <div className="text-center p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Hora</p>
            <p className="text-lg font-bold text-white">3,600 s</p>
         </div>
         <div className="text-center p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Dia</p>
            <p className="text-lg font-bold text-white">86,400 s</p>
         </div>
      </div>
    </div>
  );
};

export default TimestampConverter;
