import { valuesByName, settersByName, } from "../../store/navigation";
import BookDecisionsSkeleton from "./skeleton";

export default function BookDecisions({
    legend,
    name,
    optionType,
    options,
    readOnly,
    isColumns = false,
}) {
    return (<BookDecisionsSkeleton
        legend={legend}
        name={name}
        readOnly={readOnly}
        optionType={optionType}
        options={options}
        isColumns={isColumns}
        modelValue={valuesByName[name]}
        setValue={(!readOnly && settersByName[name])}
    />)
}
