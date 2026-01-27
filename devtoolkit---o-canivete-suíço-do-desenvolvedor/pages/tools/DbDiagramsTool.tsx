
import React, { useState, useMemo } from 'react';
import { Network, Plus, Trash2, Download, Copy, Check, FileCode, Database, Key, Type, ChevronRight, X, Edit3, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';

type ColumnType = 'INT' | 'VARCHAR(255)' | 'TEXT' | 'BOOLEAN' | 'TIMESTAMP' | 'DECIMAL' | 'UUID' | 'BIGINT';

interface Column {
  id: string;
  name: string;
  type: ColumnType;
  isPK: boolean;
  isNullable: boolean;
}

interface Table {
  id: string;
  name: string;
  columns: Column[];
  color: string;
}

const COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#ef4444', // red
  '#f59e0b', // amber
  '#10b981', // emerald
  '#06b6d4', // cyan
];

const DbDiagramsTool: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([
    {
      id: '1',
      name: 'users',
      color: COLORS[0],
      columns: [
        { id: 'c1', name: 'id', type: 'BIGINT', isPK: true, isNullable: false },
        { id: 'c2', name: 'email', type: 'VARCHAR(255)', isPK: false, isNullable: false },
        { id: 'c3', name: 'password', type: 'VARCHAR(255)', isPK: false, isNullable: false },
        { id: 'c4', name: 'created_at', type: 'TIMESTAMP', isPK: false, isNullable: false },
      ]
    },
    {
      id: '2',
      name: 'posts',
      color: COLORS[1],
      columns: [
        { id: 'c5', name: 'id', type: 'BIGINT', isPK: true, isNullable: false },
        { id: 'c6', name: 'title', type: 'VARCHAR(255)', isPK: false, isNullable: false },
        { id: 'c7', name: 'content', type: 'TEXT', isPK: false, isNullable: true },
        { id: 'c8', name: 'user_id', type: 'BIGINT', isPK: false, isNullable: false },
      ]
    }
  ]);

  const [activeTableId, setActiveTableId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const addTable = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newTable: Table = {
      id: newId,
      name: `new_table_${tables.length + 1}`,
      color: COLORS[tables.length % COLORS.length],
      columns: [
        { id: Math.random().toString(36).substr(2, 9), name: 'id', type: 'BIGINT', isPK: true, isNullable: false }
      ]
    };
    setTables([...tables, newTable]);
    setActiveTableId(newId);
  };

  const removeTable = (id: string) => {
    setTables(tables.filter(t => t.id !== id));
    if (activeTableId === id) setActiveTableId(null);
  };

  const updateTable = (id: string, updates: Partial<Table>) => {
    setTables(tables.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const addColumn = (tableId: string) => {
    setTables(tables.map(t => {
      if (t.id === tableId) {
        return {
          ...t,
          columns: [
            ...t.columns,
            { id: Math.random().toString(36).substr(2, 9), name: `col_${t.columns.length + 1}`, type: 'VARCHAR(255)', isPK: false, isNullable: true }
          ]
        };
      }
      return t;
    }));
  };

  const removeColumn = (tableId: string, columnId: string) => {
    setTables(tables.map(t => {
      if (t.id === tableId) {
        return {
          ...t,
          columns: t.columns.filter(c => c.id !== columnId)
        };
      }
      return t;
    }));
  };

  const updateColumn = (tableId: string, columnId: string, updates: Partial<Column>) => {
    setTables(tables.map(t => {
      if (t.id === tableId) {
        return {
          ...t,
          columns: t.columns.map(c => c.id === columnId ? { ...c, ...updates } : c)
        };
      }
      return t;
    }));
  };

  const sqlOutput = useMemo(() => {
    return tables.map(t => {
      const colDefs = t.columns.map(c => {
        return `  ${c.name} ${c.type}${c.isPK ? ' PRIMARY KEY' : ''}${!c.isNullable ? ' NOT NULL' : ''}`;
      }).join(',\n');
      return `CREATE TABLE ${t.name} (\n${colDefs}\n);`;
    }).join('\n\n');
  }, [tables]);

  const copySql = () => {
    navigator.clipboard.writeText(sqlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTable = tables.find(t => t.id === activeTableId);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-violet-600/10 text-violet-500 rounded-2xl">
            <Network size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Database Diagram Designer</h1>
            <p className="text-slate-400">Desenhe esquemas de banco de dados e exporte para SQL instantaneamente.</p>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={() => setTables([])} className="text-red-400 border-red-500/20">
             <Trash2 size={16} className="mr-2" /> Limpar Canvas
           </Button>
           <Button onClick={addTable} className="bg-violet-600 hover:bg-violet-700 rounded-2xl">
             <Plus size={18} className="mr-2" /> Adicionar Tabela
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
        {/* Designer Sidebar */}
        <div className="lg:col-span-4 flex flex-col space-y-6 overflow-hidden">
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-xl flex flex-col overflow-hidden">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Database size={14} /> Gerenciador de Esquema
             </h3>

             {!activeTable ? (
               <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-800 rounded-2xl space-y-4">
                  <div className="p-4 bg-slate-800 rounded-full text-slate-600">
                    <Edit3 size={32} />
                  </div>
                  <p className="text-sm text-slate-500">Selecione uma tabela no canvas para editar suas colunas.</p>
               </div>
             ) : (
               <div className="flex-1 flex flex-col overflow-hidden space-y-6 animate-in slide-in-from-left-4 duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-4 h-4 rounded-full" style={{ backgroundColor: activeTable.color }}></div>
                       <input 
                         type="text" 
                         value={activeTable.name} 
                         onChange={(e) => updateTable(activeTable.id, { name: e.target.value })}
                         className="flex-1 bg-slate-950 border-b-2 border-slate-800 focus:border-violet-500 py-1 text-lg font-bold text-white focus:outline-none transition-colors"
                         placeholder="Nome da Tabela"
                       />
                       <button onClick={() => setActiveTableId(null)} className="p-2 text-slate-600 hover:text-white">
                         <X size={18} />
                       </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                     {activeTable.columns.map((col) => (
                       <div key={col.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4 group/col">
                          <div className="flex items-center gap-2">
                             <input 
                              type="text" 
                              value={col.name}
                              onChange={(e) => updateColumn(activeTable.id, col.id, { name: e.target.value })}
                              className="flex-1 bg-transparent border-b border-transparent focus:border-violet-500/50 text-sm font-bold text-slate-200 focus:outline-none"
                             />
                             <button onClick={() => removeColumn(activeTable.id, col.id)} className="opacity-0 group-hover/col:opacity-100 p-1 text-slate-700 hover:text-red-400 transition-all">
                                <Trash2 size={14} />
                             </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                             <select 
                              value={col.type}
                              onChange={(e) => updateColumn(activeTable.id, col.id, { type: e.target.value as ColumnType })}
                              className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[10px] font-bold text-violet-400 focus:outline-none cursor-pointer"
                             >
                               <option>BIGINT</option>
                               <option>INT</option>
                               <option>VARCHAR(255)</option>
                               <option>TEXT</option>
                               <option>BOOLEAN</option>
                               <option>TIMESTAMP</option>
                               <option>DECIMAL</option>
                               <option>UUID</option>
                             </select>

                             <button 
                               onClick={() => updateColumn(activeTable.id, col.id, { isPK: !col.isPK })}
                               className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border transition-all ${col.isPK ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'bg-slate-900 border-slate-800 text-slate-600 hover:text-slate-400'}`}
                             >
                               PK
                             </button>
                             
                             <button 
                               onClick={() => updateColumn(activeTable.id, col.id, { isNullable: !col.isNullable })}
                               className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border transition-all ${!col.isNullable ? 'bg-blue-500/10 border-blue-500/50 text-blue-500' : 'bg-slate-900 border-slate-800 text-slate-600 hover:text-slate-400'}`}
                             >
                               NOT NULL
                             </button>
                          </div>
                       </div>
                     ))}
                     <button 
                      onClick={() => addColumn(activeTable.id)}
                      className="w-full py-3 border-2 border-dashed border-slate-800 rounded-xl text-xs font-bold text-slate-600 hover:text-violet-400 hover:border-violet-500/30 transition-all flex items-center justify-center gap-2"
                     >
                       <Plus size={14} /> ADICIONAR COLUNA
                     </button>
                  </div>
               </div>
             )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">DDL Output (SQL)</h3>
                <button onClick={copySql} className="text-xs font-bold text-violet-500 hover:text-violet-400 flex items-center gap-1.5">
                   {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                   {copied ? 'Copiado' : 'Copiar'}
                </button>
             </div>
             <pre className="bg-slate-950 p-4 rounded-xl text-blue-400 code-font text-[10px] h-32 overflow-auto custom-scrollbar border border-slate-800">
                {sqlOutput || '-- Adicione tabelas para gerar SQL'}
             </pre>
          </div>
        </div>

        {/* Designer Canvas */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-[2.5rem] relative overflow-hidden shadow-2xl group">
           {/* Grid Background */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
           
           <div className="absolute inset-0 p-8 flex flex-wrap gap-8 content-start overflow-auto custom-scrollbar">
              {tables.map(table => (
                <div 
                  key={table.id}
                  onClick={(e) => { e.stopPropagation(); setActiveTableId(table.id); }}
                  className={`min-w-[240px] bg-slate-900 border-2 rounded-2xl overflow-hidden shadow-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${activeTableId === table.id ? 'border-violet-500 ring-4 ring-violet-500/10' : 'border-slate-800'}`}
                >
                   {/* Table Header */}
                   <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottomColor: table.color, borderBottomWidth: '3px' }}>
                      <div className="flex items-center gap-2">
                        <Database size={14} className="text-slate-500" />
                        <span className="font-black text-xs text-white uppercase tracking-wider truncate max-w-[150px]">{table.name}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeTable(table.id); }}
                        className="p-1 text-slate-700 hover:text-red-400 transition-colors"
                      >
                         <Trash2 size={12} />
                      </button>
                   </div>
                   
                   {/* Table Columns */}
                   <div className="p-1 space-y-0.5">
                      {table.columns.map(col => (
                        <div key={col.id} className="flex items-center justify-between px-3 py-1.5 hover:bg-slate-800/50 rounded-lg group/item transition-colors">
                           <div className="flex items-center gap-2">
                              {col.isPK ? <Key size={10} className="text-amber-500" /> : <ChevronRight size={10} className="text-slate-700" />}
                              <span className={`text-[11px] font-medium ${col.isPK ? 'text-amber-500' : 'text-slate-300'}`}>{col.name}</span>
                           </div>
                           <span className="text-[9px] font-mono text-slate-600 group-hover/item:text-slate-500">{col.type.split('(')[0]}</span>
                        </div>
                      ))}
                      {table.columns.length === 0 && (
                        <div className="py-4 text-center">
                           <p className="text-[10px] text-slate-700 italic">Sem colunas</p>
                        </div>
                      )}
                   </div>

                   {/* Footer info */}
                   <div className="bg-slate-950/50 px-3 py-1.5 border-t border-slate-800/50 flex justify-between items-center">
                      <span className="text-[8px] font-bold text-slate-600 uppercase">{table.columns.length} Fields</span>
                      <button onClick={(e) => { e.stopPropagation(); addColumn(table.id); }} className="text-[8px] font-black text-violet-500 hover:text-violet-400 uppercase">+ Add</button>
                   </div>
                </div>
              ))}

              {tables.length === 0 && (
                <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-6 opacity-20 group-hover:opacity-40 transition-opacity">
                   <div className="p-8 bg-slate-800 rounded-[3rem]">
                      <Network size={80} className="text-slate-500" />
                   </div>
                   <div className="max-w-xs">
                      <h4 className="text-xl font-bold text-white mb-2">Canvas Vazio</h4>
                      <p className="text-sm">Clique no botão "Adicionar Tabela" para começar a modelar seu banco de dados.</p>
                   </div>
                </div>
              )}
           </div>

           <div className="absolute bottom-6 right-6 flex flex-col gap-3">
              <button 
                onClick={addTable}
                className="w-14 h-14 bg-violet-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                title="Adicionar Tabela"
              >
                <Plus size={24} />
              </button>
           </div>

           <div className="absolute top-6 left-6 pointer-events-none">
              <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Workspace Ativo</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DbDiagramsTool;
