import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../AppContext';

const AssignTasks: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tasks, assignTask, members } = useApp();
  
  const initialMember = (location.state as any)?.selectedMember || (members.length > 0 ? members[0].name : '');
  const [activeMemberName, setActiveMemberName] = useState(initialMember);

  const handleToggleAssign = (taskId: string, currentAssignee: string | undefined) => {
    if (currentAssignee === activeMemberName) {
      // Unassign
      assignTask(taskId, undefined);
    } else {
      // Assign (steal if necessary)
      assignTask(taskId, activeMemberName);
    }
  };

  const assignedCount = tasks.filter(t => t.assignedTo === activeMemberName).length;

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display" style={{"--checkbox-tick-svg": "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(17,24,19)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')"} as React.CSSProperties}>
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <button onClick={() => navigate('/dashboard')} className="text-[#102216] dark:text-[#f6f8f6] flex size-12 shrink-0 items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-[#102216] dark:text-[#f6f8f6] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Asignar Tareas</h2>
        <div className="flex size-12 shrink-0"></div>
      </div>

      <main className="flex-grow flex flex-col pb-28">
        <h2 className="text-[#102216] dark:text-[#f6f8f6] tracking-light text-[24px] font-bold leading-tight px-4 text-left pb-3 pt-5">Seleccionar Miembro</h2>
        <div className="flex w-full overflow-x-auto px-4 py-3 hide-scrollbar">
          <div className="flex min-h-min flex-row items-start justify-start gap-5">
            {members.map((member) => {
              const isSelected = member.name === activeMemberName;
              return (
                <button 
                  key={member.id} 
                  onClick={() => setActiveMemberName(member.name)}
                  className="flex flex-1 flex-col justify-center gap-2 w-16 text-center cursor-pointer transition-transform active:scale-95"
                >
                  <div className="relative">
                    <div className={`w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full transition-all duration-200 ${isSelected ? 'p-1 border-4 border-primary' : 'border-2 border-transparent'}`} style={{ backgroundImage: `url("${member.avatar}")` }}></div>
                    {isSelected && (
                      <div className="absolute -bottom-1 -right-1 bg-primary rounded-full text-white dark:text-background-dark flex items-center justify-center size-6 border-2 border-background-light dark:border-background-dark">
                        <span className="material-symbols-outlined text-base font-bold">check</span>
                      </div>
                    )}
                  </div>
                  <p className={`text-[13px] leading-normal transition-colors ${isSelected ? 'font-bold text-primary' : 'font-normal text-[#102216] dark:text-[#f6f8f6]'}`}>{member.name}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pb-3 pt-5">
            <h2 className="text-[#102216] dark:text-[#f6f8f6] text-[20px] font-bold leading-tight tracking-[-0.015em]">
                Tareas para {activeMemberName}
            </h2>
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{assignedCount} asignadas</span>
        </div>
        
        <div className="px-4 py-2">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div className="text-[#102216]/50 dark:text-[#f6f8f6]/50 flex border-none bg-white dark:bg-background-dark/50 items-center justify-center pl-4 rounded-l-xl border-r-0">
                <span className="material-symbols-outlined !fill-0">search</span>
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#102216] dark:text-[#f6f8f6] focus:outline-0 focus:ring-0 border-none bg-white dark:bg-background-dark/50 focus:border-none h-full placeholder:text-[#102216]/50 dark:placeholder:text-[#f6f8f6]/50 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Buscar tarea" />
            </div>
          </label>
        </div>

        <div className="flex flex-col gap-3 px-4 py-2">
          {tasks.map((task) => {
            const isAssignedToActive = task.assignedTo === activeMemberName;
            const isAssignedToOther = task.assignedTo && !isAssignedToActive;
            
            return (
              <div 
                key={task.id} 
                onClick={() => handleToggleAssign(task.id, task.assignedTo)}
                className={`flex items-center gap-4 rounded-lg p-4 cursor-pointer transition-all duration-200 border border-transparent ${isAssignedToActive ? 'bg-primary/10 border-primary/20' : 'bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
              >
                <div className="flex items-center justify-center shrink-0">
                   <div className={`h-6 w-6 rounded border-2 flex items-center justify-center transition-colors ${isAssignedToActive ? 'bg-primary border-primary' : 'border-gray-300 dark:border-gray-500 bg-transparent'}`}>
                     {isAssignedToActive && <span className="material-symbols-outlined text-white text-base font-bold">check</span>}
                   </div>
                </div>
                
                <div className="flex-grow">
                  <p className={`text-base ${isAssignedToActive ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-200'}`}>
                    {task.title}
                  </p>
                  {isAssignedToOther && (
                     <p className="text-xs text-orange-500 font-medium mt-0.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">person</span>
                        Asignado a {task.assignedTo}
                     </p>
                  )}
                </div>
                
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-lg">star</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 pt-2 border-t border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate('/dashboard')} className="w-full h-14 bg-primary text-[#102216] rounded-xl text-lg font-bold flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default AssignTasks;