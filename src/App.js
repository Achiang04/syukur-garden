import { useState, useEffect } from "react";
import "./App.css";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase-config";

function App() {
  const [newTemp, setNewTemp] = useState("");

  const [garden, setGarden] = useState([]);

  const createGarden = async () => {};

  useEffect(() => {
    const query = ref(db, "projects");
    console.log("🚀 ~ useEffect ~ query:", query);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log("🚀 ~ returnonValue ~ data:", data);

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
