import React, { useEffect, useState } from "react";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  subscribeToTodos,
} from "./service/todoService";
import type { Task } from "./types/index";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
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
    <>
    <Navbar />
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1>Todo App</h1>
        <input
          type="text"
          placeholder="New todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => handleToggle(todo.id, todo.completed)}
              >
                {todo.title}
              </span>
              <button onClick={() => handleDelete(todo.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    <Footer />
    </>
  );
}

export default App;
