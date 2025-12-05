import React, { useState, useCallback } from 'react';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import Window from './components/Window';
import { AppID, WindowState } from './types';
import { APP_CONFIGS, WALLPAPERS } from './constants';

const App: React.FC = () => {
  const [openApps, setOpenApps] = useState<AppID[]>([AppID.FINDER]); // Start with Finder open
  const [activeAppId, setActiveAppId] = useState<AppID | null>(AppID.FINDER);
  
  // State for all window properties
  const [windows, setWindows] = useState<Record<AppID, WindowState>>({
    [AppID.FINDER]: createInitialWindowState(AppID.FINDER),
    [AppID.SAFARI]: createInitialWindowState(AppID.SAFARI),
    [AppID.GEMINI]: createInitialWindowState(AppID.GEMINI),
    [AppID.CALCULATOR]: createInitialWindowState(AppID.CALCULATOR),
    [AppID.SETTINGS]: createInitialWindowState(AppID.SETTINGS),
    [AppID.NOTES]: createInitialWindowState(AppID.NOTES),
    [AppID.PHOTOS]: createInitialWindowState(AppID.PHOTOS),
  });

  const [wallpaperIndex, setWallpaperIndex] = useState(0);

  function createInitialWindowState(id: AppID): WindowState {
    const config = APP_CONFIGS[id];
    // Randomish starting position
    const startX = 100 + Math.random() * 50;
    const startY = 100 + Math.random() * 50;
    return {
      id,
      title: config.title,
      isOpen: id === AppID.FINDER, // Only Finder starts open
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: startX, y: startY },
      size: { width: config.defaultWidth, height: config.defaultHeight },
    };
  }

  const focusApp = useCallback((id: AppID) => {
    setActiveAppId(id);
    
    // Bring to front logic
    setWindows(prev => {
      const newWindows = { ...prev };
      // Find highest z-index currently
      const maxZ = Math.max(...Object.values(newWindows).map((w: WindowState) => w.zIndex));
      
      if (newWindows[id].zIndex !== maxZ) {
        newWindows[id] = { ...newWindows[id], zIndex: maxZ + 1 };
      }
      return newWindows;
    });
  }, []);

  const openApp = (id: AppID) => {
    if (!openApps.includes(id)) {
      setOpenApps(prev => [...prev, id]);
    }

    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false }
    }));
    
    focusApp(id);
  };

  const closeApp = (id: AppID) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    setOpenApps(prev => prev.filter(appId => appId !== id));
    if (activeAppId === id) setActiveAppId(null);
  };

  const minimizeApp = (id: AppID) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    setActiveAppId(null);
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
      // If clicking directly on desktop background, defocus everything
      if (e.target === e.currentTarget) {
          setActiveAppId(null);
      }
  };

  const changeWallpaper = () => {
    setWallpaperIndex((prev) => (prev + 1) % WALLPAPERS.length);
  };

  return (
    <div 
        className="w-screen h-screen overflow-hidden relative bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${WALLPAPERS[wallpaperIndex]})` }}
        onContextMenu={(e) => {
            e.preventDefault();
            changeWallpaper(); // Hidden feature: right click to change wallpaper
        }}
        onClick={handleDesktopClick}
    >
      {/* Overlay for "active" app dimming effect or similar could go here */}
      
      <MenuBar activeAppTitle={activeAppId ? APP_CONFIGS[activeAppId].title : 'Finder'} />

      {/* Windows Area */}
      <div className="absolute top-8 bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        {openApps.map(appId => {
            const appState = windows[appId];
            if (!appState.isOpen) return null;

            return (
                <div key={appId} className="pointer-events-auto">
                    <Window 
                        windowState={appState}
                        onClose={closeApp}
                        onMinimize={minimizeApp}
                        onFocus={focusApp}
                    >
                        {APP_CONFIGS[appId].component}
                    </Window>
                </div>
            );
        })}
      </div>

      <Dock 
        onAppClick={openApp} 
        openApps={openApps} 
        activeApp={activeAppId} 
      />
      
      {/* Desktop Context Hint */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/50 text-xl font-light pointer-events-none select-none">
        {openApps.length === 0 && "Right click to change wallpaper"}
      </div>
    </div>
  );
};

export default App;