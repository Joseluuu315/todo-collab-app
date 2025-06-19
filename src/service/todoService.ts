import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import type { Task } from "../types/index";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const createUser = async (username: string, email: string, password: string) => {
  // 1️⃣ Crear usuario en Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // 2️⃣ Actualizar perfil con displayName
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
  }
};


export const getUserName = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not logged in");
  }
  return user.displayName;
}

export const addTodo = async (text: string) => {
  await addDoc(collection(db, "todos"), {
    title: text,
    completed: false,
    createdAt: new Date(),
    ownerId: await getUserName(), 
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
