import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

interface InputFieldProps {
  onChange: (value: number) => void;
  onSubmit: (value: number) => void; // Pass the value on submit
}

const InputField: React.FC<InputFieldProps> = ({ onChange, onSubmit }) => {
  const [value, setValue] = useState<number>(0); // Local state for input value

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(value); // Call onSubmit with the current value
      setValue(0); // Clear the input after submission
    }
  };

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor="outlined-adornment-amount" sx={{ color: "white" }}>
        Pre-Tax Income
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        startAdornment={
          <InputAdornment position="start" sx={{ color: "white" }}>
            <span style={{ color: "white" }}>$</span>
          </InputAdornment>
        }
        label="Pre-Tax Income"
        value={value} // Bind the input value to the state
        onChange={(e) => {
          setValue(parseFloat(e.target.value)); // Update local state
          onChange(parseFloat(e.target.value)); // Notify parent component of change
        }}
        onKeyDown={handleKeyDown} // Use the handleKeyDown for submission
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& input": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
        }}
      />
    </FormControl>
  );
};

export default InputField;


