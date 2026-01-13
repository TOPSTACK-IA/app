
import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';

interface CrudActionsProps {
  itemName: string;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const CrudActions: React.FC<CrudActionsProps> = ({ itemName, onView, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteClick = () => {
    setIsOpen(false);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowConfirm(false);
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-xl transition-all duration-200 ${
          isOpen 
            ? 'bg-gray-200 dark:bg-zinc-800 text-topstack-teal scale-110' 
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800/60'
        }`}
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl z-50 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          <button 
            onClick={() => { onView(); setIsOpen(false); }}
            className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-topstack-teal/10 hover:text-topstack-teal flex items-center gap-3 transition-colors"
          >
            <Eye className="w-4 h-4" /> Visualizar
          </button>
          <button 
            onClick={() => { onEdit(); setIsOpen(false); }}
            className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 flex items-center gap-3 transition-colors"
          >
            <Edit className="w-4 h-4" /> Editar
          </button>
          <div className="h-[1px] bg-gray-100 dark:bg-zinc-800/60 my-1 mx-3"></div>
          <button 
            onClick={handleDeleteClick}
            className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-3 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Excluir
          </button>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a] rounded-[3rem] w-full max-w-md shadow-2xl border border-white/10 overflow-hidden transform animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="w-24 h-24 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center text-red-500 mx-auto mb-8 shadow-inner border border-red-500/20">
                <AlertTriangle className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-black text-center text-white tracking-tighter">Confirmar exclusão?</h3>
              <p className="text-center text-zinc-500 mt-4 text-sm font-medium leading-relaxed">
                Você está prestes a excluir <span className="font-bold text-white">"{itemName}"</span>.
              </p>
            </div>
            <div className="p-8 bg-black/40 flex items-center justify-end gap-10 border-t border-white/5">
              <button 
                onClick={() => setShowConfirm(false)}
                className="text-zinc-600 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete}
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
