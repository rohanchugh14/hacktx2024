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
  income: number
  spendingData: SpendingData
  setSpendingData: (data: SpendingData) => void
}
const IntroPieChart = ( {income=10000}: Props)=> {
    let pretax = income
    pretax = (pretax < 13850) ? 0 : pretax - 13850
    let federalTax = 0
   if (pretax > 11000) {
    pretax -= 11000
    federalTax += .10 * 11000
   } else {
    federalTax += .10 * pretax
    pretax = 0
   }

   if (pretax > 44725) {
    pretax -= 44725
    federalTax += .12 * 44725
   } else {
    federalTax += .12 * pretax
    pretax = 0
   }

   if (pretax > 95375) {
    pretax -= 95375
    federalTax += .22 * 95375
   } else {
    federalTax += .22 * pretax
    pretax = 0
   }

   if (pretax > 182100) {
    pretax -= 182100
    federalTax += .24 * 182100
   } else {
       federalTax += .24 * pretax
       pretax = 0
   }

   if (pretax > 231250) {
    pretax -= 231250
    federalTax += .32 * 231250
   } else {
       federalTax += .32 * pretax
       pretax = 0
   }

   if (pretax > 578125) {
    pretax -= 578125
    federalTax += .35 * 578125
   } else {
       federalTax += .35 * pretax
       pretax = 0
   }
       federalTax += .37 * pretax
       pretax = 0
    
   const federalTaxPercent = federalTax / income * 100
   const takehomePercent = 100 - 6.2 - 1.45 - 0 - federalTaxPercent
   
    const data: SpendingData= {
        categories: [
            {label: "Social Secruity",value: 6.2, id: "SS", dollarValue: 100, type: "agency", updateCurrentCategories: () => null},
            {label: "Medicare",value: 1.45, id: "MM", dollarValue: 100, type: "agency", updateCurrentCategories: () => null},
            {label: "state",value: 0, id: "State", dollarValue: 1, type: "agency", updateCurrentCategories: () => null},
            {label: "Takehome",value: takehomePercent, id: "TH", dollarValue: 50, type: "agency", updateCurrentCategories: () => null},
            {label: "federal Tax",value: federalTaxPercent, id: "FT", dollarValue: 1000, type: "agency", updateCurrentCategories: () => null},
        ],
        total: 0,
        parent: null,
   }
  const [currentCategory, setCurrentCategory] = React.useState<Category | null>(data.categories[0]);
  const [highlightedItem, setHighLightedItem] = useState<HighlightItemData | null>(null);

    function setSpendingData(Rohansss: SpendingData) {
        throw new Error('Function not implemented.');
    }

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
              data: data?.categories ?? [],
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              valueFormatter,
            },
          ]}
          highlightedItem={highlightedItem}
          onHighlightChange={(highlightedItem: HighlightItemData | null) => {
            const index = highlightedItem?.dataIndex
            setCurrentCategory(index ? data.categories[index] : null)
            setHighLightedItem(highlightedItem)
          }}
          onItemClick={async (event, d) => {
            const index = d.dataIndex
            let Rohansss = await data.categories[index].updateCurrentCategories()
            console.log({Rohansss})
            if (Rohansss) { 
              Rohansss.parent = data.categories[index]
              setSpendingData(Rohansss)
            }
          }}
          height={700}
          width={600}
          slotProps={{
            legend: { hidden: true },
          }}
        />
      </Stack>
    </Box>
  );
}

export default IntroPieChart