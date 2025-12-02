import { valuesByName, settersByName, } from "../../store/navigation";
import BookDecisionsSkeleton from "./skeleton";

export default function BookDecisions({
    legend,
    name,
    optionType,
    options,
    readOnly,
}) {
    return (<BookDecisionsSkeleton
        legend={legend}
        name={name}
        readOnly={readOnly}
        optionType={optionType}
        options={options}
        modelValue={valuesByName[name]}
        setValue={(!readOnly && settersByName[name])}
    />)
}
