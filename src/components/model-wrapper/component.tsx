import {
    annualIncome, setAnnualIncome,
    budgetEstimationMethod, setBudgetEstimationMethod,
} from "../../store/navigation";


export default function ChangeListener({ children }) {
    function handleChange(formChangeEvent) {
        if (
            formChangeEvent.target.name === 'decision--c03-budget--estimation-method' &&
            formChangeEvent.target.checked
        ) {
            setBudgetEstimationMethod(formChangeEvent.target.value)
        }
        if (
            formChangeEvent.target.name === 'decision--c03-budget--annual-income--value'
        ) {
            setAnnualIncome(formChangeEvent.target.value)
        }
    }
    return (
        <form onChange={handleChange}>{children}</form>
    )
}