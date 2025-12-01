import { createSignal, createMemo, createResource, createEffect} from "solid-js";
import { makePersisted } from "@solid-primitives/storage";
import localforage from "localforage";

export const [annualIncome, setAnnualIncome, initializeAnnualIncome] = makePersisted(createSignal(0), {
    storage: localforage,
    name: 'c03.annualIncome',
})

export const [budgetEstimationMethod, setBudgetEstimationMethod, initializeBudgetEstimationMethod] = makePersisted(createSignal(''), {
    storage: localforage,
    name: 'c03.budgetEstimationMethod',
})

export const [journeyMap, setJourneyMap, initializeJourneyMap] = makePersisted(createSignal([]), {
    storage: localforage,
    name: 'book.journeyMap',
})



export const valuesByName = {
    'decision--c03-budget--estimation-method': budgetEstimationMethod,
    'decision--c03-budget--annual-income--value': annualIncome,
}

export const nextPageByDecision = (module) => {
    const lookup = {
        'm01-choose-how-to-estimate-your-budget': budgetEstimationMethod,
    }
    if (lookup[module]) {
        return lookup[module]()
    }

    return null
}

export const settersByName = {
    'decision--c03-budget--estimation-method': setBudgetEstimationMethod,
    'decision--c03-budget--annual-income--value': setAnnualIncome,
}