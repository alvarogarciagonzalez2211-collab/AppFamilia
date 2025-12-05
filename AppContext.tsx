
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task, Reward, User, Family, Member } from './types';

interface AppContextType {
  user: User | null;
  currentFamily: Family | null;
  
  // Data filtered by current family
  tasks: Task[];
  rewards: Reward[];
  members: Member[];
  families: Family[]; // List of all known families (simulating DB)

  // Actions
  createFamily: (familyName: string, userName: string, userRole: User['role'], avatar: string) => void;
  joinFamily: (code: string, userName: string, userRole: User['role'], avatar: string) => boolean;
  
  addTask: (task: Omit<Task, 'familyId'>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  assignTask: (taskId: string, memberName: string | undefined) => void;
  addTaskEvidence: (taskId: string, photo: string | undefined) => void;
  
  addReward: (reward: Omit<Reward, 'familyId'>) => void;
  deleteReward: (id: string) => void;
  redeemReward: (id: string) => boolean;
  
  addMember: (member: Omit<Member, 'familyId'>) => void;
  
  setUser: (user: User | null) => void; // For profile updates
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to generate a random 6-character code
const generateFamilyCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Format as XXX-XXX
  return `${code.substring(0, 3)}-${code.substring(3, 6)}`;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from localStorage or empty arrays
  const [allFamilies, setAllFamilies] = useState<Family[]>(() => {
    const saved = localStorage.getItem('family_app_families');
    return saved ? JSON.parse(saved) : [];
  });

  const [allTasks, setAllTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('family_app_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [allRewards, setAllRewards] = useState<Reward[]>(() => {
    const saved = localStorage.getItem('family_app_rewards');
    return saved ? JSON.parse(saved) : [];
  });

  const [allMembers, setAllMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('family_app_members');
    return saved ? JSON.parse(saved) : [];
  });

  // Current session state
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('family_app_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentFamily, setCurrentFamily] = useState<Family | null>(() => {
    const saved = localStorage.getItem('family_app_current_family');
    return saved ? JSON.parse(saved) : null;
  });

  // Persistence Effects
  useEffect(() => localStorage.setItem('family_app_families', JSON.stringify(allFamilies)), [allFamilies]);
  useEffect(() => localStorage.setItem('family_app_tasks', JSON.stringify(allTasks)), [allTasks]);
  useEffect(() => localStorage.setItem('family_app_rewards', JSON.stringify(allRewards)), [allRewards]);
  useEffect(() => localStorage.setItem('family_app_members', JSON.stringify(allMembers)), [allMembers]);
  useEffect(() => {
    if (user) localStorage.setItem('family_app_current_user', JSON.stringify(user));
    else localStorage.removeItem('family_app_current_user');
  }, [user]);
  useEffect(() => {
    if (currentFamily) localStorage.setItem('family_app_current_family', JSON.stringify(currentFamily));
    else localStorage.removeItem('family_app_current_family');
  }, [currentFamily]);


  // --- Derived State (Filtered by current Family) ---
  const tasks = currentFamily ? allTasks.filter(t => t.familyId === currentFamily.id) : [];
  const rewards = currentFamily ? allRewards.filter(r => r.familyId === currentFamily.id) : [];
  const members = currentFamily ? allMembers.filter(m => m.familyId === currentFamily.id) : [];


  // --- Actions ---

  const createFamily = (familyName: string, userName: string, userRole: User['role'], avatar: string) => {
    const newFamilyId = Date.now().toString();
    const newFamily: Family = {
      id: newFamilyId,
      name: familyName,
      code: generateFamilyCode(),
      members: 1
    };

    const newUser: User = {
      id: Date.now().toString() + '-u',
      name: userName,
      role: userRole,
      avatar: avatar,
      points: 0,
      familyId: newFamilyId
    };

    const newMember: Member = {
      id: newUser.id,
      familyId: newFamilyId,
      name: userName,
      role: userRole,
      avatar: avatar
    };

    setAllFamilies(prev => [...prev, newFamily]);
    setAllMembers(prev => [...prev, newMember]);
    
    setCurrentFamily(newFamily);
    setUser(newUser);
  };

  const joinFamily = (code: string, userName: string, userRole: User['role'], avatar: string): boolean => {
    // Normalize code input
    const normalizedCode = code.toUpperCase().replace(/\s/g, '');
    const targetFamily = allFamilies.find(f => f.code.replace(/-/g, '') === normalizedCode.replace(/-/g, ''));

    if (!targetFamily) return false;

    const newUser: User = {
      id: Date.now().toString() + '-u',
      name: userName,
      role: userRole,
      avatar: avatar,
      points: 0,
      familyId: targetFamily.id
    };

    const newMember: Member = {
      id: newUser.id,
      familyId: targetFamily.id,
      name: userName,
      role: userRole,
      avatar: avatar
    };

    // Update member count on family
    setAllFamilies(prev => prev.map(f => f.id === targetFamily.id ? { ...f, members: f.members + 1 } : f));
    setAllMembers(prev => [...prev, newMember]);

    setCurrentFamily(targetFamily);
    setUser(newUser);
    return true;
  };

  const addTask = (task: Omit<Task, 'familyId'>) => {
    if (!currentFamily) return;
    const newTask: Task = { ...task, familyId: currentFamily.id };
    setAllTasks(prev => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setAllTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setAllTasks(prev => prev.map(t => {
      if (t.id === id) {
        const newStatus = !t.completed;
        
        // If we are completing the task, assign points to the assigned user
        // Note: In a real app, we'd find the user by ID. Here we match name for simplicity based on previous structure
        if (newStatus && t.assignedTo) {
           // We need to update the points of the member who completed it
           // For current session user visualization:
           if (user && t.assignedTo === user.name) {
             setUser({ ...user, points: user.points + t.points });
           }
        } else if (!newStatus && t.assignedTo && user && t.assignedTo === user.name) {
             // Revert points if unchecking
             setUser({ ...user, points: Math.max(0, user.points - t.points) });
        }

        return { ...t, completed: newStatus };
      }
      return t;
    }));
  };

  const assignTask = (taskId: string, memberName: string | undefined) => {
    setAllTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, assignedTo: memberName } : t
    ));
  };

  const addTaskEvidence = (taskId: string, photo: string | undefined) => {
    setAllTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, evidencePhoto: photo } : t
    ));
  };

  const addReward = (reward: Omit<Reward, 'familyId'>) => {
    if (!currentFamily) return;
    const newReward: Reward = { ...reward, familyId: currentFamily.id };
    setAllRewards(prev => [...prev, newReward]);
  };

  const deleteReward = (id: string) => {
    setAllRewards(prev => prev.filter(r => r.id !== id));
  };

  const redeemReward = (id: string): boolean => {
    const reward = rewards.find(r => r.id === id);
    if (!reward || !user) return false;

    if (user.points >= reward.cost) {
      setUser({ ...user, points: user.points - reward.cost });
      return true;
    }
    return false;
  };

  const addMember = (member: Omit<Member, 'familyId'>) => {
    if (!currentFamily) return;
    setAllMembers(prev => [...prev, { ...member, familyId: currentFamily.id }]);
  };

  const resetApp = () => {
    localStorage.clear();
    setAllTasks([]);
    setAllRewards([]);
    setAllMembers([]);
    setAllFamilies([]);
    setUser(null);
    setCurrentFamily(null);
  };

  // Update user profile wrapper to sync with members list
  const updateUser = (updatedUser: User | null) => {
    setUser(updatedUser);
    if (updatedUser) {
        setAllMembers(prev => prev.map(m => 
            (m.name === user?.name && m.familyId === currentFamily?.id) // Simplistic match for demo
            ? { ...m, name: updatedUser.name, role: updatedUser.role, avatar: updatedUser.avatar } 
            : m
        ));
    }
  };

  return (
    <AppContext.Provider value={{
      user, 
      currentFamily,
      tasks, rewards, families: allFamilies, members,
      createFamily, joinFamily,
      addTask, deleteTask, toggleTaskStatus, assignTask, addTaskEvidence,
      addReward, deleteReward, redeemReward, addMember, 
      setUser: updateUser,
      resetApp
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
