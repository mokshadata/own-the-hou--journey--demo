import {
  householdIncome, setHouseholdIncome,
  householdSize, setHouseholdSize,
} from "../../../store/navigation";

import { targetHomePrice } from "../store"
import DPAToolSkeleton from "./skeleton";

export default function DPATool() {
    // const handleChange = (changeEvent) => {
    //     setAnnualIncome(changeEvent.target.value * 1)
    // }

    return (<DPAToolSkeleton
        handleHouseholdIncomeValue={setHouseholdIncome}
        householdIncomeValue={householdIncome}

        handleHouseholdSizeValue={setHouseholdSize}
        householdSizeValue={householdSize}

        targetHomePrice={targetHomePrice}
    />)
}
