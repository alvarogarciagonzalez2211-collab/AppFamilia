import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import BottomNav from '../components/BottomNav';

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const { tasks, toggleTaskStatus, user, addTaskEvidence } = useApp();

  const myTasks = user ? tasks.filter(task => task.assignedTo === user.name) : [];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display" style={{"--checkbox-tick-svg": "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(17,24,19)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')"} as React.CSSProperties}>
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <button onClick={() => navigate('/dashboard')} className="flex size-12 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined text-gray-800 dark:text-gray-200" style={{ fontSize: '28px' }}>arrow_back</span>
        </button>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Mis Tareas</h2>
        <div className="flex w-12 items-center justify-end"></div>
      </div>

      <div className="p-4 pt-2">
        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-4">PENDIENTES</h3>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-28 flex-grow">
        {myTasks.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                <p>No tienes tareas asignadas.</p>
            </div>
        )}
        {myTasks.map(task => (
          <div key={task.id} className={`flex flex-col gap-3 bg-white dark:bg-gray-800/50 p-4 rounded-lg ${task.completed ? 'opacity-60' : ''}`}>
            <div className="flex items-start gap-4 min-h-14 justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex size-7 items-center justify-center shrink-0 pt-0.5">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleTaskStatus(task.id)}
                    className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 border-2 bg-transparent text-primary checked:bg-primary checked:border-primary checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-gray-300 dark:focus:border-gray-600 focus:outline-none cursor-pointer"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <p className={`text-gray-900 dark:text-white text-base font-normal leading-normal ${task.completed ? 'line-through' : ''}`}>{task.title}</p>
                  {task.dueDate && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="material-symbols-outlined text-sm text-gray-500 dark:text-gray-400" style={{ fontSize: '14px' }}>calendar_today</span>
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">{task.dueDate}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="shrink-0 flex items-center justify-center rounded-full bg-primary/20 px-3 py-1 mt-0.5">
                <span className="text-primary font-bold text-sm">{task.points} pts</span>
              </div>
            </div>
            
            {!task.completed && task.requiresPhoto && (
              <div className="flex items-center gap-2 pl-11">
                {task.evidencePhoto ? (
                  <div className="relative">
                    <img src={task.evidencePhoto} alt="Evidencia" className="h-12 w-12 rounded-md object-cover border border-gray-200 dark:border-gray-700" />
                    <button 
                      onClick={() => addTaskEvidence(task.id, undefined)}
                      className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow-sm transition-colors"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm text-red-500" style={{ fontSize: '16px' }}>error</span>
                    <p className="text-red-500 text-xs font-medium">Adjunta una foto para completar</p>
                  </>
                )}
                
                <label className="ml-auto flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          addTaskEvidence(task.id, reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }} 
                  />
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{task.evidencePhoto ? 'edit' : 'add_a_photo'}</span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default TaskList;