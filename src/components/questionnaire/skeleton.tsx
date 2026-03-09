import BookDecisions from "../decisions/component"

export default function QuestionnaireSkeleton(props) {
  return props.questions.map((item) => (
    <div class="row">
        <div class="col-xs-12">
            <BookDecisions
              legend={item.text}
              name={item.key}
              readOnly={false}
              optionType="radio"
              options={item.answers}
              isColumns={true}
            >
          </BookDecisions>
        </div>
      </div>
  ))
}