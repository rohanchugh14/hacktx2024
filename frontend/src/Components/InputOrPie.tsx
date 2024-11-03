import React, { useState } from "react";
import InputField from "./inputField";
import SpendingDataPieChart from "./SpendingDataPieChart"; 
import { Box, SpeedDialIcon } from "@mui/material";
import { SpendingData } from "../types";
type Props = {
  spendingData: SpendingData
}
const InputOrPie = ({spendingData}: Props) => {
  const [inputValue, setInputValue] = useState<number | null>(null); // State to store the input value
  const [showInput, setShowInput] = useState(true); // State to control input visibility

  const handleInputChange = (value: number) => {
    setInputValue(value); // Update the input value state
  };

  const handleInputSubmit = () => {
    setShowInput(false); // Hide the input field
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      {showInput ? (
        <InputField onChange={handleInputChange} onSubmit={handleInputSubmit} />
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#2C2C2C", minHeight: "100vh", color: "white" }}>
            <SpendingDataPieChart data={spendingData} income={inputValue?? 0} />
        </div>
      )}
    </div>
  );
};

export default InputOrPie;
