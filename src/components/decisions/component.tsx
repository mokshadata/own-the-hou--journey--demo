import { valuesByName, settersByName, } from "../../store/navigation";
import BookDecisionsSkeleton from "./skeleton";

export default function BookDecisions({
    legend,
    name,
    optionType,
    options,
}) {
    return (<BookDecisionsSkeleton
        legend={legend}
        name={name}
        optionType={optionType}
        options={options}
        modelValue={valuesByName[name]}
        setValue={settersByName[name]}
    />)
}
