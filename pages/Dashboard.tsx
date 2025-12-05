import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import BottomNav from '../components/BottomNav';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, tasks } = useApp();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  if (!user) {
    // Should ideally redirect, but for dev flow render loading or redirect
    setTimeout(() => navigate('/'), 0);
    return null;
  }

  const MenuCard = ({ icon, title, subtitle, onClick, danger = false }: any) => (
    <button onClick={onClick} className="flex flex-1 flex-col gap-3 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 items-center text-center hover:bg-gray-50 dark:hover:bg-card-dark/80 transition-colors w-full h-full">
      <span className={`material-symbols-outlined ${danger ? 'text-red-500 dark:text-red-400' : 'text-text-light dark:text-text-dark'}`} style={{ fontSize: '28px' }}>{icon}</span>
      <div className="flex flex-col gap-1">
        <h2 className="text-text-light dark:text-text-dark text-base font-bold leading-tight">{title}</h2>
        <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">{subtitle}</p>
      </div>
    </button>
  );

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark">
      <main className="flex-grow">
        <div className="p-4 @container">
          <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
            <div className="flex gap-4">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 min-h-24" style={{ backgroundImage: `url("${user.avatar}")` }}></div>
              <div className="flex flex-col justify-center">
                <p className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">¡Hola, {user.name}!</p>
                <p className="text-subtle-light dark:text-subtle-dark text-base font-normal leading-normal">Tienes {user.points} Puntos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <div className="flex gap-6 justify-between">
            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">Progreso de la semana</p>
            <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">{completedTasks}/{totalTasks} tareas</p>
          </div>
          <div className="rounded-full bg-border-light dark:bg-border-dark/50 overflow-hidden">
            <div className="h-2 rounded-full bg-primary transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          <MenuCard icon="assignment_ind" title="Asignar Tareas" subtitle="Distribuye tareas" onClick={() => navigate('/assign-tasks')} />
          <MenuCard icon="checklist" title="Mis Tareas" subtitle="Ver tus pendientes" onClick={() => navigate('/task-list')} />
          <MenuCard icon="redeem" title="Canjear Puntos" subtitle="Usa tus puntos" onClick={() => navigate('/rewards')} />
          <MenuCard icon="add_task" title="Crear Tarea" subtitle="Añadir nueva tarea" onClick={() => navigate('/create-task')} />
          <MenuCard icon="emoji_events" title="Crear Recompensa" subtitle="Añadir un premio" onClick={() => navigate('/create-reward')} />
          <MenuCard icon="task_alt" title="Eliminar Tarea" subtitle="Quitar una tarea" onClick={() => navigate('/delete-task')} danger={true} />
          <MenuCard icon="delete_forever" title="Eliminar Recompensa" subtitle="Quitar un premio" onClick={() => navigate('/delete-reward')} danger={true} />
          <MenuCard icon="settings" title="Gestionar" subtitle="Editar y eliminar" onClick={() => navigate('/family-settings')} />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Dashboard;