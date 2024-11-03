import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { valueFormatter } from './webUsageStats.ts';
import { HighlightItemData } from '@mui/x-charts/context';
import { Stack, Typography } from '@mui/material';
import { SpendingData, Category } from '../types';
import { useState } from 'react';

type Props = {
  data: SpendingData
  income: number
}
const SpendingDataPieChart = ({data, income=100000}: Props)=> {
  const parent = data.categories[0]
  const [currentCategory, setCurrentCategory] = React.useState<Category | null>(parent);
  const [highlightedItem, setHighLightedItem] = useState<HighlightItemData | null>(null);
  console.log(data)
  return (
    <Box display="flex"
    justifyContent="center"
    alignItems="center" 
    width={1000}>
      <Stack
      bgcolor={"yellow"}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'center' }}
      justifyContent="space-between"
      sx={{ width: '100%' }}
      >
        <PieChart
          series={[
            {
              data: data.categories,
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
          height={500}
          width={400}
          slotProps={{
            legend: { hidden: true },
          }}
        />
        <Box 
          bgcolor={"red"}
          width={500}>
          <Stack
            direction={{ xs: 'row', md: 'column' }}
            alignItems={{ xs: 'flex-start', md: 'left' }}
            justifyContent="space-between"
            sx={{ width: '100%' }}
            >
            <Typography>
              Name: {currentCategory?.label ?? parent.label} 
            </Typography>
            <Typography>
              Portion of income: {currentCategory?.value? parseFloat((currentCategory?.value * income * 0.01).toFixed(2)) : parseFloat((parent.value * income * 0.01).toFixed(2))} 
            </Typography>
            <Typography>
              Paragraph: 
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default SpendingDataPieChart