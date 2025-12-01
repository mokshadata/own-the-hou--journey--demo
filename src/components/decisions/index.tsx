import { lazy, Suspense } from "solid-js";
import BookDecisionsSkeleton from "./skeleton";

const BookDecisions = lazy(() => import('./component'))

export default function ({
    legend,
    name,
    optionType,
    options,
}) {
    return (
    <Suspense fallback={<BookDecisionsSkeleton
        legend={legend}
        name={name}
        optionType={optionType}
        options={options}
        modelValue={()=>('')}
        setValue={()=>{}}
    />}>
        <BookDecisions
            legend={legend}
            name={name}
            optionType={optionType}
            options={options}
        />
    </Suspense>
    )
}