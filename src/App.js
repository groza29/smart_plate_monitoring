import React from "react";
import StatisticsComponent from "./StatisticsComponent";
import smartCarPlateImage from "./smart_plate.png";
import "./App.css";

function App() {
  return (
    <div className="App bg-black">
      <header className="App-header flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <div className=" rounded-2xl m-4 p-4 ">
          <img
            src={smartCarPlateImage}
            alt="Smart Car Plate"
            className="block mx-auto my-4"
            style={{
              maxHeight: "160px",
            }}
          />
          <h1
            className="mt-4 text-4xl drop-shadow-lg font-mono select-none	"
            style={{ color: "#1b2b4b" }}
          >
            Smart Car Plate Monitoring
          </h1>
        </div>

        <StatisticsComponent />
      </header>
    </div>
  );
}

export default App;
