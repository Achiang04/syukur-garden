import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEGL7KudGHv4BE8W0KArudR7qyZTdPpZI",
  authDomain: "smart-gardening-ea941.firebaseapp.com",
  projectId: "smart-gardening-ea941",
  storageBucket: "smart-gardening-ea941.appspot.com",
  messagingSenderId: "129877716381",
  appId: "1:129877716381:web:42e0f8f5646b8ea0d31374",
  measurementId: "G-W4J4ELRDQC",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
