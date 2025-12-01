import { annualIncome, setAnnualIncome, } from "../../../store/navigation";
import AnnualEstimatorSkeleton from "./skeleton";

export default function AnnualEstimator() {
    const estimate = () => (annualIncome() * 2.5)
    const handleChange = (changeEvent) => {
        setAnnualIncome(changeEvent.target.value * 1)
    }

    return (<AnnualEstimatorSkeleton
        handleAnnualIncomeChange={handleChange}
        annualIncomeValue={annualIncome}
        estimateValue={estimate}
    />)
}
