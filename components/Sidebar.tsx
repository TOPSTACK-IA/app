
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Code2, 
  Cpu, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  TrendingUp,
  Megaphone,
  Lock,
  Building2,
  Layers,
  ExternalLink,
  ShoppingBag,
  GraduationCap,
  Box,
  BarChart4,
  Grip
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
    { id: 'services', label: 'Catálogo Serviços', icon: Layers },
    { id: 'projects', label: 'Projetos Software', icon: Code2 },
    { id: 'marketing', label: 'Marketing 360', icon: Megaphone },
    { id: 'companies', label: 'Minhas Empresas', icon: Building2 },
    { id: 'automations', label: 'IA & Automações', icon: Cpu },
    { id: 'google-ads', label: 'Tools Tráfego', icon: TrendingUp },
    { id: 'access', label: 'Gestão de Acessos', icon: Lock },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  // Softwares externos (Simulação de Subdomínios)
  const ecosystemApps = [
    { name: 'CRM', fullName: 'TOP CRM', url: '#', icon: Box, color: 'text-blue-500', from: 'from-blue-500/20', to: 'to-blue-600/20', border: 'group-hover:border-blue-500/50' },
    { name: 'ERP', fullName: 'TOP ERP', url: '#', icon: BarChart4, color: 'text-purple-500', from: 'from-purple-500/20', to: 'to-purple-600/20', border: 'group-hover:border-purple-500/50' },
    { name: 'Shop', fullName: 'TOP SHOP', url: '#', icon: ShoppingBag, color: 'text-pink-500', from: 'from-pink-500/20', to: 'to-pink-600/20', border: 'group-hover:border-pink-500/50' },
    { name: 'EAD', fullName: 'TOP LEARN', url: '#', icon: GraduationCap, color: 'text-yellow-500', from: 'from-yellow-500/20', to: 'to-yellow-600/20', border: 'group-hover:border-yellow-500/50' },
  ];

  return (
    <aside 
      className={`bg-white dark:bg-[#09090b] border-r border-gray-200 dark:border-white/5 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] relative z-30 ${
        isCollapsed ? 'w-[88px]' : 'w-[280px]'
      }`}
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-topstack-teal text-white rounded-full p-1.5 shadow-lg shadow-topstack-teal/20 z-40 hover:scale-110 transition-transform flex items-center justify-center border-2 border-white dark:border-black"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      <div className={`h-24 flex items-center ${isCollapsed ? 'justify-center' : 'justify-start px-8'}`}>
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
            className="w-10 h-10 object-contain rounded-xl transition-all duration-300 dark:brightness-0 dark:invert"
          />
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar pb-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewType)}
            className={`w-full flex items-center rounded-2xl transition-all duration-300 group relative overflow-hidden ${
              isCollapsed ? 'justify-center p-3.5' : 'justify-between px-4 py-3.5'
            } ${
              currentView === item.id
                ? 'bg-topstack-teal text-white shadow-lg shadow-topstack-teal/25'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                currentView === item.id ? 'text-white' : 'group-hover:text-gray-900 dark:group-hover:text-white'
              }`} />
              {!isCollapsed && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
            </div>
            
            {/* Tooltip for collapsed */}
            {isCollapsed && (
               <div className="absolute left-16 ml-2 px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-300 z-50 whitespace-nowrap shadow-xl">
                 {item.label}
               </div>
            )}
          </button>
        ))}
      </nav>

      {/* Ecosystem Apps Section (Launchpad) */}
      <div className="p-4 mt-auto">
        <div className={`bg-gray-50 dark:bg-zinc-900/50 rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-500 ${isCollapsed ? 'p-2' : 'p-4'}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-2 mb-4 px-1">
              <Grip className="w-3.5 h-3.5 text-gray-400" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Ecossistema
              </p>
            </div>
          )}
          
          <div className={`grid gap-2 ${isCollapsed ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {ecosystemApps.map((app) => (
              <a
                key={app.name}
                href={app.url}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl transition-all group relative border border-transparent hover:shadow-lg dark:hover:shadow-black/50 overflow-hidden ${
                   app.border
                } ${isCollapsed ? 'p-3 aspect-square' : 'p-3 aspect-video bg-white dark:bg-black/40'}`}
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${app.from} ${app.to} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <app.icon className={`w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110 ${app.color}`} />
                
                {!isCollapsed && (
                  <div className="text-center relative z-10">
                    <span className="font-black text-[10px] text-gray-600 dark:text-gray-300 uppercase tracking-wider block">{app.name}</span>
                  </div>
                )}
                
                {/* Tooltip for collapsed */}
                {isCollapsed && (
                   <div className="absolute left-16 ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-300 z-50 whitespace-nowrap shadow-xl flex items-center gap-2">
                     {app.fullName} <ExternalLink className="w-3 h-3 text-gray-500" />
                   </div>
                )}
              </a>
            ))}
          </div>

          {!isCollapsed && (
             <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/5 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                   </span>
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Online</span>
                </div>
                <span className="text-[10px] font-bold text-gray-300 dark:text-zinc-700">v2.4.0</span>
             </div>
          )}
        </div>
      </div>
    </aside>
  );
};
