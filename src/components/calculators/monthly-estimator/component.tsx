import {
  monthlyCalcInputs,
  monthlyCalcRates,
  calcEstimations,
  interestRateAPIs,
} from '../store'

import MonthlyEstimatorSkeleton from "./skeleton";

import { createEffect } from 'solid-js';

export default function MonthlyEstimator() {
  createEffect(async () => {
    const rates = (await Promise.all(Object.entries(interestRateAPIs)
      .map(async ([term, api]) => ([
        term,
        await fetch(api).then((res) => (res.json())),
      ]))))
      .map(([term, rateResponse]) => ([
        term,
        rateResponse.observations[rateResponse.count - 1].value * 1 / 100,
      ]))
  
    rates.forEach(([term, rate]) => {
      monthlyCalcRates[`interestRate${term}`][1](rate)
    })
  })
  
  return (<MonthlyEstimatorSkeleton
    rates={monthlyCalcRates}
    inputs={monthlyCalcInputs}
    calculator={calcEstimations}
  />)
}
