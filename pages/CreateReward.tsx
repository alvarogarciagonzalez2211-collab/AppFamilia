import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';

const CreateReward: React.FC = () => {
  const navigate = useNavigate();
  const { addReward } = useApp();
  
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState(100);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!title) return;
    
    addReward({
      id: Date.now().toString(),
      title,
      cost,
      description,
      // Use uploaded image or default placeholder
      image: image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhPHaKTtcGFF5gxqdkE_FWoVk_fuixO6KQx5KdYNN-duBy9mPYYXFShg-m7ornfDRRGI1r3N44TE7ww3fD9DPG0CK0xmJ_uyG874OhhD1Up87g1Z-9fz3dm9aA50sxSTs8I8z4lQWF_X1jS_Y5Z0dUgLEcFXSDka1XcCe5jEmSiWw49BFkqEJzgbemzJHJrFX_x8fKjMlh_QUeLGx38krMbm7hKVzDAKBWtVii1XuDiKefAxCnkiQDNEBbMIId6EPm6YMnsqmwb5s'
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark group/design-root overflow-x-hidden font-display">
      <header className="flex items-center p-4 pb-2 justify-between bg-background-light dark:bg-background-dark sticky top-0 z-10">
        <button onClick={() => navigate('/dashboard')} className="flex size-12 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Crear Recompensa</h2>
        <div className="flex size-12 shrink-0 items-center"></div>
      </header>
      
      <main className="flex-grow flex flex-col px-4 pt-4 pb-2">
        <div className="flex flex-col gap-6">
          <label className="flex flex-col w-full">
            <p className="text-base font-medium leading-normal pb-2">Nombre de la Recompensa</p>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-white dark:bg-background-dark h-14 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] text-base font-normal leading-normal" 
              placeholder="Ej: Una hora de videojuegos" 
            />
          </label>
          
          <label className="flex flex-col w-full">
            <p className="text-base font-medium leading-normal pb-2">Descripción (opcional)</p>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-white dark:bg-background-dark min-h-36 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] text-base font-normal leading-normal" 
              placeholder="Ej: Canjeable cualquier día de la semana"
            ></textarea>
          </label>

          <label className="flex flex-col w-full">
            <p className="text-base font-medium leading-normal pb-2">Imagen de portada</p>
            <div className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border-light dark:border-border-dark rounded-lg cursor-pointer bg-white dark:bg-black/20 hover:bg-gray-50 dark:hover:bg-black/30 transition-colors overflow-hidden group">
                {image ? (
                    <div className="w-full h-full relative">
                        <img src={image} alt="Reward preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-white text-3xl">edit</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-subtle-light dark:text-subtle-dark">
                        <span className="material-symbols-outlined text-4xl mb-2">add_photo_alternate</span>
                        <p className="text-sm">Clic para adjuntar una foto</p>
                    </div>
                )}
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handleImageChange} />
            </div>
          </label>
          
          <label className="flex flex-col w-full">
            <p className="text-base font-medium leading-normal pb-2">Coste en Puntos</p>
            <div className="flex w-full flex-1 items-stretch rounded-lg border border-border-light dark:border-border-dark focus-within:ring-2 focus-within:ring-primary/50 overflow-hidden">
              <input 
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="form-input flex w-full min-w-0 flex-1 resize-none text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border-0 bg-white dark:bg-background-dark h-14 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] pr-2 text-base font-normal leading-normal" 
                placeholder="Ej: 100" 
              />
              <div className="text-subtle-light dark:text-subtle-dark flex bg-white dark:bg-background-dark items-center justify-center pr-[15px]">
                <span className="material-symbols-outlined text-yellow-500 filled">star</span>
              </div>
            </div>
          </label>
        </div>
      </main>
      
      <footer className="flex p-4 sticky bottom-0 bg-background-light dark:bg-background-dark">
        <button 
          onClick={handleSave}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 flex-1 bg-primary text-text-light text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 active:scale-95 transition-transform"
        >
          <span className="truncate">Guardar Recompensa</span>
        </button>
      </footer>
    </div>
  );
};

export default CreateReward;