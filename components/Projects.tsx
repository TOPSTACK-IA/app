
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MoreVertical, 
  Code2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Layers,
  Layout,
  Server,
  Database,
  Smartphone,
  Globe,
  X,
  Save,
  Trash2,
  Paperclip,
  Users
} from 'lucide-react';
import { CrudActions } from './CrudActions';

interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  status: 'Planejamento' | 'Desenvolvimento' | 'Testes' | 'Entregue';
  progress: number;
  deadline: string;
  techStack: string[];
  team: string[];
  priority: 'Baixa' | 'Média' | 'Alta';
}

export const Projects: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Portal do Cliente v2',
      client: 'Kia Sun Motors',
      description: 'Refatoração completa do portal de agendamento de serviços e histórico de revisões.',
      status: 'Desenvolvimento',
      progress: 65,
      deadline: '20/12/2025',
      techStack: ['React', 'Node.js', 'PostgreSQL'],
      team: ['https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'],
      priority: 'Alta'
    },
    {
      id: '2',
      name: 'App de Vendas',
      client: 'Zontes Motos',
      description: 'Aplicativo mobile para força de vendas com catálogo offline e sincronização.',
      status: 'Testes',
      progress: 92,
      deadline: '15/12/2025',
      techStack: ['React Native', 'Firebase'],
      team: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'],
      priority: 'Média'
    },
    {
      id: '3',
      name: 'Landing Pages 2025',
      client: 'JTZ Motors',
      description: 'Desenvolvimento de 5 LPs de alta conversão para lançamentos de novos modelos.',
      status: 'Planejamento',
      progress: 15,
      deadline: '10/01/2026',
      techStack: ['Next.js', 'Tailwind'],
      team: ['https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100'],
      priority: 'Baixa'
    },
    {
      id: '4',
      name: 'Dashboard BI Consolidado',
      client: 'Grupo Voigt',
      description: 'Centralização de dados de marketing e vendas em um dashboard executivo.',
      status: 'Entregue',
      progress: 100,
      deadline: '30/11/2025',
      techStack: ['Python', 'Power BI', 'SQL'],
      team: ['https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100'],
      priority: 'Alta'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Desenvolvimento': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Testes': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'text-red-500 bg-red-500/10';
      case 'Média': return 'text-yellow-500 bg-yellow-500/10';
      default: return 'text-green-500 bg-green-500/10';
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Projetos de Software</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Gerencie o ciclo de vida de desenvolvimento e entregas.</p>
        </div>
        <PrimaryButton onClick={() => setIsCreateModalOpen(true)} icon={Plus}>
          Novo Projeto
        </PrimaryButton>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Em Progresso', value: projects.filter(p => p.status === 'Desenvolvimento').length, icon: Code2, color: 'text-blue-500' },
          { label: 'Em Testes', value: projects.filter(p => p.status === 'Testes').length, icon: AlertCircle, color: 'text-orange-500' },
          { label: 'Entregues', value: projects.filter(p => p.status === 'Entregue').length, icon: CheckCircle2, color: 'text-green-500' },
          { label: 'Total Projetos', value: projects.length, icon: Layers, color: 'text-gray-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-matte-black p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 flex items-center gap-4 shadow-sm">
            <div className={`p-3 rounded-xl bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white dark:bg-matte-black p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou cliente..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-topstack-teal/50 text-gray-900 dark:text-white transition-all"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {['Todos', 'Planejamento', 'Desenvolvimento', 'Testes', 'Entregue'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                statusFilter === status 
                  ? 'bg-topstack-teal text-white border-topstack-teal' 
                  : 'bg-transparent text-gray-500 border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-matte-black rounded-[2rem] border border-gray-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-xl hover:shadow-topstack-teal/5 transition-all group flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <CrudActions 
                itemName={project.name}
                onEdit={() => {}}
                onDelete={() => {}}
                onView={() => setViewingProject(project)}
              />
            </div>

            <div className="mb-6 flex-1">
              <p className="text-[10px] font-bold text-topstack-teal uppercase tracking-widest mb-1">{project.client}</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{project.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{project.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-zinc-900 rounded-md text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-zinc-800">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-gray-500">Progresso</span>
                  <span className="text-gray-900 dark:text-white">{project.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-topstack-teal transition-all duration-1000 ease-out"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.team.map((avatar, idx) => (
                    <img key={idx} src={avatar} alt="Member" className="w-8 h-8 rounded-full border-2 border-white dark:border-matte-black object-cover" />
                  ))}
                  <button className="w-8 h-8 rounded-full border-2 border-white dark:border-matte-black bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-[9px] font-bold text-gray-500">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.deadline}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsCreateModalOpen(false)}></div>
           <div className="w-full max-w-[500px] bg-white dark:bg-[#050505] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/5">
              <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50">
                 <h2 className="text-[10px] font-black tracking-[0.2em] text-gray-900 dark:text-white uppercase">Novo Projeto</h2>
                 <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Nome do Projeto</label>
                    <input type="text" placeholder="Ex: Portal do Cliente" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Cliente</label>
                    <input type="text" placeholder="Ex: Kia Sun Motors" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Deadline</label>
                      <input type="date" className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Prioridade</label>
                      <select className="w-full h-12 bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl px-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white">
                        <option>Alta</option>
                        <option>Média</option>
                        <option>Baixa</option>
                      </select>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Descrição</label>
                    <textarea rows={4} className="w-full bg-gray-50 dark:bg-zinc-900/50 border-2 border-gray-200 dark:border-zinc-800 focus:border-topstack-teal/50 rounded-xl p-4 text-sm font-medium focus:outline-none transition-all text-gray-900 dark:text-white resize-none" placeholder="Detalhes do escopo..."></textarea>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.4em] ml-1">Stack Tecnológica</label>
                    <div className="flex flex-wrap gap-2">
                       {['React', 'Node.js', 'Python', 'React Native', 'AWS', 'Firebase'].map(tech => (
                         <button key={tech} className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg text-xs font-bold text-gray-500 hover:border-topstack-teal hover:text-topstack-teal transition-all">
                            {tech}
                         </button>
                       ))}
                       <button className="px-3 py-1.5 border border-dashed border-gray-300 dark:border-zinc-700 rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:border-white transition-all flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Add
                       </button>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-6 bg-gray-50 dark:bg-black/80 backdrop-blur-xl">
                 <button onClick={() => setIsCreateModalOpen(false)} className="text-zinc-600 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
                    Cancelar
                 </button>
                 <button onClick={() => setIsCreateModalOpen(false)} className="h-11 px-8 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg bg-topstack-teal text-white hover:brightness-110 active:scale-95">
                    <Save className="w-4 h-4" /> Criar Projeto
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* View Project Modal */}
      {viewingProject && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setViewingProject(null)}></div>
           <div className="w-full max-w-[600px] bg-white dark:bg-[#0a0a0a] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/5">
              
              {/* Header com Capa */}
              <div className="relative h-48 bg-zinc-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-50" />
                <button onClick={() => setViewingProject(null)} className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-white/20 rounded-xl text-white backdrop-blur-md transition-all z-20">
                   <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-8 z-20">
                   <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 bg-topstack-teal text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                        {viewingProject.status}
                      </span>
                      <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1 ${getPriorityColor(viewingProject.priority)}`}>
                        <AlertCircle className="w-3 h-3" /> Prioridade {viewingProject.priority}
                      </span>
                   </div>
                   <h1 className="text-3xl font-bold text-white tracking-tight">{viewingProject.name}</h1>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                       <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Cliente</p>
                       <p className="text-lg font-bold text-gray-900 dark:text-white">{viewingProject.client}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Entrega</p>
                       <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <Clock className="w-4 h-4 text-topstack-teal" /> {viewingProject.deadline}
                       </p>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Descrição</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-zinc-900/30 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800">
                       {viewingProject.description}
                    </p>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Progresso Geral</p>
                       <span className="text-2xl font-bold text-topstack-teal">{viewingProject.progress}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 dark:bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-gray-100 dark:border-zinc-800">
                       <div 
                         className="h-full bg-topstack-teal rounded-full shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                         style={{ width: `${viewingProject.progress}%` }}
                       ></div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Tecnologias</p>
                    <div className="flex flex-wrap gap-3">
                       {viewingProject.techStack.map(tech => (
                          <div key={tech} className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-xl">
                             <div className="p-1.5 bg-white dark:bg-black rounded-lg">
                                {tech === 'React' && <Layout className="w-4 h-4 text-blue-400" />}
                                {tech === 'Node.js' && <Server className="w-4 h-4 text-green-500" />}
                                {tech === 'React Native' && <Smartphone className="w-4 h-4 text-purple-400" />}
                                {['React', 'Node.js', 'React Native'].indexOf(tech) === -1 && <Database className="w-4 h-4 text-gray-400" />}
                             </div>
                             <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{tech}</span>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Equipe Alocada</p>
                       <button className="text-[10px] font-bold text-topstack-teal flex items-center gap-1 hover:underline uppercase tracking-wider"><Plus className="w-3 h-3" /> Gerenciar</button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                       {viewingProject.team.map((img, i) => (
                          <div key={i} className="flex items-center gap-3 pr-4 bg-gray-50 dark:bg-zinc-900/30 rounded-full border border-gray-100 dark:border-zinc-800">
                             <img src={img} className="w-10 h-10 rounded-full object-cover" />
                             <div>
                                <p className="text-xs font-bold text-gray-900 dark:text-white">Dev {i+1}</p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase">Full Stack</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Anexos</p>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-900/30 border border-gray-100 dark:border-zinc-800 hover:border-topstack-teal/50 transition-all cursor-pointer group">
                          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all"><Paperclip className="w-4 h-4" /></div>
                          <div>
                             <p className="text-xs font-bold text-gray-900 dark:text-white">Briefing.pdf</p>
                             <p className="text-[9px] text-gray-500">2.4 MB</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-900/30 border border-gray-100 dark:border-zinc-800 hover:border-topstack-teal/50 transition-all cursor-pointer group">
                          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all"><Layout className="w-4 h-4" /></div>
                          <div>
                             <p className="text-xs font-bold text-gray-900 dark:text-white">Design System</p>
                             <p className="text-[9px] text-gray-500">Figma Link</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black/80 backdrop-blur-xl flex gap-4">
                 <button className="flex-1 h-12 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all border border-gray-200 dark:border-zinc-800 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-900">
                    <Trash2 className="w-4 h-4" /> Arquivar
                 </button>
                 <button className="flex-[2] h-12 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all bg-topstack-teal text-white hover:brightness-110 shadow-lg shadow-topstack-teal/20">
                    <Save className="w-4 h-4" /> Salvar Alterações
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
