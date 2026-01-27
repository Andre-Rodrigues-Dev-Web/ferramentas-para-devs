
import React, { useState, useMemo } from 'react';
import { Cpu, Copy, Check, Download, Shield, Zap, Info, Server, Globe, FileCode } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { Input } from '../../shared/ui/Input';

interface NginxConfig {
  domain: string;
  rootPath: string;
  proxyPass: string;
  isProxy: boolean;
  useSsl: boolean;
  useGzip: boolean;
  wwwRedirect: boolean;
  accessLog: boolean;
  errorLog: boolean;
  phpSupport: boolean;
  securityHeaders: boolean;
}

const NginxConfigTool: React.FC = () => {
  const [config, setConfig] = useState<NginxConfig>({
    domain: 'example.com',
    rootPath: '/var/www/example',
    proxyPass: 'http://localhost:3000',
    isProxy: false,
    useSsl: true,
    useGzip: true,
    wwwRedirect: true,
    accessLog: true,
    errorLog: true,
    phpSupport: false,
    securityHeaders: true,
  });

  const [copied, setCopied] = useState(false);

  const generatedConfig = useMemo(() => {
    let output = `server {\n`;
    output += `    listen 80;\n`;
    output += `    server_name ${config.domain}${config.wwwRedirect ? ` www.${config.domain}` : ''};\n\n`;

    if (config.useSsl) {
      output += `    # Redirect HTTP to HTTPS\n`;
      output += `    return 301 https://$server_name$request_uri;\n`;
      output += `}\n\n`;
      output += `server {\n`;
      output += `    listen 443 ssl http2;\n`;
      output += `    server_name ${config.domain}${config.wwwRedirect ? ` www.${config.domain}` : ''};\n\n`;
      output += `    ssl_certificate /etc/letsencrypt/live/${config.domain}/fullchain.pem;\n`;
      output += `    ssl_certificate_key /etc/letsencrypt/live/${config.domain}/privkey.pem;\n\n`;
    }

    if (config.useGzip) {
      output += `    gzip on;\n`;
      output += `    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;\n\n`;
    }

    if (config.securityHeaders) {
      output += `    add_header X-Frame-Options "SAMEORIGIN";\n`;
      output += `    add_header X-XSS-Protection "1; mode=block";\n`;
      output += `    add_header X-Content-Type-Options "nosniff";\n\n`;
    }

    if (config.accessLog) output += `    access_log /var/log/nginx/${config.domain}.access.log;\n`;
    if (config.errorLog) output += `    error_log /var/log/nginx/${config.domain}.error.log;\n\n`;

    if (config.isProxy) {
      output += `    location / {\n`;
      output += `        proxy_pass ${config.proxyPass};\n`;
      output += `        proxy_http_version 1.1;\n`;
      output += `        proxy_set_header Upgrade $http_upgrade;\n`;
      output += `        proxy_set_header Connection 'upgrade';\n`;
      output += `        proxy_set_header Host $host;\n`;
      output += `        proxy_cache_bypass $http_upgrade;\n`;
      output += `    }\n`;
    } else {
      output += `    root ${config.rootPath};\n`;
      output += `    index index.html index.htm${config.phpSupport ? ' index.php' : ''};\n\n`;
      output += `    location / {\n`;
      output += `        try_files $uri $uri/ /index.html;\n`;
      output += `    }\n`;

      if (config.phpSupport) {
        output += `\n    location ~ \\.php$ {\n`;
        output += `        include snippets/fastcgi-php.conf;\n`;
        output += `        fastcgi_pass unix:/var/run/php/php-fpm.sock;\n`;
        output += `    }\n`;
      }
    }

    output += `}`;
    return output;
  }, [config]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadConfig = () => {
    const blob = new Blob([generatedConfig], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.domain}.conf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-600/10 text-emerald-500 rounded-2xl">
            <Cpu size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Nginx Config Generator</h1>
            <p className="text-slate-400">Gere arquivos de configuração robustos para seus servidores Nginx.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadConfig} disabled={!config.domain}>
            <Download size={16} className="mr-2" /> Baixar .conf
          </Button>
          <Button onClick={copyToClipboard} disabled={!config.domain} className="bg-emerald-600 hover:bg-emerald-700">
            {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
            {copied ? 'Copiado' : 'Copiar Config'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 space-y-6 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
               <Server size={18} className="text-emerald-500" />
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Servidor & Domínio</h3>
            </div>

            <div className="space-y-4">
               <Input 
                label="Domínio Principal" 
                value={config.domain} 
                onChange={(e) => setConfig({...config, domain: e.target.value})}
                placeholder="exemplo.com"
               />

               <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-all cursor-pointer" onClick={() => setConfig({...config, isProxy: !config.isProxy})}>
                  <div className="space-y-0.5">
                     <p className="text-sm font-bold text-white">Reverse Proxy</p>
                     <p className="text-[10px] text-slate-500 uppercase">Redirecionar para um app (Node, Go, Python...)</p>
                  </div>
                  <div className={`w-10 h-5 rounded-full transition-colors relative ${config.isProxy ? 'bg-emerald-600' : 'bg-slate-800'}`}>
                     <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${config.isProxy ? 'translate-x-5' : ''}`}></div>
                  </div>
               </div>

               {config.isProxy ? (
                  <Input 
                    label="Proxy Pass (Backend URL)" 
                    value={config.proxyPass} 
                    onChange={(e) => setConfig({...config, proxyPass: e.target.value})}
                    placeholder="http://localhost:3000"
                  />
               ) : (
                  <>
                    <Input 
                      label="Caminho Root" 
                      value={config.rootPath} 
                      onChange={(e) => setConfig({...config, rootPath: e.target.value})}
                      placeholder="/var/www/html"
                    />
                    <ToggleItem label="Suporte PHP-FPM" checked={config.phpSupport} onChange={(v) => setConfig({...config, phpSupport: v})} />
                  </>
               )}
            </div>

            <div className="flex items-center gap-2 border-b border-slate-800 pb-4 pt-4">
               <Shield size={18} className="text-emerald-500" />
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Segurança & Performance</h3>
            </div>

            <div className="space-y-3">
               <ToggleItem label="Habilitar SSL (HTTPS)" checked={config.useSsl} onChange={(v) => setConfig({...config, useSsl: v})} />
               <ToggleItem label="Headers de Segurança" checked={config.securityHeaders} onChange={(v) => setConfig({...config, securityHeaders: v})} />
               <ToggleItem label="Compressão Gzip" checked={config.useGzip} onChange={(v) => setConfig({...config, useGzip: v})} />
               <ToggleItem label="WWW Redirect" checked={config.wwwRedirect} onChange={(v) => setConfig({...config, wwwRedirect: v})} />
               <div className="grid grid-cols-2 gap-3">
                  <ToggleItem label="Access Logs" checked={config.accessLog} onChange={(v) => setConfig({...config, accessLog: v})} />
                  <ToggleItem label="Error Logs" checked={config.errorLog} onChange={(v) => setConfig({...config, errorLog: v})} />
               </div>
            </div>
          </div>

          <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-slate-400">
             <Info size={18} className="text-blue-500 flex-shrink-0" />
             <p>Certifique-se de que o caminho do Certificado SSL aponta para os arquivos corretos gerados pelo <code className="text-emerald-400 font-bold">Certbot</code>.</p>
          </div>
        </div>

        {/* Right: Output Preview */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl h-[700px]">
             <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-emerald-600/10 text-emerald-500 rounded-xl">
                      <FileCode size={20} />
                   </div>
                   <h3 className="text-sm font-bold text-white uppercase tracking-widest">Nginx Configuration</h3>
                </div>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500 uppercase">Preview</span>
                </div>
             </div>

             <div className="flex-1 bg-slate-950 p-6 overflow-auto custom-scrollbar relative group">
                <pre className="text-emerald-400 code-font text-xs leading-relaxed">
                   {generatedConfig}
                </pre>
                
                {/* Visual Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full"></div>
             </div>

             <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                <p className="text-[10px] text-slate-600 font-bold uppercase flex items-center gap-2">
                   <Zap size={10} className="text-emerald-500" /> Otimizado para sites modernos
                </p>
                <div className="flex items-center gap-4">
                   <Globe size={14} className="text-slate-800" />
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleItem = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) => (
  <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer" onClick={() => onChange(!checked)}>
    <span className="text-xs font-medium text-slate-300">{label}</span>
    <div className={`w-8 h-4 rounded-full transition-colors relative ${checked ? 'bg-emerald-600' : 'bg-slate-800'}`}>
      <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${checked ? 'translate-x-4' : ''}`}></div>
    </div>
  </div>
);

export default NginxConfigTool;
