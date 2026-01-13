
import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Shield, 
  Key, 
  Mail, 
  Phone, 
  Image as ImageIcon, 
  Save, 
  Plus, 
  Check, 
  X,
  AlertTriangle,
  Trash2,
  Lock,
  MoreVertical,
  Eye,
  EyeOff,
  Edit2,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { CrudActions } from './CrudActions';

interface SettingsProps {
  onLogout: () => void;
}

type SettingsTab = 'profile' | 'security' | 'permissions';

interface Role {
  id: string;
  name: string;
  visual: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  pages: string[];
}

export const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isEditingLevel, setIsEditingLevel] = useState(false);
  const [viewingLevel, setViewingLevel] = useState<Role | null>(null);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  
  // Estado para edição de permissões
  const [editLevelPerms, setEditLevelPerms] = useState({
    visual: true,
    create: true,
    edit: true,
    delete: false
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: Role[] = [
    { id: '1', name: 'ADM', visual: true, create: true, edit: true, delete: true, pages: ['DASHBOARD', 'GENERATOR', 'HISTORY', 'PLANNER', 'CREATIVES', 'TEAM', 'POSTS', 'SETTINGS'] },
    { id: '2', name: 'Supervisor', visual: true, create: true, edit: true, delete: false, pages: ['DASHBOARD', 'GENERATOR', 'HISTORY', 'PLANNER', 'CREATIVES'] },
    { id: '3', name: 'Colaborador', visual: true, create: true, edit: true, delete: false, pages: ['GENERATOR', 'PLANNER', 'CREATIVES'] },
    { id: '4', name: 'Cliente', visual: true, create: false, edit: false, delete: false, pages: ['DASHBOARD', 'HISTORY'] },
  ];

  const ActionMenu = ({ onEdit, label }: { onEdit: () => void, label: string }) => (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl z-50 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
      <button 
        onClick={() => { onEdit(); setActiveMenu(null); }}
        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-topstack-teal/10 hover:text-topstack-teal flex items-center gap-3 transition-colors"
      >
        <Edit2 className="w-4 h-4 text-topstack-teal" /> Editar {label}
      </button>
    </div>
  );

  const PrimaryButton = ({ onClick, children, disabled, icon: Icon }: { onClick?: () => void, children?: React.ReactNode, disabled?: boolean, icon?: any }) => (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`h-11 px-8 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-2xl active:scale-95 whitespace-nowrap ${
        disabled 
          ? 'bg-white/10 text-white/20 cursor-not-allowed border border-white/5' 
          : 'bg-white text-black hover:bg-gray-200 shadow-white/10'
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );

  const handleEditOpen = (role?: Role) => {
    if (role) {
      setEditLevelPerms({
        visual: role.visual,
        create: role.create,
        edit: role.edit,
        delete: role.delete
      });
    } else {
      setEditLevelPerms({ visual: true, create: true, edit: true, delete: false });
    }
    setIsEditingLevel(true);
  };

  const togglePerm = (key: keyof typeof editLevelPerms) => {
    setEditLevelPerms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full max-w-7xl pb-20">
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Configurações</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gerencie sua conta e níveis de acesso da equipe.</p>
        </div>

        <div className="flex p-1 bg-gray-100 dark:bg-zinc-900/50 rounded-2xl w-fit border border-gray-200 dark:border-zinc-800">
          {['profile', 'security', 'permissions'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as SettingsTab)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab ? 'bg-white dark:bg-matte-black shadow-md text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
            >
              {tab === 'profile' && <User className="w-4 h-4" />}
              {tab === 'security' && <Shield className="w-4 h-4" />}
              {tab === 'permissions' && <Lock className="w-4 h-4" />}
              {tab === 'profile' ? 'Perfil' : tab === 'security' ? 'Segurança' : 'Permissões'}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-matte-black p-10 rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 shadow-sm relative">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4 text-topstack-teal">
                      <User className="w-6 h-6" />
                      <h2 className="font-bold text-xl dark:text-white tracking-tight">Informações do Perfil</h2>
                    </div>
                    <div className="relative" ref={activeMenu === 'profile' ? menuRef : null}>
                      <button onClick={() => setActiveMenu(activeMenu === 'profile' ? null : 'profile')} className="p-2.5 rounded-xl text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
                        <MoreVertical className="w-6 h-6" />
                      </button>
                      {activeMenu === 'profile' && <ActionMenu onEdit={() => setIsEditingProfile(true)} label="Perfil" />}
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col items-center gap-4">
                      <div className={`w-36 h-36 rounded-[2rem] bg-zinc-900 flex items-center justify-center overflow-hidden border-2 transition-all ${isEditingProfile ? 'border-topstack-teal shadow-2xl shadow-topstack-teal/10 scale-105' : 'border-white/5'} group cursor-pointer relative`}>
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover" />
                        {isEditingProfile && <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm"><ImageIcon className="text-white w-8 h-8" /></div>}
                      </div>
                    </div>

                    <div className="flex-1 space-y-8">
                      <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.25em] ml-1">Nome de Exibição</label>
                          <input 
                            type="text" 
                            disabled={!isEditingProfile} 
                            defaultValue="Administrador Voigt" 
                            className={`w-full h-14 bg-zinc-900/40 border-2 rounded-2xl px-6 text-sm font-bold focus:outline-none transition-all dark:text-white disabled:opacity-40 ${isEditingProfile ? 'border-topstack-teal/40 focus:ring-2 focus:ring-topstack-teal/20 text-white' : 'border-white/5'}`} 
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.25em] ml-1 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-zinc-500" /> WhatsApp</label>
                            <input 
                              type="text" 
                              disabled={!isEditingProfile} 
                              defaultValue="(41) 99305-3612" 
                              className={`w-full h-14 bg-zinc-900/40 border-2 rounded-2xl px-6 text-sm font-bold focus:outline-none transition-all dark:text-white disabled:opacity-40 ${isEditingProfile ? 'border-topstack-teal/40 focus:ring-2 focus:ring-topstack-teal/20 text-white' : 'border-white/5'}`} 
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.25em] ml-1 flex items-center gap-2"><ImageIcon className="w-3.5 h-3.5 text-zinc-500" /> URL do Avatar</label>
                            <input 
                              type="text" 
                              disabled={!isEditingProfile} 
                              defaultValue="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
                              className={`w-full h-14 bg-zinc-900/40 border-2 rounded-2xl px-6 text-sm font-bold focus:outline-none transition-all dark:text-white disabled:opacity-40 ${isEditingProfile ? 'border-topstack-teal/40 focus:ring-2 focus:ring-topstack-teal/20 text-white' : 'border-white/5'}`} 
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end items-center gap-8 pt-6">
                        {isEditingProfile && (
                          <button onClick={() => setIsEditingProfile(false)} className="text-zinc-600 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors">
                            Cancelar
                          </button>
                        )}
                        <PrimaryButton 
                          onClick={() => setIsEditingProfile(false)} 
                          disabled={!isEditingProfile} 
                          icon={Save}
                        >
                          Salvar Perfil
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
              {/* Seção E-mail */}
              <div className="bg-white dark:bg-matte-black p-10 rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4 text-topstack-teal">
                    <Mail className="w-6 h-6" />
                    <h2 className="font-bold text-xl dark:text-white tracking-tight">Alterar E-mail</h2>
                  </div>
                  <div className="relative" ref={activeMenu === 'email' ? menuRef : null}>
                    <button onClick={() => setActiveMenu(activeMenu === 'email' ? null : 'email')} className="p-2.5 rounded-xl text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
                      <MoreVertical className="w-6 h-6" />
                    </button>
                    {activeMenu === 'email' && <ActionMenu onEdit={() => setIsEditingEmail(true)} label="E-mail" />}
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.25em] ml-1">E-mail de Acesso</label>
                    <input 
                      type="email" 
                      disabled={!isEditingEmail}
                      defaultValue="contato@voigtadvogados.com.br" 
                      className={`w-full h-14 bg-zinc-900/40 border-2 rounded-2xl px-6 text-sm font-bold focus:outline-none transition-all dark:text-white disabled:opacity-40 ${isEditingEmail ? 'border-topstack-teal/40 focus:ring-2 focus:ring-topstack-teal/20 text-white' : 'border-white/5'}`} 
                    />
                  </div>
                  <div className="flex justify-end items-center gap-8 pt-4">
                    {isEditingEmail && (
                      <button onClick={() => setIsEditingEmail(false)} className="text-zinc-600 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors">
                        Cancelar
                      </button>
                    )}
                    <PrimaryButton 
                      onClick={() => setIsEditingEmail(false)} 
                      disabled={!isEditingEmail} 
                      icon={Save}
                    >
                      Atualizar E-mail
                    </PrimaryButton>
                  </div>
                </div>
              </div>

              {/* Seção Senha */}
              <div className="bg-white dark:bg-matte-black p-10 rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 shadow-sm relative">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4 text-purple-500">
                    <Key className="w-6 h-6" />
                    <h2 className="font-bold text-xl dark:text-white tracking-tight">Alterar Senha</h2>
                  </div>
                  <div className="relative" ref={activeMenu === 'password' ? menuRef : null}>
                    <button onClick={() => setActiveMenu(activeMenu === 'password' ? null : 'password')} className="p-2.5 rounded-xl text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
                      <MoreVertical className="w-6 h-6" />
                    </button>
                    {activeMenu === 'password' && <ActionMenu onEdit={() => setIsEditingPassword(true)} label="Senha" />}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.25em] ml-1">Nova Senha</label>
                    <div className="relative">
                      <input 
                        type={showNewPassword ? "text" : "password"} 
                        disabled={!isEditingPassword}
                        placeholder="••••••••" 
                        className={`w-full h-14 bg-zinc-900/40 border-2 rounded-2xl pl-6 pr-14 text-sm font-bold focus:outline-none transition-all dark:text-white disabled:opacity-40 ${isEditingPassword ? 'border-topstack-teal/40 focus:ring-2 focus:ring-topstack-teal/20 text-white' : 'border-white/5'}`} 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.25em] ml-1">Confirmar Senha</label>
                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        disabled={!isEditingPassword}
                        placeholder="••••••••" 
                        className={`w-full h-14 bg-zinc-900/40 border-2 rounded-2xl pl-6 pr-14 text-sm font-bold focus:outline-none transition-all dark:text-white disabled:opacity-40 ${isEditingPassword ? 'border-topstack-teal/40 focus:ring-2 focus:ring-topstack-teal/20 text-white' : 'border-white/5'}`} 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-center gap-8 pt-4">
                  {isEditingPassword && (
                    <button onClick={() => setIsEditingPassword(false)} className="text-zinc-600 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors">
                      Cancelar
                    </button>
                  )}
                  <PrimaryButton 
                    onClick={() => setIsEditingPassword(false)} 
                    disabled={!isEditingPassword} 
                    icon={Lock}
                  >
                    Alterar Senha
                  </PrimaryButton>
                </div>
              </div>

              {/* Zona de Risco */}
              <div className="bg-white dark:bg-matte-black p-10 rounded-[2.5rem] border border-red-100 dark:border-red-900/20 shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[60px] rounded-full group-hover:bg-red-500/10 transition-colors"></div>
                <div className="flex flex-col gap-6">
                   <div className="flex items-center gap-4 text-red-500">
                     <AlertTriangle className="w-6 h-6" />
                     <h2 className="font-bold text-xl dark:text-white tracking-tight">Zona de Risco</h2>
                   </div>
                   <p className="text-sm text-gray-500 dark:text-gray-400 font-medium italic leading-relaxed">
                     A exclusão da conta é um processo administrativo. Seus dados de histórico e planejamento serão preservados por 30 dias antes da remoção definitiva.
                   </p>
                   <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                      <button 
                        onClick={() => setShowDeleteAccountModal(true)}
                        className="flex-1 flex items-center justify-center gap-3 h-14 w-full bg-white dark:bg-transparent border border-red-100 dark:border-red-900/30 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-50 dark:hover:bg-red-500/5 transition-all active:scale-[0.98]"
                      >
                        <Trash2 className="w-4 h-4" /> Excluir minha conta
                      </button>
                      <button 
                        onClick={onLogout}
                        className="flex-1 flex items-center justify-center gap-3 h-14 w-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-gray-600 dark:text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-100 dark:hover:bg-zinc-800/80 transition-all active:scale-[0.98]"
                      >
                        <LogOut className="w-4 h-4" /> Encerrar sessão
                      </button>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="bg-white dark:bg-matte-black rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
              <div className="p-10 border-b border-gray-100 dark:border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h2 className="font-bold text-2xl text-gray-900 dark:text-white tracking-tight">Matriz de Permissões</h2>
                  <p className="text-xs text-zinc-500 mt-1 font-bold uppercase tracking-widest">Defina os níveis de acesso da equipe.</p>
                </div>
                <button onClick={() => handleEditOpen()} className="flex items-center justify-center gap-3 h-12 px-8 bg-topstack-teal text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-topstack-teal/20">
                  <Plus className="w-5 h-5" /> Novo Nível
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-zinc-900/50 text-[10px] uppercase tracking-widest text-zinc-500 font-black border-b border-gray-100 dark:border-zinc-800">
                      <th className="px-8 py-6">Nível / Cargo</th>
                      <th className="px-8 py-6 text-center">Visualizar</th>
                      <th className="px-8 py-6 text-center">Criar</th>
                      <th className="px-8 py-6 text-center">Editar</th>
                      <th className="px-8 py-6 text-center">Excluir</th>
                      <th className="px-8 py-6">Acesso</th>
                      <th className="px-8 py-6 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50">
                    {roles.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-50/80 dark:hover:bg-zinc-900/40 transition-all group">
                        <td className="px-8 py-8 flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center font-black text-gray-900 dark:text-white text-sm tracking-tighter">{role.name.charAt(0)}</div>
                          <span className="text-sm font-black text-gray-900 dark:text-gray-100">{role.name}</span>
                        </td>
                        {[role.visual, role.create, role.edit, role.delete].map((has, idx) => (
                          <td key={idx} className="px-8 py-8 text-center">
                            <div className={`mx-auto w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${has ? 'border-topstack-teal text-topstack-teal bg-topstack-teal/5' : 'border-zinc-800 text-zinc-800'}`}>{has && <Check className="w-4 h-4" />}</div>
                          </td>
                        ))}
                        <td className="px-8 py-8"><div className="flex flex-wrap gap-1.5">{role.pages.slice(0, 3).map(p => <span key={p} className="px-2.5 py-1 bg-zinc-900 text-zinc-500 rounded-lg text-[9px] font-black tracking-widest uppercase">{p}</span>)}</div></td>
                        <td className="px-8 py-8 text-right"><CrudActions itemName={role.name} onEdit={() => handleEditOpen(role)} onDelete={() => {}} onView={() => setViewingLevel(role)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side Modal - Detalhes do Nível (Visualizar) */}
      {viewingLevel && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setViewingLevel(null)}></div>
           <div className="w-full max-w-[420px] bg-white dark:bg-[#0a0a0a] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/5">
              <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50">
                 <h2 className="text-[10px] font-black tracking-[0.2em] text-gray-900 dark:text-white uppercase">Detalhes do Nível</h2>
                 <button onClick={() => setViewingLevel(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                 <div className="space-y-2">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{viewingLevel.name}</h1>
                    <p className="text-[9px] text-zinc-500 font-bold italic tracking-[0.3em] uppercase">Visualização de permissões TOPSTACK.</p>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Visualizar', icon: Eye, has: viewingLevel.visual },
                      { label: 'Criar', icon: Plus, has: viewingLevel.create },
                      { label: 'Editar', icon: LayoutDashboard, has: viewingLevel.edit },
                      { label: 'Excluir', icon: Trash2, has: viewingLevel.delete }
                    ].map((item) => (
                      <div key={item.label} className={`flex flex-col items-center justify-center p-6 rounded-[2rem] gap-4 border-2 transition-all ${item.has ? `bg-topstack-teal/5 border-topstack-teal text-topstack-teal shadow-lg shadow-topstack-teal/5` : 'bg-gray-50 dark:bg-zinc-900/20 border-gray-100 dark:border-white/10 text-gray-400 dark:text-zinc-600'}`}>
                         <item.icon className={`w-7 h-7 ${item.has ? 'text-topstack-teal' : 'text-gray-400 dark:text-zinc-600'}`} />
                         <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${item.has ? 'text-topstack-teal' : 'text-gray-400 dark:text-zinc-600'}`}>{item.label}</span>
                      </div>
                    ))}
                 </div>

                 <div className="space-y-6 pt-2">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Páginas Liberadas</label>
                    <div className="flex flex-wrap gap-2">
                       {viewingLevel.pages.map(page => (
                         <div key={page} className="px-4 py-2 bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 rounded-xl flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-topstack-teal rounded-full shadow-lg shadow-topstack-teal/40"></div>
                            <span className="text-[9px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">{page}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black/80 backdrop-blur-xl">
                 <PrimaryButton onClick={() => setViewingLevel(null)}>Fechar Detalhes</PrimaryButton>
              </div>
           </div>
        </div>
      )}

      {/* Side Modal - Editar Nível */}
      {isEditingLevel && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsEditingLevel(false)}></div>
           <div className="w-full max-w-[460px] bg-white dark:bg-[#050505] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/5">
              <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50">
                 <h2 className="text-[10px] font-black tracking-[0.2em] text-gray-900 dark:text-white uppercase">Configurar Nível</h2>
                 <button onClick={() => setIsEditingLevel(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Identificação do Nível</label>
                    <input type="text" defaultValue="ADM" className="w-full h-11 bg-gray-50 dark:bg-zinc-900/50 border-2 border-topstack-teal/40 rounded-full px-6 text-sm font-black focus:outline-none focus:ring-2 focus:ring-topstack-teal text-gray-900 dark:text-white transition-all shadow-lg shadow-topstack-teal/5" />
                 </div>

                 <div className="space-y-5">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Permissões de Ação</label>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                         { key: 'visual', label: 'Visualizar', icon: Check },
                         { key: 'create', label: 'Criar', icon: Plus },
                         { key: 'edit', label: 'Editar', icon: Edit2 },
                         { key: 'delete', label: 'Excluir', icon: Trash2 }
                       ].map((perm) => (
                         <button 
                           key={perm.key} 
                           onClick={() => togglePerm(perm.key as keyof typeof editLevelPerms)}
                           className={`flex flex-col items-center justify-center gap-3 h-28 rounded-[2rem] border-2 transition-all ${
                             editLevelPerms[perm.key as keyof typeof editLevelPerms] 
                             ? 'bg-white dark:bg-topstack-teal/10 border-topstack-teal text-topstack-teal shadow-xl shadow-topstack-teal/10' 
                             : 'bg-transparent border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-500 hover:border-gray-300 dark:hover:border-zinc-700'
                           }`}
                         >
                            <perm.icon className={`w-6 h-6 ${editLevelPerms[perm.key as keyof typeof editLevelPerms] ? 'text-topstack-teal' : 'text-gray-400 dark:text-zinc-500'}`} />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{perm.label}</span>
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Páginas de Acesso</label>
                    <div className="flex flex-wrap gap-2">
                       {['DASHBOARD', 'GENERATOR', 'HISTORY', 'PLANNER', 'CREATIVES', 'TEAM', 'POSTS', 'SETTINGS'].map(page => (
                         <button key={page} className="h-9 px-4 bg-topstack-teal/5 border-2 border-topstack-teal/30 text-topstack-teal rounded-xl text-[9px] font-black flex items-center gap-2 hover:bg-topstack-teal hover:text-white transition-all uppercase tracking-widest">
                            <Check className="w-3 h-3" /> {page}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-10 bg-gray-50 dark:bg-black/80 backdrop-blur-xl">
                 <button onClick={() => setIsEditingLevel(false)} className="text-zinc-600 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
                    Cancelar
                 </button>
                 <PrimaryButton onClick={() => setIsEditingLevel(false)} icon={Save}>Salvar Nível</PrimaryButton>
              </div>
           </div>
        </div>
      )}

      {/* Modal de Confirmação para Excluir Conta */}
      {showDeleteAccountModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a] rounded-[3rem] w-full max-w-md shadow-2xl border border-white/10 overflow-hidden transform animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="w-24 h-24 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center text-red-500 mx-auto mb-8 shadow-inner border border-red-500/20">
                <AlertTriangle className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-black text-center text-white tracking-tighter">Excluir Conta?</h3>
              <p className="text-center text-zinc-500 mt-4 text-sm font-medium leading-relaxed">
                Esta ação é irreversível após 30 dias. Todos os seus dados de workspace e automações serão permanentemente removidos.
              </p>
            </div>
            <div className="p-8 bg-black/40 flex items-center justify-end gap-10 border-t border-white/5">
              <button 
                onClick={() => setShowDeleteAccountModal(false)}
                className="text-zinc-600 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Manter Conta
              </button>
              <button 
                onClick={() => { /* Lógica de exclusão aqui */ setShowDeleteAccountModal(false); onLogout(); }}
                className="bg-red-500 text-white h-12 px-10 rounded-full font-black text-xs flex items-center gap-3 shadow-2xl hover:bg-red-600 active:scale-95 transition-all uppercase tracking-[0.2em]"
              >
                <Trash2 className="w-4 h-4" /> Excluir Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
