import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Reward } from '../types';

const DeleteReward: React.FC = () => {
  const navigate = useNavigate();
  const { rewards, deleteReward } = useApp();
  const [rewardToDelete, setRewardToDelete] = useState<Reward | null>(null);

  const handleDeleteConfirm = () => {
    if (rewardToDelete) {
      deleteReward(rewardToDelete.id);
      setRewardToDelete(null);
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
            <h1 className="text-[#333333] dark:text-white text-xl font-bold leading-tight tracking-tighter">Eliminar Recompensa</h1>
            <div className="flex w-12 items-center justify-end"></div>
          </div>
        </header>

        <main className="flex-grow px-4 pb-24 space-y-3 pt-2">
          <p className="px-2 pb-2 text-sm text-gray-500 dark:text-gray-400">Toca el icono de la papelera para eliminar una recompensa.</p>
          
          {rewards.length === 0 && (
             <div className="flex flex-col items-center justify-center text-center py-16 px-6">
              <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-500 mb-4">emoji_events</span>
              <p className="text-[#888888] dark:text-gray-400 mt-1">No hay recompensas para eliminar.</p>
            </div>
          )}

          {rewards.map((reward, index) => {
             // Mock colors for variety
             const colors = ['text-blue-500 bg-blue-100', 'text-yellow-500 bg-yellow-100', 'text-green-500 bg-green-100', 'text-purple-500 bg-purple-100'];
             const colorClass = colors[index % colors.length];
             
             return (
              <div key={reward.id} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm min-h-[80px]">
                <div className={`flex items-center justify-center h-12 w-12 rounded-full ${colorClass} dark:bg-opacity-20`}>
                  <span className="material-symbols-outlined text-3xl">emoji_events</span>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <p className="text-[#333333] dark:text-gray-100 text-base font-medium leading-normal">{reward.title}</p>
                  <p className="text-[#888888] dark:text-gray-400 text-sm font-normal leading-normal">{reward.cost} puntos</p>
                </div>
                <button 
                  onClick={() => setRewardToDelete(reward)}
                  className="shrink-0 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-2 rounded-full active:bg-gray-100 dark:active:bg-gray-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">delete</span>
                </button>
              </div>
             );
          })}
        </main>
      </div>

      {rewardToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-lg bg-white dark:bg-gray-800 p-6 m-4 flex flex-col items-center text-center shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40 mb-4">
              <span className="material-symbols-outlined text-4xl text-red-500 dark:text-red-400">delete</span>
            </div>
            <h2 className="text-xl font-bold text-[#333333] dark:text-white">Eliminar Recompensa</h2>
            <p className="mt-2 mb-6 text-gray-600 dark:text-gray-300">¿Estás seguro de que quieres eliminar esta recompensa?</p>
            <div className="flex w-full gap-3">
              <button 
                onClick={() => setRewardToDelete(null)}
                className="flex-1 rounded-full bg-gray-200 dark:bg-gray-600 px-4 py-3 text-base font-bold text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                No
              </button>
              <button 
                onClick={handleDeleteConfirm}
                className="flex-1 rounded-full bg-red-500 px-4 py-3 text-base font-bold text-white hover:bg-red-600 transition-colors"
              >
                Sí
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteReward;