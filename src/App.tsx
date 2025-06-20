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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Home({
  todos,
  newTodo,
  setNewTodo,
  handleAdd,
  handleToggle,
  handleDelete,
}: {
  todos: Task[];
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: () => void;
  handleToggle: (id: string, completed: boolean) => void;
  handleDelete: (id: string) => void;
}) {
  return (
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
          <div
            key={todo.id}
            className={`todo-card ${todo.completed ? "completed" : ""}`}
          >
            <div
              className="todo-content"
              onClick={() => handleToggle(todo.id, todo.completed)}
            >
              <h3>{todo.title}</h3>
              <p>
                👤 <strong> {todo.ownerName} </strong>
              </p>
              <p>
                👤 <strong>{todo.ownerId}</strong>
              </p>
              <p>📅 {todo.createdAt.toLocaleString()}</p>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const [user, loadingUser] = useAuthState(auth);

  useEffect(() => {
    if (loadingUser) return;
    if (!user) return;

    const unsubscribe = subscribeToTodos(user.uid, setTodos);

    return () => unsubscribe();
  }, [user, loadingUser]);

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
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              todos={todos}
              newTodo={newTodo}
              setNewTodo={setNewTodo}
              handleAdd={handleAdd}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
