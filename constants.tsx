import React from 'react';
import { 
  AppWindow, 
  Compass, 
  Bot, 
  Calculator, 
  Settings, 
  FileText, 
  Image as ImageIcon 
} from 'lucide-react';
import { AppID, AppConfig } from './types';
import Finder from './components/apps/Finder';
import Safari from './components/apps/Safari';
import GeminiAssistant from './components/apps/GeminiAssistant';
import CalculatorApp from './components/apps/Calculator';
import Notes from './components/apps/Notes';

export const WALLPAPERS = [
  "https://picsum.photos/id/28/1920/1080", // Forest
  "https://picsum.photos/id/29/1920/1080", // Mountain
  "https://picsum.photos/id/10/1920/1080", // Abstract
];

export const APP_CONFIGS: Record<AppID, AppConfig> = {
  [AppID.FINDER]: {
    id: AppID.FINDER,
    title: 'Finder',
    icon: <div className="bg-blue-500 w-full h-full rounded-xl flex items-center justify-center text-white"><AppWindow size={28} /></div>,
    component: <Finder />,
    defaultWidth: 800,
    defaultHeight: 500,
  },
  [AppID.SAFARI]: {
    id: AppID.SAFARI,
    title: 'Safari',
    icon: <div className="bg-white w-full h-full rounded-xl flex items-center justify-center text-blue-500"><Compass size={32} /></div>,
    component: <Safari />,
    defaultWidth: 900,
    defaultHeight: 600,
  },
  [AppID.GEMINI]: {
    id: AppID.GEMINI,
    title: 'Gemini AI',
    icon: <div className="bg-gradient-to-tr from-blue-600 to-purple-500 w-full h-full rounded-xl flex items-center justify-center text-white"><Bot size={32} /></div>,
    component: <GeminiAssistant />,
    defaultWidth: 450,
    defaultHeight: 600,
  },
  [AppID.CALCULATOR]: {
    id: AppID.CALCULATOR,
    title: 'Calculator',
    icon: <div className="bg-gray-800 w-full h-full rounded-xl flex items-center justify-center text-white"><Calculator size={30} /></div>,
    component: <CalculatorApp />,
    defaultWidth: 280,
    defaultHeight: 400,
  },
  [AppID.NOTES]: {
    id: AppID.NOTES,
    title: 'Notes',
    icon: <div className="bg-yellow-400 w-full h-full rounded-xl flex items-center justify-center text-white"><FileText size={30} /></div>,
    component: <Notes />,
    defaultWidth: 600,
    defaultHeight: 400,
  },
  [AppID.PHOTOS]: {
    id: AppID.PHOTOS,
    title: 'Photos',
    icon: <div className="bg-white w-full h-full rounded-xl flex items-center justify-center text-pink-500"><ImageIcon size={30} /></div>,
    component: <div className="flex items-center justify-center h-full text-gray-400">Photos Gallery Placeholder</div>,
    defaultWidth: 700,
    defaultHeight: 500,
  },
  [AppID.SETTINGS]: {
    id: AppID.SETTINGS,
    title: 'Settings',
    icon: <div className="bg-gray-400 w-full h-full rounded-xl flex items-center justify-center text-gray-800"><Settings size={32} /></div>,
    component: <div className="p-8 text-center text-gray-600">Settings are controlled via the Desktop context menu.</div>,
    defaultWidth: 500,
    defaultHeight: 400,
  },
};