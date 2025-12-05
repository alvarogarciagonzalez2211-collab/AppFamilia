
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import BottomNav from '../components/BottomNav';

const MyFamilies: React.FC = () => {
  const navigate = useNavigate();
  const { families, currentFamily, joinFamily, createFamily, user, families: allFamilies } = useApp();
  
  // Modal states
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Input states
  const [inviteCode, setInviteCode] = useState('');
  const [newFamilyName, setNewFamilyName] = useState('');

  // Mock data mapping to icons/colors for variety
  const getFamilyIcon = (index: number) => {
    const icons = ['family_restroom', 'work', 'sports_esports'];
    return icons[index % icons.length];
  };

  const handleJoin = () => {
    if (!inviteCode.trim() || !user) return;
    
    const success = joinFamily(inviteCode, user.name, user.role, user.avatar);
    if (success) {
      setShowJoinModal(false);
      setInviteCode('');
      // Optional: Navigate to dashboard or stay here to see the list update
      alert(`Te has unido a la familia correctamente.`);
    } else {
      alert('Código inválido o ya perteneces a esta familia.');
    }
  };

  const handleCreate = () => {
    if (!newFamilyName.trim() || !user) return;

    createFamily(newFamilyName, user.name, user.role, user.avatar);
    setShowCreateModal(false);
    setNewFamilyName('');
    // The context switches immediately, we can notify the user
    alert(`Familia "${newFamilyName}" creada y seleccionada.`);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark/80 px-4 backdrop-blur-sm">
        <button onClick={() => navigate('/dashboard')} className="flex h-9 w-9 items-center justify-center">
          <span className="material-symbols-outlined text-text-light dark:text-text-dark text-2xl">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold">Mis Familias</h1>
        <div className="h-9 w-9"></div>
      </header>

      <main className="flex-grow p-4 pb-24">
        <div className="flex h-full flex-col">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Tus Familias</h2>
            <p className="mt-1 text-sm text-subtle-light dark:text-subtle-dark">Gestiona las familias a las que perteneces.</p>
          </div>

          <div className="flex flex-col gap-3">
            {families.map((family, index) => {
              const isCurrent = currentFamily?.id === family.id;
              return (
                <div key={family.id} className={`flex items-center justify-between rounded-lg bg-card-light dark:bg-card-dark p-4 border ${isCurrent ? 'border-primary/50' : 'border-border-light dark:border-border-dark'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isCurrent ? 'bg-primary/20' : 'bg-subtle-light/20 dark:bg-subtle-dark/10'}`}>
                      <span className={`material-symbols-outlined text-2xl ${isCurrent ? 'text-primary' : 'text-subtle-light dark:text-subtle-dark'}`}>
                        {getFamilyIcon(index)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold">{family.name}</p>
                      <p className="text-xs text-subtle-light dark:text-subtle-dark">{family.members} miembros</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCurrent ? (
                      <div className="flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                        <span className="material-symbols-outlined text-sm filled">check_circle</span>
                        <span>Activa</span>
                      </div>
                    ) : (
                      // Note: Switching functionality would require an extra context function 'switchFamily(id)', 
                      // for now we just show the button as per design, but logic would be similar to join.
                      <button className="rounded-full px-4 py-2 text-sm font-semibold bg-primary/20 text-primary hover:bg-primary/30 opacity-50 cursor-not-allowed" title="Funcionalidad de cambio rápido pendiente">
                        Cambiar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
            <h2 className="text-xl font-bold">Opciones</h2>
            <p className="mt-1 mb-6 text-sm text-subtle-light dark:text-subtle-dark">Añade una nueva familia a tu cuenta.</p>
            <div className="space-y-4">
              <button 
                onClick={() => setShowJoinModal(true)}
                className="flex w-full items-center justify-between rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 text-left hover:bg-gray-50 dark:hover:bg-card-dark/80"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <span className="material-symbols-outlined text-primary">qr_code_scanner</span>
                  </div>
                  <div>
                    <p className="font-semibold">Unirse a una Familia</p>
                    <p className="text-sm text-subtle-light dark:text-subtle-dark">Usa un código de invitación</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-subtle-light dark:text-subtle-dark">arrow_forward_ios</span>
              </button>
              
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex w-full items-center justify-between rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 text-left hover:bg-gray-50 dark:hover:bg-card-dark/80"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <span className="material-symbols-outlined text-primary">add_circle</span>
                  </div>
                  <div>
                    <p className="font-semibold">Crear Nueva Familia</p>
                    <p className="text-sm text-subtle-light dark:text-subtle-dark">Inicia y configura tu grupo</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-subtle-light dark:text-subtle-dark">arrow_forward_ios</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />

      {/* Join Family Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Unirse a Familia</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Introduce el código de 6 caracteres.</p>
            <input 
              type="text" 
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-base text-gray-900 dark:text-white mb-6 focus:ring-2 focus:ring-primary focus:border-primary outline-none uppercase placeholder:normal-case"
              placeholder="Ej: ABC-123"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowJoinModal(false)} className="flex-1 rounded-lg py-3 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Cancelar</button>
              <button onClick={handleJoin} className="flex-1 rounded-lg py-3 font-bold text-white bg-primary hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Unirse</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Family Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Crear Nueva Familia</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Elige un nombre para tu nuevo grupo.</p>
            <input 
              type="text" 
              value={newFamilyName}
              onChange={(e) => setNewFamilyName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-base text-gray-900 dark:text-white mb-6 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="Ej: Casa de la Playa"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowCreateModal(false)} className="flex-1 rounded-lg py-3 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Cancelar</button>
              <button onClick={handleCreate} className="flex-1 rounded-lg py-3 font-bold text-white bg-primary hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Crear</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyFamilies;
