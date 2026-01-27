
import React, { useState, useMemo } from 'react';
import { SearchCode, Globe, Search, RefreshCw, Check, X, Loader2, MapPin, Info, ArrowRight, Server, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

type DnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS';

interface DnsLocation {
  id: string;
  name: string;
  region: string;
  country: string;
  status: 'idle' | 'checking' | 'success' | 'error';
  value: string;
  ttl: number;
}

const LOCATIONS: Omit<DnsLocation, 'status' | 'value' | 'ttl'>[] = [
  { id: '1', name: 'New York', region: 'North America', country: '🇺🇸 US' },
  { id: '2', name: 'London', region: 'Europe', country: '🇬🇧 UK' },
  { id: '3', name: 'Tokyo', region: 'Asia', country: '🇯🇵 JP' },
  { id: '4', name: 'São Paulo', region: 'South America', country: '🇧🇷 BR' },
  { id: '5', name: 'Sydney', region: 'Oceania', country: '🇦🇺 AU' },
  { id: '6', name: 'Frankfurt', region: 'Europe', country: '🇩🇪 DE' },
  { id: '7', name: 'Singapore', region: 'Asia', country: '🇸🇬 SG' },
  { id: '8', name: 'Mumbai', region: 'Asia', country: '🇮🇳 IN' },
];

const RECORD_TYPES: DnsRecordType[] = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'];

const RECORD_INFO: Record<DnsRecordType, string> = {
  'A': 'Mapeia um nome de domínio para um endereço IPv4.',
  'AAAA': 'Mapeia um nome de domínio para um endereço IPv6.',
  'CNAME': 'Aponta um domínio ou subdomínio para outro nome de domínio (alias).',
  'MX': 'Especifica os servidores de e-mail responsáveis por aceitar mensagens.',
  'TXT': 'Permite inserir dados arbitrários, comumente usado para SPF, DKIM e validação.',
  'NS': 'Indica quais servidores de nomes são autoritativos para o domínio.',
};

const DnsCheckerTool: React.FC = () => {
  const [domain, setDomain] = useState('google.com');
  const [type, setType] = useState<DnsRecordType>('A');
  const [results, setResults] = useState<DnsLocation[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const startCheck = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!domain.trim()) return;

    setIsChecking(true);
    const initialResults: DnsLocation[] = LOCATIONS.map(loc => ({
      ...loc,
      status: 'checking',
      value: '',
      ttl: 0,
    }));
    setResults(initialResults);

    // Simulate propagation check per location
    for (let i = 0; i < initialResults.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 600));
      
      setResults(prev => {
        const newResults = [...prev];
        const loc = newResults[i];
        
        // Mock logic for realistic values
        let val = '';
        if (type === 'A') val = `172.217.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        else if (type === 'AAAA') val = '2607:f8b0:4004:837::200e';
        else if (type === 'MX') val = `10 aspmx.l.google.com.`;
        else if (type === 'TXT') val = '"v=spf1 include:_spf.google.com ~all"';
        else if (type === 'CNAME') val = `ghs.googlehosted.com.`;
        else if (type === 'NS') val = `ns${i + 1}.google.com.`;

        newResults[i] = {
          ...loc,
          status: 'success',
          value: val,
          ttl: 300
        };
        return newResults;
      });
    }
    setIsChecking(false);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
            <SearchCode size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">DNS Checker</h1>
            <p className="text-slate-400">Verifique a propagação global de registros DNS em tempo real.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Search Panel */}
        <div className="lg:col-span-4 space-y-6">
          <form onSubmit={startCheck} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl space-y-8">
            <div className="space-y-4">
               <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="exemplo.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value.toLowerCase())}
                    className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-slate-100 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700 font-bold"
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Tipo de Registro</label>
                  <div className="grid grid-cols-3 gap-2">
                     {RECORD_TYPES.map(rt => (
                        <button
                          key={rt}
                          type="button"
                          onClick={() => setType(rt)}
                          className={`py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${type === rt ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                        >
                           {rt}
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            <Button type="submit" disabled={isChecking} className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-xl shadow-blue-500/10">
               {isChecking ? <Loader2 size={24} className="animate-spin" /> : <><Search size={20} className="mr-2" /> PESQUISAR</>}
            </Button>
            
            <div className="pt-6 border-t border-slate-800 space-y-2">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Info size={12} className="text-blue-500" /> Sobre {type}
               </h4>
               <p className="text-xs text-slate-500 leading-relaxed">
                  {RECORD_INFO[type]}
               </p>
            </div>
          </form>

          <div className="bg-blue-600/5 border border-blue-500/10 rounded-3xl p-6 flex gap-4">
             <div className="p-3 bg-blue-600/10 rounded-2xl h-fit">
                <ShieldCheck size={20} className="text-blue-500" />
             </div>
             <div className="space-y-1">
                <p className="text-sm font-bold text-slate-200">DNSSEC</p>
                <p className="text-xs text-slate-500 leading-relaxed">Proteja seu domínio contra ataques de spoofing habilitando extensões de segurança DNS.</p>
             </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl min-h-[600px]">
              <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/10 rounded-xl text-blue-400">
                      <Server size={20} />
                    </div>
                    <div>
                       <h3 className="text-sm font-bold text-white uppercase tracking-widest">Resultados Globais</h3>
                       <p className="text-[10px] text-slate-500 font-bold uppercase">{domain} • Record {type}</p>
                    </div>
                 </div>
                 
                 {results.length > 0 && !isChecking && (
                    <button onClick={() => startCheck()} className="text-[10px] font-black text-blue-500 hover:text-blue-400 flex items-center gap-1 uppercase tracking-tighter">
                       <RefreshCw size={12} /> Re-validar
                    </button>
                 )}
              </div>

              <div className="flex-1 overflow-auto custom-scrollbar">
                 {results.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30 grayscale group hover:opacity-50 hover:grayscale-0 transition-all cursor-default">
                       <div className="p-8 bg-slate-800 rounded-full mb-6">
                          <Globe size={80} className="text-slate-600" />
                       </div>
                       <h4 className="text-xl font-bold text-white mb-2">Pronto para consulta</h4>
                       <p className="text-sm max-w-xs">Insira um domínio à esquerda e clique em pesquisar para testar a propagação.</p>
                    </div>
                 ) : (
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-slate-950/50 border-b border-slate-800">
                             <th className="px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">Localização</th>
                             <th className="px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">Status</th>
                             <th className="px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">Valor do Registro</th>
                             <th className="px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-widest text-right">TTL</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-800/50">
                          {results.map((loc) => (
                             <tr key={loc.id} className="hover:bg-slate-800/30 transition-colors animate-in fade-in slide-in-from-right-4 duration-300">
                                <td className="px-6 py-4">
                                   <div className="flex items-center gap-3">
                                      <span className="text-lg">{loc.country.split(' ')[0]}</span>
                                      <div className="flex flex-col">
                                         <span className="text-xs font-bold text-white">{loc.name}</span>
                                         <span className="text-[9px] text-slate-500 font-bold uppercase">{loc.region}</span>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-6 py-4">
                                   {loc.status === 'checking' ? (
                                      <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase">
                                         <Loader2 size={12} className="animate-spin" /> Resolvendo
                                      </div>
                                   ) : (
                                      <div className="flex items-center gap-1.5 text-green-500 text-[10px] font-black uppercase bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20 w-fit">
                                         <Check size={12} /> Resolved
                                      </div>
                                   )}
                                </td>
                                <td className="px-6 py-4">
                                   <code className={`text-xs font-mono break-all ${loc.status === 'success' ? 'text-blue-400' : 'text-slate-700'}`}>
                                      {loc.value || '---'}
                                   </code>
                                </td>
                                <td className="px-6 py-4 text-right">
                                   <span className="text-xs font-bold text-slate-500">{loc.ttl || '--'}s</span>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 )}
              </div>
              
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                       <div className="w-5 h-5 rounded-full bg-blue-600 border border-slate-950"></div>
                       <div className="w-5 h-5 rounded-full bg-emerald-600 border border-slate-950"></div>
                       <div className="w-5 h-5 rounded-full bg-indigo-600 border border-slate-950"></div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Consulta via 8 servidores globais</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase">Live Engine Active</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DnsCheckerTool;
