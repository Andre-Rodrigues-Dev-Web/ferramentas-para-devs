
import React, { useState, useMemo, useEffect } from 'react';
import { Container, Search, Star, Download, ShieldCheck, Check, Copy, ExternalLink, Loader2, Info, ArrowRight, Package } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface DockerImage {
  name: string;
  description: string;
  isOfficial: boolean;
  isVerified: boolean;
  starCount: string;
  pullCount: string;
  updatedAt: string;
}

const MOCK_DOCKER_IMAGES: DockerImage[] = [
  { name: 'nginx', description: 'Official build of Nginx.', isOfficial: true, isVerified: true, starCount: '19.2k', pullCount: '1B+', updatedAt: '2 days ago' },
  { name: 'redis', description: 'Redis is an open source key-value store that functions as a data structure server.', isOfficial: true, isVerified: true, starCount: '12.4k', pullCount: '1B+', updatedAt: '3 days ago' },
  { name: 'mysql', description: 'MySQL is a widely used, open-source relational database management system (RDBMS).', isOfficial: true, isVerified: true, starCount: '14.1k', pullCount: '1B+', updatedAt: '1 day ago' },
  { name: 'node', description: 'Node.js is a JavaScript runtime built on Chromes V8 JavaScript engine.', isOfficial: true, isVerified: true, starCount: '13.5k', pullCount: '1B+', updatedAt: '5 days ago' },
  { name: 'python', description: 'Python is an interpreted, interactive, object-oriented, open-source programming language.', isOfficial: true, isVerified: true, starCount: '10.8k', pullCount: '1B+', updatedAt: '2 days ago' },
  { name: 'ubuntu', description: 'Ubuntu is a Debian-based Linux operating system based on free software.', isOfficial: true, isVerified: true, starCount: '16.5k', pullCount: '1B+', updatedAt: '1 week ago' },
  { name: 'postgres', description: 'The PostgreSQL object-relational database system provides reliability and integrity.', isOfficial: true, isVerified: true, starCount: '12.9k', pullCount: '1B+', updatedAt: '2 days ago' },
  { name: 'mongo', description: 'MongoDB document databases provide high availability and easy scalability.', isOfficial: true, isVerified: true, starCount: '10.2k', pullCount: '1B+', updatedAt: '4 days ago' },
  { name: 'alpine', description: 'A minimal Docker image based on Alpine Linux with a complete package index.', isOfficial: true, isVerified: true, starCount: '10.1k', pullCount: '1B+', updatedAt: '1 month ago' },
  { name: 'busybox', description: 'Busybox combines tiny versions of many common UNIX utilities into a single executable.', isOfficial: true, isVerified: true, starCount: '3.1k', pullCount: '1B+', updatedAt: '3 weeks ago' },
  { name: 'traefik', description: 'Traefik is a modern HTTP reverse proxy and load balancer that makes deploying microservices easy.', isOfficial: false, isVerified: true, starCount: '4.5k', pullCount: '500M+', updatedAt: '2 days ago' },
  { name: 'portainer/portainer-ce', description: 'Making Docker and Kubernetes management easy.', isOfficial: false, isVerified: true, starCount: '6.2k', pullCount: '100M+', updatedAt: '1 day ago' },
  { name: 'bitnami/nginx', description: 'Bitnami Docker Image for Nginx.', isOfficial: false, isVerified: true, starCount: '1.2k', pullCount: '100M+', updatedAt: '3 days ago' },
  { name: 'wordpress', description: 'The WordPress rich content management system can utilize its own database.', isOfficial: true, isVerified: true, starCount: '7.8k', pullCount: '1B+', updatedAt: '2 days ago' },
  { name: 'openjdk', description: 'Official build of OpenJDK.', isOfficial: true, isVerified: true, starCount: '4.5k', pullCount: '1B+', updatedAt: '2 weeks ago' },
];

const DockerSearchTool: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DockerImage[]>(MOCK_DOCKER_IMAGES);
  const [loading, setLoading] = useState(false);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [filterOfficial, setFilterOfficial] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
    
    const searchResults = MOCK_DOCKER_IMAGES.filter(img => {
      const matchesQuery = img.name.toLowerCase().includes(query.toLowerCase()) || 
                          img.description.toLowerCase().includes(query.toLowerCase());
      const matchesOfficial = filterOfficial ? img.isOfficial : true;
      return matchesQuery && matchesOfficial;
    });

    setResults(searchResults);
    setLoading(false);
  };

  const copyPullCommand = (name: string) => {
    navigator.clipboard.writeText(`docker pull ${name}`);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
            <Container size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Docker Hub Search</h1>
            <p className="text-slate-400">Pesquise imagens oficiais e verificadas no ecossistema Docker.</p>
          </div>
        </div>
        <a 
          href="https://hub.docker.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-400 transition-colors bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"
        >
          <ExternalLink size={14} /> Hub Oficial
        </a>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${loading ? 'text-blue-500 animate-pulse' : 'text-slate-500 group-focus-within:text-blue-500'}`} size={20} />
              <input 
                type="text"
                placeholder="Pesquisar imagens (ex: nginx, mysql, node...)"
                className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-slate-100 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
               <button 
                type="button"
                onClick={() => { setFilterOfficial(!filterOfficial); }}
                className={`px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${filterOfficial ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
               >
                 <ShieldCheck size={16} /> Oficiais
               </button>
               <Button onClick={handleSearch} disabled={loading} className="bg-blue-600 hover:bg-blue-700 px-10 rounded-2xl h-full">
                 {loading ? <Loader2 size={20} className="animate-spin" /> : 'Pesquisar'}
               </Button>
            </div>
          </form>

          <div className="flex items-center gap-3 text-xs text-slate-500">
             <span className="font-bold uppercase tracking-tighter">Sugestões:</span>
             <div className="flex flex-wrap gap-2">
                {['nginx', 'postgres', 'redis', 'python'].map(s => (
                  <button 
                    key={s} 
                    onClick={() => { setQuery(s); handleSearch(); }}
                    className="px-2 py-1 bg-slate-800 rounded-md hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-6">
             <div className="relative">
                <Container size={64} className="text-blue-500/20" />
                <Loader2 size={32} className="text-blue-500 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
             </div>
             <p className="text-slate-500 font-medium animate-pulse">Consultando Docker Hub Registry...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {results.map((img) => (
              <div key={img.name} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col hover:border-blue-500/30 transition-all group hover:-translate-y-1 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-slate-800 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
                    <Package size={24} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     {img.isOfficial && (
                        <span className="flex items-center gap-1 text-[9px] font-black uppercase bg-blue-600/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                          <ShieldCheck size={10} /> Official
                        </span>
                     )}
                     {img.isVerified && (
                        <span className="flex items-center gap-1 text-[9px] font-black uppercase bg-green-600/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
                          <Check size={10} /> Verified
                        </span>
                     )}
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">{img.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{img.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 mb-6">
                   <div className="flex items-center gap-2">
                      <Star size={14} className="text-yellow-500" />
                      <span className="text-xs font-bold text-slate-300">{img.starCount}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Download size={14} className="text-blue-500" />
                      <span className="text-xs font-bold text-slate-300">{img.pullCount}</span>
                   </div>
                </div>

                <button 
                  onClick={() => copyPullCommand(img.name)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl group/btn hover:border-blue-500/50 transition-all"
                >
                   <code className="text-[10px] font-mono text-blue-400">docker pull {img.name}</code>
                   <div className="text-slate-600 group-hover/btn:text-blue-400">
                     {copiedName === img.name ? <Check size={14} /> : <Copy size={14} />}
                   </div>
                </button>
                
                <div className="mt-3 flex justify-between items-center text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                   <span>Updated {img.updatedAt}</span>
                   <span className="group-hover:text-blue-500 transition-colors">Details <ArrowRight size={10} className="inline ml-1" /></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-[3rem]">
            <Container size={64} className="mx-auto text-slate-800 mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhuma imagem encontrada</h3>
            <p className="text-slate-500">Tente pesquisar por termos mais genéricos como "db", "server" ou "web".</p>
          </div>
        )}

        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-start gap-4">
           <div className="p-3 bg-blue-600/10 text-blue-500 rounded-xl flex-shrink-0">
             <Info size={20} />
           </div>
           <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Como escolher a imagem certa?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dê preferência a imagens com o selo <strong className="text-blue-400">Docker Official Image</strong> para maior segurança e estabilidade. Verifique também o <strong className="text-slate-300">pull count</strong> e a data da última atualização para garantir que o projeto está ativo.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DockerSearchTool;
