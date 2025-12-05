
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';

const FamilyMembers: React.FC = () => {
  const navigate = useNavigate();
  const { members, tasks, currentFamily } = useApp();

  const getPendingTasksCount = (memberName: string) => {
    const count = tasks.filter(t => t.assignedTo === memberName && !t.completed).length;
    if (count === 0) return 'Sin tareas pendientes';
    if (count === 1) return '1 tarea pendiente';
    return `${count} tareas pendientes`;
  };

  const handleMemberClick = (memberName: string) => {
    navigate('/assign-tasks', { state: { selectedMember: memberName } });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-[#111813] dark:text-white">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <button onClick={() => navigate('/dashboard')} className="flex size-12 shrink-0 items-center justify-start text-[#111813] dark:text-white">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <h1 className="text-[#111813] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">{currentFamily?.name || 'Mi Familia'}</h1>
        <div className="flex w-12 items-center justify-end">
          <button onClick={() => navigate('/family-settings')} className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 w-12 bg-transparent text-[#111813] dark:text-white">
            <span className="material-symbols-outlined text-2xl">settings</span>
          </button>
        </div>
      </header>

      <main className="flex-grow px-4">
        <div className="h-4"></div>
        <div className="mb-4">
          <a href="#" className="flex items-center gap-4 rounded-lg bg-white dark:bg-background-dark/50 p-4 shadow-sm transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-background-dark/80" onClick={(e) => { e.preventDefault(); navigate('/edit-profile'); }}>
            <span className="material-symbols-outlined text-2xl text-primary">account_circle</span>
            <span className="flex-grow font-medium text-[#111813] dark:text-white">Modificar tu perfil</span>
            <span className="material-symbols-outlined text-2xl text-gray-400 dark:text-gray-500">arrow_forward_ios</span>
          </a>
        </div>

        <div className="mb-6 rounded-lg bg-white dark:bg-background-dark/50 p-4 shadow-sm">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Código de la Familia</p>
          <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">Comparte este código para invitar a nuevos miembros desde otro dispositivo.</p>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 p-3">
            <span className="material-symbols-outlined text-gray-500">key</span>
            <p className="flex-grow select-all text-base font-bold tracking-widest text-[#111813] dark:text-white">{currentFamily?.code || '---'}</p>
            <button 
                onClick={() => {navigator.clipboard.writeText(currentFamily?.code || '')}}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-xl">content_copy</span>
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-24">
          <h2 className="text-[#111813] dark:text-white text-base font-bold leading-tight px-2">Integrantes de la Familia</h2>
          {members.map((member) => (
            <div 
              key={member.id} 
              onClick={() => handleMemberClick(member.name)}
              className="flex cursor-pointer items-center gap-4 bg-white dark:bg-background-dark/50 p-4 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-background-dark/80 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 border-2 border-white dark:border-background-dark" data-alt={`Profile picture of ${member.name}`} style={{ backgroundImage: `url("${member.avatar}")` }}></div>
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <div className="flex items-baseline gap-2">
                  <p className="text-[#111813] dark:text-white text-base font-medium leading-normal line-clamp-1">{member.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">{member.role}</p>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2">{getPendingTasksCount(member.name)}</p>
              </div>
              <div className="shrink-0">
                <span className="material-symbols-outlined text-[#111813] dark:text-gray-400 text-2xl">assignment_add</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <div className="fixed bottom-6 right-6 z-20">
        <button className="flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary text-black shadow-lg hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined text-3xl">person_add</span>
        </button>
      </div>

    </div>
  );
};

export default FamilyMembers;
