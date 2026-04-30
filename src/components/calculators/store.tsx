import { createSignal, createMemo, createResource, createEffect} from "solid-js";
import { createStore } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";

import { annualIncome, setAnnualIncome, } from "../../store/navigation";
const base_url = `${import.meta.env.BASE_URL}`;

export const [monthlyCalcInputsStore, setMonthlyCalcInputsStore] = createStore({
  monthlyDebts: 0,
  downPayment: 0,
  loanTerm: 30,
  targetBudget: null,
})

export const interestRateAPIs = {
  30: `${base_url}data/MORTGAGE30.json`,
  15: `${base_url}data/MORTGAGE15.json`,
  // 30: `${base_url}api/MORTGAGE30.json`,
  // 15: `${base_url}api/MORTGAGE15.json`,
  // 30: `https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE30US&api_key=f9e7da3b02c85ffdc9b6ff13369dbf32&file_type=json`,
  // 15: `https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE15US&api_key=f9e7da3b02c85ffdc9b6ff13369dbf32&file_type=json`,
}

export const defaultMonthlyCalcOptions = {
  annualAffordableRate: 2.5,
  // interestRates: {
  //   30: 0.0637, // https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE30US&api_key=f9e7da3b02c85ffdc9b6ff13369dbf32&file_type=json observations, last, date, value
  //   15: 0.0574, // https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE15US&api_key=f9e7da3b02c85ffdc9b6ff13369dbf32&file_type=json
  // },
  interestRate30: 0.0637,
  interestRate15: 0.0574,
  // loanTerm: 30,

  annualInsuranceRate: 0.01, // changed from 0.015
  annualTaxRate: 0.02, // changed from 0.01718

  annualRepairRate: 0.02, // recommended change to 1.5 but will need to check other parts of book
  annualPMIRate: 0.0125, // Of loan original amount
}

export const [monthlyCalcRatesStore, setMonthlyCalcRatesStore] = createStore(
  Object.fromEntries(
    Object
      .entries(defaultMonthlyCalcOptions)
      .map(([key, val]) => ([key, val]))
  )
)

export const monthlyCalcInputs = {
  ...Object.fromEntries(
    ['monthlyDebts', 'downPayment', 'loanTerm', 'targetBudget']
      .map((key) => ([key, makePersisted(createSignal(monthlyCalcInputsStore[key]), { name: `book.monthlyCalcInputs.${key}`})]))
  ),
  annualIncome: [annualIncome, setAnnualIncome],
}

export const monthlyCalcRates = Object.fromEntries(
  Object
    .entries(defaultMonthlyCalcOptions)
    .map(([key, val]) => ([key, makePersisted(createSignal(monthlyCalcRatesStore[key]), { name: `book.monthlyCalcRates.${key}`})]))
)

export const affordableHomePrice = () => (annualIncome() * monthlyCalcRates.annualAffordableRate[0]())

export const targetHomePrice = () => (monthlyCalcInputs.targetBudget[0]() !== null && monthlyCalcInputs.targetBudget[0]() < affordableHomePrice() && monthlyCalcInputs.targetBudget[0]() || affordableHomePrice())

export const loanAmount = () => (Math.max(targetHomePrice() - monthlyCalcInputs.downPayment[0](), 0))
export const downPaymentPercent = () => Math.min(monthlyCalcInputs.downPayment[0]() / targetHomePrice(), 1)

export const interestRate = () => (monthlyCalcRates[`interestRate${monthlyCalcInputs.loanTerm[0]()}`][0]())

export const annualPMIRate = () => (downPaymentPercent() < 0.2 && monthlyCalcRates.annualPMIRate[0]() || 0)

export const annualPMIAmount = () => (annualPMIRate() * loanAmount())
export const annualInsuranceAmount = () => (monthlyCalcRates.annualInsuranceRate[0]() * targetHomePrice())
export const annualTaxAmount = () => (monthlyCalcRates.annualTaxRate[0]() * targetHomePrice())

export const monthlyPMIAmount = () => (annualPMIAmount() / 12)
export const monthlyInsuranceAmount = () => (annualInsuranceAmount() / 12)
export const monthlyTaxAmount = () => (annualTaxAmount() / 12)

export const monthlyInterestRate = () => (interestRate() / 12)
export const monthsTerm = () => (monthlyCalcInputs.loanTerm[0]() * 12)
export const compound = () => (Math.pow(1 + monthlyInterestRate(), monthsTerm()))

export const monthlyPI = () => (loanAmount() * monthlyInterestRate() * compound() / (compound() - 1))
export const monthlyVariable = () => (monthlyPMIAmount() + monthlyInsuranceAmount() + monthlyTaxAmount())

export const monthlyMortgage = () => (monthlyPI() + monthlyVariable())

export const monthlyBudget = () => (monthlyMortgage() + monthlyCalcInputs.monthlyDebts[0]())

export const annualRepairBudget = () => (targetHomePrice() * monthlyCalcRates.annualRepairRate[0]())

export const calcEstimations = {
  affordableHomePrice,
  targetHomePrice,
  monthlyBudget,
  monthlyMortgage,

  loanAmount,
  downPaymentPercent,
  interestRate,

  annualRepairBudget,
  annualInsuranceAmount,
  annualTaxAmount,
  annualPMIAmount,

  monthlyPMIAmount,
  monthlyInsuranceAmount,
  monthlyTaxAmount,

  monthlyPI,
  monthlyVariable,
}
