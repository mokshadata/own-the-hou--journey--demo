import { lazy, Suspense } from "solid-js";
import AnnualEstimatorSkeleton from "./skeleton";

const AnnualEstimator = lazy(() => import('./component'))

export default function () {
    return (
        <Suspense fallback={<AnnualEstimatorSkeleton
            handleAnnualIncomeChange={()=>{}}
            annualIncomeValue={()=>{}}
            estimateValue={()=>{}}
        />}>
            <AnnualEstimator/>
        </Suspense>
    )
}