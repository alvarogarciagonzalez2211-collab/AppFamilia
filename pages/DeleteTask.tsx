import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Task } from '../types';

const DeleteTask: React.FC = () => {
  const navigate = useNavigate();
  const { tasks, deleteTask } = useApp();
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display bg-background-light dark:bg-background-dark">
      <div className="relative flex flex-col flex-grow w-full">
        <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
          <div className="flex items-center p-4 justify-between">
            <button onClick={() => navigate('/dashboard')} className="flex size-12 shrink-0 items-center justify-start text-[#333333] dark:text-white">
              <span className="material-symbols-outlined text-3xl">arrow_back</span>
            </button>
            <h1 className="text-[#333333] dark:text-white text-xl font-bold leading-tight tracking-tighter">Eliminar Tarea</h1>
            <div className="flex w-12 items-center justify-end"></div>
          </div>
        </header>

        <main className="flex-grow px-4 pb-24 space-y-3">
          <p className="px-2 pb-2 text-sm text-gray-500 dark:text-gray-400">Toca el icono de la papelera para eliminar una tarea.</p>
          
          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-16 px-6">
              <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-500 mb-4">task_alt</span>
              <h3 className="text-lg font-semibold text-[#333333] dark:text-gray-200">¡Todo limpio!</h3>
              <p className="text-[#888888] dark:text-gray-400 mt-1">No hay tareas para eliminar.</p>
            </div>
          )}

          {tasks.map(task => (
            <div key={task.id} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm min-h-[80px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                 <span className="material-symbols-outlined text-2xl">task</span>
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <p className="text-[#333333] dark:text-gray-100 text-base font-medium leading-normal">{task.title}</p>
                <p className="text-[#888888] dark:text-gray-400 text-sm font-normal leading-normal">{task.points} pts</p>
              </div>
              <button 
                onClick={() => setTaskToDelete(task)}
                className="shrink-0 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2"
              >
                <span className="material-symbols-outlined text-2xl">delete</span>
              </button>
            </div>
          ))}
        </main>
      </div>

      {/* Confirmation Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
            <h2 className="text-xl font-bold text-[#333333] dark:text-white">¿Estás seguro?</h2>
            <p className="mt-2 text-sm text-[#888888] dark:text-gray-400">
              Esta acción eliminará la tarea '{taskToDelete.title}' permanentemente. No se puede deshacer.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button 
                onClick={() => setTaskToDelete(null)}
                className="flex-1 rounded-full bg-gray-200 dark:bg-gray-600 px-4 py-2.5 text-sm font-semibold text-[#333333] dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleDeleteConfirm}
                className="flex-1 rounded-full bg-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteTask;