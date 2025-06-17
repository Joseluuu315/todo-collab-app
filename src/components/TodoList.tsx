import React, { useEffect, useState } from "react";
import type { Task } from "../types/index";
import { addTodo, deleteTodo, toggleTodo, subscribeToTodos } from "../service/todoService";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToTodos(setTodos);
    return unsubscribe; 
  }, []);

  const handleAdd = async () => {
    if (newTodo.trim()) {
      await addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    await toggleTodo(id, !completed);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
  };

  return (
    <div>
      <h2>Mis Tareas</h2>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={handleAdd}>Añadir</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id, todo.completed)}
              />
              {todo.title}
            </label>
            <button onClick={() => handleDelete(todo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
