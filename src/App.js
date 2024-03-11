import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newTemp, setNewTemp] = useState("");

  const [garden, setGarden] = useState([]);
  const gardenCollectionRef = collection(db, "garden");

  const createGarden = async () => {
    await addDoc(gardenCollectionRef, { temp: newTemp });
  };

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "garden", id);
    await deleteDoc(itemDoc);
  };

  const fetchPost = async () => {
    await getDocs(gardenCollectionRef).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGarden(newData);
      console.log(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="temp"
        onChange={(event) => {
          setNewTemp(event.target.value);
        }}
      />

      <button onClick={createGarden}> Create Garden</button>
      {(garden ?? []).map((item) => {
        return (
          <div key={item.id}>
            <h1>temp: {item.temp}</h1>
            <button
              onClick={() => {
                deleteItem(item.id);
              }}
            >
              Delete Temp
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
