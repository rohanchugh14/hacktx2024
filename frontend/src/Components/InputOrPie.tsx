import { useState } from "react";
import InputField from "./inputField";
import { SpendingData } from "../types";
import IntroPieChart from "./IntroPieChart";
import { Box } from "@mui/material";

type Props = {
  spendingData: SpendingData | null;
  setSpendingData: (data: SpendingData) => void;
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
    <div style={{ color: "white" }}>
      <div style={{display: "flex", alignItems: "center"}}>
      <Box
        component="img"
        sx={{
          height: 100,
          display: "block",
          margin: "20px",
          zIndex: 1,
        }}
        alt="Logo No Working"
        src="/logo.svg"
      />
      {!showInput && (
        <h2
        style={{
          fontSize: "2rem",
          fontFamily: "Lacquer",
        }}
      >
        Fiscal Footprint
      </h2>
      )}
      </div>
      {showInput && (
        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-400%, -120%) scale(3)",
          }}
        >
          <img
            src="/feet.gif"
            alt="Background animation"
            style={{
              width: "150px",
            }}
          />
        </div>
      )}

      {showInput ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              textAlign: "center",
              marginTop: "100px",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontFamily: "Lacquer",
                marginBottom: "20px",
              }}
            >
              Fiscal Footprint
            </h2>
          <InputField
            onChange={handleInputChange}
            onSubmit={handleInputSubmit}
          />
          </div>
        </>
      ) : (
        <div>
          {/* <h2
            style={{
              fontSize: "2rem",
              fontFamily: "Lacquer",
            }}
          >
            Fiscal Footprint
          </h2> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#2C2C2C",
              // minHeight: "100vh",
              color: "white",
            }}
          >
            <IntroPieChart
              spendingData={spendingData}
              income={inputValue ?? 0}
              setSpendingData={setSpendingData}
            />
            {/* <SpendingDataPieChart spendingData={spendingData} income={inputValue ?? 0} setSpendingData={setSpendingData}/> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputOrPie;
