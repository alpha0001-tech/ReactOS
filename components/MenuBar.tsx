import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search, Command } from 'lucide-react';
import { format } from 'date-fns';

interface MenuBarProps {
  activeAppTitle: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ activeAppTitle }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 w-full bg-white/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 fixed top-0 left-0 z-50 text-sm font-medium text-gray-800 shadow-sm select-none">
      <div className="flex items-center space-x-4">
        <button className="hover:opacity-70 transition-opacity">
          <Apple size={16} fill="currentColor" />
        </button>
        <span className="font-bold">{activeAppTitle}</span>
        <div className="hidden sm:flex space-x-4 text-gray-700">
          <span className="cursor-default hover:text-black">File</span>
          <span className="cursor-default hover:text-black">Edit</span>
          <span className="cursor-default hover:text-black">View</span>
          <span className="cursor-default hover:text-black">Window</span>
          <span className="cursor-default hover:text-black">Help</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center space-x-3">
          <Battery size={18} />
          <Wifi size={16} />
          <Search size={16} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block cursor-default">
             <Command size={14} className="inline mr-1" />
          </span>
          <span>{format(time, 'EEE MMM d h:mm aa')}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;