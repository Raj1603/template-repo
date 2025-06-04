import { Todo } from '../types/todo';
import { FaTrash, FaCheck } from 'react-icons/fa';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updates: Partial<Todo>) => void;
}

export default function TodoItem({ todo, onDelete, onUpdate }: TodoItemProps) {
  const handleToggleComplete = () => {
    onUpdate(todo.id, { is_completed: !todo.is_completed });
  };

  return (
    <div className="group flex items-center justify-between p-6 mb-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-start space-x-4 flex-1">
        <button
          onClick={handleToggleComplete}
          className={`flex-shrink-0 w-5 h-5 mt-1 rounded-full ${
            todo.is_completed ? 'bg-green-500' : 'bg-gray-200'
          } flex items-center justify-center hover:bg-green-600 transition-colors duration-200 cursor-pointer`}
          aria-label={todo.is_completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.is_completed && <FaCheck className="text-white text-xs" />}
        </button>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${todo.is_completed ? 'text-gray-500 line-through' : 'text-gray-800'} transition-colors duration-200`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`mt-1 text-sm ${todo.is_completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Delete todo"
      >
        <FaTrash className="w-4 h-4" />
      </button>
    </div>
  );
} 