import { useState, useEffect } from "react";
import "./App.css";
import { onValue, ref, push } from "firebase/database";
import { db } from "./firebase-config";

function App() {
  const dataRef = ref(db);

  const [garden, setGarden] = useState([]);
  const [newTemp, setNewTemp] = useState(0);

  const createGarden = async () => {
    push(dataRef, newTemp)
      .then(() => {
        console.log("Data written successfully!");
        setNewTemp(0);
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });
  };

  useEffect(() => {
    return onValue(dataRef, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        Object.values(data).map((project) => {
          setGarden((projects) => [...projects, project]);
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <input
        type="number"
        number
        onChange={(event) => {
          setNewTemp(event.target.value);
        }}
      />

      <button onClick={createGarden}> Create Garden</button>
      {(garden ?? []).map((item, index) => {
        return (
          <div key={index}>
            <h1>temp: {item}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
