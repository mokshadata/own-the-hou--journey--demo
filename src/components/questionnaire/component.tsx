import { journeyMapList, mapGenStore, valuesByName, journeyMapperChoices, setJourneyType, journeyType } from "../../store/navigation";
import BookDecisions from "../decisions/component";

import { For, createEffect, createSignal } from "solid-js";

// import { TransitionGroup } from "solid-transition-group";


export default function Questionnaire() {
  const questionsTemplate = () => (
    journeyMapList()
      .toSorted((a, b) => (a.order - b.order))
      .filter((item) => (item.type === 'question'))
      .map((question) => ({
        ...question,
        optionType: question.optionType === 'single' && 'radio' || 'checkbox',
        answers: question.options
          .toSorted((a, b) => (a.order - b.order))
          .map((opt) => ({
            option: opt.key,
            label: opt.text,
            detail: opt.subtext,
            icon: opt.icon || 'PersonaStep01Diagram',
          }))
      })) || []
  )

  // const [questions, setQuestions] = createSignal([])

  // createEffect(() => {
  //   setQuestions([...questions(), questionsTemplate()[0]])

  //   return questionsTemplate()
  // })

  return (
    // <TransitionGroup name="question">
      <For each={questionsTemplate()}>
        {(item) => (
          item.layout.includes('background') && (
              <>
                <div class="row map--intro" data-questionnaire-name={item.key}>
                  <div class="col-xs-12">
                    <h1>{item.text}</h1>
                  </div>
                </div>
                <div class="row map--intro map--decisions" data-questionnaire-name={item.key} data-selected={journeyType()}>
                {
                  item.options.map((opt) => (
                    <div class={`col-xs-${12/item.options.length}`} data-option-name={opt.key}>
                      <a role="button" class="map--decision" style={`background-image: url(${opt.background.src});`} onclick={() => {setJourneyType(opt.key)}}>
                        <span class="map--decision--cover--background"></span>
                        <span class="button">{opt.text}</span>
                      </a>
                    </div>
                  ))
                }
                </div>
              </>
            ) || (
            <div class="row" data-questionnaire-name={item.key}>
              <div class="col-xs-12">
                <BookDecisions
                  legend={item.text}
                  name={item.key}
                  readOnly={false}
                  optionType={item.optionType}
                  options={item.answers}
                  isColumns={item.layout.includes('horizontal')}
                ></BookDecisions>
              </div>
            </div>
          )
          )}
      </For>
    // </TransitionGroup>
  )
}