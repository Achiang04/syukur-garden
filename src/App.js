import { useState, useEffect } from "react";
import "./App.css";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase-config";

function App() {
  const dataRef = ref(db);

  const [garden, setGarden] = useState([]);

  useEffect(() => {
    return onValue(dataRef, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const temp = Object.values(data).map((project) => {
          return project;
        });

        setGarden(temp);
      }
    });
  }, []);

  return (
    <div className="App">
      {(garden ?? []).map((item, index) => {
        return (
          <div key={index} className="list">
            <h1>id: {item.id}</h1>
            <h1>dht: {item.dht}</h1>
            <h1>soil: {item.soil}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
