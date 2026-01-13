
import React from 'react';
import { 
  Code2, 
  Cpu, 
  Users2, 
  Rocket, 
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CrudActions } from './CrudActions';

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.Node;
}> = ({ title, value, change, trend, icon }) => (
  <div className="bg-white dark:bg-matte-black p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-xl hover:shadow-topstack-teal/5 group cursor-default">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-topstack-teal/10 rounded-2xl text-topstack-teal group-hover:bg-topstack-teal group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${trend === 'up' ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-500/10' : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-500/10'}`}>
        {change}
      </div>
    </div>
    <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</p>
    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 tracking-tight">{value}</h3>
  </div>
);

const projectsData = [
  { id: 1, name: 'Portal Client v2', client: 'Kia Sun Motors', type: 'SOFTWARE', status: 'Desenvolvimento', progress: 65, deadline: '20/12' },
  { id: 2, name: 'Fluxo IA Atendimento', client: 'Zontes', type: 'AUTOMAÇÃO', status: 'Testes', progress: 90, deadline: '15/12' },
  { id: 3, name: 'Dashboard BI Consolidado', client: 'Haojue', type: 'BI', status: 'Finalizado', progress: 100, deadline: '05/12' },
  { id: 4, name: 'App Gestão Interna', client: 'TOPSTACK', type: 'SOFTWARE', status: 'Backlog', progress: 10, deadline: '30/12' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 w-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Workspace TOPSTACK</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Gestão centralizada de inovação e entrega contínua</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 h-12 px-8 bg-topstack-teal text-white rounded-full text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-topstack-teal/20 active:scale-95 whitespace-nowrap">
            <Plus className="w-5 h-5" />
            Novo Projeto
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Projetos Ativos" value="12" change="+2" trend="up" icon={<Code2 className="w-6 h-6" />} />
        <StatCard title="Automações Rodando" value="48" change="+15%" trend="up" icon={<Cpu className="w-6 h-6" />} />
        <StatCard title="Leads (CRM)" value="24" change="+5" trend="up" icon={<Users2 className="w-6 h-6" />} />
        <StatCard title="Entregas no Prazo" value="98%" change="Estável" trend="up" icon={<Rocket className="w-6 h-6" />} />
      </div>

      <div className="bg-white dark:bg-matte-black rounded-[2rem] border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 border-b border-gray-100 dark:border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h2 className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">Pipeline de Desenvolvimento</h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
               <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/20"></span> Software</div>
               <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/20"></span> Automação</div>
               <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/20"></span> BI</div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-zinc-900/50 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold border-b border-gray-100 dark:border-zinc-800">
                <th className="px-8 py-5">Projeto</th>
                <th className="px-8 py-5">Cliente</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Progresso</th>
                <th className="px-8 py-5">Entrega</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50">
              {projectsData.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50/80 dark:hover:bg-zinc-900/40 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{project.name}</span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold tracking-tighter uppercase">{project.type}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-semibold text-gray-700 dark:text-gray-300">{project.client}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2.5">
                       {project.status === 'Finalizado' && <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />}
                       {project.status === 'Desenvolvimento' && <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                       {project.status === 'Testes' && <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />}
                       <span className={`text-[11px] font-bold uppercase tracking-wider ${
                         project.status === 'Finalizado' ? 'text-green-600 dark:text-green-400' : 
                         project.status === 'Desenvolvimento' ? 'text-blue-600 dark:text-blue-400' : 
                         project.status === 'Testes' ? 'text-yellow-600 dark:text-yellow-400' :
                         'text-gray-500 dark:text-gray-400'
                       }`}>{project.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="w-32 flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-topstack-teal transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(45,212,191,0.4)]" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tighter">{project.deadline}</td>
                  <td className="px-8 py-6 text-right">
                    <CrudActions 
                      itemName={project.name} 
                      onEdit={() => {}} 
                      onDelete={() => {}} 
                      onView={() => {}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
