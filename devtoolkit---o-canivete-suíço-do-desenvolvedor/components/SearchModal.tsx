
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { TOOLS } from '../toolsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTools = query.trim() === '' 
    ? [] 
    : TOOLS.filter(tool => 
        tool.title.toLowerCase().includes(query.toLowerCase()) ||
        tool.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredTools.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (filteredTools[selectedIndex]) {
        navigate(`/tool/${filteredTools[selectedIndex].slug}`);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={20} /> : <Icons.HelpCircle size={20} />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 border-b border-slate-800">
          <Icons.Search className="text-slate-500" size={20} />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-none focus:ring-0 py-4 px-3 text-slate-100 placeholder:text-slate-500"
            placeholder="Qual ferramenta você precisa?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-slate-700 bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-500">ESC</kbd>
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {filteredTools.length > 0 ? (
            <div className="p-2">
              {filteredTools.map((tool, idx) => (
                <div
                  key={tool.id}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                    idx === selectedIndex ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                  }`}
                  onClick={() => {
                    navigate(`/tool/${tool.slug}`);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="flex items-center gap-3">
                    <span className={idx === selectedIndex ? 'text-white' : 'text-blue-400'}>
                      {getIcon(tool.icon)}
                    </span>
                    <div>
                      <div className="font-medium text-sm">{tool.title}</div>
                      <div className={`text-xs ${idx === selectedIndex ? 'text-blue-100' : 'text-slate-500'}`}>
                        {tool.category}
                      </div>
                    </div>
                  </div>
                  <Icons.ChevronRight size={16} className={idx === selectedIndex ? 'text-white' : 'text-slate-600'} />
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="p-8 text-center text-slate-500">
              <Icons.SearchX size={40} className="mx-auto mb-3 opacity-20" />
              <p>Nenhuma ferramenta encontrada para "{query}"</p>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              <p>Digite o nome da ferramenta ou categoria...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
