import BookDecisionOption from "./option";

export default function BookDecisionsSkeleton({
  legend,
  name,
  optionType,
  modelValue,
  options,
  setValue,
  readOnly,
}) {
  return (
    <div class="book--decision" data-model-name={name}>
      <fieldset>
        <legend>{legend}</legend>
        <div class="book--decision--options">
          {(options || []).map(({ option, label, detail, icon }) => (
              <BookDecisionOption
                  name={name}
                  optionType={optionType}
                  modelValue={modelValue}
                  setValue={setValue}
                  readOnly={readOnly}

                  option={option}
                  label={label}
                  detail={detail}
                  icon={icon}
              />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
