import { annualIncome, setAnnualIncome } from "../../store/navigation";

export default function AnnualEstimator() {
    const estimate = () => (annualIncome() * 2.5)
    const handleChange = (changeEvent) => {
        setAnnualIncome(changeEvent.target.value * 1)
    }

    return (
        // <Suspense>
        <div class="workbook--exercise">
            <div class="is-flex is-flex-direction-row">
                <div class="is-flex is-flex-direction-column">
                    <div class="workbook--exercise--explanation">
                        <p>
                            <strong>Annual income</strong>: Include the income of everyone who will be involved in making the mortgage payments. This may be just you, or you and a spouse, or you and another family member who will co-sign for your loan.
                        </p>
                    </div>
                    <div class="workbook--exercise--calc">
                        <input type="text" onChange={handleChange} value={annualIncome()}/>
                    </div>
                </div>
                <div class="is-flex is-flex-direction-column">
                    <div class="workbook--exercise--explanation">
                        <p>
                            A general rule is that the total price of a home you can afford will be about 2.5 times your annual income.
                        </p>
                    </div>
                    <div class="is-flex is-flex-direction-row workbook--exercise--calc" data-prefix="×">
                        <input type="text" value="2.5" readonly/>
                    </div>
                </div>
            </div>
            <div class="is-flex is-flex-direction-column">
                <div class="workbook--exercise--calc workbook--exercise--calc--result">
                    <input type="text" value={`$${estimate()}`} readonly/>
                </div>
                <div class="workbook--exercise--explanation">
                    <p>
                        This is a quick, <strong>rough estimate</strong> of the price of the home you can afford. When you are ready, you should also get into the details with our full calculator tool, but this will give you an estimate to use for the beginning of your search.
                    </p>
                </div>
            </div>
        </div>
        // </Suspense>
    )
}
