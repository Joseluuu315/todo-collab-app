import { useEffect, useState } from "react";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  subscribeToTodos,
} from "./service/todoService";
import type { Task } from "./types/index";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./App.css";

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
      <div className="container">
        <h1>📝 To-Do App</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={handleAdd}>Add Task</button>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className={`todo-card ${todo.completed ? "completed" : ""}`}>
              <div className="todo-content" onClick={() => handleToggle(todo.id, todo.completed)}>
                <h3>{todo.title}</h3>
                <p>👤 <strong>{todo.ownerId}</strong></p>
                <p>📅 {todo.createdAt.toLocaleString()}</p>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
