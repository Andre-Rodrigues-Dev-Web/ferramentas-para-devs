
import React, { useState } from 'react';
import { Copy, Check, AlignLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

const LoremIpsumGenerator: React.FC = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result = [];
    for (let p = 0; p < paragraphs; p++) {
      let sentenceCount = Math.floor(Math.random() * 4) + 4;
      let paragraph = [];
      for (let s = 0; s < sentenceCount; s++) {
        let wordCount = Math.floor(Math.random() * 8) + 10;
        let sentence = [];
        for (let w = 0; w < wordCount; w++) {
          sentence.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
        }
        let str = sentence.join(' ');
        paragraph.push(str.charAt(0).toUpperCase() + str.slice(1) + '.');
      }
      result.push(paragraph.join(' '));
    }
    setOutput(result.join('\n\n'));
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Lorem Ipsum Generator</h1>
        <p className="text-slate-400">Gere textos de preenchimento para seus layouts e designs.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-1.5">
            <label className="text-sm text-slate-400">Parágrafos</label>
            <input 
              type="number" 
              min="1" 
              max="20" 
              value={paragraphs}
              onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
          <Button onClick={generate} className="h-11">
            <AlignLeft size={18} className="mr-2" /> Gerar Texto
          </Button>
        </div>

        {output && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resultado</span>
              <button onClick={copy} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoremIpsumGenerator;
