import { annualIncome, setAnnualIncome } from "../../store/navigation";

export default function AnnualEstimator() {
    const estimate = () => (annualIncome() * 2.5)
    const handleChange = (changeEvent) => {
        setAnnualIncome(changeEvent.target.value * 1)
    }

    return (
        <div class="is-flex is-flex-direction-row">
            <div class="is-flex is-flex-direction-column">
                <div>
                    <input type="text" onChange={handleChange} value={annualIncome()}/>
                </div>
                <div>
                    <p>
                        <strong>Annual income</strong>: Include the income of everyone who will be involved in making the mortgage payments. This may be just you, or you and a spouse, or you and another family member who will co-sign for your loan.
                    </p>
                </div>
            </div>
            <div class="is-flex is-flex-direction-column">
                <div class="is-flex is-flex-direction-row">
                    <div>×</div>
                    <input type="text" value="2.5" />
                </div>
                <div>
                    <p>
                        A general rule is that the total price of a home you can afford will be about 2.5 times your annual income.
                    </p>
                </div>
            </div>
            <div class="is-flex is-flex-direction-column">
                <div>
                    {estimate()}
                </div>
                <div>
                    <p>
                        This is a quick, <strong>rough estimate</strong> of the price of the home you can afford. When you are ready, you should also get into the details with our full calculator tool, but this will give you an estimate to use for the beginning of your search.
                    </p>
                </div>
            </div>
        </div>
    )
}
