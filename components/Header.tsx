
import React from 'react';
import { Search, Bell, Sun, Moon, User, LogOut } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <header className="h-20 bg-white dark:bg-matte-black border-b border-gray-100 dark:border-zinc-900 flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full group">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-topstack-teal transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar projetos ou automações..."
            className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-2xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-topstack-teal/50 text-gray-900 dark:text-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400 transition-all active:scale-90"
            title={isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400 relative active:scale-90 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-matte-black shadow-sm"></span>
          </button>
        </div>

        <div className="h-10 w-[1px] bg-gray-100 dark:bg-zinc-800"></div>

        <div className="flex items-center gap-4 group cursor-pointer pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">Administrador Voigt</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mt-1.5 uppercase tracking-widest">Nível Enterprise</p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-topstack-teal/10 flex items-center justify-center text-topstack-teal border-2 border-transparent group-hover:border-topstack-teal group-hover:bg-topstack-teal/20 transition-all shadow-sm overflow-hidden">
               <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-matte-black shadow-sm"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
