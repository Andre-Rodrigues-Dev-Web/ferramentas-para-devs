
import React, { useState, useEffect } from 'react';
import { Server, Globe, Info, Copy, Check, Shield, RefreshCw, Monitor, Smartphone, Layout, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country_name?: string;
  org?: string;
  timezone?: string;
  postal?: string;
}

const MyIpTool: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [ipData, setIpData] = useState<IpInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIp = async () => {
    setLoading(true);
    setError(null);
    try {
      // Primary: ipapi.co (rich data)
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('Erro na API principal');
      const data = await response.json();
      setIpData(data);
    } catch (err: any) {
      console.warn('IPAPI failed, trying fallback...', err);
      try {
        // Fallback: ipify (just IP)
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error('Erro no fallback');
        const data = await response.json();
        setIpData({ 
          ip: data.ip,
          city: 'Não disponível',
          region: 'Não disponível',
          country_name: 'Identificado via Fallback'
        });
        setError('Algumas informações detalhadas (cidade/org) foram bloqueadas pelo seu navegador ou rede, mas identificamos seu IP.');
      } catch (fallbackErr) {
        setError('Não foi possível obter seu endereço IP. Isso geralmente ocorre devido a bloqueadores de anúncios (AdBlock), VPNs restritivas ou falta de conexão com a internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIp();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    let tem;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  };

  const browserDetails = {
    browser: getBrowserInfo(),
    os: navigator.platform,
    language: navigator.language,
    resolution: `${window.screen.width}x${window.screen.height}`,
    userAgent: navigator.userAgent
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
            <Server size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Meu Endereço IP</h1>
            <p className="text-slate-400">Verifique seu endereço IP público e detalhes da sua conexão atual.</p>
          </div>
        </div>
        <Button variant="outline" onClick={fetchIp} disabled={loading}>
          <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} /> Atualizar
        </Button>
      </div>

      {error && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 text-amber-200 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <AlertCircle size={24} className="flex-shrink-0 text-amber-500" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main IP Display */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[300px]">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/5 blur-[80px] -z-10 rounded-full"></div>

            {loading ? (
              <div className="space-y-4">
                <RefreshCw size={48} className="animate-spin text-blue-500 mx-auto" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Identificando conexão...</p>
              </div>
            ) : ipData ? (
              <div className="space-y-6 animate-in zoom-in-95 duration-300 w-full">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Seu IP Público</span>
                  <div className="flex items-center justify-center gap-4">
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter code-font">
                      {ipData.ip}
                    </h2>
                    <button 
                      onClick={() => copyToClipboard(ipData.ip)}
                      className="p-3 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-2xl transition-all shadow-xl"
                    >
                      {copied ? <Check size={24} /> : <Copy size={24} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                   <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-full flex items-center gap-2">
                      <Globe size={14} className="text-blue-500" />
                      <span className="text-xs font-bold text-slate-400">{ipData.country_name || 'Desconhecido'}</span>
                   </div>
                   <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-full flex items-center gap-2">
                      <Shield size={14} className="text-green-500" />
                      <span className="text-xs font-bold text-slate-400">{ipData.org || 'ISP Não identificado'}</span>
                   </div>
                </div>
              </div>
            ) : (
              <div className="text-slate-600 flex flex-col items-center gap-2">
                 <AlertCircle size={40} className="opacity-20" />
                 <p className="text-sm italic">Dados não disponíveis.</p>
              </div>
            )}
          </div>

          {/* Browser & System Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <Monitor size={16} className="text-blue-500" /> Detalhes do Navegador
                </h3>
                <div className="space-y-4">
                   <DetailRow label="Navegador" value={browserDetails.browser} />
                   <DetailRow label="Idioma" value={browserDetails.language} />
                   <DetailRow label="Resolução" value={browserDetails.resolution} />
                </div>
             </div>
             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <Smartphone size={16} className="text-purple-500" /> Sistema Operacional
                </h3>
                <div className="space-y-4">
                   <DetailRow label="Plataforma" value={browserDetails.os} />
                   <DetailRow label="Agente" value={browserDetails.userAgent} isTruncated />
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar: Location Info */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-xl space-y-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 border-b border-slate-800 pb-4">
                 <Layout size={16} className="text-blue-500" /> Localização Aproximada
              </h3>

              {loading ? (
                <div className="space-y-4 py-10">
                   <div className="h-4 bg-slate-800 rounded-full w-full animate-pulse"></div>
                   <div className="h-4 bg-slate-800 rounded-full w-3/4 animate-pulse"></div>
                   <div className="h-4 bg-slate-800 rounded-full w-5/6 animate-pulse"></div>
                </div>
              ) : ipData && ipData.city !== 'Não disponível' ? (
                <div className="space-y-6">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-600 uppercase">Cidade / Região</p>
                      <p className="text-lg font-bold text-white">{ipData.city}, {ipData.region}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-600 uppercase">Fuso Horário</p>
                      <p className="text-lg font-bold text-white">{ipData.timezone}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-600 uppercase">Código Postal</p>
                      <p className="text-lg font-bold text-white">{ipData.postal || 'N/A'}</p>
                   </div>

                   <div className="pt-4">
                      <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden group">
                         <Globe size={48} className="text-slate-800 group-hover:text-blue-500/20 transition-colors" />
                         <div className="absolute inset-0 bg-blue-600/5 pointer-events-none"></div>
                         <p className="absolute bottom-3 text-[10px] font-bold text-slate-600 uppercase">Mapa Indisponível</p>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="text-center py-10 opacity-30 italic text-sm space-y-4">
                   <Globe size={40} className="mx-auto" />
                   <p>Geolocalização não disponível devido a restrições de rede ou privacidade.</p>
                </div>
              )}
           </div>

           <div className="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-6 flex gap-4">
              <div className="p-3 bg-blue-600/10 rounded-2xl h-fit">
                 <Shield size={20} className="text-blue-500" />
              </div>
              <div className="space-y-1">
                 <p className="text-sm font-bold text-slate-200">Privacidade</p>
                 <p className="text-xs text-slate-500 leading-relaxed">Este site não armazena seu endereço IP. Todas as consultas são processadas localmente no seu navegador via APIs de terceiros confiáveis.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, isTruncated }: { label: string, value: string, isTruncated?: boolean }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{label}</p>
    <p className={`text-sm font-bold text-slate-300 ${isTruncated ? 'truncate' : ''}`}>{value}</p>
  </div>
);

export default MyIpTool;
