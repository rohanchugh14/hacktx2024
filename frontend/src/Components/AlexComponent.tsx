import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { desktopOS, valueFormatter } from './webUsageStats.ts';
import { Stack } from '@mui/material';
import { SpendingData } from '../types';

type Props = {
  data: SpendingData
}
const PieActiveArc = ({data}: Props)=> {
  console.log(data)
  return (
    <Box display="flex"
    justifyContent="center"
    alignItems="center" 
    width={700}>
      <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'center' }}
      justifyContent="space-between"
      sx={{ width: '100%' }}
      >
        <PieChart
          series={[
            {
              data: desktopOS,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              valueFormatter,
            },
          ]}
          height={300}
          slotProps={{
            legend: { hidden: true },
          }}
        />
      </Stack>
    </Box>
  );
}

export default PieActiveArc