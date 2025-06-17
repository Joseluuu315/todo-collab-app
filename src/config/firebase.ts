import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyB1EdZrP6q8c2HjYwRM--6TDV6AQoVwV90",
  authDomain: "todo-database-1d7a7.firebaseapp.com",
  projectId: "todo-database-1d7a7",
  storageBucket: "todo-database-1d7a7.appspot.com", 
  messagingSenderId: "858078294150",
  appId: "1:858078294150:web:eb93cbaa463f8b1c266107",
  measurementId: "G-NSKGJ527CY",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); 

export default app;
