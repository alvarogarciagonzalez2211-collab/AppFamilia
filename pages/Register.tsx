
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../AppContext';
import { User } from '../types';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createFamily, joinFamily } = useApp();
  
  const [name, setName] = useState('');
  const [role, setRole] = useState<User['role'] | null>(null);
  
  const state = location.state as { mode: 'create' | 'join', familyName?: string, inviteCode?: string } | undefined;

  useEffect(() => {
    if (!state) {
        navigate('/');
    }
  }, [state, navigate]);

  const handleRegister = () => {
    if (name && role && state) {
      const avatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCefif-qBSrdXLgrWqrSFSpIt6mRchpcUmSl4qg9uZjRt62Kbzpj3vfNX6SN4WKEbn8js0m2Bt_OdE3ae5jr8HxMioYwlgFzoWQPmN1TMY6hz7CKHfNhQXS0MvkQv1x1K1y6y4PWjJRTMKOzwWtipTme9001X1-6UaGUl3bX6Ky6rI38yXaB52bGDukmgWNvmvT2VT648zJNYE1Nt-2_8S2MM3Qb9zVHG3Edt8QJH0vWeyqHJT7rjWGtnrP6RuhGhtLcsNDQfnWu50';
      
      if (state.mode === 'create' && state.familyName) {
        createFamily(state.familyName, name, role, avatarUrl);
        navigate('/dashboard');
      } else if (state.mode === 'join' && state.inviteCode) {
        const success = joinFamily(state.inviteCode, name, role, avatarUrl);
        if (success) {
            navigate('/dashboard');
        } else {
            alert('Código de invitación no válido o familia no encontrada.');
        }
      }
    }
  };

  const roleButtonClass = (selected: boolean) => 
    `flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 text-center transition-all duration-200 h-28 cursor-pointer ${
      selected 
        ? 'border-primary bg-primary/20' 
        : 'border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark hover:border-primary/50'
    }`;

  if (!state) return null;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="flex size-12 shrink-0 items-center justify-center text-text-light dark:text-text-dark">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            {state.mode === 'create' ? 'Crear Familia' : 'Unirse a Familia'}
        </h2>
      </header>
      
      <main className="flex flex-1 flex-col px-4 pt-6 pb-8">
        <div className="flex flex-col items-center">
          <h1 className="text-text-light dark:text-text-dark tracking-light text-[32px] font-bold leading-tight text-center pb-2">Casi listo</h1>
          <p className="text-text-light/80 dark:text-text-dark/80 text-base font-normal leading-normal pb-8 text-center max-w-xs">
            Introduce tus datos para {state.mode === 'create' ? 'crear tu grupo' : 'unirte al grupo'}.
          </p>
        </div>

        <div className="mb-8">
          <label className="flex flex-col w-full">
            <p className="text-base font-medium leading-normal pb-2">Tu nombre</p>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark focus:border-primary h-14 placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark p-[15px] text-base font-normal leading-normal" 
              placeholder="Escribe tu nombre aquí" 
            />
          </label>
        </div>

        <div>
          <p className="text-base font-medium leading-normal pb-3">¿Cuál es tu rol?</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setRole('Padre')} className={roleButtonClass(role === 'Padre')}>
              <span className={`material-symbols-outlined text-3xl ${role === 'Padre' ? 'text-primary' : 'text-text-light/80 dark:text-text-dark/80'}`}>man</span>
              <span className="font-semibold text-base">Padre</span>
            </button>
            <button onClick={() => setRole('Madre')} className={roleButtonClass(role === 'Madre')}>
              <span className={`material-symbols-outlined text-3xl ${role === 'Madre' ? 'text-primary' : 'text-text-light/80 dark:text-text-dark/80'}`}>woman</span>
              <span className="font-medium text-base">Madre</span>
            </button>
            <button onClick={() => setRole('Hijo/a')} className={roleButtonClass(role === 'Hijo/a')}>
              <span className={`material-symbols-outlined text-3xl ${role === 'Hijo/a' ? 'text-primary' : 'text-text-light/80 dark:text-text-dark/80'}`}>child_care</span>
              <span className="font-medium text-base">Hijo/a</span>
            </button>
            <button onClick={() => setRole('Otro')} className={roleButtonClass(role === 'Otro')}>
              <span className={`material-symbols-outlined text-3xl ${role === 'Otro' ? 'text-primary' : 'text-text-light/80 dark:text-text-dark/80'}`}>diversity_3</span>
              <span className="font-medium text-base">Otro</span>
            </button>
          </div>
        </div>

        <div className="flex-grow"></div>

        <div className="mt-8">
          <button 
            onClick={handleRegister}
            disabled={!name || !role}
            className={`flex w-full items-center justify-center rounded-lg h-14 text-center text-base font-bold text-background-dark transition-all ${
              name && role ? 'bg-primary hover:opacity-90 active:opacity-80' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirmar Registro
          </button>
        </div>
      </main>
    </div>
  );
};

export default Register;
