import React from 'react';
import { Folder, FileImage, FileText, HardDrive, Clock, Cloud, Download, Home } from 'lucide-react';
import { FileItem } from '../../types';

const SIDEBAR_ITEMS = [
  { icon: <Clock size={16} />, label: 'Recents' },
  { icon: <HardDrive size={16} />, label: 'Applications', active: true },
  { icon: <Cloud size={16} />, label: 'iCloud Drive' },
  { icon: <Home size={16} />, label: 'Desktop' },
  { icon: <FileText size={16} />, label: 'Documents' },
  { icon: <Download size={16} />, label: 'Downloads' },
];

const FILES: FileItem[] = [
  { name: 'Projects', type: 'folder' },
  { name: 'Vacation.png', type: 'image', size: '2.4 MB' },
  { name: 'Resume.pdf', type: 'text', size: '450 KB' },
  { name: 'Notes.txt', type: 'text', size: '12 KB' },
  { name: 'Design Assets', type: 'folder' },
  { name: 'Screenshot 2024...', type: 'image', size: '1.2 MB' },
  { name: 'Budget.xlsx', type: 'text', size: '24 KB' },
];

const Finder: React.FC = () => {
  return (
    <div className="flex h-full text-sm">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50/50 backdrop-blur-md border-r border-gray-200/50 p-2 flex flex-col space-y-1">
        <div className="text-xs font-semibold text-gray-400 px-3 py-1 mt-2">Favorites</div>
        {SIDEBAR_ITEMS.map((item, idx) => (
          <button 
            key={idx}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md w-full text-left transition-colors ${item.active ? 'bg-gray-200/60 text-gray-900' : 'text-gray-600 hover:bg-gray-200/30'}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Toolbar */}
        <div className="h-10 border-b border-gray-100 flex items-center px-4 space-x-4 text-gray-500">
            <span className="font-semibold text-gray-700">Applications</span>
        </div>
        
        {/* Grid */}
        <div className="p-4 grid grid-cols-4 gap-4 overflow-y-auto">
          {FILES.map((file, idx) => (
            <div key={idx} className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 cursor-default group">
              <div className="w-16 h-16 flex items-center justify-center mb-2 text-blue-500 group-hover:scale-105 transition-transform">
                {file.type === 'folder' && <Folder size={64} fill="currentColor" className="text-blue-400" />}
                {file.type === 'image' && <FileImage size={56} className="text-purple-400" />}
                {file.type === 'text' && <FileText size={56} className="text-gray-400" />}
              </div>
              <span className="text-center text-gray-700 truncate w-full px-1">{file.name}</span>
              <span className="text-xs text-gray-400">{file.size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finder;