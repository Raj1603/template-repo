import React, { useEffect, useState } from 'react';
import { Todo, TodoCreate } from './types/todo';
import { todoService } from './services/todoService';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (todo: TodoCreate) => {
    try {
      setError(null);
      const newTodo = await todoService.createTodo(todo);
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError('Failed to create todo. Please try again.');
    }
  };

  const handleUpdateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      setError(null);
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      setError(null);
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Todo List
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <TodoForm onSubmit={handleCreateTodo} />

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500">No todos yet. Add one above!</p>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDeleteTodo}
                  onUpdate={handleUpdateTodo}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
