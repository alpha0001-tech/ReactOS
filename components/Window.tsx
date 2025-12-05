import React, { useRef, useState, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { WindowState, AppID } from '../types';

interface WindowProps {
  windowState: WindowState;
  onClose: (id: AppID) => void;
  onMinimize: (id: AppID) => void;
  onFocus: (id: AppID) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ windowState, onClose, onMinimize, onFocus, children }) => {
  const { id, title, position, size, zIndex, isMinimized, isMaximized } = windowState;
  const windowRef = useRef<HTMLDivElement>(null);
  
  // Local state for dragging
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState(position);

  // Sync prop position to local state (unless dragging)
  useEffect(() => {
    if (!isDragging) {
      setCurrentPos(position);
    }
  }, [position, isDragging]);

  if (isMinimized) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    onFocus(id);
    if ((e.target as HTMLElement).closest('.window-controls')) return; // Don't drag if clicking controls

    if (windowRef.current) {
        // Prevent text selection during drag
        document.body.style.userSelect = 'none';
        
        const rect = windowRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setIsDragging(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        setCurrentPos({ x: newX, y: newY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
        setIsDragging(false);
        document.body.style.userSelect = '';
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        // Here you would technically update the global store with the new final position
    }
  };

  return (
    <div
      ref={windowRef}
      style={{
        left: currentPos.x,
        top: currentPos.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100vh - 32px)' : size.height, // Subtract menu bar
        zIndex: zIndex,
        transform: 'translate3d(0,0,0)',
        position: 'absolute',
      }}
      className={`
        flex flex-col bg-mac-window backdrop-blur-2xl rounded-xl shadow-2xl border border-white/40 overflow-hidden
        transition-shadow duration-200
        ${isMaximized ? 'rounded-none top-8 left-0 !transform-none' : ''}
        ${zIndex === 50 ? 'shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 'shadow-xl'}
      `}
      onPointerDown={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div
        className="h-9 flex items-center justify-between px-4 bg-transparent select-none cursor-default"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="flex space-x-2 window-controls group">
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-black/50 transition-colors"
          >
            <X size={8} className="opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-black/50 transition-colors"
          >
             <Minus size={8} className="opacity-0 group-hover:opacity-100" />
          </button>
          <button 
             className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-black/50 transition-colors"
          >
             <Maximize2 size={8} className="opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="text-sm font-semibold text-gray-700 opacity-80">{title}</div>
        <div className="w-14" /> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto relative bg-white/50">
        {children}
      </div>
    </div>
  );
};

export default Window;