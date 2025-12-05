
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { User } from '../types';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState<User['role']>(user?.role || 'Otro');
  const [avatar, setAvatar] = useState(user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCefif-qBSrdXLgrWqrSFSpIt6mRchpcUmSl4qg9uZjRt62Kbzpj3vfNX6SN4WKEbn8js0m2Bt_OdE3ae5jr8HxMioYwlgFzoWQPmN1TMY6hz7CKHfNhQXS0MvkQv1x1K1y6y4PWjJRTMKOzwWtipTme9001X1-6UaGUl3bX6Ky6rI38yXaB52bGDukmgWNvmvT2VT648zJNYE1Nt-2_8S2MM3Qb9zVHG3Edt8QJH0vWeyqHJT7rjWGtnrP6RuhGhtLcsNDQfnWu50');

  useEffect(() => {
    if (!user) {
        navigate('/');
    }
  }, [user, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (user) {
        setUser({
            ...user,
            name,
            role,
            avatar
        });
        navigate(-1);
    }
  };

  if (!user) return null;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display" style={{fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'}}>
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background-light dark:bg-background-dark/80 p-4 pb-2 backdrop-blur-sm">
        <div className="flex size-12 shrink-0 items-center justify-start">
            <span className="material-symbols-outlined text-[#111813] dark:text-white cursor-pointer" onClick={() => navigate(-1)}>arrow_back_ios_new</span>
        </div>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-[#111813] dark:text-white">Modificar Perfil</h2>
        <div className="size-12 shrink-0"></div>
      </div>
      <main className="flex flex-1 flex-col px-4">
        <div className="flex w-full flex-col items-center gap-4 p-4 @container">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-cover bg-center bg-no-repeat aspect-square w-32 min-h-32 rounded-full" data-alt="User profile avatar" style={{backgroundImage: `url("${avatar}")`}}></div>
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-full bg-primary/20 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-[#111813] dark:bg-primary/30 dark:text-white @[480px]:w-auto hover:bg-primary/30 transition-colors"
          >
            <span className="truncate">Cambiar foto</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
            style={{ display: 'none' }} 
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex max-w-full flex-wrap items-end gap-4 py-3">
            <label className="flex flex-1 flex-col min-w-40">
              <p className="pb-2 text-base font-medium leading-normal text-[#111813] dark:text-gray-300">Nombre</p>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input flex h-14 min-w-0 flex-1 w-full resize-none overflow-hidden rounded-lg border border-[#dbe6df] bg-white p-[15px] text-base font-normal leading-normal text-[#111813] placeholder:text-[#61896f] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/40 dark:border-gray-700 dark:bg-background-dark dark:text-white dark:focus:border-primary"
              />
            </label>
          </div>
          <div className="flex max-w-full flex-wrap items-end gap-4 py-3" style={{"--select-button-svg": "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(97,137,111)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')", "--dark-select-button-svg": "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(209,213,219)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')"} as React.CSSProperties}>
            <label className="flex flex-1 flex-col min-w-40">
              <p className="pb-2 text-base font-medium leading-normal text-[#111813] dark:text-gray-300">Rol Familiar</p>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value as User['role'])}
                className="form-select flex h-14 min-w-0 flex-1 w-full resize-none appearance-none overflow-hidden rounded-lg border border-[#dbe6df] bg-white bg-[image:--select-button-svg] bg-[center_right_1rem] bg-no-repeat p-[15px] text-base font-normal leading-normal text-[#111813] placeholder:text-[#61896f] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/40 dark:border-gray-700 dark:bg-background-dark dark:bg-[image:--dark-select-button-svg] dark:text-white dark:focus:border-primary"
              >
                <option value="Padre">Padre</option>
                <option value="Madre">Madre</option>
                <option value="Hijo/a">Hijo/a</option>
                <option value="Otro">Otro</option>
              </select>
            </label>
          </div>
        </div>
      </main>
      <div className="sticky bottom-0 mt-auto bg-background-light p-4 dark:bg-background-dark">
        <button 
          onClick={handleSave}
          className="flex min-w-[84px] max-w-[480px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-primary text-base font-bold leading-normal tracking-[0.015em] text-[#111813] dark:text-background-dark hover:opacity-90 transition-opacity"
        >
          <span className="truncate">Guardar Cambios</span>
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
