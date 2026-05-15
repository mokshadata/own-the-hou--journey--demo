import { createSignal, createMemo, createResource, createEffect} from "solid-js";
import { createStore } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";

import { JourneyMapSurvey } from "./survey";

export const [searchString, setSearchString] = createSignal('')

export const [annualIncome, setAnnualIncome, initializeAnnualIncome] = makePersisted(createSignal(0), {
    name: 'c03.annualIncome',
})

export const [budgetEstimationMethod, setBudgetEstimationMethod, initializeBudgetEstimationMethod] = makePersisted(createSignal(''), {
    name: 'c03.budgetEstimationMethod',
})

export const [journeyMap, setJourneyMap, initializeJourneyMap] = makePersisted(createSignal([]), {
    name: 'book.journeyMap',
})

export const [mapGenStore, setMapGenStore] = createStore({
    type: '',
    path: '',
    phase: '',
    challenge: '',
    
    challenges: [],

    isSetFromLink: false,
    showAllMap: false,
})

export const [isSetFromLink, setIsSetFromLink] = createSignal(mapGenStore.isSetFromLink)
// , {
//     name: 'book.journeyMap.inputs.isSetFromLink',
// })

export const [showAllMap, setShowAllMap] = makePersisted(createSignal(mapGenStore.showAllMap), {
    name: 'book.journeyMap.inputs.showAllMap',
})

export const [journeyType, setJourneyType] = makePersisted(createSignal(mapGenStore.type), {
    name: 'book.journeyMap.inputs.type',
})
export const [journeyPath, setJourneyPath] = makePersisted(createSignal(mapGenStore.path), {
    name: 'book.journeyMap.inputs.path',
})
export const [journeyPhase, setJourneyPhase] = makePersisted(createSignal(mapGenStore.phase), {
    name: 'book.journeyMap.inputs.phase',
})
export const [journeyChallenge, setJourneyChallenge] = makePersisted(createSignal(mapGenStore.challenge), {
    name: 'book.journeyMap.inputs.challenge',
})

export const [journeyChallenges, setJourneyChallenges] = makePersisted(createSignal(mapGenStore.challenges), {
    name: 'book.journeyMap.inputs.challenges',
})

export const valuesByName = {
    'decision--c03-budget--estimation-method': budgetEstimationMethod,
    'decision--c03-budget--annual-income--value': annualIncome,
    'decision--c00-mapping--journey': mapGenStore,

    'decision--c00-mapping--journey--type': journeyType,
    'decision--c00-mapping--journey--path': journeyPath,

    'decision--c00-mapping--journey--phase': journeyPhase,

    'decision--c00-mapping--journey--challenge': journeyChallenge,

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

export const journeyMapperChoices = () => {
    const choices = [
        'decision--c00-mapping--journey--type',
        'decision--c00-mapping--journey--path',
        'decision--c00-mapping--journey--phase',
        'decision--c00-mapping--journey--challenges',
    ].map((choiceName) => ({
        key: choiceName,
        option: valuesByName[choiceName](),
    }))
    .filter((choice) => (choice.option))

    return choices
}

export const getSearchParams = () => (URLSearchParams && (new URLSearchParams(searchString())) || new Map())

export const isSearchForFullMap = () => {
    const searchParams = getSearchParams()
    const phase = searchParams.get('custom') || 'explore'
    return ['journey--homebuyer--00', 'explore'].includes(phase)
}

export const searchParamsToChoices = () => {
    const searchParams = getSearchParams()

    const phase = searchParams.get('custom') || 'explore'
    const challenges = searchParams.get('challenges')?.split('|').map((challenge) => (`journey--homebuyer--help--${challenge}`))

    const choiceOptions = {
        'explore': [
            {
                key: 'decision--c00-mapping--journey--type',
                option: 'journey--type--homebuyer',

            },
            {
                key: 'decision--c00-mapping--journey--path',
                option: 'journey--homebuyer--self-guided',

            },
        ],
        'journey--homeowner--00': [
            {
                key: 'decision--c00-mapping--journey--type',
                option: 'journey--type--homeowner',

            },
            {
                key: 'decision--c00-mapping--journey--phase',
                option: 'journey--homeowner--00',

            },
        ],
        'journey--homeowner--01': [
            {
                key: 'decision--c00-mapping--journey--type',
                option: 'journey--type--homeowner',

            },
            {
                key: 'decision--c00-mapping--journey--phase',
                option: 'journey--homeowner--01',

            },
        ],
        'journey--homebuyer--00': [
            {
                key: 'decision--c00-mapping--journey--type',
                option: 'journey--type--homebuyer',

            },
            {
                key: 'decision--c00-mapping--journey--path',
                option: 'journey--homebuyer--custom-journey',

            },
            {
                key: 'decision--c00-mapping--journey--phase',
                option: 'journey--homebuyer--00',

            },
        ],
        'journey--homebuyer--01': [
            {
                key: 'decision--c00-mapping--journey--type',
                option: 'journey--type--homebuyer',

            },
            {
                key: 'decision--c00-mapping--journey--path',
                option: 'journey--homebuyer--custom-journey',

            },
            {
                key: 'decision--c00-mapping--journey--phase',
                option: 'journey--homebuyer--01',

            },
        ],
        'journey--homebuyer--02': [
            {
                key: 'decision--c00-mapping--journey--type',
                option: 'journey--type--homebuyer',

            },
            {
                key: 'decision--c00-mapping--journey--path',
                option: 'journey--homebuyer--custom-journey',

            },
            {
                key: 'decision--c00-mapping--journey--phase',
                option: 'journey--homebuyer--02',

            },
        ],
        'journey--homebuyer--03': [
            {
                key: 'decision--c00-mapping--journey--type',
                option: 'journey--type--homebuyer',

            },
            {
                key: 'decision--c00-mapping--journey--path',
                option: 'journey--homebuyer--custom-journey',

            },
            {
                key: 'decision--c00-mapping--journey--phase',
                option: 'journey--homebuyer--03',

            },
            {
                key: 'decision--c00-mapping--journey--challenges',
                option: challenges,
            },
        ],
    }

    return choiceOptions[phase]
}

export const journeyMapList = () => {
    return JourneyMapSurvey.filter(
        (step) => (
            step.conditions.length === 0 ||
            step.conditions.every((condition) => (
                journeyMapperChoices().find((choice) => (choice.key === condition.key && (Array.isArray(choice.option) && choice.option.includes(condition.option) || choice.option === condition.option) || false))
            )
        ))
    )
}

export const personalJourneySections = () => ([...new Set(journeyMapList().filter((item) => (item.type === 'results-toolkit')).reduce((result, curr) => ([...result, ...curr.options]), []))])

export const personalJourneyPath = () => (journeyMapList().find((item) => (item.type.includes('results'))))

export const checkChapterWithJourney = (topLevel) => ({
    ...topLevel,
    isFullChapterIncluded: personalJourneySections()?.includes(topLevel.chapter),
    isChapterIncluded: (((personalJourneySections()?.includes(topLevel.chapter) || topLevel.sections.find((midLevel) => (personalJourneySections()?.includes(midLevel.section)))) && true) || false),
    sections: topLevel.sections.map((midLevel) => ({
    ...midLevel,
    isSectionIncluded: (((personalJourneySections()?.includes(topLevel.chapter) || personalJourneySections()?.includes(midLevel.section)) && true) || false),
    }))
})


export const settersByName = {
    'decision--c03-budget--estimation-method': setBudgetEstimationMethod,
    'decision--c03-budget--annual-income--value': setAnnualIncome,
    'decision--c00-mapping--journey': setMapGenStore,

    'decision--c00-mapping--journey--type': setJourneyType,
    'decision--c00-mapping--journey--path': setJourneyPath,
    'decision--c00-mapping--journey--phase': setJourneyPhase,
    'decision--c00-mapping--journey--challenge': setJourneyChallenge,

    'decision--c00-mapping--journey--challenges': setJourneyChallenges,
}

export function mapStructureToPages(structure) {
    const pagesIndex = structure.map(({
      chapter, title: chapterTitle, order: chapterOrder,
      sections
    }) => ([
      [{
        params: { chapter, },
        props: {
          chapterTitle, chapterOrder,
          sectionTitle: null, sectionOrder: 0,
          moduleTitle: 'Introduction', 
          grouping: null,
        },
      }],
      ...sections.toSorted((a, b) => (a.order - b.order))
        .map(({ title: sectionTitle, order: sectionOrder, section, modules }) => {
          if (modules.length) {
            return modules.toSorted((a, b) => (a.item.data.order - b.item.data.order))
              .map(({ module, lookup, item, }) => ({
                params: { chapter, section, module },
                props: {
                  chapterTitle, chapterOrder,
                  sectionTitle, sectionOrder,
                  moduleTitle: item.data.name, moduleOrder: item.data.order, siblings: modules.length,
                  grouping: item.data['option-group'] || null,
                }
              }))
          } else {
            return [{
              params: { chapter, section },
              props: {
                chapterTitle, chapterOrder,
                sectionTitle, sectionOrder,
                grouping: null,
              }
            }]
          }
        }),
      [{
        params: { chapter, section: 'review', },
        props: {
          chapterTitle, chapterOrder,
          sectionTitle: null, sectionOrder: sections.length + 1,
          moduleTitle: 'Chapter Review',
          grouping: null,
        },
      }],
    ]))
    .reduce((result, current) => ([...result, ...current]), [])
    .reduce((result, current) => ([...result, ...current]), [])

  const optionGroups = Object.groupBy(pagesIndex, (index) => (index.props.grouping))

  const pageLookup = structure.map(({
      chapter, title: chapterTitle, order: chapterOrder,
      sections
    }) => ([
      [{
        params: { chapter, },
        props: {
          chapterTitle, chapterOrder, sectionTitle: null, moduleTitle: 'Introduction',
          structure,
        },
      }],
      ...sections.toSorted((a, b) => (a.order - b.order))
        .map(({ title: sectionTitle, order: sectionOrder, section, modules }) => (
          modules.toSorted((a, b) => (a.item.data.order - b.item.data.order))
            .map(({ module, lookup, item, }) => ({
              params: { chapter, section, module },
              props: {
                chapterTitle, chapterOrder,
                sectionTitle, sectionOrder,
                moduleTitle: item.data.name, moduleOrder: item.data.order, moduleEntry: item, moduleLookup: lookup,
                structure,
                grouping: item.data['option-group'],
              }
            })))),
      [{
        params: { chapter, section: 'review', },
        props: {
          chapterTitle, chapterOrder, sectionTitle: null, moduleTitle: 'Chapter Review',
          structure,
        },
      }],
    ]))
    .reduce((result, current) => ([...result, ...current]), [])
    .reduce((result, current) => ([...result, ...current]), [])
    .map((page, index, pages) => ({
      params: page.params,
      props: {
        ...page.props,
        prevPage: index > 0 && pages[index - 1] || null,
        nextPage: index < pages.length - 1 && pages[index + 1] || null,
        nextPageOptions: (page.params.module && optionGroups[page.params.module]) || [],
      }
    }))

  return pageLookup
}