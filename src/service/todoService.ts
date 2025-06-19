import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import type { Task } from "../types/index";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
  }

  return userCredential;
};

export const getUserId = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not logged in");
  }
  return user.uid;
};

export const getUserName = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not logged in");
  }
  return user.displayName;
};

export const addTodo = async (text: string) => {
  const uid = getUserId();

  await addDoc(collection(db, "todos"), {
    title: text,
    completed: false,
    createdAt: new Date(),
    ownerId: uid,
    ownerName: getUserName(), 
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
  uid: string,
  callback: (todos: Task[]) => void
) => {
  const q = query(
    collection(db, "todos"),
    where("ownerId", "==", uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const todos: Task[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, "id" | "createdAt">),
      createdAt: doc.data().createdAt?.toDate() ?? new Date(),
    }));
    callback(todos);
  });
};

