import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const { addTask } = useApp();
  
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(10);
  const [recurring, setRecurring] = useState(false);
  const [requiresPhoto, setRequiresPhoto] = useState(false);

  const handleSave = () => {
    if (!title) return;
    
    addTask({
      id: Date.now().toString(),
      title,
      points,
      completed: false,
      recurring,
      requiresPhoto,
      dueDate: 'Pendiente'
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
      <div className="flex flex-col h-full">
        <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-border-light/50 dark:border-border-dark/50">
          <button onClick={() => navigate('/dashboard')} className="flex items-center justify-center size-10 shrink-0 text-text-light dark:text-text-dark">
            <span className="material-symbols-outlined text-3xl">arrow_back</span>
          </button>
          <h1 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Nueva Tarea</h1>
          <div className="size-10 shrink-0"></div>
        </header>
        
        <main className="flex-grow px-4 pt-6 pb-28">
          <div className="flex flex-col gap-6">
            <label className="flex flex-col w-full">
              <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Nombre de la Tarea</p>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-text-light dark:text-text-dark bg-white dark:bg-black/20 focus:outline-0 focus:ring-2 focus:ring-primary border border-border-light dark:border-border-dark h-14 placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark p-4 text-base font-normal leading-normal" 
                placeholder="Ej: Sacar la basura" 
              />
            </label>
            
            <label className="flex flex-col w-full">
              <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Descripción (Opcional)</p>
              <textarea className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-text-light dark:text-text-dark bg-white dark:bg-black/20 focus:outline-0 focus:ring-2 focus:ring-primary border border-border-light dark:border-border-dark min-h-36 placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark p-4 text-base font-normal leading-normal" placeholder="Añade más detalles aquí..."></textarea>
            </label>

            <label className="flex flex-col w-full">
              <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Puntos de la Tarea</p>
              <div className="relative flex items-center">
                <input 
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-text-light dark:text-text-dark bg-white dark:bg-black/20 focus:outline-0 focus:ring-2 focus:ring-primary border border-border-light dark:border-border-dark h-14 placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark p-4 text-base font-normal leading-normal" 
                />
                <div className="absolute right-3 flex gap-1">
                  <button onClick={() => setPoints(p => Math.max(0, p - 5))} className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">-</button>
                  <button onClick={() => setPoints(p => p + 5)} className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">+</button>
                </div>
              </div>
            </label>

            <div className="flex flex-col w-full gap-4 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-black/20 p-4">
              <div className="flex items-center justify-between">
                <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">Tarea recurrente</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-primary"></div>
                  <div className={`absolute top-0.5 left-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform ${recurring ? 'translate-x-full border-white' : ''}`}></div>
                </label>
              </div>
              {recurring && (
                <div className="flex flex-col w-full gap-2 pt-4 border-t border-border-light dark:border-border-dark">
                  <p className="text-text-light/80 dark:text-text-dark/80 text-base font-medium leading-normal pb-1">Frecuencia</p>
                  <select className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-text-light dark:text-text-dark bg-white dark:bg-black/20 focus:outline-0 focus:ring-2 focus:ring-primary border border-border-light dark:border-border-dark h-14 p-4 text-base font-normal leading-normal">
                    <option>Diaria</option>
                    <option>Semanal</option>
                    <option>Mensual</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex flex-col w-full gap-4 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-black/20 p-4">
              <div className="flex items-center justify-between">
                <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">Exigir foto como evidencia</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={requiresPhoto} onChange={(e) => setRequiresPhoto(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-primary"></div>
                  <div className={`absolute top-0.5 left-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform ${requiresPhoto ? 'translate-x-full border-white' : ''}`}></div>
                </label>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light to-transparent dark:from-background-dark dark:to-transparent">
          <button onClick={handleSave} className="flex w-full items-center justify-center rounded-lg h-14 bg-primary text-white text-base font-bold leading-normal shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity">
            Guardar Tarea
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateTask;