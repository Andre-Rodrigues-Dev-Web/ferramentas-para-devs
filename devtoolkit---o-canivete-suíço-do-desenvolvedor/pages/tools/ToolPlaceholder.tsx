
import React from 'react';
import * as Icons from 'lucide-react';
import { Tool } from '../../types';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

interface ToolPlaceholderProps {
  tool: Tool;
}

const ToolPlaceholder: React.FC<ToolPlaceholderProps> = ({ tool }) => {
  const navigate = useNavigate();
  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={64} /> : <Icons.HelpCircle size={64} />;
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 text-slate-700 mb-4 animate-pulse">
        {getIcon(tool.icon)}
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-bold text-white">{tool.title}</h1>
        <p className="text-slate-500">
          Esta ferramenta ({tool.slug}) ainda está em desenvolvimento. Estamos trabalhando duro para trazer as melhores funcionalidades para você!
        </p>
      </div>
      <div className="pt-4 flex gap-4">
        <Button onClick={() => navigate('/')} variant="outline">
          Voltar ao Início
        </Button>
        <Button onClick={() => window.open('https://github.com', '_blank')}>
          Contribuir no GitHub
        </Button>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left opacity-40 grayscale">
         <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
           <div className="h-4 w-24 bg-slate-800 rounded mb-4"></div>
           <div className="space-y-2">
             <div className="h-2 w-full bg-slate-800 rounded"></div>
             <div className="h-2 w-2/3 bg-slate-800 rounded"></div>
           </div>
         </div>
         <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
           <div className="h-4 w-32 bg-slate-800 rounded mb-4"></div>
           <div className="space-y-2">
             <div className="h-2 w-full bg-slate-800 rounded"></div>
             <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
           </div>
         </div>
         <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
           <div className="h-4 w-20 bg-slate-800 rounded mb-4"></div>
           <div className="space-y-2">
             <div className="h-2 w-full bg-slate-800 rounded"></div>
             <div className="h-2 w-3/4 bg-slate-800 rounded"></div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default ToolPlaceholder;
