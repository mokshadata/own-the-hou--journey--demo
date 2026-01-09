import { createSignal, createMemo, createResource, createEffect} from "solid-js";
import { createStore } from "solid-js/store";
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

export const [mapGenStore, setMapGenStore] = createStore({
    type: 'homebuyer',
    phase: 'interested-but',
    challenges: [],
})

export const [journeyType, setJourneyType] = makePersisted(createSignal(mapGenStore.type), {
    storage: localforage,
    name: 'book.journeyMap.inputs.type',
})
export const [journeyPhase, setJourneyPhase] = makePersisted(createSignal(mapGenStore.phase), {
    storage: localforage,
    name: 'book.journeyMap.inputs.phase',
})
export const [journeyChallenges, setJourneyChallenges] = makePersisted(createStore(mapGenStore.challenges), {
    storage: localforage,
    name: 'book.journeyMap.inputs.challenges',
})

export const valuesByName = {
    'decision--c03-budget--estimation-method': budgetEstimationMethod,
    'decision--c03-budget--annual-income--value': annualIncome,
    'decision--c00-mapping--journey': mapGenStore,

    'decision--c00-mapping--journey--type': journeyType,
    'decision--c00-mapping--journey--phase': journeyPhase,
    'decision--c00-mapping--journey--challenges': journeyChallenges,
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
    'decision--c00-mapping--journey': setMapGenStore,

    'decision--c00-mapping--journey--type': setJourneyType,
    'decision--c00-mapping--journey--phase': setJourneyPhase,
    'decision--c00-mapping--journey--challenges': setJourneyChallenges,
}