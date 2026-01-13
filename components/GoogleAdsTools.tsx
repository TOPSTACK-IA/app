
import React, { useState } from 'react';
import { 
  FileCode, 
  Info, 
  Plus, 
  Search, 
  ExternalLink, 
  Copy, 
  Check,
  Code2,
  Table as TableIcon,
  X
} from 'lucide-react';
import { SCRIPTS } from '../constants';
import { CrudActions } from './CrudActions';

interface ScriptTool {
  id: string;
  name: string;
  description: string;
  type: 'Relatório' | 'Automação' | 'Otimização';
  lastRun: string;
  scriptKey: 'weekly' | 'historical';
}

export const GoogleAdsTools: React.FC = () => {
  const [spreadsheetUrl, setSpreadsheetUrl] = useState('https://docs.google.com/spreadsheets/d/1yf4MioU-Oa4b6A8Jw8Y3AM_ssbptbvbK7Bb7nDg3jMU/edit');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewingScript, setViewingScript] = useState<ScriptTool | null>(null);

  const tools: ScriptTool[] = [
    { 
      id: '1', 
      name: 'Relatório Semanal Automático', 
      description: 'Coleta dados de Segunda a Domingo da semana anterior.',
      type: 'Relatório',
      lastRun: 'Há 2 dias',
      scriptKey: 'weekly'
    },
    { 
      id: '2', 
      name: 'Relatório Histórico Consolidado', 
      description: 'Limpa a planilha e preenche com dados de Junho a Dezembro.',
      type: 'Relatório',
      lastRun: 'Há 5 dias',
      scriptKey: 'historical'
    }
  ];

  const handleCopy = (tool: ScriptTool) => {
    const code = SCRIPTS[tool.scriptKey](spreadsheetUrl);
    navigator.clipboard.writeText(code);
    setCopiedId(tool.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Gerador de Scripts Google Ads</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ferramentas internas para automação de tráfego pago</p>
        </div>
        <button className="flex items-center justify-center gap-2 h-11 px-6 bg-topstack-teal text-white rounded-full text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-topstack-teal/20 active:scale-95 whitespace-nowrap">
          <Plus className="w-4 h-4" />
          Nova Ferramenta
        </button>
      </div>

      <div className="bg-white dark:bg-matte-black p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-topstack-teal/10 rounded-lg">
            <TableIcon className="w-5 h-5 text-topstack-teal" />
          </div>
          <h2 className="font-bold text-gray-900 dark:text-white">Configuração de Destino</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 tracking-widest">URL do Google Sheets</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={spreadsheetUrl}
                  onChange={(e) => setSpreadsheetUrl(e.target.value)}
                  placeholder="Insira a URL da planilha destino..."
                  className="w-full h-12 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-topstack-teal/50 text-gray-900 dark:text-white transition-all"
                />
              </div>
              <a 
                href={spreadsheetUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-12 px-5 bg-gray-100 dark:bg-zinc-800 rounded-xl text-gray-600 dark:text-gray-300 font-bold text-sm hover:text-topstack-teal dark:hover:text-topstack-teal transition-all group"
              >
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="sm:hidden lg:inline uppercase tracking-widest text-[10px] font-black">Abrir Planilha</span>
              </a>
            </div>
          </div>
          
          <div className="bg-topstack-teal/5 border border-topstack-teal/10 p-4 rounded-xl flex items-start gap-3">
            <div className="p-1.5 bg-topstack-teal/10 rounded-full">
              <Info className="w-4 h-4 text-topstack-teal flex-shrink-0" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Os scripts abaixo são atualizados <span className="text-topstack-teal font-bold underline decoration-topstack-teal/30 underline-offset-2">em tempo real</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-matte-black rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">Scripts Disponíveis</h2>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Filtrar scripts..."
              className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-topstack-teal/50 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-zinc-900/50 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold">
                <th className="px-6 py-4 min-w-[300px]">Nome do Script</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Última Execução</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50">
              {tools.map((tool) => (
                <tr key={tool.id} className="hover:bg-gray-50/80 dark:hover:bg-zinc-900/40 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-topstack-teal/5 rounded-2xl text-topstack-teal group-hover:bg-topstack-teal group-hover:text-white transition-all duration-300">
                        <FileCode className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{tool.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{tool.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-gray-200 dark:border-zinc-700/50">
                      {tool.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-topstack-teal/40"></div>
                      {tool.lastRun}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => handleCopy(tool)}
                        className={`p-2.5 rounded-xl transition-all relative group/btn ${
                          copiedId === tool.id 
                            ? 'bg-green-500 text-white' 
                            : 'bg-topstack-teal/5 text-topstack-teal hover:bg-topstack-teal hover:text-white hover:shadow-lg hover:shadow-topstack-teal/20'
                        }`}
                        title="Copiar Código"
                      >
                        {copiedId === tool.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <CrudActions 
                        itemName={tool.name} 
                        onEdit={() => {}} 
                        onDelete={() => {}} 
                        onView={() => setViewingScript(tool)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Visualização de Script */}
      {viewingScript && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] w-full max-w-4xl shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-gray-50/30 dark:bg-zinc-900/50">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-topstack-teal/10 rounded-2xl">
                  <Code2 className="w-6 h-6 text-topstack-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{viewingScript.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Implemente seu código no Google Ads</p>
                </div>
              </div>
              <button onClick={() => setViewingScript(null)} className="p-2.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-2xl text-gray-500 transition-all active:scale-90"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-gray-950 custom-scrollbar font-mono">
                <pre className="text-[11px] sm:text-xs text-emerald-400 leading-relaxed selection:bg-emerald-500/40">
                  {SCRIPTS[viewingScript.scriptKey](spreadsheetUrl)}
                </pre>
            </div>

            <div className="p-8 bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-end gap-10">
              <button 
                onClick={() => setViewingScript(null)}
                className="text-zinc-500 hover:text-gray-900 dark:hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Fechar
              </button>
              <button 
                onClick={() => { handleCopy(viewingScript); setViewingScript(null); }}
                className="bg-white text-black h-12 px-10 rounded-full font-black text-xs flex items-center gap-3 shadow-2xl hover:bg-gray-200 active:scale-95 transition-all uppercase tracking-[0.2em]"
              >
                <Copy className="w-4 h-4" /> Copiar Código
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
