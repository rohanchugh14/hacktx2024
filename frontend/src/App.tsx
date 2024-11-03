import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BarChart } from "@mui/x-charts";
import PieActiveArc from "./Components/AlexComponent";
import { Box } from "@mui/material";

function App() {
  // make a request with axios, get request
  useEffect(() => {
    const fetchData = async () => {
      const res = (
        await axios.get(
          "https://api.usaspending.gov/api/v2/references/toptier_agencies/?sort=percentage_of_total_budget_authority&order=desc"
        )
      ).data.results;
      console.log(res);
      const awardInfo = (
        await axios.get(
          `https://api.usaspending.gov/api/v2/agency/${res[0].toptier_code}/budgetary_resources/`
        )
      ).data;
      console.log(awardInfo);
      // make a post request with axios
      const { data } = await axios.post(
        "https://api.usaspending.gov/api/v2/spending/",
        {
          type: "budget_function",
          filters: {
            fy: "2024",
            period: "11",
          },
        }
      );
      console.log(data);
      // add up all items' amount
      let total = 0;
      data.results.forEach((item: any) => {
        total += item.amount;
      });
      console.log(total);
      // add percentage for each item
      data.results.forEach((item: any) => {
        item.percentage = (item.amount / total) * 100;
      });
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#2C2C2C", minHeight: "100vh", color: "white" }}>
      <div className="App">

        <Box
          component="img"
          sx={{
            height: 70,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            position: "absolute",
            top: 0,               
            left: -80,
            paddingTop: "20px",
          }}
          alt="Logo No Working"
          src= '/logo.svg'
        />

        <PieActiveArc />
      </div>
    </div>
  );
}

export default App;
