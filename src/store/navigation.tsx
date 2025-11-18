import { createSignal, createMemo, createResource, createEffect} from "solid-js";
import { makePersisted } from "@solid-primitives/storage";
import localforage from "localforage";

export const [annualIncome, setAnnualIncome, init] = makePersisted(createSignal(0), {
    storage: localforage,
    name: 'c03.annualIncome',
})

createResource(() => init)[0]()