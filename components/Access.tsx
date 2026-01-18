
import React, { useState } from 'react';
import { 
  Lock, 
  Globe, 
  Server, 
  Database, 
  Key, 
  Shield, 
  Plus, 
  Search, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  MoreVertical,
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube,
  Twitter,
  Mail,
  X,
  Save,
  AlertTriangle
} from 'lucide-react';
import { CrudActions } from './CrudActions';

type AccessType = 'social' | 'infra';

interface Credential {
  id: string;
  title: string;
  username: string; // ou token key
  password?: string; // mockado
  platform?: 'Instagram' | 'Facebook' | 'LinkedIn' | 'Google' | 'TikTok' | 'Twitter';
  type?: 'Servidor' | 'Banco de Dados' | 'Token API' | 'E-mail';
  status: 'Ativo' | 'Inativo' | 'Expirado';
  lastSync?: string;
  expiry?: string;
}

export const Access: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AccessType>('social');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState<Credential | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mock Data
  const socialCredentials: Credential[] = [
    { id: '1', title: 'Instagram Institucional', username: '@voigtconsultoria_', platform: 'Instagram', status: 'Ativo', lastSync: '14/01/2026', password: 'password123' },
    { id: '2', title: 'Facebook Page', username: 'Voigt Consultoria', platform: 'Facebook', status: 'Ativo', lastSync: '10/01/2026', password: 'fb_pass_secure' },
    { id: '3', title: 'LinkedIn Company', username: 'company/voigt-consultoria', platform: 'LinkedIn', status: 'Inativo', lastSync: '01/12/2025', password: 'linked_in_pass' },
  ];

  const infraCredentials: Credential[] = [
    { id: '4', title: 'AWS EC2 Production', username: 'admin_root', type: 'Servidor', status: 'Ativo', expiry: 'Nunca', password: 'aws-prod-key-xv9' },
    { id: '5', title: 'PostgreSQL Master', username: 'db_admin', type: 'Banco de Dados', status: 'Ativo', expiry: '30 dias', password: 'db-complex-pass' },
    { id: '6', title: 'OpenAI API Key', username: 'sk-proj-...', type: 'Token API', status: 'Expirado', expiry: 'Ontem', password: 'sk-proj-expired' },
  ];

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="w-8 h-8 text-pink-600" />;
      case 'Facebook': return <Facebook className="w-8 h-8 text-blue-600" />;
      case 'LinkedIn': return <Linkedin className="w-8 h-8 text-blue-700" />;
      case 'Google': return <Globe className="w-8 h-8 text-red-500" />;
      case 'Twitter': return <Twitter className="w-8 h-8 text-sky-500" />;
      default: return <Globe className="w-8 h-8 text-gray-400" />;
    }
  };

  const getInfraIcon = (type?: string) => {
    switch (type) {
      case 'Servidor': return <Server className="w-5 h-5 text-purple-500" />;
      case 'Banco de Dados': return <Database className="w-5 h-5 text-blue-500" />;
      case 'Token API': return <Key className="w-5 h-5 text-yellow-500" />;
      case 'E-mail': return <Mail className="w-5 h-5 text-red-500" />;
      default: return <Lock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'text-topstack-teal';
      case 'Inativo': return 'text-gray-400';
      case 'Expirado': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const PrimaryButton = ({ onClick, children, icon: Icon }: { onClick?: () => void, children?: React.ReactNode, icon?: any }) => (
    <button 
      onClick={onClick}
      className="h-11 px-8 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg bg-topstack-teal text-white hover:brightness-110 active:scale-95 whitespace-nowrap"
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );

  const currentData = activeTab === 'social' ? socialCredentials : infraCredentials;

  return (
    <div className="space-y-8 w-full animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Gestão de Acessos</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Centralize logins, senhas e tokens com segurança criptografada.</p>
        </div>
        <PrimaryButton onClick={() => setIsCreateModalOpen(true)} icon={Plus}>
          Novo Acesso
        </PrimaryButton>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 dark:border-zinc-800">
        <button 
          onClick={() => setActiveTab('social')}
          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 ${activeTab === 'social' ? 'text-topstack-teal' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
        >
          <Globe className="w-4 h-4" /> Redes Sociais
          {activeTab === 'social' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-topstack-teal"></span>}
        </button>
        <button 
          onClick={() => setActiveTab('infra')}
          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 ${activeTab === 'infra' ? 'text-topstack-teal' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
        >
          <Server className="w-4 h-4" /> Infra & Tokens
          {activeTab === 'infra' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-topstack-teal"></span>}
        </button>
      </div>

      {/* Search & Warning */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder={activeTab === 'social' ? "Buscar por rede social ou usuário..." : "Buscar por servidor ou serviço..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-matte-black border border-gray-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-topstack-teal/50 text-gray-900 dark:text-white transition-all shadow-sm"
          />
        </div>
        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl px-4 py-2 flex items-center gap-3 text-blue-600 dark:text-blue-400">
           <Shield className="w-5 h-5 flex-shrink-0" />
           <p className="text-[10px] font-medium leading-tight">Ambiente Seguro: Todas as credenciais são criptografadas (AES-256) antes do armazenamento.</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* Social Media Grid */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentData.map((cred) => (
              <div key={cred.id} className="bg-white dark:bg-matte-black rounded-[1.5rem] border border-gray-200 dark:border-zinc-800 p-0 shadow-sm hover:shadow-xl hover:shadow-topstack-teal/5 transition-all group relative overflow-hidden flex">
                <div className={`w-2 ${cred.status === 'Ativo' ? 'bg-topstack-teal' : 'bg-gray-300 dark:bg-zinc-700'}`}></div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        {getPlatformIcon(cred.platform)}
                     </div>
                     <CrudActions 
                        itemName={cred.title}
                        onView={() => { setViewingItem(cred); setShowPassword(false); }}
                        onEdit={() => {}}
                        onDelete={() => {}}
                     />
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{cred.platform}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{cred.username}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${cred.status === 'Ativo' ? 'bg-topstack-teal animate-pulse' : 'bg-gray-400'}`}></div>
                       <span className={`text-[10px] font-black uppercase tracking-widest ${getStatusColor(cred.status)}`}>{cred.status}</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SINC: {cred.lastSync}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Infra & Tokens List */}
        {activeTab === 'infra' && (
          <div className="bg-white dark:bg-matte-black rounded-[2rem] border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-zinc-900/50 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold border-b border-gray-100 dark:border-zinc-800">
                    <th className="px-6 py-4">Serviço / Nome</th>
                    <th className="px-6 py-4">Tipo</th>
                    <th className="px-6 py-4">Credencial (Mascarada)</th>
                    <th className="px-6 py-4">Validade</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50">
                   {currentData.map(cred => (
                     <tr key={cred.id} className="hover:bg-gray-50/80 dark:hover:bg-zinc-900/40 transition-all">
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg">
                                 {getInfraIcon(cred.type)}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-gray-900 dark:text-white">{cred.title}</p>
                                 <p className="text-[10px] text-gray-500 font-bold uppercase">{cred.username}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-zinc-900 text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase tracking-wide border border-gray-200 dark:border-zinc-800">
                              {cred.type}
                           </span>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-2">
                              <code className="bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded text-xs font-mono text-gray-500">••••••••••••••</code>
                              <button 
                                onClick={() => handleCopy(cred.password || '', cred.id)} 
                                className="p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg text-gray-400 hover:text-topstack-teal transition-all relative"
                              >
                                 {copiedId === cred.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                           </div>
                        </td>
                        <td className="px-6 py-5 text-xs font-bold text-gray-500 dark:text-gray-400">
                           {cred.expiry}
                        </td>
                        <td className="px-6 py-5 text-right">
                           <CrudActions 
                              itemName={cred.title}
                              onView={() => { setViewingItem(cred); setShowPassword(false); }}
                              onEdit={() => {}}
                              onDelete={() => {}}
                           />
                        </td>
                     </tr>
                   ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsCreateModalOpen(false)}></div>
           <div className="w-full max-w-[500px] bg-white dark:bg-[#050505] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/5">
              <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50">
                 <h2 className="text-[10px] font-black tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                    {activeTab === 'social' ? 'Novo Canal Estratégico' : 'Nova Credencial Infra'}
                 </h2>
                 <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1 flex items-center gap-2">
                       {activeTab === 'social' ? <Globe className="w-3.5 h-3.5" /> : <Server className="w-3.5 h-3.5" />}
                       {activeTab === 'social' ? 'Plataforma de Distribuição' : 'Tipo de Acesso'}
                    </label>
                    <select className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white">
                      {activeTab === 'social' 
                        ? ['Instagram', 'Facebook', 'LinkedIn', 'Google', 'TikTok', 'Twitter'].map(o => <option key={o}>{o}</option>)
                        : ['Servidor', 'Banco de Dados', 'Token API', 'E-mail', 'Painel Admin'].map(o => <option key={o}>{o}</option>)
                      }
                    </select>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1 flex items-center gap-2">
                       <Check className="w-3.5 h-3.5" />
                       {activeTab === 'social' ? 'Nome de Usuário / Email' : 'Identificador / Host'}
                    </label>
                    <input type="text" placeholder={activeTab === 'social' ? "@perfil ou email@empresa.com.br" : "192.168.x.x ou api_key_name"} className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1 flex items-center gap-2">
                       <Lock className="w-3.5 h-3.5" />
                       Senha (Para referência rápida)
                    </label>
                    <div className="relative">
                       <input 
                         type={showPassword ? "text" : "password"} 
                         placeholder="••••••••" 
                         className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl pl-4 pr-12 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" 
                       />
                       <button 
                         type="button" 
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                       >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                       </button>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Disponibilidade</label>
                    <div className="flex bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-xl p-1">
                       <button className="flex-1 py-2 bg-[#051929] dark:bg-topstack-teal/10 text-white dark:text-topstack-teal rounded-lg text-[10px] font-black uppercase tracking-wider shadow-md">Ativo</button>
                       <button className="flex-1 py-2 text-gray-500 dark:text-zinc-500 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">Inativo</button>
                    </div>
                 </div>

                 <div className="p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl flex gap-3 items-start">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed text-blue-800 dark:text-blue-300 font-medium italic">
                       As informações de acesso são criptografadas e utilizadas apenas para fins de registro interno da Voigt Consultoria. Nunca compartilhe sua senha mestra.
                    </p>
                 </div>
              </div>

              <div className="p-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-6 bg-gray-50 dark:bg-black/80 backdrop-blur-xl">
                 <button onClick={() => setIsCreateModalOpen(false)} className="text-zinc-600 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
                    Descartar
                 </button>
                 <button onClick={() => setIsCreateModalOpen(false)} className="h-11 px-8 rounded-md font-black text-[10px] uppercase tracking-[0.1em] flex items-center justify-center gap-3 transition-all shadow-lg bg-slate-500 text-white hover:brightness-110 active:scale-95 w-full max-w-[200px]">
                    <Save className="w-4 h-4" /> Salvar no Banco
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewingItem && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setViewingItem(null)}></div>
           <div className="w-full max-w-[450px] bg-white dark:bg-[#0a0a0a] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/5">
              <div className="p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50 flex justify-between items-start">
                 <div className="flex gap-4">
                    <div className="p-4 bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-zinc-800">
                       {viewingItem.platform ? getPlatformIcon(viewingItem.platform) : getInfraIcon(viewingItem.type)}
                    </div>
                    <div>
                       <div className="flex items-center gap-3 mb-1">
                          <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{viewingItem.title}</h1>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${getStatusColor(viewingItem.status)} bg-opacity-10 bg-current`}>{viewingItem.status}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">ID: {viewingItem.id}</p>
                       </div>
                    </div>
                 </div>
                 <button onClick={() => setViewingItem(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 p-8 space-y-8 bg-white dark:bg-[#0a0a0a]">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Usuário / Login</label>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800">
                       <span className="text-sm font-bold text-gray-900 dark:text-white font-mono">{viewingItem.username}</span>
                       <button onClick={() => handleCopy(viewingItem.username, 'user')} className="text-gray-400 hover:text-topstack-teal transition-colors">
                          {copiedId === 'user' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                       </button>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Senha / Chave de Acesso</label>
                    <div className="relative group">
                       <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800">
                          <span className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                             {showPassword ? viewingItem.password : '•••••••••••••••••••••'}
                          </span>
                          <div className="flex items-center gap-2">
                             <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-topstack-teal transition-colors">
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                             </button>
                             <button onClick={() => handleCopy(viewingItem.password || '', 'pass')} className="text-gray-400 hover:text-topstack-teal transition-colors">
                                {copiedId === 'pass' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                             </button>
                          </div>
                       </div>
                       {!showPassword && (
                          <div className="absolute inset-0 bg-gray-100/10 dark:bg-zinc-800/10 backdrop-blur-[2px] rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                             <span className="bg-black/80 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider">Oculto</span>
                          </div>
                       )}
                    </div>
                 </div>

                 <div className="p-4 bg-yellow-50 dark:bg-yellow-500/5 border border-yellow-100 dark:border-yellow-500/10 rounded-2xl flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                       <h4 className="text-xs font-bold text-yellow-700 dark:text-yellow-500 mb-1">Área Sensível</h4>
                       <p className="text-[10px] leading-relaxed text-yellow-800 dark:text-yellow-600 font-medium">
                          Qualquer alteração ou visualização desta senha fica registrada nos logs de auditoria do sistema.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black/80 backdrop-blur-xl flex justify-between items-center">
                 <button className="h-11 px-6 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all border border-gray-200 dark:border-zinc-800 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-900">
                    Editar
                 </button>
                 <button className="h-11 px-8 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg bg-topstack-teal text-white hover:brightness-110 active:scale-95">
                    <Save className="w-4 h-4" /> Salvar
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
