export default function AnnualEstimatorSkeleton({ handleAnnualIncomeChange, annualIncomeValue, estimateValue }) {
    return (
        <div class="workbook--exercise">
            <div class="row">
                <div class="col-xs-12 col-md-6 col between-md">
                    <div class="workbook--exercise--explanation">
                        <p>
                            <strong>Annual gross income</strong>: Include the pre-tax income of everyone who will be on the mortgage loan with you. This may be just you, or you and a spouse, or you and another family member who will co-sign for your loan.
                        </p>
                    </div>
                    <div class="workbook--exercise--calc">
                        <input type="text" value={annualIncomeValue()} onChange={handleAnnualIncomeChange} name="decision--c03-budget--annual-income--value"/>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6 col between-md">
                    <div class="workbook--exercise--explanation">
                        <p>
                            A general rule is that the total price of a home you can afford will not be more than 2.5 times your annual income.
                        </p>
                    </div>
                    <div class="workbook--exercise--calc" data-prefix="×">
                        <input type="text" value="2.5" name="decision--c03-budget--annual-income--multipler" readonly />
                    </div>
                </div>
            </div>
            <div>
                <div class="workbook--exercise--calc workbook--exercise--calc--result">
                    <input type="text" value={`$${estimateValue()}`}  name="decision--c03-budget--annual-income--budget" readonly />
                </div>
                <div class="workbook--exercise--explanation">
                    <p>
                        This is a quick, <strong>rough estimate</strong> of the home price you may be able to afford. When you are ready, you should also get into the details with our full calculator tool, but this will give you an estimate to use for the beginning of your search.
                    </p>
                </div>
            </div>
        </div>
    )
}