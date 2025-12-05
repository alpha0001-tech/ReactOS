import { ReactNode } from 'react';

export enum AppID {
  FINDER = 'finder',
  SAFARI = 'safari',
  GEMINI = 'gemini',
  CALCULATOR = 'calculator',
  SETTINGS = 'settings',
  NOTES = 'notes',
  PHOTOS = 'photos'
}

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface AppConfig {
  id: AppID;
  title: string;
  icon: ReactNode;
  component: ReactNode;
  defaultWidth: number;
  defaultHeight: number;
}

export interface FileItem {
  name: string;
  type: 'folder' | 'image' | 'text' | 'app';
  size?: string;
  date?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}