
import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-topstack-teal/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-topstack-teal/5 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center mb-10">
          <img 
            src={ASSETS.logoFull} 
            alt="TOPSTACK" 
            className="h-10 mb-2 dark:invert brightness-0"
          />
          <p className="text-gray-500 dark:text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em]">Intelligence & Innovation</p>
        </div>

        <div className="bg-white dark:bg-matte-black p-8 rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Bem-vindo</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Acesse o seu workspace TOPSTACK</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-topstack-teal/50 transition-all text-gray-900 dark:text-white"
                  placeholder="admin@topstack.com.br"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Senha de Acesso</label>
                <a href="#" className="text-[10px] font-bold text-topstack-teal hover:underline uppercase tracking-widest">Esqueci a senha</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-topstack-teal/50 transition-all text-gray-900 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-topstack-teal text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-topstack-teal/20 hover:bg-topstack-teal/90 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Entrar no Sistema
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500 font-medium text-xs">
          <ShieldCheck className="w-4 h-4 text-topstack-teal" />
          Conexão Segura TOPSTACK Enterprise
        </div>
      </div>
    </div>
  );
};
