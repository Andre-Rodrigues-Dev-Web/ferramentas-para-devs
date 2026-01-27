
import React, { useState, useMemo } from 'react';
import { 
  Rocket, Search, Copy, Check, ExternalLink, Filter, 
  Monitor, Smartphone, Laptop, Server, Zap, Globe, 
  Terminal, Code2, Layers, Sparkles
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

type BoilerplateCategory = 'Tudo' | 'Web' | 'Mobile' | 'Desktop' | 'Backend' | 'Fullstack';

interface Boilerplate {
  id: string;
  name: string;
  description: string;
  category: BoilerplateCategory;
  stack: string[];
  command: string;
  url: string;
  isPopular?: boolean;
}

const BOILERPLATES: Boilerplate[] = [
  // WEB
  { id: 'w1', name: 'Next.js App', description: 'O framework React para a web moderna com SSR e App Router.', category: 'Web', stack: ['React', 'Next.js', 'Tailwind', 'TS'], command: 'npx create-next-app@latest', url: 'https://nextjs.org/docs' },
  { id: 'w2', name: 'Vite + React', description: 'Front-end extremamente rápido com Vite e React.', category: 'Web', stack: ['React', 'Vite', 'TS'], command: 'npm create vite@latest my-react-app -- --template react-ts', url: 'https://vitejs.dev/' },
  { id: 'w3', name: 'Vue 3 + Vite', description: 'A evolução do Vue com Composition API e Pinia.', category: 'Web', stack: ['Vue', 'Vite', 'Pinia'], command: 'npm create vue@latest', url: 'https://vuejs.org/' },
  { id: 'w4', name: 'Astro Blog', description: 'Sites focados em conteúdo com zero JS por padrão.', category: 'Web', stack: ['Astro', 'Markdown'], command: 'npm create astro@latest -- --template blog', url: 'https://astro.build/' },
  { id: 'w5', name: 'SvelteKit', description: 'A maneira mais rápida de construir apps com Svelte.', category: 'Web', stack: ['Svelte', 'Vite'], command: 'npm create svelte@latest my-app', url: 'https://kit.svelte.dev/' },
  { id: 'w6', name: 'Nuxt 3', description: 'Framework intuitivo para Vue.js de alta performance.', category: 'Web', stack: ['Vue', 'Nuxt', 'Nitro'], command: 'npx nuxi@latest init my-app', url: 'https://nuxt.com/' },
  { id: 'w7', name: 'Remix', description: 'Focado em fundamentos da web e UX resiliente.', category: 'Web', stack: ['React', 'Edge'], command: 'npx create-remix@latest', url: 'https://remix.run/' },
  { id: 'w8', name: 'SolidStart', description: 'O framework fullstack para SolidJS.', category: 'Web', stack: ['SolidJS', 'Vite'], command: 'npm create solid@latest', url: 'https://start.solidjs.com/' },
  { id: 'w9', name: 'Gatsby', description: 'Gerador de sites estáticos com GraphQL.', category: 'Web', stack: ['React', 'GraphQL'], command: 'npx gatsby new', url: 'https://www.gatsbyjs.com/' },
  { id: 'w10', name: 'Qwik City', description: 'Apps com "resumability" e performance instantânea.', category: 'Web', stack: ['Qwik', 'Vite'], command: 'npm create qwik@latest', url: 'https://qwik.builder.io/' },

  // MOBILE
  { id: 'm1', name: 'Expo (React Native)', description: 'Desenvolva apps iOS e Android com uma única base React.', category: 'Mobile', stack: ['React Native', 'Expo'], command: 'npx create-expo-app my-app', url: 'https://expo.dev/', isPopular: true },
  { id: 'm2', name: 'Flutter Starter', description: 'Framework do Google para apps nativos compilados.', category: 'Mobile', stack: ['Dart', 'Flutter'], command: 'flutter create my_app', url: 'https://flutter.dev/' },
  { id: 'm3', name: 'Ionic React', description: 'Cross-platform com tecnologias web e Capacitor.', category: 'Mobile', stack: ['React', 'Capacitor'], command: 'ionic start myApp tabs --type=react', url: 'https://ionicframework.com/' },
  { id: 'm4', name: 'KMP Compose', description: 'Kotlin Multiplatform para Android e iOS.', category: 'Mobile', stack: ['Kotlin', 'Compose'], command: 'git clone https://github.com/JetBrains/compose-multiplatform-template', url: 'https://www.jetbrains.com/lp/compose-multiplatform/' },
  { id: 'm5', name: 'NativeScript', description: 'Acesso total a APIs nativas com JS/TS.', category: 'Mobile', stack: ['JS', 'Nativo'], command: 'ns create my-app --template @nativescript/template-blank-ts', url: 'https://nativescript.org/' },
  { id: 'm6', name: 'SwiftUI Boilerplate', description: 'Ponto de partida para apps modernos da Apple.', category: 'Mobile', stack: ['Swift', 'SwiftUI'], command: 'xcode-select --install', url: 'https://developer.apple.com/xcode/' },

  // DESKTOP
  { id: 'd1', name: 'Electron Forge', description: 'Apps Desktop com ferramentas web (Chromium/Node).', category: 'Desktop', stack: ['Electron', 'React', 'Node'], command: 'npx create-electron-app my-new-app --template=typescript-webpack', url: 'https://www.electronjs.org/' },
  { id: 'd2', name: 'Tauri + Svelte', description: 'Apps desktop leves e seguros feitos com Rust.', category: 'Desktop', stack: ['Rust', 'Svelte', 'Vite'], command: 'npm create tauri-app@latest', url: 'https://tauri.app/' },
  { id: 'd3', name: 'Wails (Go)', description: 'Construa apps desktop nativos com Go e tecnologias web.', category: 'Desktop', stack: ['Go', 'React', 'Vite'], command: 'wails init -n myproject -t react', url: 'https://wails.io/' },
  { id: 'd4', name: 'NW.js', description: 'Rode apps web como nativos, acesso direto ao Node.js.', category: 'Desktop', stack: ['Node', 'HTML5'], command: 'npm install -g nw', url: 'https://nwjs.io/' },
  { id: 'd5', name: 'PySide6 (Qt)', description: 'Interfaces desktop profissionais com Python.', category: 'Desktop', stack: ['Python', 'Qt'], command: 'pip install PySide6', url: 'https://www.qt.io/qt-for-python' },

  // BACKEND
  { id: 'b1', name: 'NestJS Starter', description: 'Framework Node.js progressivo para apps escaláveis.', category: 'Backend', stack: ['Node', 'TS', 'NestJS'], command: 'npx @nestjs/cli new project-name', url: 'https://nestjs.com/', isPopular: true },
  { id: 'b2', name: 'Fastify API', description: 'O framework web mais rápido para Node.js.', category: 'Backend', stack: ['Node', 'Fastify'], command: 'npm init fastify', url: 'https://www.fastify.io/' },
  { id: 'b3', name: 'Express + Prisma', description: 'Boilerplate clássico de API com ORM moderno.', category: 'Backend', stack: ['Express', 'Prisma', 'Postgres'], command: 'npx dlx prisma init', url: 'https://www.prisma.io/' },
  { id: 'b4', name: 'Go Fiber', description: 'Framework web inspirado no Express escrito em Go.', category: 'Backend', stack: ['Go', 'Fiber'], command: 'go mod init myapp', url: 'https://gofiber.io/' },
  { id: 'b5', name: 'FastAPI (Python)', description: 'API moderna e performática baseada em tipos Python.', category: 'Backend', stack: ['Python', 'FastAPI'], command: 'pip install fastapi uvicorn', url: 'https://fastapi.tiangolo.com/' },
  { id: 'b6', name: 'Rust Axum', description: 'Framework web focado em ergonomia e modularidade.', category: 'Backend', stack: ['Rust', 'Axum', 'Tokio'], command: 'cargo new my-server', url: 'https://github.com/tokio-rs/axum' },

  // FULLSTACK
  { id: 'f1', name: 'T3 Stack', description: 'O melhor jeito de começar um app Fullstack Type-Safe.', category: 'Fullstack', stack: ['Next.js', 'tRPC', 'Prisma', 'Tailwind'], command: 'npx create-t3-app@latest', url: 'https://create.t3.gg/', isPopular: true },
  { id: 'f2', name: 'Laravel 11', description: 'Framework PHP para artesãos da web.', category: 'Fullstack', stack: ['PHP', 'Laravel', 'Blade'], command: 'composer create-project laravel/laravel my-app', url: 'https://laravel.com/' },
  { id: 'f3', name: 'Django + HTMX', description: 'Apps dinâmicos com a robustez do Django e simplicidade do HTMX.', category: 'Fullstack', stack: ['Python', 'Django', 'HTMX'], command: 'django-admin startproject mysite', url: 'https://www.djangoproject.com/' },
];

const BoilerplateGenerator: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<BoilerplateCategory>('Tudo');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return BOILERPLATES.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.stack.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === 'Tudo' || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const copyCommand = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-600/10 text-orange-500 rounded-2xl">
            <Rocket size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Project Boilerplates</h1>
            <p className="text-slate-400">Ponto de partida instantâneo para mais de 30 stacks modernas.</p>
          </div>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-4 flex flex-col lg:flex-row items-center gap-4 shadow-xl backdrop-blur-md sticky top-0 z-10">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Pesquisar por stack ou framework (ex: react, rust, go...)"
            className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-slate-100 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
           {(['Tudo', 'Web', 'Mobile', 'Desktop', 'Backend', 'Fullstack'] as BoilerplateCategory[]).map(cat => (
             <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${category === cat ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {filtered.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col group hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/5 transition-all relative overflow-hidden">
             {item.isPopular && (
               <div className="absolute top-0 right-0 p-4">
                  <div className="bg-orange-600/20 text-orange-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-orange-500/30 flex items-center gap-1.5 animate-pulse">
                    <Sparkles size={10} /> Em Alta
                  </div>
               </div>
             )}

             <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform">
                   {item.category === 'Web' && <Globe size={24} className="text-blue-400" />}
                   {item.category === 'Mobile' && <Smartphone size={24} className="text-emerald-400" />}
                   {item.category === 'Desktop' && <Monitor size={24} className="text-purple-400" />}
                   {item.category === 'Backend' && <Server size={24} className="text-orange-400" />}
                   {item.category === 'Fullstack' && <Layers size={24} className="text-pink-400" />}
                </div>
                <div>
                   <h3 className="text-lg font-black text-white leading-tight">{item.name}</h3>
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{item.category}</span>
                </div>
             </div>

             <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">{item.description}</p>

             <div className="flex flex-wrap gap-2 mb-8">
                {item.stack.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-500">
                    {s}
                  </span>
                ))}
             </div>

             <div className="space-y-4">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 group/cmd hover:border-slate-700 transition-colors">
                   <div className="flex items-center justify-between mb-2 px-1">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
                        <Terminal size={10} /> Comando de Instalação
                      </span>
                      <button 
                        onClick={() => copyCommand(item.id, item.command)}
                        className={`text-[10px] font-bold transition-all ${copiedId === item.id ? 'text-green-500' : 'text-orange-500 hover:text-orange-400'}`}
                      >
                         {copiedId === item.id ? <Check size={12} className="inline mr-1" /> : <Copy size={12} className="inline mr-1" />}
                         {copiedId === item.id ? 'Copiado!' : 'Copiar'}
                      </button>
                   </div>
                   <code className="text-xs font-mono text-slate-300 break-all bg-slate-900/50 p-2 rounded-lg block">
                      {item.command}
                   </code>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full h-12 rounded-2xl border-slate-800 group/link"
                  onClick={() => window.open(item.url, '_blank')}
                >
                   Documentação <ExternalLink size={14} className="ml-2 opacity-30 group-hover/link:opacity-100 transition-all" />
                </Button>
             </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center space-y-6">
           <div className="p-8 bg-slate-900 rounded-[3rem] border border-slate-800 w-fit mx-auto">
             <Code2 size={64} className="text-slate-800" />
           </div>
           <div className="space-y-2">
             <h3 className="text-xl font-bold text-white">Nenhum boilerplate encontrado</h3>
             <p className="text-slate-500">Tente buscar por termos mais genéricos ou mude a categoria.</p>
           </div>
           <Button variant="outline" onClick={() => {setSearch(''); setCategory('Tudo');}}>
             Limpar Filtros
           </Button>
        </div>
      )}

      {/* Footer Disclaimer */}
      <div className="p-6 bg-orange-600/5 border border-orange-500/10 rounded-[2rem] flex gap-4 text-xs leading-relaxed text-slate-500">
         <div className="p-2 bg-orange-500/10 rounded-xl h-fit">
            <Zap size={20} className="text-orange-500" />
         </div>
         <div className="space-y-1">
            <p className="font-bold text-slate-200 uppercase tracking-tighter">Dica Pro</p>
            <p>A maioria desses boilerplates exige que você tenha o <strong className="text-slate-400">Node.js (LTS)</strong> instalado em sua máquina. Para stacks em Rust, Go ou Python, certifique-se de ter os respectivos runtimes configurados no seu <code className="text-orange-400">$PATH</code>.</p>
         </div>
      </div>
    </div>
  );
};

export default BoilerplateGenerator;
