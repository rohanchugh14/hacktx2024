import React, { useState } from "react";
import InputField from "./inputField";
import SpendingDataPieChart from "./SpendingDataPieChart"; 
import { SpendingData } from "../types";

type Props = {
  spendingData: SpendingData
};

const InputOrPie = ({ spendingData }: Props) => {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [showInput, setShowInput] = useState(true); // State to control input visibility

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  const handleInputSubmit = () => {
    setShowInput(false); // Hide the input field
  };

  return (
    <div style={{ padding: "20px", color: "white", position: "relative", minHeight: "100vh" }}>
      {/* Conditional styling for title based on showInput state */}
      <h2
        style={{
          textAlign: showInput ? "center" : "left",
          fontSize: "2rem",
          fontFamily: 'Lacquer',
          position: showInput ? "static" : "absolute",
          top: showInput ? "auto" : "20px",
          left: showInput ? "auto" : "-40px",
        }}
      >
        Fiscal Footprint
      </h2>
      
      {showInput ? (
        <InputField onChange={handleInputChange} onSubmit={handleInputSubmit} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#2C2C2C",
            minHeight: "100vh",
            color: "white",
          }}
        >
          <SpendingDataPieChart data={spendingData} income={inputValue ?? 0} />
        </div>
      )}
    </div>
  );
};

export default InputOrPie;

