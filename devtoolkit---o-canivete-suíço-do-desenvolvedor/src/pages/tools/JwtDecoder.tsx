
import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, AlertCircle, Clock } from 'lucide-react';
import { Textarea } from '../../shared/ui/Input';

const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState<{header: any, payload: any} | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = (val: string) => {
    setToken(val);
    setError(null);
    if (!val.trim()) {
      setDecoded(null);
      return;
    }

    try {
      const parts = val.split('.');
      if (parts.length !== 3) throw new Error('Token JWT deve ter 3 partes separadas por pontos.');

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      setDecoded({ header, payload });
    } catch (e: any) {
      setError('Token inválido: Verifique se o formato está correto.');
      setDecoded(null);
    }
  };

  const isExpired = (exp?: number) => {
    if (!exp) return false;
    return Date.now() >= exp * 1000;
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
          <ShieldCheck size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">JWT Decoder</h1>
          <p className="text-slate-400">Decodifique tokens JWT instantaneamente para visualizar o Header e Payload.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Encoded Token</label>
          <Textarea 
            value={token} 
            onChange={(e) => handleDecode(e.target.value)} 
            placeholder="Cole seu JWT aqui (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)" 
            className="h-[500px] border-slate-800"
          />
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400">
               <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
               <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {decoded ? (
            <>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Header</h3>
                <pre className="bg-slate-950 p-4 rounded-lg text-blue-300 text-sm overflow-x-auto">
                  {JSON.stringify(decoded.header, null, 2)}
                </pre>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-purple-500 uppercase tracking-widest">Payload</h3>
                  {decoded.payload.exp && (
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full border ${isExpired(decoded.payload.exp) ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                      <Clock size={12} />
                      {isExpired(decoded.payload.exp) ? 'EXPIRADO' : 'ATIVO'}
                    </div>
                  )}
                </div>
                <pre className="bg-slate-950 p-4 rounded-lg text-purple-300 text-sm overflow-x-auto">
                  {JSON.stringify(decoded.payload, null, 2)}
                </pre>
              </div>
            </>
          ) : (
            <div className="h-full border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-12 text-slate-600 space-y-4">
              <ShieldCheck size={48} className="opacity-20" />
              <p className="text-sm italic">Aguardando entrada válida...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JwtDecoder;
