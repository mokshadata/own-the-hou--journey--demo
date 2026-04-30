import { lazy, Suspense } from "solid-js";
import MonthlyEstimatorSkeleton from "./skeleton";
import { loanAmount, targetHomePrice } from "../store";

const MonthlyEstimator = lazy(() => import('./component'))

const nullGetSet = [() => (null), () => (null)]

export default function () {
    return (
        <Suspense fallback={<MonthlyEstimatorSkeleton
            rates={{
              annualInsuranceRate: nullGetSet,
              annualTaxRate: nullGetSet,
              annualRepairRate: nullGetSet,
              annualPMIRate: nullGetSet,
            }}
            inputs={{
              annualIncome: nullGetSet,
              monthlyDebts: nullGetSet,
              downPayment: nullGetSet,
              loanTerm: nullGetSet,
              targetBudget: nullGetSet,
            }}
            calculator={{
              interestRate: () => null,
              annualInsuranceAmount: () => null,
              annualTaxAmount: () => null,
              annualRepairBudget: () => null,
              annualPMIAmount: () => null,

              affordableHomePrice: () => null,
              targetHomePrice: () => null,
              loanAmount: () => null,
              downPaymentPercent: () => null,
              monthlyBudget: () => null,
              monthlyMortgage: () => null,
              monthlyPI: () => null,
            }}
        />}>
            <MonthlyEstimator/>
        </Suspense>
    )
}