
import React, { useState, useMemo } from 'react';
import { Table, Plus, Trash2, Download, Copy, Check, RefreshCw, FileJson, FileText, ChevronDown, ListPlus } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

type DataType = 'id' | 'name' | 'email' | 'job' | 'city' | 'date' | 'boolean' | 'number';

interface Field {
  id: string;
  name: string;
  type: DataType;
}

const FIELD_TYPES: { value: DataType, label: string }[] = [
  { value: 'id', label: 'ID (UUID)' },
  { value: 'name', label: 'Nome Completo' },
  { value: 'email', label: 'Email' },
  { value: 'job', label: 'Cargo' },
  { value: 'city', label: 'Cidade' },
  { value: 'date', label: 'Data' },
  { value: 'boolean', label: 'Booleano' },
  { value: 'number', label: 'Número' },
];

const SAMPLE_NAMES = ['Ana Silva', 'Bruno Costa', 'Carla Souza', 'Daniel Oliveira', 'Elisa Santos', 'Fábio Lima', 'Gabriela Rocha', 'Hugo Pereira', 'Iara Martins', 'João Alves'];
const SAMPLE_JOBS = ['Engenheiro de Software', 'Designer UI/UX', 'Gerente de Projetos', 'Analista de Dados', 'DevOps Engineer', 'Product Owner', 'Especialista QA', 'Tech Lead'];
const SAMPLE_CITIES = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Salvador', 'Fortaleza', 'Recife', 'Manaus', 'Brasília'];
const SAMPLE_DOMAINS = ['example.com', 'test.io', 'company.net', 'mail.org'];

const MockDataGenerator: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([
    { id: '1', name: 'id', type: 'id' },
    { id: '2', name: 'user_name', type: 'name' },
    { id: '3', name: 'email', type: 'email' },
  ]);
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [generatedData, setGeneratedData] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  const generateUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

  const generateRecord = (fieldsList: Field[]) => {
    const record: any = {};
    fieldsList.forEach(f => {
      switch (f.type) {
        case 'id': record[f.name] = generateUUID(); break;
        case 'name': record[f.name] = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)]; break;
        case 'email': 
          const name = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)].toLowerCase().replace(' ', '.');
          const domain = SAMPLE_DOMAINS[Math.floor(Math.random() * SAMPLE_DOMAINS.length)];
          record[f.name] = `${name}${Math.floor(Math.random() * 100)}@${domain}`;
          break;
        case 'job': record[f.name] = SAMPLE_JOBS[Math.floor(Math.random() * SAMPLE_JOBS.length)]; break;
        case 'city': record[f.name] = SAMPLE_CITIES[Math.floor(Math.random() * SAMPLE_CITIES.length)]; break;
        case 'date': record[f.name] = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]; break;
        case 'boolean': record[f.name] = Math.random() > 0.5; break;
        case 'number': record[f.name] = Math.floor(Math.random() * 1000); break;
      }
    });
    return record;
  };

  const handleGenerate = () => {
    const data = Array.from({ length: count }, () => generateRecord(fields));
    setGeneratedData(data);
  };

  const addField = () => {
    setFields([...fields, { id: Math.random().toString(36).substr(2, 9), name: `field_${fields.length + 1}`, type: 'number' }]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const outputString = useMemo(() => {
    if (generatedData.length === 0) return '';
    if (format === 'json') return JSON.stringify(generatedData, null, 2);
    
    // CSV logic
    const headers = fields.map(f => f.name).join(',');
    const rows = generatedData.map(row => fields.map(f => row[f.name]).join(',')).join('\n');
    return `${headers}\n${rows}`;
  }, [generatedData, format, fields]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([outputString], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mock-data.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-600/10 text-teal-500 rounded-2xl">
            <Table size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Mock Data Generator</h1>
            <p className="text-slate-400">Gere coleções de dados realistas para testar seu front-end ou APIs.</p>
          </div>
        </div>
        <div className="flex gap-2">
           <Button onClick={handleGenerate} className="bg-teal-600 hover:bg-teal-700 shadow-teal-500/20 px-8 rounded-2xl">
             <RefreshCw size={18} className="mr-2" /> Gerar Dados
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Schema Configuration */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <ListPlus size={14} /> Definição do Schema
               </h3>
               <button onClick={addField} className="text-[10px] font-bold text-teal-500 hover:text-teal-400 transition-colors uppercase">
                 + Add Campo
               </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
               {fields.map((field) => (
                 <div key={field.id} className="flex gap-3 items-center group bg-slate-950 p-3 rounded-2xl border border-slate-800 hover:border-teal-500/30 transition-all">
                    <input 
                      type="text" 
                      value={field.name}
                      onChange={(e) => updateField(field.id, { name: e.target.value })}
                      placeholder="Nome do Campo"
                      className="w-1/2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500 transition-all"
                    />
                    <select 
                      value={field.type}
                      onChange={(e) => updateField(field.id, { type: e.target.value as DataType })}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500 transition-all cursor-pointer"
                    >
                      {FIELD_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => removeField(field.id)}
                      disabled={fields.length <= 1}
                      className="p-1.5 text-slate-700 hover:text-red-400 transition-all disabled:opacity-0"
                    >
                       <Trash2 size={16} />
                    </button>
                 </div>
               ))}
            </div>

            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Qtd de Registros</label>
                  <input 
                    type="number" 
                    min="1" max="100" 
                    value={count} 
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-teal-500" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Formato</label>
                  <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 h-9">
                     {(['json', 'csv'] as const).map(f => (
                       <button 
                        key={f} 
                        onClick={() => setFormat(f)}
                        className={`flex-1 rounded-lg text-[10px] font-bold uppercase transition-all ${format === f ? 'bg-teal-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                       >
                         {f}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Data Preview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl h-[600px]">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-600/10 rounded-xl text-teal-500">
                    {format === 'json' ? <FileJson size={20} /> : <FileText size={20} />}
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Visualização</h3>
               </div>
               
               <div className="flex gap-3">
                  <button 
                    disabled={generatedData.length === 0}
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white transition-colors disabled:opacity-30"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                  <button 
                    disabled={generatedData.length === 0}
                    onClick={downloadFile}
                    className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white transition-colors disabled:opacity-30"
                  >
                    <Download size={14} /> BAIXAR
                  </button>
               </div>
            </div>

            <div className="flex-1 p-6 bg-slate-950 overflow-auto custom-scrollbar">
               {generatedData.length > 0 ? (
                 <pre className="text-teal-400 code-font text-xs leading-relaxed">
                    {outputString}
                 </pre>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                    <Table size={48} className="text-slate-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Nenhum dado gerado</p>
                      <p className="text-xs">Configure os campos e clique em "Gerar Dados".</p>
                    </div>
                 </div>
               )}
            </div>
            
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
               <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Mock v1.0.2 • Gerado localmente</span>
               <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockDataGenerator;
