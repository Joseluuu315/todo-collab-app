export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  ownerId: string;
  ownerName: string;
  sharedWith?: string[];
}

export interface User {
  uid: string;
  email: string | null;
}
