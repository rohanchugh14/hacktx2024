import React, { useState } from "react";
import InputField from "./inputField";
import SpendingDataPieChart from "./SpendingDataPieChart"; 
import { SpendingData } from "../types";
import IntroPieChart from "./IntroPieChart";

type Props = {
  spendingData: SpendingData
  setSpendingData: (data: SpendingData) => void

};

const InputOrPie = ({ spendingData, setSpendingData }: Props) => {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [showInput, setShowInput] = useState(true); // State to control input visibility

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  const handleInputSubmit = () => {
    setShowInput(false); 
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", color: "white" }}>
      {showInput && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-400%, -120%) scale(3)",
          }}
        >
          <img
            src="/feet.gif"
            alt="Background animation"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {showInput ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            zIndex: 1, 
            textAlign: "center",
          }}
        >
          <h2 style={{
            fontSize: "2rem",
            fontFamily: "Lacquer",
            marginBottom: "20px"
          }}>
            Fiscal Footprint
          </h2>
          <InputField onChange={handleInputChange} onSubmit={handleInputSubmit} />
        </div>
      ) : (
<div>
  <h2 style={{
    fontSize: "2rem",
    fontFamily: "Lacquer",
    position: "absolute",
    top: "20px", 
    left: "-40px", 
  }}>
    Fiscal Footprint
  </h2>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center", 
      backgroundColor: "#2C2C2C",
      minHeight: "100vh",
      color: "white",
    }}
  >
    <h2 style={{
      fontSize: "2rem", // Adjust font size as needed
      marginBottom: "20px", // Space between the title and pie chart
      textAlign: "center", // Center the text
    }}>
      Tax Breakdown
    </h2>
    <IntroPieChart spendingData={spendingData} income={inputValue ?? 0} setSpendingData={setSpendingData} />
    {/* <SpendingDataPieChart spendingData={spendingData} income={inputValue ?? 0} setSpendingData={setSpendingData}/> */}
  </div>
</div>
    )}
</div>
);
};

export default InputOrPie;