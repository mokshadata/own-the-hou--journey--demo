import { journeyMapList, mapGenStore, valuesByName, journeyMapperChoices, setJourneyType, journeyType } from "../../store/navigation";
import BookDecisions from "../decisions/component";

import { For, createEffect } from "solid-js";


export default function Questionnaire() {
  const questions = () => (
    journeyMapList()
      .toSorted((a, b) => (a.order - b.order))
      .filter((item) => (item.type === 'question'))
      .map((question) => ({
        ...question,
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

  return (
    <For each={questions()}>
      {(item) => (
        item.layout === 'horizontal--icon' && (
          <div class="row" data-questionnaire-name={item.key}>
            <div class="col-xs-12">
              <BookDecisions
                legend={item.text}
                name={item.key}
                readOnly={false}
                optionType="radio"
                options={item.answers}
                isColumns={true}
              ></BookDecisions>
            </div>
          </div>
        ) || (
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
          )
        )}
    </For>
  )
}