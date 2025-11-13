import { createEffect, Show, Suspense } from "solid-js"
import { getCollection, getEntry, getEntries, render } from 'astro:content';

const termsList = [
  {
      term: 'mortgage',
      definition: 'A loan from a bank or lender that you pay back over time, usually 15 to 30 years.',
      chapter: 'c03-what-s-your-budget',
  },
  {
      term: 'principal',
      definition: 'The amount you borrow to buy your home.',
      chapter: 'c03-what-s-your-budget',
  },
  {
      term: 'equity',
      definition: 'The portion of the home that you truly own.',
      chapter: 'c03-what-s-your-budget',
  },
  {
      term: 'interest',
      definition: 'The lender’s fee for letting you borrow money.',
      chapter: 'c03-what-s-your-budget',
  },
  {
      term: 'escrow account',
      definition: 'A holding account.',
      chapter: 'c03-what-s-your-budget',
  },
  {
      term: 'down payment',
      definition: 'Down payment is the cash you contribute toward the home’s purchase price.',
      chapter: 'c03-what-s-your-budget',
  },
  {
      term: 'earnest money',
      definition: 'This is a portion of your down payment that you put into an escrow account during the purchase process.',
      chapter: 'c03-what-s-your-budget',
  },
  {
      term: 'closing costs',
      definition: 'Fees for the lender, title company, appraisal, inspections, and other costs. It is typically 2% - 5% of the purchase price.',
      chapter: 'c03-what-s-your-budget',
  },
  {
      term: 'pre-approval amount',
      definition: 'The total loan value you can be approved for.',
      chapter: 'c03-what-s-your-budget',
  }
]

export default function Term(props) {
  const item = termsList.find((term) => (props.term.toLowerCase() === term.term ))
  return (
    <span class="term">
        <dfn class="term--term" title={item?.definition}>{props.children}</dfn>
        {props.mode !== 'definer' && <span class="term--definition">{item?.definition}</span> || <></>}
    </span>
  );
}
