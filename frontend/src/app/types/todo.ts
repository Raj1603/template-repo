export interface Todo {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
}

export interface TodoCreate {
  title: string;
  description?: string;
} 