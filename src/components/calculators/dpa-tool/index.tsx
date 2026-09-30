import { lazy, Suspense } from "solid-js";
import DPAToolSkeleton from "./skeleton";

const DPATool = lazy(() => import('./component'))

export default function () {
    return (
        <Suspense fallback={<DPAToolSkeleton
          handleHouseholdIncomeValue={()=>{}}
          householdIncomeValue={()=>(null)}

          handleHouseholdSizeValue={()=>{}}
          householdSizeValue={()=>(null)}
        />}>
            <DPATool/>
        </Suspense>
    )
}