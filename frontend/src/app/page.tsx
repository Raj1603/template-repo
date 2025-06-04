'use client';

import { useEffect, useState } from 'react';
import { Todo, TodoCreate } from './types/todo';
import { todoService } from './services/todoService';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
      setError('');
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (todo: TodoCreate) => {
    try {
      const newTodo = await todoService.createTodo(todo);
      setTodos((prev) => [...prev, newTodo]);
      setError('');
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const handleUpdateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos((prev) => prev.map((todo) => 
        todo.id === id ? updatedTodo : todo
      ));
      setError('');
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo List</h1>
          <p className="text-gray-600">Keep track of your tasks and stay organized</p>
        </div>
        
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <TodoForm onSubmit={handleCreateTodo} />

        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading todos...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="mt-4 text-gray-600">No todos yet. Add one above!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
