
import React, { useState } from 'react';
import { 
  Megaphone, 
  BarChart3, 
  Target, 
  Calendar, 
  Image as ImageIcon, 
  Plus, 
  Search, 
  MoreVertical, 
  Filter, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Share2, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube,
  LayoutGrid,
  List,
  X,
  Save,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { CrudActions } from './CrudActions';

interface Campaign {
  id: string;
  name: string;
  platform: 'Instagram' | 'Facebook' | 'Google' | 'LinkedIn' | 'TikTok';
  status: 'Ativo' | 'Pausado' | 'Programado' | 'Finalizado';
  budget: number;
  spent: number;
  roas: number;
  clicks: number;
  ctr: number;
  objective: 'Conversão' | 'Alcance' | 'Engajamento';
}

interface Post {
  id: string;
  title: string;
  date: string;
  platform: 'Instagram' | 'LinkedIn';
  status: 'Agendado' | 'Publicado' | 'Aprovação';
  image: string;
}

export const Marketing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'planner'>('campaigns');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingCampaign, setViewingCampaign] = useState<Campaign | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Black Friday 2025 - Antecipada',
      platform: 'Instagram',
      status: 'Ativo',
      budget: 5000,
      spent: 1250,
      roas: 12.5,
      clicks: 850,
      ctr: 2.1,
      objective: 'Conversão'
    },
    {
      id: '2',
      name: 'Institucional - Branding Q4',
      platform: 'LinkedIn',
      status: 'Ativo',
      budget: 2000,
      spent: 1800,
      roas: 4.2,
      clicks: 320,
      ctr: 0.9,
      objective: 'Alcance'
    },
    {
      id: '3',
      name: 'Remarketing - Carrinho Abandonado',
      platform: 'Facebook',
      status: 'Pausado',
      budget: 1500,
      spent: 450,
      roas: 8.9,
      clicks: 120,
      ctr: 1.8,
      objective: 'Conversão'
    },
    {
      id: '4',
      name: 'Lançamento App V2 - Search',
      platform: 'Google',
      status: 'Programado',
      budget: 8000,
      spent: 0,
      roas: 0,
      clicks: 0,
      ctr: 0,
      objective: 'Conversão'
    }
  ]);

  const [posts] = useState<Post[]>([
    { id: '1', title: 'Carrossel: 5 Dicas de IA', date: 'Hoje, 18:00', platform: 'Instagram', status: 'Agendado', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200' },
    { id: '2', title: 'Case de Sucesso: Kia Sun', date: 'Amanhã, 09:00', platform: 'LinkedIn', status: 'Aprovação', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200' },
    { id: '3', title: 'Reels: Bastidores Dev', date: '15/12, 12:00', platform: 'Instagram', status: 'Publicado', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200' },
  ]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="w-5 h-5 text-pink-500" />;
      case 'Facebook': return <Facebook className="w-5 h-5 text-blue-600" />;
      case 'LinkedIn': return <Linkedin className="w-5 h-5 text-blue-700" />;
      case 'Google': return <Target className="w-5 h-5 text-red-500" />;
      case 'TikTok': return <Share2 className="w-5 h-5 text-black dark:text-white" />;
      default: return <Megaphone className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Publicado': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Pausado': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Aprovação': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Programado': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Agendado': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Marketing 360º</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Gestão integrada de campanhas, conteúdo e performance.</p>
        </div>
        <PrimaryButton onClick={() => setIsCreateModalOpen(true)} icon={Plus}>
          Nova Campanha
        </PrimaryButton>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Alcance Total', value: '1.2M', sub: '+12% vs. mês anterior', icon: Users, color: 'text-purple-500' },
          { label: 'Investimento', value: 'R$ 14.5k', sub: '72% do budget mensal', icon: DollarSign, color: 'text-green-500' },
          { label: 'ROAS Médio', value: '8.4x', sub: 'Alta eficiência', icon: TrendingUp, color: 'text-topstack-teal' },
          { label: 'Leads Gerados', value: '842', sub: 'Custo/Lead: R$ 17,20', icon: Target, color: 'text-blue-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-matte-black p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm group hover:border-topstack-teal/30 transition-all h-32">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
               </div>
               <div className={`p-2.5 rounded-xl bg-opacity-10 ${stat.color.replace('text-', 'bg-')} group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
               </div>
            </div>
            <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 dark:border-zinc-800">
        <button 
          onClick={() => setActiveTab('campaigns')}
          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'campaigns' ? 'text-topstack-teal' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
        >
          Campanhas Ativas
          {activeTab === 'campaigns' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-topstack-teal"></span>}
        </button>
        <button 
          onClick={() => setActiveTab('planner')}
          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'planner' ? 'text-topstack-teal' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
        >
          Planejador de Conteúdo
          {activeTab === 'planner' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-topstack-teal"></span>}
        </button>
      </div>

      {/* Content */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
             {/* Filter Bar */}
             <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Buscar campanhas..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white dark:bg-matte-black border border-gray-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-topstack-teal/50 text-gray-900 dark:text-white transition-all"
                  />
                </div>
                <button className="px-4 bg-white dark:bg-matte-black border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all">
                   <Filter className="w-4 h-4" />
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="bg-white dark:bg-matte-black rounded-[2rem] border border-gray-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-xl hover:shadow-topstack-teal/5 transition-all group flex flex-col h-full">
                     <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                           <div className="p-2.5 bg-gray-50 dark:bg-zinc-900/50 rounded-xl border border-gray-100 dark:border-zinc-800">
                              {getPlatformIcon(campaign.platform)}
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{campaign.platform}</p>
                              <span className={`text-[10px] font-black uppercase tracking-wider ${getStatusColor(campaign.status)} px-2 py-0.5 rounded-md`}>
                                 {campaign.status}
                              </span>
                           </div>
                        </div>
                        <CrudActions 
                           itemName={campaign.name}
                           onView={() => setViewingCampaign(campaign)}
                           onEdit={() => {}}
                           onDelete={() => {}}
                        />
                     </div>

                     <div className="mb-6 flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2">{campaign.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Objetivo: {campaign.objective}</p>
                     </div>

                     <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 dark:bg-zinc-900/30 rounded-xl border border-gray-100 dark:border-zinc-800">
                           <div className="text-center">
                              <p className="text-[9px] text-gray-400 uppercase font-bold">ROAS</p>
                              <p className="text-xs font-black text-topstack-teal">{campaign.roas}x</p>
                           </div>
                           <div className="text-center border-l border-gray-200 dark:border-zinc-800">
                              <p className="text-[9px] text-gray-400 uppercase font-bold">Clicks</p>
                              <p className="text-xs font-black text-gray-900 dark:text-white">{campaign.clicks}</p>
                           </div>
                           <div className="text-center border-l border-gray-200 dark:border-zinc-800">
                              <p className="text-[9px] text-gray-400 uppercase font-bold">CTR</p>
                              <p className="text-xs font-black text-gray-900 dark:text-white">{campaign.ctr}%</p>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                              <span className="text-gray-500">Budget Usado</span>
                              <span className="text-gray-900 dark:text-white">R$ {campaign.spent} / {campaign.budget}</span>
                           </div>
                           <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                              <div 
                                 className={`h-full rounded-full transition-all duration-1000 ease-out ${campaign.spent/campaign.budget > 0.9 ? 'bg-red-500' : 'bg-topstack-teal'}`}
                                 style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                              ></div>
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'planner' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                 <div className="bg-white dark:bg-matte-black rounded-[2rem] border border-gray-200 dark:border-zinc-800 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-lg font-bold text-gray-900 dark:text-white">Próximos Posts</h3>
                       <button className="text-[10px] font-black text-topstack-teal uppercase tracking-widest hover:underline">Ver Calendário Completo</button>
                    </div>
                    <div className="space-y-4">
                       {posts.map(post => (
                          <div key={post.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900/30 border border-gray-100 dark:border-zinc-800 hover:border-topstack-teal/30 transition-all group">
                             <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0 relative">
                                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                             </div>
                             <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                   {getPlatformIcon(post.platform)}
                                   <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${getStatusColor(post.status)}`}>{post.status}</span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">{post.title}</h4>
                                <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-1">
                                   <Clock className="w-3 h-3" /> {post.date}
                                </p>
                             </div>
                             <button className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">
                                <MoreVertical className="w-4 h-4" />
                             </button>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="bg-gradient-to-br from-topstack-teal to-teal-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-topstack-teal/20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                       <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white">
                          <ImageIcon className="w-6 h-6" />
                       </div>
                       <h3 className="text-2xl font-bold mb-2 tracking-tight">Banco de Criativos</h3>
                       <p className="text-teal-50 text-xs font-medium mb-6 leading-relaxed opacity-90">Acesse templates, imagens e vídeos aprovados para suas campanhas.</p>
                       <button className="w-full h-12 bg-white text-teal-700 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-50 transition-all shadow-lg active:scale-95">
                          Acessar Galeria
                       </button>
                    </div>
                 </div>

                 <div className="bg-white dark:bg-matte-black rounded-[2rem] border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Canais Conectados</h3>
                    <div className="space-y-3">
                       <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
                          <div className="flex items-center gap-3">
                             <Instagram className="w-5 h-5 text-pink-500" />
                             <span className="text-xs font-bold text-gray-700 dark:text-gray-300">@topstack.br</span>
                          </div>
                          <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm shadow-green-500/50"></div>
                       </div>
                       <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
                          <div className="flex items-center gap-3">
                             <Linkedin className="w-5 h-5 text-blue-700" />
                             <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Topstack Tech</span>
                          </div>
                          <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm shadow-green-500/50"></div>
                       </div>
                       <button className="w-full py-3 border border-dashed border-gray-300 dark:border-zinc-700 rounded-xl text-xs font-bold text-gray-500 hover:text-topstack-teal hover:border-topstack-teal transition-all flex items-center justify-center gap-2">
                          <Plus className="w-3 h-3" /> Conectar Novo
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsCreateModalOpen(false)}></div>
           <div className="w-full max-w-[500px] bg-white dark:bg-[#050505] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/5">
              <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50">
                 <h2 className="text-[10px] font-black tracking-[0.2em] text-gray-900 dark:text-white uppercase">Nova Campanha</h2>
                 <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Nome da Campanha</label>
                    <input type="text" placeholder="Ex: Black Friday 2025" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Plataforma</label>
                    <div className="grid grid-cols-3 gap-3">
                       {['Instagram', 'Facebook', 'Google', 'LinkedIn', 'TikTok'].map(platform => (
                          <button key={platform} className="h-12 border-2 border-gray-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-gray-500 hover:border-topstack-teal hover:text-topstack-teal transition-all focus:border-topstack-teal focus:bg-topstack-teal/5 focus:text-topstack-teal">
                             {platform}
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Orçamento (R$)</label>
                      <input type="number" placeholder="5000,00" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Objetivo</label>
                      <select className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white">
                        <option>Conversão</option>
                        <option>Alcance</option>
                        <option>Engajamento</option>
                        <option>Tráfego</option>
                      </select>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Criativos</label>
                    <div className="h-32 bg-gray-50 dark:bg-zinc-900/50 border-2 border-dashed border-gray-300 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-topstack-teal/50 hover:bg-topstack-teal/5 transition-all text-gray-400">
                       <ImageIcon className="w-8 h-8" />
                       <span className="text-[10px] font-bold uppercase tracking-wider">Upload ou Selecionar da Galeria</span>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-6 bg-gray-50 dark:bg-black/80 backdrop-blur-xl">
                 <button onClick={() => setIsCreateModalOpen(false)} className="text-zinc-600 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
                    Cancelar
                 </button>
                 <button onClick={() => setIsCreateModalOpen(false)} className="h-11 px-8 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg bg-topstack-teal text-white hover:brightness-110 active:scale-95">
                    <Save className="w-4 h-4" /> Criar Campanha
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* View Campaign Modal */}
      {viewingCampaign && (
         <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setViewingCampaign(null)}></div>
            <div className="w-full max-w-[600px] bg-white dark:bg-[#0a0a0a] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/5">
               <div className="p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50 flex justify-between items-start">
                  <div className="flex gap-4">
                     <div className="p-4 bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-zinc-800">
                        {getPlatformIcon(viewingCampaign.platform)}
                     </div>
                     <div>
                        <div className="flex items-center gap-3 mb-1">
                           <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{viewingCampaign.name}</h1>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${getStatusColor(viewingCampaign.status)}`}>{viewingCampaign.status}</span>
                           <span className="text-xs text-gray-500">•</span>
                           <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">ID: {viewingCampaign.id}</p>
                        </div>
                     </div>
                  </div>
                  <button onClick={() => setViewingCampaign(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
               </div>

               <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-gray-50 dark:bg-zinc-900/30 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Orçamento Total</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">R$ {viewingCampaign.budget}</p>
                     </div>
                     <div className="p-4 bg-gray-50 dark:bg-zinc-900/30 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Valor Gasto</p>
                        <p className="text-xl font-bold text-topstack-teal">R$ {viewingCampaign.spent}</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-sm font-bold text-gray-900 dark:text-white">Performance</h3>
                     <div className="bg-gray-50 dark:bg-zinc-900/30 rounded-2xl border border-gray-100 dark:border-zinc-800 p-6">
                        <div className="flex items-center justify-between mb-6">
                           <div className="flex items-center gap-2">
                              <Target className="w-5 h-5 text-purple-500" />
                              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">ROAS (Retorno sobre Gasto)</span>
                           </div>
                           <span className="text-xl font-black text-gray-900 dark:text-white">{viewingCampaign.roas}x</span>
                        </div>
                        <div className="space-y-1">
                           <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              <span>Eficiência da Campanha</span>
                              <span>Alta</span>
                           </div>
                           <div className="h-2 w-full bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-purple-500 to-topstack-teal w-[85%]"></div>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                     <h3 className="text-sm font-bold text-gray-900 dark:text-white">Anúncios Ativos</h3>
                     <div className="grid grid-cols-2 gap-4">
                        {[1, 2].map(i => (
                           <div key={i} className="aspect-square bg-gray-100 dark:bg-zinc-900 rounded-xl relative overflow-hidden group">
                              <img src={`https://images.unsplash.com/photo-${i === 1 ? '1550751827-4bd374c3f58b' : '1460925895917-afdab827c52f'}?w=300`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                 <button className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform"><MoreVertical className="w-4 h-4" /></button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black/80 backdrop-blur-xl flex justify-between items-center">
                  <button className="h-11 px-6 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all border border-gray-200 dark:border-zinc-800 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                     Editar
                  </button>
                  <button className="h-11 px-8 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg bg-topstack-teal text-white hover:brightness-110 active:scale-95">
                     <Save className="w-4 h-4" /> Salvar Alterações
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
