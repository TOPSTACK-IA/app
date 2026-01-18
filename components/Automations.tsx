
import React, { useState } from 'react';
import { 
  Bot, 
  Zap, 
  MessageSquare, 
  Clock, 
  Plus, 
  Search, 
  MoreVertical, 
  Play, 
  Pause, 
  Settings, 
  Activity,
  BrainCircuit,
  Workflow,
  Sparkles,
  X,
  Save,
  Terminal,
  Instagram,
  Facebook,
  Globe,
  Database,
  Mail
} from 'lucide-react';
import { CrudActions } from './CrudActions';

interface Agent {
  id: string;
  name: string;
  type: 'Chatbot' | 'Workflow' | 'Crawler';
  status: 'Ativo' | 'Pausado' | 'Treinando' | 'Erro';
  platform: 'WhatsApp' | 'Instagram' | 'Web' | 'Interno';
  interactions: number;
  avgResponseTime: string;
  lastActive: string;
  model: 'GPT-4o' | 'Claude 3.5' | 'Llama 3';
}

export const Automations: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingAgent, setViewingAgent] = useState<Agent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Atendente Nível 1',
      type: 'Chatbot',
      status: 'Ativo',
      platform: 'WhatsApp',
      interactions: 12450,
      avgResponseTime: '2s',
      lastActive: 'Agora',
      model: 'GPT-4o'
    },
    {
      id: '2',
      name: 'Qualificador de Leads',
      type: 'Chatbot',
      status: 'Ativo',
      platform: 'Instagram',
      interactions: 3890,
      avgResponseTime: '4s',
      lastActive: 'Há 5 min',
      model: 'GPT-4o'
    },
    {
      id: '3',
      name: 'Extrator de Preços Concorrência',
      type: 'Crawler',
      status: 'Treinando',
      platform: 'Web',
      interactions: 850,
      avgResponseTime: '15s',
      lastActive: 'Há 1h',
      model: 'Claude 3.5'
    },
    {
      id: '4',
      name: 'Sync CRM <-> Planilha',
      type: 'Workflow',
      status: 'Pausado',
      platform: 'Interno',
      interactions: 15400,
      avgResponseTime: '1s',
      lastActive: 'Há 2 dias',
      model: 'Llama 3'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Pausado': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Treinando': return 'text-purple-500 bg-purple-500/10 border-purple-500/20 animate-pulse';
      case 'Erro': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
        case 'Instagram': return <Instagram className="w-4 h-4" />;
        case 'WhatsApp': return <MessageSquare className="w-4 h-4" />;
        case 'Web': return <Globe className="w-4 h-4" />;
        case 'Interno': return <Database className="w-4 h-4" />;
        default: return <Zap className="w-4 h-4" />;
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">IA & Automações</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Gerencie seus agentes inteligentes e fluxos de trabalho.</p>
        </div>
        <PrimaryButton onClick={() => setIsCreateModalOpen(true)} icon={Sparkles}>
          Novo Agente
        </PrimaryButton>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Agentes Ativos', value: '3', icon: Bot, color: 'text-topstack-teal' },
          { label: 'Interações Hoje', value: '1,284', icon: MessageSquare, color: 'text-blue-500' },
          { label: 'Tempo Economizado', value: '42h', icon: Clock, color: 'text-purple-500' },
          { label: 'Taxa de Sucesso', value: '98.5%', icon: Activity, color: 'text-green-500' },
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

      {/* Search Bar */}
      <div className="bg-white dark:bg-matte-black p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar agentes, fluxos ou crawlers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-topstack-teal/50 text-gray-900 dark:text-white transition-all"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white dark:bg-matte-black rounded-[2rem] border border-gray-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-xl hover:shadow-topstack-teal/5 transition-all group flex flex-col relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-topstack-teal/5 blur-[50px] rounded-full group-hover:bg-topstack-teal/10 transition-colors"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
               <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border ${agent.type === 'Chatbot' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : agent.type === 'Workflow' ? 'bg-purple-500/10 border-purple-500/20 text-purple-500' : 'bg-orange-500/10 border-orange-500/20 text-orange-500'}`}>
                     {agent.type === 'Chatbot' && <Bot className="w-6 h-6" />}
                     {agent.type === 'Workflow' && <Workflow className="w-6 h-6" />}
                     {agent.type === 'Crawler' && <BrainCircuit className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{agent.name}</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{agent.type}</p>
                  </div>
               </div>
               <CrudActions 
                  itemName={agent.name}
                  onView={() => setViewingAgent(agent)}
                  onEdit={() => {}}
                  onDelete={() => {}}
               />
            </div>

            <div className="flex-1 space-y-6 relative z-10">
               <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-900/50 rounded-xl border border-gray-100 dark:border-zinc-800/50">
                  <div className="flex items-center gap-2">
                     <span className="flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75 ${agent.status === 'Ativo' ? 'bg-green-400' : agent.status === 'Treinando' ? 'bg-purple-400' : 'bg-gray-400'}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${agent.status === 'Ativo' ? 'bg-green-500' : agent.status === 'Treinando' ? 'bg-purple-500' : 'bg-gray-500'}`}></span>
                     </span>
                     <span className={`text-[10px] font-black uppercase tracking-widest ${getStatusColor(agent.status)} bg-transparent border-none px-0`}>{agent.status}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                     {getPlatformIcon(agent.platform)}
                     <span className="text-[10px] font-bold uppercase tracking-wider">{agent.platform}</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-gray-50 dark:bg-zinc-900/30 rounded-xl border border-gray-100 dark:border-zinc-800/50">
                     <p className="text-[9px] text-gray-400 font-black uppercase tracking-wider mb-1">Modelo</p>
                     <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-topstack-teal" /> {agent.model}
                     </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-zinc-900/30 rounded-xl border border-gray-100 dark:border-zinc-800/50">
                     <p className="text-[9px] text-gray-400 font-black uppercase tracking-wider mb-1">Latência</p>
                     <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-500" /> {agent.avgResponseTime}
                     </p>
                  </div>
               </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between relative z-10">
               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Última atividade: {agent.lastActive}
               </div>
               <button onClick={() => setViewingAgent(agent)} className="text-[10px] font-black text-topstack-teal hover:underline uppercase tracking-widest flex items-center gap-1">
                  Ver Logs <Terminal className="w-3 h-3" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Agent Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsCreateModalOpen(false)}></div>
           <div className="w-full max-w-[500px] bg-white dark:bg-[#050505] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/5">
              <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50">
                 <h2 className="text-[10px] font-black tracking-[0.2em] text-gray-900 dark:text-white uppercase">Novo Agente Inteligente</h2>
                 <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Nome do Agente</label>
                    <input type="text" placeholder="Ex: Atendente de Vendas" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Tipo</label>
                      <select className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white">
                        <option>Chatbot</option>
                        <option>Workflow (n8n)</option>
                        <option>Crawler</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Plataforma</label>
                      <select className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white">
                        <option>WhatsApp</option>
                        <option>Instagram</option>
                        <option>Web</option>
                        <option>API Interna</option>
                      </select>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Modelo de IA</label>
                    <div className="grid grid-cols-3 gap-2">
                       {['GPT-4o', 'Claude 3.5', 'Llama 3'].map(model => (
                         <button key={model} className="h-10 border border-gray-200 dark:border-zinc-800 rounded-lg text-[10px] font-bold uppercase hover:border-topstack-teal hover:text-topstack-teal focus:bg-topstack-teal/10 focus:border-topstack-teal focus:text-topstack-teal transition-all text-gray-500">
                            {model}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">System Prompt / Instruções</label>
                    <textarea rows={8} className="w-full bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl p-4 text-sm font-mono focus:outline-none transition-all text-gray-900 dark:text-white resize-none" placeholder="Você é um assistente útil e amigável..."></textarea>
                 </div>
              </div>

              <div className="p-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-6 bg-gray-50 dark:bg-black/80 backdrop-blur-xl">
                 <button onClick={() => setIsCreateModalOpen(false)} className="text-zinc-600 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
                    Cancelar
                 </button>
                 <button onClick={() => setIsCreateModalOpen(false)} className="h-11 px-8 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg bg-topstack-teal text-white hover:brightness-110 active:scale-95">
                    <Zap className="w-4 h-4" /> Criar Agente
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* View/Edit Agent Modal */}
      {viewingAgent && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setViewingAgent(null)}></div>
           <div className="w-full max-w-[600px] bg-white dark:bg-[#0a0a0a] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/5">
              
              {/* Header */}
              <div className="p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50 flex justify-between items-start">
                 <div className="flex gap-4">
                    <div className="p-4 bg-topstack-teal/10 rounded-2xl text-topstack-teal">
                       <Bot className="w-8 h-8" />
                    </div>
                    <div>
                       <div className="flex items-center gap-3 mb-1">
                          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{viewingAgent.name}</h1>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${getStatusColor(viewingAgent.status)}`}>{viewingAgent.status}</span>
                       </div>
                       <p className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
                          {getPlatformIcon(viewingAgent.platform)} {viewingAgent.platform} • {viewingAgent.model}
                       </p>
                    </div>
                 </div>
                 <button onClick={() => setViewingAgent(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              {/* Toolbar */}
              <div className="px-8 py-4 border-b border-gray-100 dark:border-white/5 flex gap-4">
                 <button className="flex-1 h-10 bg-gray-100 dark:bg-zinc-900 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
                    <Pause className="w-3 h-3" /> Pausar
                 </button>
                 <button className="flex-1 h-10 bg-gray-100 dark:bg-zinc-900 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
                    <Settings className="w-3 h-3" /> Configurações
                 </button>
                 <button className="flex-1 h-10 bg-gray-100 dark:bg-zinc-900 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
                    <Activity className="w-3 h-3" /> Métricas
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-white dark:bg-[#0a0a0a]">
                 {/* Live Logs Section */}
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <h3 className="text-sm font-bold text-gray-900 dark:text-white">Logs em Tempo Real</h3>
                       <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Live</span>
                       </div>
                    </div>
                    
                    <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 space-y-2 border border-gray-800 h-64 overflow-y-auto custom-scrollbar shadow-inner">
                       <div className="flex gap-2">
                          <span className="text-gray-500">[14:32:01]</span>
                          <span className="text-blue-400">INFO</span>
                          <span>Iniciando processamento de mensagem...</span>
                       </div>
                       <div className="flex gap-2">
                          <span className="text-gray-500">[14:32:02]</span>
                          <span className="text-purple-400">AI</span>
                          <span>Contexto recuperado (VectorDB: 0.89 similarity)</span>
                       </div>
                       <div className="flex gap-2">
                          <span className="text-gray-500">[14:32:04]</span>
                          <span className="text-green-400">SUCCESS</span>
                          <span>Resposta gerada e enviada via WhatsApp API.</span>
                       </div>
                       <div className="flex gap-2 opacity-50">
                          <span className="text-gray-500">[14:31:45]</span>
                          <span className="text-blue-400">INFO</span>
                          <span>Webhook recebido: new_message</span>
                       </div>
                       {/* Mock lines */}
                       {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex gap-2 opacity-30">
                             <span className="text-gray-500">[14:30:1{i}]</span>
                             <span className="text-gray-400">LOG</span>
                             <span>System heartbeat... OK</span>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Prompt Edit */}
                 <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">System Prompt Atual</h3>
                    <div className="relative">
                       <textarea 
                          readOnly
                          className="w-full h-40 bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 text-sm font-medium text-gray-600 dark:text-gray-300 resize-none focus:outline-none"
                          value="Você é um assistente virtual da TOPSTACK especializado em qualificação de leads. Seu tom deve ser profissional, porém acolhedor. Sempre tente obter o Nome, Email e Empresa do contato antes de passar para um humano."
                       ></textarea>
                       <button className="absolute bottom-4 right-4 px-3 py-1.5 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-gray-300 dark:hover:bg-zinc-700 transition-all">
                          Editar
                       </button>
                    </div>
                 </div>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black/80 backdrop-blur-xl flex justify-between items-center">
                 <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Uptime: 99.9%</span>
                 </div>
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
