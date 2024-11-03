import React, { useEffect } from "react";
import "./App.css";
import { Box } from "@mui/material";
import { Category, SpendingData, SpendingOptions } from "./types";
import InputOrPie from "./Components/InputOrPie";
import recursiveFetch from "./Hooks/useRecursiveFetch";
function App() {
  const [spendingData, setSpendingData] = React.useState<SpendingData | null>(
    null
  );
  // make a request with axios, get request
  useEffect(() => {
    const fetchData = async () => {
      // // make a post request with axios
      const categories: Category[] = [];
      const body: SpendingOptions = {
        type: "budget_function",
        filters: {
          fy: "2024",
          period: "11",
        },
      };

      // add percentage for each item
      const data = await recursiveFetch(body, "budget_function");
      setSpendingData(data);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#2C2C2C",
        color: "white",
        flexDirection: "column",
        height: "100vh"
      }}
    >
      <div style={{display: "flex",

      }}>
    </div>
      {/* displays the input feild then after input displays pie chart */}
      {spendingData && (
        <InputOrPie
          spendingData={spendingData}
          setSpendingData={setSpendingData}
        />
      )}
    </div>
  );
}

export default App;
