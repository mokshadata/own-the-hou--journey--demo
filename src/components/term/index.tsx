import { createEffect, Show, Suspense } from "solid-js"
import { getCollection, getEntry, getEntries, render } from 'astro:content';

const termsList = [
{"field1":"","Term":"mortgage","Definition":"A loan from a bank or lender that you pay back over time, usually 15 to 30 years.","slug":"t--mortgage","Chapter":"c02-what-s-your-budget"},
{"field1":"","Term":"principal","Definition":"The amount you borrow to buy your home.","slug":"t--principal","Chapter":"c02-what-s-your-budget"},
{"field1":"","Term":"equity","Definition":"The portion of the home that you truly own.","slug":"t--equity","Chapter":"c02-what-s-your-budget"},
{"field1":"","Term":"interest","Definition":"The lender’s fee for letting you borrow money.","slug":"t--interest","Chapter":"c02-what-s-your-budget"}
,
{"field1":"","Term":"escrow account","Definition":"A holding account.","slug":"t--escrow-account","Chapter":"c02-what-s-your-budget"},
{"field1":"","Term":"down payment","Definition":"Down payment is the cash you contribute toward the home’s purchase price.","slug":"t--down-payment","Chapter":"c02-what-s-your-budget"}
,
{"field1":"","Term":"earnest money","Definition":"This is a portion of your down payment that you put into an escrow account during the purchase process.","slug":"t--earnest-money","Chapter":"c02-what-s-your-budget"},
{"field1":"","Term":"closing costs","Definition":"Fees for the lender, title company, appraisal, inspections, and other costs. It is typically 2% - 5% of the purchase price.","slug":"t--closing-costs","Chapter":"c02-what-s-your-budget"},
{"field1":"","Term":"pre-approval amount","Definition":"The total loan value you can be approved for.","slug":"t--pre-approval-amount","Chapter":"c02-what-s-your-budget"},
{"field1":"","Term":"credit score","Definition":"A tool that banks use to understand how likely a particular person is to pay back their loans or debts successfully.","slug":"t--credit-score","Chapter":"c02-what-s-your-budget"},
{"field1":"","Term":"term","Definition":"Example of a term definition that you can show by hovering on the term.","slug":"t--term","Chapter":"c01-welcome"},
{"field1":"","Term":"housing counselor","Definition":"Homeownership experts who can help you understand the process from start to finish.","slug":"t--housing-counselor","Chapter":"c03-build-your-homebuying-team"},
{"field1":"","Term":"private mortgage insurance","Definition":"A part of your monthly payment if you put down less than 20% as a down payment, to protect the lender until you build at least 20% equity.","slug":"t--private-mortgage-insurance","Chapter":"c02-what-s-your-budget"},
{"field1":"","Term":"realtor","Definition":"Your guide and advocate during the home search and offer process.","slug":"t--realtor","Chapter":"c03-build-your-homebuying-team"},
{"field1":"","Term":"commission","Definition":"A percentage of the sale price of the home paid to the realtor.","slug":"t--commission","Chapter":"c03-build-your-homebuying-team"},
{"field1":"","Term":"buyer representation agreement","Definition":"An agreement with your realtor that outlines the services they'll provide, the timeframe for working together, and how the realtor will be paid.","slug":"t--buyer-representation-agreement","Chapter":"c03-build-your-homebuying-team"},
{"field1":"","Term":"lenders","Definition":"Lenders provide the mortgage loan that makes it possible to buy a home.","slug":"t--lenders","Chapter":"c03-build-your-homebuying-team"},
{"field1":"","Term":"down payment assistance","Definition":"Can help cover part of your down payment, your closing costs, or both. Support may come in different forms, such as grants, forgivable loans, or deferred-payment loans.","slug":"t--down-payment-assistance","Chapter":"c03-build-your-homebuying-team"},
{"field1":"","Term":"first-time homebuyer","Definition":"Any person or family who has not owned, or had an ownership interest in, a home within the past three (3) years. A common eligibility qualification for assistance programs.","slug":"t--first-time-homebuyer","Chapter":"c03-build-your-homebuying-team"},
{"field1":"","Term":"interest rate","Definition":"A percentage that determines how much it will cost you specifically to borrow this principal amount.","slug":"t--interest-rate","Chapter":""},
{"field1":"","Term":"mortgage payment","Definition":"Repayment of the mortgage to be paid monthly, includes principal, interest, property taxes and insurance, and any private mortgage insurance","slug":"t--mortgage-payment","Chapter":""},
{"field1":"","Term":"debt-to-income ratio","Definition":"How much money you owe in your personal debts each month compared to how much money you earn (pre-tax).","slug":"t--debt-to-income-ratio","Chapter":""},
{"field1":"","Term":"pre-approval","Definition":"A lender’s written estimate of how much they may be willing to lend you, based on your financial information. Sellers often expect to see a pre-approval letter with your offer.","slug":"t--pre-approval","Chapter":""},
{"field1":"","Term":"mortgage broker","Definition":"A expert that can connect you with different lenders and loan products so you can compare multiple options, without having to do all the work of reaching out to lenders yourself.","slug":"t--mortgage-broker","Chapter":""},
{"field1":"","Term":"portfolio loans","Definition":"Loans that lenders keep in-house instead of selling to the secondary market. They can be useful for buyers with unique situations, but terms vary widely.","slug":"t--portfolio-loans","Chapter":""},
{"field1":"","Term":"conventional loans","Definition":"Common and often offer good rates for buyers with strong credit. They typically require a down payment, and private mortgage insurance (PMI) if you put down less than 20%.","slug":"t--conventional-loans","Chapter":""},
{"field1":"","Term":"fha loans","Definition":"More flexible for first-time buyers and buyers with lower credit scores. They usually have lower down payment requirements and can be easier to qualify for but require mortgage insurance.","slug":"t--fha-loans","Chapter":""},
{"field1":"","Term":"va loans","Definition":"Available to eligible veterans, service members, and surviving spouses. They often offer very favorable terms, including no down payment.","slug":"t--va-loans","Chapter":""},
{"field1":"","Term":"pre-qualification","Definition":"Informal estimate of potential loan amount based on information you provide yourself. It can be helpful early on, but it doesn’t carry much weight with sellers.","slug":"t--pre-qualification","Chapter":""},
{"field1":"","Term":"origination charges","Definition":"Lenders charge this fee to issue your loan. This fee will be a part of your closing costs.","slug":"t--origination-charges","Chapter":""},
{"field1":"","Term":"loan estimate form","Definition":"Lender provides this documentation to you after determining your loan terms. This document confirms interest rate, down payment, origination charges, and other terms of the loan.","slug":"t--loan-estimate-form","Chapter":""},
{"field1":"","Term":"offer","Definition":"A written proposal to the home seller that explains how much you’re willing to pay for the home — and under what conditions.","slug":"t--offer","Chapter":""}
,
{"field1":"","Term":"standard contract","Definition":"A document prepared by your realtor that covers the purchase price, details about closing costs, how long it will take to close, and what happens if certain conditions aren’t met.","slug":"t--standard-contract","Chapter":""}
,
{"field1":"","Term":"contingencies","Definition":"A part of the offer, conditions that must be met for the sale to move forward. Common contingencies relate to inspection timelines, appraisals, and mortgage approval.","slug":"t--contingencies","Chapter":""},
{"field1":"","Term":"option fee","Definition":"A small, non-refundable payment paid directly to the seller that gives you the right to cancel your offer during the option period. The fee is typically around $200, but may be $100-$500.","slug":"t--option-fee","Chapter":""},
{"field1":"","Term":"option period","Definition":"Usually about 7 - 10 days from when you make the offer, when you would schedule inspections and take a closer look at the property.","slug":"t--option-period","Chapter":""},
{"field1":"","Term":"earnest money","Definition":"A larger deposit that shows the seller you're serious about buying the home that goes towards down payment and closing costs if the sale goes through.","slug":"t--earnest-money","Chapter":""},
{"field1":"","Term":"title company","Definition":"A neutral third party that usually holds the earnest money.","slug":"t--title-company","Chapter":""},
{"field1":"","Term":"home inspector","Definition":"Conducts an inspection to examine major systems and components of the house, such as the roof, foundation, plumbing, electrical systems, heating and cooling, and appliances.","slug":"t--home-inspector","Chapter":""},
{"field1":"","Term":"inspection report","Definition":"The written report you receive from the home inspector after inspection.","slug":"t--inspection-report","Chapter":""},
{"field1":"","Term":"credits","Definition":"Money the seller agrees to contribute toward your closing costs or repairs. Instead of fixing an issue before closing, the seller may offer a credit so you can handle the repair yourself after you move in.","slug":"t--credits","Chapter":""},
{"field1":"","Term":"appraisal","Definition":"An independent estimate of the home’s value, conducted by a licensed appraiser and ordered by the lender to confirm the home is worth the amount being borrowed.","slug":"t--appraisal","Chapter":""},
]

export default function Term(props) {
  const item = termsList.find((term) => (props.term.toLowerCase() === term.Term ))
  return (
    <span class="term">
        <dfn class="term--term"
        data-tooltip={item?.Definition}
            >{props.children}</dfn>
    </span>
  );
}

// export default function Term(props) {
//   const item = termsList.find((term) => (props.term.toLowerCase() === term.term ))
//   return (
//     <span class="term">
//         <dfn class="term--term"
//         // title={item?.definition}
//             >{props.children}</dfn>
//         {props.mode !== 'definer' && <span class="term--definition">{item?.definition}</span> || <></>}
//     </span>
//   );
// }
