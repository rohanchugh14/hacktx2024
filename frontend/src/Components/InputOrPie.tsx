import React, { useState } from "react";
import InputField from "./inputField";
import PieChart from "./pie"; 
import { SpeedDialIcon } from "@mui/material";
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
        <PieChart data={spendingData} income={inputValue?? 0} /> // Pass the input value to PieChart if needed
      )}
    </div>
  );
};

export default InputOrPie;
