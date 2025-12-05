
export interface Task {
  id: string;
  familyId: string; // Link to specific family
  title: string;
  points: number;
  completed: boolean;
  dueDate?: string;
  assignedTo?: string; // Member name
  requiresPhoto: boolean;
  recurring: boolean;
  evidencePhoto?: string;
}

export interface Reward {
  id: string;
  familyId: string; // Link to specific family
  title: string;
  cost: number;
  description?: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  role: 'Padre' | 'Madre' | 'Hijo/a' | 'Otro';
  points: number;
  avatar: string;
  familyId: string; // User belongs to a current family context
}

export interface Family {
  id: string;
  name: string;
  code: string; // The unique code to join
  members: number;
}

export interface Member {
  id: string;
  familyId: string; // Link to specific family
  name: string;
  role: string;
  avatar: string;
}
