import { useState, useEffect } from "react";
import "./App.css";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase-config";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { isEmpty } from "ramda";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

function App() {
  const dataRef = ref(db);

  const [garden, setGarden] = useState([]);
  const isEmptyGarden = isEmpty(garden);

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

  const labels = !isEmptyGarden && garden.map((e, i) => i);

  const data1 = {
    labels,
    datasets: [
      {
        label: "DHT",
        data: !isEmptyGarden && garden.map((e, i) => garden[i].dht),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const data2 = {
    labels,
    datasets: [
      {
        label: "Soil",
        data: !isEmptyGarden && garden.map((e, i) => garden[i].soil),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="App">
      {!isEmptyGarden && <Line options={options} data={data1} />}
      {!isEmptyGarden && <Line options={options} data={data2} />}
    </div>
  );
}

export default App;
