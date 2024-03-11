import { useState, useEffect } from "react";
import "./App.css";
import { onValue, ref, push } from "firebase/database";
import { db } from "./firebase-config";

function App() {
  const dataRef = ref(db);

  const [garden, setGarden] = useState([]);

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
