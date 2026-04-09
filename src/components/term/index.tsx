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
