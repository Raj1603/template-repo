export interface Todo {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
}

export type TodoCreate = Omit<Todo, 'id' | 'is_completed'> & {
  description?: string;
}; 