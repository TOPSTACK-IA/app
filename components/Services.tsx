
import React, { useState } from 'react';
import { 
  Code2, 
  Cpu, 
  TrendingUp, 
  BarChart3, 
  Plus, 
  Search, 
  ArrowRight, 
  Check, 
  Zap, 
  Layers,
  Bot,
  X,
  Send,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  category: 'Development' | 'Intelligence' | 'Marketing' | 'Data';
  features: string[];
  icon: any;
  activeClients: number;
}

export const Services: React.FC = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: '1',
      title: 'Desenvolvimento Sob Medida',
      description: 'Aplicações web e mobile robustas, escaláveis e focadas na experiência do usuário.',
      category: 'Development',
      features: ['SaaS & Web Apps', 'React Native', 'APIs & Microservices', 'Sistemas Legados'],
      icon: Code2,
      activeClients: 12
    },
    {
      id: '2',
      title: 'Agentes de IA & Chatbots',
      description: 'Automação de atendimento e processos com inteligência artificial generativa.',
      category: 'Intelligence',
      features: ['Chatbots GPT-4o', 'Automação WhatsApp', 'Análise Sentimento', 'Assistentes Internos'],
      icon: Bot,
      activeClients: 8
    },
    {
      id: '3',
      title: 'Business Intelligence (BI)',
      description: 'Transforme dados brutos em dashboards estratégicos para tomada de decisão.',
      category: 'Data',
      features: ['Power BI / Looker', 'Engenharia de Dados', 'KPIs Real-time', 'Big Data'],
      icon: BarChart3,
      activeClients: 15
    },
    {
      id: '4',
      title: 'Gestão de Tráfego Pago',
      description: 'Estratégias de alta performance para maximizar ROI em canais digitais.',
      category: 'Marketing',
      features: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'CRO'],
      icon: TrendingUp,
      activeClients: 24
    },
    {
      id: '5',
      title: 'Automação (RPA)',
      description: 'Elimine tarefas repetitivas integrando ferramentas e sistemas.',
      category: 'Intelligence',
      features: ['n8n / Zapier', 'Web Scraping', 'CRM Sync', 'Disparos'],
      icon: Cpu,
      activeClients: 18
    },
    {
      id: '6',
      title: 'Consultoria Tech',
      description: 'Diagnóstico e planejamento estratégico para transformação digital.',
      category: 'Development',
      features: ['Arquitetura', 'AWS Cloud', 'Code Review', 'Mentoria'],
      icon: Layers,
      activeClients: 5
    }
  ];

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Development': return { text: 'text-blue-500', bg: 'bg-blue-500', border: 'border-blue-500/20', gradient: 'from-blue-500/20 to-cyan-500/20' };
      case 'Intelligence': return { text: 'text-purple-500', bg: 'bg-purple-500', border: 'border-purple-500/20', gradient: 'from-purple-500/20 to-pink-500/20' };
      case 'Marketing': return { text: 'text-pink-500', bg: 'bg-pink-500', border: 'border-pink-500/20', gradient: 'from-pink-500/20 to-rose-500/20' };
      case 'Data': return { text: 'text-orange-500', bg: 'bg-orange-500', border: 'border-orange-500/20', gradient: 'from-orange-500/20 to-amber-500/20' };
      default: return { text: 'text-gray-500', bg: 'bg-gray-500', border: 'border-gray-500/20', gradient: 'from-gray-500/20 to-zinc-500/20' };
    }
  };

  const PrimaryButton = ({ onClick, children, icon: Icon }: { onClick?: () => void, children?: React.ReactNode, icon?: any }) => (
    <button 
      onClick={onClick}
      className="h-12 px-8 rounded-full font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-topstack-teal/20 bg-topstack-teal text-white hover:brightness-110 active:scale-95 whitespace-nowrap hover:shadow-2xl hover:shadow-topstack-teal/40"
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );

  return (
    <div className="space-y-10 w-full animate-in fade-in duration-700 pb-24">
      
      {/* Hero Section */}
      <div className="relative rounded-[3rem] overflow-hidden bg-black min-h-[320px] flex items-center shadow-2xl">
         {/* Abstract Background */}
         <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 via-purple-900/40 to-black z-0"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-topstack-teal/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
         
         <div className="relative z-10 w-full p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-topstack-teal" />
                  <span>Solutions Catalog v2.0</span>
               </div>
               <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                  Acelere sua empresa com <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-topstack-teal to-blue-400">tecnologia de ponta.</span>
               </h1>
               <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-lg">
                  Explore nosso catálogo de serviços premium. Do desenvolvimento de software à inteligência artificial, temos a stack completa para escalar o seu negócio.
               </p>
               <div className="pt-2">
                 <PrimaryButton onClick={() => { setSelectedService(null); setIsRequestModalOpen(true); }} icon={ArrowUpRight}>
                    Iniciar Novo Projeto
                 </PrimaryButton>
               </div>
            </div>

            {/* Floating Card Decorative */}
            <div className="hidden lg:block relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-topstack-teal to-purple-600 blur-2xl opacity-40"></div>
               <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl w-72 rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-10 h-10 rounded-full bg-topstack-teal flex items-center justify-center text-white"><Code2 className="w-5 h-5"/></div>
                     <div>
                        <div className="h-2 w-24 bg-white/20 rounded-full mb-1"></div>
                        <div className="h-1.5 w-12 bg-white/10 rounded-full"></div>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="h-2 w-full bg-white/10 rounded-full"></div>
                     <div className="h-2 w-full bg-white/10 rounded-full"></div>
                     <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                     <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500 border border-black"></div>
                        <div className="w-6 h-6 rounded-full bg-blue-500 border border-black"></div>
                     </div>
                     <div className="px-2 py-1 bg-green-500/20 text-green-400 text-[9px] font-bold rounded">ACTIVE</div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
               type="text" 
               placeholder="O que você está procurando hoje?" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full h-14 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl pl-14 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-topstack-teal/50 focus:border-transparent transition-all shadow-sm"
            />
         </div>
         <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {['Todas', 'Dev', 'IA', 'Dados', 'Ads'].map(filter => (
               <button key={filter} className="h-14 px-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-topstack-teal hover:border-topstack-teal transition-all whitespace-nowrap shadow-sm">
                  {filter}
               </button>
            ))}
         </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {services.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase())).map((service) => {
            const styles = getCategoryStyles(service.category);
            
            return (
               <div 
                  key={service.id} 
                  onClick={() => { setSelectedService(service); setIsRequestModalOpen(true); }}
                  className="bg-white dark:bg-[#09090b] rounded-[2.5rem] p-8 relative overflow-hidden group cursor-pointer border border-gray-100 dark:border-white/5 hover:border-transparent transition-all duration-500"
               >
                  {/* Hover Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}></div>
                  <div className="absolute inset-[1px] bg-white dark:bg-[#09090b] rounded-[2.5rem] z-0"></div>

                  <div className="relative z-10 flex flex-col h-full">
                     <div className="flex justify-between items-start mb-8">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${styles.bg} text-white shadow-lg shadow-current/20 group-hover:scale-110 transition-transform duration-500`}>
                           <service.icon className="w-7 h-7" />
                        </div>
                        <div className={`w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all`}>
                           <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                        </div>
                     </div>

                     <div className="mb-8">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${styles.text} mb-2 block`}>
                           {service.category}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                           {service.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                           {service.description}
                        </p>
                     </div>

                     <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 group-hover:border-black/5 dark:group-hover:border-white/10 transition-colors">
                        <div className="flex flex-wrap gap-2">
                           {service.features.map((feature, idx) => (
                              <span key={idx} className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-white/5 text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide group-hover:bg-white dark:group-hover:bg-black group-hover:shadow-sm transition-all">
                                 {feature}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            );
         })}
      </div>

      {/* Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsRequestModalOpen(false)}></div>
           <div className="w-full max-w-[600px] bg-white dark:bg-[#0a0a0a] h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-500 border-l border-gray-200 dark:border-white/10">
              <div className="p-8 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
                 <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                       {selectedService ? selectedService.title : 'Nova Solicitação'}
                    </h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Preencha os detalhes do projeto</p>
                 </div>
                 <button onClick={() => setIsRequestModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-6 h-6" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-500/10 flex gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl h-fit text-blue-600 dark:text-blue-400">
                       <Zap className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="font-bold text-sm text-blue-900 dark:text-blue-200 mb-1">Boost de Prioridade</h3>
                       <p className="text-xs text-blue-700 dark:text-blue-400/80 leading-relaxed">
                          Sua solicitação será analisada diretamente por um de nossos Tech Leads. O tempo de resposta médio é de <span className="font-bold">2 horas</span>.
                       </p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-1">Título do Projeto</label>
                       <input type="text" placeholder="Ex: Dashboard de Vendas Q4" className="w-full h-14 bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-topstack-teal/20 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-2xl px-6 text-sm font-bold transition-all outline-none text-gray-900 dark:text-white placeholder:text-gray-400" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-1">Orçamento (Est.)</label>
                          <select className="w-full h-14 bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-topstack-teal/20 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-2xl px-6 text-sm font-bold transition-all outline-none text-gray-900 dark:text-white appearance-none cursor-pointer">
                             <option>Até R$ 10k</option>
                             <option>R$ 10k - R$ 50k</option>
                             <option>R$ 50k - R$ 100k</option>
                             <option>Acima de R$ 100k</option>
                          </select>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-1">Prazo Ideal</label>
                          <select className="w-full h-14 bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-topstack-teal/20 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-2xl px-6 text-sm font-bold transition-all outline-none text-gray-900 dark:text-white appearance-none cursor-pointer">
                             <option>Urgente (Imediato)</option>
                             <option>30 dias</option>
                             <option>60 dias</option>
                             <option>Flexível</option>
                          </select>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-1">Escopo & Requisitos</label>
                       <textarea rows={6} className="w-full bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-topstack-teal/20 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-2xl p-6 text-sm font-medium transition-all outline-none text-gray-900 dark:text-white resize-none placeholder:text-gray-400" placeholder="Descreva os objetivos principais, funcionalidades esperadas e qualquer referência visual..."></textarea>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-6 bg-white dark:bg-zinc-900/50 backdrop-blur-xl">
                 <button onClick={() => setIsRequestModalOpen(false)} className="text-zinc-500 hover:text-gray-900 dark:hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors">
                    Cancelar
                 </button>
                 <button onClick={() => setIsRequestModalOpen(false)} className="h-14 px-10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-topstack-teal/20 bg-topstack-teal text-white hover:brightness-110 active:scale-95 hover:shadow-2xl hover:shadow-topstack-teal/40">
                    <Send className="w-4 h-4" /> Enviar Proposta
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
