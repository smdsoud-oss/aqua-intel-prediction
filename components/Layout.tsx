
import React from 'react';
import { AppScreen } from '../types';
import { Droplets, Info, Home as HomeIcon, FileText, Clock } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between shadow-sm">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate(AppScreen.HOME)}
        >
          <div className="bg-[#2563EB] p-2 rounded-lg text-white">
            <Droplets size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#2563EB]">Aqua-Intel</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate(AppScreen.HOME)}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${currentScreen === AppScreen.HOME ? 'text-[#2563EB]' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <HomeIcon size={18} /> Home
          </button>
          <button 
            onClick={() => onNavigate(AppScreen.DATA_INPUT)}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${currentScreen === AppScreen.DATA_INPUT ? 'text-[#2563EB]' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <FileText size={18} /> Analysis
          </button>
          <button 
            onClick={() => onNavigate(AppScreen.HISTORY)}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${currentScreen === AppScreen.HISTORY ? 'text-[#2563EB]' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Clock size={18} /> History
          </button>
          <button 
            onClick={() => onNavigate(AppScreen.ABOUT)}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${currentScreen === AppScreen.ABOUT ? 'text-[#2563EB]' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <Info size={18} /> About
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E7EB] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm font-medium">
            © 2024 Aqua-Intel TN. Sustainable Groundwater Management.
          </div>
          <div className="flex gap-6 text-gray-400">
            <span className="text-xs font-semibold">SDG 6: Clean Water</span>
            <span className="text-xs font-semibold">SDG 2: Zero Hunger</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
