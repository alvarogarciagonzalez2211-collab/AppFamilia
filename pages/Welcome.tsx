
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [familyName, setFamilyName] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const handleCreate = () => {
    if (familyName.trim()) {
      navigate('/register', { state: { mode: 'create', familyName } });
    }
  };

  const handleJoin = () => {
    if (inviteCode.trim()) {
      navigate('/register', { state: { mode: 'join', inviteCode } });
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col items-center justify-center group/design-root overflow-x-hidden font-display bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md mx-auto p-4">
        <div className="flex justify-center items-center py-8">
          <div className="flex justify-center items-center h-24 w-24 rounded-lg bg-primary/20 text-primary">
            <span className="material-symbols-outlined !text-6xl">groups</span>
          </div>
        </div>
        <h1 className="text-text-light dark:text-text-dark tracking-light text-[32px] font-bold leading-tight text-center pb-3 pt-6">Bienvenido/a</h1>
        <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal pb-8 pt-1 px-4 text-center">
          Crea o únete a tu familia para empezar a gestionar tareas juntos.
        </p>
        
        <div className="bg-card-light dark:bg-background-dark/50 rounded-lg p-6 mb-6 border border-border-light dark:border-border-dark">
          <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-4">Crear una nueva familia</h3>
          <div className="flex w-full flex-col gap-4">
            <label className="flex flex-col w-full">
              <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Nombre de la familia</p>
              <input 
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-light dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" 
                placeholder="Ej: Familia Pérez" 
              />
            </label>
            <button 
              onClick={handleCreate}
              disabled={!familyName.trim()}
              className={`flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 w-full text-text-light text-base font-bold leading-normal tracking-[0.015em] transition-opacity ${familyName.trim() ? 'bg-primary hover:opacity-90' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500'}`}
            >
              <span className="truncate">Crear Familia</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 my-6">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">O</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <div className="bg-card-light dark:bg-background-dark/50 rounded-lg p-6 mb-6 border border-border-light dark:border-border-dark">
          <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-4">Unirse a una familia existente</h3>
          <div className="flex w-full flex-col gap-4">
            <label className="flex flex-col w-full">
              <div className="flex items-center justify-between pb-2">
                <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">Código de invitación</p>
                <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  <span className="material-symbols-outlined !text-base">help</span>
                  <span>¿Qué es esto?</span>
                </button>
              </div>
              <input 
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-light dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal" 
                placeholder="Ej: ABC-123" 
              />
            </label>
            <button 
              onClick={handleJoin}
              disabled={!inviteCode.trim()}
              className={`flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 w-full text-white dark:text-gray-100 text-base font-bold leading-normal tracking-[0.015em] transition-colors ${inviteCode.trim() ? 'bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600' : 'bg-gray-300 dark:bg-gray-800 cursor-not-allowed text-gray-500'}`}
            >
              <span className="truncate">Unirse a Familia</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
