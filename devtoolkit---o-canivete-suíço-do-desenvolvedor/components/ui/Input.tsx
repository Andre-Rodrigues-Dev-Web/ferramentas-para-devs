
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-medium text-slate-300 block">{label}</label>}
      <input
        className={`w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-medium text-slate-300 block">{label}</label>}
      <textarea
        className={`w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500 min-h-[200px] code-font ${className}`}
        {...props}
      />
    </div>
  );
};
