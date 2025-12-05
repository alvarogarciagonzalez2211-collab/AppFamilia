import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import BottomNav from '../components/BottomNav';

const Rewards: React.FC = () => {
  const navigate = useNavigate();
  const { user, rewards, redeemReward } = useApp();

  const handleRedeem = (id: string) => {
    const success = redeemReward(id);
    if (success) {
      alert('¡Recompensa canjeada con éxito!');
    }
  };

  if (!user) return null;

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <header className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate('/dashboard')} className="text-gray-800 dark:text-gray-200 flex size-12 shrink-0 items-center justify-center">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Tus Recompensas</h1>
        <div className="flex size-12 shrink-0 items-center"></div>
      </header>
      
      <main className="flex-1 p-4 pb-24">
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 rounded-lg bg-white dark:bg-gray-800/50 p-6 shadow-sm">
            <div className="flex flex-col gap-1 flex-[2_2_0px]">
              <p className="text-gray-900 dark:text-white text-3xl font-bold leading-tight">{user.points} Puntos</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Este es tu saldo actual</p>
            </div>
            <div className="flex items-center justify-center text-yellow-400 dark:text-yellow-300">
              <span className="material-symbols-outlined text-6xl">emoji_events</span>
            </div>
          </div>
        </div>
        
        <h2 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em] px-0 pb-4 pt-2">Recompensas Disponibles</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {rewards.map(reward => {
            const canAfford = user.points >= reward.cost;
            return (
              <div key={reward.id} className={`flex flex-col items-stretch justify-start rounded-lg shadow-sm bg-white dark:bg-gray-800/50 overflow-hidden ${!canAfford ? 'opacity-70' : ''}`}>
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{ backgroundImage: `url("${reward.image}")` }}></div>
                <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
                  <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{reward.title}</p>
                  <div className="flex items-end gap-3 justify-between">
                    <div className="flex flex-col gap-1">
                      <p className={`font-semibold text-base leading-normal ${canAfford ? 'text-primary' : 'text-gray-400'}`}>{reward.cost} Puntos</p>
                      {reward.description && <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">{reward.description}</p>}
                    </div>
                    <button 
                      onClick={() => handleRedeem(reward.id)}
                      disabled={!canAfford}
                      className={`flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-6 text-sm font-bold leading-normal shadow transition-colors ${
                        canAfford 
                          ? 'bg-primary text-gray-900 hover:bg-opacity-90 cursor-pointer' 
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <span className="truncate">Canjear</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Rewards;