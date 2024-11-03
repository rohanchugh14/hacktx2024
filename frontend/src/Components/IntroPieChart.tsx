import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { bigFormatter, valueFormatter } from './webUsageStats.ts';
import { HighlightItemData } from '@mui/x-charts/context';
import { Stack, Typography } from '@mui/material';
import { SpendingData, Category, SpendingOptions } from '../types';
import { useEffect, useState } from 'react';
import SpendingDataPieChart from './SpendingDataPieChart.tsx';
import recursiveFetch from '../Hooks/useRecursiveFetch.ts';

type Props = {
  income: number
  spendingData: SpendingData
  setSpendingData: (data: SpendingData) => void
}
const IntroPieChart = ( {spendingData, setSpendingData, income}: Props)=> {
    console.log(income)
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

    console.log(pretax)
    console.log(federalTax)
    
   const federalTaxPercent = federalTax / income * 100
   const takehomePercent = 100 - 6.2 - 1.45 - 0 - federalTaxPercent
   
    const data: SpendingData= {
        categories: [
            {label: "Social Security Tax",value: 6.2, id: "SS", dollarValue: 100, type: "agency", updateCurrentCategories: () => null},
            {label: "Medicare/Medicaid Tax",value: 1.45, id: "MM", dollarValue: 100, type: "agency", updateCurrentCategories: () => null},
            {label: "State Income Tax",value: 0, id: "State", dollarValue: 1, type: "agency", updateCurrentCategories: () => null},
            {label: "Takehome Pay",value: takehomePercent, id: "TH", dollarValue: 50, type: "agency", updateCurrentCategories: () => null},
            {label: "Federal Income Tax",value: federalTaxPercent, id: "FT", dollarValue: 1000, type: "agency", updateCurrentCategories: () => {
              const body: SpendingOptions = {
                type: "budget_function",
                filters: {
                  fy: "2024",
                  period: "11",
                },
              }
              return recursiveFetch(body, "budget_function")
            }},
        ],
        total: 0,
        parent: null,
        parentValue: null
   }
  useEffect(() => {
    setSpendingData(data)
  }, [])

  console.log(federalTax)
  return (
    <> <SpendingDataPieChart spendingData={spendingData} setSpendingData={setSpendingData} income={income}/>
    </>
  );
}

export default IntroPieChart