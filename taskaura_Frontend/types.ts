export interface User {
  id: number;
  email: string;
  username: string; 
  roles: string[];
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  progressPercentage: number;
  completedTaskCount: number;
  taskCount: number;
  createdAt?: string;
  updatedAt?: string;
}


export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page (0-based)
  size: number; // page size
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  projectId: number;
}

export interface AuthResponse {
  message?: string;
}

export interface ProjectCreateRequest {
  title: string;
  description: string;
}

export interface TaskCreateRequest {
  title: string;
  description: string;
  dueDate: string;
  projectId: number;
}
