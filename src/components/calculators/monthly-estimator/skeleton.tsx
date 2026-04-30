import { createEffect, For, Show } from "solid-js"

import { interestRateAPIs } from '../store'

import { createInputMask, createMaskPattern } from "@solid-primitives/input-mask";

const formatter = (key) => {
  if (key.includes('Rate') || key.includes('Percent')) {
    return (value) => (![null, undefined].includes(value) && `${(value * 100).toFixed(2).replace(/\.00$/, '')}%`)
  }

  if (['loanTerm'].includes(key)) {
    return (value) => (![null, undefined].includes(value) && `${value} years`)
  }

  return (value) => (![null, undefined].includes(value) && (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value * 1)).replace(/\.00$/, ''))
}

function valAsNum(value) {
  return value.replace(/\D/g,'') * 1
}

const moneyMask = (value: string, sel: Selection): [string, Selection] => {
  const valAsCurrency = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(valAsNum(value))).replace(/\.00$/, '')

  return [`${valAsCurrency}`, [value.length + 1, value.length + 1]]
};

const moneyInputHandler = createInputMask(moneyMask);

export function MoneyInput({ item, prefix }) {
  const handleChange = (setter) => {
    return (changeEvent) => {
      return setter(valAsNum(changeEvent.target.value))
    }
  }

  return (<div>
    <label for={`${prefix}--${item.setting.key}`} id={`${prefix}--${item.setting.key}--pattern-view`}></label>
    <input
      id={`${prefix}--${item.setting.key}`}
      name={`${prefix}--${item.setting.key}`}
      type="text"
      placeholder="$"
      value={moneyMask(`${item.rate()}`)[0]}
      onChange={handleChange(item.setter)}
      onInput={createMaskPattern(moneyInputHandler, () => "$")}
    />
  </div>)
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
    <div class="row">
      <div class={`col-xs-${colWidth} monthly-estimator--label monthly-estimator--${item.setting.type}`} data-name={item.setting.key}>{item.label}</div>
      <div class={`col-xs-${colWidth} monthly-estimator--entry`} data-type={item.setting.type}>
        {
          (item.setting.display && item.rate()) ||
          (item.setting.type !== 'input' && formatter(item.setting.key)(item.rate())) ||
          (item.setting.type === 'input' && <Input item={item}/>) ||
          <></>
        }
      </div>
      {colCount === 3 && <div class={`col-xs-${colWidth} monthly-estimator--notes`}>{item.notes && item.notes() || formatter(item.setting.result.key)(item.result())}</div> || <></>}
    </div>
  )
}

export default function MonthlyEstimatorSkeleton({ inputs, rates, calculator }) {

  createEffect(() => {
    if (inputs.targetBudget[0]() === null || inputs.targetBudget[0]() > calculator.affordableHomePrice()) {
      inputs.targetBudget[1](calculator.affordableHomePrice())
    }

    return calculator.affordableHomePrice()
  })

  const inputSettings = [
    {
      type: 'input',
      key: 'annualIncome',
      label: 'Annual Income',
      notes: () => (<><strong>Annual gross income</strong>: Include the pre-tax income of everyone who will be on the mortgage loan with you. This may be just you, or you and a spouse, or you and another family member who will co-sign for your loan.</>),
    },
    {
      type: 'input',
      key: 'targetBudget',
      label: 'Your Target Budget',
      notes: () => (<>Based on your <strong>annual gross income</strong> of {formatter('annualIncome')(inputs.annualIncome[0]())}, your target home price should be {formatter('affordableHomePrice')(calculator.affordableHomePrice())} or less.</>),
    },
    {
      type: 'input',
      key: 'downPayment',
      label: 'Savings for Down Payment',
      notes: () => (<>Estimate how much you have saved or plan to save for a down payment. You can put your best guess in right now, and then edit your down payment goal later.</>),
    },
    {
      type: 'input',
      key: 'monthlyDebts',
      label: 'Debts',
      notes: () => (<>Include any regular payments you are required to make on debts obligations. (Ex: car payment, credit card payments, student loan payments, or mandated payments like child support.</>),
    },
    {
      type: 'input',
      key: 'loanTerm',
      label: `Loan Term`,
      notes: () => (<>The number of years until the home is paid off and yours.</>),
    },
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
    {
      type: 'rate',
      key: 'annualRepairRate',
      label: 'Annual Repairs Budget',
      result: {
        key: 'annualRepairBudget',
        type: 'calc',
      },
    },
    {
      type: 'rate',
      key: 'annualPMIRate',
      label: 'Private Mortgage Insurance',
      result: {
        key: 'annualPMIAmount',
        type: 'calc',
      },
    }
  ]

  const outputSettings = [
    {
      type: 'calc',
      key: 'targetHomePriceDisplay',
      label: 'Your target home price',
      display: () => (`${formatter('targetHomePrice')(calculator.targetHomePrice())} out of ${formatter('affordableHomePrice')(calculator.affordableHomePrice())}`)
    },
    {
      type: 'calc',
      key: 'loanAmount',
      label: 'Your loan amount',
    },
    {
      type: 'calc',
      key: 'downPaymentPercent',
      label: 'Down payment percentage',
    },
    {
      type: 'calc',
      key: 'monthlyBudget',
      label: 'Estimated monthly payment today',
    },
    {
      type: 'calc',
      key: 'monthlyPI',
      label: 'P+I Fixed monthly costs',
    },
    {
      type: 'calc',
      key: 'monthlyMortgage',
      label: 'P + M + I Estimated monthly mortgage',
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

  const outputItems = outputSettings.map((setting) => ({
    label: setting.label,
    rate: setting.display || typeToPropsGetter[setting.type](setting.key),
    setting,
  }))

  return (<div class="monthly-estimator">
    <For each={outputItems}>
      {(item, index) => (
        <MonthlyRow item={item}/>
      )}
    </For>
    <For each={inputItems}>
      {(item, index) => (
        <MonthlyRow item={item}/>
      )}
    </For>
  </div>)
}