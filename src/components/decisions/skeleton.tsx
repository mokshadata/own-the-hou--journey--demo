import BookDecisionOption from "./option";

export default function BookDecisionsSkeleton({
  legend,
  name,
  optionType,
  modelValue,
  options,
  setValue,
}) {
  return (
    <div class="book--decision" data-model-name={name}>
      <fieldset>
        <legend>{legend}</legend>
        {(options || []).map(({ option, label, detail, icon }) => (
            <BookDecisionOption
                name={name}
                optionType={optionType}
                modelValue={modelValue}
                setValue={setValue}

                option={option}
                label={label}
                detail={detail}
                icon={icon}
            />
        ))}
      </fieldset>
    </div>
  );
}
