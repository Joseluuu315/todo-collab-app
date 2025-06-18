import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import type { Task } from "../types/index";

export const addTodo = async (text: string) => {
  await addDoc(collection(db, "todos"), {
    title: text,
    completed: false,
    createdAt: new Date(),
    ownerId: "Jose Luis",
  });
};


export const deleteTodo = async (id: string) => {
  await deleteDoc(doc(db, "todos", id));
};

export const toggleTodo = async (id: string, completed: boolean) => {
  await updateDoc(doc(db, "todos", id), {
    completed,
  });
};

export const subscribeToTodos = (
  callback: (todos: Task[]) => void
) => {
  const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const todos: Task[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, "id" | "createdAt">),
      createdAt: doc.data().createdAt?.toDate() ?? new Date(),
    }));
    callback(todos);
  });
};
