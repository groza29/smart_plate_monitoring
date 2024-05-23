import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "./Firebase";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsComponent = () => {
  const [data, setData] = useState([]);
  const [plateChartData, setPlateChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Plate Number Frequency",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  const [statusChartData, setStatusChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, "/");
      const snapshot = await get(dbRef);
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const dataArray = Object.values(fetchedData);
        const flatDataArray = dataArray.reduce(
          (acc, cur) => acc.concat(Object.values(cur)),
          []
        );
        const reverseData = flatDataArray.reverse();
        setData(reverseData.slice(0, 20));

        // Process data for charts
        const plateCount = {};
        const statusCount = {};
        flatDataArray.forEach((item) => {
          const plateName = item["Plate Name"];
          const SatusType = item.SatusType;
          if (plateName) {
            plateCount[plateName] = (plateCount[plateName] || 0) + 1;
          }
          if (SatusType) {
            statusCount[SatusType] = (statusCount[SatusType] || 0) + 1;
          }
        });

        setPlateChartData({
          labels: Object.keys(plateCount),
          datasets: [
            {
              ...plateChartData.datasets[0],
              data: Object.values(plateCount),
            },
          ],
        });

        setStatusChartData({
          labels: Object.keys(statusCount),
          datasets: [
            {
              ...statusChartData.datasets[0],
              data: Object.values(statusCount),
            },
          ],
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-900 rounded-lg shadow-2xl">
      <div className="flex flex-wrap justify-between items-center">
        <div
          className="w-full lg:w-1/2 p-2"
          style={{
            minHeight: "300px",
          }}
        >
          <Bar
            data={plateChartData}
            options={{
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Plate Number Frequency",
                },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />{" "}
        </div>{" "}
        <div
          className="w-full lg:w-1/2 p-2"
          style={{
            minHeight: "300px",
          }}
        >
          <Doughnut
            data={statusChartData}
            options={{
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Status Type Distribution",
                },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />{" "}
        </div>{" "}
      </div>{" "}
      <h2 className="mt-4 text-2xl"> Latest Entries </h2>{" "}
      <table className="min-w-full table-auto mt-8">
        <thead>
          <tr className="bg-gray-700">
            <th className="py-3 px-4 text-left text-gray-200"> Date </th>{" "}
            <th className="py-3 px-4 text-left text-gray-200"> Day </th>{" "}
            <th className="py-3 px-4 text-left text-gray-200"> Plate Name </th>{" "}
            <th className="py-3 px-4 text-left text-gray-200"> Status Type </th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-800 odd:bg-gray-800 even:bg-gray-800 hover:bg-gray-600"
            >
              <td className="py-2 px-4 text-gray-300"> {item.Date} </td>{" "}
              <td className="py-2 px-4 text-gray-300"> {item.Day} </td>{" "}
              <td className="py-2 px-4 text-gray-300">
                {" "}
                {item["Plate Name"]}{" "}
              </td>{" "}
              <td className="py-2 px-4 text-gray-300"> {item.SatusType} </td>{" "}
            </tr>
          ))}{" "}
        </tbody>{" "}
      </table>{" "}
    </div>
  );
};

export default StatisticsComponent;
