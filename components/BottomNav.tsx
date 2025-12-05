import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItemClass = (path: string) => `flex flex-1 flex-col items-center justify-center gap-1 ${
    isActive(path) ? 'text-text-light dark:text-text-dark' : 'text-subtle-light dark:text-subtle-dark'
  }`;

  const iconClass = (path: string) => `flex h-8 w-16 items-center justify-center ${
    isActive(path) ? 'rounded-full bg-primary/20' : ''
  }`;

  return (
    <div className="sticky bottom-0 z-50">
      <div className="flex justify-around border-t border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark/95 backdrop-blur-sm px-4 pb-3 pt-2 items-start">
        
        <button onClick={() => navigate('/dashboard')} className={navItemClass('/dashboard')}>
          <div className={iconClass('/dashboard')}>
            <span className={`material-symbols-outlined ${isActive('/dashboard') ? 'text-primary' : ''} ${isActive('/dashboard') ? 'filled' : ''}`}>home</span>
          </div>
          <p className="text-xs font-medium leading-normal tracking-[0.015em]">Inicio</p>
        </button>

        <button onClick={() => navigate('/task-list')} className={navItemClass('/task-list')}>
          <div className={iconClass('/task-list')}>
            <span className={`material-symbols-outlined ${isActive('/task-list') ? 'text-primary' : ''}`}>assignment</span>
          </div>
          <p className="text-xs font-medium leading-normal tracking-[0.015em]">Tareas</p>
        </button>

        <button onClick={() => navigate('/rewards')} className={navItemClass('/rewards')}>
          <div className={iconClass('/rewards')}>
            <span className={`material-symbols-outlined ${isActive('/rewards') ? 'text-primary' : ''}`}>star</span>
          </div>
          <p className="text-xs font-medium leading-normal tracking-[0.015em]">Recompensas</p>
        </button>

        <button onClick={() => navigate('/family-settings')} className={navItemClass('/family-settings')}>
          <div className={iconClass('/family-settings')}>
            <span className={`material-symbols-outlined ${isActive('/family-settings') ? 'text-primary' : ''}`}>group</span>
          </div>
          <p className="text-xs font-medium leading-normal tracking-[0.015em]">Familia</p>
        </button>

        <button onClick={() => navigate('/my-families')} className={navItemClass('/my-families')}>
          <div className={iconClass('/my-families')}>
            <span className={`material-symbols-outlined ${isActive('/my-families') ? 'text-primary' : ''}`}>groups</span>
          </div>
          <p className="text-xs font-medium leading-normal tracking-[0.015em]">Mis Familias</p>
        </button>

      </div>
    </div>
  );
};

export default BottomNav;