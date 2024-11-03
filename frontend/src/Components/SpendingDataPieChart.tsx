import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { valueFormatter, bigFormatter } from './webUsageStats.ts';
import { HighlightItemData } from '@mui/x-charts/context';
import { Stack, Typography, colors } from '@mui/material';
import { SpendingData, Category } from '../types';
import { useState } from 'react';
import { calcLength } from 'framer-motion';

type Props = {
  data: SpendingData
  income: number
}
const SpendingDataPieChart = ({data, income=100000}: Props)=> {
  const parent = data.categories[0]
  const [currentData, setCurrentData] = React.useState<SpendingData | null>(data);
  const [currentCategory, setCurrentCategory] = React.useState<Category | null>(parent);
  const [highlightedItem, setHighLightedItem] = useState<HighlightItemData | null>(null);
  return (
    <Box display="flex"
    justifyContent="center"
    alignItems="center" 
    width={1000}>
      <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'center' }}
      justifyContent="space-between"
      sx={{ width: '100%' }}
      >
        <PieChart
          colors={[
            '#003f5c',
            '#005974',
            '#037389',
            '#1f8f9c',
            '#3dabac',
            '#5fc7b8',
            '#86e3c3',
            '#b0ffcc']}
          series={[
            {
              data: currentData?.categories ?? data.categories,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              valueFormatter,
            },
          ]}
          highlightedItem={highlightedItem}
          onHighlightChange={(highlightedItem: HighlightItemData | null) => {
            const index = highlightedItem?.dataIndex
            setCurrentCategory(index? data.categories[index] : null)
            setHighLightedItem(highlightedItem)
          }}
          onItemClick={async (event, d) => {
            const index = d.dataIndex
            let Rohansss = await data.categories[index].updateCurrentCategories()
            console.log(Rohansss)
            if (Rohansss) { 
              Rohansss.parent = data.categories[index]
              setCurrentData(Rohansss)
            }
          }}
          height={700}
          width={600}
          slotProps={{
            legend: { hidden: true },
          }}
        />
        <Box 
          width={500}>
          <Stack
            direction={{ xs: 'row', md: 'column' }}
            alignItems={{ xs: 'flex-start', md: 'left' }}
            justifyContent="space-between"
            sx={{ width: '100%' }}
            >
              <Typography variant="h6">
                Name: {currentCategory?.label ?? parent.label}
              </Typography>
              <Typography variant="h6">
                Portion of income: {currentCategory?.value ? bigFormatter(currentCategory?.value * income * 0.01) : bigFormatter(parent.value * income * 0.01)}
              </Typography>
              <Typography variant="h6">
                Paragraph: 
              </Typography>

          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default SpendingDataPieChart