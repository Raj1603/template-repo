import { Todo, TodoCreate } from '../types/todo';

const API_URL = 'http://localhost:8000';

export const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_URL}/todos/`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  async createTodo(todo: TodoCreate): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },

  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    return response.json();
  },
}; 