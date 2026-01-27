
import React, { useState } from 'react';
import { Globe, Send, Plus, Trash2, Clock, ShieldCheck, FileJson, Loader2, AlertCircle, Check, Copy, ChevronRight, History } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { Textarea } from '../../shared/ui/Input';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface Header {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

interface RequestHistory {
  id: string;
  method: HttpMethod;
  url: string;
  status: number;
  time: number;
  timestamp: number;
}

const HoppscotchTool: React.FC = () => {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [headers, setHeaders] = useState<Header[]>([
    { id: '1', key: 'Content-Type', value: 'application/json', enabled: true }
  ]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'headers' | 'body'>('headers');
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const [copied, setCopied] = useState(false);

  const addHeader = () => {
    setHeaders([...headers, { id: Math.random().toString(36).substr(2, 9), key: '', value: '', enabled: true }]);
  };

  const removeHeader = (id: string) => {
    setHeaders(headers.filter(h => h.id !== id));
  };

  const updateHeader = (id: string, updates: Partial<Header>) => {
    setHeaders(headers.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const sendRequest = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setResponse(null);
    setStatus(null);
    setTime(null);

    const startTime = performance.now();
    
    try {
      const headerObj: Record<string, string> = {};
      headers.filter(h => h.enabled && h.key).forEach(h => {
        headerObj[h.key] = h.value;
      });

      const options: RequestInit = {
        method,
        headers: headerObj,
        body: (method !== 'GET' && body) ? body : undefined
      };

      const res = await fetch(url, options);
      const data = await res.json();
      
      const endTime = performance.now();
      
      setResponse(data);
      setStatus(res.status);
      setTime(Math.round(endTime - startTime));

      const newHistory: RequestHistory = {
        id: Math.random().toString(36).substr(2, 9),
        method,
        url,
        status: res.status,
        time: Math.round(endTime - startTime),
        timestamp: Date.now()
      };
      setHistory(prev => [newHistory, ...prev].slice(0, 10));
    } catch (err: any) {
      const isTypeError = err instanceof TypeError;
      const errorMsg = isTypeError 
        ? 'Falha na Requisição (CORS ou Network Error). O navegador bloqueou a chamada porque o servidor não permite requisições de origem cruzada ou a URL é inválida.' 
        : (err.message || 'Erro desconhecido ao realizar a requisição.');
      
      setResponse({ 
        error: errorMsg,
        tip: 'Muitas APIs públicas possuem restrições de CORS que impedem chamadas diretas pelo navegador. Tente uma URL que suporte CORS como JSONPlaceholder.' 
      });
      setStatus(0);
      setTime(Math.round(performance.now() - startTime));
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-600/10 text-emerald-500 rounded-2xl">
            <Globe size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">REST API Tester</h1>
            <p className="text-slate-400">Teste endpoints, envie headers e visualize respostas JSON instantaneamente.</p>
          </div>
        </div>
        <div className="flex gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
           CORS-Aware UI
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Request Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 space-y-6 shadow-xl">
            {/* Method & URL Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                value={method}
                onChange={(e) => setMethod(e.target.value as HttpMethod)}
                className="bg-slate-800 border-2 border-slate-700 rounded-2xl px-4 py-3 text-sm font-bold text-emerald-400 focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer text-center"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
              <div className="flex-1 relative group">
                 <input 
                  type="text"
                  placeholder="https://api.exemplo.com/v1/resource"
                  className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl pl-4 pr-12 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-700"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                 />
              </div>
              <Button onClick={sendRequest} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 sm:px-8 rounded-2xl">
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                <span className="ml-2 hidden sm:inline">Enviar</span>
              </Button>
            </div>

            {/* Request Tabs */}
            <div className="space-y-4">
               <div className="flex border-b border-slate-800">
                  <button 
                    onClick={() => setActiveTab('headers')}
                    className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'headers' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Headers
                    {activeTab === 'headers' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"></div>}
                  </button>
                  <button 
                    onClick={() => setActiveTab('body')}
                    className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'body' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Body
                    {activeTab === 'body' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"></div>}
                  </button>
               </div>

               <div className="min-h-[250px]">
                  {activeTab === 'headers' ? (
                    <div className="space-y-3">
                       <div className="flex items-center justify-between px-2">
                          <span className="text-[10px] font-bold text-slate-600 uppercase">Chave / Valor</span>
                          <button onClick={addHeader} className="text-[10px] font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1">
                             <Plus size={12} /> ADD HEADER
                          </button>
                       </div>
                       <div className="space-y-2">
                          {headers.map((header) => (
                            <div key={header.id} className="flex gap-2 items-center group">
                               <input 
                                type="checkbox"
                                checked={header.enabled}
                                onChange={(e) => updateHeader(header.id, { enabled: e.target.checked })}
                                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-600 focus:ring-emerald-500"
                               />
                               <input 
                                type="text"
                                placeholder="Key"
                                value={header.key}
                                onChange={(e) => updateHeader(header.id, { key: e.target.value })}
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                               />
                               <input 
                                type="text"
                                placeholder="Value"
                                value={header.value}
                                onChange={(e) => updateHeader(header.id, { value: e.target.value })}
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                               />
                               <button 
                                onClick={() => removeHeader(header.id)}
                                className="p-1.5 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                               >
                                  <Trash2 size={14} />
                               </button>
                            </div>
                          ))}
                       </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                       <div className="flex items-center justify-between px-2">
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">JSON Body</span>
                          <span className="text-[10px] font-bold text-slate-500">application/json</span>
                       </div>
                       <Textarea 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='{ "key": "value" }'
                        className="h-[200px] bg-slate-950 border-slate-800 focus:border-emerald-500/50"
                       />
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Response Area */}
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 space-y-4 shadow-xl min-h-[400px]">
             <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Response</h3>
                {status !== null && (
                  <div className="flex gap-4">
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-600 uppercase">Status:</span>
                        <span className={`text-xs font-black ${status >= 200 && status < 300 ? 'text-green-500' : 'text-red-500'}`}>{status} {status === 200 ? 'OK' : status === 0 ? 'FAIL' : ''}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-600 uppercase">Tempo:</span>
                        <span className="text-xs font-black text-emerald-400">{time}ms</span>
                     </div>
                     <button onClick={copyResponse} className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors">
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        {copied ? 'Copiado' : 'Copiar'}
                     </button>
                  </div>
                )}
             </div>

             <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 h-[400px] overflow-auto custom-scrollbar group">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                     <Loader2 size={40} className="text-emerald-500 animate-spin" />
                     <p className="text-slate-500 text-sm font-medium">Aguardando resposta do servidor...</p>
                  </div>
                ) : response ? (
                  <pre className={`text-xs leading-relaxed code-font whitespace-pre-wrap ${status === 0 ? 'text-red-400' : 'text-blue-400'}`}>
                     {JSON.stringify(response, null, 2)}
                  </pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                     <FileJson size={48} className="text-slate-800 opacity-20" />
                     <p className="text-slate-600 text-sm italic">O resultado da requisição aparecerá aqui.</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Sidebar: History */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-full">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 px-2">
                <History size={14} /> Histórico Recente
              </h3>
              <div className="space-y-3">
                 {history.map((item) => (
                   <button 
                    key={item.id}
                    onClick={() => { setUrl(item.url); setMethod(item.method); }}
                    className="w-full text-left p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-900 transition-all group"
                   >
                      <div className="flex items-center justify-between mb-2">
                         <span className={`text-[10px] font-black ${item.method === 'GET' ? 'text-emerald-500' : item.method === 'POST' ? 'text-blue-500' : 'text-purple-500'}`}>{item.method}</span>
                         <span className="text-[10px] font-bold text-slate-600">{new Date(item.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-300 truncate mb-2">{item.url}</p>
                      <div className="flex items-center justify-between">
                         <span className={`text-[10px] font-bold ${item.status >= 200 && item.status < 300 ? 'text-green-600' : 'text-red-500'}`}>{item.status}</span>
                         <span className="text-[10px] font-bold text-slate-600">{item.time}ms</span>
                      </div>
                   </button>
                 ))}
                 {history.length === 0 && (
                   <div className="py-20 text-center border border-dashed border-slate-800 rounded-2xl">
                      <p className="text-xs text-slate-600">Nenhuma requisição realizada ainda.</p>
                   </div>
                 )}
              </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <ShieldCheck size={14} className="text-emerald-500" /> Segurança & CORS
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Este cliente utiliza a API nativa do navegador. Requisições para domínios que não enviam o header <code className="text-emerald-400">Access-Control-Allow-Origin</code> serão bloqueadas pelo navegador por segurança.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HoppscotchTool;
