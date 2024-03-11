import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCEGL7KudGHv4BE8W0KArudR7qyZTdPpZI",
  authDomain: "smart-gardening-ea941.firebaseapp.com",
  databaseURL:
    "https://smart-gardening-ea941-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-gardening-ea941",
  storageBucket: "smart-gardening-ea941.appspot.com",
  messagingSenderId: "129877716381",
  appId: "1:129877716381:web:6ea8aa41d8be5e88d31374",
  measurementId: "G-DG5R7K92PK",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
