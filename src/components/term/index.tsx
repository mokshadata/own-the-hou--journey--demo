import { createEffect, Show, Suspense } from "solid-js"
import { getCollection, getEntry, getEntries, render } from 'astro:content';
// import Popover from '@corvu/popover'


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
{"field1":"","Term":"sales price","Definition":"The amount you and the seller agreed on for the home. This is the number written into your offer to purchase the home.","slug":"t--sales-price","Chapter":""},
{"field1":"","Term":"loan amount","Definition":"How much money you are borrowing from your lender.","slug":"t--loan-amount","Chapter":""},
{"field1":"","Term":"appraised value","Definition":"The value of the home estimate by a licensed appraiser ordered by the lender.","slug":"t--appraised-value","Chapter":""},
{"field1":"","Term":"processing","Definition":"First of two main phases to finalizing your mortage, when your lender gathers and reviews all the documents needed to support your loan application.","slug":"t--processing","Chapter":""},
{"field1":"","Term":"underwriting","Definition":"Second of two main phases to finalizing your mortage, when your loan application goes to an underwriter who will decide whether the loan meets all program requirements and lender guidelines.","slug":"t--underwriting","Chapter":""},
{"field1":"","Term":"conditional approval","Definition":"A request during underwriting for a few final items such as updated bank statements, explanations for recent transactions, or proof of meeting certain conditions.","slug":"t--conditional-approval","Chapter":""},
{"field1":"","Term":"closing disclosure","Definition":"A document before closing that you'll receive. It shows the final terms for the loan. You must receive this at least three business days before closing.","slug":"t--closing-disclosure","Chapter":""},
{"field1":"","Term":"contract for deed","Definition":"An uncommon deal where seller keeps the title in their name until you’ve paid the full price. Offered instead of a traditional mortgage. There are safer paths to homeownership.","slug":"t--contract-for-deed","Chapter":""},

{"field1":"","Term":"closing","Definition":"The process of completing your mortgage loan and transferring ownership of a home to you, the buyer.","slug":"t--closing","Chapter":""},
{"field1":"","Term":"escrow","Definition":"Money being held by a neutral third party, using a title company, until the sale is finished and the home officially changes ownership.","slug":"t--escrow","Chapter":""},
{"field1":"","Term":"promissory note","Definition":"This document is your promise to the lender to repay your mortgage loan.","slug":"t--promissory-note","Chapter":""},
{"field1":"","Term":"deed","Definition":"This is the document that will certify your ownership of the home once you have closed.","slug":"t--deed","Chapter":""},
{"field1":"","Term":"cash to close","Definition":"The amount the title company will tell you to bring for closing day. This amount includes your remaining down payment and any closing costs.","slug":"t--cash-to-close","Chapter":""},
{"field1":"","Term":"homestead exemption","Definition":"A tax reduction just for homeowners (stating that this is your primary residence), and it can save you thousands of dollars in property taxes every year.","slug":"t--homestead-exemption","Chapter":""},
{"field1":"","Term":"transfer on death deed","Definition":"A document to be filed with the county of your property to transfer it legally in the event of your death and allow your family to avoid probate costs and headaches.","slug":"t--transfer-on-dead-deed","Chapter":""},

{"field1":"","Term":"insurance agent","Definition":"An expert in home insurance who can help you compare quotes form multiple providers","slug":"t--insurance-agent","Chapter":""},
{"field1":"","Term":"deductible","Definition":"How much you will have to pay out of pocket for renovations and repairs before insurance coverage kicks in.","slug":"t--deductible","Chapter":""},
{"field1":"","Term":"contractor fraud","Definition":"When a contractor takes money for repairs and fails to complete the job.","slug":"t--contractor-fraud","Chapter":""},
{"field1":"","Term":"mortgage servicer","Definition":"The company that manages the administration of a home loan after closing.","slug":"t--mortgage-servicer","Chapter":""},
{"field1":"","Term":"forbearance","Definition":"A temporary postponement or reduction of loan payment that you can talk to your servicer about when you have trouble making payments.","slug":"t--forbearance","Chapter":""},
{"field1":"","Term":"assessed value","Definition":"The value your property tax bill is based on. A notice of the value as determined by the Harris County Appraisal District will be sent to you yearly for your review.","slug":"t--assessed-value","Chapter":""},

]


export function TermPopover(props) {
  const item = termsList.find((term) => (props.term.toLowerCase() === term.Term ))

  return (
    <Popover
      floatingOptions={{
        offset: 13,
        flip: true,
        shift: true,
      }}
    >
      <Popover.Trigger class="my-auto rounded-full bg-corvu-100 p-3 transition-all duration-100 hover:bg-corvu-200 active:translate-y-0.5">
        {props.children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content class="z-50 rounded-lg bg-corvu-100 px-3 py-2 shadow-md data-open:animate-in data-open:fade-in-50% data-open:slide-in-from-top-1 data-closed:animate-out data-closed:fade-out-50% data-closed:slide-out-to-top-1">
          {/* <Popover.Label class="font-bold">Settings</Popover.Label> */}
          {item?.Definition}
          <Popover.Arrow class="text-corvu-100" />
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  )
}


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
