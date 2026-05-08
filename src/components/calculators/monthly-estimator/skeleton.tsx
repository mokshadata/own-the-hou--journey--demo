import { createEffect, For, Show } from "solid-js"
import MoneyInput from "../shared/money-input";

const formatter = (key) => {
  if (key.includes('Rate') || key.includes('Percent')) {
    return (value) => (![null, undefined].includes(value) && `${(value * 100).toFixed(2).replace(/\.00$/, '')}%`)
  }

  if (['loanTerm'].includes(key)) {
    return (value) => (![null, undefined].includes(value) && `${value} years`)
  }

  return (value) => (![null, undefined].includes(value) && (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value * 1)).replace(/\.00$/, ''))
}

export function Input({ item }) {

  const handleChange = (changeEvent) => {
    changeEvent.preventDefault()

    if (changeEvent.target.checked) {
        item.setter(changeEvent.target.value * 1)
    }
  }

  if (['loanTerm'].includes(item.setting.key)) {
    return (
      <fieldset>
        <input
          name={`decision--c03-budget--monthly-estimator--${item.setting.key}`}
          type="radio"
          id="15-years"
          value={15}
          checked={item.rate() === 15}
          onChange={handleChange}
        />
        <label for="15-years">15 years</label>
        <input
          name={`decision--c03-budget--monthly-estimator--${item.setting.key}`}
          type="radio"
          id="30-years"
          value={30}
          checked={item.rate() === 30}
          onChange={handleChange}
        />
        <label for="30-years">30 years</label>
      </fieldset>
    )
  }

  return <MoneyInput item={item} prefix={`decision--c03-budget--monthly-estimator`}/>
}

export function MonthlyRow({ item }) {

  const colCount = ((item.notes || item.result) !== undefined && 3) || 2
  const colWidth = 12 / colCount
  
  return (
    <div class={`row estimator-row--${item.setting.type}`}>
      <div class={`col-xs-3 monthly-estimator--label monthly-estimator--${item.setting.type}`} data-name={item.setting.key}>{item.label}</div>
      <div class={`col-xs-3 monthly-estimator--entry`} data-type={item.setting.type}>
        {
          (item.setting.display && item.rate()) ||
          (item.setting.type !== 'input' && formatter(item.setting.key)(item.rate())) ||
          (item.setting.type === 'input' && <Input item={item}/>) ||
          <></>
        }
      </div>
      {colCount === 3 && <div class={`col-xs-6 monthly-estimator--notes`}>{item.notes && item.notes() || formatter(item.setting.result.key)(item.result())}</div> || <></>}
    </div>
  )
}

export default function MonthlyEstimatorSkeleton({ inputs, rates, calculator }) {

  createEffect(() => {
    if (inputs.targetBudget[0]() === null || inputs.targetBudget[0]() === 0 || inputs.targetBudget[0]() > calculator.affordableHomePrice()) {
      inputs.targetBudget[1](calculator.affordableHomePrice())
    }
    return calculator.affordableHomePrice()
  })

  const inputSettings = [
    {
      type: 'input',
      key: 'annualIncome',
      label: 'Gross Annual Income',
      notes: () => (<><strong>Gross Annual Income</strong>: This is your annual (pre-tax) income, and the income of your co-signer (if applicable).</>),
    },
    {
      type: 'input',
      key: 'targetBudget',
      label: 'Your Target Home Price',
      notes: () => (<>Based on your <strong>gross annual income</strong> of {formatter('annualIncome')(inputs.annualIncome[0]())}, your target home price should be {formatter('affordableHomePrice')(calculator.affordableHomePrice())} or less.</>),
    },
    {
      type: 'input',
      key: 'downPayment',
      label: 'Savings for Down Payment',
      notes: () => (<>Estimate how much you plan to have for a down payment.</>),
    },
    {
      type: 'input',
      key: 'monthlyDebts',
      label: 'Monthly Debt Obligations',
      notes: () => (<>Minimum monthly payments you are required to make (ex: car/credit card/student loan, child support)</>),
    },
    {
      type: 'input',
      key: 'loanTerm',
      label: `Loan Term`,
      notes: () => (<>The number of years until the home is paid off and yours.</>),
    },
  ]

  const rateSettings = [
    {
      type: 'calc',
      key: 'interestRate',
      label: 'Interest Rate',
      notes: () => (<>Interest rate from Freddie Mac</>),
    },
    {
      type: 'rate',
      key: 'annualInsuranceRate',
      label: 'Annual Insurance Costs',
      // notes: () => (<></>),
      result: {
        key: 'annualInsuranceAmount',
        type: 'calc',
      },
    },
    {
      type: 'rate',
      key: 'annualTaxRate',
      label: 'Annual Taxes',
      result: {
        key: 'annualTaxAmount',
        type: 'calc',
      },
    },
    // {
    //   type: 'rate',
    //   key: 'annualRepairRate',
    //   label: 'Annual Repairs Budget',
    //   result: {
    //     key: 'annualRepairBudget',
    //     type: 'calc',
    //   },
    // },
    {
      type: 'calc',
      key: 'annualPMIRate',
      label: 'Private Mortgage Insurance',
      result: {
        key: 'annualPMIAmount',
        type: 'calc',
      },
    },
  ]

  const outputSettings = [
    {
      type: 'calc',
      key: 'targetHomePriceDisplay',
      label: 'Your target home price',
      display: () => (`${formatter('targetHomePrice')(calculator.targetHomePrice())}`),
      notes: () => (<>out of {formatter('affordableHomePrice')(calculator.affordableHomePrice())} (affordable home price)</>),
    },
    {
      type: 'calc',
      key: 'loanAmount',
      label: 'Your loan amount',
      notes: () => (<>Your target home price minus your target down payment ({formatter('downPayment')(inputs.downPayment[0]())})</>),
    },
    {
      type: 'calc',
      key: 'monthlyPI',
      label: 'Fixed monthly costs',
      notes: () => (<>Your principal plus an estimated interest rate of {formatter('interestRate')(calculator.interestRate())}</>),
    },
    {
      type: 'calc',
      key: 'monthlyVariable',
      label: 'Variable monthly costs',
      notes: () => (<>{calculator.annualPMIRate() && 'Private Mortgage Insurance (PMI), p' || 'P'}roperty tax, and insurance</>),
    },

    {
      type: 'calc',
      key: 'monthlyBudget',
      label: 'Estimated monthly payments',
      notes: () => (<>Total monthly house payments ({formatter('monthlyMortgage')(calculator.monthlyMortgage())}) + your other monthly debt obligations</>),
    },
  ]

  const typeToPropsGetter = {
    rate: (key) => (() => (rates[key] && rates[key][0]() || 0)),
    input: (key) => (() => (inputs[key] && inputs[key][0]() || 0)),
    calc: (key) => (() => {
      return calculator[key]() || 0
    }),
  }

  const typeToPropsSetter = {
    rate: (key) => (rates[key] && rates[key][1]),
    input: (key) => (inputs[key] && inputs[key][1]),
    calc: (key) => (null),
  }

  const inputItems = inputSettings.map((setting) => ({
    label: setting.label,
    rate: typeToPropsGetter[setting.type](setting.key),
    setter: typeToPropsSetter[setting.type](setting.key),
    notes: setting.notes,
    result: setting.result && typeToPropsGetter[setting.result.type](setting.result.key) || (() => (null)),
    setting,
  }))

  const rateItems = rateSettings.map((setting) => ({
    label: setting.label,
    rate: typeToPropsGetter[setting.type](setting.key),
    setter: typeToPropsSetter[setting.type](setting.key),
    notes: setting.notes,
    result: setting.result && typeToPropsGetter[setting.result.type](setting.result.key) || (() => (null)),
    setting,
  }))

  const outputItems = outputSettings.map((setting) => ({
    label: setting.label,
    rate: setting.display || typeToPropsGetter[setting.type](setting.key),
    notes: setting.notes,
    setting,
  }))

  return (<div class="monthly-estimator">
    <For each={inputItems}>
      {(item, index) => (
        <MonthlyRow item={item}/>
      )}
    </For>
    {/* <div class="monthly-estimator--adjustable-rates">
      <h2>Adjustable Rates</h2>
      <For each={rateItems}>
        {(item, index) => (
          <MonthlyRow item={item}/>
        )}
      </For>
    </div> */}
    <div class="monthly-estimator--results">
      <h4>Summary of Monthly Payments</h4>
      <For each={outputItems}>
        {(item, index) => (
          <MonthlyRow item={item}/>
        )}
      </For>
    </div>
  </div>)
}