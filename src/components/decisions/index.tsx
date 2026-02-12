import { lazy, Suspense } from "solid-js";
import BookDecisionsSkeleton from "./skeleton";

const BookDecisions = lazy(() => import('./component'))

export default function ({
    legend,
    name,
    optionType,
    options,
    readOnly,
    isColumns = false,
}) {
    return (
    <Suspense fallback={<BookDecisionsSkeleton
        legend={legend}
        name={name}
        optionType={optionType}
        options={options}
        modelValue={()=>('')}
        setValue={()=>{}}
        readOnly={true}
    />}>
        <BookDecisions
            readOnly={readOnly}
            legend={legend}
            name={name}
            isColumns={isColumns}
            optionType={optionType}
            options={options}
        />
    </Suspense>
    )
}