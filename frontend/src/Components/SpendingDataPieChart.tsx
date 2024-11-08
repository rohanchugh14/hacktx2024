import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import { valueFormatter, bigFormatter } from "./webUsageStats.ts";
import { HighlightItemData } from "@mui/x-charts/context";
import { Stack, Typography, Button } from "@mui/material";
import { SpendingData, Category } from "../types";
import { useEffect, useState } from "react";
import "../App.css";
import { descriptions } from "./descriptions.ts";

type Props = {
  spendingData: SpendingData;
  setSpendingData: (data: SpendingData) => void;
  income: number;
};
const SpendingDataPieChart = ({
  spendingData,
  setSpendingData,
  income = 100000,
}: Props) => {
  const parent = spendingData.categories[0];
  const [currentPercentage, setCurrentPercentage] = useState<number>(1);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(
    parent
  );
  const [highlightedItem, setHighLightedItem] =
    useState<HighlightItemData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log({ currentCategory });
  useEffect(() => {
    setCurrentCategory(spendingData.categories[0]);
  }, [spendingData]);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={1000}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <div style={{ cursor: loading ? "not-allowed" : "default" }}>
          <PieChart
            sx={{ cursor: loading ? "not-allowed" : "default" }}
            colors={[
              "#003f5c",
              "#005974",
              "#037389",
              "#1f8f9c",
              "#3dabac",
              "#5fc7b8",
              "#86e3c3",
              "#b0ffcc",
            ]}
            series={[
              {
                data: spendingData?.categories ?? [],
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
                valueFormatter,
              },
            ]}
            highlightedItem={highlightedItem}
            onHighlightChange={(highlightedItem: HighlightItemData | null) => {
              const index = highlightedItem?.dataIndex;
              setCurrentCategory(
                index != null ? spendingData.categories[index] : currentCategory
              );
              setHighLightedItem(highlightedItem);
            }}
            onItemClick={async (event, d) => {
              if (loading) return;
              const index = d.dataIndex;
              setLoading(true);
              let Rohansss = await spendingData.categories[
                index
              ].updateCurrentCategories();
              setLoading(false);
              if (Rohansss) {
                Rohansss.parent = spendingData;
                Rohansss.parentValue =
                  spendingData.categories[index].value * 0.01;
                setCurrentPercentage(
                  currentPercentage *
                    spendingData.categories[index].value *
                    0.01
                );
                setSpendingData(Rohansss);
              }
            }}
            height={600}
            width={600}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        </div>
        <Box width={500}>
          <Stack
            direction={{ xs: "row", md: "column" }}
            alignItems={{ xs: "flex-start", md: "left" }}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="h5">
              Name: {currentCategory?.label ?? parent?.label}
            </Typography>
            <Typography variant="h5">
              Portion of income:{" "}
              {currentCategory?.value
                ? bigFormatter(
                    currentPercentage * currentCategory?.value * income * 0.01
                  )
                : bigFormatter(
                    currentPercentage * parent?.value * income * 0.01
                  )}
            </Typography>
            <Typography
              variant="h6"
              align="left"
              style={{ fontSize: "0.875rem" }}
              sx={{ paddingBottom: "16px" }}
            >
              Description:{" "}
              {currentCategory != null
                ? currentCategory.desc !== null && currentCategory.desc !== ""
                  ? currentCategory.desc
                  // @ts-ignore
                  : descriptions[currentCategory.label] ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam mollitia nihil exercitationem amet libero minus eum provident cum illum. Excepturi ipsa facere id in itaque, iusto saepe totam illo blanditiis?"
                : "Coming soon!"}
            </Typography>
            {spendingData.parent && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setSpendingData(spendingData.parent ?? spendingData);
                  setCurrentPercentage(
                    currentPercentage / (spendingData?.parentValue ?? 1)
                  );
                }}
              >
                Back
              </Button>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default SpendingDataPieChart;
