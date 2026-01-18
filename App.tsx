
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { GoogleAdsTools } from './components/GoogleAdsTools';
import { Settings } from './components/Settings';
import { Projects } from './components/Projects';
import { Automations } from './components/Automations';
import { Marketing } from './components/Marketing';
import { Access } from './components/Access';
import { Companies } from './components/Companies';
import { Services } from './components/Services';
import { Login } from './components/Login';

export type ViewType = 'overview' | 'projects' | 'marketing' | 'companies' | 'services' | 'automations' | 'google-ads' | 'access' | 'settings';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('topstack-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('topstack-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('topstack-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleLogout = () => setIsLoggedIn(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-black transition-colors duration-300">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-black custom-scrollbar">
          {currentView === 'overview' && <Dashboard />}
          {currentView === 'services' && <Services />}
          {currentView === 'projects' && <Projects />}
          {currentView === 'marketing' && <Marketing />}
          {currentView === 'companies' && <Companies />}
          {currentView === 'google-ads' && <GoogleAdsTools />}
          {currentView === 'access' && <Access />}
          {currentView === 'settings' && <Settings onLogout={handleLogout} />}
          {currentView === 'automations' && <Automations />}
        </main>
      </div>
    </div>
  );
};

export default App;
