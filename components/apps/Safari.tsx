import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock, Shield } from 'lucide-react';

const Safari: React.FC = () => {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [iframeSrc, setIframeSrc] = useState('https://www.wikipedia.org');

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = url;
    if (!target.startsWith('http')) {
        target = 'https://' + target;
    }
    setIframeSrc(target);
    setUrl(target);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4 space-x-4">
        <div className="flex space-x-4 text-gray-600">
            <ArrowLeft size={18} className="cursor-pointer hover:text-black" />
            <ArrowRight size={18} className="cursor-pointer hover:text-black opacity-50" />
            <RotateCw size={16} className="cursor-pointer hover:text-black" />
        </div>

        {/* Address Bar */}
        <form onSubmit={handleNavigate} className="flex-1 flex justify-center">
            <div className="relative w-full max-w-2xl">
                <input 
                    type="text" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-gray-200/50 hover:bg-gray-200 focus:bg-white border border-transparent focus:border-blue-400 rounded-lg py-1.5 pl-10 pr-4 text-sm text-center focus:text-left transition-all outline-none"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Lock size={12} fill="currentColor" />
                </div>
            </div>
        </form>
        
        <div className="flex space-x-4 text-gray-500">
            <Shield size={16} />
        </div>
      </div>

      {/* Content Area - using iframe but restrictive due to headers on many sites */}
      <div className="flex-1 bg-white relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm pointer-events-none z-0">
             Browser Preview
        </div>
        <iframe 
            src={iframeSrc} 
            className="w-full h-full border-none relative z-10"
            title="Browser"
            sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
    </div>
  );
};

export default Safari;