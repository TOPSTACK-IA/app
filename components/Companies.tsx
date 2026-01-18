
import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  UserPlus, 
  Briefcase, 
  Plus, 
  Search, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  ShieldCheck, 
  MoreVertical,
  Filter,
  LayoutGrid,
  List,
  X,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CrudActions } from './CrudActions';

type TabType = 'companies' | 'teams' | 'members';

interface Company {
  id: string;
  name: string;
  cnpj: string;
  sector: string;
  status: 'Ativa' | 'Inativa' | 'Pendente';
  location: string;
  logo: string;
  website: string;
}

interface Team {
  id: string;
  name: string;
  companyId: string;
  department: string;
  leader: string;
  membersCount: number;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Gestor' | 'Operacional' | 'Visualizador';
  companyId: string;
  status: 'Ativo' | 'Pendente' | 'Bloqueado';
  avatar: string;
}

export const Companies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('companies');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data
  const companies: Company[] = [
    { id: '1', name: 'Voigt Consultoria', cnpj: '12.345.678/0001-90', sector: 'Jurídico', status: 'Ativa', location: 'Curitiba, PR', website: 'voigt.adv.br', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop' },
    { id: '2', name: 'Topstack Tech', cnpj: '98.765.432/0001-10', sector: 'Tecnologia', status: 'Ativa', location: 'Porto Alegre, RS', website: 'topstack.com.br', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop' },
  ];

  const teams: Team[] = [
    { id: '1', name: 'Squad Alpha', companyId: '2', department: 'Desenvolvimento', leader: 'Carlos Silva', membersCount: 5 },
    { id: '2', name: 'Marketing Q4', companyId: '1', department: 'Marketing', leader: 'Ana Paula', membersCount: 3 },
  ];

  const members: Member[] = [
    { id: '1', name: 'Administrador Voigt', email: 'admin@voigt.com.br', role: 'Admin', companyId: '1', status: 'Ativo', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    { id: '2', name: 'Julia Marketing', email: 'julia@voigt.com.br', role: 'Gestor', companyId: '1', status: 'Ativo', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: '3', name: 'Dev Fullstack', email: 'dev@topstack.com.br', role: 'Operacional', companyId: '2', status: 'Pendente', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa': case 'Ativo': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Pendente': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Inativa': case 'Bloqueado': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
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

  return (
    <div className="space-y-8 w-full animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Minhas Empresas</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Gerencie organizações, equipes e permissões de acesso.</p>
        </div>
        <PrimaryButton onClick={() => setIsCreateModalOpen(true)} icon={Plus}>
          {activeTab === 'companies' ? 'Nova Empresa' : activeTab === 'teams' ? 'Nova Equipe' : 'Convidar Membro'}
        </PrimaryButton>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Empresas Ativas', value: companies.length, icon: Building2, color: 'text-topstack-teal' },
          { label: 'Total de Equipes', value: teams.length, icon: Users, color: 'text-blue-500' },
          { label: 'Colaboradores', value: members.length, icon: Briefcase, color: 'text-purple-500' },
          { label: 'Convites Pendentes', value: members.filter(m => m.status === 'Pendente').length, icon: UserPlus, color: 'text-orange-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-matte-black p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 flex items-center gap-4 shadow-sm group hover:border-topstack-teal/30 transition-all">
            <div className={`p-3 rounded-xl bg-opacity-10 ${stat.color.replace('text-', 'bg-')} group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 dark:border-zinc-800 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('companies')}
          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'companies' ? 'text-topstack-teal' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
        >
          <Building2 className="w-4 h-4" /> Organizações
          {activeTab === 'companies' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-topstack-teal"></span>}
        </button>
        <button 
          onClick={() => setActiveTab('teams')}
          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'teams' ? 'text-topstack-teal' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
        >
          <Users className="w-4 h-4" /> Equipes e Departamentos
          {activeTab === 'teams' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-topstack-teal"></span>}
        </button>
        <button 
          onClick={() => setActiveTab('members')}
          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'members' ? 'text-topstack-teal' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
        >
          <UserPlus className="w-4 h-4" /> Membros e Acessos
          {activeTab === 'members' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-topstack-teal"></span>}
        </button>
      </div>

      {/* Search Filter */}
      <div className="bg-white dark:bg-matte-black p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder={`Buscar em ${activeTab === 'companies' ? 'empresas' : activeTab === 'teams' ? 'equipes' : 'membros'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-topstack-teal/50 text-gray-900 dark:text-white transition-all"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* COMPANIES TAB */}
        {activeTab === 'companies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.map(company => (
              <div key={company.id} className="bg-white dark:bg-matte-black rounded-[2rem] border border-gray-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-xl hover:shadow-topstack-teal/5 transition-all group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-topstack-teal/5 blur-[40px] rounded-full group-hover:bg-topstack-teal/10 transition-colors"></div>
                 
                 <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                       <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 overflow-hidden p-1">
                          <img src={company.logo} alt={company.name} className="w-full h-full object-cover rounded-xl" />
                       </div>
                       <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{company.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{company.sector}</p>
                       </div>
                    </div>
                    <CrudActions 
                       itemName={company.name}
                       onView={() => setViewingItem(company)}
                       onEdit={() => {}}
                       onDelete={() => {}}
                    />
                 </div>

                 <div className="space-y-4 relative z-10">
                    <div className="grid grid-cols-2 gap-3">
                       <div className="p-3 bg-gray-50 dark:bg-zinc-900/30 rounded-xl border border-gray-100 dark:border-zinc-800">
                          <p className="text-[9px] text-gray-400 font-black uppercase tracking-wider mb-1">CNPJ</p>
                          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 font-mono">{company.cnpj}</p>
                       </div>
                       <div className="p-3 bg-gray-50 dark:bg-zinc-900/30 rounded-xl border border-gray-100 dark:border-zinc-800">
                          <p className="text-[9px] text-gray-400 font-black uppercase tracking-wider mb-1">Website</p>
                          <div className="flex items-center gap-1 text-xs font-bold text-topstack-teal cursor-pointer hover:underline">
                             <Globe className="w-3 h-3" /> {company.website}
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                       <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">{company.location}</span>
                       </div>
                       <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${getStatusColor(company.status)}`}>
                          {company.status}
                       </span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* TEAMS TAB */}
        {activeTab === 'teams' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {teams.map(team => (
                <div key={team.id} className="bg-white dark:bg-matte-black rounded-[1.5rem] border border-gray-200 dark:border-zinc-800 p-6 shadow-sm hover:border-topstack-teal/50 transition-all group">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400">
                         <Users className="w-6 h-6" />
                      </div>
                      <CrudActions itemName={team.name} onView={() => {}} onEdit={() => {}} onDelete={() => {}} />
                   </div>
                   
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{team.name}</h3>
                   <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-6 uppercase tracking-wider">{team.department}</p>

                   <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-gray-500 dark:text-gray-400">Líder:</span>
                         <span className="font-bold text-gray-900 dark:text-white">{team.leader}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-gray-500 dark:text-gray-400">Membros:</span>
                         <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                               {[...Array(3)].map((_, i) => (
                                  <div key={i} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-800 border-2 border-white dark:border-matte-black"></div>
                               ))}
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white">+{team.membersCount - 3}</span>
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        )}

        {/* MEMBERS TAB */}
        {activeTab === 'members' && (
           <div className="bg-white dark:bg-matte-black rounded-[2rem] border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-zinc-900/50 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold border-b border-gray-100 dark:border-zinc-800">
                      <th className="px-6 py-4">Nome / Email</th>
                      <th className="px-6 py-4">Função</th>
                      <th className="px-6 py-4">Empresa</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50">
                     {members.map(member => (
                       <tr key={member.id} className="hover:bg-gray-50/80 dark:hover:bg-zinc-900/40 transition-all">
                          <td className="px-6 py-5">
                             <div className="flex items-center gap-3">
                                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-zinc-800" />
                                <div>
                                   <p className="text-sm font-bold text-gray-900 dark:text-white">{member.name}</p>
                                   <p className="text-[10px] text-gray-500 font-medium">{member.email}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-5">
                             <div className="flex items-center gap-1.5">
                                <ShieldCheck className={`w-3.5 h-3.5 ${member.role === 'Admin' ? 'text-topstack-teal' : 'text-gray-400'}`} />
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{member.role}</span>
                             </div>
                          </td>
                          <td className="px-6 py-5">
                             <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {companies.find(c => c.id === member.companyId)?.name || 'N/A'}
                             </span>
                          </td>
                          <td className="px-6 py-5">
                             <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wide border ${getStatusColor(member.status)}`}>
                                {member.status}
                             </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                             <CrudActions itemName={member.name} onView={() => {}} onEdit={() => {}} onDelete={() => {}} />
                          </td>
                       </tr>
                     ))}
                  </tbody>
                </table>
              </div>
           </div>
        )}
      </div>

      {/* CREATE MODAL - Dynamic based on activeTab */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsCreateModalOpen(false)}></div>
           <div className="w-full max-w-[500px] bg-white dark:bg-[#050505] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/5">
              <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50">
                 <h2 className="text-[10px] font-black tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                    {activeTab === 'companies' ? 'Nova Organização' : activeTab === 'teams' ? 'Criar Equipe' : 'Convidar Colaborador'}
                 </h2>
                 <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                 {/* Form for Companies */}
                 {activeTab === 'companies' && (
                    <>
                       <div className="space-y-3">
                          <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Razão Social / Nome</label>
                          <input type="text" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                             <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">CNPJ</label>
                             <input type="text" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                          </div>
                          <div className="space-y-3">
                             <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Setor</label>
                             <select className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white">
                                <option>Tecnologia</option>
                                <option>Jurídico</option>
                                <option>Varejo</option>
                                <option>Saúde</option>
                             </select>
                          </div>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Localização</label>
                          <input type="text" placeholder="Cidade, UF" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                       </div>
                    </>
                 )}

                 {/* Form for Teams */}
                 {activeTab === 'teams' && (
                    <>
                       <div className="space-y-3">
                          <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Nome da Equipe</label>
                          <input type="text" placeholder="Ex: Squad Marketing" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Empresa Vinculada</label>
                          <select className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white">
                             {companies.map(c => <option key={c.id}>{c.name}</option>)}
                          </select>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Líder / Responsável</label>
                          <input type="text" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                       </div>
                    </>
                 )}

                 {/* Form for Members */}
                 {activeTab === 'members' && (
                    <>
                       <div className="space-y-3">
                          <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">E-mail Corporativo</label>
                          <input type="email" placeholder="colaborador@empresa.com" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                             <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Função</label>
                             <select className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white">
                                <option>Visualizador</option>
                                <option>Operacional</option>
                                <option>Gestor</option>
                                <option>Admin</option>
                             </select>
                          </div>
                          <div className="space-y-3">
                             <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Empresa</label>
                             <select className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white">
                                {companies.map(c => <option key={c.id}>{c.name}</option>)}
                             </select>
                          </div>
                       </div>
                    </>
                 )}
              </div>

              <div className="p-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-6 bg-gray-50 dark:bg-black/80 backdrop-blur-xl">
                 <button onClick={() => setIsCreateModalOpen(false)} className="text-zinc-600 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
                    Cancelar
                 </button>
                 <button onClick={() => setIsCreateModalOpen(false)} className="h-11 px-8 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg bg-topstack-teal text-white hover:brightness-110 active:scale-95">
                    <Save className="w-4 h-4" /> Salvar Registro
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
