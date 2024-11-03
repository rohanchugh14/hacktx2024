import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

interface InputFieldProps {
  onChange: (value: number) => void;
  onSubmit: (value: number) => void;
}

const InputField: React.FC<InputFieldProps> = ({ onChange, onSubmit }) => {
  const [value, setValue] = useState<number>(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(value); 
      setValue(0); 
    }
  };

  return (
    // <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
    <FormControl sx={{ m: 1, width:"20%" }}>
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
        value={value}
        onChange={(e) => {
          const num = parseFloat(e.target.value);
          if (isNaN(num)) {
            setValue(0);
            return;
          }
          setValue(num);
          onChange(num);
        }}
        onKeyDown={handleKeyDown}
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
    // </div>
  );
};

export default InputField;


