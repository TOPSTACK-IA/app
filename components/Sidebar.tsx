
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Code2, 
  Cpu, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  TrendingUp 
} from 'lucide-react';
import { ASSETS } from '../constants';
import { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'projects', label: 'Projetos Software', icon: Code2 },
    { id: 'automations', label: 'IA & Automações', icon: Cpu },
    { id: 'google-ads', label: 'Tools Tráfego', icon: TrendingUp },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside 
      className={`bg-white dark:bg-matte-black border-r border-gray-200 dark:border-zinc-800 flex flex-col transition-all duration-300 relative z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-topstack-teal text-white rounded-full p-1 shadow-lg z-40 hover:scale-110 transition-transform flex items-center justify-center"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className={`p-6 mb-2 flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        {!isCollapsed ? (
          <img 
            src={ASSETS.logoFull} 
            alt="TOPSTACK" 
            className="h-7 w-auto object-contain transition-all duration-300 dark:brightness-0 dark:invert"
          />
        ) : (
          <img 
            src={ASSETS.logoSquare} 
            alt="T" 
            className="w-8 h-8 object-contain rounded-md transition-all duration-300 dark:brightness-0 dark:invert"
          />
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewType)}
            className={`w-full flex items-center rounded-xl transition-all group relative ${
              isCollapsed ? 'justify-center p-3' : 'justify-between px-3 py-2.5'
            } ${
              currentView === item.id
                ? 'bg-topstack-teal/10 text-topstack-teal'
                : 'text-gray-600 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 flex-shrink-0 ${currentView === item.id ? 'text-topstack-teal' : 'text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200'}`} />
              {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
            </div>
            {isCollapsed && (
               <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap font-bold uppercase tracking-wider">
                 {item.label}
               </div>
            )}
          </button>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="p-4 mt-auto border-t border-gray-200 dark:border-zinc-800">
          <div className="bg-topstack-teal/5 rounded-xl p-3 border border-topstack-teal/10">
            <p className="text-[10px] text-topstack-teal uppercase font-bold mb-1">Status do Sistema</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">Agentes Online</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
