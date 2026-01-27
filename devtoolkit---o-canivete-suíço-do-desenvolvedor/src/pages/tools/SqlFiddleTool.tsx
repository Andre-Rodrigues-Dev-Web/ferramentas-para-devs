
import React, { useState, useMemo } from 'react';
import { Database, Play, Trash2, Table, FileCode, Check, Copy, AlertCircle, Info, RefreshCw, ChevronRight } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { Textarea } from '../../shared/ui/Input';

interface SqlResult {
  columns: string[];
  rows: any[][];
  message?: string;
  error?: string;
  type: 'success' | 'error' | 'info';
}

const DEFAULT_SCHEMA = `CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50)
);

INSERT INTO users VALUES (1, 'Alice Smith', 'alice@example.com');
INSERT INTO users VALUES (2, 'Bob Johnson', 'bob@example.com');
INSERT INTO users VALUES (3, 'Charlie Brown', 'charlie@example.com');`;

const DEFAULT_QUERY = `SELECT * FROM users WHERE id > 1;`;

const SqlFiddleTool: React.FC = () => {
  const [schema, setSchema] = useState(DEFAULT_SCHEMA);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [dialect, setDialect] = useState('MySQL 8.0');
  const [results, setResults] = useState<SqlResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'results' | 'schema-viewer'>('results');

  const runSql = () => {
    setResults(null);
    
    // Simple simulation of a SQL engine
    // Real SQL execution would happen on a server or via WebAssembly (sqlite)
    // Here we simulate the parsing for specific demonstration purposes
    try {
      const combinedSql = `${schema}\n${query}`;
      
      // Basic simulation logic:
      // 1. Extract table structure from CREATE TABLE
      // 2. Extract data from INSERT INTO
      // 3. Filter data from SELECT
      
      const tables: Record<string, { columns: string[], data: any[][] }> = {};
      
      const statements = combinedSql.split(';').map(s => s.trim()).filter(s => s);
      let lastQueryResult: SqlResult | null = null;

      statements.forEach(stmt => {
        const lowerStmt = stmt.toLowerCase();
        
        if (lowerStmt.startsWith('create table')) {
          const tableNameMatch = stmt.match(/create table (\w+)/i);
          const colMatches = stmt.match(/\(([\s\S]+)\)/);
          if (tableNameMatch && colMatches) {
            const tableName = tableNameMatch[1];
            const columns = colMatches[1].split(',').map(c => c.trim().split(' ')[0]);
            tables[tableName] = { columns, data: [] };
          }
        } 
        else if (lowerStmt.startsWith('insert into')) {
          const tableNameMatch = stmt.match(/insert into (\w+)/i);
          const valuesMatch = stmt.match(/values\s*\(([\s\S]+)\)/i);
          if (tableNameMatch && valuesMatch) {
            const tableName = tableNameMatch[1];
            const values = valuesMatch[1].split(',').map(v => v.trim().replace(/'/g, ''));
            if (tables[tableName]) {
              tables[tableName].data.push(values);
            }
          }
        }
        else if (lowerStmt.startsWith('select')) {
          const fromMatch = stmt.match(/from (\w+)/i);
          const whereMatch = stmt.match(/where\s+(.+)/i);
          
          if (fromMatch) {
            const tableName = fromMatch[1];
            const table = tables[tableName];
            
            if (table) {
              let filteredData = [...table.data];
              
              // Simple simulation of WHERE id > X
              if (whereMatch) {
                const condition = whereMatch[1];
                if (condition.includes('id >')) {
                  const val = parseInt(condition.split('>')[1].trim());
                  filteredData = filteredData.filter(row => parseInt(row[0]) > val);
                }
              }

              lastQueryResult = {
                columns: table.columns,
                rows: filteredData,
                type: 'success',
                message: `Query executada com sucesso. ${filteredData.length} linhas retornadas.`
              };
            } else {
              throw new Error(`Tabela '${tableName}' não encontrada.`);
            }
          }
        }
      });

      setResults(lastQueryResult || { 
        columns: [], 
        rows: [], 
        type: 'info', 
        message: 'Schema criado com sucesso. Nenhuma query SELECT executada.' 
      });

    } catch (err: any) {
      setResults({
        columns: [],
        rows: [],
        type: 'error',
        error: err.message || 'Erro de sintaxe SQL próximo a ...'
      });
    }
  };

  const copyResults = () => {
    if (!results || results.rows.length === 0) return;
    const csv = [results.columns.join(','), ...results.rows.map(r => r.join(','))].join('\n');
    navigator.clipboard.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setSchema(DEFAULT_SCHEMA);
    setQuery(DEFAULT_QUERY);
    setResults(null);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl">
            <Database size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">SQL Fiddle</h1>
            <p className="text-slate-400">Ambiente interativo para criar schemas e testar queries SQL.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <select 
            value={dialect}
            onChange={(e) => setDialect(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs font-bold text-slate-400 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
          >
            <option>MySQL 8.0</option>
            <option>PostgreSQL 15</option>
            <option>SQLite 3.39</option>
            <option>MS SQL Server</option>
          </select>
          <Button variant="outline" onClick={reset}>
            <RefreshCw size={16} className="mr-2" /> Reset
          </Button>
          <Button onClick={runSql} className="bg-blue-600 hover:bg-blue-700 px-8">
            <Play size={16} className="mr-2 fill-current" /> Rodar SQL
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
         <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between px-2">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <FileCode size={14} /> Schema (DDL)
               </span>
            </div>
            <Textarea 
               value={schema}
               onChange={(e) => setSchema(e.target.value)}
               className="flex-1 bg-slate-900 border-slate-800 focus:border-blue-500/50 text-xs"
               placeholder="CREATE TABLE ... ; INSERT INTO ... ;"
            />
         </div>
         <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between px-2">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Database size={14} /> Query (DML)
               </span>
            </div>
            <Textarea 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="flex-1 bg-slate-900 border-slate-800 focus:border-blue-500/50 text-xs"
               placeholder="SELECT * FROM ... ;"
            />
         </div>
      </div>

      {/* Results Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl min-h-[300px] flex flex-col">
         <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
            <div className="flex gap-4">
               <button 
                  onClick={() => setActiveTab('results')}
                  className={`text-xs font-bold uppercase tracking-widest transition-all relative pb-1 ${activeTab === 'results' ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
               >
                  Resultados
                  {activeTab === 'results' && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>}
               </button>
               <button 
                  onClick={() => setActiveTab('schema-viewer')}
                  className={`text-xs font-bold uppercase tracking-widest transition-all relative pb-1 ${activeTab === 'schema-viewer' ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
               >
                  Estrutura
                  {activeTab === 'schema-viewer' && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>}
               </button>
            </div>
            
            {results?.rows && results.rows.length > 0 && (
               <button onClick={copyResults} className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors">
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  {copied ? 'Copiado CSV' : 'Exportar CSV'}
               </button>
            )}
         </div>

         <div className="flex-1 p-6 overflow-auto custom-scrollbar">
            {!results ? (
               <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                  <Play size={48} className="text-slate-500" />
                  <p className="text-sm italic">Pressione "Rodar SQL" para ver os resultados.</p>
               </div>
            ) : results.type === 'error' ? (
               <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex gap-4 text-red-400">
                  <AlertCircle size={24} className="flex-shrink-0" />
                  <div>
                     <h4 className="font-bold mb-1">Erro na Query</h4>
                     <p className="text-sm font-mono">{results.error}</p>
                  </div>
               </div>
            ) : activeTab === 'results' ? (
               <div className="space-y-4">
                  {results.message && (
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 w-fit">
                        <Check size={12} className="text-green-500" /> {results.message}
                     </div>
                  )}
                  {results.columns.length > 0 && (
                     <div className="border border-slate-800 rounded-xl overflow-hidden shadow-lg bg-slate-950">
                        <table className="w-full text-left text-sm border-collapse">
                           <thead>
                              <tr className="bg-slate-900 border-b border-slate-800">
                                 {results.columns.map(col => (
                                    <th key={col} className="px-4 py-3 font-black text-slate-400 uppercase text-[10px] tracking-widest">{col}</th>
                                 ))}
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-800/50">
                              {results.rows.map((row, i) => (
                                 <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                                    {row.map((cell, j) => (
                                       <td key={j} className="px-4 py-3 text-slate-300 font-mono text-xs">{cell}</td>
                                    ))}
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  )}
               </div>
            ) : (
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <Table size={20} className="text-blue-500" />
                     <h4 className="text-sm font-bold text-white uppercase tracking-widest">Esquema do Banco de Dados</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                           <span className="font-black text-xs text-blue-400">users</span>
                           <span className="text-[9px] text-slate-600 font-bold uppercase">3 Rows</span>
                        </div>
                        <div className="space-y-1.5">
                           <SchemaField name="id" type="INT" isPk />
                           <SchemaField name="name" type="VARCHAR" />
                           <SchemaField name="email" type="VARCHAR" />
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>

         <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center gap-4 text-slate-600">
            <Info size={14} className="text-blue-500" />
            <p className="text-[10px] font-medium uppercase tracking-tighter">Este Fiddle utiliza uma simulação local. Para produção, teste suas queries em um ambiente SQL real (Docker, AWS RDS, etc).</p>
         </div>
      </div>
    </div>
  );
};

const SchemaField = ({ name, type, isPk }: { name: string, type: string, isPk?: boolean }) => (
  <div className="flex items-center justify-between group">
     <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold ${isPk ? 'text-yellow-500' : 'text-slate-300'}`}>{name}</span>
        {isPk && <span className="text-[8px] font-black bg-yellow-500/10 text-yellow-600 px-1 rounded">PK</span>}
     </div>
     <span className="text-[9px] font-mono text-slate-600 group-hover:text-slate-500">{type}</span>
  </div>
);

export default SqlFiddleTool;
