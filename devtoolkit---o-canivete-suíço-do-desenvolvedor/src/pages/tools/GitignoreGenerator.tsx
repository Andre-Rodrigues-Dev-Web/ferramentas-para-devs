
import React, { useState, useMemo } from 'react';
import { FileX, Search, Plus, X, Download, Copy, Check, Info, FileCode, Zap, Layers, Trash2 } from 'lucide-react';
import { Button } from '../../shared/ui/Button';

interface Tech {
  id: string;
  name: string;
  category: 'Linguagem' | 'Framework' | 'IDE' | 'Sistema';
  content: string;
}

const TECHS: Tech[] = [
  { id: 'node', name: 'Node', category: 'Linguagem', content: '# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n\n# Dependency directories\nnode_modules/\njspm_packages/\n\n# IDEs and editors\n.idea/\n.vscode/\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n\n# Runtime data\npids\n*.pid\n*.seed\n*.pid.lock\n\n# Optional npm cache directory\n.npm\n\n# Optional eslint cache\n.eslintcache' },
  { id: 'react', name: 'React', category: 'Framework', content: '# build folders\nbuild/\ndist/\n\n# tests\n/coverage\n\n# env\n.env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local' },
  { id: 'python', name: 'Python', category: 'Linguagem', content: '# Byte-compiled / optimized / DLL files\n__pycache__/\n*.py[cod]\n*$py.class\n\n# Virtual environments\nvenv/\nenv/\n.env/\n.venv/\nENV/\n\n# Distribution / packaging\n.Python\nbuild/\ndevelop-eggs/\ndist/\neggs/\n.eggs/\nlib/\nlib64/\nsdist/\nvar/\nwheels/\nshare/python-wheels/\n*.egg-info/\n.installed.cfg\n*.egg\nMANIFEST' },
  { id: 'vscode', name: 'Visual Studio Code', category: 'IDE', content: '.vscode/*\n!.vscode/settings.json\n!.vscode/tasks.json\n!.vscode/launch.json\n!.vscode/extensions.json\n*.code-workspace\n.history/' },
  { id: 'windows', name: 'Windows', category: 'Sistema', content: '# Windows thumbnail cache files\nThumbs.db\nThumbs.db:encryptable\nehthumbs.db\nehthumbs_vista.db\n\n# Folder config file\ndesktop.ini\n\n# Recycle Bin used on separate drives\n$RECYCLE.BIN/' },
  { id: 'macos', name: 'macOS', category: 'Sistema', content: '.DS_Store\n.AppleDouble\n.LSOverride\n\n# Icon must end with two \\r\nIcon\r\r\n\n# Thumbnails\n._*\n\n# Files that might appear in the root of a volume\n.DocumentRevisions-V100\n.fseventsd\n.Spotlight-V100\n.TemporaryItems\n.Trashes\n.VolumeIcon.icns\n.com.apple.timemachine.donotpresent' },
  { id: 'vue', name: 'Vue', category: 'Framework', content: '.DS_Store\nnode_modules\n/dist\n\n# local env files\n.env.local\n.env.*.local\n\n# Log files\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n\n# Editor directories and files\n.idea\n.vscode\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?' },
  { id: 'go', name: 'Go', category: 'Linguagem', content: '# Binaries for programs and plugins\n*.exe\n*.exe~\n*.dll\n*.so\n*.dylib\n\n# Test binary, built with `go test -c`\n*.test\n\n# Output of the go coverage tool, specifically when used with Litmus\n*.out\n\n# Dependency directories (remove the comment below to include it)\n# vendor/' },
  { id: 'docker', name: 'Docker', category: 'Sistema', content: '.dockerignore' },
  { id: 'laravel', name: 'Laravel', category: 'Framework', content: '/vendor/\nnode_modules/\npublic/storage\npublic/hot\nstorage/*.key\n.env\n.env.backup\n.phpunit.result.cache\nHomestead.json\nHomestead.yaml\nauth.json\npm2-*.log' },
];

const GitignoreGenerator: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<Tech[]>([]);
  const [copied, setCopied] = useState(false);

  const filteredTechs = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return [];
    return TECHS.filter(t => 
      t.name.toLowerCase().includes(query) && 
      !selectedTechs.find(st => st.id === t.id)
    );
  }, [search, selectedTechs]);

  const generatedContent = useMemo(() => {
    if (selectedTechs.length === 0) return '';
    return selectedTechs.map(t => {
      return `### ${t.name} ###\n${t.content}\n`;
    }).join('\n');
  }, [selectedTechs]);

  const addTech = (tech: Tech) => {
    setSelectedTechs([...selectedTechs, tech]);
    setSearch('');
  };

  const removeTech = (id: string) => {
    setSelectedTechs(selectedTechs.filter(t => t.id !== id));
  };

  const copyToClipboard = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    if (!generatedContent) return;
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.gitignore';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600/10 text-indigo-400 rounded-2xl">
            <FileX size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Gitignore Generator</h1>
            <p className="text-slate-400">Gere arquivos .gitignore personalizados para seu stack de tecnologia.</p>
          </div>
        </div>
        {selectedTechs.length > 0 && (
          <div className="flex gap-2">
             <Button variant="outline" onClick={() => setSelectedTechs([])} className="text-red-400 border-red-500/20">
               <Trash2 size={16} className="mr-2" /> Limpar
             </Button>
             <Button onClick={downloadFile} className="bg-indigo-600 hover:bg-indigo-700">
               <Download size={16} className="mr-2" /> Baixar .gitignore
             </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Selection Area */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl space-y-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Busque por Node, React, macOS, VSCode..."
                className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              
              {/* Dropdown Suggestions */}
              {filteredTechs.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredTechs.map(tech => (
                      <button 
                        key={tech.id}
                        onClick={() => addTech(tech)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-indigo-600/20 group transition-colors"
                      >
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:text-indigo-400 transition-colors">
                               {tech.category.substring(0, 3).toUpperCase()}
                            </div>
                            <div className="text-left">
                               <p className="text-sm font-bold text-white">{tech.name}</p>
                               <p className="text-[10px] text-slate-500 uppercase">{tech.category}</p>
                            </div>
                         </div>
                         <Plus size={16} className="text-slate-600 group-hover:text-indigo-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Selecionados</h3>
               <div className="flex flex-wrap gap-2">
                  {selectedTechs.length === 0 ? (
                    <div className="w-full p-8 border-2 border-dashed border-slate-800 rounded-2xl text-center">
                       <Zap size={24} className="mx-auto text-slate-700 mb-2" />
                       <p className="text-xs text-slate-600">Nenhuma tecnologia selecionada</p>
                    </div>
                  ) : (
                    selectedTechs.map(tech => (
                      <div 
                        key={tech.id}
                        className="flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 px-3 py-2 rounded-xl text-xs font-bold animate-in zoom-in duration-200"
                      >
                        {tech.name}
                        <button onClick={() => removeTech(tech.id)} className="hover:text-white">
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  )}
               </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-4">Comuns</h3>
               <div className="flex flex-wrap gap-2">
                  {['macos', 'windows', 'vscode', 'node'].filter(id => !selectedTechs.find(st => st.id === id)).map(id => (
                    <button
                      key={id}
                      onClick={() => addTech(TECHS.find(t => t.id === id)!)}
                      className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all uppercase"
                    >
                      + {id}
                    </button>
                  ))}
               </div>
            </div>
          </div>

          <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-4 flex gap-4 text-xs leading-relaxed text-slate-400">
             <div className="p-2 bg-blue-500/10 rounded-xl h-fit">
                <Info size={16} className="text-blue-400" />
             </div>
             <p>Recomendamos incluir os sistemas operacionais (<strong className="text-slate-200">macOS/Windows</strong>) e sua IDE para evitar poluir o repositório com arquivos de cache locais.</p>
          </div>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl h-[650px]">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600/10 rounded-xl text-indigo-400">
                    <FileCode size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">.gitignore Preview</h3>
               </div>
               
               <button 
                  disabled={!generatedContent}
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white transition-colors disabled:opacity-30"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  {copied ? 'Copiado!' : 'Copiar'}
               </button>
            </div>

            <div className="flex-1 p-8 bg-slate-950 overflow-auto custom-scrollbar relative">
               {generatedContent ? (
                 <pre className="text-indigo-300 code-font text-xs leading-relaxed">
                    {generatedContent}
                 </pre>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                    <Layers size={64} className="text-slate-500" />
                    <div className="space-y-1">
                      <p className="text-lg font-bold">Gerador Pronto</p>
                      <p className="text-sm max-w-xs">Adicione tecnologias à esquerda para compor seu arquivo .gitignore.</p>
                    </div>
                 </div>
               )}
               {/* Visual subtle glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] pointer-events-none"></div>
            </div>
            
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                     <div className="w-5 h-5 rounded-full bg-blue-600 border border-slate-950"></div>
                     <div className="w-5 h-5 rounded-full bg-indigo-600 border border-slate-950"></div>
                     <div className="w-5 h-5 rounded-full bg-purple-600 border border-slate-950"></div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Merge de templates otimizado</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Git Toolkit v1</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitignoreGenerator;
