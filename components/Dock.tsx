import React from 'react';
import { APP_CONFIGS } from '../constants';
import { AppID } from '../types';

interface DockProps {
  onAppClick: (id: AppID) => void;
  openApps: AppID[];
  activeApp: AppID | null;
}

const Dock: React.FC<DockProps> = ({ onAppClick, openApps, activeApp }) => {
  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/20 backdrop-blur-2xl border border-white/20 rounded-2xl px-2 py-2 flex items-end space-x-2 shadow-2xl mb-2">
        {Object.values(APP_CONFIGS).map((app) => {
          const isOpen = openApps.includes(app.id);
          const isActive = activeApp === app.id;
          
          return (
            <div key={app.id} className="group relative flex flex-col items-center">
              {/* Tooltip */}
              <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-md mb-2 whitespace-nowrap pointer-events-none">
                {app.title}
              </div>

              <button
                onClick={() => onAppClick(app.id)}
                className={`
                  w-12 h-12 sm:w-14 sm:h-14 rounded-2xl transition-all duration-200 ease-in-out
                  hover:scale-125 hover:-translate-y-2 active:scale-95 active:translate-y-0
                  flex items-center justify-center shadow-lg
                `}
              >
                {app.icon}
              </button>
              
              {/* Indicator Dot */}
              <div className={`w-1 h-1 rounded-full bg-gray-800 mt-1 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;