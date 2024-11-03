import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BarChart } from "@mui/x-charts";
import PieActiveArc from "./Components/AlexComponent";
import { Box } from "@mui/material";
import { Category, CategoryApiResponse, SpendingData, SpendingOptions, SpendingResponse } from "./types";

function App() {
  const [spendingData, setSpendingData] = React.useState<SpendingData | null>(null);
  // make a request with axios, get request
  useEffect(() => {
    const fetchData = async () => {
      // const res = (
      //   await axios.get(
      //     "https://api.usaspending.gov/api/v2/references/toptier_agencies/?sort=percentage_of_total_budget_authority&order=desc"
      //   )
      // ).data.results;
      // console.log(res);
      // const awardInfo = (
      //   await axios.get(
      //     `https://api.usaspending.gov/api/v2/agency/${res[0].toptier_code}/budgetary_resources/`
      //   )
      // ).data;
      // console.log(awardInfo);
      // // make a post request with axios
      const categories: Category[] = [];
      const body: SpendingOptions = {
        type: "budget_function",
        filters: {
          fy: "2024",
          period: "11",
        },
      }
      const { data } = await axios.post<SpendingResponse>(
        "https://api.usaspending.gov/api/v2/spending/",
        body
      );
      // add up all items' amount
      categories.push(...data.results.map((item: CategoryApiResponse) => {
        return {
          label: item.name,
          value: (item.amount / data.total) * 100.0,
          id: item.id,
          dollarValue: item.amount,
          type: item.type,
          updateCurrentCategories: () => {
            // TODO: implement this
            return [];
          }
        }
      }));

      // add percentage for each item
      setSpendingData({
        categories,
        total: data.total
      })
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
        {
          spendingData ? (
            <PieActiveArc data={spendingData} />
          ) : (
            <div>Loading...</div>
          )
        }
      </div>
    </div>
  );
}

export default App;
